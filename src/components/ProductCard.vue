<script setup>
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const toggleFavorite = inject('toggleFavorite')
const isFavorite = inject('isFavorite')

const isFav = computed(() => isFavorite(props.product.id))

const handleToggleFavorite = () => {
  toggleFavorite(props.product.id)
}

const sizeLabel = computed(() => {
  if (!props.product.sizes || props.product.sizes.length === 0) return ''
  return props.product.sizes.join(' ')
})

const colorLabel = computed(() => {
  if (!props.product.colors || props.product.colors.length === 0) return ''
  return props.product.colors.map(c => c.name).join(', ')
})

const subcategoryDisplay = computed(() => {
  const parts = []
  if (props.product.gender) {
    const g = props.product.gender
    parts.push(g.charAt(0).toUpperCase() + g.slice(1))
  }
  if (props.product.subcategory) parts.push(props.product.subcategory)
  return parts.join(' / ')
})
</script>

<template>
  <router-link
    :to="`/product/${product.id}`"
    class="product-card"
  >
    <!-- Product Image -->
    <div class="card-image-wrapper">
      <img
        :src="product.image"
        :alt="product.name"
        class="card-image"
        loading="lazy"
      />
      <!-- Gradient overlay at bottom of image -->
      <div class="image-overlay"></div>
      <!-- Heart icon overlay -->
      <div 
        class="heart-icon" 
        :class="{ 'is-favorited': isFav }"
        @click.stop.prevent="handleToggleFavorite"
        role="button"
        aria-label="Toggle Favorite"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" :fill="isFav ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </div>
    </div>

    <!-- Card Body -->
    <div class="card-body">
      <!-- Badge Pills -->
      <div class="badge-row">
        <span v-if="sizeLabel" class="info-badge">
          {{ sizeLabel }}
        </span>
        <span v-if="product.price" class="info-badge">
          {{ product.price }}
        </span>
        <span v-if="colorLabel" class="info-badge">
          {{ colorLabel }}
        </span>
      </div>

      <!-- Product Name -->
      <h3 class="product-name">{{ product.name }}</h3>

      <!-- Subcategory -->
      <p v-if="subcategoryDisplay" class="product-subcategory">
        {{ subcategoryDisplay }}
      </p>
    </div>
  </router-link>
</template>

<style scoped>
.product-card {
  display: block;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #fff;
  transition:
    box-shadow var(--transition-base),
    transform var(--transition-base),
    border-color var(--transition-base);
  cursor: pointer;
  position: relative;
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: transparent;
  box-shadow:
    0 0 0 1.5px var(--accent-start),
    var(--shadow-accent);
}

/* ── Image Wrapper ── */
.card-image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 aspect ratio */
  overflow: hidden;
  background-color: var(--bg-primary);
}

/* Subtle gradient overlay at image bottom */
.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.03) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

.card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
  transition: transform var(--transition-slow);
}

.product-card:hover .card-image {
  transform: scale(1.06);
}

/* ── Heart Icon Overlay ── */
.heart-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-glass-strong);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 50%;
  color: var(--accent-start);
  opacity: 0;
  transform: translateY(4px);
  transition:
    opacity var(--transition-base),
    transform var(--transition-base),
    background-color var(--transition-base);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  pointer-events: auto;
}

.heart-icon.is-favorited {
  opacity: 1 !important;
  transform: translateY(0) !important;
  background-color: var(--accent-light, #fbf7ee);
}

.product-card:hover .heart-icon {
  opacity: 1;
  transform: translateY(0);
}

/* ── Card Body ── */
.card-body {
  padding: 16px;
}

/* ── Badge Pills ── */
.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}

.info-badge {
  display: inline-block;
  padding: 4px 10px;
  background-color: var(--accent-light);
  color: var(--accent-start);
  font-size: 11px;
  font-weight: 600;
  font-family: var(--font-body);
  border-radius: var(--radius-pill);
  letter-spacing: 0.3px;
  white-space: nowrap;
  transition: background-color var(--transition-fast);
}

/* ── Product Name ── */
.product-name {
  font-size: 15px;
  font-weight: 700;
  font-family: var(--font-heading);
  color: var(--text-primary);
  margin: 0 0 4px;
  letter-spacing: 0.2px;
  line-height: 1.35;
  transition: color var(--transition-fast);
}

/* ── Subcategory ── */
.product-subcategory {
  font-size: 12px;
  color: var(--text-muted);
  font-family: var(--font-body);
  margin: 0;
  font-weight: 400;
  letter-spacing: 0.4px;
}

/* ── Responsive ── */
@media (max-width: 576px) {
  .card-body {
    padding: 12px;
  }

  .product-name {
    font-size: 13px;
  }

  .info-badge {
    font-size: 10px;
    padding: 3px 8px;
  }

  .heart-icon {
    width: 30px;
    height: 30px;
    top: 8px;
    right: 8px;
  }

  .heart-icon svg {
    width: 16px;
    height: 16px;
  }
}
</style>