<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { t } from '../data/locale.js'

const router = useRouter()

defineProps({
  items: {
    type: Array,
    default: () => []
    // Each item: { text: string, to?: string }
    // Last item has no `to` (plain text, current page)
  }
})

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="breadcrumb-wrapper">
    <div class="breadcrumb-inner">
      <!-- Back Button -->
      <button class="back-btn" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
        <span>{{ t('BACK') }}</span>
      </button>

      <!-- Breadcrumb Path -->
      <nav class="breadcrumb-path" aria-label="Breadcrumb">
        <template v-for="(item, index) in items" :key="index">
          <!-- Clickable link -->
          <router-link
            v-if="item.to"
            :to="item.to"
            class="breadcrumb-link"
          >
            {{ item.text }}
          </router-link>

          <!-- Plain text (last item) -->
          <span v-else class="breadcrumb-current">
            {{ item.text }}
          </span>

          <!-- Separator -->
          <span v-if="index < items.length - 1" class="breadcrumb-sep">/</span>
        </template>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.breadcrumb-wrapper {
  padding: 16px 0;
  border-bottom: 1px solid var(--border-light);
}

.breadcrumb-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  padding: 6px 0;
  transition: color var(--transition-base);
  font-family: var(--font-heading);
  white-space: nowrap;
}

.back-btn:hover {
  color: var(--accent-start);
}

.breadcrumb-path {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  letter-spacing: 1.5px;
  font-weight: 400;
}

.breadcrumb-link {
  color: var(--text-primary);
  text-decoration: none;
  text-underline-offset: 3px;
  border-bottom: 1px solid var(--border-accent);
  padding-bottom: 1px;
  transition: color var(--transition-base), border-color var(--transition-base);
}

.breadcrumb-link:hover {
  color: var(--accent-start);
  border-bottom-color: var(--accent-start);
}

.breadcrumb-current {
  color: var(--accent-start);
  font-weight: 500;
}

.breadcrumb-sep {
  color: var(--text-light, var(--text-muted));
  user-select: none;
}

@media (max-width: 768px) {
  .breadcrumb-inner {
    padding: 0 16px;
    gap: 16px;
  }

  .breadcrumb-path {
    font-size: 11px;
  }
}
</style>
