<template>

 <div class="mt-2 min-h-[225px]">
   <div v-for="node in list" :key="node.topicNo" class="flex py-3 px-1 border-b border-gray-200 dark:border-zinc-800 text-sm">
     <div class="flex-1">
       <router-link :to="`/${props.ticker}?topicNo=${node.topicNo}`" class="block">
         {{node.topic}} <span v-if="node.postCount" class="opacity-70 text-xs">({{node.postCount}})</span>
       </router-link>
     </div>
     <div class="text-sm opacity-70">{{node.regDtText}}</div>
   </div>
 </div>


</template>

<script setup lang="ts">
import {RecentBoardData} from "./RecentBoardData";
import {computed, Ref} from "vue";
import {Topic} from "./Topic";

const props = defineProps({
  ticker: String,
  modelValue: RecentBoardData
});

const list = computed(() => (props.modelValue as any)[props.ticker!!]) as Ref<Topic[]>

</script>

<style>

</style>