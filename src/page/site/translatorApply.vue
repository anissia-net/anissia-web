<template>

  <div class="container m-auto px-4 pt-5 duration-300">
    <div v-if="view" class="mb-12">
      <div v-if="view.applyNo > 0">
        <div class="text-2xl">자막 제작자 심사</div>

        <table class="mt-6 text-sm text-left text-gray-800 dark:text-gray-100 border-t border-gray-200 dark:border-zinc-800">
          <tbody>
          <tr class="border-b border-gray-200 dark:border-zinc-800">
            <th class="py-4 px-6 font-medium text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-900/50">신청일자</th>
            <td class="py-4 px-6 break-all">{{view.regDtFullText}}</td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-zinc-800">
            <th class="py-4 px-6 font-medium text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-900/50">심사번호</th>
            <td class="py-4 px-6 break-all">{{view.applyNo}}</td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-zinc-800">
            <th class="py-4 px-6 font-medium text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-900/50">상태</th>
            <td class="py-4 px-6 break-all">{{view.resultText}}</td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-zinc-800">
            <th class="py-4 px-6 font-medium text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-900/50">신청인</th>
            <td class="py-4 px-6 break-all">{{view.name}}</td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-zinc-800">
            <th class="py-4 px-6 font-medium text-gray-900 bg-gray-50 dark:text-white dark:bg-zinc-900/50">블로그주소</th>
            <td class="py-4 px-6 break-all">
              <a v-if="view.website.startsWith('http')" :href="view.website" target="_blank">{{view.website}}</a>
              <span v-else>-</span>
            </td>
          </tr>
          </tbody>
        </table>

        <div class="mt-6 mb-2 text-2xl">심사이력</div>
        <div v-if="view.result == 'ACT' && user.isLogin && (user.isAdmin || user.name == view.name)" class="mt-3">
          <div v-if="user.isAdmin" class="flex items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md dark:bg-zinc-900 dark:border-zinc-800 dark:placeholder-gray-400 dark:text-white ">
            <div title="수리" @click="point = '1'" class="w-[36px] h-[40px] leading-[38px] text-center cursor-pointer opacity-40 grayscale-[70%] text-green-600 rounded-l-md" :class="point == '1' ? '!opacity-100 !grayscale-0' : ''"><i class="fa-solid fa-circle-check"></i></div>
            <div title="반려" @click="point = '-1'" class="w-[36px] h-[40px] leading-[38px] text-center cursor-pointer opacity-40 grayscale-[70%] text-red-600" :class="point == '-1' ? '!opacity-100 !grayscale-0' : ''"><i class="fa-solid fa-circle-xmark"></i></div>
            <div title="의견" @click="point = '0'" class="w-[36px] h-[40px] leading-[38px] text-center cursor-pointer opacity-40 grayscale-[70%] text-purple-500" :class="point == '0' ? '!opacity-100 !grayscale-0' : ''"><i class="fa-solid fa-comments"></i></div>
            <div class="flex-1">
              <input type="text" v-model="comment" @keyup.enter="doComment" name="comment" placeholder="의견" class="shadow-sm outline-none block w-full p-2.5 bg-gray-50 border-none text-gray-900 sm:text-sm rounded-md dark:bg-zinc-900 dark:placeholder-gray-400 dark:text-white">
            </div>
          </div>
          <div v-else>
            <input type="text" v-model="comment" @keyup.enter="doComment" name="comment" placeholder="의견" class="shadow-sm outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md block w-full p-2.5 dark:bg-zinc-900 dark:border-zinc-800 dark:placeholder-gray-400 dark:text-white">
          </div>
        </div>
        <div class="py-3 px-1 text-sm leading-[1.8] border-b border-gray-300 dark:border-zinc-800">
          <div class="float-right pl-4 inline-block opacity-60">{{view.regDtText}}</div>
          <div><span class="text-red-600 dark:text-yellow-400">자막 제작자 신청을 제출하였습니다.</span></div>
        </div>
        <div v-for="node in view.polls" :key="node.no" class="py-3 px-1 text-sm leading-[1.8] border-b border-gray-300 dark:border-zinc-800">
          <div class="float-right pl-4 inline-block opacity-60">{{node.regDtText}}</div>
          <div v-if="node.name">
            <span class="mr-2">
              <i v-if="node.vote > 0" class="fa-solid fa-circle-check text-green-700/80"></i>
              <i v-if="node.vote == 0" class="fa-solid fa-comments text-purple-500/60"></i>
              <i v-if="node.vote < 0" class="fa-solid fa-circle-xmark text-red-700/80"></i>
            </span>
            <span class="mr-4 text-blue-600 dark:text-sky-500 font-bold">{{node.name}}</span>
            <span>{{node.comment}}</span>
          </div>
          <div v-else>
            <span class="text-red-600 dark:text-yellow-400">{{node.comment}}</span>
          </div>
        </div>

      </div>

      <div v-else-if="applyNo == 0">
        <div class="text-2xl">자막 제작자 신청</div>
        <h2 class="mt-4 mb-2 text-lg font-semibold text-gray-900 dark:text-white">자막제작자 신청 동의사항</h2>
        <ul class="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-400">
          <li>권한신청을 위해서 4편이상(동일작품)의 자막 작업물이 있어야 합니다.</li>
          <li>블로그 내에 불법영상이나 불건전한 정보가 있을 경우 거부될 수 있습니다.</li>
          <li>권한 부여 후에도 위와 같은 사항이 발견되면 고지 없이 권한이 회수될 수 있습니다.</li>
          <li>자막 도용시 추후에 적발되더라도 권한이 회수될 수 있습니다.</li>
        </ul>

        <label class="inline-flex relative cursor-pointer my-6 leading-[1]">
          <input type="checkbox" v-model="agree" name="agree" class="sr-only peer">
          <div class="w-[38px] h-[20px] mt-[6px] outline-none rounded-full peer bg-gray-200 dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[8px] after:left-[3px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500 dark:peer-checked:bg-blue-800"></div>
          <span class="ml-3 text-lg font-medium text-gray-900 dark:text-zinc-300">위 사항을 읽고 확인하였습니다.</span>
        </label>

        <div class="text-xl">
          블로그 주소
          <span class="ml-1 text-sm opacity-50">4편 이상의 작업물 필요</span>
        </div>
        <div class="mt-3">
          <input type="text" v-model="website" name="website" placeholder="https://example-blog.com" class="p-2.5 as-input-text">
        </div>
        <div class="mt-1 text-md opacity-80">※ 추가 내용은 신청 완료 후 심사과정에서 작성 가능합니다.</div>
        <div class="mt-4">
          <input type="button" value="신청하기" @click="doApply()" class="text-white bg-rose-700 hover:bg-rose-800 outline-none font-medium rounded-md text-sm px-4 py-2 dark:bg-red-800 dark:hover:bg-red-700" />
        </div>
      </div>

    </div>

    <div v-if="user.isLogin && (!view || view.applyNo != 0)" class="text-right mb-5">
      <router-link to="/translator/apply?applyNo=0" class="as-input-btn p-1.5">자막제작자 신청</router-link>
    </div>

    <div class="mt-3 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <div v-for="(node, i) in list.content" class="px-4 py-2 as-box">
        <div class="flex items-center">
          <div class="w-[54px] pl-1 text-[30px] dark:grayscale-[40%]">
            <i v-if="node.result == 'ACT'" class="fa-solid fa-circle-play text-yellow-500/80"></i>
            <i v-if="node.result == 'PASS'" class="fa-solid fa-circle-check text-green-700/80"></i>
            <i v-if="node.result == 'FAIL'" class="fa-solid fa-circle-xmark text-gray-700/80"></i>
          </div>
          <div class="flex-1 break-all">
            <div class="text-xs">#{{node.applyNo}}</div>
            <div class="mt-[1px] mb-[2px] text-blue-600 dark:text-sky-500">
              <router-link :to="`/translator/apply?applyNo=${node.applyNo}`">
                {{node.name}}
              </router-link>
            </div>
            <div class="opacity-80 text-xs">{{node.regDtText}}</div>
          </div>
        </div>
      </div>
    </div>


  </div>

</template>

<script setup lang="ts">
import {computed, nextTick, onUnmounted, Ref, ref} from "vue";
import PageData from "../../common/PageData";
import {onBeforeRouteUpdate, useRouter} from "vue-router";
import { ScrollLoader } from "raon";
import {TranslatorApply} from "../../domain/translator/TranslatorApply";
import {Locate} from "raon";
import translatorRemote from "../../domain/translator/remote/translatorRemote";
import {sessionStore} from "../../domain/session/sessionStore";
import Session from "../../domain/session/Session";
import toast from "../../common/toast";

const session = sessionStore();
const user = computed(() => session.user) as Ref<Session>;
const list = ref(PageData.empty()) as Ref<PageData<TranslatorApply>>;
const view = ref(null) as Ref<TranslatorApply|null>;
const page = ref(0);
const router = useRouter();

const sl = new ScrollLoader().onNeedNextPage(() => {
  page.value++;
  loadList();
});

const agree = ref(false);
const website = ref('');
const point = ref('0');
const comment = ref('');
const applyNo = ref(-1);

let lastAgendaNo = -1;

function clear() {
  lastAgendaNo = -1;
  page.value = 0;
  agree.value = false;
  website.value = '';
  point.value = '0';
}

function load(locate: Locate = new Locate()) {
  loadView(locate);
  loadList();
}

function loadView(locate: Locate = new Locate()) {
  const no = applyNo.value = locate.getIntParameter('applyNo', -1);
  if (no > 0) {
    if (lastAgendaNo != no) {
      lastAgendaNo = no;
      translatorRemote.getApply(no).then(node => view.value = node);
    } else {
      view.value = view.value;
    }
  } else if (no == 0) {
    if (!user.value.isLogin) {
      router.push('/translator/apply');
      return;
    }
    lastAgendaNo = -1;
    view.value = new TranslatorApply();
  } else {
    lastAgendaNo = -1;
    view.value = null;
  }
}

function loadList() {
  const isFirstPage = page.value == 0;

  translatorRemote.getApplyList(page.value).then(pageData => {
    if (isFirstPage) {
      list.value = pageData;
    } else {
      list.value = list.value.merge(pageData);
    }
    nextTick(() => sl.watch(pageData.next));
  });
}

function doApply() {
  if (!agree.value) {
    toast.error('자막제작자 신청 동의사항을 읽고 동의해주세요.');
    return;
  }
  translatorRemote.addApply(website.value).then(res => {
    if (res.code == 'ok') {
      router.push(`/translator/apply?applyNo=${res.data}`)
    } else {
      toast.error(res.message);
    }
  });
}

function doComment() {
  const node = view.value!!;
  translatorRemote.addApplyPoll(node.applyNo, point.value, comment.value).then(res => {
    comment.value = '';
    if (res.code == 'ok') {
      clear();
      load();
    } else {
      toast.error(res.message);
    }
  });
}

load();

onBeforeRouteUpdate((to, from, next) => {
  clear();
  load(new Locate(to.fullPath));
  next();
});

onUnmounted(() => {
  sl.destroy();
});

</script>

<style scoped>

</style>