<script setup>
import { RouterLink } from 'vue-router'
import logoUrl from '../assets/images/logo01.png'
import { t } from '../data/locale.js'
</script>

<template>
  <footer class="footer-wrapper">
    <div class="footer-accent-border"></div>
    <div class="footer-glow-decoration"></div>
    <div class="footer-inner">
      <div class="footer-grid">
        <!-- Column 1: Brand -->
        <div class="footer-col brand-col">
          <router-link to="/" class="footer-brand-logo">
            <img :src="logoUrl" alt="modernLABEL" class="footer-logo-image" />
          </router-link>
          <p class="brand-tagline">
            {{ t('Premium Streetwear & Urban Fashion') }}
          </p>
        </div>

        <!-- Column 2: Clothing & Apparel -->
        <div class="footer-col">
          <h4 class="footer-heading">{{ t('CLOTHING AND APPAREL') }}</h4>
          <nav class="footer-links">
            <router-link to="/category/women" class="footer-link">{{ t('WOMEN') }}</router-link>
            <router-link to="/category/man" class="footer-link">{{ t('MAN') }}</router-link>
            <router-link to="/category/kids" class="footer-link">{{ t('KIDS') }}</router-link>
          </nav>
        </div>

        <!-- Column 3: Product Characteristics -->
        <div class="footer-col">
          <h4 class="footer-heading">{{ t('PRODUCT CHARACTERISTICS') }}</h4>
          <nav class="footer-links">
            <span class="footer-link-text">{{ t('FREE SHIPPING') }}</span>
            <span class="footer-link-text">{{ t('PRE-ORDER') }}</span>
          </nav>
        </div>

        <!-- Column 4: Follow Us -->
        <div class="footer-col">
          <h4 class="footer-heading">{{ t('FOLLOW US AT') }}</h4>
          <div class="social-links">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p class="copyright">
          &copy; {{ new Date().getFullYear() }} modern.LABEL — {{ t('All rights reserved.') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-wrapper {
  background-color: #1a1a2e;
  margin-top: 0;
  position: relative;
  overflow: hidden;
}

/* Gradient accent top border */
.footer-accent-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--accent-end, #c5a86b);
  z-index: 1;
}

/* Subtle radial gradient decoration at top-right corner */
.footer-glow-decoration {
  position: absolute;
  top: -120px;
  right: -120px;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(197, 168, 107, 0.03) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}

.footer-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 64px 32px 36px;
  position: relative;
  z-index: 1;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px;
}

/* Brand Column */
.footer-brand-logo {
  text-decoration: none;
  display: inline-block;
  margin-top: -26px;
  margin-bottom: 8px;
  transition: opacity var(--transition-base, 250ms);
}

.footer-brand-logo:hover {
  opacity: 0.85;
}

.footer-logo-image {
  height: 90px; 
  width: auto;
  object-fit: contain;
  filter: brightness(0) invert(1);
  display: block;
}

.brand-tagline {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  letter-spacing: 0.5px;
  font-family: var(--font-body, 'Inter', sans-serif);
}

/* Footer Column */
.footer-col {
  display: flex;
  flex-direction: column;
}

.footer-heading {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #ffffff;
  margin: 0 0 20px;
  text-transform: uppercase;
  font-family: var(--font-heading, 'Outfit', 'Inter', sans-serif);
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 1px;
  font-family: var(--font-body, 'Inter', sans-serif);
  transition: color var(--transition-base, 250ms cubic-bezier(0.4, 0, 0.2, 1));
}

.footer-link:hover {
  color: #ffffff;
}

.footer-link-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 1px;
  font-family: var(--font-body, 'Inter', sans-serif);
}

/* Social */
.social-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  font-family: var(--font-body, 'Inter', sans-serif);
  letter-spacing: 0.5px;
  transition:
    color var(--transition-base, 250ms cubic-bezier(0.4, 0, 0.2, 1)),
    text-shadow var(--transition-base, 250ms cubic-bezier(0.4, 0, 0.2, 1));
}

.social-link:hover {
  color: #ffffff;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.35);
}

.social-link svg {
  transition: filter var(--transition-base, 250ms cubic-bezier(0.4, 0, 0.2, 1));
}

.social-link:hover svg {
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4));
}

/* Bottom Bar */
.footer-bottom {
  margin-top: 48px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.copyright {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.25);
  margin: 0;
  letter-spacing: 0.5px;
  font-family: var(--font-body, 'Inter', sans-serif);
}

/* Responsive */
@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .footer-inner {
    padding: 48px 16px 28px;
  }

  .footer-glow-decoration {
    width: 280px;
    height: 280px;
    top: -80px;
    right: -80px;
  }
}

@media (max-width: 480px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .footer-inner {
    padding: 40px 16px 24px;
  }

  .footer-glow-decoration {
    width: 200px;
    height: 200px;
    top: -60px;
    right: -60px;
  }
}
</style>
