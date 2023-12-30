<template>
  <ColorPicker alpha-channel="hide" :visible-formats="['hex']" :color="color" @color-change="updateColor" />
</template>

<script setup lang="ts">
// https://github.com/kleinfreund/vue-accessible-color-picker
import {ColorPicker} from 'vue-accessible-color-picker'

const props = defineProps<{ color: string, callback: Function }>()

function updateColor(e: any) {
  const hex = e.cssColor.substring(1);
  if (hex.match(/^[\da-f]{6}$/)) {
    props.callback(hex);
  } else if (hex.match(/^[\da-f]{3}$/)) {
    props.callback(hex.replace(/(.)/g, '$1$1'));
  }
}
</script>

<style>
@import url('vue-accessible-color-picker/styles');
.vacp-color-picker {
  border-radius: 3px; padding:8px;
  html.dark & {
    background: #222 !important; border:1px solid #1a1a1a !important;
    input[type=text] { background: #111 !important; border:1px solid #000 !important; color:#aaa !important; }
  }
  html.light & {
    background: #fff !important; border:1px solid #ddd !important;
    input[type=text] { background: #fff !important; border:1px solid #ddd !important; color:#333 !important; }
  }

  button.vacp-copy-button,
  .vacp-range-input-label-text--hue,
  .vacp-color-input-label-text { display: none !important; }
  .vacp-range-input-group { grid-column: 1/-1 !important; }
}
</style>
