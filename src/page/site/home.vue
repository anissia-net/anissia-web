<template>

  <div class="container m-auto px-4 pt-5 duration-300">

    <div v-if="mode == 'PC'" class="flex">
      <div class="flex-1">
        <div class="mt-3 grid gap-4 grid-cols-2">
          <div>
            <router-link to="/notice" class="text-lg font-bold inline-block">공지사항</router-link>
            <RecentBoard ticker="notice" v-model="recentBoardData"/>
          </div>
          <div>
            <router-link to="/inquiry" class="text-lg font-bold inline-block">문의 게시판</router-link>
            <RecentBoard ticker="inquiry" v-model="recentBoardData"/>
          </div>
        </div>
        <div>
          <router-link to="/caption/recent" class="text-lg font-bold inline-block mt-7 mb-2">최근 자막</router-link>
          <RecentCaption />
        </div>
        <div>
          <div class="text-lg font-bold mt-8 mb-2">운영기록</div>
          <active-panel mode="public" />
        </div>
      </div>
      <div class="w-[25%] min-w-[256px] ml-6">
        <Rank/>
      </div>
    </div>

    <div v-else-if="mode == 'MOB'" class="anissia-home-mode-mob">
      <div>
        <RecentCaption />
        <div class="py-4">
          <router-link to="/caption/recent">
            <div to="/caption/recent" class="py-3 as-input-btn text-center">더보기</div>
          </router-link>
        </div>
      </div>
      <div class="mt-8 px-1">
        <Rank/>
      </div>
      <div class="mt-12 px-2">
        <router-link to="/notice" class="text-lg font-bold text-center block">공지사항</router-link>
        <RecentBoard ticker="notice" v-model="recentBoardData"/>
      </div>
      <div class="mt-12 px-2">
        <router-link to="/inquiry" class="text-lg font-bold text-center block">문의 게시판</router-link>
        <RecentBoard ticker="inquiry" v-model="recentBoardData"/>
      </div>
      <div class="px-1">
        <div class="text-lg font-bold mt-12 mb-2 text-center">운영기록</div>
        <active-panel mode="public" />
      </div>
    </div>

  </div>

</template>

<script setup lang="ts">

import {onUnmounted, ref} from "vue";
import Rank from "../../domain/rank/AnimeRank.vue";
import RecentCaption from "../../domain/anime/RecentCaption.vue";
import ActivePanel from "../../domain/activePanel/ActivePanel.vue";
import RecentBoard from "../../domain/board/RecentBoard.vue";
import boardRemote from "../../domain/board/remote/boardRemote";
import {RecentBoardData} from "../../domain/board/RecentBoardData";
import Result from "../../common/Result";

// PC, MOB
const mode = ref("");
const recentBoardData = ref(new RecentBoardData());

function applyResponsive() {
  const m = window.matchMedia("(min-width: 1024px)").matches ? "PC" : "MOB";
  if (mode.value != m) {
    mode.value = m;
  }
}

function resize(event: Event) {
  applyResponsive();
}

boardRemote.getRecentHome().then(data => recentBoardData.value = data);
applyResponsive();
addEventListener("resize", resize, true);

onUnmounted(() => {
  removeEventListener("resize", resize, true);
});

</script>

<style scoped>
:global(.anissia-home-mode-mob .anissia-home-reduce-5:nth-child( n + 6 )) { display: none }
:global(.anissia-home-mode-mob .anissia-home-reduce-10:nth-child( n + 11 )) { display: none }
</style>