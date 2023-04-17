<template>

  <div class="mt-3 grid gap-4 md:grid-cols-2">
    <div v-for="node in list" class="p-4 as-box anissia-home-reduce-5">
      <div class="text-md font-bold opacity-90"><router-link :to="`/anime?animeNo=${node.animeNo}`">{{node.subject}}</router-link></div>
      <div class="pt-3">
        <a :href="node.website" target="_blank">
          <span class="fas fa-closed-captioning"></span>
          <span class="ml-2">{{node.episodeText}}&nbsp; </span>
          <b class="mx-1 text-blue-900 dark:text-blue-500/60">{{node.name}}</b>&nbsp;
          <span>{{node.updDtText}}</span>
        </a>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import animeRemote from "./remote/animeRemote";
import AnimeCaption from "./AnimeCaption";

const list = ref([]) as Ref<AnimeCaption[]>;
animeRemote.getCaptionRecent().then(data => list.value = data);
</script>

<style>

</style>