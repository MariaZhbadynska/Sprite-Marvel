<template>
  <div class="toast-container position-fixed bottom-0 start-0 p-3 ig-toast-container" aria-live="polite"
    aria-atomic="true">
    <transition name="ig-toast-fade">
      <div v-if="visible && current" class="toast show ig-toast" role="alert" aria-live="assertive" aria-atomic="true"
        @mouseenter="pause" @mouseleave="resume">
        <div class="toast-body d-flex align-items-start gap-3">
          <div v-if="current.icon" class="ig-icon" v-html="current.icon"></div>

          <div class="flex-grow-1">
            <strong v-if="current.title" class="d-block ig-title">{{ current.title }}</strong>
            <div class="ig-msg">{{ current.body }}</div>
          </div>

          <button type="button" class="btn-close ig-close" aria-label="Close" @click="skip"></button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  const props = defineProps({
    messages: { type: Array, default: () => [] },
    startDelayMs: { type: Number, default: 15 * 60 * 1000 },
    showMs: { type: Number, default: 8000 },
    gapMs: { type: Number, default: 1200 }
  })

  const idx = ref(0)
  const current = ref(null)
  const visible = ref(false)

  let tStart, tHide, tNext
  let remaining = props.showMs
  let pauseStarted = 0

  function play(i) {
    if (i >= props.messages.length) return
    idx.value = i
    current.value = props.messages[i]
    visible.value = true
    remaining = props.showMs
    armHide()
  }

  function armHide() {
    clearTimeout(tHide)
    tHide = setTimeout(() => {
      visible.value = false
      clearTimeout(tNext)
      tNext = setTimeout(() => play(idx.value + 1), props.gapMs)
    }, remaining)
  }

  function pause() {
    pauseStarted = Date.now()
    clearTimeout(tHide)
  }

  function resume() {
    if (!pauseStarted) return
    remaining -= Date.now() - pauseStarted
    pauseStarted = 0
    if (remaining < 300) remaining = 300
    armHide()
  }

  function skip() {
    visible.value = false
    clearTimeout(tHide)
    clearTimeout(tNext)
    tNext = setTimeout(() => play(idx.value + 1), 150)
  }

  onMounted(() => {
    const delay = import.meta.env.DEV ? 3000 : props.startDelayMs
    tStart = setTimeout(() => play(0), delay)
  })

  onBeforeUnmount(() => {
    clearTimeout(tStart)
    clearTimeout(tHide)
    clearTimeout(tNext)
  })
</script>

<style scoped>
  .ig-toast-container {
    z-index: 4000;
    pointer-events: none;
  }

  .ig-toast {
    pointer-events: auto;
    min-width: min(520px, 92vw);
    max-width: 92vw;
    border: 1px solid rgba(183, 255, 191, .55);
    background: linear-gradient(180deg, rgba(15, 15, 20, .78), rgba(15, 15, 20, .72));
    color: #dfffe8;
    border-radius: 16px;
    box-shadow: 0 0 24px rgba(183, 255, 191, .35), inset 0 0 0 1px rgba(255, 255, 255, .06);
    backdrop-filter: blur(6px) saturate(110%);
  }

  .ig-title {
    font: 800 12px/1 Inter, system-ui;
    letter-spacing: .24em;
    text-transform: uppercase;
    color: #eafff2;
    opacity: .9;
    margin-bottom: .25rem;
  }

  .ig-msg {
    font: 500 15px/1.6 Inter, system-ui;
    color: #cfeadd
  }

  .ig-icon {
    width: 40px;
    height: 40px;
    filter: drop-shadow(0 0 10px rgba(183, 255, 191, .65))
  }

  .ig-close {
    filter: invert(1) contrast(1.2)
  }

  .ig-toast-fade-enter-active,
  .ig-toast-fade-leave-active {
    transition: opacity .18s ease, transform .18s ease
  }

  .ig-toast-fade-enter-from,
  .ig-toast-fade-leave-to {
    opacity: 0;
    transform: translateY(6px)
  }
</style>