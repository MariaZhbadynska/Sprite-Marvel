<template>
    <div class="holo-card" :style="{'--img': `url(${img})`}" ref="card">
        <svg class="frame" viewBox="0 0 100 150" preserveAspectRatio="none" aria-hidden="true">
            <path d="M6,0 H94 L100,8 V142 L94,150 H6 L0,142 V8 Z
             M8,6 H92 L94,9 V141 L92,144 H8 L6,141 V9 Z" fill="none" stroke="rgba(64,255,164,.9)" stroke-width="1.5"
                stroke-linejoin="round" vector-effect="non-scaling-stroke" />
        </svg>

        <div class="holo-bg"></div>
        <div class="scan"></div>
        <div class="noise"></div>

        <div class="inner">
            <div class="title">
                <div class="kicker">{{ kicker }}</div>
                <h3 class="name">{{ name }}</h3>
                <div class="role">{{ role }}</div>
            </div>
            <p class="tagline">{{ tagline }}</p>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const props = defineProps({
        img: { type: String, required: true },
        kicker: { type: String, default: '' },
        name: { type: String, required: true },
        role: { type: String, default: '' },
        tagline: { type: String, default: '' },
        tilt: { type: Number, default: 10 }
    })

    const card = ref(null)



    function onLeave() {
        card.value.style.setProperty('--rx', `0deg`)
        card.value.style.setProperty('--ry', `0deg`)
    }
</script>

<style scoped>
    .holo-card {
        --c-neon: #41ffa4;
        --c-neon-dim: rgba(64, 255, 164, .35);
        --c-text: #dfffe8;
        --c-text-dim: rgba(223, 255, 232, .8);
        --radius: 18px;
        --rx: 0deg;
        --ry: 0deg;
        --hlx: 50%;
        --hly: 50%;
        width: min(23rem, 86vw);
        aspect-ratio: 2/3;
        transform: perspective(800px) rotateX(0) rotateY(0);
        transition: transform .18s ease-out, box-shadow .18s ease-out;
        position: relative;
        border-radius: var(--radius);
        transform-style: preserve-3d;
        box-shadow: 0 12px 40px rgba(0, 0, 0, .45), inset 0 0 0 1px var(--c-neon-dim);
        overflow: hidden;
        background: #0b0f0d;
        isolation: isolate;
    }

    .holo-card:hover {
        transform: perspective(800px) rotateX(-3deg) rotateY(3deg);
        box-shadow: 0 14px 32px rgba(0, 0, 0, .4);
    }

    .holo-card::after {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(200px 200px at 50% 60%, rgba(255, 255, 255, .10), transparent 40%);
        pointer-events: none;
        opacity: 0;
        transition: opacity .18s ease-out;
    }

    .holo-card:hover::after {
        opacity: 1;
    }

    .frame {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 3;
        filter: drop-shadow(0 0 6px rgba(64, 255, 164, .6)) drop-shadow(0 0 16px rgba(64, 255, 164, .25));
    }

    .holo-bg {
        position: absolute;
        inset: 0;
        z-index: 0;
        background:
            repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0, 0, 0, .25) 3px),
            linear-gradient(90deg, rgba(65, 255, 164, .06) 0, rgba(65, 255, 164, 0) 1px),
            radial-gradient(60% 60% at 50% 55%, transparent 0%, rgba(0, 0, 0, .45) 70%, rgba(0, 0, 0, .75) 100%),
            var(--img) center/cover no-repeat;
        filter: saturate(.9) contrast(.95) brightness(.8);
    }

    .scan {
        position: absolute;
        inset: -40% -10% auto -10%;
        height: 40%;
        background: linear-gradient(to bottom, transparent, rgba(64, 255, 164, .15), transparent);
        mix-blend-mode: screen;
        z-index: 2;
        animation: scan 4.2s linear infinite;
        pointer-events: none;
    }

    @keyframes scan {
        0% {
            transform: translateY(-10%)
        }

        100% {
            transform: translateY(260%)
        }
    }

    .noise {
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        opacity: .15;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>');
        mix-blend-mode: overlay;
        animation: n .6s steps(2, end) infinite;
    }

    @keyframes n {
        to {
            transform: translate3d(0, 0, 0)
        }
    }

    .holo-card::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 2;
        pointer-events: none;
        background: radial-gradient(300px 300px at var(--hlx) var(--hly), rgba(64, 255, 164, .15), transparent 40%);
        mix-blend-mode: screen;
    }

    .inner {
        position: absolute;
        inset: 0;
        z-index: 4;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        padding: clamp(16px, 3vw, 24px);
        text-align: center;
    }

    .kicker {
        font: 600 clamp(10px, 1.2vw, 12px)/1.2 Inter, system-ui, Arial;
        letter-spacing: .3em;
        text-transform: uppercase;
        color: var(--c-text-dim);
        opacity: .95;
        margin-bottom: 6px;
    }

    .name {
        margin: 0;
        font: 900 clamp(22px, 4.8vw, 38px)/1.05 "Cinzel", serif;
        letter-spacing: .06em;
        color: #fff;
        text-shadow: 0 0 12px rgba(64, 255, 164, .28);
    }

    .role {
        margin-top: 6px;
        color: var(--c-text);
        opacity: .95;
        font: 600 clamp(10px, 1.4vw, 12px)/1 Inter;
        letter-spacing: .22em;
        text-transform: uppercase;
    }

    .tagline {
        margin-top: clamp(10px, 1.6vw, 16px);
        color: #41ffa4;
        font: 600 clamp(13px, 2vw, 18px)/1.35 Inter, system-ui, Arial;
        letter-spacing: .02em;
        text-shadow: 0 0 10px rgba(64, 255, 164, .35);
        max-width: 92%;
        word-break: break-word;
    }

    @media (max-width: 560px) {
        .name {
            font-size: clamp(20px, 10vw, 32px)
        }

        .role {
            letter-spacing: .18em
        }

        .tagline {
            font-size: clamp(14px, 4.2vw, 17px)
        }
    }
</style>