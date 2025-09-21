<template>
  <header class="site-header navbar navbar-dark fixed-top">
    <div class="container-fluid px-4">
      <a href="#hero" class="navbar-brand brand" @click.prevent="scrollTo('#hero')">
        <img src="/icons/logo.png" alt="Zero Limits logo" />
        <span class="ms-2">Zero&nbsp;Limits</span>
      </a>

      <button
        class="navbar-toggler neon-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="neon-burger" aria-hidden="true"></span>
      </button>
    </div>


    <nav id="mainNav" class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto gap-1 text-center">
        <li class="nav-item">
          <a class="nav-link" href="#hero"         @click.prevent="go('#hero')">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#gallery"      @click.prevent="go('#gallery')">Cards</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#Zero"         @click.prevent="go('#Zero')">Zero</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#Quotes"       @click.prevent="go('#Quotes')">Quotes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#Inspiration"  @click.prevent="go('#Inspiration')">Garden</a>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script setup>

import { Collapse } from 'bootstrap'


function scrollToSel(sel) {
  document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" });
}
function go(sel) {
  const el = document.getElementById("mainNav");
  if (el?.classList.contains("show")) {
    const collapse = Collapse.getOrCreateInstance(el)
    collapse.hide()
  }
  scrollToSel(sel);
}
const scrollTo = scrollToSel;
</script>

<style scoped>
.site-header {
  background: rgba(15, 15, 20, 0.25);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.5rem 1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #f5f5f7;
}
.brand img {
  height: 36px;
  width: auto;
}
.brand span {
  font: 700 14px/1 Inter, system-ui, sans-serif;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.navbar-nav .nav-link {
  color: #f5f5f7;
  opacity: 0.9;
  padding: 0.8rem;
}
.navbar-nav .nav-link:hover {
  opacity: 1;
}

.neon-toggler {
  border: none;
  background: transparent;
}
.neon-burger {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(15, 15, 20, 0.35);
  border: 1.5px solid rgba(255, 255, 255, 0.85);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15),
    0 8px 20px rgba(0, 0, 0, 0.35);
}
.neon-burger::before,
.neon-burger::after {
  content: "";
  position: absolute;
  left: 50%;
  width: 22px;
  height: 3px;
  transform: translateX(-50%);
  background: #2dff73;
  border-radius: 2px;
  box-shadow: 0 0 10px #2dff73, 0 0 18px rgba(45, 255, 115, 0.7);
}
.neon-burger::before {
  top: 18px;
}
.neon-burger::after {
  top: 28px;
}


.navbar-toggler[aria-expanded="true"] .neon-burger::before,
.navbar-toggler[aria-expanded="true"] .neon-burger::after {
  top: 50%;
  width: 24px;
}
.navbar-toggler[aria-expanded="true"] .neon-burger::before {
  transform: translate(-50%, -50%) rotate(45deg);
}
.navbar-toggler[aria-expanded="true"] .neon-burger::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.navbar-collapse {
  background: rgba(15, 15, 20, 0.45);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  margin: 12px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

@media (max-width: 860px) {
.navbar-brand span{
  display: none;
}

}
</style>
