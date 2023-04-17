<template>

  <div class="container m-auto px-4 duration-300 py-2 md:py-4">
    <div class="flex justify-between space-x-2 sm:space-x-3 md:space-x-4">
      <router-link to="/admin" class="menu-item as-box">
        <div :class="url('/admin', true) ? 'grayscale-[40%]' : 'grayscale-[100%] opacity-50'">
          <img src="./layout/tab-panel.svg"/>
          <h5>관리패널</h5>
        </div>
      </router-link>
      <router-link to="/admin/anime" class="menu-item as-box">
        <div :class="url('/admin/anime') ? 'grayscale-[40%]' : 'grayscale-[100%] opacity-50'">
          <img src="./layout/tab-anime.svg"/>
          <h5>애니메이션</h5>
        </div>
      </router-link>
      <router-link to="/admin/schedule" class="menu-item as-box">
        <div :class="url('/admin/schedule') ? 'grayscale-[40%]' : 'grayscale-[100%] opacity-50'">
          <img src="./layout/tab-schedule.svg"/>
          <h5>편성표</h5>
        </div>
      </router-link>
      <router-link to="/admin/caption" class="menu-item as-box">
        <div :class="url('/admin/caption') ? 'grayscale-[40%]' : 'grayscale-[100%] opacity-50'">
          <img src="./layout/tab-caption.svg"/>
          <h5>자막</h5>
        </div>
      </router-link>
    </div>
  </div>
  <div>
    <router-view />
  </div>

</template>

<script setup lang="ts">
import anissia from "../../common/anissia";

const url = anissia.url
</script>

<style>
.menu-item {
  @apply grow p-6 w-1 block max-w-sm text-center;
  img {
    @apply w-5/6 md:w-1/3 inline-block md:mt-2
  }
  h5 {
    @apply mt-5 hidden md:block text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-300
  }
}
</style>