<template>


  <section class="flex items-center min-h-[500px] h-[80vh]" :class="({'opacity-0': !show})">
    <div class="mx-auto">
      <div class="mb-6 text-2xl text-center font-semibold text-gray-900 dark:text-white">
        로그인
      </div>
      <div class="p-6 w-[90vw] max-w-[540px] min-w-[300px] as-box">
        <div class="space-y-4 md:space-y-6">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">계정</label>
            <input type="email" name="email" v-model="email" class="p-2.5 as-input-text" placeholder="user@example.com">
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">암호</label>
            <input type="password" name="password" v-model="password" @keyup.enter="doLogin" placeholder="••••••••" class="p-2.5 as-input-text">
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <label class="inline-flex relative cursor-pointer my-4">
                  <input type="checkbox" id="remember" class="sr-only peer" v-model="makeLoginToken">
                  <div class="w-[38px] h-[20px] mt-[1px] outline-none rounded-full peer bg-gray-200 dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500 dark:peer-checked:bg-blue-800"></div>
                  <span class="ml-3 text-sm font-medium text-gray-500 dark:text-zinc-300">자동로그인</span>
                </label>
              </div>
            </div>
            <span>
              <router-link to="/recover" class="text-sm font-medium text-blue-600 hover:underline dark:text-sky-400/70">암호분실</router-link>
            </span>
          </div>
          <button type="button" @click="doLogin" class="as-input-btn p-2.5 w-full">로그인</button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            아직 계정이 없으신가요? <router-link to="/register" class="font-medium text-blue-600 hover:underline dark:text-sky-400/70">회원가입</router-link>
          </p>
        </div>
      </div>
    </div>

  </section>

</template>

<script setup lang="ts">
import {ref} from "vue";
import sessionService from "../../domain/session/remote/sessionService";
import {Locate} from "../../common/Locate";
import {useRouter} from "vue-router";
import {sessionStore} from "../../domain/session/sessionStore";

const email = ref('');
const password = ref('');
const makeLoginToken = ref(false);
const router = useRouter();
const path = new Locate().getParameter('path', '');
const show = ref(path == '');
const session = sessionStore();

function doLogin() {
  sessionService.login(email.value, password.value, makeLoginToken.value).then(success => {
      if (success) {
          router.push(path && path.startsWith('/') ? path : '/');
      }
  });
}

if (!show.value) {
  setTimeout(() => show.value = true, 200);
}


</script>
