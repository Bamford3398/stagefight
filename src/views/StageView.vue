<script setup>
import { stageLevels, weapons } from '../data/content'
</script>

<template>
  <div>
    <header class="page-hero">
      <div class="container">
        <p class="eyebrow">Live performance</p>
        <h1 class="display">Stage combat</h1>
        <p class="lede" style="margin-top: 16px">
          Equity-approved training for safe, realistic fight scenes in front of an audience. The work is practical:
          routines that are safer to perform and stronger to watch. Advanced level is recognised for entry to
          Equity’s Fight Directors Training Scheme.
        </p>
      </div>
    </header>

    <section class="section paper">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">ECSPC qualifications</p>
          <h2 class="display">Three levels. A clear order.</h2>
          <p class="lede lede-dark">
            Courses meet and exceed the safety and teaching standards of other stage combat systems. The
            qualification is respected across the industry, and the technique has put students into combat roles
            on stage.
          </p>
        </div>
        <div class="level-grid">
          <article v-for="level in stageLevels" :key="level.id" class="step">
            <p class="discipline-index">{{ level.id }}</p>
            <h3>{{ level.name }}</h3>
            <p>{{ level.summary }}</p>
            <div class="tags">
              <span v-for="item in level.includes" :key="item" class="tag">{{ item }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container compare">
        <article>
          <h3>Weapon disciplines</h3>
          <p>
            Level-1 is unarmed combat and single sword. Further modules are only open once that qualification is
            complete. The wider list is the armoury the system is built from.
          </p>
          <div class="tags">
            <span v-for="weapon in weapons" :key="weapon" class="tag" style="border-color: var(--line-strong); color: var(--cream)">
              {{ weapon }}
            </span>
          </div>
        </article>
        <article>
          <h3>Requirements</h3>
          <p>Open to students aged 18 and over, with a reasonable level of fitness and mobility.</p>
          <p style="margin-top: 12.8px">
            No previous stage combat or martial arts training is required for Level-1-Standard. Regular attendance
            through a course or module is essential. Read the terms before you book — ask us and we will send them.
          </p>
          <p style="margin-top: 17.6px">
            <RouterLink class="btn btn-bronze" to="/contact?intent=stage">Ask about a level</RouterLink>
          </p>
        </article>
      </div>
    </section>
  </div>
</template>
