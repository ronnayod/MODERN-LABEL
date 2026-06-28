<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: 'All'
  },
  categories: {
    type: Array,
    default: () => ['All', 'Shirt', 'Trousers', 'Hoodie']
  }
})

const emit = defineEmits(['update:modelValue'])

const selectCategory = (category) => {
  emit('update:modelValue', category)
}
</script>

<template>
  <div class="category-filter">
    <button
      v-for="cat in categories"
      :key="cat"
      class="filter-pill"
      :class="{ active: modelValue === cat }"
      @click="selectCategory(cat)"
    >
      {{ cat }}
    </button>
  </div>
</template>

<style scoped>
.category-filter {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 8px 0;
}

.filter-pill {
  padding: 8px 24px;
  border-radius: var(--radius-pill);
  border: 1.5px solid var(--border-accent);
  background-color: var(--accent-light);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all var(--transition-base);
  font-family: var(--font-heading);
  white-space: nowrap;
  user-select: none;
}

.filter-pill:hover {
  border-color: var(--accent-start);
  color: var(--accent-start);
  background-color: var(--accent-light-2, rgba(0, 0, 0, 0.08));
  transform: translateY(-1px);
}

.filter-pill.active {
  background: var(--accent-start, #000000);
  color: #fff;
  border-color: var(--accent-start, #000000);
  box-shadow: var(--shadow-md);
}

.filter-pill.active:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}

@media (max-width: 576px) {
  .category-filter {
    gap: 8px;
  }

  .filter-pill {
    padding: 6px 18px;
    font-size: 12px;
  }
}
</style>
