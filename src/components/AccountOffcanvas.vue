<script setup>
import { computed, inject, ref } from 'vue'
import { BOffcanvas } from 'bootstrap-vue-next'
import { t } from '../data/locale.js'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// Inject user state and methods
const currentUser = inject('currentUser')
const login = inject('login')
const logout = inject('logout')
const updateUser = inject('updateUser')

// Form states
const loginUsername = ref('')
const loginPassword = ref('')
const loginError = ref(false)

const showSaveSuccess = ref(false)

// Editable profile states (loaded from currentUser when logged in)
const editName = ref('')
const editPhone = ref('')
const editAddress = ref('')

const initEditFields = () => {
  if (currentUser.value) {
    editName.value = currentUser.value.fullName || ''
    editPhone.value = currentUser.value.phone || ''
    editAddress.value = currentUser.value.address || ''
  }
}

// Watch user login to populate edit fields
import { watch } from 'vue'
watch(currentUser, (newVal) => {
  if (newVal) {
    initEditFields()
  }
}, { immediate: true })

const handleLogin = () => {
  if (!loginUsername.value.trim()) {
    loginError.value = true
    return
  }
  
  loginError.value = false
  
  // Set default mock user details with input username
  const mockUser = {
    username: loginUsername.value.trim(),
    fullName: 'สมชาย รักดี',
    phone: '089-123-4567',
    address: '123/45 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110'
  }
  
  login(mockUser)
  
  // Clear inputs
  loginUsername.value = ''
  loginPassword.value = ''
}

const handleSaveChanges = () => {
  if (currentUser.value) {
    const updated = {
      ...currentUser.value,
      fullName: editName.value.trim(),
      phone: editPhone.value.trim(),
      address: editAddress.value.trim()
    }
    updateUser(updated)
    
    // Show success notification
    showSaveSuccess.value = true
    setTimeout(() => {
      showSaveSuccess.value = false
    }, 3000)
  }
}

const handleLogout = () => {
  logout()
  isOpen.value = false
}
</script>

<template>
  <BOffcanvas
    v-model="isOpen"
    placement="end"
    :title="''"
    class="account-offcanvas"
  >
    <!-- Header -->
    <template #title>
      <div class="account-header-title">
        <span class="account-title-text" v-if="currentUser">{{ t('MY ACCOUNT') }}</span>
        <span class="account-title-text" v-else>{{ t('LOGIN') }}</span>
      </div>
    </template>

    <div class="account-content">
      <!-- NOT LOGGED IN STATE (LOGIN FORM) -->
      <div v-if="!currentUser" class="login-form-wrapper">
        <p class="welcome-text">{{ t('Welcome Back') }}! 👋</p>
        
        <!-- Username Field -->
        <div class="form-group">
          <label class="form-label" for="login-username">{{ t('USERNAME') }}</label>
          <input
            id="login-username"
            v-model="loginUsername"
            type="text"
            class="form-input"
            placeholder="e.g. modern_buyer"
            @keyup.enter="handleLogin"
          />
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <label class="form-label" for="login-password">{{ t('PASSWORD') }}</label>
          <input
            id="login-password"
            v-model="loginPassword"
            type="password"
            class="form-input"
            placeholder="••••••••"
            @keyup.enter="handleLogin"
          />
        </div>

        <!-- Error Msg -->
        <p v-if="loginError" class="error-msg">
          ⚠️ Please enter a username.
        </p>

        <!-- Submit Button -->
        <button class="login-btn" @click="handleLogin">
          {{ t('LOGIN') }}
        </button>
      </div>

      <!-- LOGGED IN STATE (PROFILE MANAGER) -->
      <div v-else class="profile-details-wrapper">
        <!-- Success Alert banner -->
        <transition name="alert-fade">
          <div v-if="showSaveSuccess" class="success-alert">
            ✓ {{ t('PROFILE UPDATED SUCCESSFULLY!') }}
          </div>
        </transition>

        <!-- Username display -->
        <div class="profile-field-readonly">
          <span class="field-label">{{ t('USERNAME') }}</span>
          <span class="field-value">@{{ currentUser.username }}</span>
        </div>

        <div class="profile-form">
          <!-- Full Name -->
          <div class="form-group">
            <label class="form-label" for="profile-name">{{ t('FULL NAME') }}</label>
            <input
              id="profile-name"
              v-model="editName"
              type="text"
              class="form-input"
            />
          </div>

          <!-- Phone Number -->
          <div class="form-group">
            <label class="form-label" for="profile-phone">{{ t('PHONE NUMBER') }}</label>
            <input
              id="profile-phone"
              v-model="editPhone"
              type="text"
              class="form-input"
            />
          </div>

          <!-- Shipping Address -->
          <div class="form-group">
            <label class="form-label" for="profile-address">{{ t('SHIPPING ADDRESS') }}</label>
            <textarea
              id="profile-address"
              v-model="editAddress"
              class="form-textarea"
              rows="4"
            ></textarea>
          </div>

          <!-- Save Button -->
          <button class="save-btn" @click="handleSaveChanges">
            <span>{{ t('SAVE CHANGES') }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
          </button>
        </div>

        <!-- Logout Button -->
        <div class="logout-wrapper">
          <button class="logout-btn" @click="handleLogout">
            <span>{{ t('LOGOUT') }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </BOffcanvas>
</template>

<style scoped>
.account-header-title {
  display: flex;
  align-items: center;
}

.account-title-text {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 3px;
  color: var(--text-primary);
  font-family: var(--font-heading);
  text-transform: uppercase;
}

.account-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 10px;
}

.welcome-text {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 24px;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
}

/* Forms styling */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
}

.form-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.form-input,
.form-textarea {
  width: 100%;
  font-size: 13px;
  padding: 10px 14px;
  border-radius: var(--radius-md, 8px);
  border: 1px solid var(--border-medium);
  background: var(--bg-primary, #ffffff);
  color: var(--text-primary);
  font-family: var(--font-body);
  outline: none;
  transition: all var(--transition-fast);
}

.form-input:focus,
.form-textarea:focus {
  border-color: var(--accent-start, #000000);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.form-textarea {
  resize: vertical;
  line-height: 1.5;
}

/* Success alert */
.success-alert {
  background: #f0fdf4;
  color: #15803d;
  border: 1px solid #bbf7d0;
  padding: 12px;
  border-radius: var(--radius-md, 8px);
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: center;
}

/* Readonly fields */
.profile-field-readonly {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-secondary, #f8f9fa);
  padding: 12px 16px;
  border-radius: var(--radius-md, 8px);
  margin-bottom: 20px;
  border: 1px solid var(--border-light);
}

.field-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
}

.field-value {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
}

.error-msg {
  color: #ef4444;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 16px;
}

/* Buttons */
.login-btn,
.save-btn {
  width: 100%;
  padding: 12px;
  background: var(--accent-gradient);
  color: #ffffff;
  border: none;
  border-radius: var(--radius-pill);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all var(--transition-base);
  font-family: var(--font-heading);
  text-transform: uppercase;
  margin-top: 10px;
}

.login-btn:hover,
.save-btn:hover {
  box-shadow: var(--shadow-accent-lg);
  transform: translateY(-1px);
}

.logout-wrapper {
  margin-top: auto;
  padding-top: 30px;
  border-top: 1px solid var(--border-light);
}

.logout-btn {
  width: 100%;
  padding: 12px;
  background: none;
  border: 1.5px solid #ef4444;
  border-radius: var(--radius-pill);
  color: #ef4444;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all var(--transition-base);
  font-family: var(--font-heading);
  text-transform: uppercase;
}

.logout-btn:hover {
  background: #ef4444;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
}

.save-btn,
.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-icon {
  flex-shrink: 0;
}

/* Transition animations */
.alert-fade-enter-active,
.alert-fade-leave-active {
  transition: all 0.3s ease;
}

.alert-fade-enter-from,
.alert-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
