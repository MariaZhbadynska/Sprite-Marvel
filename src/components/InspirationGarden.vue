<template>
    <section class="ig">
        <header class="ig-heading">
            <h2 class="ig-title">
                <span class="ig-kicker">INSPIRATION</span>
                <span class="ig-main">GARDEN</span>
            </h2>
            <p class="ig-sub">WHERE INGENUITY OVERFLOWS</p>
        </header>

        <div class="ig-grid">
            <button v-for="(it,i) in items" :key="i" class="ig-btn"
                :class="{ active: active === i, done: opened.has(i) }" :aria-pressed="active === i" @click="toggle(i)">
                <svg class="ig-check" viewBox="0 0 16 12" aria-hidden="true">
                    <path d="M1 6l4 4L15 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
                <span>{{ active === i ? 'CLOSE' : 'READ' }}</span>
            </button>
        </div>

        <transition name="ig-fade">
            <div v-if="active !== null" class="ig-content">
                <button class="ig-close" @click="active=null" aria-label="Close">✕</button>
                <h3 class="ig-quote">“{{ items[active].quote }}”</h3>
                <div class="ig-author">
                    <div class="name">{{ items[active].author }}</div>
                    <div class="cipher" v-if="items[active].cipher">{{ items[active].cipher }}</div>
                </div>
                <p class="ig-body">{{ items[active].body }}</p>
            </div>
        </transition>
    </section>
</template>

<script setup>
    import { ref } from 'vue'

    const items = [
        {
            quote: 'I AM LOYAL TO THAT THRONE, NO MATTER WHO SITS ON IT.',
            author: 'DORA MILAJE',
            cipher: '',
            body:
                'Much can be gleaned from these elite warriors who provide protection and intel to protect the crown and country. ' +
                'Though known for being physically skilled in battle, their minds are also among their greatest weapons—overcoming and embracing adversity ' +
                'and solving problems as quickly as they arise. Do the Dora’s gifts reflect yours?'
        },
        {
            quote: 'JUST BECAUSE SOMETHING WORKS DOESN’T MEAN IT CAN’T BE IMPROVED.',
            author: 'SHURI',
            cipher: '',
            body:
                'Both a problem solver and maker by nature, Shuri is a visionary, illuminator, decoder, explorer and avant-garde. ' +
                'She’s unapologetically bold in her role as a leader across the board—as a master engineer, designer, tech inventor, mathematician, and scientist. ' +
                'Her innovations are of incredible importance to her community. Perhaps when you look at Shuri, you see glimpses of yourself there as well.'
        },
        {
            quote: 'WITNESS THE STRENGTH OF THE JABARI... FIRST-HAND!',
            author: "M'BAKU",
            cipher: '',
            body:
                'Behold the gifts of a great leader: determination, courage, and passion. ' +
                'M’Baku’s superhuman physical agility and strength are particularly impressive when combined with his superior mental agility—' +
                'strategic, analytical, patient, and tenacious when met with obstacles. Do you think these characteristics would serve you well?'
        }
    ]

    const active = ref(null)
    const opened = ref(new Set())

    function toggle(i) {
        active.value = active.value === i ? null : i
        if (active.value !== null) opened.value = new Set(opened.value).add(i)
    }
</script>

<style scoped>
    .ig {
        --neo: #b7ffbf;
        --muted: #c2c6cc;
        --line: rgba(255, 255, 255, .12);
        background: #0b0b0f;
        padding: clamp(48px, 8vw, 96px) 16px;
    }

    .ig-heading {
        text-align: center;
        margin-bottom: clamp(20px, 4vw, 40px)
    }

    .ig-title {
        margin: 0;
        display: grid;
        gap: .2em;
        font-family: Cinzel, serif;
        letter-spacing: .06em;
    }

    .ig-kicker {
        font: 700 clamp(12px, 1.4vw, 14px)/1 Inter, system-ui;
        letter-spacing: .28em;
        color: #e7fff0;
    }

    .ig-main {
        font-weight: 800;
        font-size: clamp(28px, 6vw, 56px);
        color: #fff;
        text-shadow: 0 0 10px rgba(183, 255, 191, .22);
    }

    .ig-sub {
        margin: .5rem 0 0;
        color: var(--muted);
        letter-spacing: .24em;
        text-transform: uppercase;
        font: 600 clamp(10px, 1.2vw, 12px)/1.3 Inter, system-ui;
    }

    .ig-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
        max-width: 760px;
        margin: 0 auto;
    }

    @media (max-width:880px) {
        .ig-grid {
            grid-template-columns: repeat(2, 1fr)
        }
    }

    @media (max-width:560px) {
        .ig-grid {
            grid-template-columns: 1fr
        }
    }

    .ig-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 14px 18px;
        border-radius: 999px;
        border: 1px solid var(--neo);
        background: transparent;
        color: #fff;
        cursor: pointer;
        font: 800 12px/1 Inter, system-ui;
        letter-spacing: .22em;
        text-transform: uppercase;
        transition: transform .12s ease, box-shadow .12s ease, background .12s ease;
    }

    .ig-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 0 16px rgba(183, 255, 191, .38);
        background: rgba(183, 255, 191, .08)
    }

    .ig-btn.active {
        background: rgba(183, 255, 191, .14)
    }

    .ig-btn.done {
        box-shadow: inset 0 0 8px rgba(183, 255, 191, .3)
    }

    .ig-check {
        width: 16px;
        height: 12px;
        color: var(--neo)
    }

    .ig-content {
        position: relative;
        margin: 20px auto 0;
        max-width: 1100px;
        border: 1px solid var(--line);
        border-radius: 16px;
        background: #0e1111;
        padding: clamp(18px, 3vw, 32px);
        text-align: center;
    }

    .ig-close {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 36px;
        height: 36px;
        border-radius: 8px;
        border: 1px solid var(--line);
        background: transparent;
        color: #e8fff3;
        cursor: pointer;
    }

    .ig-quote {
        margin: 0 0 clamp(12px, 2.6vw, 20px);
        font: 900 clamp(20px, 4vw, 40px)/1.15 Inter, system-ui;
        color: #dfffe8;
        text-shadow: 0 0 8px rgba(183, 255, 191, .22);
    }

    .ig-author {
        margin: 0 0 12px;
        display: grid;
        gap: 6px;
        justify-items: center
    }

    .ig-author .name {
        font: 800 12px/1 Inter, system-ui;
        letter-spacing: .28em;
        text-transform: uppercase;
        color: #fff
    }

    .ig-author .cipher {
        font: 700 12px/1 Inter, system-ui;
        letter-spacing: .34em;
        color: var(--neo)
    }

    .ig-body {
        margin: 0 auto;
        max-width: 80ch;
        color: #e7efe9;
        opacity: .92;
        font: 500 clamp(14px, 1.4vw, 18px)/1.65 Inter, system-ui;
    }

    .ig-fade-enter-active,
    .ig-fade-leave-active {
        transition: opacity .16s ease
    }

    .ig-fade-enter-from,
    .ig-fade-leave-to {
        opacity: 0
    }
</style>