<template>
  <div id="app">
    <HeaderBar />

    <nav class="page-progress" aria-label="Page sections">
      <button v-for="(s, i) in sections" :key="s.id" class="dot" :class="{ active: activeIndex === i }"
        :data-label="s.label" @click="scrollTo('#' + s.id)" :aria-label="'Go to ' + s.label" />
    </nav>

    <HeroSection id="hero" class="section section--pinned" />

    <section id="gallery" class="section section--card">
      <Cards :items="cards" />
    </section>

    <SpriteZero id="Zero" class="zero-sec" />
    <Quotes id="quotes" class="section section--card" />
    <InspirationGarden id="inspiration" :items="gardenItems" class="section" />

    <Notifier :messages="toastMessages" :startDelayMs="5 * 60 * 1000" :showMs="9000" :gapMs="1200" />

    <footer id="contact" class="footer-dark section">
      <div class="container">
        <div class="grid">
          <div class="col brand-col">
            <a href="#hero" @click.prevent="scrollTo('#hero')" class="logo">
              <img src="/icons/logo.png" alt="Zero Limits" />
            </a>
            <p class="tagline">Cinematic web, re-imagined.</p>
            <ul class="social">
              <li><a href="#" aria-label="Instagram"><img src="/icons/instagram.png" alt="Instagram" /></a></li>
              <li><a href="#" aria-label="Twitter"><img src="/icons/twitter.png" alt="Twitter" /></a></li>
              <li><a href="#" aria-label="YouTube"><img src="/icons/youtube.png" alt="YouTube" /></a></li>
            </ul>
          </div>

          <div class="col">
            <h4>Explore</h4>
            <ul>
              <li><a href="#hero" @click.prevent="scrollTo('#hero')">Home</a></li>
              <li><a href="#gallery" @click.prevent="scrollTo('#gallery')">Stories</a></li>
              <li><a href="#Zero" @click.prevent="scrollTo('#Zero')">Zero</a></li>
              <li><a href="#quotes" @click.prevent="scrollTo('#quotes')">Quotes</a></li>
              <li><a href="#inspiration" @click.prevent="scrollTo('#inspiration')">Inspiration</a></li>
            </ul>
          </div>

          <div class="col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Docs</a></li>
              <li><a href="#">Showcase</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>

          <div class="col">
            <h4>Stay in the loop</h4>
            <form class="newsletter" @submit.prevent>
              <input type="email" placeholder="you@domain.com" required />
              <button type="submit">Subscribe</button>
            </form>
            <p class="note">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        <div class="divider"></div>

        <div class="bottom">
          <span>© 2025 Zero Limits</span>
          <nav>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#hero" @click.prevent="scrollTo('#hero')">Back to top</a>
          </nav>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import HeaderBar from './components/HeaderBar.vue'
  import HeroSection from './components/HeroSection.vue'
  import Cards from './components/Cards.vue'
  import Quotes from './components/Quotes.vue'
  import SpriteZero from './components/SpriteZero.vue'
  import InspirationGarden from './components/InspirationGarden.vue'
  import Notifier from './components/Notifier.vue'

  gsap.registerPlugin(ScrollTrigger)

  const activeIndex = ref(0)

  const sections = [
    { id: 'hero', label: 'Hero' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'Zero', label: 'Zero' },
    { id: 'quotes', label: 'Quotes' },
    { id: 'inspiration', label: 'Inspiration' }
  ]

  const gardenItems = [
    { img: '/statue1.png', quote: 'I AM LOYAL TO THAT THRONE, NO MATTER WHO SITS ON IT.', author: 'DORA MILAJE', cipher: 'DWYY DX9AX', body: 'Much can be gleaned from these elite warriors...' },
    { img: '/statue2.png', quote: "JUST BECAUSE SOMETHING WORKS DOESN'T MEAN IT CAN’T BE IMPROVED.", author: 'SHURI', cipher: 'C0ØYX', body: 'Both a problem solver and maker by nature...' },
    { img: '/statue3.png', quote: 'WITNESS THE STRENGTH OF THE JABARI… FIRST-HAND!', author: "M'BAKU", cipher: 'P17W6', body: 'Behold the gifts of a great leader...' }
  ]

  const cards = [
  { img: '/imgs/woman1.png', kicker: 'PRODUCTION DESIGNER', name: 'HANNAH BEACHLER', role: 'ORIGIN STORIES', tagline: 'Bringing your whole self to every project' },
  { img: '/imgs/woman2.png', kicker: 'STORYBOARD ARTIST',   name: 'JASMINE ALEXIA',  role: 'ORIGIN STORIES', tagline: 'Create the world you want to see' },
  { img: '/imgs/woman3.png', kicker: 'SCULPTOR',            name: 'ALICIA DÍAZ',     role: 'ORIGIN STORIES', tagline: 'When one door closes, carve a new one' }
]

  const toastMessages = [
    { title: 'WISDOM GUIDE', body: "You've made great strides toward finding your gift. Your legacy is a continuous journey and it does not end here.", icon: '<svg viewBox="0 0 48 48" width="40" height="40"><circle cx="24" cy="24" r="20" fill="none" stroke="#b7ffbf" stroke-width="2"/></svg>' },
    { title: 'WISDOM GUIDE', body: 'Keep exploring or share the experience with your friends. Remember, all are welcome to find their place in the Hall of Zero Limits.' },
    { title: 'THANK YOU', body: 'Thanks for visiting the Hall of Zero Limits. Come back soon and keep pushing your creativity forward.' }
  ]

  function scrollTo(sel) {
    document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' })
  }

  let cleanups = []
  onMounted(() => {
    const allSections = Array.from(document.querySelectorAll('.section'))
    allSections.forEach((sec, i) => {
      const st = ScrollTrigger.create({
        trigger: sec,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => (activeIndex.value = i),
        onEnterBack: () => (activeIndex.value = i)
      })
      cleanups.push(() => st.kill())
    })
  })
  onBeforeUnmount(() => {
    cleanups.forEach(fn => fn())
    cleanups = []
    ScrollTrigger.getAll().forEach(st => st.kill())
  })
</script>

<style scoped>
  .section,
  .zero-sec {
    position: relative;
    z-index: 1
  }

  .page-progress {
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 16px;
    z-index: 2000;
  }

  .page-progress .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1.5px solid rgba(183, 255, 191, .4);
    background: rgba(255, 255, 255, .05);
    cursor: pointer;
    transition: all .25s ease;
  }

  .page-progress .dot:hover {
    border-color: rgba(183, 255, 191, .8);
    background: rgba(183, 255, 191, .2);
    box-shadow: 0 0 8px rgba(183, 255, 191, .6);
  }

  .page-progress .dot.active {
    background: #b7ffbf;
    border-color: #b7ffbf;
    box-shadow: 0 0 12px rgba(183, 255, 191, 1), 0 0 20px rgba(183, 255, 191, .7);
  }

  .footer-dark {
    --neo: #b7ffbf;
    --bg: #0b0f0d;
    --line: rgba(255, 255, 255, .08);
    --muted: #98a49f;
    background: var(--bg);
    color: #eaf3ee;
    padding: 80px 20px 40px;
    position: relative;
  }

  .footer-dark .container {
    max-width: 1100px;
    margin: 0 auto;
    position: relative
  }

  .footer-dark .grid {
    display: grid;
    gap: 32px;
    grid-template-columns: 1.2fr 1fr 1fr 1.2fr;
  }

  .footer-dark h4 {
    font: 700 13px/1.2 Inter, sans-serif;
    letter-spacing: .2em;
    text-transform: uppercase;
    margin-bottom: 1rem;
    color: #f0faf5;
    opacity: .9;
  }

  .footer-dark .brand-col .logo img {
    height: 32px
  }

  .footer-dark .tagline {
    margin: .8rem 0 1.2rem;
    color: var(--muted);
    font-size: 14px
  }

  .footer-dark ul {
    list-style: none;
    margin: 0;
    padding: 0
  }

  .footer-dark ul li+li {
    margin-top: .5rem
  }

  .footer-dark a {
    color: #f5f5f7;
    opacity: .75;
    text-decoration: none;
    transition: opacity .2s
  }

  .footer-dark a:hover {
    opacity: 1;
    text-shadow: 0 0 6px var(--neo)
  }

  .footer-dark .social {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 1rem
  }

  .footer-dark .social img {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: rgba(255, 255, 255, .17);
    transition: background .2s, box-shadow .2s, transform .2s;
  }

  .footer-dark .social a:hover img {
    background: rgba(183, 255, 191, .1);
    box-shadow: 0 0 8px rgba(183, 255, 191, .3);
    transform: translateY(-2px)
  }

  .footer-dark .newsletter {
    display: flex;
    background: rgba(255, 255, 255, .05);
    border: 1px solid var(--line);
    border-radius: 12px;
    overflow: hidden
  }

  .footer-dark .newsletter input {
    flex: 1;
    padding: 12px;
    border: 0;
    background: transparent;
    color: #fff;
    font-size: 14px
  }

  .footer-dark .newsletter input::placeholder {
    color: #909c95
  }

  .footer-dark .newsletter button {
    background: var(--neo);
    color: #0b0f0d;
    font: 700 12px/1 Inter;
    letter-spacing: .1em;
    border: 0;
    padding: 0 16px;
    cursor: pointer;
    transition: background .2s;
  }

  .footer-dark .newsletter button:hover {
    background: #d7ffe1;
    box-shadow: 0 6px 18px rgba(183, 255, 191, .25)
  }

  .footer-dark .note {
    font-size: 12px;
    color: #98a49f;
    margin-top: .5rem
  }

  .footer-dark .divider {
    height: 1px;
    background: rgba(255, 255, 255, .08);
    margin: 40px 0 24px
  }

  .footer-dark .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: #c9d5d0
  }

  .footer-dark .bottom nav {
    display: flex;
    gap: 20px
  }

  @media (max-width: 1100px) {
    .section--card {
      display: flex;
      justify-content: center;
      padding: clamp(32px, 6vw, 72px) 16px
    }
  }

  @media (max-width: 900px) {
    .footer-dark .grid {
      grid-template-columns: 1fr 1fr;
      gap: 24px
    }
  }

  @media (max-width: 600px) {
    .footer-dark .grid {
      grid-template-columns: 1fr
    }
  }

  @media (max-width: 600px) {
    .footer-dark .bottom {
      flex-direction: column;
      gap: 10px;
      align-items: flex-start
    }
  }
</style>