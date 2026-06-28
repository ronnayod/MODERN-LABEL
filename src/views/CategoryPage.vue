<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Breadcrumb from '../components/Breadcrumb.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import ProductGrid from '../components/ProductGrid.vue'
import FooterSection from '../components/FooterSection.vue'
import { products, getProductsByGender } from '../data/products.js'
import { t } from '../data/locale.js'

const route = useRoute()
const router = useRouter()

const gender = computed(() => route.params.gender || '')
const selectedCategory = ref(route.query.cat || 'all')

// Sync selected category with query params on load and query/route changes
watch(
  () => route.params.gender,
  () => {
    selectedCategory.value = route.query.cat || 'all'
  }
)

watch(
  () => route.query.cat,
  (newCat) => {
    selectedCategory.value = newCat || 'all'
  }
)

const selectCategory = (cat) => {
  selectedCategory.value = cat
  router.push({
    path: route.path,
    query: {
      ...route.query,
      cat: cat === 'all' ? undefined : cat,
      subcat: undefined // clear subcat when category changes
    }
  })
}

const genderLabel = computed(() => {
  if (gender.value === 'man') return 'MEN'
  if (gender.value === 'women') return 'WOMEN'
  if (gender.value === 'new-product') return 'NEW IN'
  return 'ALL PRODUCTS'
})

// Breadcrumb items
const breadcrumbItems = computed(() => {
  const items = [
    { text: t('HOME'), to: '/' },
    { text: t(genderLabel.value), to: `/category/${gender.value}` }
  ]

  if (selectedCategory.value !== 'all') {
    const catLabel = t(selectedCategory.value.toUpperCase())
    const subcatQuery = route.query.subcat
    if (subcatQuery) {
      items.push({ text: catLabel, to: `/category/${gender.value}?cat=${selectedCategory.value}` })
      items.push({ text: t(subcatQuery.toUpperCase()) })
    } else {
      items.push({ text: catLabel })
    }
  } else {
    const subcatQuery = route.query.subcat
    if (subcatQuery) {
      items.push({ text: t(subcatQuery.toUpperCase()) })
    } else {
      items.push({ text: t('ALL') })
    }
  }
  return items
})

// Category options (including 'All') - dynamic based on gender
const categories = computed(() => {
  if (gender.value === 'women') {
    return ['all', 'shirt', 'trousers&skirts', 'hoodie']
  }
  return ['all', 'shirt', 'trousers', 'hoodie']
})

// Shuffle helper
function shuffleArray(arr) {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Filtered products by gender, category, subcategory, and search query
const filteredProducts = computed(() => {
  let result = gender.value && gender.value !== 'new-product'
    ? getProductsByGender(gender.value)
    : products

  // Filter by search query
  const q = route.query.q
  if (q) {
    const queryLower = q.toLowerCase()
    result = result.filter(p => 
      p.name.toLowerCase().includes(queryLower) || 
      p.category?.toLowerCase().includes(queryLower) || 
      p.subcategory?.toLowerCase().includes(queryLower) ||
      (p.colors && p.colors.some(c => c.name.toLowerCase().includes(queryLower)))
    )
  }

  if (selectedCategory.value !== 'all') {
    if (selectedCategory.value === 'trousers' || selectedCategory.value === 'trousers&skirts') {
      result = result.filter(p => p.category === 'trousers' || p.category === 'trousers&skirts')
    } else {
      result = result.filter(p => p.category === selectedCategory.value)
    }
  }

  const subcatQuery = route.query.subcat
  if (subcatQuery) {
    result = result.filter(p => p.subcategory?.toLowerCase() === subcatQuery.toLowerCase())
  }

  if (selectedCategory.value === 'all' && !subcatQuery && !q) {
    result = shuffleArray(result).slice(0, 20)
  }

  return result
})

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
  <div class="category-page">
    <div class="container-custom">
      <!-- Breadcrumb -->
      <Breadcrumb :items="breadcrumbItems" />

      <!-- Page Title -->
      <div class="page-title-wrapper reveal">
        <h1 class="page-title">
          <template v-if="route.query.q">
            {{ t('SEARCH RESULTS FOR') }} "{{ route.query.q }}"
          </template>
          <template v-else>
            {{ t(genderLabel) }}
          </template>
        </h1>
        <div class="page-title-line"></div>
      </div>

      <!-- Category Filter -->
      <div class="category-filter reveal">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-pill"
          :class="{ active: selectedCategory === cat }"
          @click="selectCategory(cat)"
        >
          {{ t(cat.toUpperCase()) }}
        </button>
      </div>

      <!-- Product Grid -->
      <div class="reveal">
        <ProductGrid :products="filteredProducts" />
      </div>

      <!-- Empty state -->
      <div v-if="filteredProducts.length === 0" class="empty-state">
        <p>{{ t('No products found in this category.') }}</p>
      </div>
    </div>

    <div style="margin-top: 60px;">
      <FooterSection />
    </div>
  </div>
</template>

<style scoped>
.category-page {
  padding-top: 16px;
  min-height: 80vh;
}

.page-title-wrapper {
  margin-bottom: 28px;
}

.page-title {
  font-family: var(--font-heading);
  font-size: 2.25rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 12px;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-title-line {
  width: 60px;
  height: 3px;
  background: var(--accent-gradient);
  border-radius: 2px;
}

.empty-state {
  text-align: center;
  padding: 80px 0;
  color: var(--text-muted);
  font-size: 1rem;
}
</style>
