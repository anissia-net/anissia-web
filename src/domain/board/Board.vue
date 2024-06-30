<template>

  <div>

    <!-- view -->
    <div v-if="topicNo > 0">

      <div v-if="view && view.topicNo != 0">
        <div v-for="node in view.posts" :key="node.postNo" class="mt-3">
          <div v-if="node.isEditMode">
            <PostEditor :ticker="props.ticker" :placeholder="boardInfo.phTopic" :post="node" :reload="loadViewForce" />
          </div>
          <div v-else>
            <div v-if="node.root" class="text-2xl">{{node.topic}}</div>
            <div class="flex pt-2 pb-2 px-3 mt-5 as-box text-sm">
              <div class="flex-1"><i class="fa-solid fa-user mr-1.5"></i> {{node.name}}</div>
              <div class="ml-4">
                <span class="opacity-[70%]">{{node.regDtText}}</span>
                <i v-if="node.canEdit(user)" @click="node.isEditMode = true" class="fa-solid fa-pen-to-square ml-3 cursor-pointer hover:text-red-500"></i>
                <i v-if="node.canDelete(user)" @click="doDelete(node)" class="fa-solid fa-trash ml-3 cursor-pointer hover:text-red-500"></i>
              </div>
            </div>
            <div v-html="node.contentHtml" class="md-view as-a-color px-3 pt-5 pb-16"></div>
          </div>
        </div>
        <div v-if="boardInfo.canWritePost(user)">
          <PostEditor :ticker="props.ticker" :post="newPost" :reload="loadViewForce" />
        </div>
      </div>
      <div v-else-if="loaded" class="text-center text-3xl py-32">
        존재하지 않거나 삭제된 글입니다.
      </div>


    </div>

    <!-- new -->
    <div v-else-if="topicNo == 0">
      <PostEditor :ticker="props.ticker" :post="newTopic" :placeholder="boardInfo.phTopic" :reload="loadViewForce" />
    </div>


    <div v-if="boardInfo.canWriteTopic(user)" class="text-right mb-5">
      <router-link to="?topicNo=0" class="as-input-btn p-1.5">글쓰기</router-link>
    </div>

    <div class="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="(node, i) in list.content" class="p-4 as-box">
        <div class="text-gray-700 dark:text-gray-200">
          <router-link :to="`?topicNo=${node.topicNo}`">
            <span class="text-md font-bold opacity-90">
              {{node.topic}}
            </span>
          </router-link>
        </div>
        <div class="pt-3 text-sm">
          <span class="mb-1"><i class="fa-solid fa-user mr-1"></i> {{node.name}}</span>
          <span class="mb-1 ml-4"><i class="fa-solid fa-comments mr-1"></i> {{node.postCount}}</span>
          <span class="mb-1 ml-4"><i class="fa-solid fa-calendar mr-1"></i> {{node.regDtText}}</span>
        </div>
      </div>
    </div>

  </div>

</template>

<script setup lang="ts">
import {computed, nextTick, onMounted, onUnmounted, Ref, ref} from "vue";
import PageData from "../../common/PageData";
import {onBeforeRouteUpdate, useRouter} from "vue-router";
import { ScrollLoader } from "raon";
import {sessionStore} from "../session/sessionStore";
import {Locate} from "raon";
import boardRemote from "./remote/boardRemote";
import {BoardInfo} from "./BoardInfo";
import {Topic} from "./Topic";
import {Post} from "./Post";
import PostEditor from "./PostEditor.vue";
import toast from "../../common/toast";

const props = defineProps({
  ticker: String
});

const boardInfo = ref(new BoardInfo());
const topicNo = ref(0);
const list = ref(PageData.empty()) as Ref<PageData<Topic>>;
const view = ref(null) as Ref<Topic|null>;
const page = ref(0);
const router = useRouter();
const session = sessionStore();
const user = computed(() => session.user);

const sl = new ScrollLoader().onNeedNextPage(() => {
  page.value++;
  loadList();
});

const newTopic = ref(Post.getNewTopic());
const newPost = ref(Post.getNewPost(new Topic())) as Ref<Post>;

const loaded = ref(false);

let lastTopicNo = -1;

function init() {
  boardRemote.getTicker(props.ticker!!).then(e => boardInfo.value = e);
}

function clear() {
  lastTopicNo = -1;
  page.value = 0;
}

function load(locate: Locate = new Locate()) {
  loadView(locate);
  loadList();
}

function loadViewForce() {
  lastTopicNo = -1;
  loadView();
}

function loadView(locate: Locate = new Locate()) {
  const no = topicNo.value = locate.getIntParameter('topicNo', -1);
  if (no > 0) {
    if (lastTopicNo != no) {
      lastTopicNo = no;
      boardRemote.getTopic(props.ticker!!, no).then(node => {
        view.value = node;
        newPost.value = Post.getNewPost(node);
        loaded.value = true
      });
    } else {
      view.value = view.value;
    }
  } else if (no == 0) {
    if (!boardInfo.value.canWriteTopic(user.value)) {
      router.push(locate.path);
      return;
    }
    lastTopicNo = -1;
    view.value = null;
  } else {
    lastTopicNo = -1;
    view.value = null;
  }
}

function loadList() {
  const isFirstPage = page.value == 0;

  boardRemote.getList(props.ticker!!, page.value).then(pageData => {
      if (isFirstPage) {
        list.value = pageData;
      } else {
        list.value = list.value.merge(pageData);
      }
      nextTick(() => sl.watch(pageData.next))
  });
}

function doDelete(post: Post) {
  if (!confirm('글을 삭제하시겠습니까?')) {
    return;
  }
  if (post.root) {
    boardRemote.deleteTopic(post.topicNo).then(result => {
      if (result.success) {
        router.push(location.pathname);
      } else {
        toast.error(result.messageNotNull);
      }
    });
  } else {
    boardRemote.deletePost(post.postNo).then(result => {
      if (result.success) {
        loadViewForce();
      } else {
        toast.error(result.messageNotNull);
      }
    });
  }
}

function onKeyup(event: KeyboardEvent) {
    const post = view?.value?.posts?.[0];
    switch (event.key) {
        case 'e':
        {
            if (post && post.canEdit(user.value) && !post.isEditMode && ['TEXTAREA', 'INPUT'].indexOf(event.target?.['tagName']) == -1) {
                post.isEditMode = true;
                window.scrollTo(0, 0);
            }
        }
    }
}

init();
load();

onBeforeRouteUpdate((to, from, next) => {
  clear();
  load(new Locate(to.fullPath));
  next();
});

onUnmounted(() => {
  sl.destroy();
  document.removeEventListener('keyup', onKeyup, true);
});

onMounted(() => {
    document.addEventListener('keyup', onKeyup, true);
});
</script>

<style>

</style>