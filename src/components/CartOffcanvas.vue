<script setup>
import { computed } from 'vue'
import { BOffcanvas } from 'bootstrap-vue-next'
import { t } from '../data/locale.js'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  cartItems: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'remove-item', 'checkout'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const totalPrice = computed(() => {
  return props.cartItems.reduce((sum, item) => {
    return sum + (item.price * (item.quantity || 1))
  }, 0)
})

const totalItems = computed(() => {
  return props.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
})

const removeItem = (item) => {
  emit('remove-item', item)
}

const handleCheckout = () => {
  emit('checkout')
}
</script>

<template>
  <BOffcanvas
    v-model="isOpen"
    placement="end"
    :title="''"
    class="cart-offcanvas"
  >
    <!-- Header -->
    <template #title>
      <div class="cart-header-title">
        <span class="cart-title-text">{{ t('YOUR CART') }}</span>
        <span class="cart-count">({{ totalItems }})</span>
      </div>
    </template>

    <div class="cart-content">
      <!-- Empty State -->
      <div v-if="cartItems.length === 0" class="cart-empty">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <p class="empty-text">{{ t('Your cart is empty') }}</p>
        <p class="empty-subtext">{{ t('Start shopping now!') }}</p>
      </div>

      <!-- Cart Items List -->
      <div v-else class="cart-items">
        <div
          v-for="item in cartItems"
          :key="`${item.id}-${item.size}-${item.color}`"
          class="cart-item"
        >
          <!-- Item Image (if available) -->
          <div class="item-image-wrapper" v-if="item.image">
            <img :src="item.image" :alt="item.name" class="item-image" />
          </div>

          <!-- Item Details -->
          <div class="item-details">
            <h4 class="item-name">{{ item.name }}</h4>
            <p class="item-meta">
              <span v-if="item.size">{{ t('Size') }}: {{ item.size }}</span>
              <span v-if="item.color"> · {{ t(item.color) }}</span>
            </p>
            <div class="item-price-row">
              <span class="item-price">฿{{ item.price.toLocaleString() }}</span>
              <span class="item-qty">× {{ item.quantity || 1 }}</span>
            </div>
          </div>

          <!-- Remove Button -->
          <button
            class="remove-btn"
            @click="removeItem(item)"
            aria-label="Remove item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Footer: Total & Checkout -->
      <div v-if="cartItems.length > 0" class="cart-footer">
        <div class="total-row">
          <span class="total-label">{{ t('TOTAL') }}</span>
          <span class="total-value">฿{{ totalPrice.toLocaleString() }}</span>
        </div>

        <button class="checkout-btn" @click="handleCheckout">
          {{ t('CHECKOUT') }}
        </button>

        <button class="continue-btn" @click="isOpen = false">
          {{ t('Continue Shopping') }}
        </button>
      </div>
    </div>
  </BOffcanvas>
</template>

<style scoped>
.cart-header-title {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.cart-title-text {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 3px;
  color: var(--text-primary);
  font-family: var(--font-heading);
}

.cart-count {
  font-size: 13px;
  font-weight: 400;
  color: var(--text-muted);
}

.cart-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

/* Empty State */
.cart-empty {
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

/* Cart Items */
.cart-items {
  flex: 1;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-light);
  align-items: flex-start;
}

.cart-item:first-child {
  padding-top: 0;
}

.item-image-wrapper {
  width: 72px;
  height: 72px;
  border-radius: var(--radius-md);
  overflow: hidden;
  flex-shrink: 0;
  background: var(--bg-primary);
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

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px;
  letter-spacing: 0.3px;
  line-height: 1.3;
  font-family: var(--font-heading);
}

.item-meta {
  font-size: 11px;
  color: var(--text-muted);
  margin: 0 0 8px;
}

.item-price-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-price {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
}

.item-qty {
  font-size: 12px;
  color: var(--text-muted);
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

/* Cart Footer */
.cart-footer {
  padding-top: 20px;
  border-top: 1px solid var(--border-light);
  margin-top: auto;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.total-label {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
  color: var(--text-primary);
  font-family: var(--font-heading);
}

.total-value {
  font-size: 20px;
  font-weight: 700;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.checkout-btn {
  width: 100%;
  padding: 14px;
  background: var(--accent-gradient);
  color: #fff;
  border: none;
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 3px;
  cursor: pointer;
  transition: all var(--transition-base);
  font-family: var(--font-heading);
  margin-bottom: 10px;
}

.checkout-btn:hover {
  box-shadow: var(--shadow-accent-lg);
  transform: translateY(-1px);
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
