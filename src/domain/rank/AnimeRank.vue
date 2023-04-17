<template>
  <div>
    <div class="flex mb-2">
      <div class="flex-1 text-center py-3 border-b-2 border-transparent hover:border-gray-500 dark:hover:border-gray-300 cursor-pointer duration-300" :class="({'border-gray-400 dark:border-gray-500': period === 'week'})" @click="load('week')">주간</div>
      <div class="flex-1 text-center py-3 border-b-2 border-transparent hover:border-gray-500 dark:hover:border-gray-300 cursor-pointer duration-300" :class="({'border-gray-400 dark:border-gray-500': period === 'quarter'})" @click="load('quarter')">분기</div>
      <div class="flex-1 text-center py-3 border-b-2 border-transparent hover:border-gray-500 dark:hover:border-gray-300 cursor-pointer duration-300" :class="({'border-gray-400 dark:border-gray-500': period === 'year'})" @click="load('year')">연간</div>
    </div>
    <div>
      <div v-for="node in list" :key="node.animeNo" class="flex items-center py-3 my-1 border-b border-gray-200 dark:border-zinc-800 text-sm anissia-home-reduce-10">
        <div class="text-center w-[40px] text-xs">{{node.rank}}</div>
        <div class="flex-1 px-3">
          <router-link :to="`/anime?animeNo=${node.animeNo}`" class="opacity-80 hover:opacity-100">{{node.subject}}</router-link>
        </div>
        <div v-if="node.isDiff" class="w-[50px] text-center text-xs">
          <span v-if="node.isDiffUp" class="text-red-800/80 dark:text-red-500/60">▲<b class="ml-2"></b>{{node.isDiffAbs}}</span>
          <span v-else class="text-blue-800/80 dark:text-blue-500/60">▼<b class="ml-2"></b>{{node.isDiffAbs}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import animeRemote from "../anime/remote/animeRemote";
import {AnimeRankItem} from "./AnimeRankItem";

const period = ref();
const list = ref([]) as Ref<AnimeRankItem[]>;

function load(_period: string) {
  period.value = _period;
  animeRemote.getRank(_period).then(data => list.value = data);
}

load("week");
</script>
