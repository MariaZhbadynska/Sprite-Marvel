<template>
  <section class="cards">
    <div class="card-cell">
      <HoloCard img="./imgs/woman1.png" kicker="PRODUCTION DESIGNER" name="HANNAH BEACHLER" role="ORIGIN STORIES"
        tagline="Bringing your whole self to every project" />
    </div>

    <div class="card-cell">
      <HoloCard img="./imgs/woman2.png" kicker="STORYBOARD ARTIST" name="JASMINE ALEXIA" role="ORIGIN STORIES"
        tagline="Create the world you want to see" />
    </div>

    <div class="card-cell">
      <HoloCard img="./imgs/woman3.png" kicker="SCULPTOR" name="ALICIA DÍAZ" role="ORIGIN STORIES"
        tagline="When one door closes, carve a new one" />
    </div>
  </section>
</template>

<script setup>
  import HoloCard from '../components/HoloCard.vue'
</script>


<style scoped>
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, max-content));
    justify-content: center;
    gap: clamp(24px, 3vw, 36px);
    align-items: center;
  }


  .card-cell {
    perspective: 1200px;
    overflow: visible;
  }

  @media (max-width: 1100px) {
    .cards {
    grid-template-columns: repeat(2, minmax(260px, 1fr));
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    }
  }

  @media (max-width: 760px) {
    .cards {
      grid-template-columns: 1fr;
    }
  }
</style>