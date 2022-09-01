<template>
  <Player
  muted
    ref="player"
    @vmCurrentTimeChange="onTimeUpdate"
  >
    <!-- <Youtube videoId="DyTCOwB0DVw" /> -->
    <Video
      crossorigin=""
      :poster="poster"
    >
      <source
        :data-src="props.srcURL"
        type="video/mp4"
      />
      <!-- <track
        default
        kind="subtitles"
        src="https://media.vimejs.com/subs/english.vtt"
        srclang="en"
        label="English"
      /> -->
    </Video>

    <Ui>
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

<script>
export default {
name: 'VimePlayer',
};
</script>

<script setup>
import {
    Video,
    // Youtube,
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
  // usePlayerContext
} from '@vime/vue-next';
import { useSettingsStore } from "~/store/playerSettings";

const props = defineProps({
  srcURL: String,
  poster: {
    type:String,
    default:"https://media.vimejs.com/poster.png"
  }
});

const settings = useSettingsStore()


const player = ref( null )

// const currentTime = usePlayerContext( player, 'currentTime', 0 );
const onTimeUpdate = () => {
  // if ( settings.looping ) {
  //   loopCheck()
  //   console.log( currentTime.value )
  // }
}
const loopCheck = () => {
  // debugger
    if ( currentTime.value >= settings.get_end ) currentTime.value = settings.get_start
}

// }
// watch(
//   () => settings.looping,
//   ( isLooping ) => {
//     if (isLooping) loopCheck()
//   }
// )
</script>
<style>
  @import "https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/default.css";

</style>
