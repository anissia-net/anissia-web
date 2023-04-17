<template>

  <section>
    <div class="text-3xl pt-20 leading-[2] text-center">
      이 페이지는 에러 예시 페이지 입니다.<br/>
      주소를 변경하여 메인으로 돌아가시기 바랍니다.
    </div>
  </section>

</template>

<script setup lang="ts">


import {ajaxStateStore} from "../common/ajaxStateStore.js";
import toast from "../common/toast.js";
import {onMounted} from "vue";

const ajaxState = ajaxStateStore();

toast.error('주소를 변경하여 메인으로 돌아가시기 바랍니다.');
toast.error('이 페이지는 에러 예시 페이지 입니다.');

onMounted(() => {
  for (let i = 0 ; i < 3 ; i++) {
    setTimeout(() => ajaxState.setError(), i * 500);
  }
});
</script>
