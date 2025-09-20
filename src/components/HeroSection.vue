<template>
  <section class="hero section section--pinned" ref="root">
    <div class="hero-bg">
      <video ref="videoEl" class="hero-video"  preload="metadata" autoplay muted playsinline
        loop>
        <source src="/animVideo.mp4" type="video/mp4" />
      </video>
      <div class="vignette" aria-hidden="true"></div>
    </div>

    <div class="hero-center">
      <div class="logo" ref="logo">
        <div class="logo-top">THE&nbsp;HALL&nbsp;OF</div>
        <div class="logo-main">ZERO&nbsp;LIMITS</div>
        <div class="logo-dot" aria-hidden="true"></div>
      </div>

      <div class="hero-bottom" ref="bottom">
        <div class="botm">
          <div class="welcome">WELCOME</div>
          <button class="scroll-cue" @click="toNext" aria-label="Scroll to next">
            <span class="cue-arrow">▼</span>
          </button>
        </div>
        <img class="hero-mark" src="/icons/logo2.png" alt="" aria-hidden="true" />
      </div>
    </div>
  </section>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  gsap.registerPlugin(ScrollTrigger)

  const root = ref(null)
  const videoEl = ref(null)
  const logo = ref(null)
  const bottom = ref(null)
  let tl

  function toNext() {
    const el = document.querySelector('#about') || document.querySelectorAll('.section')[1]
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  onMounted(async () => {
    await nextTick()
    const v = videoEl.value
    if (!v) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    v.addEventListener('canplay', () => { v.play().catch(() => { }) }, { once: true })
    gsap.set(v, { force3D: true, willChange: 'transform' })

    if (!prefersReduced) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.value,
          start: 'top top',
          end: 'bottom top+=5%',
          scrub: true,
          pin: true
        }
      })
        .fromTo(v, { scale: 1.04 }, { scale: 1, ease: 'none' }, 0)
        .to(bottom.value, { opacity: 0, yPercent: 20, ease: 'none' }, 0)
        .to(logo.value, { opacity: 0.9, yPercent: -6, ease: 'none' }, 0)
    }
  })

  onBeforeUnmount(() => {
    tl?.scrollTrigger?.kill()
    tl?.kill()
  })
</script>

<style scoped>
  .hero {
    padding: 0;
    min-height: 100svh
  }

  .hero-bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden
  }

  .hero-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 30%;
    display: block;
    backface-visibility: hidden;
    transform: translateZ(0)
  }

  .hero-center {
    position: relative;
    z-index: 2;
    display: grid;
    place-items: center;
    min-height: 100svh;
    padding: 0 16px
  }

  .logo {
    text-align: center
  }

  .logo-top {
    font: 700 clamp(16px, 2.2vw, 22px)/1.1 Inter, system-ui, Arial;
    letter-spacing: .45em;
    color: #eaffea;
    text-transform: uppercase
  }

  .logo-main {
    font-family: Cinzel, serif;
    font-weight: 900;
    font-size: clamp(42px, 7.5vw, 120px);
    line-height: .95;
    letter-spacing: .06em;
    color: #fff;
    text-shadow: 0 0 12px rgba(130, 255, 160, .7)
  }

  .logo-dot {
    width: 18px;
    height: 18px;
    margin: 8px auto 0;
    border-radius: 4px;
    transform: rotate(45deg);
    background: #ccffd9
  }

  .hero-bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 36px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: center
  }

  .botm {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px
  }

  .welcome {
    color: #eaffea;
    letter-spacing: .25em;
    font: 600 12px/1 Inter;
    text-transform: uppercase
  }

  .scroll-cue {
    all: unset;
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, .25);
    background: rgba(0, 0, 0, .35)
  }

  .cue-arrow {
    display: inline-block;
    color: rgba(255, 255, 255, .82);
    animation: float 1.8s ease-in-out infinite
  }

  .hero-mark {
    position: absolute;
    right: 16px;
    bottom: 0;
    width: 349px;
    height: 66px;
    border: 1px solid rgba(255, 255, 255, .2)
  }

  @keyframes float {

    0%,
    100% {
      transform: translateY(-2px)
    }

    50% {
      transform: translateY(2px)
    }
  }

  .vignette {
    position: fixed;
    inset: -10%;
    z-index: 1;
    pointer-events: none;
    background: radial-gradient(60% 60% at 50% 60%, transparent, rgba(0, 0, 0, .3) 70%)
  }

  @media (max-width: 840px) {
    .hero-bottom {
      flex-direction: column;
      align-items: center;
      gap: 12px
    }

    .hero-mark {
      position: static;
      width: 260px;
      height: auto
    }
  }

  @media (max-width: 640px) {
    .logo-main {
      font-size: clamp(36px, 12vw, 60px)
    }

    .logo-top {
      letter-spacing: .35em
    }
  }
</style>