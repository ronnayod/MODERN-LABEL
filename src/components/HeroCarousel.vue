<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
})

const currentIndex = ref(0)
let autoPlayTimer = null

const featuredProducts = computed(() => {
  return props.products.slice(0, 4)
})

const totalSlides = computed(() => featuredProducts.value.length)

const currentProduct = computed(() => {
  return featuredProducts.value[currentIndex.value] || null
})

const goTo = (index) => {
  currentIndex.value = index
  resetAutoPlay()
}

const goNext = () => {
  if (totalSlides.value === 0) return
  currentIndex.value = (currentIndex.value + 1) % totalSlides.value
  resetAutoPlay()
}

const goPrev = () => {
  if (totalSlides.value === 0) return
  currentIndex.value = (currentIndex.value - 1 + totalSlides.value) % totalSlides.value
  resetAutoPlay()
}

const startAutoPlay = () => {
  autoPlayTimer = setInterval(() => {
    if (totalSlides.value > 0) {
      currentIndex.value = (currentIndex.value + 1) % totalSlides.value
    }
  }, 5000)
}

const resetAutoPlay = () => {
  clearInterval(autoPlayTimer)
  startAutoPlay()
}

onMounted(() => {
  if (totalSlides.value > 1) {
    startAutoPlay()
  }
})

onUnmounted(() => {
  clearInterval(autoPlayTimer)
})
</script>

<template>
  <div v-if="featuredProducts.length > 0" class="hero-carousel">
    <!-- Slides -->
    <div class="carousel-viewport">
      <transition name="carousel-fade" mode="out-in">
        <div class="carousel-slide" :key="currentIndex">
          <router-link
            v-if="currentProduct"
            :to="`/product/${currentProduct.id}`"
            class="slide-link"
          >
            <!-- Image -->
            <img
              :src="currentProduct.image"
              :alt="currentProduct.name"
              class="slide-image"
            />

            <!-- Overlay Info -->
            <div class="slide-overlay">
              <div class="slide-info">
                <!-- Badges -->
                <div class="slide-badges">
                  <span v-if="currentProduct.sizes && currentProduct.sizes.length" class="slide-badge">
                    {{ currentProduct.sizes.join(' ') }}
                  </span>
                  <span v-if="currentProduct.price" class="slide-badge">
                    {{ currentProduct.price }}
                  </span>
                  <span v-if="currentProduct.colors && currentProduct.colors.length" class="slide-badge">
                    {{ currentProduct.colors[0].name }}
                  </span>
                </div>

                <!-- Product Name -->
                <h2 class="slide-title">{{ currentProduct.name }}</h2>

                <!-- Shop Now Button -->
                <span class="btn-street btn-street-filled btn-shop-now">SHOP NOW</span>
              </div>
            </div>
          </router-link>
        </div>
      </transition>
    </div>

    <!-- Navigation Arrows -->
    <button v-if="totalSlides > 1" class="nav-arrow nav-prev" @click="goPrev" aria-label="Previous">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>

    <button v-if="totalSlides > 1" class="nav-arrow nav-next" @click="goNext" aria-label="Next">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>

    <!-- Dot Indicators -->
    <div v-if="totalSlides > 1" class="carousel-dots">
      <button
        v-for="(_, index) in featuredProducts"
        :key="index"
        class="dot"
        :class="{ active: index === currentIndex }"
        @click="goTo(index)"
        :aria-label="`Go to slide ${index + 1}`"
      />
    </div>
  </div>
</template>

<style scoped>
.hero-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: var(--bg-secondary, #f0f0fa);
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
}

/* ── Viewport ───────────────────────────────── */
.carousel-viewport {
  position: relative;
  width: 100%;
  aspect-ratio: 21 / 9;
  min-height: 360px;
  max-height: 680px;
}

.carousel-slide {
  position: absolute;
  inset: 0;
}

.slide-link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ── Overlay gradient with accent tint ──────── */
.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.15) 40%,
    transparent 80%
  );
  display: flex;
  align-items: flex-end;
  padding: 48px 52px;
}

.slide-info {
  color: #fff;
}

/* ── Badges – frosted glass ─────────────────── */
.slide-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.slide-badge {
  padding: 5px 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  letter-spacing: 0.5px;
  transition: background var(--transition-fast), border-color var(--transition-fast);
}

.slide-badge:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
}

/* ── Title – large heading with accent glow ─── */
.slide-title {
  font-family: var(--font-heading);
  font-size: 38px;
  font-weight: 700;
  margin: 0 0 18px 0;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  line-height: 1.15;
}

/* ── Shop Now Button ────────────────────────── */
.btn-shop-now {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 28px;
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #fff;
  background: var(--accent-gradient);
  border: none;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.2);
}

.slide-link:hover .btn-shop-now {
  transform: translateY(-2px) scale(1.04);
  box-shadow: var(--shadow-accent-lg);
}

/* ── Navigation Arrows – frosted glass circles ─ */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  transition:
    background var(--transition-base),
    color var(--transition-base),
    box-shadow var(--transition-base),
    transform var(--transition-fast),
    border-color var(--transition-base);
  z-index: 10;
}

.nav-arrow:hover {
  background: #fff;
  color: var(--text-primary);
  box-shadow: var(--shadow-accent);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-50%) scale(1.08);
}

.nav-arrow:active {
  transform: translateY(-50%) scale(0.96);
}

.nav-prev {
  left: 22px;
}

.nav-next {
  right: 22px;
}

/* ── Dot Indicators ─────────────────────────── */
.carousel-dots {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
  background: transparent;
  cursor: pointer;
  padding: 0;
  transition:
    background var(--transition-base),
    border-color var(--transition-base),
    transform var(--transition-base),
    box-shadow var(--transition-base);
}

.dot.active {
  background: var(--accent-start, #000000);
  border-color: var(--accent-start, #000000);
  transform: scale(1.25);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}

.dot:hover:not(.active) {
  background: rgba(255, 255, 255, 0.5);
  border-color: #fff;
  transform: scale(1.1);
}

/* ── Smooth crossfade transition ────────────── */
.carousel-fade-enter-active,
.carousel-fade-leave-active {
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-fade-enter-from,
.carousel-fade-leave-to {
  opacity: 0;
}

/* ── Responsive ─────────────────────────────── */
@media (max-width: 1024px) {
  .slide-title {
    font-size: 32px;
  }

  .slide-overlay {
    padding: 36px 40px;
  }
}

@media (max-width: 768px) {
  .carousel-viewport {
    aspect-ratio: 4 / 3;
    min-height: 280px;
    max-height: 520px;
  }

  .slide-overlay {
    padding: 24px;
  }

  .slide-title {
    font-size: 24px;
    letter-spacing: 1px;
  }

  .slide-badge {
    font-size: 10px;
    padding: 3px 11px;
  }

  .btn-shop-now {
    padding: 8px 22px;
    font-size: 11px;
  }

  .nav-arrow {
    width: 38px;
    height: 38px;
  }

  .nav-arrow svg {
    width: 18px;
    height: 18px;
  }

  .nav-prev {
    left: 12px;
  }

  .nav-next {
    right: 12px;
  }

  .carousel-dots {
    bottom: 16px;
    gap: 8px;
  }

  .dot {
    width: 9px;
    height: 9px;
  }
}

@media (max-width: 480px) {
  .carousel-viewport {
    aspect-ratio: 3 / 4;
    min-height: 320px;
    max-height: 480px;
  }

  .slide-title {
    font-size: 20px;
  }

  .slide-overlay {
    padding: 20px 16px;
  }

  .btn-shop-now {
    padding: 7px 18px;
    font-size: 10px;
    letter-spacing: 1px;
  }
}
</style>
