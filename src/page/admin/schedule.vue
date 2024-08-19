<template>

  <div class="container m-auto px-4 duration-300">

    <div class="flex justify-between space-x-2 sm:space-x-3 md:space-x-4">
      <div v-for="(week, idx) in weekList" @click="getAnimeList(idx)" class="flex-auto text-center font-bold cursor-pointer text-md md:text-lg py-2 as-box" :class="({'text-gray-400 dark:text-gray-600': idx != weekNow})">{{week}}</div>
    </div>

    <div class="mt-4">
      <div class="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div v-for="(node, i) in animeList" class="p-4 as-box">
          <div>
            <router-link :to="`/admin/anime?animeNo=${node.animeNo}`">
              <div v-if="node.scheduleTime != '-'" class="text-md font-bold text-blue-600 dark:text-blue-500">
                {{node.scheduleTime}}
              </div>
              <div class="text-md mt-1 font-bold text-gray-800 dark:text-zinc-300">
                <span v-if="node.subjectPrefix">[<b class="text-blue-600 dark:text-blue-500">{{node.subjectPrefix}}</b>] </span>
                {{node.subject}}
              </div>
              <div class="text-xs mt-1" v-if="node.originalSubject">{{node.originalSubject}}</div>
            </router-link>
          </div>
          <div class="mt-1 space-x-1 space-y-2 text-gray-800 dark:text-zinc-300">
            <span class="as-tag-xs" v-for="tag in node.tags" :key="tag">{{tag}}</span>
            <span class="as-tag-xs" v-for="tag in node.genres.split(/,/g)" :key="tag"><router-link :to="`/anime?q=%23${encodeURIComponent(tag)}`">{{tag}}</router-link></span>
            <span class="as-tag-xs" v-if="node.website"><a :href="node.website" target="_blank" class="fas fa-home"></a></span>
            <span class="as-tag-xs" v-if="node.twitter"><a :href="node.twitter" target="_blank" class="fa-brands fa-x-twitter"></a></span>
            <span class="as-tag-xs" v-if="node.captionCount"><span class="fas fa-closed-captioning">&nbsp; {{node.captionCount}}</span></span>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script setup lang="ts">
import {ref} from "vue";
import Anime from "../../domain/anime/Anime";
import anissia from "../../common/anissia";
import animeRemote from "../../domain/anime/remote/animeRemote";

const weekList = ref(['日', '月', '火', '水', '木', '金', '土', '外', '新']);
const weekNow = ref(-1);
const animeList = ref([] as Anime[]);

function isPureWeek() {
  return anissia.isPureWeek(weekNow.value);
}

function getAnimeList(week: number): void {
  weekNow.value = week;
  animeRemote.getAdminScheduleAnimeList(week).then((list) => animeList.value = list);
}

getAnimeList(new Date().getDay());

</script>
