<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import logoUrl from '../assets/images/logo01.png'
import { currentLang, toggleLang, t } from '../data/locale.js'

const props = defineProps({
  cartCount: {
    type: Number,
    default: 0
  },
  wishlistCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['toggle-cart', 'toggle-wishlist', 'toggle-account'])

const router = useRouter()

const searchQuery = ref('')
const searchOpen = ref(false)
const mobileMenuOpen = ref(false)
const isScrolled = ref(ref(false))
const searchInputRef = ref(null)
const activeMegamenu = ref(null)

const toggleSearch = () => {
  searchOpen.value = !searchOpen.value
  if (!searchOpen.value) {
    searchQuery.value = ''
  }
}

const handleSearchSubmit = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/category/new-product',
      query: { q: searchQuery.value.trim() }
    })
    searchOpen.value = false
    document.body.style.overflow = ''
  }
}

const handleSuggestionClick = (tag) => {
  const queryText = tag.startsWith('#') ? tag.substring(1) : tag
  searchQuery.value = queryText
  handleSearchSubmit()
}

watch(searchOpen, (newVal) => {
  if (newVal) {
    // Focus search input when overlay opens
    setTimeout(() => {
      searchInputRef.value?.focus()
    }, 300)
    // Prevent background scrolling
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

watch(mobileMenuOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const handleScroll = () => {
  if (window.scrollY > 40) {
    isScrolled.value = true
  } else {
    isScrolled.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Check initial scroll position
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <nav class="navbar-wrapper" :class="{ 'scrolled': isScrolled }">
    <div class="navbar-inner">
      <!-- LEFT: Navigation Links (Desktop) / Hamburger Menu (Mobile) -->
      <div class="navbar-left">
        <!-- Desktop Nav Links -->
        <div class="navbar-left-links">
          <div 
            class="nav-item-container"
            @mouseenter="activeMegamenu = 'new'"
            @mouseleave="activeMegamenu = null"
          >
            <router-link to="/category/new-product" class="nav-link-item">{{ t('NEW IN') }}</router-link>
            <!-- Megamenu -->
            <div class="megamenu-panel" :class="{ 'is-open': activeMegamenu === 'new' }">
              <div class="megamenu-inner" @click="activeMegamenu = null">
                <div class="megamenu-column">
                  <span class="megamenu-title">{{ t('ALL CATEGORIES') }}</span>
                  <router-link to="/category/new-product" class="megamenu-link">{{ t('ALL PRODUCTS') }}</router-link>
                  <router-link to="/category/new-product?cat=shirt" class="megamenu-link">{{ t('SHIRTS & T-SHIRTS') }}</router-link>
                  <router-link to="/category/new-product?cat=hoodie" class="megamenu-link">{{ t('HOODIES & SWEATERS') }}</router-link>
                  <router-link to="/category/new-product?cat=trousers" class="megamenu-link">{{ t('TROUSERS & SKIRTS') }}</router-link>
                </div>
                <div class="megamenu-column">
                  <span class="megamenu-title">{{ t('GENDER COLLECTIONS') }}</span>
                  <router-link to="/category/man" class="megamenu-link">{{ t("MEN'S COLLECTION") }}</router-link>
                  <router-link to="/category/women" class="megamenu-link">{{ t("WOMEN'S COLLECTION") }}</router-link>
                </div>
                <div class="megamenu-featured">
                  <div class="featured-card">
                    <img src="https://picsum.photos/seed/nav-new/400/250" alt="New In Featured" class="featured-img" />
                    <div class="featured-badge">{{ t('NEW SEASON') }}</div>
                    <div class="featured-info">
                      <h4>{{ t('STREETWEAR DROPS 2026') }}</h4>
                      <p>{{ t('EXPLORE LATEST ARRIVALS') }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            class="nav-item-container"
            @mouseenter="activeMegamenu = 'man'"
            @mouseleave="activeMegamenu = null"
          >
            <router-link to="/category/man" class="nav-link-item">{{ t('MEN') }}</router-link>
            <!-- Megamenu -->
            <div class="megamenu-panel" :class="{ 'is-open': activeMegamenu === 'man' }">
              <div class="megamenu-inner" @click="activeMegamenu = null">
                <div class="megamenu-column">
                  <span class="megamenu-title">{{ t("MEN'S CATEGORIES") }}</span>
                  <router-link to="/category/man" class="megamenu-link">{{ t("ALL MEN'S PRODUCTS") }}</router-link>
                  <router-link to="/category/man?cat=shirt" class="megamenu-link">{{ t('SHIRTS & T-SHIRTS') }}</router-link>
                  <router-link to="/category/man?cat=hoodie" class="megamenu-link">{{ t('HOODIES & SWEATERS') }}</router-link>
                  <router-link to="/category/man?cat=trousers" class="megamenu-link">{{ t('TROUSERS') }}</router-link>
                </div>
                <div class="megamenu-column">
                  <span class="megamenu-title">{{ t('SHOP BY PRODUCT') }}</span>
                  <router-link to="/category/man?cat=shirt&subcat=T-Shirt" class="megamenu-link">{{ t('T-SHIRTS') }}</router-link>
                  <router-link to="/category/man?cat=hoodie&subcat=Hoodies" class="megamenu-link">{{ t('HOODIES') }}</router-link>
                  <router-link to="/category/man?cat=trousers&subcat=Trousers" class="megamenu-link">{{ t('CASUAL TROUSERS') }}</router-link>
                </div>
                <div class="megamenu-featured">
                  <div class="featured-card">
                    <img src="https://picsum.photos/seed/nav-man/400/250" alt="Men Featured" class="featured-img" />
                    <div class="featured-badge">{{ t('STREETWEAR MEN') }}</div>
                    <div class="featured-info">
                      <h4>{{ t("EXPLORE MEN'S COLLECTION") }}</h4>
                      <p>{{ t('VIEW ALL PRODUCTS') }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            class="nav-item-container"
            @mouseenter="activeMegamenu = 'women'"
            @mouseleave="activeMegamenu = null"
          >
            <router-link to="/category/women" class="nav-link-item">{{ t('WOMEN') }}</router-link>
            <!-- Megamenu -->
            <div class="megamenu-panel" :class="{ 'is-open': activeMegamenu === 'women' }">
              <div class="megamenu-inner" @click="activeMegamenu = null">
                <div class="megamenu-column">
                  <span class="megamenu-title">{{ t("WOMEN'S CATEGORIES") }}</span>
                  <router-link to="/category/women" class="megamenu-link">{{ t("ALL WOMEN'S PRODUCTS") }}</router-link>
                  <router-link to="/category/women?cat=shirt" class="megamenu-link">{{ t('SHIRTS & T-SHIRTS') }}</router-link>
                  <router-link to="/category/women?cat=hoodie" class="megamenu-link">{{ t('HOODIES & SWEATERS') }}</router-link>
                  <router-link to="/category/women?cat=trousers&skirts" class="megamenu-link">{{ t('TROUSERS & SKIRTS') }}</router-link>
                </div>
                <div class="megamenu-column">
                  <span class="megamenu-title">{{ t('SHOP BY PRODUCT') }}</span>
                  <router-link to="/category/women?cat=shirt&subcat=T-Shirt" class="megamenu-link">{{ t('T-SHIRTS') }}</router-link>
                  <router-link to="/category/women?cat=hoodie&subcat=Hoodies" class="megamenu-link">{{ t('HOODIES') }}</router-link>
                  <router-link to="/category/women?cat=trousers&skirts&subcat=Trousers" class="megamenu-link">{{ t('CASUAL TROUSERS') }}</router-link>
                  <router-link class="megamenu-link" to="/category/women?cat=trousers&skirts&subcat=Skirts">{{ t('SKIRTS') }}</router-link>
                  <router-link class="megamenu-link" to="/category/women?cat=trousers&skirts&subcat=Jeans">{{ t('JEANS') }}</router-link>
                  <router-link class="megamenu-link" to="/category/women?cat=trousers&skirts&subcat=Shorts">{{ t('SHORTS') }}</router-link>
                </div>
                <div class="megamenu-featured">
                  <div class="featured-card">
                    <img src="https://picsum.photos/seed/nav-women/400/250" alt="Women Featured" class="featured-img" />
                    <div class="featured-badge">{{ t('STREETWEAR WOMEN') }}</div>
                    <div class="featured-info">
                      <h4>{{ t("EXPLORE WOMEN'S COLLECTION") }}</h4>
                      <p>{{ t('VIEW ALL PRODUCTS') }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Hamburger Menu Button -->
        <button class="icon-btn hamburger-btn" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- CENTER: Brand Logo -->
      <div class="navbar-center-logo">
        <router-link to="/" class="brand-logo" >
          <img :src="logoUrl" alt="modernLABEL" class="logo-image" />
        </router-link>
      </div>

      <!-- RIGHT: Desktop & Mobile Controls -->
      <div class="navbar-right">
        <!-- Search trigger -->
        <button class="icon-btn search-trigger" @click="toggleSearch" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>

        <!-- User Account -->
        <button class="icon-btn account-btn" aria-label="Account" @click="emit('toggle-account')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>

        <!-- Wishlist -->
        <button class="icon-btn wishlist-btn" aria-label="Wishlist" @click="emit('toggle-wishlist')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span v-if="wishlistCount > 0" class="cart-badge">{{ wishlistCount }}</span>
        </button>

        <!-- Cart Bag -->
        <button class="icon-btn cart-btn" aria-label="Cart" @click="emit('toggle-cart')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </button>

        <!-- Premium Language Toggle -->
        <button class="lang-toggle" @click="toggleLang" aria-label="Toggle language">
          <span :class="{ 'active-lang': currentLang === 'EN' }">EN</span>
          <span class="lang-divider">/</span>
          <span :class="{ 'active-lang': currentLang === 'TH' }">TH</span>
        </button>
      </div>
    </div>

  </nav>

  <!-- Full Screen Search Overlay (Centered Compact Modal style) -->
  <transition name="fade-slide">
    <div v-if="searchOpen" class="search-overlay">
      <div class="search-overlay-bg" @click="toggleSearch"></div>
      <div class="search-overlay-content">
        <!-- Close button inside the card -->
        <button class="close-overlay-btn" @click="toggleSearch" aria-label="Close search">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="search-input-container">
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            type="text"
            class="overlay-search-input"
            :placeholder="t('WHAT ARE YOU LOOKING FOR?')"
            @keyup.enter="handleSearchSubmit"
            @keyup.escape="toggleSearch"
          />
          <button class="search-submit-btn" @click="handleSearchSubmit" aria-label="Submit search">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </div>
        
        <!-- Suggestions -->
        <div class="search-suggestions">
          <p class="suggestions-title">{{ t('POPULAR SEARCHES') }}</p>
          <div class="suggestions-tags">
            <button class="suggestion-tag" @click="handleSuggestionClick('hoodie')">{{ t('#HOODIE') }}</button>
            <button class="suggestion-tag" @click="handleSuggestionClick('cargo')">{{ t('#CARGO PANTS') }}</button>
            <button class="suggestion-tag" @click="handleSuggestionClick('oversized')">{{ t('#OVERSIZED T-SHIRT') }}</button>
            <button class="suggestion-tag" @click="handleSuggestionClick('jacket')">{{ t('#JACKETS') }}</button>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- Mobile Side Drawer -->
  <transition name="drawer-slide">
    <div v-if="mobileMenuOpen" class="mobile-drawer-wrapper">
      <div class="mobile-drawer-backdrop" @click="mobileMenuOpen = false"></div>
      <div class="mobile-drawer">
        <div class="mobile-drawer-header">
          <button class="close-drawer-btn" @click="mobileMenuOpen = false" aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <div class="mobile-drawer-body">
          <div class="mobile-nav-links">
            <router-link to="/category/new-product" class="mobile-nav-link" @click="mobileMenuOpen = false">{{ t('NEW IN') }}</router-link>
            <router-link to="/category/man" class="mobile-nav-link" @click="mobileMenuOpen = false">{{ t('MEN') }}</router-link>
            <router-link to="/category/women" class="mobile-nav-link" @click="mobileMenuOpen = false">{{ t('WOMEN') }}</router-link>
          </div>
          
          <div class="mobile-drawer-divider"></div>
          
          <div class="mobile-drawer-options">
            <button class="mobile-option-btn" @click="emit('toggle-account'); mobileMenuOpen = false">
              {{ t('ACCOUNT') }}
            </button>
            <button class="mobile-option-btn" @click="emit('toggle-wishlist'); mobileMenuOpen = false">
              {{ t('WISHLIST') }} <span v-if="wishlistCount > 0">({{ wishlistCount }})</span>
            </button>
            <button class="mobile-option-btn" @click="toggleLang(); mobileMenuOpen = false">
              {{ t('LANGUAGE') }}: {{ currentLang }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

/* ============================================
   NAVBAR WRAPPER — Frosted Glass
   ============================================ */
.navbar-wrapper {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--bg-glass-strong, rgba(255, 255, 255, 0.85));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: none;
  transition: padding var(--transition-base, 250ms cubic-bezier(0.4, 0, 0.2, 1)),
              background var(--transition-base, 250ms cubic-bezier(0.4, 0, 0.2, 1)),
              box-shadow var(--transition-base, 250ms cubic-bezier(0.4, 0, 0.2, 1));
  will-change: padding, background, box-shadow;
}

/* Thin premium bottom border line */
.navbar-wrapper::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--accent-end, #c5a86b);
  opacity: 0.5;
  transition: opacity var(--transition-base);
}

/* Scroll shrink effect */
.navbar-wrapper.scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-sm);
}

.navbar-wrapper.scrolled::after {
  opacity: 0.8;
}

/* ============================================
   INNER GRID LAYOUT (3 columns)
   ============================================ */
.navbar-inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 8px 40px; 
  transition: padding var(--transition-base, 250ms);
  
}

.navbar-wrapper.scrolled .navbar-inner {
  padding: 14px 40px;
}

/* ============================================
   LEFT SIDE: Navigation Links (Desktop)
   ============================================ */
.navbar-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.navbar-left-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-item-container {
  position: static; /* Static allows megamenu to be full viewport width */
}

.nav-link-item {
  position: relative;
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-primary, #000000);
  padding: 8px 0;
  font-family: var(--font-heading, sans-serif);
  transition: color var(--transition-fast);
}

/* Clean Underline Animation */
.nav-link-item::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: var(--text-primary, #000000);
  transition: width var(--transition-base, 250ms cubic-bezier(0.4, 0, 0.2, 1));
}

.nav-link-item:hover::after,
.nav-link-item.router-link-active::after {
  width: 100%;
}

.nav-link-item:hover {
  color: var(--text-primary);
}

/* ============================================
   CENTER: Logo
   ============================================ */
/* 1. ล็อกความกว้างและความสูง เพื่อไม่ให้ช่อง Grid ตรงกลางยุบตัวเหลือ 0px */
.navbar-center-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 40px;   /* บังคับความสูงของ Navbar ตามที่คุณต้องการ */
  width: 160px;   /* **เพิ่มตรงนี้** กำหนดความกว้างเผื่อไว้ไม่ให้ช่องยุบหาย */
}

.brand-logo {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 2. สไตล์พื้นฐานของรูปโลโก้ (ใช้ร่วมกับหน้า Search เพื่อไม่ให้พัง) */
.logo-image {
  height: 40px; /* ขนาดปกติสำหรับจุดอื่นๆ (ในหน้าจอ Search ค้นหา) */
  width: auto;
  object-fit: contain;
  display: block;
  transition: height var(--transition-base, 250ms), transform var(--transition-base, 250ms);
  will-change: height, transform;
}

/* 3. ดึงโลโก้ "เฉพาะบน Navbar" ให้ใหญ่และลอยทับกรอบ (Overlapping) */
.navbar-center-logo .logo-image {
  height: 90px;
  position: absolute;
  top: 50%;
  left: 50%; /* จัดกึ่งกลางแนวนอน */
  transform: translate(-50%, -50%); /* จัดกึ่งกลางเป๊ะๆ ทั้งแกน X และ Y */
}

/* 4. ขนาดโลโก้ตอน Scroll หน้าจอลงมา (อย่าลืมใส่ translate กลับไปด้วย) */
.navbar-wrapper.scrolled .navbar-center-logo .logo-image {
  height: 90px; 
  transform: translate(-50%, -50%);
}

/* 5. ตอนเอาเมาส์ชี้ (Hover) */
.navbar-center-logo .brand-logo:hover .logo-image {
  transform: translate(-50%, -50%) scale(1.04);
}
/* ============================================
   RIGHT SIDE: Control Buttons
   ============================================ */
.navbar-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  color: var(--text-primary, #000000);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform var(--transition-fast), color var(--transition-fast);
}

.icon-btn:hover {
  color: var(--accent-end, #c5a86b);
  transform: translateY(-1px);
}

/* Cart Badge */
.cart-badge {
  position: absolute;
  top: -1px;
  right: -3px;
  background: var(--text-primary, #000000);
  color: #ffffff;
  font-size: 9px;
  font-weight: 700;
  min-width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  border: 1.5px solid var(--color-white, #ffffff);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

/* Language Toggle links */
.lang-toggle {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-light, #b5b5b5);
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
  cursor: pointer;
  padding: 4px 6px;
  transition: color var(--transition-fast);
}

.lang-toggle:hover {
  color: var(--text-primary);
}

.lang-divider {
  color: #e5e5e5;
  font-weight: 400;
}

.active-lang {
  color: var(--text-primary, #000000);
}

/* Hamburger Hidden on Desktop */
.hamburger-btn {
  display: none;
}

/* ============================================
   MEGAMENU DROPDOWN PANELS
   ============================================ */
.megamenu-panel {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid var(--border-light, rgba(0, 0, 0, 0.08));
  visibility: hidden;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 300ms cubic-bezier(0.25, 1, 0.5, 1),
              transform 300ms cubic-bezier(0.25, 1, 0.5, 1),
              visibility 300ms;
  z-index: 999;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
}

/* Show Megamenu when open */
.megamenu-panel.is-open {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}

.megamenu-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr;
  gap: 60px;
  padding: 48px 40px;
}

.megamenu-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.megamenu-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--text-primary);
  text-transform: uppercase;
  margin-bottom: 8px;
  font-family: var(--font-heading);
}

.megamenu-link {
  font-size: 13px;
  color: var(--text-muted, #666666);
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  font-family: var(--font-body);
  transition: color var(--transition-fast), transform var(--transition-fast);
}

.megamenu-link:hover {
  color: var(--text-primary);
  transform: translateX(2px);
}

/* Megamenu Card promotion */
.megamenu-featured {
  display: flex;
  justify-content: flex-end;
}

.featured-card {
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 200px;
  border-radius: var(--radius-md, 12px);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}

.featured-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.featured-card:hover .featured-img {
  transform: scale(1.05);
}

.featured-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  background: var(--text-primary, #000000);
  color: #ffffff;
  font-size: 8.5px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  letter-spacing: 1.5px;
}

.featured-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  color: #ffffff;
  text-align: left;
}

.featured-info h4 {
  font-size: 13.5px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #ffffff;
  font-family: var(--font-heading);
}

.featured-info p {
  font-size: 10px;
  opacity: 0.8;
  margin: 4px 0 0 0;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

/* ============================================
   FULL SCREEN SEARCH OVERLAY (Dior & Gucci style)
   ============================================ */
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 2200;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 16px 20px;
}

.search-overlay-bg {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.search-overlay-content {
  position: relative;
  width: 100%;
  max-width: 580px;
  background: #ffffff;
  border-radius: var(--radius-xl, 16px);
  padding: 44px 32px 36px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.close-overlay-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted, #7f7f7f);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all var(--transition-fast);
}

.close-overlay-btn:hover {
  background: var(--bg-secondary, #f5f5f5);
  color: var(--text-primary);
  transform: rotate(90deg);
}

.search-input-container {
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1.5px solid var(--text-primary);
  padding: 8px 0;
  margin-bottom: 24px;
}

.overlay-search-input {
  width: 100%;
  border: none;
  background: none;
  outline: none;
  font-size: 18px;
  font-weight: 500;
  font-family: var(--font-heading);
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text-primary);
}

.overlay-search-input::placeholder {
  color: var(--text-light, #c0c0c0);
  font-size: 13.5px;
}

.search-submit-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  transition: transform var(--transition-fast);
}

.search-submit-btn:hover {
  transform: scale(1.08);
}

/* Suggestions */
.search-suggestions {
  width: 100%;
  text-align: left;
}

.suggestions-title {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 1.2px;
  margin-bottom: 12px;
}

.suggestions-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.suggestion-tag {
  font-size: 11px;
  color: var(--text-primary);
  border: 1px solid var(--border-medium);
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
  text-decoration: none;
  background: none;
  outline: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.suggestion-tag:hover {
  background: var(--text-primary);
  color: #ffffff;
  border-color: var(--text-primary);
}

/* Animations for Search overlay */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease;
}

.fade-slide-enter-active .search-overlay-content,
.fade-slide-leave-active .search-overlay-content {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
}

.fade-slide-enter-from .search-overlay-content {
  transform: translateY(-20px) scale(0.98);
}

.fade-slide-leave-to .search-overlay-content {
  transform: translateY(-20px) scale(0.98);
}

/* ============================================
   MOBILE DRAWER
   ============================================ */
.mobile-drawer-wrapper {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  justify-content: flex-start;
}

.mobile-drawer-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.mobile-drawer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 80%;
  max-width: 320px;
  background: #ffffff;
  box-shadow: var(--shadow-xl);
  padding: 16px 36px 32px;
  display: flex;
  flex-direction: column;
  z-index: 2;
  text-align: left;
}

.mobile-drawer-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 24px;
}

.close-drawer-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-drawer-body {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.mobile-nav-link {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 3px;
  color: var(--text-primary);
  text-transform: uppercase;
  font-family: var(--font-heading);
  text-decoration: none;
  padding: 6px 0;
  transition: color var(--transition-fast);
}

.mobile-nav-link:hover {
  color: var(--accent-end);
}

.mobile-drawer-divider {
  height: 1px;
  background: var(--border-light, #f0f0f0);
  margin: 28px 0;
}

.mobile-drawer-options {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.mobile-option-btn {
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 2px;
  color: var(--text-muted, #7f7f7f);
  text-transform: uppercase;
  text-align: left;
  cursor: pointer;
  padding: 6px 0;
  transition: all var(--transition-fast);
  font-family: var(--font-heading);
}

.mobile-option-btn:hover {
  color: var(--text-primary);
  transform: translateX(4px);
}

/* Animations for Mobile Drawer */
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: opacity 0.35s cubic-bezier(0.25, 1, 0.5, 1);
}

.drawer-slide-enter-active .mobile-drawer,
.drawer-slide-leave-active .mobile-drawer {
  transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  opacity: 0;
}

.drawer-slide-enter-from .mobile-drawer {
  transform: translateX(-100%);
}

.drawer-slide-leave-to .mobile-drawer {
  transform: translateX(-100%);
}

/* ============================================
   RESPONSIVE BREKPOINTS
   ============================================ */
@media (max-width: 991px) {
  .navbar-inner {
    padding: 16px 24px;
  }
  
  .navbar-wrapper.scrolled .navbar-inner {
    padding: 12px 24px;
  }
  
  .navbar-left-links,
  .account-btn {
    display: none;
  }
  
  .hamburger-btn {
    display: flex;
  }
}

@media (max-width: 480px) {
  .navbar-inner {
    padding: 14px 16px;
  }
  
  .navbar-wrapper.scrolled .navbar-inner {
    padding: 10px 16px;
  }
  
  .brand-text {
    font-size: 15px;
    letter-spacing: 2.5px;
  }
  
  .brand-highlight {
    font-size: 17px;
  }
  
  .navbar-right {
    gap: 12px;
  }
  
  .lang-toggle {
    display: none; /* Hide language toggle on very small screens to fit layout */
  }
}
</style>
