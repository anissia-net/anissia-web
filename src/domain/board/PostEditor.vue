<template>

  <div>
    <div v-if="post.root">
      <input type="text" v-model="topic" placeholder="주제" class="p-2.5 as-input-text">
    </div>
    <div class="min-h-[40px] mt-3 mb-1 editor-btn-box">
      <i act="h1" @click="tool" class="fa-solid fa-heading"></i>
      <i act="b" @click="tool" class="fa-solid fa-bold"></i>
      <i act="i" @click="tool" class="fa-solid fa-italic"></i>
      <i act="s" @click="tool" class="fa-solid fa-strikethrough"></i>
      <i act="hr" @click="tool" class="fa-solid fa-minus"></i>
      <i act="bq" @click="tool" class="fa-solid fa-quote-left"></i>
      <i act="ol" @click="tool" class="fa-solid fa-list-ol"></i>
      <i act="ul" @click="tool" class="fa-solid fa-list-ul"></i>
      <i act="table" @click="tool" class="fa-solid fa-table-cells-large"></i>
      <i act="link" @click="tool" class="fa-solid fa-link"></i>
      <i act="image" @click="tool" class="fa-regular fa-image"></i>
      <i act="code" @click="tool" class="fa-solid fa-code"></i>
      <i act="mode" @click="tool" class="fa-solid fa-table-columns"></i>
    </div>
    <div class="mb-3 overflow-auto">
      <div class="box-border" :class="({'w-[50%] pr-1 float-left': (mode == 'both'), 'hidden': (mode == 'view')})">
        <textarea ref="contentElement" v-model="content" @input="onInputContent" @keydown.tab="keydownTab" @keydown.enter="keydownEnter" :placeholder="placeholder || '내용'" class="p-2 as-input-text"></textarea>
      </div>
      <div class="box-border anissia-md-edit" :class="({'w-[50%] pl-1 float-right': (mode == 'both'), 'hidden': (mode == 'edit')})">
        <div class="md-view as-a-color p-2 as-box overflow-auto" ref="previewElement" v-html="contentHtml"></div>
      </div>
    </div>
    <div class="overflow-auto mb-8">
      <div class="float-left"><input v-if="!post.isNewPost" type="button" value="취소" @click="doCancel" class="as-input-btn p-1.5"/></div>
      <div class="float-right"><input type="button" value="작성완료" @click="doSave" class="as-input-btn p-1.5"/></div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {computed, nextTick, onMounted, onUpdated, Ref, ref} from "vue";
import {Post} from "./Post";
import {onBeforeRouteUpdate, useRouter} from "vue-router";
import md from "../../common/md";
import boardRemote from "./remote/boardRemote";
import TextAreaSelector from "../../common/TextAreaSelector";
import toast from "../../common/toast";

const props = defineProps({
  post: Post,
  ticker: String,
  placeholder: String,
  reload: Function
});

const post = computed(() => props.post) as Ref<Post>;
const topic = ref('');
const content = ref('');
const contentHtml = computed(() => md.render(content.value));
const contentElement = ref(document.createElement('textarea'));
const previewElement = ref(document.createElement('div'));
const router = useRouter();
const modeList = ['both', 'edit', 'view', 'both'];
const mode = ref('both');
const editorMinHeight = 200;

function doSave() {
  const p = post.value;
  if (p.root) {
    doSaveTopic(p);
  } else {
    doSavePost(p);
  }
}

function doSaveTopic(post: Post) {
  if (post.isNew) {
    boardRemote.createTopic(props.ticker!!, topic.value, content.value).then(result => {
      if (result.success) {
        router.push(`?topicNo=${result.data}`);
      } else {
        toast.error(result.messageNotNull);
      }
    });
  } else {
    boardRemote.updateTopic(post.topicNo, topic.value, content.value).then(result => {
      if (result.success) {
        post.topic = topic.value;
        post.content = content.value;
        post.isEditMode = false;
      } else {
        toast.error(result.messageNotNull);
      }
    });
  }
}

function onInputContent(event: Event) {
  const value = (event.target as any).value;
  if (content.value != value) {
    content.value = value;
  }
  resizeHeightSync();
}

function doSavePost(post: Post) {
  if (post.isNew) {
    boardRemote.createPost(post.topicNo, content.value).then(result => {
      if (result.success) {
        (props.reload!!)();
        content.value = '';
        resizeHeightSync();
      } else {
        toast.error(result.messageNotNull);
      }
    })
  } else {
    boardRemote.updatePost(post.postNo, content.value).then(result => {
      if (result.success) {
        post.content = content.value;
        post.isEditMode = false;
      } else {
        toast.error(result.messageNotNull);
      }
    });
  }
}

function doCancel() {
  if (post.value.isNewTopic) {
    router.push(location.pathname);
  } else {
    post.value.isEditMode = false;
  }
}

function keydownTab(event: KeyboardEvent) {
  md.tab(event);
  contentElement.value.dispatchEvent(new CustomEvent('input', {}));
}

function keydownEnter(event: KeyboardEvent) {
  md.enter(event);
  contentElement.value.dispatchEvent(new CustomEvent('input', {}));
}

function tool(event: MouseEvent) {
  const act = (event.target as HTMLElement).getAttribute('act');

  const ts = new TextAreaSelector(contentElement.value);
  switch ((event.target as HTMLElement).getAttribute('act')) {
    case 'h1': ts.apply(e => e.setCursor('\n# ', e.select || '헤드라인 1')); break;
    case 'b': ts.apply(e => e.setCursor('**', e.select || '강조', '**')); break;
    case 's': ts.apply(e => e.setCursor('~~', e.select || '취소선', '~~')); break;
    case 'i': ts.apply(e => e.setCursor('*', e.select || '기울임', '*')); break;
    case 'bq': ts.apply(e => e.setCursor('\n> ', e.select || '틀')); break;
    case 'ul': ts.apply(e => e.setCursor('\n- ', e.select || '목차')); break;
    case 'ol': ts.apply(e => e.setCursor('\n1. ', e.select || '순서목차')); break;
    case 'hr': ts.apply(e => e.setCursor('\n\n---\n')); break;
    case 'table': ts.apply(e => e.setCursor('\n\n|제목|제목|제목|\n|---|---|---|\n|내용|내용|내용|\n', '')); break;
    case 'image': ts.apply(e => e.setCursor('![링크](https://외부이미지주소예시.png)', null)); break;
    case 'link':
      ts.apply(e => {
        if ((/^https?:\/\//).test(e.select) || (/^([a-z\d\-]+\.)+[a-z\d]{2,}(\/|$)/i).test(e.select)) {
          e.setCursor('[링크](', null, ')');
        } else {
          e.setCursor('[', null, '](주소)');
        }
      });
      break;
    case 'code':
      ts.apply(e => e.setCursor('\n\n```\n', e.select, '\n```\n\n')); break;
      break;
    case 'mode':
      mode.value = modeList[modeList.indexOf(mode.value) + 1];
      resizeHeightSync();
      break;
  }
  contentElement.value.dispatchEvent(new CustomEvent('input', {}));
}

function resizeHeightSync() {
  nextTick(() => {
    resizeHeight();
  })
}


function revisionHeight(...height: number[]): number {
  // limit of height is 55%
  const max = Math.max(Math.floor(window.innerHeight * 0.55), editorMinHeight);
  return Math.min(Math.max(...height, editorMinHeight), max);
}

function resizeHeight() {
  const contentEl = contentElement.value;
  const previewEl = previewElement.value;
  const m = mode.value;
  try {
    if (m == 'view') {
      previewEl.style.height = 'auto';
      const height = revisionHeight(previewEl.scrollHeight);
      previewEl.style.height = `${height}px`;
    } else if (m == 'edit') {
      contentEl.style.height = `auto`;
      const height = revisionHeight(contentEl.scrollHeight);
      contentEl.style.height = `${height}px`;
    } else if (m == 'both') {
      previewEl.style.height = `auto`;
      contentEl.style.height = `auto`;
      const height = revisionHeight(contentEl.scrollHeight, previewEl.scrollHeight);
      previewEl.style.height = contentEl.style.height = `${height}px`;
    }
  } catch (e) {}
}

function init() {
  topic.value = post.value.topic;
  content.value = post.value.content;
  contentElement.value.style.height = `${editorMinHeight}px`;
  previewElement.value.style.height = `${editorMinHeight}px`;
  resizeHeightSync();
}

onMounted(() => {
  init();
});



</script>

<style>
.editor-btn-box {
  i {
    @apply inline-block text-center !leading-[40px] w-[36px] h-[40px] cursor-pointer text-sm hover:text-red-700 dark:hover:text-red-500
  }
}
</style>