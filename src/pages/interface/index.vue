<template>
  <div class="flex flex-col">
    <div>

      <label
        for="src"
        class="m-10 gap-5 p-5 flex-1"
      >Source Input</label><input
        id="src"
        class="p2 rounded-xl border-2 focus:border-white"
        v-model="sourceURL"
      />
      <button
        @click="setUrl"
        class="btn"
      >Set Url</button>
      <button
        @click="setUrl('')"
        class="btn"
      >Clear Url</button>
    </div>
    <!-- <VideoPlayer  class="mt-10 pt-10" :srcURL="sourceURL" /> -->
    <vime-player
      v-if="sourceURL != ''"
      :srcURL="sourceURL"
    ></vime-player>
    <!-- <VidStackPlayer
      v-if="sourceURL != ''"
      :srcURL="sourceURL"
    /> -->
  </div>
</template>
<script setup>
const sourceURL = ref( "" )
const setUrl = (val) => {
  sourceURL.value = (typeof val === 'string') ? val : "https://media.vimejs.com/720p.mp4"
  }
</script>
