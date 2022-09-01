<template>
  <div class="flex flex-col clear-both">
    <div class="isolate">

      <label
        for="src"
        class="m-10 gap-5 p-5 flex-1"
      >Source Input</label><input
        id="src"
        class="p2 rounded-xl border-2 focus:border-white"
        v-model="sourceURL"
      />
      <button
        @click=" setUrl('https://media.vimejs.com/720p.mp4')"
        class="btn"
      >Set Url</button>
      <button
        @click="setUrl('')"
        class="btn"
      >Clear Url</button>
    </div>
    <VideoPlayer
      v-model="sourceURL"
      :srcURL="sourceURL"
      poster="https://media.vimejs.com/poster.png"
    ></VideoPlayer>
  </div>
</template>
<script setup>
const sourceURL = ref( null)
const setUrl = (val) => {
  sourceURL.value = ( val !== '' ) ? val : "https://media.vimejs.com/720p.mp4"
}

</script>
<route lang="yaml">
meta:
  layout: player
</route>
