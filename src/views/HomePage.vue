<script setup>
import { ref, computed, onMounted } from 'vue'
import HeroCarousel from '../components/HeroCarousel.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import ProductCard from '../components/ProductCard.vue'
import FooterSection from '../components/FooterSection.vue'
import { products } from '../data/products.js'
import bannerNewProduct from '../assets/images/banner_NEW PRODUCT.png'
import bannerMan from '../assets/images/banner_MAN.png'
import bannerWomen from '../assets/images/banner_WOMEN.png'
import bannerReview from '../assets/images/banner_Review.png'
import { t } from '../data/locale.js'

// Hero carousel - first 3 products
const heroProducts = computed(() => products.slice(0, 3))

// New Product section filter (no 'All' tab)
const activeCategory = ref('shirt')

const filteredNewProducts = computed(() => {
  return products.filter(p => p.category === activeCategory.value).slice(0, 10)
})

// Category options for the new product section (no 'All')
const newProductCategories = ['shirt', 'trousers', 'trousers&skirts', 'hoodie']

// Category cards data for "Shopping for your loved ones"
const categoryCards = computed(() => [
  {
    title: t('NEW PRODUCT'),
    subtitle: t('Latest collection'),
    link: '/category/new-product',
    image: bannerNewProduct
  },
  {
    title: t('WOMEN'),
    subtitle: t("Women's collection"),
    link: '/category/women',
    image: bannerWomen
  },
  {
    title: t('MAN'),
    subtitle: t("Men's collection"),
    link: '/category/man',
    image: bannerMan
  }
])

// Scroll reveal observer
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<template>
  <div class="home-page">
    <!-- 1. Hero Carousel -->
    <HeroCarousel :products="heroProducts" />

    <!-- 2. NEW PRODUCT Section -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="section-header reveal">
          <div>
            <div class="title-group">
              <span class="checkbox-icon">☑</span>
              <h2 class="section-title">{{ t('NEW PRODUCT') }}</h2>
            </div>
            <p class="section-subtitle" style="text-align: left; margin: 8px 0 0;">
              {{ t('A series of all items available in the online shop') }}
            </p>
          </div>
          <router-link to="/category/new-product" class="see-all-link">
            {{ t('See All →') }}
          </router-link>
        </div>

        <!-- Category Filter (no All tab) -->
        <div class="category-filter reveal">
          <button
            v-for="cat in newProductCategories"
            :key="cat"
            class="filter-pill"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat"
          >
            {{ t(cat) }}
          </button>
        </div>

        <!-- Horizontal scrollable product row -->
        <div class="horizontal-scroll reveal">
          <div v-for="product in filteredNewProducts" :key="product.id" class="scroll-item">
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </section>

    <!-- 3. CHOOSE YOUR STYLE Section -->
    <section class="style-section">
      <div class="container-custom reveal">
        <h2>{{ t('CHOOSE YOUR STYLE') }}</h2>
        <p class="section-subtitle">
          {{ t('Design how many way to beautiful in your own way') }}
        </p>
        <div class="style-decoration">
          <span class="style-line"></span>
          <span class="style-diamond">◆</span>
          <span class="style-line"></span>
        </div>
      </div>
    </section>

    <!-- 4. DESIGN LIFE BY DRESSING UP Banner -->
    <section
      class="banner-section"
      :style="{ backgroundImage: `url(${bannerReview})` }"
    >
      <div class="banner-content">
        <h2>{{ t('DESIGN LIFE BY DRESSING UP') }}</h2>
        <p>{{ t('Combine creative ideas to be unique to yourself') }}</p>
        <router-link to="/category/new-product" class="btn-street btn-street-black">
          {{ t('Shop now') }}
        </router-link>
      </div>
    </section>

    <!-- 5. SHOPPING FOR YOUR LOVED ONES Section -->
    <section class="section-padding">
      <div class="container-custom">
        <div class="loved-ones-header reveal" style="text-align: center; margin-bottom: 48px;">
          <h2 class="section-title">{{ t('SHOPPING FOR YOUR LOVED ONES') }}</h2>
          <p class="section-subtitle">
            {{ t('Find the perfect gift from our curated collections') }}
          </p>
          <div class="title-underline"></div>
        </div>

        <div class="category-cards reveal">
          <router-link
            v-for="card in categoryCards"
            :key="card.title"
            :to="card.link"
            class="category-card"
          >
            <img :src="card.image" :alt="card.title" />
            <div class="category-card-overlay">
              <h3>{{ card.title }}</h3>
              <p>{{ card.subtitle }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 6. Footer -->
    <FooterSection />
  </div>
</template>

<style scoped>
.scroll-item {
  flex: 0 0 auto;
  width: 260px;
}

@media (max-width: 768px) {
  .scroll-item {
    width: 200px;
  }
}

/* Style section decoration */
.style-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

.style-line {
  width: 40px;
  height: 2px;
  background: var(--accent-gradient);
  border-radius: 1px;
}

.style-diamond {
  font-size: 10px;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Title underline accent */
.title-underline {
  width: 60px;
  height: 3px;
  background: var(--accent-gradient);
  border-radius: 2px;
  margin: 16px auto 0;
}

/* Loved ones header extra polish */
.loved-ones-header .section-title {
  position: relative;
}
</style>
