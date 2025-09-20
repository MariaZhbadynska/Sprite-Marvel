<template>
    <section class="adneo">
        <figure class="adneo-media" :style="{'--img': `url(${img})`}">
            <div class="adneo-media__overlay"></div>
            <div class="adneo-media__scan" aria-hidden="true"></div>
            <div class="adneo-media__grain" aria-hidden="true"></div>
            <figcaption class="sr-only">Sprite Zero Sugar — portrait</figcaption>
        </figure>

        <div class="adneo-card">
            <h2 class="adneo-brand">
                <span>SPRITE</span>
                <em>ZERO SUGAR</em><sup>®</sup>
            </h2>
            <p class="adneo-tag">OPEN YOUR INFINITE POTENTIAL</p>
        </div>
    </section>
</template>

<script setup>
    const props = defineProps({
        img: { type: String, default: '/imgs/man4.png' }
    })
</script>

<style scoped>
    :root,
    :host {
        --neo: rgb(33, 205, 113);
        --neo-2: #7cfcc2;
        --bg: #0b0e0c;
        --ink: #f4f6f7;
        --muted: #bfc7c7;
        --glass: rgba(18, 22, 20, .5);
        --stroke: rgba(170, 253, 209, .25);
    }

    .adneo {
        position: relative;
        display: grid;
        grid-template-columns: 1.1fr .9fr;
        gap: clamp(20px, 4vw, 46px);
        align-items: center;
        min-height: 92svh;
        padding: clamp(16px, 3vw, 28px);
        background:
            radial-gradient(1200px 800px at 10% 10%, rgba(122, 255, 190, .07), transparent 60%),
            radial-gradient(1200px 800px at 90% 90%, rgba(122, 255, 190, .06), transparent 60%),
            var(--bg);
        isolation: isolate;
    }

    .adneo-media {
        position: relative;
        margin: 0;
        width: 100%;
        border-radius: 23px;
        aspect-ratio: 4/3;
        overflow: hidden;
        background: var(--img) center/cover no-repeat;
        transform-style: preserve-3d;
        box-shadow: 0 20px 60px rgba(0, 0, 0, .55), 0 0 38px rgba(122, 255, 190, .16);
        clip-path: path("M20 0 H100% V88% C100% 95% 95% 100% 88% 100% H12% C5% 100% 0 95% 0 88% Z");
    }

    @media (hover:hover) {
        .adneo-media:hover {
            transform: perspective(1000px) rotateX(1deg) rotateY(-1.5deg);
        }
    }

    .adneo-media__overlay {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
            linear-gradient(180deg, rgba(0, 0, 0, .25), transparent 35%),
            linear-gradient(0deg, rgba(0, 0, 0, .25), transparent 35%),
            linear-gradient(90deg, rgba(170, 253, 209, .08) 1px, transparent 1px),
            repeating-linear-gradient(180deg, rgba(255, 255, 255, .03) 0 1px, transparent 1px 3px);
        mix-blend-mode: screen;
        opacity: .8;
    }

    .adneo-media__scan {
        position: absolute;
        inset: -40% -10% auto -10%;
        height: 42%;
        background: linear-gradient(to bottom, transparent, rgba(122, 255, 190, .22), transparent);
        mix-blend-mode: screen;
        pointer-events: none;
        animation: scan 4.4s linear infinite;
    }

    @keyframes scan {
        0% {
            transform: translateY(-10%)
        }

        100% {
            transform: translateY(260%)
        }
    }

    .adneo-media__grain {
        position: absolute;
        inset: 0;
        opacity: .12;
        pointer-events: none;
        mix-blend-mode: overlay;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>');
        animation: n .6s steps(2, end) infinite;
    }

    @keyframes n {
        to {
            transform: translate3d(0, 0, 0)
        }
    }

    .adneo-card {
        position: relative;
        color: var(--ink);
        background:
            radial-gradient(60% 60% at 50% 0%, rgba(122, 255, 190, .1), transparent 70%),
            var(--glass);
        backdrop-filter: blur(10px) saturate(115%);
        border: 1px solid var(--stroke);
        border-radius: 22px;
        padding: clamp(20px, 3.2vw, 36px);
        box-shadow: 0 18px 60px rgba(0, 0, 0, .45), inset 0 0 0 1px rgba(255, 255, 255, .05);
        --c: rgba(255, 255, 255, .2);
        mask:
            radial-gradient(200px 200px at 28px 28px, transparent 24px, #000 25px),
            radial-gradient(200px 200px at calc(100% - 28px) 28px, transparent 24px, #000 25px),
            radial-gradient(200px 200px at 28px calc(100% - 28px), transparent 24px, #000 25px),
            radial-gradient(200px 200px at calc(100% - 28px) calc(100% - 28px), transparent 24px, #000 25px);
    }

    .adneo-brand {
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: .08em;
        color: #fff;
        text-shadow: 0 0 16px rgba(122, 255, 190, .5);
    }

    .adneo-brand span {
        font: 900 clamp(28px, 5.4vw, 48px)/1.08 "Cinzel", serif;
        letter-spacing: .06em;
    }

    .adneo-brand em {
        font-style: normal;
        font: 600 clamp(26px, 4.8vw, 44px)/1.06 "Cinzel", serif;
        letter-spacing: .04em;
    }

    .adneo-brand sup {
        font-size: .5em;
        opacity: .9;
        margin-left: .15em;
    }

    .adneo-tag {
        margin-top: clamp(10px, 1.8vw, 16px);
        color: #fff;
        font: 800 clamp(11px, 2vw, 14px)/1.45 Inter, system-ui;
        letter-spacing: .28em;
        text-transform: uppercase;
        text-shadow: 0 0 12px rgba(122, 255, 190, .45);
    }

    @media (max-width:980px) {
        .adneo {
            grid-template-columns: 1fr;
            min-height: auto
        }

        .adneo-media {
            aspect-ratio: 16/10
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .adneo-media:hover {
            transform: none
        }

        .adneo-media__scan {
            animation: none
        }

        .adneo-media__grain {
            animation: none
        }
    }

    .sr-only {
        position: absolute !important;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
</style>