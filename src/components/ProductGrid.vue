<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  products: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="product-grid-wrapper">
    <!-- Products Grid -->
    <div v-if="products.length > 0" class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </div>
      <p class="empty-text">ไม่พบสินค้า</p>
      <p class="empty-subtext">ลองเปลี่ยนตัวกรองหรือค้นหาด้วยคำอื่น</p>
    </div>
  </div>
</template>

<style scoped>
.product-grid-wrapper {
  width: 100%;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
}

.empty-icon {
  color: var(--accent-start);
  margin-bottom: 20px;
  opacity: 0.85;
}

.empty-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
  font-family: var(--font-heading);
}

.empty-subtext {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0;
  font-family: var(--font-body);
}

@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 576px) {
  .product-grid {
    gap: 14px;
  }

  .empty-state {
    padding: 60px 16px;
  }
}
</style>
