<template>
  <div id="app" class="app">
    <nav class="navbar">
      <div class="nav-wrapper">
        <div class="nav-brand">
          <router-link to="/" class="brand-link" @click="mobileMenuOpen = false">
            <span class="brand-icon">🎓</span>
            <div class="brand-content">
              <span class="brand-name">SRM IST</span>
              <span class="brand-desc">CSE</span>
            </div>
          </router-link>
        </div>

        <button 
          class="hamburger"
          :class="{ open: mobileMenuOpen }"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle navigation"
          aria-expanded="mobileMenuOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul class="nav-items" :class="{ active: mobileMenuOpen }">
          <li><router-link to="/" class="nav-link" @click="mobileMenuOpen = false">Welcome</router-link></li>
          <li><router-link to="/proposed-curriculum" class="nav-link" @click="mobileMenuOpen = false">Curriculum</router-link></li>
          <li><router-link to="/agenda-points" class="nav-link" @click="mobileMenuOpen = false">Agenda</router-link></li>
          <li><router-link to="/about-department" class="nav-link" @click="mobileMenuOpen = false">Department</router-link></li>
          <li><router-link to="/about-institution" class="nav-link" @click="mobileMenuOpen = false">Institution</router-link></li>
          <li class="nav-item-dropdown">
            <button 
              class="nav-link dropdown-btn"
              @click="moreOpen = !moreOpen"
              :class="{ active: moreOpen }"
              aria-label="More options"
            >
              More
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 10L1 4H13L7 10Z" fill="currentColor"/>
              </svg>
            </button>
            <div class="dropdown-content" :class="{ show: moreOpen }">
              <a href="#news" @click="moreOpen = false" class="dropdown-item">News & Updates</a>
              <a href="#events" @click="moreOpen = false" class="dropdown-item">Events</a>
              <a href="#contact" @click="moreOpen = false" class="dropdown-item">Contact Us</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <router-view />

    <footer class="footer">
      <p>&copy; 2026 SRM IST - Department of Computer Science Engineering. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
const moreOpen = ref(false)
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background);
}

.navbar {
  background-color: var(--surface);
  border-bottom: 2px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.98);
}

.nav-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  gap: 40px;
}

.nav-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.brand-link:hover {
  transform: translateY(-2px);
}

.brand-icon {
  font-size: 32px;
  line-height: 1;
}

.brand-content {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.brand-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: -0.5px;
}

.brand-desc {
  font-size: 10px;
  color: var(--text-secondary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hamburger {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  width: 28px;
  height: 24px;
  gap: 5px;
  padding: 0;
  flex-shrink: 0;
}

.hamburger span {
  width: 100%;
  height: 2.5px;
  background-color: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(9px, 9px);
  background-color: var(--primary);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
  transform: translateX(-15px);
  background-color: var(--primary);
}

.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
  background-color: var(--primary);
}

.nav-items {
  display: flex;
  align-items: center;
  list-style: none;
  gap: 0;
  padding: 0;
  margin: 0;
  flex: 1;
  justify-content: center;
}

.nav-items li {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 24px;
}

.nav-link.router-link-active {
  color: var(--primary);
  font-weight: 600;
}

.nav-link.router-link-active::after {
  width: 24px;
}

.nav-item-dropdown {
  position: relative;
}

.dropdown-btn {
  padding: 8px 16px;
}

.dropdown-btn svg {
  transition: transform 0.3s ease;
  font-size: 12px;
}

.dropdown-btn.active svg {
  transform: rotate(180deg);
}

.dropdown-content {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  min-width: 180px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  z-index: 999;
}

.dropdown-content.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  padding: 12px 16px;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 13px;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.dropdown-item:first-child {
  border-radius: 6px 6px 0 0;
}

.dropdown-item:last-child {
  border-radius: 0 0 6px 6px;
}

.dropdown-item:hover {
  background-color: var(--surface-alt);
  color: var(--primary);
  border-left-color: var(--primary);
  padding-left: 20px;
}

.footer {
  background-color: var(--primary);
  color: white;
  text-align: center;
  padding: 28px 20px;
  margin-top: auto;
  font-size: 13px;
  line-height: 1.6;
}

.footer p {
  margin: 0;
}

@media (max-width: 768px) {
  .nav-wrapper {
    padding: 0 16px;
    height: 60px;
    gap: 16px;
  }

  .brand-icon {
    font-size: 28px;
  }

  .brand-name {
    font-size: 14px;
  }

  .brand-desc {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .nav-items {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: var(--surface);
    border-bottom: 2px solid var(--border);
    flex-direction: column;
    gap: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    justify-content: flex-start;
    padding: 0;
  }

  .nav-items.active {
    max-height: 500px;
  }

  .nav-items li {
    width: 100%;
    border-bottom: 1px solid var(--border);
  }

  .nav-items li:last-child {
    border-bottom: none;
  }

  .nav-link {
    width: 100%;
    padding: 14px 16px;
    justify-content: space-between;
    border-radius: 0;
  }

  .nav-link::after {
    display: none;
  }

  .nav-link.router-link-active {
    background-color: rgba(26, 95, 71, 0.1);
  }

  .nav-item-dropdown .nav-link {
    padding: 14px 16px;
  }

  .dropdown-content {
    position: static;
    opacity: 0;
    visibility: hidden;
    max-height: 0;
    overflow: hidden;
    border: none;
    box-shadow: none;
    background-color: var(--surface-alt);
    border-radius: 0;
    transform: none;
    transition: all 0.3s ease;
    min-width: auto;
  }

  .dropdown-content.show {
    opacity: 1;
    visibility: visible;
    max-height: 300px;
  }

  .dropdown-item {
    padding: 12px 16px 12px 32px;
    border-left: none;
  }

  .dropdown-item:first-child {
    border-radius: 0;
  }

  .dropdown-item:last-child {
    border-radius: 0;
  }

  .dropdown-item:hover {
    padding-left: 32px;
  }
}

@media (max-width: 480px) {
  .nav-wrapper {
    padding: 0 12px;
    height: 56px;
  }

  .brand-icon {
    font-size: 24px;
  }

  .brand-name {
    font-size: 13px;
  }

  .nav-link {
    padding: 12px 14px;
    font-size: 12px;
  }

  .nav-items {
    top: 56px;
  }

  .dropdown-item {
    padding: 10px 14px 10px 28px;
    font-size: 12px;
  }

  .footer {
    padding: 20px 12px;
    font-size: 12px;
  }
}
</style>
