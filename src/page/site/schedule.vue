<template>

  <div :ref="e => containerRef = e" class="container m-auto px-4 pt-5 as-cp-close duration-300">
    <div class="font-bold text-xl mt-5">애니메이션 요일별 편성표</div>
    
    <div class="mt-3 flex justify-between space-x-2 sm:space-x-3 md:space-x-4">
      <div v-for="(week, idx) in weekList" @click="getAnimeList(idx)" class="flex-auto text-center font-bold text-md md:text-lg py-2 as-box" :class="({'text-gray-400 dark:text-gray-600': idx != weekNow})">{{week}}</div>
    </div>

    <div class="mt-4">
      <div class="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div v-for="(node, i) in animeList" class="p-4 as-box">
          <div>
            <router-link :to="`/anime?animeNo=${node.animeNo}`">
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
            <span class="as-tag-xs" v-if="node.twitter"><a :href="node.twitter" target="_blank" class="fa-brands fa-twitter"></a></span>
            <span class="as-tag-xs" v-if="node.captionCount"><span class="fas fa-closed-captioning">&nbsp; {{node.captionCount}}</span></span>
          </div>
        </div>
      </div>
    </div>


    <div class="font-bold text-xl mt-5">그 외 편성표</div>
    <div class="mt-1 text-sm">
      최신 편성표 뿐만 아닌 다양한 버전의 편성표를 이용해보세요.
    </div>

    <div class="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div class="info-box as-box">
        <div class="w-[50px]"><img class="w-full" src="./schedule/icon-schedule.svg"/></div>
        <div class="flex-1 pl-4">
          <a href="/schedule/widget" target="_self"><h5>커스텀 편성표 위젯</h5></a>
          <p>크키, 색상 등을 커스텀할 수 있는 편성표 위젯</p>
        </div>
      </div>

      <div class="info-box as-box">
        <div class="w-[50px]"><img class="w-full" src="./schedule/icon-schedule.svg"/></div>
        <div class="flex-1 pl-4">
          <a href="/schedule/2015" target="_blank"><h5>애니편성표 (2015)</h5></a>
          <p>현재 메인으로 사용되는 버전.</p>
        </div>
      </div>

      <div class="info-box as-box">
        <div class="w-[50px]"><img class="w-full" src="./schedule/icon-schedule.svg"/></div>
        <div class="flex-1 pl-4">
          <a href="/schedule/2009" target="_blank"><h5>애니편성표 (2009)</h5></a>
          <p>리메이크 클래식 버전.</p>
        </div>
      </div>

      <div class="info-box as-box">
        <div class="w-[50px]"><img class="w-full" src="./schedule/icon-time.svg"/></div>
        <div class="flex-1 pl-4">
          <router-link to="/introduce"><h5>애니시아 연혁</h5></router-link>
          <p>애니시아 연혁소개</p>
        </div>
      </div>
    </div>

    <div class="font-bold text-xl mt-5">서드파티</div>
    <div class="mt-1 text-sm">
      "애니시아 API" 를 통해 만들어진 프로그램입니다.<br/>
      각 프로그램에 대한 문의는 해당 개발자/단체에 하셔야 합니다.
    </div>

    <div class="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div class="info-box as-box">
        <div class="w-[50px]"><img class="w-full" src="./schedule/3rd-ios.svg"/></div>
        <div class="flex-1 pl-4">
          <a href="https://apps.apple.com/kr/app/aeni-pyeonseongpyo/id917536862" target="_blank"><h5>애니 편성표</h5></a>
          <p>iOS / Young Ho Kim / 2014년</p>
        </div>
      </div>
      <div class="info-box as-box">
        <div class="w-[50px]"><img class="w-full" src="./schedule/3rd-ios.svg"/></div>
        <div class="flex-1 pl-4">
          <a href="https://github.com/qkdxorjs1002/AniSched-Desktop#homebrew-macos-1011-%EC%9D%B4%EC%83%81" target="_blank"><h5>AniSched-Desktop</h5></a>
          <p>macOS / Novang / 2021년</p>
        </div>
      </div>
      <div class="info-box as-box">
        <div class="w-[50px]"><img class="w-full" src="./schedule/3rd-android.svg"/></div>
        <div class="flex-1 pl-4">
          <a href="https://play.google.com/store/apps/details?id=com.novang.anisched" target="_blank"><h5>AniSched</h5></a>
          <p>Android / Novang / 2021년</p>
        </div>
      </div>
      <div class="info-box as-box">
        <div class="w-[50px]"><img class="w-full" src="./schedule/3rd-android.svg"/></div>
        <div class="flex-1 pl-4">
          <a href="https://play.google.com/store/apps/details?id=anissia.android.schedule" target="_blank"><h5>애니 편성표</h5></a>
          <p>Android / 애니시아 / 2021년</p>
        </div>
      </div>
      <div class="info-box as-box">
        <div class="w-[50px]"><img class="w-full" src="./schedule/3rd-windows.svg"/></div>
        <div class="flex-1 pl-4">
          <a href="https://www.microsoft.com/store/apps/9PB5WSXN3TMN" target="_blank"><h5>AniSched</h5></a>
          <p>Windows / Novang / 2015년</p>
        </div>
      </div>
      <div class="info-box as-box">
        <div class="w-[50px]"><img class="w-full" src="./schedule/3rd-chrome.svg"/></div>
        <div class="flex-1 pl-4">
          <a href="https://chrome.google.com/webstore/detail/anisched/lkpfenhnbjcjekjihacpcoekgdclobdn" target="_blank"><h5>AniSched</h5></a>
          <p>Chrome / Novang / 2015년</p>
        </div>
      </div>
    </div>

    <div class="font-bold text-xl mt-5">소스코드 / API</div>
    <div class="mt-1 text-sm">
      애니시아는 오픈소스입니다. 자유롭게 개발하세요
    </div>

    <div class="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

      <div class="info-box as-box">
        <div class="w-[50px]"><img class="w-full" src="./schedule/3rd-api.svg"/></div>
        <div class="flex-1 pl-4">
          <a href="https://github.com/anissia-net/document/blob/main/api_anime_schdule.md" target="_blank"><h5>API 가이드</h5></a>
          <p>3rd party 애니편성표 앱 제작 가이드</p>
        </div>
      </div>

      <div class="info-box as-box">
        <div class="w-[50px]"><img class="w-full" src="./schedule/3rd-doc.svg"/></div>
        <div class="flex-1 pl-4">
          <a href="https://github.com/anissia-net/document/blob/main/doc_anime_rank.md" target="_blank"><h5>랭킹 집계기준</h5></a>
          <p>애니메이션 랭킹 집계기준 문서</p>
        </div>
      </div>

      <div class="info-box as-box">
        <div class="w-[50px]"><img class="w-full" src="./schedule/icon-code.svg"/></div>
        <div class="flex-1 pl-4">
          <a href="https://github.com/anissia-net/anissia-web" target="_blank"><h5>프론트엔드</h5></a>
          <p>Vue.js, Typescript</p>
        </div>
      </div>

      <div class="info-box as-box">
        <div class="w-[50px]"><img class="w-full" src="./schedule/icon-code.svg"/></div>
        <div class="flex-1 pl-4">
          <a href="https://github.com/anissia-net/anissia-core" target="_blank"><h5>백엔드</h5></a>
          <p>Kotlin, Spring, JPA, QueryDSL, Elasticsearch</p>
        </div>
      </div>

    </div>

  </div>

</template>

<script setup lang="ts">
import {ref} from "vue";
import animeRemote from "../../domain/anime/remote/animeRemote";
import anissia from "../../common/anissia";
import Anime from "../../domain/anime/Anime";

const weekList = ref(['日', '月', '火', '水', '木', '金', '土', '外', '新']);
const weekNow = ref(-1);
const animeList = ref([] as Anime[]);

function isPureWeek() {
  return anissia.isPureWeek(weekNow.value);
}

function getAnimeList(week: number): void {
  weekNow.value = week;
  animeRemote.getScheduleAnimeList(week).then((list) => animeList.value = list);
}

getAnimeList(new Date().getDay());


</script>

<style scoped>
.sub-title {
  @apply block mt-4 mb-2 text-center text-sm font-medium text-gray-900 dark:text-gray-400;
}

.color-unit-box {
  @apply
  flex-1 rounded-[3px] border shadow-sm h-[40px]
  border-zinc-300 dark:border-zinc-800;
  > div {
    &:nth-child(1) {
      @apply flex-1 rounded-l-[3px]
    }
    &:nth-child(2) {
      @apply flex-1 rounded-r-[3px]
    }
  }
}

.info-box {
  @apply p-4 flex justify-between items-center;
  h5 {
    @apply mb-2 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white
  }
  p {
    @apply mb-1 font-normal text-zinc-500 dark:text-zinc-300
  }
}

.img-preview {
  font-family: 'Malgun Gothic'; font-weight: normal; margin:0 auto; overflow: hidden; cursor:default;
  .img-title { font-size:13px; font-weight: bold; line-height:30px; height:30px; text-align: center }
  .img-ymd { font-size:12px; line-height:20px; height:20px; text-align: center }
  .img-node { font-size:13px; line-height:20px; height:20px; padding-left:2px; text-align: left; overflow: hidden; }
}
input[type=number]::-webkit-inner-spin-button { appearance: none }

</style>
