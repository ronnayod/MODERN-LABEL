<script setup>
import { computed, ref } from 'vue'
import { BModal } from 'bootstrap-vue-next'
import { t } from '../data/locale.js'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  totalPrice: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'payment-success'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// PromptPay API URL for generating real PromptPay QR code
const qrCodeUrl = computed(() => {
  // Mock PromptPay ID or mobile number
  return `https://promptpay.io/0891234567/${props.totalPrice}.png`
})

const isDownloading = ref(false)
const showSuccessBanner = ref(false)

const downloadQR = async () => {
  isDownloading.value = true
  try {
    const response = await fetch(qrCodeUrl.value)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `PromptPay-QR-${props.totalPrice}THB.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading QR code:', error)
    // Fallback: open image in new tab
    window.open(qrCodeUrl.value, '_blank')
  } finally {
    isDownloading.value = false
  }
}

const handleConfirm = () => {
  showSuccessBanner.value = true
  setTimeout(() => {
    showSuccessBanner.value = false
    emit('payment-success')
    isOpen.value = false
  }, 2500)
}
</script>

<template>
  <BModal
    v-model="isOpen"
    :title="t('PROMPTPAY QR PAYMENT')"
    hide-footer
    centered
    size="md"
    body-class="payment-modal-body"
    header-class="payment-modal-header"
  >
    <div class="payment-container">
      <!-- Success Message overlay -->
      <transition name="fade">
        <div v-if="showSuccessBanner" class="payment-success-overlay">
          <div class="success-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h3>{{ t('PAYMENT SUCCESSFUL') }}</h3>
        </div>
      </transition>

      <!-- PromptPay Logo Header -->
      <div class="promptpay-header-graphic">
        <div class="promptpay-logo">
          <span class="prompt">prompt</span><span class="pay">pay</span>
        </div>
        <div class="thai-payment-badge">Thai QR Payment</div>
      </div>

      <!-- Price section -->
      <div class="price-section">
        <span class="price-label">{{ t('ORDER TOTAL') }}</span>
        <span class="price-value">฿{{ totalPrice.toLocaleString() }}</span>
      </div>

      <!-- QR Code Image Box -->
      <div class="qr-code-box-wrapper">
        <div class="qr-inner-frame">
          <img :src="qrCodeUrl" alt="PromptPay QR Code" class="qr-code-img" />
        </div>
        <p class="scan-instructions-text">{{ t('SCAN TO PAY') }}</p>
      </div>

      <!-- Download Button -->
      <button class="download-qr-btn" @click="downloadQR" :disabled="isDownloading">
        <span v-if="isDownloading">Downloading...</span>
        <span v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          {{ t('DOWNLOAD QR') }}
        </span>
      </button>

      <!-- Divider line -->
      <div class="modal-divider"></div>

      <!-- Confirm Button -->
      <button class="confirm-payment-btn" @click="handleConfirm">
        {{ t('CONFIRM PAYMENT') }}
      </button>
    </div>
  </BModal>
</template>

<style scoped>
:deep(.payment-modal-header) {
  border-bottom: 1px solid var(--border-light, #efefef);
  padding: 16px 24px;
}

:deep(.payment-modal-body) {
  padding: 24px;
}

.payment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

/* Success Overlay */
.payment-success-overlay {
  position: absolute;
  inset: -24px;
  background: #ffffff;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border-radius: var(--radius-lg, 12px);
  text-align: center;
}

.success-icon-wrapper {
  margin-bottom: 20px;
  background: #f0fdf4;
  padding: 20px;
  border-radius: 50%;
}

.payment-success-overlay h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  font-family: var(--font-heading);
  line-height: 1.4;
}

/* PromptPay Graphic Logo */
.promptpay-header-graphic {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #10305b 0%, #061935 100%);
  width: 100%;
  padding: 16px;
  border-radius: var(--radius-md, 8px);
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(16, 48, 91, 0.15);
}

.promptpay-logo {
  font-family: 'Outfit', 'Inter', sans-serif;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.promptpay-logo .prompt {
  color: #ffffff;
}

.promptpay-logo .pay {
  color: #f7941d; /* Orange colour */
}

.thai-payment-badge {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 700;
  margin-top: 2px;
}

/* Price */
.price-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.price-label {
  font-size: 11px;
  color: var(--text-muted, #7f7f7f);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  margin-bottom: 4px;
}

.price-value {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-primary);
  font-family: var(--font-heading);
}

/* QR Code Box */
.qr-code-box-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.qr-inner-frame {
  background: #ffffff;
  padding: 12px;
  border: 1px solid var(--border-medium, #e0e0e0);
  border-radius: var(--radius-md, 8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.qr-code-img {
  width: 220px;
  height: 220px;
  display: block;
}

.scan-instructions-text {
  font-size: 11.5px;
  color: var(--text-muted, #7f7f7f);
  margin-top: 10px;
  margin-bottom: 0;
  font-weight: 500;
}

/* Buttons */
.download-qr-btn {
  background: none;
  border: 1.5px solid var(--border-accent, #000000);
  color: var(--accent-start, #000000);
  padding: 10px 24px;
  font-size: 12px;
  font-weight: 700;
  border-radius: var(--radius-pill);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all var(--transition-base);
  width: 100%;
  max-width: 240px;
  font-family: var(--font-heading);
}

.download-qr-btn:hover {
  background: var(--text-primary);
  color: #ffffff;
  border-color: var(--text-primary);
}

.btn-icon {
  flex-shrink: 0;
}

.modal-divider {
  width: 100%;
  height: 1px;
  background: var(--border-light, #efefef);
  margin: 24px 0;
}

.confirm-payment-btn {
  width: 100%;
  padding: 13px;
  background: var(--accent-gradient);
  color: #ffffff;
  border: none;
  border-radius: var(--radius-pill);
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all var(--transition-base);
  font-family: var(--font-heading);
  text-transform: uppercase;
}

.confirm-payment-btn:hover {
  box-shadow: var(--shadow-accent-lg);
  transform: translateY(-1px);
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
