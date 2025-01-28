<template>

  <div>

    <div v-if="isAdminMode">
      <div class="pt-2 pb-4">
        <input type="text" name="query" v-model="query" @keyup.enter="doQuery" autocomplete="off" placeholder="운영기록작성 /도움말" class="p-4 as-input-text">
      </div>

      <div v-if="openHelp" class="p-3 mt-1 mb-3 text-sm leading-[2] as-box">
        명령어 도움말<br/>
        <b>/권한반납 닉네임</b> - 자막제작자 권한을 반납합니다.
      </div>

      <div v-if="translatorApplyCount" class="py-3 px-1 text-sm leading-[1.8] border-b border-gray-300 dark:border-zinc-800">
        <router-link to="/translator/apply">현재 <b>{{translatorApplyCount}}</b> 건의 자막제작자 권한요청이 있습니다.</router-link>
      </div>
    </div>

    <div>
      <div v-for="(node, idx) in list.content" :key="node.apNo" class="py-3 px-1 text-sm break-all leading-[1.8] border-b border-gray-300 dark:border-zinc-800 anissia-home-reduce-10">
        <div class="float-right pl-4 inline-block opacity-60">{{node.regDtText}}</div>
        <div v-if="node.code == 'TEXT'" v-html="node.html" :class="({'opacity-50': !node.published})"></div>
        <div v-else-if="node.code == 'ANIME'">
          <div>
            <span v-html="node.html"></span>
            <span v-if="node.hasDetail && !node.openDetail"> - <b @click="node.openDetail = true" class="cursor-pointer ml-1">자세히</b></span>
          </div>
          <div v-if="node.openDetail">
            <table class="mt-3 text-sm text-left text-gray-800 dark:text-zinc-300">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#191919] dark:text-zinc-300">
              <tr>
                <th scope="col" class="py-3 px-6">속성</th>
                <th scope="col" class="py-3 px-6">기존</th>
                <th scope="col" class="py-3 px-6">변경</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in node.codeAnimeChangedList" :key="item.nm" class="bg-white border-b dark:bg-zinc-900/20 dark:border-zinc-900">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 break-all dark:text-white">{{item.nm}}</th>
                <td v-if="item.pv" class="py-4 px-6 break-all" :class="({'opacity-30': (item.pv == '-')})">{{item.pv}}</td>
                <td :colspan="item.pv ? 1 : 2" class="py-4 px-6 break-all">{{item.nv}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else-if="node.code == 'DEL'">
          <div>
            <span v-html="node.html"></span>
            <span v-if="!node.openDetail"> - <b @click="node.openDetail = true" class="cursor-pointer ml-1">자세히</b></span>
          </div>
          <div v-if="node.openDetail">
            <table class="mt-3 text-sm text-left text-gray-800 dark:text-zinc-300">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#191919] dark:text-zinc-300">
              <tr>
                <th scope="col" class="py-3 px-6">{{node.data2}}</th>
              </tr>
              </thead>
              <tbody>
              <tr class="bg-white border-b dark:bg-zinc-900/20 dark:border-zinc-900">
                <td class="py-4 px-6 whitespace-pre-wrap">{{node.data3}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else>
          {{node.code}} 는 지원하지 않는 활동 패널 코드입니다.
        </div>

      </div>
    </div>
  </div>



</template>

<script setup lang="ts">
import {nextTick, onUnmounted, Ref, ref} from "vue";
import { ScrollLoader } from "raon";
import activePanelRemote from "./remote/activePanelRemote";
import PageData from "../../common/PageData";
import ActivePanelListItem from "./ActivePanelListItem";
import translatorRemote from "../translator/remote/translatorRemote";
import toast from "../../common/toast";

const props = defineProps({
  // admin, public
  mode: String
});

const page = ref(0);
const sl = new ScrollLoader();
const list = ref(PageData.empty()) as Ref<PageData<ActivePanelListItem>>;
const query = ref('');
const openHelp = ref(false);
const translatorApplyCount = ref(0);
const isAdminMode = ref(false);

function loadTranslatorApplyCount() {
  translatorRemote.getAdminTranslatorApplyCount().then(count => translatorApplyCount.value = count);
}

function load() {
  const isFirstPage = page.value == 0;

  activePanelRemote.getList(page.value, props.mode!!).then(pageData => {
    if (isFirstPage) {
      list.value = pageData;
    } else {
      list.value = list.value.merge(pageData);
    }
    nextTick(() => sl.watch(pageData.next))
  });
}

function doQuery() {
  const line: string = query.value;
  query.value = '';

  if (line.trim() == '/도움말') {
    openHelp.value = true;
    return;
  } else if (!line) {
    return;
  }

  if (line.startsWith('/') || confirm('내용을 작성하시겠습니까?')) {
    activePanelRemote.doCommand(line).then(result => {
      if (result.code == 'ok') {
        page.value = 0;
        load();
      } else {
        toast.error(result.message);
      }
    });
  }
}

isAdminMode.value = props.mode == 'admin';
if (isAdminMode.value) {
  sl.onNeedNextPage(() => {
    page.value++;
    load();
  });
  loadTranslatorApplyCount();
}
load();

onUnmounted(() => {
  sl.destroy();
});

</script>

<style>

</style>
