<template>
  <Player
    muted
    ref="player"
    id="player"
    @vmCurrentTimeChange="onTimeUpdate"
    :key="pKey"
  >
    <div id="playerContent">

    </div>
    <Youtube
      id="YTProvider"
      :videoId="props.videoId"
      v-if="props.type === 'youtube'"
    />
    >
    <Vimeo
      id="VimeoProvider"
      :videoId="props.videoId"
      v-if="props.type === 'vimeo'"
    />
    <Video
      id="videoProvider"
      crossorigin=""
      :poster="poster"
      v-if="props.type === 'video'"
    >
      <source
        :data-src="props.srcURL"
        type="video/mp4"
      />

    </Video>

    <Ui>
      <ClickToPlay />
      <Scrim />
      <Spinner />
      <Poster />
      <Controls>
        <ControlGroup>
          <ScrubberControl />
        </ControlGroup>

        <ControlGroup space="both">
          <PlaybackControl />
          <CustomControlGroup />
          <SettingsControl />
          <ControlSpacer />
          <VolumeControl />
          <TimeProgress />
        </ControlGroup>
      </Controls>
    </Ui>
  </Player>
</template>

<script lang="ts">
export default {
name: 'VimePlayer',
};
</script>

<script setup lang="ts">
import {
    Video,
  Youtube,
  Vimeo,
  Player,
  SettingsControl,
  Ui,
  Scrim,
  Controls,
  ControlGroup,
  ControlSpacer,
  // MuteControl,
  VolumeControl,
  PlaybackControl,
  TimeProgress,
  Spinner,
  Poster,
  ScrubberControl,
  ClickToPlay,
} from '@vime/vue-next';

const props = defineProps< {
  type: {
    type: String,
    default: 'video'
  },
  videoId: {
    type: String,
    default: ''
  },
  srcURL: {
    type: String,
    default: ''
  },
  poster: {
    type: String,
    default: ''
    // default:"https://source.unsplash.com/random"
    // default:"https://media.vimejs.com/poster.png"
  }
}>();


watch(() => props.type, (props) => loadPlayer())
onMounted( () => {
  loadPlayer()
})

const loadPlayer = () => {
  switch ( props.type ) {
    case 'youtube':
      createYT()
      break;
    case 'vimeo':
      createVimeo()
    default:
      createVideo()
      break;
  }
}

const player = ref( null )

const onTimeUpdate = () => {

}
watch( () => ( props ), ( updatedProps: any ) => {
  // you will get the latest props into updatedProp
  console.log( 'changed', updatedProps )
  loadPlayer()
}, { deep: true } )
const pKey = computed( () => {
  if ( props.videoId ) return props.videoId
  return props.srcURL
})
const createVideo = () => {
  const el = document.getElementById( 'videoProvider' )
  el?.setAttribute( 'poster', props?.poster ?? '' )
  el?.setAttribute( 'data-src', props?.srcURL ?? '' )
  console.log('src changed', props.srcURL)
}
const createVimeo = () => {
  const el = document.getElementById( 'VimeoProvider' )

  el?.setAttribute( 'videoId', props?.videoId ?? '' )
  console.log('videoId changed', props.videoId)
}
const createYT = () => {
  const el = document.getElementById('YTProvider')
  el?.setAttribute( 'videoId', props?.videoId ?? '' )
  console.log('videoId changed', props.videoId)
}
</script>
<style>
  @import "https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/default.css";

</style>
