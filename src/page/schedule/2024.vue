<template>
  <div id="sc2015" @click="e => evtClickClosePopup(e)" :class="colorMode">
    <div class="title">
      <div class="title-main"><a href="/" target="_blank">애니<span class="mob-hide">메이션</span> 편성표</a></div>
      <div class="color-mode" v-if="isWeb">
        <div id="dark-mode" @click="applyColorMode('dark')">다크모드</div>
        <div id="light-mode" @click="applyColorMode('light')">라이트모드</div>
      </div>
    </div>
    <table class="nav">
      <tr>
        <th v-for="(name, idx) in weekList" :key="name" @click="getAnimeList(idx)" :class="{'sel': (weekNow == idx)}">{{name}}</th>
      </tr>
    </table>
    <div class="main">
      <table class="list">
        <tr v-for="node in animeList" :key="node.animeNo">
          <td class="tod" :class="{'tod-date': !isPureWeek()}">
            <span v-if="isPureWeek()">{{node.scheduleTime}}</span>
            <span v-else>
              <span>{{node.scheduleTime.length === 10 ? node.scheduleTime.substring(0, 4) : node.scheduleTime}}</span><span
                class="mob-hide">{{node.scheduleTime.length === 10 ? node.scheduleTime.substring(4) : ''}}</span>
            </span>
          </td>
          <td class="subject" @click="getCaptionList(node);">
            <span class="prefix" v-if="node.subjectPrefix">[<b>{{node.subjectPrefix}}</b>] </span>
            {{node.subject}}
          </td>
          <td class="genres mob-hide">{{node.genres.replace(',', ' / ')}}</td></tr>
      </table>
    </div>
    <div class="popup" v-if="animeNow != null">
      <div class="box">
        <a target="_blank" v-if="animeNow.website.length > 10" :href="animeNow.website" class="subject">{{animeNow.subject}}</a>
        <span class="subject" v-else>{{animeNow.subject}}</span>
        <div class="date" v-if="animeNow.period">{{animeNow.period}}</div>
        <div v-for="node in captionList" :key="`${node.name}`">
          <a v-if="node.website !== ''" class="node" :href="node.website" target="_blank">
            <span>{{node.episodeText}}</span>
            <b>&nbsp;{{node.name}}&nbsp;</b>
            <span class="time">{{node.updDtText}}</span>
          </a>
          <div v-else class="node">
            <span>{{node.episodeText}}</span>
            <b>&nbsp;{{node.name}}&nbsp;</b>
            <span class="time">{{node.updDtText}}</span>
          </div>
        </div>
        <div v-if="captionList.length === 0" class="node-empty">자막이 없습니다.</div>
      </div>
    </div>
    <div id="user-style"></div>
    <div id="sc2015-theme-error" style="display:none">
      <table><tr><td>애니편성표의 커스텀코드가 잘못되었습니다.<br/><br/><a href="/schedule" target="_blank">애니시아</a>에서 재설정 하시기 바랍니다.</td></tr></table>
    </div>
  </div>
</template>

<script setup lang="ts">
// 2019-08-17: 2015년 소스를 vuejs 에 맞게 변경
// 2020-12-25: 다크모드 추가 (2015 Version 유지)
// 2022-10-03: Vue3 컴포넌트 스타일로 변경. (CSS 는 스킨 호환성을 위해 post-css 로 변경하지 않음)
import {onBeforeUnmount, onMounted, Ref, ref} from "vue";
import AnimeCaption from "../../domain/anime/AnimeCaption";
import Anime from "../../domain/anime/Anime";
import anissia from "../../common/anissia";
import animeRemote from "../../domain/anime/remote/animeRemote";

const weekList = ref(['日', '月', '火', '水', '木', '金', '土', '外', '新']);
const weekNow = ref(-1);
const isWeb = ref(true);
const animeList = ref([]) as Ref<Anime[]>;
const animeNow = ref(null) as Ref<Anime|null>;
const captionList = ref([]) as Ref<AnimeCaption[]>;
const colorMode = ref('light');

// method
function isPureWeek() {
  return anissia.isPureWeek(weekNow.value);
}
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
function applyColorMode(mode: string|null) {
  if (mode == null) {
    if (isWeb.value) {
      try {
        mode = (localStorage.getItem('schedule2015ColorMode') as string | null);
        colorMode.value = mode != null ? mode : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      } catch (e) {colorMode.value = 'light'; }
    } else {
      colorMode.value = 'light';
    }
  } else if (isWeb.value) {
    try {
      localStorage.setItem('schedule2015ColorMode', (colorMode.value = mode));
    } catch (e) { colorMode.value = 'light'; }
  }
}

// mounted
onMounted(() => {
  applyColorMode(null);
  getAnimeList(new Date().getDay());
  (window as any).colorMode = applyColorMode;
  window.addEventListener('keydown', evtKeyClosePopup, true);
  const theme = location.hash.length > 1 ? location.hash : 'ffffff5987b6fffffff2f2f2497ba79cb3c7ffffffffffff555555f8f8f82474cecb3434000000000000777777111111777777111111c3b443070707999999000000cccccc3a7da3';

});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', evtKeyClosePopup, true);
});
</script>

<style scoped>

</style>