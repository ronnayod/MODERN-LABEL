<script setup>
import { computed, inject, ref, watch } from 'vue'
import { BOffcanvas } from 'bootstrap-vue-next'
import { products } from '../data/products.js'
import { t } from '../data/locale.js'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  wishlistItems: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const wishlistProducts = computed(() => {
  return props.wishlistItems.map(id => products.find(p => p.id === id)).filter(Boolean)
})

// Store user's selected sizes and colors per product ID
const selections = ref({})

watch(
  wishlistProducts,
  (productsList) => {
    productsList.forEach(p => {
      if (!selections.value[p.id]) {
        selections.value[p.id] = {
          size: p.sizes?.[0] || null,
          color: p.colors?.[0]?.name || null
        }
      }
    })
  },
  { immediate: true, deep: true }
)

const toggleFavorite = inject('toggleFavorite')
const addToCart = inject('addToCart')

const handleAddToBag = (product) => {
  const sel = selections.value[product.id] || {}
  const cartProduct = {
    ...product,
    color: sel.color || product.colors?.[0]?.name || null,
    size: sel.size || product.sizes?.[0] || null
  }
  addToCart(cartProduct)
  // Close wishlist offcanvas so user can see cart or continue
  isOpen.value = false
}

// Light color helper for checkmarks/outlines
const isLightColor = (hex) => {
  if (!hex) return false
  const c = hex.substring(1)
  const rgb = parseInt(c, 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luma > 220
}
</script>

<template>
  <BOffcanvas
    v-model="isOpen"
    placement="end"
    :title="''"
    class="wishlist-offcanvas"
  >
    <!-- Header -->
    <template #title>
      <div class="wishlist-header-title">
        <span class="wishlist-title-text">{{ t('YOUR WISHLIST') }}</span>
        <span class="wishlist-count">({{ wishlistItems.length }})</span>
      </div>
    </template>

    <div class="wishlist-content">
      <!-- Empty State -->
      <div v-if="wishlistProducts.length === 0" class="wishlist-empty">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <p class="empty-text">{{ t('Your wishlist is empty') }}</p>
        <p class="empty-subtext">{{ t('Start shopping now!') }}</p>
      </div>

      <!-- Wishlist Items List -->
      <div v-else class="wishlist-items">
        <div
          v-for="item in wishlistProducts"
          :key="item.id"
          class="wishlist-item"
        >
          <!-- Item Image -->
          <router-link :to="`/product/${item.id}`" class="item-image-wrapper" @click="isOpen = false">
            <img :src="item.image" :alt="item.name" class="item-image" />
          </router-link>

          <!-- Item Details -->
          <div class="item-details">
            <router-link :to="`/product/${item.id}`" class="item-name-link" @click="isOpen = false">
              <h4 class="item-name">{{ item.name }}</h4>
            </router-link>
            <div class="item-price-row">
              <span class="item-price">฿{{ item.price.toLocaleString() }}</span>
            </div>

            <!-- Size and Color selectors (Premium Swatches & Pills) -->
            <div class="item-selections" v-if="selections[item.id]">
              <!-- Color Selection Swatches -->
              <div class="selection-field-group" v-if="item.colors && item.colors.length">
                <span class="selection-label">{{ t('Colors Available') }}:</span>
                <div class="color-swatches-row">
                  <button
                    v-for="color in item.colors"
                    :key="color.name"
                    class="color-swatch-btn"
                    :class="[
                      { active: selections[item.id].color === color.name },
                      isLightColor(color.hex) ? 'light-color' : 'dark-color'
                    ]"
                    :style="{ backgroundColor: color.hex }"
                    :title="color.name"
                    @click="selections[item.id].color = color.name"
                  >
                    <!-- Small checkmark icon -->
                    <span v-if="selections[item.id].color === color.name" class="checkmark">✓</span>
                  </button>
                </div>
              </div>

              <!-- Size Selection Pills -->
              <div class="selection-field-group" v-if="item.sizes && item.sizes.length">
                <span class="selection-label">{{ t('Size') }}:</span>
                <div class="size-pills-row">
                  <button
                    v-for="size in item.sizes"
                    :key="size"
                    class="size-pill-btn"
                    :class="{ active: selections[item.id].size === size }"
                    @click="selections[item.id].size = size"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>
            </div>
            
            <div class="actions-row">
              <!-- Quick Add to Bag -->
              <button class="quick-add-btn" @click="handleAddToBag(item)">
                {{ t('Add To Bag') }} 🛍
              </button>
              
              <!-- View details link -->
              <router-link :to="`/product/${item.id}`" class="details-link" @click="isOpen = false">
                {{ t('View Details') }}
              </router-link>
            </div>
          </div>

          <!-- Remove Button -->
          <button
            class="remove-btn"
            @click="toggleFavorite(item.id)"
            aria-label="Remove item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="wishlist-footer">
        <button class="continue-btn" @click="isOpen = false">
          {{ t('CLOSE') }}
        </button>
      </div>
    </div>
  </BOffcanvas>
</template>

<style scoped>
.wishlist-header-title {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.wishlist-title-text {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 3px;
  color: var(--text-primary);
  font-family: var(--font-heading);
}

.wishlist-count {
  font-size: 13px;
  font-weight: 400;
  color: var(--text-muted);
}

.wishlist-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

/* Empty State */
.wishlist-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  color: var(--accent-light-3, rgba(0, 0, 0, 0.15));
  margin-bottom: 16px;
}

.empty-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 6px;
  font-family: var(--font-heading);
}

.empty-subtext {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0;
}

/* Wishlist Items */
.wishlist-items {
  flex: 1;
  overflow-y: auto;
}

.wishlist-item {
  display: flex;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-light);
  align-items: flex-start;
}

.wishlist-item:first-child {
  padding-top: 0;
}

.item-image-wrapper {
  width: 72px;
  height: 72px;
  border-radius: var(--radius-md);
  overflow: hidden;
  flex-shrink: 0;
  background: var(--bg-primary);
  display: block;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-name-link {
  text-decoration: none;
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px;
  letter-spacing: 0.3px;
  line-height: 1.3;
  font-family: var(--font-heading);
  transition: color var(--transition-fast);
}

.item-name-link:hover .item-name {
  color: var(--accent-start);
}

.item-price-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.item-price {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
}

/* Dropdowns selections style */
.item-selections {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0 14px;
}

.selection-field-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.selection-label {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Color Swatches Row */
.color-swatches-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.color-swatch-btn {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid var(--border-light);
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.color-swatch-btn:hover {
  transform: scale(1.1);
}

.color-swatch-btn.active {
  transform: scale(1.1);
  border-color: var(--accent-end, #c5a86b);
  box-shadow: 0 0 0 2px var(--color-white, #ffffff), 0 0 0 3.5px var(--accent-end, #c5a86b);
}

.color-swatch-btn .checkmark {
  font-size: 10px;
  font-weight: bold;
}

.color-swatch-btn.dark-color .checkmark {
  color: #ffffff;
}

.color-swatch-btn.light-color .checkmark {
  color: #000000;
}

/* Size Pills Row */
.size-pills-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.size-pill-btn {
  font-size: 10.5px;
  font-weight: 600;
  background-color: var(--bg-primary, #ffffff);
  color: var(--text-primary);
  border: 1px solid var(--border-light);
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm, 4px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all var(--transition-fast);
  font-family: var(--font-body);
}

.size-pill-btn:hover {
  border-color: var(--text-primary);
  background-color: var(--color-gray-50, #fcfcfc);
}

.size-pill-btn.active {
  background-color: var(--text-primary, #000000);
  color: var(--color-white, #ffffff);
  border-color: var(--text-primary, #000000);
}

.actions-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 4px;
}

.quick-add-btn {
  background: var(--accent-gradient);
  color: #fff;
  border: none;
  padding: 7px 18px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: all var(--transition-base);
  font-family: var(--font-heading);
}

.quick-add-btn:hover {
  box-shadow: var(--shadow-accent-lg);
  transform: translateY(-1px);
}

.details-link {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color var(--transition-fast);
  cursor: pointer;
}

.details-link:hover {
  color: var(--accent-start);
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  padding: 4px;
  transition: color var(--transition-fast);
  flex-shrink: 0;
}

.remove-btn:hover {
  color: #ef4444;
}

/* Wishlist Footer */
.wishlist-footer {
  padding-top: 20px;
  border-top: 1px solid var(--border-light);
  margin-top: auto;
}

.continue-btn {
  width: 100%;
  padding: 12px;
  background: none;
  border: 1.5px solid var(--border-accent);
  border-radius: var(--radius-pill);
  color: var(--accent-start);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all var(--transition-base);
  font-family: var(--font-heading);
}

.continue-btn:hover {
  background: var(--accent-gradient);
  color: #fff;
  border-color: transparent;
}
</style>
