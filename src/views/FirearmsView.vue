<script setup>
import MediaPlaceholder from '../components/MediaPlaceholder.vue'
</script>

<template>
  <div>
    <header class="page-hero">
      <div class="container">
        <p class="eyebrow">In partnership</p>
        <h1 class="display">Firearms for film & television</h1>
        <p class="lede" style="margin-top: 16px">
          Safe, convincing firearm handling is now part of the job for an action performer. Since the Firearms
          (Amendment) Act 1997 it has been difficult to get the training that lets someone portray that handling
          accurately. Stagefight teaches it with Firearms Training for Film & TV.
        </p>
      </div>
    </header>

    <section class="section paper">
      <div class="container article-layout">
        <div class="prose">
          <p>
            Their courses are built for actors and stunt professionals. They cover the skills needed to handle
            firearms in a dramatic setting, with safe qualifications that the industry recognises and recommends.
          </p>
          <p>
            Current Stagefight students, and anyone holding a stage combat or screen combat qualification, receive a
            discount on the Handgun and Tactical Rifle Training for Film and TV course.
          </p>
          <p>
            <RouterLink class="btn btn-ink" to="/contact?intent=firearms">Ask about the discount</RouterLink>
          </p>
        </div>
        <MediaPlaceholder label="Handling drill" kicker="Still placeholder" />
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width: 760px">
        <p class="eyebrow">Instructor</p>
        <h2 class="display" style="font-size: clamp(38.4px, 5vw, 57.6px); margin-bottom: 16px">Ben</h2>
        <div class="prose">
          <p>
            Ben began training in firearms as a teenage shooter and won competitive titles through the mid-1990s.
            After serving with the British Army he worked in the firearms and private security industry in the
            United States.
          </p>
          <p>
            For the last decade he has worked in maritime security, training and leading armed teams protecting
            vessels in the Indian Ocean.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
