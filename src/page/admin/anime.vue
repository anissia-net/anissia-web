<template>

  <div class="container m-auto px-4 duration-300">

    <div v-if="anime" class="mb-10">
      <div v-if="anime.animeNo > 0 || (anime.animeNo == 0 && animeNo == 0)">

        <table class="w-full text-sm text-left text-zinc-500 dark:text-zinc-300">
          <thead>
            <tr class="border-b dark:border-zinc-800">
              <th colspan="2" class="py-4 px-6 w-[20%] text-center">애니메이션 {{anime.animeNo != 0 ? '편집' : '신규등록'}}</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-zinc-800">
              <th class="py-4 px-6 w-[20%] text-zinc-500 dark:text-zinc-300">제목</th>
              <td class="py-4 px-6">
                <input type="text" v-model="anime.subject" name="subject" placeholder="제목" class="p-2.5 as-input-text">
              </td>
            </tr>
            <tr class="border-b dark:border-zinc-800">
              <th class="py-4 px-6 w-[20%] text-zinc-500 dark:text-zinc-300">원제</th>
              <td class="py-4 px-6">
                <input type="text" v-model="anime.originalSubject" name="originalSubject" placeholder="원제" class="p-2.5 as-input-text" lang="ja">
              </td>
            </tr>
            <tr class="border-b dark:border-zinc-800">
              <th class="py-4 px-6 w-[20%] text-zinc-500 dark:text-zinc-300">장르</th>
              <td class="pt-4 pb-2 px-6">
                <div @click="toggleGenreOpen">
                  <div v-for="genre in anime.editGenres" :key="genre" class="mr-2 mb-2 px-2 py-1 cursor-pointer inline-block border text-gray-900 dark:text-gray-200 border-gray-600 dark:border-zinc-800">
                    {{genre}}
                  </div>
                  <div v-if="anime.editGenres.length == 0" class="mb-2 py-1 mt-[2px] inline-block cursor-pointer">
                    선택된 장르가 없습니다.
                  </div>
                </div>
                <div v-if="anime?.editGenresOpen" class="mt-3">
                  <div v-for="genre in genres" :key="genre" @click="toggleGenre(genre)" class="mr-2 mb-2 px-2 py-1 cursor-pointer inline-block border text-gray-900 dark:text-gray-200 border-gray-600 dark:border-zinc-800" :class="anime.editGenres.indexOf(genre) != -1 ? '' : 'opacity-50'">
                    {{genre}}
                  </div>
                </div>

              </td>
            </tr>
            <tr class="border-b dark:border-zinc-800">
              <th class="py-4 px-6 w-[20%] text-zinc-500 dark:text-zinc-300">상태</th>
              <td class="pt-4 pb-2 px-6">
                <label class="mr-2 mb-2 px-2 py-1 cursor-pointer inline-block border text-gray-900 dark:text-gray-200 border-gray-600 dark:border-zinc-800" :class="anime.status == 'ON' ? '' : 'opacity-50'">
                  <input type="radio" name="status" v-model="anime.status" value="ON" class="hidden" />편성표
                </label>
                <label class="mr-2 mb-2 px-2 py-1 cursor-pointer inline-block border text-gray-900 dark:text-gray-200 border-gray-600 dark:border-zinc-800" :class="anime.status == 'OFF' ? '' : 'opacity-50'">
                  <input type="radio" name="status" v-model="anime.status" value="OFF" class="hidden" />편성표-결방
                </label>
                <label class="mr-2 mb-2 px-2 py-1 cursor-pointer inline-block border text-gray-900 dark:text-gray-200 border-gray-600 dark:border-zinc-800" :class="anime.status == 'END' ? '' : 'opacity-50'">
                  <input type="radio" name="status" v-model="anime.status" value="END" class="hidden" />완결
                </label>
              </td>
            </tr>
            <tr class="border-b dark:border-zinc-800">
              <th class="py-4 px-6 w-[20%] text-zinc-500 dark:text-zinc-300">요일</th>
              <td class="pt-4 pb-2 px-6">
                <label v-for="(week, i) in weekList" :key="week" class="mr-2 mb-2 px-2 py-1 cursor-pointer inline-block border text-gray-900 dark:text-gray-200 border-gray-600 dark:border-zinc-800" :class="(i+'') == anime.week ? '' : 'opacity-50'">
                  <input type="radio" name="week" v-model="anime.week" :value="i+''" class="hidden" />
                  {{week}}
                </label>
              </td>
            </tr>
            <tr v-if="anime.week != '7'" class="border-b dark:border-zinc-800">
              <th class="py-4 px-6 w-[20%] text-zinc-500 dark:text-zinc-300">시간</th>
              <td class="py-4 px-6">
                <input type="time" v-model="anime.time" class="p-2 as-input-text !w-min"/>
              </td>
            </tr>
            <tr class="border-b dark:border-zinc-800">
              <th class="py-4 px-6 w-[20%] text-zinc-500 dark:text-zinc-300">시작일</th>
              <td class="py-4 px-6">
                <div>
                  <label v-for="dateType in dateTypeList" :key="dateType" class="mr-2 px-2 py-1 cursor-pointer inline-block border text-gray-900 dark:text-gray-200 border-gray-600 dark:border-zinc-800" :class="dateType == anime.editStartDateType ? '' : 'opacity-50'">
                    <input type="radio" name="startDate" v-model="anime.editStartDateType" :value="dateType" class="hidden" />
                    {{dateType}}
                  </label>
                </div>
                <div v-if="anime.editStartDateType != 'N/A'" class="mt-3 text-bold text-lg">
                  <span>
                    <input type="text" v-model="anime.editStartDateYear" maxlength="4" placeholder="YYYY" class="w-[50px] py-1 text-center outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:border-blue-600 dark:bg-zinc-900 dark:border-zinc-800 dark:placeholder-gray-400 dark:text-white dark:focus:border-zinc-300"> 년
                    <span v-if="anime.editStartDateType != 'Y'" class="ml-1">
                      <input type="text" v-model="anime.editStartDateMonth" maxlength="2" placeholder="MM" class="w-[32px] py-1 text-center outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:border-blue-600 dark:bg-zinc-900 dark:border-zinc-800 dark:placeholder-gray-400 dark:text-white dark:focus:border-zinc-300"> 월
                      <span v-if="anime.editStartDateType != 'YM'" class="ml-1"><input type="text" v-model="anime.editStartDateDate" maxlength="2" placeholder="DD" class="w-[32px] py-1 text-center outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:border-blue-600 dark:bg-zinc-900 dark:border-zinc-800 dark:placeholder-gray-400 dark:text-white dark:focus:border-zinc-300"> 일</span>
                    </span>
                  </span>
                </div>
              </td>
            </tr>
            <tr class="border-b dark:border-zinc-800">
              <th class="py-4 px-6 w-[20%] text-zinc-500 dark:text-zinc-300">종료일</th>
              <td class="py-4 px-6">
                <div>
                  <label v-for="dateType in dateTypeList" :key="dateType" class="mr-2 px-2 py-1 cursor-pointer inline-block border text-gray-900 dark:text-gray-200 border-gray-600 dark:border-zinc-800" :class="dateType == anime.editEndDateType ? '' : 'opacity-50'">
                    <input type="radio" name="endDate" v-model="anime.editEndDateType" :value="dateType" class="hidden" />
                    {{dateType}}
                  </label>
                </div>
                <div v-if="anime.editEndDateType != 'N/A'" class="mt-3 text-bold text-lg">
                  <span>
                    <input type="text" v-model="anime.editEndDateYear" maxlength="4" placeholder="YYYY" class="w-[50px] py-1 text-center outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:border-blue-600 dark:bg-zinc-900 dark:border-zinc-800 dark:placeholder-gray-400 dark:text-white dark:focus:border-zinc-300"> 년
                    <span v-if="anime.editEndDateType != 'Y'" class="ml-1">
                      <input type="text" v-model="anime.editEndDateMonth" maxlength="2" placeholder="MM" class="w-[32px] py-1 text-center outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:border-blue-600 dark:bg-zinc-900 dark:border-zinc-800 dark:placeholder-gray-400 dark:text-white dark:focus:border-zinc-300"> 월
                      <span v-if="anime.editEndDateType != 'YM'" class="ml-1"><input type="text" v-model="anime.editEndDateDate" maxlength="2" placeholder="DD" class="w-[32px] py-1 text-center outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:border-blue-600 dark:bg-zinc-900 dark:border-zinc-800 dark:placeholder-gray-400 dark:text-white dark:focus:border-zinc-300"> 일</span>
                    </span>
                  </span>
                </div>
              </td>
            </tr>
            <tr class="border-b dark:border-zinc-800">
              <th class="py-4 px-6 w-[20%] text-zinc-500 dark:text-zinc-300">웹사이트</th>
              <td class="py-4 px-6">
                <input type="text" v-model="anime.website" name="website" placeholder="웹사이트" class="p-2.5 as-input-text">
              </td>
            </tr>
            <tr class="border-b dark:border-zinc-800">
              <th class="py-4 px-6 w-[20%] text-zinc-500 dark:text-zinc-300">X</th>
              <td class="py-4 px-6">
                <input type="text" v-model="anime.twitter" name="twitter" placeholder="X" class="p-2.5 as-input-text">
              </td>
            </tr>
            <tr v-if="anime.animeNo > 0" class="border-b dark:border-zinc-800">
              <th class="py-4 px-6 w-[20%] text-zinc-500 dark:text-zinc-300">비고</th>
              <td class="py-4 px-6">
                <input type="text" v-model="anime.note" name="twitter" placeholder="비고" class="p-2.5 as-input-text">
              </td>
            </tr>
            <tr class="border-b dark:border-zinc-800">
              <th class="py-4 px-6 w-[20%] text-zinc-500 dark:text-zinc-300">자막참여자</th>
              <td class="py-4 px-6">
                <span v-for="cp in anime.captions" :key="cp.name" class="mr-4">{{cp.name}}</span>
                <input type="button" value="자막참여" @click="addCaption()" class="as-input-btn p-1.5" />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="mt-4 overflow-auto">
          <div class="float-left">
            <input type="button" value="삭제" @click="doDelete()" class="as-input-btn p-1.5" />
          </div>
          <div class="float-right">
            <input type="button" value="저장" @click="doSave()" class="as-input-btn p-1.5" />
          </div>
        </div>


      </div>
      <div v-else>
        <div class="text-xl text-center my-32">
          존재하지 않거나 삭제된 애니메이션 입니다.
        </div>
      </div>

    </div>

    <div class="flex w-full justify-between rounded-md shadow-sm mt-1">
      <router-link to="/admin/anime" class="text-center flex-1 rounded-l-lg p-4 text-sm border border-gray-200 dark:border-zinc-800 dark:bg-zinc-900" :class="state === 'list' ? 'text-blue-700 dark:text-zinc-300' : 'bg-gray-50 text-gray-500 dark:grayscale-[50%] dark:text-neutral-500 dark:bg-opacity-50'">
        전체
      </router-link>
      <router-link to="/admin/anime?state=delist" class="text-center flex-1 rounded-r-lg p-4 text-sm border border-gray-200 dark:border-zinc-800 dark:bg-zinc-900" :class="state === 'delist' ? 'text-blue-700 dark:text-zinc-300' : 'bg-gray-50 text-gray-500 dark:grayscale-[50%] dark:text-neutral-500 dark:bg-opacity-50'">
        삭제대기
      </router-link>
    </div>

    <div class="flex-col justify-center relative text-gray-500 mt-4">

      <div v-if="state == 'list'" class="relative">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <input type="text" id="default-search" autocomplete="off" class="p-3 pl-9 as-input-text" placeholder="애니메이션 검색 : 검색어 #장르 @제작자 /완결"  v-model="query" @click="autocorrectOn = true" @keydown="keyAutocorrect" @keyup="loadAutocorrect">
        <router-link to="/admin/anime?animeNo=0" type="button" class="as-input-btn absolute px-4 py-1.5 right-2 bottom-1.5" >신규</router-link>
      </div>

      <div v-if="autocorrectOn && autocorrect.length">
        <ul class="autocorrect-list text-sky-600 dark:bg-zinc-900 dark:text-sky-300 mt-2 py-1 rounded-md border border-gray-300 dark:border-zinc-800 font-light">
          <li v-for="(node, i) in autocorrect" :class="autocorrectIndex != i ? 'grayscale-[100%]' : ''" class=" pl-8 pr-2 py-1 relative cursor-pointer" @mouseover="autocorrectIndex = i">
            <router-link :to="`/admin/anime?animeNo=${node.key}`" class="block">
              <i :class="autocorrectIndex != i ? 'opacity-[0%]' : ''" class="fa-solid fa-arrow-right-long absolute w-4 h-4 left-2 top-2"></i>
              <span v-html="node.hl"></span>
            </router-link>
          </li>
        </ul>
      </div>

      <div v-if="!list.empty" class="mt-4">
        <div class="text-right mt-3 text-sm">
          총 <b>{{list.totalElements}}</b> 작품
        </div>
        <div class="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div v-for="(node, i) in list.content" class="p-4 as-box">
            <div>
              <router-link v-if="!node.agendaNo" :to="toAnimeViewUrl(node.animeNo)">
                <div class="text-md font-bold text-gray-800 dark:text-zinc-300">{{node.subject}}</div>
                <div class="text-sm mt-1" lang="ja" v-if="node.originalSubject">{{node.originalSubject}}</div>
              </router-link>
              <div v-else>
                <input type="button" value="복원" @click="doRecover(node)" class="float-right text-white bg-rose-700 hover:bg-rose-800 outline-none font-medium rounded-md text-sm px-4 py-2 dark:bg-red-800 dark:hover:bg-red-700" />
                <div class="text-md font-bold text-gray-800 dark:text-zinc-300">{{node.subject}}</div>
                <div class="text-sm mt-1" lang="ja" v-if="node.originalSubject">{{node.originalSubject}}</div>
              </div>
            </div>
            <div class="mt-1 space-x-1 space-y-2 text-gray-800 dark:text-zinc-300">
              <span class="as-tag-xs" v-for="tag in node.tags" :key="tag">{{tag}}</span>
              <span class="as-tag-xs" v-for="tag in node.genres.split(/,/g)" :key="tag"><router-link :to="`/admin/anime?q=%23${encodeURIComponent(tag)}`">{{tag}}</router-link></span>
              <span class="as-tag-xs" v-if="node.website"><a :href="node.website" target="_blank" class="fas fa-home"></a></span>
              <span class="as-tag-xs" v-if="node.twitter"><a :href="node.twitter" target="_blank" class="fa-brands fa-x-twitter"></a></span>
              <span class="as-tag-xs" v-if="node.captionCount"><span class="fas fa-closed-captioning">&nbsp; {{node.captionCount}}</span></span>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="list.loaded">
        <div class="text-xl text-center my-32">
          <b>{{getNowSearchedQuery()}}</b>에 대한 검색결과가 없습니다.
        </div>
      </div>


    </div>

  </div>

</template>

<script setup lang="ts">

import {nextTick, onUnmounted, Ref, ref} from "vue";
import PageData from "../../common/PageData";
import Anime from "../../domain/anime/Anime";
import animeRemote from "../../domain/anime/remote/animeRemote";
import AnimeAutocorrect from "../../domain/anime/AnimeAutocorrect";
import {onBeforeRouteUpdate, useRouter} from "vue-router";
import {Locate} from "raon";
import { ScrollLoader } from "raon";
import anissia from "../../common/anissia";
import toast from "../../common/toast";

const list = ref(PageData.empty().notLoaded()) as Ref<PageData<Anime>>;
const anime = ref(null) as Ref<Anime|null>;
const animeNo = ref(-1);
let lastAnimeNo = -1;
const page = ref(0);
const query = ref<string>(new Locate().getParameter('q', '') as string);
const autocorrect = ref([]) as Ref<AnimeAutocorrect[]>;
const autocorrectOn = ref(false);
const autocorrectIndex = ref(-1);
let autocorrectQuery = '';
const router = useRouter();
const weekList = ref(['日', '月', '火', '水', '木', '金', '土', '外', '新']);
const dateTypeList = ref(['YMD', 'YM', 'Y', 'N/A']);
const genres = ref([]) as Ref<string[]>;
const state = ref('list');

const sl = new ScrollLoader().onNeedNextPage(() => {
  page.value++;
  loadList();
});

function init() {
  animeRemote.getGenres().then(_genres => genres.value = _genres)
}

function clear(locate: Locate) {
  state.value = locate.getParameter('state', 'list') == 'list' ? 'list' : 'delist';
  page.value = 0;
}

function load(locate: Locate = new Locate()) {
  autocorrectOn.value = false;
  const q = locate.getParameter('q', '')!!;
  if (query.value != q) {
    page.value = 0;
  }
  query.value = q;
  loadAnime(locate);
  loadList();
}

function loadAnime(locate: Locate, forced: boolean = false) {
  if (forced) {
    lastAnimeNo = -1;
  }
  const no = animeNo.value = locate.getIntParameter('animeNo', -1);
  if (no > 0) {
    if (lastAnimeNo != no) {
      lastAnimeNo = no;
      animeRemote.getAnime(no).then(node => anime.value = node.bindEdit());
    }
  } else if (no == 0) {
    lastAnimeNo = -1;
    anime.value = new Anime().bindEdit();
  } else {
    lastAnimeNo = -1;
    anime.value = null;
  }
}

function loadList() {
  const isFirstPage = page.value == 0;

  if (state.value === 'list') {
    animeRemote.getAnimeList(page.value, query.value).then(pageData => {
      if (isFirstPage) {
        list.value = pageData;
      } else {
        list.value = list.value.merge(pageData);
      }
      nextTick(() => sl.watch(pageData.next))
    });
  } else if (state.value === 'delist') {
    animeRemote.getAdminAnimeDelist().then(pageData => {
      list.value = pageData;
    });
  }
}



function searchAnime() {
  page.value = 0;
  autocorrectOn.value = false;
  router.push(`/admin/anime?q=${encodeURIComponent(query.value)}`);
}

function loadAutocorrect(event: KeyboardEvent) {
  const word = (event.target as any).value;
  if (autocorrectQuery != word) {
    autocorrectOn.value = true;
    autocorrectIndex.value = -1;
    autocorrectQuery = word;
    animeRemote.getAnimeListAutocorrect(word).then(list => autocorrect.value = list);
  }
}

function toggleGenreOpen() {
  const ani = anime.value!!;
  ani.editGenresOpen = !ani.editGenresOpen;
}

function toggleGenre(genre: string) {
  const ani = anime.value!!;
  const genres = ani.editGenres;
  if (genres.indexOf(genre) != -1) {
    ani.editGenres = ani.editGenres.filter(e => e != genre);
  } else {
    if (genres.length >= 3) {
      ani.editGenres = [...ani.editGenres.slice(1, 3), genre];
    } else {
      ani.editGenres = [...ani.editGenres, genre];
    }
  }
}

function keyAutocorrect(event: KeyboardEvent) {
  const key = event.key;
  const len = autocorrect.value.length;

  switch (key) {
    case 'ArrowUp':
      if (len) {
        event.preventDefault();
        if (autocorrectIndex.value == -1) { autocorrectIndex.value = len -1; } else { autocorrectIndex.value--; }
      }
      return;
    case 'ArrowDown':
      if (len) {
        event.preventDefault();
        if (autocorrectIndex.value >= (len -1)) { autocorrectIndex.value = -1; } else { autocorrectIndex.value++; }
      }
      return;
    case 'Enter':
      if (!autocorrect.value.length || autocorrectIndex.value == -1) {
        searchAnime();
      } else {
        router.push(`/admin/anime?animeNo=${autocorrect.value[autocorrectIndex.value].key}`)
      }
      return;
  }
}

function toAnimeViewUrl(animeNo: number) {
  return new Locate().setParameter('animeNo', animeNo+'').fullPath
}

function getNowSearchedQuery() {
  return new Locate().getParameter('q', '');
}

function addCaption() {
  animeRemote.addAdminCaption(anime.value?.animeNo!!).then(result => {
    if (result.code == 'ok') {
      loadAnime(new Locate(), true);
    }
    toast.result(result);
  });
}

function doDelete() {
  if (confirm(`${anime.value?.subject}을(를) 삭제하시겠습니까?\n임의삭제시 권한박탈의 사유가됩니다.`)) {
    animeRemote.deleteAdminAnime(anime.value?.animeNo!!).then(result => {
      if (result.code == 'ok') {
        router.push(`/admin/anime`);
      } else if (result.message) {
        toast.error(result.message);
      }
    });
  }
}

function doRecover(anime: Anime) {
  if (confirm(`${anime.subject}을(를) 복원하시겠습니까?\n임의조작시 권한박탈의 사유가됩니다.`)) {
    animeRemote.recoverAdminAnime(anime.agendaNo).then(result => {
      if (result.code == 'ok') {
        router.push(`/admin/anime?animeNo=${result.data}`);
      } else if (result.message) {
        toast.error(result.message);
      }
    });
  }
}

function doSave() {
  const ani = (anime.value!!).applyEdit();
  const isNew = ani.animeNo == 0;
  if (confirm(`${ani.subject}을(를) ${isNew ? '추가' : '수정'} 하시겠습니까?\n임의조작시 권한박탈의 사유가됩니다.`)) {

    if (!anissia.checkAnimeDate(ani.editStartDateType, ani.startDate)) {
      toast.error('시작일을 입력해주세요.');
      return;
    }
    if (!anissia.checkAnimeDate(ani.editEndDateType, ani.endDate)) {
      toast.error('종료일을 입력해주세요.');
      return;
    }

    if (isNew) {
      animeRemote.addAdminAnime(ani).then(result => {
        if (result.code == 'ok') {
          router.push(`/admin/anime?animeNo=${result.data}`)
          toast.success('애니메이션이 추가되었습니다.');
        } else if (result.message) {
          toast.error(result.message);
        }
      });
    } else {
      animeRemote.updateAdminAnime(ani).then(result => {
        if (result.code == 'ok') {
          loadAnime(new Locate(), true);
          toast.success('애니메이션이 수정되었습니다.');
        } else if (result.message) {
          toast.error(result.message);
        }
      });
    }
  }
}

init();
clear(new Locate());
load();

onBeforeRouteUpdate((to, from, next) => {
  clear(new Locate(to.fullPath));
  load(new Locate(to.fullPath));
  next();
});

onUnmounted(() => {
  sl.destroy();
});
</script>
