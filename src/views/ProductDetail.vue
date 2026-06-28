<script setup>
import { ref, computed, watch, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumb from '../components/Breadcrumb.vue'
import ProductCard from '../components/ProductCard.vue'
import FooterSection from '../components/FooterSection.vue'
import { products, getProductById } from '../data/products.js'
import { t, translateSizeDetail } from '../data/locale.js'

const route = useRoute()
const addToCart = inject('addToCart')
const toggleFavorite = inject('toggleFavorite')
const isFavorite = inject('isFavorite')

// Product data
const product = computed(() => getProductById(Number(route.params.id)))

const isFav = computed(() => {
  const p = product.value
  if (!p) return false
  return isFavorite(p.id)
})

const handleToggleFavorite = () => {
  const p = product.value
  if (p) {
    toggleFavorite(p.id)
  }
}

// Selected options
const selectedColor = ref(null)
const selectedSize = ref(null)
const isDetailOpen = ref(false)

// Initialize selections when product changes
watch(
  () => route.params.id,
  () => {
    const p = product.value
    if (p) {
      selectedColor.value = p.colors?.[0]?.name || null
      selectedSize.value = p.sizes?.[0] || null
      isDetailOpen.value = false
    }
  },
  { immediate: true }
)

// Breadcrumb
const breadcrumbItems = computed(() => {
  const p = product.value
  if (!p) return [{ text: t('HOME'), to: '/' }]
  
  const genderKey = p.gender === 'man' ? 'MEN' : p.gender === 'women' ? 'WOMEN' : (p.gender || '').toUpperCase()
  const catKey = (p.subcategory || p.category || '').toUpperCase()
  
  return [
    { text: t('HOME'), to: '/' },
    { text: t(genderKey), to: `/category/${p.gender}` },
    { text: t(catKey), to: `/category/${p.gender}?cat=${p.category}` },
    { text: p.name }
  ]
})

// Related products (same category, exclude current)
const relatedProducts = computed(() => {
  const p = product.value
  if (!p) return []
  return products
    .filter(item => item.category === p.category && item.id !== p.id)
    .slice(0, 6)
})

// Recommended products (different category or random)
const recommendedProducts = computed(() => {
  const p = product.value
  if (!p) return []
  return products
    .filter(item => item.id !== p.id)
    .slice(0, 6)
})

// Helper for color brightness
const isLightColor = (hex) => {
  if (!hex) return true
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 155
}

// Add to bag handler
const handleAddToBag = () => {
  if (product.value && addToCart) {
    addToCart({
      ...product.value,
      selectedColor: selectedColor.value,
      selectedSize: selectedSize.value
    })
  }
}

// Scroll reveal
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<template>
  <div class="product-detail-page" v-if="product">
    <div class="container-custom">
      <!-- Breadcrumb -->
      <Breadcrumb :items="breadcrumbItems" />

      <!-- Two-column layout -->
      <div class="detail-layout">
        <!-- Left: Product Image -->
        <div class="detail-image-col">
          <div class="image-frame">
            <img
              :src="product.image"
              :alt="product.name"
              class="product-image"
            />
          </div>
        </div>

        <!-- Right: Product Info -->
        <div class="detail-info-col">
          <div class="product-detail">
            <div class="product-info" style="padding-left: 0;">
              <h1 class="product-title">{{ product.name }}</h1>
              <p class="product-price-detail">฿ {{ product.price?.toLocaleString() }}</p>              <!-- Colors -->
              <div v-if="product.colors && product.colors.length" class="color-section">
                <p class="detail-label">{{ t('Colors Available') }}</p>
                <div class="color-swatches">
                  <button
                    v-for="color in product.colors"
                    :key="color.name"
                    class="color-swatch"
                    :class="[
                       { active: selectedColor === color.name },
                       isLightColor(color.hex) ? 'light-color' : 'dark-color'
                    ]"
                    :style="{ backgroundColor: color.hex }"
                    :title="color.name"
                    @click="selectedColor = color.name"
                  />
                </div>
              </div>

              <!-- Sizes -->
              <div v-if="product.sizes && product.sizes.length" class="size-section">
                <p class="detail-label">{{ t('Size') }}</p>
                <div class="size-selectors">
                  <button
                    v-for="size in product.sizes"
                    :key="size"
                    class="size-btn"
                    :class="{ active: selectedSize === size }"
                    @click="selectedSize = size"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="action-buttons">
                <button
                  class="btn-street btn-street-filled btn-full-width"
                  @click="handleAddToBag"
                >
                  {{ t('Add To Bag') }} 🛍
                </button>
                <button 
                  class="btn-street btn-street-outline btn-full-width"
                  :class="{ 'is-favorited': isFav }"
                  @click="handleToggleFavorite"
                >
                  {{ isFav ? t('Favorite') + ' ♥' : t('Favorite') + ' ♡' }}
                </button>
              </div>

              <!-- Detail Size Collapsible -->
              <div v-if="product.detailSizes" class="detail-size-section">
                <button
                  class="detail-size-toggle"
                  @click="isDetailOpen = !isDetailOpen"
                >
                  <span>{{ t('Detail Size') }}</span>
                  <span class="toggle-icon" :class="{ open: isDetailOpen }">▼</span>
                </button>
                <div v-show="isDetailOpen" class="detail-size-content">
                  <div
                    v-for="(measurement, size) in product.detailSizes"
                    :key="size"
                    class="size-measurement-row"
                  >
                    <strong>{{ size }}</strong> - {{ translateSizeDetail(measurement) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <section v-if="relatedProducts.length" class="related-section">
      <div class="container-custom">
        <h3>{{ t('สินค้าที่เกี่ยวข้อง') }}</h3>
        <div class="horizontal-scroll">
          <div v-for="rp in relatedProducts" :key="rp.id" class="scroll-card">
            <ProductCard :product="rp" />
          </div>
        </div>
      </div>
    </section>

    <!-- Recommended Products -->
    <section v-if="recommendedProducts.length" class="related-section">
      <div class="container-custom">
        <h3>{{ t('สินค้าแนะนำ') }}</h3>
        <div class="horizontal-scroll">
          <div v-for="rp in recommendedProducts" :key="rp.id" class="scroll-card">
            <ProductCard :product="rp" />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <FooterSection />
  </div>

  <!-- Not found fallback -->
  <div v-else class="container-custom not-found-state">
    <div class="not-found-icon">🔍</div>
    <h2>{{ t('Product not found') }}</h2>
    <p>
      {{ t("The product you're looking for doesn't exist or has been removed.") }}
    </p>
    <router-link to="/" class="btn-street btn-street-filled">
      {{ t('Back to Home') }}
    </router-link>
  </div>
</template>

<style scoped>
.product-detail-page {
  padding-top: 16px;
}

.detail-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

@media (max-width: 768px) {
  .detail-layout {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}

/* Image Frame with accent glow on hover */
.image-frame {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-gray-100);
  border: 1px solid var(--border-light);
  transition: all var(--transition-slow);
}

.image-frame:hover {
  box-shadow: var(--shadow-accent);
  border-color: var(--border-accent);
}

.detail-image-col .product-image {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  display: block;
  transition: transform var(--transition-slow);
}

.image-frame:hover .product-image {
  transform: scale(1.03);
}

.detail-info-col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
}

.btn-street-outline.is-favorited {
  background-color: var(--accent-light, #fbf7ee);
  border-color: var(--border-accent, #c5a86b);
  color: var(--accent-start, #c5a86b);
}

.scroll-card {
  flex: 0 0 auto;
  width: 240px;
}

@media (max-width: 768px) {
  .scroll-card {
    width: 200px;
  }
}

/* Not found state */
.not-found-state {
  padding: 100px 0;
  text-align: center;
}

.not-found-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.not-found-state h2 {
  font-family: var(--font-heading);
  color: var(--text-primary);
  margin-bottom: 12px;
}

.not-found-state p {
  color: var(--text-muted);
  margin-bottom: 28px;
}

.not-found-state .btn-street {
  display: inline-flex;
}
</style>
