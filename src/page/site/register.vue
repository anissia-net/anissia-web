<template>

  <section class="flex items-center min-h-[500px] h-[80vh]">
    <div class="mx-auto">

      <div class="mb-6 text-2xl text-center font-semibold text-gray-900 dark:text-white">
        회원가입
      </div>

      <div v-if="mode == 'none'"  class="p-6 w-[90vw] max-w-[540px] min-w-[300px] as-box">
        <div class="space-y-4 md:space-y-6">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">계정</label>
            <input type="email" v-model="email" name="email" class="p-2.5 as-input-text" placeholder="user@example.com">
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">암호</label>
            <input type="password" v-model="password" name="password1" placeholder="••••••••" class="p-2.5 as-input-text">
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">암호 확인</label>
            <input type="password" v-model="passwordConfirm" name="password2" placeholder="••••••••" class="p-2.5 as-input-text">
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">닉네임</label>
            <input type="text" v-model="nickname" name="name" class="p-2.5 as-input-text" placeholder="닉네임">
          </div>
          <button type="submit" @click="sendRegisterAuthMail" class="as-input-btn p-2.5 w-full">회원가입</button>
        </div>
      </div>

      <div v-if="mode == 'needMailAuth'" class="py-12 w-[90vw] max-w-[540px] min-w-[300px] rounded-md shadow bg-white dark:bg-zinc-900/50 dark:border-zinc-800">
        <div class="space-y-8 md:space-y-10">
          <div><img class="w-[32%] m-auto mt-4" src="./recover/logo-pass.svg" /></div>
          <p class="text-lg font-light text-gray-500 dark:text-gray-400 text-center">
            인증메일이 전송되었습니다.
          </p>
        </div>
      </div>

      <div v-if="mode == 'pass'" class="py-12 w-[90vw] max-w-[540px] min-w-[300px] rounded-md shadow bg-white dark:bg-zinc-900/50 dark:border-zinc-800">
        <div class="space-y-8 md:space-y-10">
          <p class="text-xl font-bold text-gray-700 dark:text-gray-200 text-center">가입완료</p>
          <div><img class="w-[32%] m-auto" src="./recover/logo-pass.svg" /></div>
          <p class="text-lg font-light text-gray-500 dark:text-gray-400 text-center"><router-link to="/login" class="font-medium text-blue-600 hover:underline dark:text-sky-400/70">로그인</router-link> 페이지로 이동하여 로그인해주세요.</p>
        </div>
      </div>

      <div v-if="mode == 'wait'" class="py-12 w-[90vw] max-w-[540px] min-w-[300px] rounded-md shadow bg-white dark:bg-zinc-900/50 dark:border-zinc-800">
        <div class="space-y-8 md:space-y-10">
          <p class="text-xl font-bold text-gray-700 dark:text-gray-200 text-center">이메일 인증 확인중</p>
          <div><img class="w-[32%] m-auto animate-[spin_3s_linear_infinite]" src="./recover/logo-wait.svg" /></div>
          <p class="text-lg font-light text-gray-500 dark:text-gray-400 text-center">이메일 인증을 확인하는 중입니다...</p>
        </div>
      </div>

      <div v-if="mode == 'fail'" class="py-12 w-[90vw] max-w-[540px] min-w-[300px] rounded-md shadow bg-white dark:bg-zinc-900/50 dark:border-zinc-800">
        <div class="space-y-8 md:space-y-10">
          <p class="text-xl font-bold text-gray-700 dark:text-gray-200 text-center">이메일 인증에 실패하였습니다.</p>
          <div><img class="w-[32%] m-auto" src="./recover/logo-fail.svg" /></div>
          <p class="text-lg font-light text-gray-500 dark:text-gray-400 text-center">{{message || '이메일 인증이 만료되었습니다.'}}</p>
        </div>
      </div>

    </div>
  </section>



</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import accountRemote from "../../domain/account/remote/accountRemote";
import toast from "../../common/toast";

const mode = ref('none');
const token = ref('');
const message = ref('');

const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const nickname = ref('');

onMounted(() => {
  token.value = (useRoute().params.token || '') as string;
  if (token.value !== '') {
    mode.value = 'wait';
    validationRegister(token.value);
  }
});

function sendRegisterAuthMail() {
  accountRemote.sendRegisterAuthMail(email.value, password.value, passwordConfirm.value, nickname.value).then(res => {
    if (res.code == 'ok') {
      mode.value = 'needMailAuth';
    } else if (res.message) {
      toast.error(res.message);
    }
  });
}

function validationRegister(token: string) {
  accountRemote.validationRegister(token).then(res => {
    if (res.code == 'ok') {
      mode.value = 'pass';
    } else {
      mode.value = 'fail';
      if (res.message) {
        message.value = res.message;
      }
    }
  });
}

</script>
