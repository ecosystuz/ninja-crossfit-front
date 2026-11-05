<script setup lang="ts">
import type { TrainingGoal } from '~/composables/useTrainingGoal'

const selectedGoal = useTrainingGoal()

const chooseGoal = (goal: TrainingGoal) => {
  selectedGoal.value = goal
}
</script>

<template>
  <section id="programs" class="section programs-section" aria-labelledby="programTitle">
    <div class="container">
      <div class="section-top reveal"><span class="section-label"><i /> {{ $t('programs.label') }}</span><span class="section-top-caption">{{ $t('programs.caption') }}</span></div>
      <div class="section-heading-row reveal">
        <h2 id="programTitle" class="display-title">{{ $t('programs.title1') }}<br><em>{{ $t('programs.title2') }}</em></h2>
        <p>{{ $t('programs.intro') }}</p>
      </div>
      <div class="program-grid">
        <article class="program-card program-card-one reveal">
          <div class="program-photo photo-cut" />
          <div class="program-shade" />
          <div class="program-card-inner">
            <div class="card-head"><span>01 / {{ $t('programs.goal') }}</span><span class="card-arrow" aria-hidden="true"><UiIcon name="arrow-up-right" /></span></div>
            <div class="card-bottom">
              <span class="card-mini-label">{{ $t('programs.weight.label') }}</span>
              <h3>{{ $t('programs.weight.title') }}<span>.</span></h3>
              <p>{{ $t('programs.weight.description') }}</p>
              <a href="#apply" data-goal="weight-loss" class="card-action" @click="chooseGoal('weight-loss')">{{ $t('programs.choose') }} <UiIcon name="arrow-up-right" /></a>
            </div>
          </div>
        </article>
        <article class="program-card program-card-two reveal delay-1">
          <div class="program-photo photo-gain" />
          <div class="program-shade" />
          <div class="program-card-inner">
            <div class="card-head"><span>02 / {{ $t('programs.goal') }}</span><span class="card-arrow" aria-hidden="true"><UiIcon name="arrow-up-right" /></span></div>
            <div class="card-bottom">
              <span class="card-mini-label">{{ $t('programs.mass.label') }}</span>
              <h3>{{ $t('programs.mass.title1') }}<br>{{ $t('programs.mass.title2') }}<span>.</span></h3>
              <p>{{ $t('programs.mass.description') }}</p>
              <a href="#apply" data-goal="muscle-gain" class="card-action" @click="chooseGoal('muscle-gain')">{{ $t('programs.choose') }} <UiIcon name="arrow-up-right" /></a>
            </div>
          </div>
        </article>
      </div>
      <p class="program-footnote reveal">{{ $t('programs.footnote') }}</p>
    </div>
  </section>
</template>
