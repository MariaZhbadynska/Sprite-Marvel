<template>
  <section class="inspiration-section">
    <div
      v-for="(quote, i) in quotes"
      :key="i"
      class="quote-card"
      ref="cards"
    >
      <div class="quote-text">“{{ quote.text }}”</div>
      <div class="quote-author">{{ quote.author }}</div>
      <div class="quote-role">{{ quote.role }}</div>
      <p class="quote-desc">{{ quote.desc }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cards = ref([])

const quotes = [
  {
    text: 'I am loyal to that throne, no matter who sits on it.',
    author: 'DORA MILAJE',
    role: 'ELITE WARRIOR',
    desc: 'Much can be gleaned from these elite warriors who provide protection...'
  },
  {
    text: "Just because something works doesn’t mean it can’t be improved.",
    author: 'SHURI',
    role: 'INVENTOR',
    desc: 'Both a problem solver and maker by nature, Shuri is a visionary...'
  },
  {
    text: 'Witness the strength of the Jabari… first-hand!',
    author: "M'BAKU",
    role: 'LEADER',
    desc: 'Behold the gifts of a great leader: determination, courage, and passion...'
  }
]

onMounted(() => {
  cards.value.forEach((card, i) => {
    gsap.from(card, {
      x: 200,
      opacity: 0,
      duration: 1.75,
      delay: i * 0.50,
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
  })
})
</script>

<style scoped>
.inspiration-section {
  display: flex;
  flex-direction: column;
  gap: 60px;
  max-width: 860px;
  margin: 0 auto;
  padding: 100px 20px;
}

.quote-card {
  background: rgba(15,15,20,.55);
  border: 1px solid rgba(65,255,164,.3);
  border-radius: 18px;
  padding: 40px 28px;
  backdrop-filter: blur(6px);
  box-shadow: 0 0 22px rgba(65,255,164,.08);
  color: #f5f5f7;
}

.quote-text {
  font: 700 clamp(20px,3vw,28px)/1.2 "Cinzel", serif;
  color: #b7ffbf;
  text-shadow: 0 0 10px rgba(65,255,164,.5);
  margin-bottom: 20px;
  text-align: center;
}

.quote-author {
  text-align: center;
  font: 600 14px/1 Inter, sans-serif;
  letter-spacing: .2em;
  margin-bottom: 6px;
}

.quote-role {
  text-align: center;
  font: 500 12px/1 Inter, sans-serif;
  color: #b7ffbf;
  margin-bottom: 18px;
}

.quote-desc {
  font: 400 15px/1.5 Inter, sans-serif;
  color: #c2c6cc;
  text-align: center;
}
</style>
