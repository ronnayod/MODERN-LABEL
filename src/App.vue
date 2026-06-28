<script setup>
import { ref, computed, provide, watch } from 'vue'
import NavBar from './components/NavBar.vue'
import CartOffcanvas from './components/CartOffcanvas.vue'
import WishlistOffcanvas from './components/WishlistOffcanvas.vue'
import AccountOffcanvas from './components/AccountOffcanvas.vue'
import PaymentModal from './components/PaymentModal.vue'

const isCartOpen = ref(false)
const isWishlistOpen = ref(false)
const isAccountOpen = ref(false)
const isPaymentOpen = ref(false)
const cartItems = ref([])

const addToCart = (product) => {
  const found = cartItems.value.find(item => 
    item.id === product.id && 
    item.size === product.size && 
    item.color === product.color
  )
  if (found) {
    found.quantity++
  } else {
    cartItems.value.push({ ...product, quantity: 1 })
  }
}

const removeFromCart = (cartItem) => {
  cartItems.value = cartItems.value.filter(item => 
    !(item.id === cartItem.id && 
      item.size === cartItem.size && 
      item.color === cartItem.color)
  )
}

// Wishlist state
const wishlistItems = ref(JSON.parse(localStorage.getItem('wishlist') || '[]'))

// Toggle wishlist item
const toggleFavorite = (productId) => {
  if (wishlistItems.value.includes(productId)) {
    wishlistItems.value = wishlistItems.value.filter(id => id !== productId)
  } else {
    wishlistItems.value.push(productId)
  }
}

// Check if wishlist contains item
const isFavorite = (productId) => {
  return wishlistItems.value.includes(productId)
}

// Watch wishlist changes to store in localStorage
watch(wishlistItems, (newVal) => {
  localStorage.setItem('wishlist', JSON.stringify(newVal))
}, { deep: true })

const cartCount = computed(() => cartItems.value.reduce((sum, item) => sum + item.quantity, 0))
const wishlistCount = computed(() => wishlistItems.value.length)
const totalPrice = computed(() => cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0))

const openPayment = () => {
  isCartOpen.value = false
  isPaymentOpen.value = true
}

const clearCart = () => {
  cartItems.value = []
}

// Account state management
const user = ref(JSON.parse(localStorage.getItem('currentUser') || 'null'))

const login = (userData) => {
  user.value = userData
  localStorage.setItem('currentUser', JSON.stringify(userData))
}

const logout = () => {
  user.value = null
  localStorage.removeItem('currentUser')
}

const updateUser = (updatedData) => {
  user.value = updatedData
  localStorage.setItem('currentUser', JSON.stringify(updatedData))
}

// Provide cart, wishlist, and account functions to child components
provide('addToCart', addToCart)
provide('cartItems', cartItems)
provide('wishlistItems', wishlistItems)
provide('toggleFavorite', toggleFavorite)
provide('isFavorite', isFavorite)
provide('currentUser', user)
provide('login', login)
provide('logout', logout)
provide('updateUser', updateUser)
</script>

<template>
  <div id="app-wrapper">
    <NavBar 
      :cart-count="cartCount" 
      :wishlist-count="wishlistCount" 
      @toggle-cart="isCartOpen = true" 
      @toggle-wishlist="isWishlistOpen = true" 
      @toggle-account="isAccountOpen = true" 
    />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <CartOffcanvas
      v-model="isCartOpen"
      :cart-items="cartItems"
      @remove-item="removeFromCart"
      @checkout="openPayment"
    />
    <WishlistOffcanvas
      v-model="isWishlistOpen"
      :wishlist-items="wishlistItems"
    />
    <AccountOffcanvas
      v-model="isAccountOpen"
    />
    <PaymentModal
      v-model="isPaymentOpen"
      :total-price="totalPrice"
      @payment-success="clearCart"
    />
  </div>
</template>

<style>
#app-wrapper {
  min-height: 100vh;
  background-color: var(--bg-primary);
}
</style>