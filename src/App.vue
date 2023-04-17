<template>
  <router-view/>
</template>

<script setup lang="ts">
import theme from "./common/theme";
import sessionService from "./domain/session/remote/sessionService";
import {onBeforeMount} from "vue";
import {useRoute, useRouter} from "vue-router";
import {sessionStore} from "./domain/session/sessionStore";

const router = useRouter();
const session = sessionStore();

theme.apply()

function sync() {
    sessionService.sync().then(e => sessionService.amendPathBySession(location.pathname, router));
}

onBeforeMount(() => {
  setInterval(() => { sync(); }, 60000);
  sync();
});
</script>
