<template>
  <div class="duration-300 bg-white dark:bg-black">
    <div class="container duration-300 pb-10 m-auto px-1 sm:px-2 md:px-4 min-h-screen py-0 text-zinc-800 dark:text-zinc-400" @click="e => evtClickClosePopup(e)">

      <!-- 타이틀 -->
      <div class="font-extralight h-16 text-center flex items-center">
        <div class="text-2xl leading-none flex-1 text-center pl-9"><a href="/" target="_blank">애니<span class="mob-hide">메이션</span> 편성표</a></div>
        <button class="text-lg hover:text-sky-700 dark:hover:text-gray-200 px-4 py-2.5" @click="toggleTheme()">
        <span class="dark:hidden">
          <i class="fa-solid fa-sun"></i>
        </span>
          <span class="hidden dark:inline">
          <i class="fa-solid fa-moon"></i>
        </span>
        </button>
      </div>

      <!-- 내비게이션바 -->
      <div class="flex justify-between space-x-2 sm:space-x-3 md:space-x-4">
        <div v-for="(week, idx) in weekList" @click="getAnimeList(idx)" class="flex-auto text-center font-bold text-md md:text-lg py-2 as-box cursor-pointer" :class="({'text-gray-400 dark:text-gray-600': idx != weekNow})">{{week}}</div>
      </div>

      <!-- 애니메이션 리스트 -->
      <transition name="fade">
        <div class="mt-4" v-if="animeList.length">
          <div class="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div v-for="(node, i) in animeList" class="p-4 as-box">
              <div @click="getCaptionList(node);" class="cursor-pointer">
                <!-- 시간 -->
                <div v-if="node.scheduleTime != '-'" class="text-md font-bold text-blue-600 dark:text-blue-500">
                  {{node.scheduleTime}}
                </div>
                <div class="text-md mt-1 font-bold text-gray-800 dark:text-zinc-300">
                  <!-- 방영태그 -->
                  <span v-if="node.subjectPrefix">[<b class="text-blue-600 dark:text-blue-500">{{node.subjectPrefix}}</b>] </span>
                  <!-- 애니제목 -->
                  {{node.subject}}
                </div>
                <!-- 원제 -->
                <div class="text-xs mt-1" v-if="node.originalSubject">{{node.originalSubject}}</div>
              </div>
              <!-- 태그박스 -->
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
      </transition>

      <!-- 팝업 -->
      <transition name="fade">
        <div class="fixed inset-0 animate-fadeIn backdrop-blur-sm bg-gray-800/10" v-if="animeNow != null">
          <div class="box w-[450px] mt-[150px] mb-0 mx-auto p-4 rounded-md shadow-lg text-base font-semibold text-center bg-zinc-50/90 dark:bg-zinc-900/90 text-gray-800 dark:text-zinc-300">
            <!-- 제목 -->
            <div class="border-b border-gray-200 dark:border-zinc-800 pb-2">
              <a target="_blank" :href="animeNow.website">
                <!-- 한글제목 -->
                <div class="text-xl font-bold">
                  {{animeNow.subject}}
                </div>
                <!-- 원워제목 -->
                <div class="text-xs mt-1">
                  {{animeNow.originalSubject}}
                </div>
              </a>
            </div>
            <!-- 요일 -->
            <div class="border-b border-gray-200 dark:border-zinc-800 pb-2 text-base mt-2" v-if="animeNow.period">{{animeNow.period}}</div>
            <!-- 자막제작자 목록 -->
            <div class="mt-3">
              <div class="mt-2 text-base" v-for="node in captionList" :key="`${node.name}`">
                <a v-if="node.website !== ''" :href="node.website" target="_blank">
                  <span>{{node.episodeText}}</span>
                  <b>&nbsp;{{node.name}}&nbsp;</b>
                  <span>{{node.updDtText}}</span>
                </a>
                <div v-else>
                  <span>{{node.episodeText}}</span>
                  <b>&nbsp;{{node.name}}&nbsp;</b>
                  <span>{{node.updDtText}}</span>
                </div>
              </div>
            </div>
            <!-- 자막없음 -->
            <div v-if="captionList.length === 0" class="text-[15px] font-normal leading-10 mt-0 mb-px mx-0 pt-10 pb-[50px] px-0">자막 제작자가 없습니다.</div>
          </div>
        </div>
      </transition>

      <!-- 서버상태 체크 -->
      <div v-if="ajaxState.state == 'loading'" class="h-screen w-screen fixed flex items-center top-0 z-30 backdrop-blur-[2px] bg-white/20 dark:bg-black/10">
        <div class="w-screen text-center my-8 opacity-50">
          <div><i class="opacity-50 text-[100px] fa-solid fa-gear as-fa-spin"></i></div>
          <div class="text-4xl my-12">loading...</div>
        </div>
      </div>
      <div v-else-if="ajaxState.state == 'error'" class="h-screen w-screen fixed flex items-center top-0 z-30 backdrop-blur-[2px] bg-white/20 dark:bg-black/10">
        <div class="w-screen text-center my-8">
          <div><i class="fa-solid fa-screwdriver-wrench opacity-50 text-[100px]"></i></div>
          <div class="text-4xl mt-12 mb-8">서버 연결 실패</div>
          <div class="text-md opacity-80 leading-[2]">
            현재 애니시아 서버에 연결할 수 없습니다.
            <br/>
            빠르게 정상화 하도록 하겠습니다.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<!-- 스크립트 -->
<script setup lang="ts">
import {onBeforeUnmount, onMounted, Ref, ref} from "vue";
import theme from "../../common/theme";
import AnimeCaption from "../../domain/anime/AnimeCaption";
import Anime from "../../domain/anime/Anime";
import animeRemote from "../../domain/anime/remote/animeRemote";
import {ajaxStateStore} from "../../common/ajaxStateStore";

const weekList = ref(['日', '月', '火', '水', '木', '金', '土', '外', '新']);
const weekNow = ref(-1);
const animeList = ref([]) as Ref<Anime[]>;
const animeNow = ref(null) as Ref<Anime|null>;
const captionList = ref([]) as Ref<AnimeCaption[]>;
const ajaxState = ajaxStateStore();

function getAnimeList(week: number): void {
  weekNow.value = week;
  animeRemote.getScheduleAnimeList(week).then((list) => animeList.value = list);
}

function getCaptionList(anime: Anime) {
  animeRemote.getAnimeCaptionList(anime.animeNo).then((list) => {
    captionList.value = list;
    animeNow.value = anime;
  });
}

function evtClickClosePopup(event: MouseEvent) {
  if (animeNow.value != null && (event.target as HTMLElement).closest('body,.box')?.tagName == 'BODY') {
    animeNow.value = null;
  }
}

function evtKeyClosePopup(event: KeyboardEvent) {
  if (animeNow.value !== null && event.key === 'Escape') {
    animeNow.value = null;
  }
}

function toggleTheme() {
  theme.toggle();
}

onMounted(() => {
  getAnimeList(new Date().getDay());
  window.addEventListener('keydown', evtKeyClosePopup, true);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', evtKeyClosePopup, true);
});
</script>

<!-- 애니메이션 CSS -->
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
