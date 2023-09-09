<template>

  <div class="container m-auto px-4 pt-5 duration-300">

    <div v-if="anime" class="mt-3 mb-10">
      <div v-if="anime.animeNo != 0">
        <div class="font-bold text-xl">{{anime.subject}}</div>
        <div class="text-sm mt-1" lang="ja">{{anime.originalSubject}}</div>

        <table class="mt-6 text-sm text-left text-gray-800 dark:text-gray-100 border-t border-gray-200 dark:border-zinc-800">
          <tbody>
          <tr v-if="anime.period" class="border-b border-gray-200 dark:border-zinc-800">
            <th class="py-4 px-6 font-medium text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-900/50">방영기간</th>
            <td class="py-4 px-6 break-all">{{anime.period}}</td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-zinc-800">
            <th class="py-4 px-6 font-medium text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-900/50">방영상태</th>
            <td class="py-4 px-6 break-all">
              <span v-if="anime.status == 'ON' && anime.pureWeek"> 매주 ({{anime.weekText}}) {{anime.timeText}}</span>
              <span v-else-if="anime.status == 'ON' && !anime.pureWeek">{{anime.statusText}} ({{anime.weekText}})</span>
              <span v-else>{{anime.statusText}}</span>
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-zinc-800">
            <th class="py-4 px-6 font-medium text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-900/50">장르</th>
            <td class="pt-0 pb-2 px-6">
              <span class="rounded-md inline-block mb-0 ml-0 mt-2 mr-2 px-[8px] py-[5px] border border-zinc-300 dark:bg-zinc-900/50 dark:border-zinc-800 shadow-sm" v-for="tag in anime.genres.split(/,/g)" :key="tag"><router-link :to="`/anime?q=%23${encodeURIComponent(tag)}`">{{tag}}</router-link></span>
            </td>
          </tr>
          <tr v-if="anime.website" class="border-b border-gray-200 dark:border-zinc-800">
            <th class="py-4 px-6 font-medium text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-900/50">웹사이트</th>
            <td class="py-4 px-6 break-all"><a :href="anime.website" target="_blank">{{anime.website}}</a></td>
          </tr>
          <tr v-if="anime.twitter" class="border-b border-gray-200 dark:border-zinc-800">
            <th class="py-4 px-6 font-medium text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-900/50">X</th>
            <td class="py-4 px-6 break-all"><a :href="anime.twitter" target="_blank">{{anime.twitter}}</a></td>
          </tr>
          </tbody>
        </table>

        <div v-if="anime.captions.length" class="mt-6">
          <div class="text-md font-bold">자막정보</div>
          <table class="mt-3 text-sm text-left text-gray-800 dark:text-gray-100">
            <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr class="dark:text-gray-400 border-b border-gray-200 dark:border-zinc-800">
              <th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-zinc-900/50">자막</th>
              <th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-zinc-900/50">제작자</th>
              <th scope="col" class="py-3 px-6 bg-gray-50 dark:bg-zinc-900/50">날짜</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="caption in anime.captions" :key="caption.name" class="border-b border-gray-200 dark:border-zinc-800">
              <td class="py-4 px-6">
                <span v-if="caption.website"><a :href="caption.website" target="_blank" >{{caption.episodeText}}</a></span>
                <span v-else>준비중</span>
              </td>
              <td class="py-4 px-6"><router-link :to="`/anime?q=%40${encodeURIComponent(caption.name)}`">{{caption.name}}</router-link></td>
              <td class="py-4 px-6">{{caption.updDtText}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else>
        <div class="text-xl text-center my-32">
          존재하지 않거나 삭제된 애니메이션 입니다.
        </div>
      </div>

    </div>

    <div class="flex-col justify-center relative text-gray-500">

      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-zinc-300">Search</label>
      <div class="relative">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <input type="text" id="default-search" autocomplete="off" class="p-3 pl-9 as-input-text" placeholder="애니검색 #장르 @제작자 /완결 /도움말"  v-model="query" @click="autocorrectOn = true" @keydown="keyAutocorrect" @keyup="loadAutocorrect">
        <button type="button" @click="searchAnime()" class="as-input-btn absolute px-4 py-1.5 right-2 bottom-1.5">검색</button>
      </div>

      <div v-if="searchHelpOn" class="as-a-color px-2 py-4">
        <div class="font-bold pt-4">
          <span @click="searchHelpOn = false" class="float-right cursor-pointer"><i class="fa-solid fa-x"></i> 닫기</span>
          <router-link to="/notice?topicNo=141"><i class="fa-solid fa-circle-question mr-1"></i> 애니메이션 검색 도움말</router-link>
        </div>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          <div>
            <div class="pt-5 opacity-80 text-sm"><i class="fa-solid fa-list"></i> 키워드 검색 (AND 조건)</div>
            <div class="pl-0">
              <div class="pt-3 font-bold"><i class="fa-solid fa-magnifying-glass mr-1"></i> 비밥 카우</div>
              <div class="pt-2 text-sm">
                단어중 "비밥" "카우" 포함시 검색됩니다.<br/>
                검색결과) 카우보이비밥
              </div>
            </div>
          </div>

          <div>
            <div class="pt-5 opacity-80 text-sm"><i class="fa-solid fa-list"></i> 띄어쓰기</div>
            <div class="pl-0">
              <div class="pt-3 font-bold"><i class="fa-solid fa-magnifying-glass mr-1"></i> 체인소 맨</div>
              <div class="pt-2 text-sm">
                단어중 "체인소" "맨" 포함시 검색됩니다.<br/>
                검색결과) 체인소 맨
              </div>
            </div>
          </div>

          <div>
            <div class="pt-5 opacity-80 text-sm"><i class="fa-solid fa-list"></i> 형태소</div>
            <div class="pl-0">
              <div class="pt-3 font-bold"><i class="fa-solid fa-magnifying-glass mr-1"></i> 체인소맨</div>
              <div class="pt-2 text-sm">
                단어중 "체인소맨"이 포함시 검색됩니다.<br/>
                형태소 분석기가 "체인소맨"을 "체인소 맨"으로 분해하지 못할 경우 "체인소 맨"이 검색되지 않습니다.<br/>
                쉽게 말해서 띄어쓰기를 최대한 하여 검색하는 것을 추천합니다.
              </div>
            </div>
          </div>


          <div>
            <div class="pt-5 opacity-80 text-sm"><i class="fa-solid fa-list"></i> 장르검색 (AND 조건)</div>
            <div class="pl-0">
              <div class="pt-3 font-bold"><i class="fa-solid fa-magnifying-glass mr-1"></i> #판타지 #모험</div>
              <div class="pt-2 text-sm">판타지이면서 동시에 모험인 장르를 검색합니다.</div>
            </div>
          </div>

          <div>
            <div class="pt-5 opacity-80 text-sm"><i class="fa-solid fa-list"></i> 자막제작자 검색 (OR 조건)</div>
            <div class="pl-0">
              <div class="pt-3 font-bold"><i class="fa-solid fa-magnifying-glass mr-1"></i> @철수 @영희</div>
              <div class="pt-2 text-sm">자막제작자가 철수이거나 영희인 경우 모두를 검색합니다.</div>
            </div>
          </div>

          <div>
            <div class="pt-5 opacity-80 text-sm"><i class="fa-solid fa-list"></i> 완결 작품만 검색 (최신순)</div>
            <div class="pl-0">
              <div class="pt-3 font-bold"><i class="fa-solid fa-magnifying-glass mr-1"></i> /완결</div>
              <div class="pt-2 text-sm">
                완결된 작품만 검색됩니다.<br/>
                자동으로 최신순으로 정렬됩니다.
              </div>
            </div>
          </div>

        </div>
      </div>

      <div v-if="autocorrectOn && autocorrect.length">
        <ul class="autocorrect-list bg-white text-sky-600 dark:bg-zinc-900 dark:text-sky-300 mt-2 py-1 rounded-md border border-gray-300 dark:border-zinc-800 font-light">
          <li v-for="(node, i) in autocorrect" :class="autocorrectIndex != i ? 'grayscale-[100%]' : ''" class=" pl-8 pr-2 py-1 relative cursor-pointer" @mouseover="autocorrectIndex = i">
            <router-link :to="`/anime?animeNo=${node.key}`" class="block">
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
              <router-link :to="toAnimeViewUrl(node.animeNo)">
                <div class="text-md font-bold text-gray-800 dark:text-zinc-300">{{node.subject}}</div>
                <div class="text-sm mt-1" lang="ja" v-if="node.originalSubject">{{node.originalSubject}}</div>
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

const list = ref(PageData.empty().notLoaded()) as Ref<PageData<Anime>>;
const anime = ref(null) as Ref<Anime|null>;
let lastAnimeNo = -1;
const page = ref(0);
const query = ref<string>(new Locate().getParameter('q', '') as string);
const autocorrect = ref([]) as Ref<AnimeAutocorrect[]>;
const autocorrectOn = ref(false);
const searchHelpOn = ref(false);
const autocorrectIndex = ref(-1);
let autocorrectQuery = '';
const router = useRouter();

const sl = new ScrollLoader().onNeedNextPage(() => {
  page.value++;
  loadList();
});

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

function loadAnime(locate: Locate) {
  const animeNo = locate.getIntParameter('animeNo', -1);
  if (animeNo > 0) {
    if (lastAnimeNo != animeNo) {
      lastAnimeNo = animeNo;
      animeRemote.getAnime(animeNo).then(node => anime.value = node);
    }
  } else {
    lastAnimeNo = -1;
    anime.value = null;
  }
}

function loadList() {
  const isFirstPage = page.value == 0;

  animeRemote.getAnimeList(page.value, query.value).then(pageData => {
    if (isFirstPage) {
      list.value = pageData;
    } else {
      list.value = list.value.merge(pageData);
    }
    nextTick(() => sl.watch(pageData.next))
  });
}

function searchAnime() {
  page.value = 0;
  autocorrectOn.value = false;
  const q = query.value;
  if (q.indexOf('/도움말') != -1) {
    searchHelpOn.value = true;
    query.value = query.value.split('/도움말').join('').trim();
    return;
  }
  searchHelpOn.value = false;
  router.push(`/anime?q=${encodeURIComponent(q)}`);
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
        router.push(`/anime?animeNo=${autocorrect.value[autocorrectIndex.value].key}`)
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

load();

onBeforeRouteUpdate((to, from, next) => {
  load(new Locate(to.fullPath));
  next();
});

onUnmounted(() => {
  sl.destroy();
});
</script>
