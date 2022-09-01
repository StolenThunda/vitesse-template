<template>
  <vds-media>
    <vds-video :poster="poster">
      <video
        :src="srcURL"
        preload="none"
      ></video>
    </vds-video>
  </vds-media>
</template>
<script setup>
  import '@vidstack/player/define/vds-media.js';
  import '@vidstack/player/define/vds-video.js';
// Discover elements by typing this in your IDE.
// import '@vidstack/player/define/';
const props = defineProps( {
  srcURL: {
    type: [String],
    required: true
  },
  poster: {
    type: String,
    required: true,
    default: 'https://media.vimejs.com/poster.png'
  }
} )

</script>
