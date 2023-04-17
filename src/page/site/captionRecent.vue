<template>

  <div class="container m-auto px-4 pt-5 duration-300">

    <div class="text-right mt-3 text-sm">
      최근 90일 데이터 / 총 <b>{{list.totalElements}}</b> 작품
    </div>
    <div class="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="node in list.content" class="p-4 as-box">
        <div class="text-md font-bold text-gray-800 dark:text-zinc-300"><router-link :to="`/anime?animeNo=${node.animeNo}`">{{node.subject}}</router-link></div>
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

  </div>

</template>

<script setup lang="ts">

import {nextTick, onUnmounted, Ref, ref} from "vue";
import AnimeCaption from "../../domain/anime/AnimeCaption";
import animeRemote from "../../domain/anime/remote/animeRemote";
import PageData from "../../common/PageData";
import scrollLoader from "scroll-loader";

const page = ref(0);
const list = ref(PageData.empty()) as Ref<PageData<AnimeCaption>>;

const sl = scrollLoader().onNeedNextPage(() => {
  page.value++;
  loadList();
});

function loadList() {
  const isFirstPage = page.value == 0;

  animeRemote.getCaptionRecentPage(page.value).then(pageData => {
    if (isFirstPage) {
      list.value = pageData;
    } else {
      list.value = list.value.merge(pageData);
    }
    nextTick(() => sl.watch(pageData.next))
  });
}

loadList();

onUnmounted(() => sl.destroy());

</script>
