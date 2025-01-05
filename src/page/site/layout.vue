<template>

  <div class="bg-white dark:bg-black min-h-screen text-zinc-800 dark:text-zinc-400 pb-10 box-border duration-300">

    <!-- 헤더 -->
    <header class="sticky top-0 z-30 w-full backdrop-blur transition-colors border-b border-slate-900/10 dark:border-zinc-900 bg-white/80 dark:bg-[#050505]/80 flex">
      <div class="container m-auto flex justify-between items-center duration-300">
        <router-link to="/" class="block font-bold text-lg px-4 py-2.5">ANISSIA</router-link>
        <div class="text-sm leading-6 font-semibold text-neutral-700 dark:text-gray-400 flex justify-end items-center">
          <router-link to="/schedule" class="hidden md:inline hover:text-sky-700 dark:hover:text-gray-200 px-4 py-2.5">
            <i class="fa-regular fa-calendar mr-1.5"></i> 편성표
          </router-link>
          <router-link to="/anime" class="hidden md:inline hover:text-sky-700 dark:hover:text-gray-200 px-4 py-2.5">
            <i class="fa-solid fa-film mr-1.5"></i> 애니
          </router-link>
          <router-link to="/inquiry" class="hidden md:inline hover:text-sky-700 dark:hover:text-gray-200 px-4 py-2.5">
            <i class="fa-regular fa-comments mr-1.5"></i> 질문답변
          </router-link>
          <router-link v-if="user.isAdmin && !url('/admin')" to="/admin" class="text-lg hover:text-sky-700 dark:hover:text-gray-200 px-4 py-2.5">
            <i class="fa-solid fa-sliders"></i>
          </router-link>
          <button class="text-lg hover:text-sky-700 dark:hover:text-gray-200 px-4 py-2.5 " @click="toggleTheme()">
            <span class="dark:hidden">
              <i class="fa-solid fa-sun"></i>
            </span>
            <span class="hidden dark:inline">
              <i class="fa-solid fa-moon"></i>
            </span>
          </button>
          <button class="text-lg hover:text-sky-700 dark:hover:text-gray-200 px-4 py-2.5" @click="onHeaderMenu = true">
            <i v-if="user.isLogin" class="fa-solid fa-user"></i>
            <i v-else class="fa-regular fa-user"></i>
          </button>
        </div>
      </div>
    </header>

    <div class="pop-close z-40 fixed h-screen w-screen top-0 left-0 bg-gray-800/10" :class="({'hidden': !onHeaderMenu})" @click="doCloseHeaderMenu">
      <div class="container m-auto flex justify-end">
        <div class="pop-not-close mt-12 mr-1.5 bg-zinc-50/90 backdrop-blur-sm rounded-md shadow-lg p-6 text-base font-semibold text-zinc-700 dark:bg-zinc-900/90 dark:text-gray-400 dark:highlight-white/5">
          <div class="mr-2">
            <ul class="space-y-6 mt-1">
              <li v-if="!user.isLogin"><router-link to="/login" class="pop-close hover:opacity-80"><i class="fa-solid fa-right-to-bracket mr-2.5"></i> 로그인</router-link></li>
              <li v-if="user.isLogin"><router-link to="/account" class="pop-close hover:opacity-80"><i class="fa-regular fa-address-card mr-2.5"></i> 회원정보</router-link></li>
              <li v-if="user.isLogin"><span @click="logout" class="pop-close hover:opacity-80 cursor-pointer"><i class="fa-solid fa-right-from-bracket mr-2.5"></i> 로그아웃</span></li>
              <li><router-link to="/schedule" class="pop-close hover:opacity-80"><i class="fa-regular fa-calendar mr-2.5"></i> 애니 편성표</router-link></li>
              <li><router-link to="/anime" class="pop-close hover:opacity-80"><i class="fa-solid fa-film mr-2.5"></i> 애니정보</router-link></li>
              <li><router-link to="/translator/apply" class="pop-close hover:opacity-80"><i class="fa-solid fa-signature mr-2.5"></i> 자막제작자 신청</router-link></li>
              <li><router-link to="/introduce" class="pop-close hover:opacity-80"><i class="fa-regular fa-star mr-2.5"></i> 애니시아 소개</router-link></li>
              <li><router-link to="/notice" class="pop-close hover:opacity-80"><i class="fa-regular fa-flag mr-2.5"></i> 공지사항</router-link></li>
              <li><router-link to="/inquiry" class="pop-close hover:opacity-80"><i class="fa-regular fa-comments mr-2.5"></i> 질문답변</router-link></li>
            </ul>
          </div>

        </div>

      </div>
    </div>

    <router-view/>

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
          <br/>빠르게 정상화 하도록 하겠습니다.
          <br/>문의 : auth@anissia.net
        </div>
      </div>
    </div>
  </div>



</template>

<script setup lang="ts">

import {computed, onUnmounted, ref} from "vue";
import theme from "../../common/theme";
import anissia from "../../common/anissia";
import {sessionStore} from "../../domain/session/sessionStore";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import sessionService from "../../domain/session/remote/sessionService";
import '../../common/md.pcss';
import image_error from "./layout/image_error.svg";
import image_error_edit from "./layout/image_error_edit.svg";
import {ajaxStateStore} from "../../common/ajaxStateStore";


const router = useRouter();
const route = useRoute();
const session = sessionStore();

const ajaxState = ajaxStateStore();

const onHeaderMenu = ref(false)
const url = anissia.url;
const user = computed(() => session.user);

function logout() {
  sessionService.logout();
  sessionService.amendPathBySession(location.pathname, router);
}

function toggleTheme() {
  theme.toggle();

}
function isNotAdmin() {
  return !location.pathname.startsWith('/admin');
}

function imageLoadError(e: Event) {
  if (((e.target || {}) as HTMLElement).tagName == 'IMG') {
    const img = e.target as HTMLImageElement;
    if (!img.onerror) {
      img.src = img.closest('.anissia-md-edit') ? image_error_edit : image_error;
      img.title = '이미지를 찾을 수 없습니다.';
    }
  }
  return true;
}

function doCloseHeaderMenu(event: Event) {
  if (onHeaderMenu.value == true) {
    const closet = (event.target as HTMLElement).closest(".pop-close,.pop-not-close");
    if (closet?.matches('.pop-close')) {
      onHeaderMenu.value = false;
    }
  }
}

document.addEventListener('error', imageLoadError, true);

onBeforeRouteUpdate((to, from, next) => {
    sessionService.amendPathBySession(to.fullPath, router, next);
});

onUnmounted(() => {
  document.removeEventListener('error', imageLoadError, true);
});

</script>

<style lang="postcss">
.as-fa-spin {
  animation: fa-spin 4s infinite linear !important;
}
.layout-popup-zoom {
  @apply fixed top-0 left-0 right-0 bottom-0 z-[201]
  backdrop-blur-[4px] bg-[#fff]/5 dark:bg-[#000]/5
  pt-32 text-7xl text-center
  text-zinc-800 dark:text-zinc-400
}
</style>