<template>

  <div :ref="e => containerRef = e" class="container m-auto px-4 pt-5 as-cp-close duration-300">

    <div class="md:flex md:space-x-6 justify-between">
      <!--  -->
      <div class="md:flex-1 p-4 flex as-box">
        <div class="flex m-auto">
          <iframe v-if="asd.type === 'html'" :ref="e => htmlFrameRef = e" class="preview-border" src="/schedule/2015" :width="htmlMaxWidth" :height="asd.htmlHeight" @load="drawHtml"></iframe>
          <div v-else-if="asd.type === 'img'" class="preview-img preview-border" :style="({width: `${imgMaxWidth}px`,height: `${imgHeight}px`, background: `#${asd.imgListBg}`, 'overflow-y': asd.imgScroll ? 'auto' : 'hidden'})">
            <div class="img-preview" ondragstart="return false" onselectstart="return false">
              <div class="img-title" :style="{background: `#${asd.imgTitleBg}`, color: `#${asd.imgTitle}`}">애니편성표</div>
              <div class="img-ymd" :style="{background: `#${asd.imgYmdBg}`, color: `#${asd.imgYmd}`}">{{asd.imgDataYmd}}</div>
              <div class="img-node" :style="{background: `#${asd.imgListBg}`, color: `#${asd.imgList}`}" v-for="node in asd.imgDataList" :key="node">{{node}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="md:w-64">
        <label class="sub-title">소스타입</label>
        <div class="flex w-full justify-between rounded-md shadow-sm">
          <button type="button" @click="setType('html')" class="flex-1 rounded-l-lg p-2 text-sm border border-gray-200 dark:border-zinc-800 dark:bg-zinc-900" :class="asd.type == 'html' ? 'bg-white text-blue-700 dark:text-zinc-300' : 'bg-gray-50 text-gray-500 dark:opacity-60 dark:text-neutral-500'">
            HTML
          </button>
          <button type="button" @click="setType('img')" class="flex-1 rounded-r-lg p-2 text-sm border border-gray-200 dark:border-zinc-800 dark:bg-zinc-900" :class="asd.type == 'img' ? 'bg-white text-blue-700 dark:text-zinc-300' : 'bg-gray-50 text-gray-500 dark:opacity-60 dark:text-neutral-500'">
            IMG (블로그)
          </button>
        </div>
        <div v-if="asd.type == 'html'">
          <div class="select-none">
            <label class="sub-title">배경</label>
            <div class="flex space-x-2">
              <div class="color-unit-box" @click="e => openCp(e, 'htmlBgLight')" :style="`background:#${asd.htmlBgLight}`"></div>
              <div class="color-unit-box" @click="e => openCp(e, 'htmlBgDark')" :style="`background:#${asd.htmlBgDark}`"></div>
            </div>
            <label class="sub-title">타이틀 (배경 / 글자)</label>
            <div class="flex space-x-2">
              <div class="flex color-unit-box">
                <div @click="e => openCp(e, 'htmlTitleBgLight')" :style="`background:#${asd.htmlTitleBgLight}`"></div>
                <div @click="e => openCp(e, 'htmlTitleLight')" :style="`background:#${asd.htmlTitleLight}`"></div>
              </div>
              <div class="flex color-unit-box">
                <div @click="e => openCp(e, 'htmlTitleBgDark')" :style="`background:#${asd.htmlTitleBgDark}`"></div>
                <div @click="e => openCp(e, 'htmlTitleDark')" :style="`background:#${asd.htmlTitleDark}`"></div>
              </div>
            </div>
            <label class="sub-title">요일 (배경 / 글자)</label>
            <div class="flex space-x-2">
              <div class="flex color-unit-box">
                <div @click="e => openCp(e, 'htmlNavBgLight')" :style="`background:#${asd.htmlNavBgLight}`"></div>
                <div @click="e => openCp(e, 'htmlNavLight')" :style="`background:#${asd.htmlNavLight}`"></div>
              </div>
              <div class="flex color-unit-box">
                <div @click="e => openCp(e, 'htmlNavBgDark')" :style="`background:#${asd.htmlNavBgDark}`"></div>
                <div @click="e => openCp(e, 'htmlNavDark')" :style="`background:#${asd.htmlNavDark}`"></div>
              </div>
            </div>
            <label class="sub-title">요일 (활성) (배경 / 글자)</label>
            <div class="flex space-x-2">
              <div class="flex color-unit-box">
                <div @click="e => openCp(e, 'htmlNavActBgLight')" :style="`background:#${asd.htmlNavActBgLight}`"></div>
                <div @click="e => openCp(e, 'htmlNavActLight')" :style="`background:#${asd.htmlNavActLight}`"></div>
              </div>
              <div class="flex color-unit-box">
                <div @click="e => openCp(e, 'htmlNavActBgDark')" :style="`background:#${asd.htmlNavActBgDark}`"></div>
                <div @click="e => openCp(e, 'htmlNavActDark')" :style="`background:#${asd.htmlNavActDark}`"></div>
              </div>
            </div>
            <label class="sub-title">리스트 (배경 / 글자)</label>
            <div class="flex space-x-2">
              <div class="flex color-unit-box">
                <div @click="e => openCp(e, 'htmlListBgLight')" :style="`background:#${asd.htmlListBgLight}`"></div>
                <div @click="e => openCp(e, 'htmlListLight')" :style="`background:#${asd.htmlListLight}`"></div>
              </div>
              <div class="flex color-unit-box">
                <div @click="e => openCp(e, 'htmlListBgDark')" :style="`background:#${asd.htmlListBgDark}`"></div>
                <div @click="e => openCp(e, 'htmlListDark')" :style="`background:#${asd.htmlListDark}`"></div>
              </div>
            </div>
            <label class="sub-title">리스트 (활성) (배경 / 글자)</label>
            <div class="flex space-x-2">
              <div class="flex color-unit-box">
                <div @click="e => openCp(e, 'htmlListActBgLight')" :style="`background:#${asd.htmlListActBgLight}`"></div>
                <div @click="e => openCp(e, 'htmlListActLight')" :style="`background:#${asd.htmlListActLight}`"></div>
              </div>
              <div class="flex color-unit-box">
                <div @click="e => openCp(e, 'htmlListActBgDark')" :style="`background:#${asd.htmlListActBgDark}`"></div>
                <div @click="e => openCp(e, 'htmlListActDark')" :style="`background:#${asd.htmlListActDark}`"></div>
              </div>
            </div>
            <label class="sub-title">접두어 (글자)</label>
            <div class="flex space-x-2">
              <div class="color-unit-box" @click="e => openCp(e, 'htmlPrefixLight')" :style="`background:#${asd.htmlPrefixLight}`"></div>
              <div class="color-unit-box" @click="e => openCp(e, 'htmlPrefixDark')" :style="`background:#${asd.htmlPrefixDark}`"></div>
            </div>
          </div>
          <label class="sub-title">모양</label>
          <div class="flex items-center space-x-2 mb-2">
            <span class="ml-3 w-5 text-sm font-medium text-gray-900 dark:text-zinc-300 text-center"><i class="fa-solid fa-left-right"></i></span>
            <input type="range" v-model="asd.htmlWidth" min="180" max="900" step="10" class="shadow-sm flex-1 w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer dark:bg-gray-700 shadow-sm">
            <input type="number" v-model="asd.htmlWidth" class="shadow-sm block w-[48px] text-center text-zinc-900 outline-0 bg-zinc-50 rounded-md border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white shadow-sm" maxlength="3" />
          </div>
          <div class="flex items-center space-x-2 mb-2">
            <span class="ml-3 w-5 text-sm font-medium text-gray-900 dark:text-zinc-300 text-center"><i class="fa-solid fa-up-down"></i></span>
            <input type="range" v-model="asd.htmlHeight" min="240" max="780" step="10" class="shadow-sm flex-1 w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer dark:bg-gray-700 shadow-sm">
            <input type="number" v-model="asd.htmlHeight" class="shadow-sm block w-[48px] text-center text-zinc-900 outline-0 bg-zinc-50 rounded-md border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white shadow-sm" maxlength="3" />
          </div>
          <label class="sub-title">HTML 코드</label>
          <textarea readonly :value="htmlCode" class="p-2 h-[120px] md:h-[162px] as-input-text !text-[12px]"></textarea>
          <div class="mt-3">
            <button @click="doCopyClipboard(htmlCode)" class="w-full p-2 as-input-btn font-semibold !text-[15px]">
              <i class="fa-regular fa-copy"></i>&nbsp; 복사하기
            </button>
          </div>
        </div>
        <div v-if="asd.type == 'img'">
          <div class="select-none">
            <label class="sub-title">제목 (배경색 / 글자색)</label>
            <div class="flex space-x-2">
              <div class="color-unit-box" @click="e => openCp(e, 'imgTitleBg')" :style="`background:#${asd.imgTitleBg}`"></div>
              <div class="color-unit-box" @click="e => openCp(e, 'imgTitle')" :style="`background:#${asd.imgTitle}`"></div>
            </div>
            <label class="sub-title">날짜 (배경색 / 글자색)</label>
            <div class="flex space-x-2">
              <div class="color-unit-box" @click="e => openCp(e, 'imgYmdBg')" :style="`background:#${asd.imgYmdBg}`"></div>
              <div class="color-unit-box" @click="e => openCp(e, 'imgYmd')" :style="`background:#${asd.imgYmd}`"></div>
            </div>
            <label class="sub-title">목록 (배경색 / 글자색)</label>
            <div class="flex space-x-2">
              <div class="color-unit-box" @click="e => openCp(e, 'imgListBg')" :style="`background:#${asd.imgListBg}`"></div>
              <div class="color-unit-box" @click="e => openCp(e, 'imgList')" :style="`background:#${asd.imgList}`"></div>
            </div>
          </div>

          <label class="sub-title">모양</label>
          <div class="flex items-center space-x-2 mb-2">
            <span class="ml-3 w-5 text-sm font-medium text-gray-900 dark:text-zinc-300 text-center"><i class="fa-solid fa-left-right"></i></span>
            <input type="range" v-model="asd.imgWidth" min="150" max="900" step="10" class="flex-1 w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer dark:bg-gray-700">
            <input type="text" v-model="asd.imgWidth" class="block w-[48px] text-center text-zinc-900 outline-0 bg-zinc-50 rounded-md border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white" maxlength="3" />
          </div>
          <div class="flex items-center space-x-2 mb-2">
            <span class="ml-3 w-5 text-sm font-medium text-gray-900 dark:text-zinc-300 text-center"><i class="fa-solid fa-up-down"></i></span>
            <input type="range" v-model="asd.imgSize" min="5" max="20" step="1" class="flex-1 w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer dark:bg-gray-700">
            <input type="text" v-model="asd.imgSize" class="block w-[48px] text-center text-zinc-900 outline-0 bg-zinc-50 rounded-md border border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white" maxlength="3" />
          </div>
          <label for="use-scroll" class="inline-flex relative cursor-pointer my-4 mx-2">
            <input type="checkbox" v-model="asd.imgScroll" id="use-scroll" class="sr-only peer">
            <div class="w-[38px] h-[20px] mt-[1px] outline-none rounded-full peer bg-gray-200 dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500 dark:peer-checked:bg-blue-800"></div>
            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-zinc-300">스크롤 사용여부</span>
          </label>
          <label class="sub-title">HTML 코드</label>
          <textarea readonly :value="imgCode" class="p-2 h-[88px] md:h-[162px]  as-input-text !text-[12px]"></textarea>
          <div class="mt-3">
            <button @click="doCopyClipboard(imgCode)" class="w-full p-2 as-input-btn font-semibold !text-[15px]">
              <i class="fa-regular fa-copy"></i>&nbsp; 복사하기
            </button>
          </div>
        </div>

      </div>
    </div>

    <div class="font-bold text-xl mt-5">애니 편성표</div>

    <div class="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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

  <!-- color picker -->
  <div v-if="cpShow" class="as-cp-not-close fixed inline-block select-none" :style="`width:256px;height:283px;top:${cpY}px;left:${cpX}px;`">
    <color-picker :color="cpColor" :callback="onCpPick"/>
  </div>

</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";
import ColorPicker from "../../domain/colorPicker/ColorPicker.vue";
import {DateFormat} from "../../common/DateFormat";
import animeRemote from "../../domain/anime/remote/animeRemote";
import toast from "../../common/toast";


// anime schedule data
const asd = ref({
  // TYPE - html, img
  type: 'html',
  // HTML - color - light mode
  htmlBgLight: 'ffffff', htmlTitleBgLight: '5987b6', htmlTitleLight: 'ffffff',
  htmlNavBgLight: 'f2f2f2', htmlNavLight: '497ba7', htmlNavActBgLight: '9cb3c7', htmlNavActLight: 'ffffff',
  htmlListBgLight: 'ffffff', htmlListLight: '555555', htmlListActBgLight: 'f8f8f8', htmlListActLight: '2474ce',
  htmlPrefixLight: 'cb3434',
  // HTML - color - dark mode
  htmlBgDark: '000000', htmlTitleBgDark: '000000', htmlTitleDark: '777777',
  htmlNavBgDark: '111111', htmlNavDark: '777777', htmlNavActBgDark: '111111', htmlNavActDark: 'c3b443',
  htmlListBgDark: '070707', htmlListDark: '999999', htmlListActBgDark: '000000', htmlListActDark: 'cccccc',
  htmlPrefixDark: '3a7da3',
  // HTML - size
  htmlWidth: 650, htmlHeight: 400,
  // IMG - color
  imgTitleBg: '63a883', imgTitle: 'ffffff',
  imgYmdBg: 'd8d8d8', imgYmd: '000000',
  imgListBg: 'ffffff', imgList: '000000',
  imgScroll: true,
  // IMG - size
  imgWidth: 180, imgSize: 10,
  // IMG - data
  imgDataList: [] as string[],
  imgDataYmd: new DateFormat().format("yyyy년 MM월 dd일"),
});
const maxWidth = ref(0);
const containerRef = ref(null) as any;
const htmlFrameRef = ref(null) as any;
const htmlMaxWidth = computed(() => Math.min(maxWidth.value, asd.value.htmlWidth));
const htmlCode = computed(() => `<iframe src="${location.origin + '/schedule/2015#' + htmlSrc.value}" width="${asd.value.htmlWidth}" height="${asd.value.htmlHeight}" frameborder="0"></iframe>`);
const htmlSrc = computed(() => asd.value.htmlBgLight + asd.value.htmlTitleBgLight + asd.value.htmlTitleLight + asd.value.htmlNavBgLight + asd.value.htmlNavLight + asd.value.htmlNavActBgLight +
    asd.value.htmlNavActLight + asd.value.htmlListBgLight + asd.value.htmlListLight + asd.value.htmlListActBgLight + asd.value.htmlListActLight + asd.value.htmlPrefixLight +
    asd.value.htmlBgDark + asd.value.htmlTitleBgDark + asd.value.htmlTitleDark + asd.value.htmlNavBgDark + asd.value.htmlNavDark + asd.value.htmlNavActBgDark +
    asd.value.htmlNavActDark + asd.value.htmlListBgDark + asd.value.htmlListDark + asd.value.htmlListActBgDark + asd.value.htmlListActDark + asd.value.htmlPrefixDark);
const imgMaxWidth = computed(() => Math.min(maxWidth.value, asd.value.imgWidth));
const imgHeight = computed(() => 50 + (asd.value.imgSize * 20));
const imgCode = computed(() => {
  const theme = asd.value.imgTitleBg + asd.value.imgTitle + asd.value.imgYmdBg + asd.value.imgYmd + asd.value.imgListBg + asd.value.imgList;
  const origin = location.origin;
  const api = (origin + '/api').replace('anissia.net/api', 'api.anissia.net');
  return `<div style="width:${asd.value.imgWidth}px;height:${imgHeight.value}px;background:#${asd.value.imgListBg};overflow-y:${asd.value.imgScroll ? 'auto' : 'hidden'}"><a href="${origin + '/schedule/2015'}" target="_blank"><img src="${api}/anime/schedule/svg/${asd.value.imgWidth}/${theme}"/></a></div>`;
});
function drawHtml() {
  if (asd.value.type == 'html') {
    htmlFrameRef.value.contentWindow.repaint(htmlSrc.value);
  }
}
function bindMaxWidth() {
  maxWidth.value = (containerRef.value.offsetWidth as number) - (matchMedia('(min-width: 768px)').matches ? 400 : 100);
}
function colorModeHtml(mode: string) {
  htmlFrameRef.value.contentWindow.colorMode(mode);
}
function setType(type: string) {
  asd.value.type = type;
  if (type == 'img' && asd.value.imgDataList.length == 0) {
    animeRemote.getScheduleAnimeList(new Date().getDay()).then((list) => asd.value.imgDataList = list.map(e => `${e.scheduleTime} ${e.subject}`));
  }
}
function doCopyClipboard(text: string) {
  navigator.clipboard.writeText(text);
  toast.success('복사되었습니다.');
}
onMounted(() => {
  bindMaxWidth();
  addEventListener('resize', bindMaxWidth, true);
});
onUnmounted(() => {
  removeEventListener('resize', bindMaxWidth, true);
});

// ---------------------- cp: color picker ----------------------
const cpColor = ref('#ffffff');
const cpShow = ref(false);
const cpX = ref(0);
const cpY = ref(0);
const cpTarget = ref('');

function openCp(event: MouseEvent, target: string) {
  cpX.value = Math.max(Math.min(event.clientX - 10, window.innerWidth - 266), 0);
  cpY.value = Math.max(Math.min(event.clientY + 10, window.innerHeight - 290), 0);
  cpShow.value = true;
  cpTarget.value = target;
  cpColor.value = `#${(asd.value as any)[cpTarget.value]}`;
  if (asd.value.type == 'html') {
    colorModeHtml(cpTarget.value.endsWith('Dark') ? 'dark' : 'light');
  }
}

function onCpPick(e: any) {
  (asd.value as any)[cpTarget.value] = e;
  drawHtml();
}

function onCpClose(event: Event) {
  if (cpShow.value && !((event?.target as HTMLElement | null)?.closest('html,.as-cp-close,.color-unit-box,.as-cp-not-close')?.matches('.as-cp-not-close'))) {
    cpShow.value = false;
  }
}

onMounted(() => {
  addEventListener('click', onCpClose, true);
});

onUnmounted(() => {
  removeEventListener('click', onCpClose, true);
});

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