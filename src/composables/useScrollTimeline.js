import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export function setupScroll({ onSectionChange = () => {} } = {}) {
  const lenis = new Lenis({ smoothWheel: true, smoothTouch: false, lerp: 0.08 })

  let rafId = 0
  const raf = (time) => {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  lenis.on('scroll', ScrollTrigger.update)

  const triggers = []
  const sections = Array.from(document.querySelectorAll('.section'))

  sections.forEach((el, i) => {
    const t = ScrollTrigger.create({
      trigger: el,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => onSectionChange(i),
      onEnterBack: () => onSectionChange(i)
    })
    triggers.push(t)
  })

  return () => {
    cancelAnimationFrame(rafId)
    lenis.destroy()
    triggers.forEach(t => t.kill())
  }
}
