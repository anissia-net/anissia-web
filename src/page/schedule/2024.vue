<template>
  <!-- <div id="sc2024" @click="e => evtClickClosePopup(e)" :class="colorMode"> -->
  <div class="bg-white dark:bg-black text-zinc-800 dark:text-zinc-400 pb-10 box-border duration-300" id="sc2024" @click="e => evtClickClosePopup(e)">

    <!-- 타이틀 -->
    <div class="title">
      <div class="title-main"><a href="/" target="_blank">애니<span class="mob-hide">메이션</span> 편성표</a></div>
      <button class="text-lg hover:text-sky-700 dark:hover:text-gray-200 px-4 py-2.5 " @click="toggleTheme()">
        <span class="dark:hidden" @click="applyColorMode('dark')">
          <i class="fa-solid fa-sun"></i>
        </span>
        <span class="hidden dark:inline" @click="applyColorMode('light')">
          <i class="fa-solid fa-moon"></i>
        </span>
      </button>
    </div>
    
    <!-- 내비게이션바 -->
    <div class="nav flex justify-between space-x-2 sm:space-x-3 md:space-x-4">
      <div v-for="(week, idx) in weekList" @click="getAnimeList(idx)" class="flex-auto text-center font-bold text-md md:text-lg py-2 as-box" :class="({'text-gray-400 dark:text-gray-600': idx != weekNow})">{{week}}</div>
    </div>

    <!-- 애니메이션 리스트 -->
    <div class="mt-4">
      <div class="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div v-for="(node, i) in animeList" class="p-4 as-box">
          <div @click="getCaptionList(node);">
            <!-- <router-link :to="`/anime?animeNo=${node.animeNo}`"> -->
              <div v-if="node.scheduleTime != '-'" class="text-md font-bold text-blue-600 dark:text-blue-500">
                {{node.scheduleTime}}
              </div>
              <div class="text-md mt-1 font-bold text-gray-800 dark:text-zinc-300">
                <span v-if="node.subjectPrefix">[<b class="text-blue-600 dark:text-blue-500">{{node.subjectPrefix}}</b>] </span>
                {{node.subject}}
              </div>
              <div class="text-xs mt-1" v-if="node.originalSubject">{{node.originalSubject}}</div>
            <!-- </router-link> -->
          </div>
          <div class="mt-1 space-x-1 space-y-2 text-gray-800 dark:text-zinc-300">
            <span class="as-tag-xs" v-for="tag in node.tags" :key="tag">{{tag}}</span>
            <span class="as-tag-xs" v-for="tag in node.genres.split(/,/g)" :key="tag"><router-link :to="`/anime?q=%23${encodeURIComponent(tag)}`">{{tag}}</router-link></span>
            <span class="as-tag-xs" v-if="node.website"><a :href="node.website" target="_blank" class="fas fa-home"></a></span>
            <span class="as-tag-xs" v-if="node.twitter"><a :href="node.twitter" target="_blank" class="fa-brands fa-twitter"></a></span>
            <span class="as-tag-xs" v-if="node.captionCount"><span class="fas fa-closed-captioning">&nbsp; {{node.captionCount}}</span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 팝업창 -->
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
    <div id="sc2024-theme-error" style="display:none">
      <table><tr><td>애니편성표의 커스텀코드가 잘못되었습니다.<br/><br/><a href="/schedule" target="_blank">애니시아</a>에서 재설정 하시기 바랍니다.</td></tr></table>
    </div>
  </div>
</template>


<!-- 스크립트 -->
<script setup lang="ts">
// 2019-08-17: 2015년 소스를 vuejs 에 맞게 변경
// 2020-12-25: 다크모드 추가 (2015 Version 유지)
// 2022-10-03: Vue3 컴포넌트 스타일로 변경. (CSS 는 스킨 호환성을 위해 post-css 로 변경하지 않음)
import {onBeforeUnmount, onMounted, Ref, ref} from "vue";
import theme from "../../common/theme";
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

getAnimeList(new Date().getDay());

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

function toggleTheme() {
  theme.toggle();

}
function applyColorMode(mode: string|null) {
  if (mode == null) {
    if (isWeb.value) {
      try {
        mode = (localStorage.getItem('schedule2024ColorMode') as string | null);
        colorMode.value = mode != null ? mode : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      } catch (e) {colorMode.value = 'light'; }
    } else {
      colorMode.value = 'light';
    }
  } else if (isWeb.value) {
    try {
      localStorage.setItem('schedule2024ColorMode', (colorMode.value = mode));
    } catch (e) { colorMode.value = 'light'; }
  }
}

// mounted
onMounted(() => {
  applyColorMode(null);
  getAnimeList(new Date().getDay());
  (window as any).colorMode = applyColorMode;
  window.addEventListener('keydown', evtKeyClosePopup, true);
  // custom theme
  // const theme = location.hash.length > 1 ? location.hash : 'ffffff5987b6fffffff2f2f2497ba79cb3c7ffffffffffff555555f8f8f82474cecb3434000000000000777777111111777777111111c3b443070707999999000000cccccc3a7da3';
  // ((window as any).repaint = ((colors: string) => {
  //   const c: string[] = colors.match(/[0-9a-f]{6}/ig) || [];
  //   if (c.filter((e: string) => /^[0-9a-f]{6}$/i.test(e)).length === 24) {
  //     /**
  //      * c[light/dark]  description
  //      * c[0/12]    body background color
  //      * c[1/13]    subject background color
  //      * c[2/14]    subject front color
  //      * c[3/15]    navigator background color
  //      * c[4/16]    navigator front color
  //      * c[5/17]    week background color
  //      * c[6/18]    week front color
  //      * c[7/19]    list background color
  //      * c[8/20]    list front color
  //      * c[9/21]    list:hover background color
  //      * c[10/22]   list:hover front color
  //      * c[11/23]   subject prefix front color
  //      */
  //     (document.getElementById('user-style') as any).innerHTML = `<style>
  //       #sc2024.light .main, #sc2024.light .popup .box { background: #${c[0]} }
  //       #sc2024.light .title, #sc2024.light .popup .box .subject { background: #${c[1]} }
  //       #sc2024.light .title a, #sc2024.light .popup .box .subject { color: #${c[2]} }
  //       #sc2024.light .title svg { fill:#${c[2]} }
  //       #sc2024.light .nav th, #sc2024.light .popup .box .date { background: #${c[3]}; color: #${c[4]} }
  //       #sc2024.light .nav th:hover, #sc2024.light .nav th.sel { background: #${c[5]}; color: #${c[6]} }
  //       #sc2024.light .list td, #sc2024.light .popup .box .node, #sc2024.light .popup .box .node-empty { background: #${c[7]}; color:#${c[8]}; }
  //       #sc2024.light .list tr:hover td, #sc2024.light .popup .box .node:hover { background: #${c[9]}; color:#${c[10]}; }
  //       #sc2024.light .list tr:not(:hover) td .prefix b { color:#${c[11]} }
  //       #sc2024.dark .main, #sc2024.dark .popup .box { background: #${c[12]} }
  //       #sc2024.dark .title, #sc2024.dark .popup .box .subject { background: #${c[13]} }
  //       #sc2024.dark .title a, #sc2024.dark .popup .box .subject { color: #${c[14]} }
  //       #sc2024.dark .title svg { fill:#${c[14]} }
  //       #sc2024.dark .nav th, #sc2024.dark .popup .box .date { background: #${c[15]}; color: #${c[16]} }
  //       #sc2024.dark .nav th:hover, #sc2024.dark .nav th.sel { background: #${c[17]}; color: #${c[18]} }
  //       #sc2024.dark .list td, #sc2024.dark .popup .box .node, #sc2024.dark .popup .box .node-empty { background: #${c[19]}; color:#${c[20]}; }
  //       #sc2024.dark .list tr:hover td, #sc2024.dark .popup .box .node:hover { background: #${c[21]}; color:#${c[22]}; }
  //       #sc2024.dark .list tr:not(:hover) td .prefix b { color:#${c[23]} }
  //       </style>`;
  //   } else {
  //     (document.querySelector('#sc2024-theme-error') as any).style.display = '';
  //   }
  // }))(theme);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', evtKeyClosePopup, true);
});
</script>

<style scoped>
#sc2024 {
  min-height: 100vh;
  padding: 0px 10px;
}

/* 타이틀 디자인 */
#sc2024 .title { font-weight: 200; height: 64px; text-align: center; display: flex; align-items: center; }
#sc2024 .title .title-main { font-size:24px; line-height: 1; flex: 1 1 0%; padding-left: 36px; text-align:center }


/* 팝업 */
@keyframes sc2024-popup {
  from { background-color: rgba(0, 0, 0, 0); } to { background-color: rgba(0, 0, 0, .3); }
}

#sc2024 .popup {
  position: fixed; top:0; right:0; bottom:0; left:0; backdrop-filter: blur(3px);
  animation-name: s2024-popup; animation-duration: .2s; animation-iteration-count: 1; animation-fill-mode: forwards;
}
#sc2024 .popup .box { font-weight: 400; transition: height 0.2s;}
#sc2024 .popup .box .date { padding: 8px; line-height: 1.2; text-align: center; }
#sc2024 .popup .box .node,
#sc2024 .popup .box .node-empty { font-size: 15px; text-align: center; font-weight: 400; line-height: 40px; margin:0 0 1px; }
#sc2024 .popup .box .node b { line-height: 2.5; }
#sc2024 .popup .box .node-empty { padding: 40px 0 50px; text-align: center; }
#sc2024 .popup .box a,
#sc2024 .popup .box span.subject { text-decoration: none; display: block; text-align: center; }
#sc2024 .popup .box .subject { font-size: 20px; line-height: 2; padding: 0 12px; font-weight: 100;}

@media (min-width: 601px) {
  #sc2024 .popup .box { width: 400px; margin: 120px auto 0 auto; }
}

@media (max-width: 600px) {
  #sc2024 .popup .box { margin: 80px 24px 0; }
  #sc2024 .popup .box .subject { font-size:18px; }
}

@media (max-width: 300px) {
  #sc2024 .main { top:92px; }
  #sc2024 .title { height: 52px }
  #sc2024 .title .color-mode svg { width:28px; height:24px; }
  #sc2024 .mob-hide { display: none; }
  #sc2024 .popup .box { margin: 80px 24px 0; }
  #sc2024 .popup .box .subject { font-size:12px; padding:4px; }
  #sc2024 .popup .box .date { font-size:12px; padding:4px; }
  #sc2024 .popup .box .node { font-size:14px; }
  #sc2024 .popup .box .node .time { display:none }
}

</style>
