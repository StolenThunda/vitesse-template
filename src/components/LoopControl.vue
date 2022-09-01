<template>
  <div ref="domRef">
    <Control
      keys="b"
      :label=" t( 'button.loop' ) "
      @click="toggleLoop"
    >
      <div
        class="loop-control i-mdi-autorenew
        "
        :title="t('button.loop')"
      ></div>
      <Tooltip>{{ t( 'button.loop' )    }} (b)</Tooltip>
    </Control>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LoopControl',
};
</script>

<script  setup lang="ts">
import { Control, Tooltip, usePlayerContext } from '@vime/vue-next';
import { useSettingsStore } from "~/store/playerSettings";
const settings = useSettingsStore()
const { t } = useI18n()

const domRef = ref( null );
const currentTime = usePlayerContext( domRef, 'currentTime', 0 );
const loopEnded = computed( () => {
  if ( settings.looping ) {
    return currentTime.value < settings.get_end
  } else {
    return false
  }
} )
const isReady = computed(()=>settings.loopReady)
const activate = () => {
  element.removeAttribute( 'hidden' )
      element.setAttribute( 'active', '' )
}
const deactivate = () => {
   element.setAttribute( 'hidden', '' )
      element.removeAttribute( 'active' )
}
let element: Element
onMounted( () => {
  let tmp = document.querySelector( '.i-mdi-autorenew' )
  if ( tmp ) element = tmp
  deactivate()
} )
watch( isReady,( ) => {
  ( isReady.value ) ? activate() : deactivate()
  }
)
watch(
  () => settings.looping,
  ( isLooping ) => {
    if ( isLooping ) {
      element.setAttribute( 'looping', '' )
    } else {
      element.removeAttribute( 'looping' )
    }
  }
)
watch(
  loopEnded,
  (  ) => {
    if ( settings.looping ) {
      initLoop()
    } else {
      element.removeAttribute( 'looping' )
    }
  }
)
// const contLooping = () => {
//   if (settings.get_end >= currentTime.value) initLoop()
// }
const initLoop = () => currentTime.value = settings.get_start
// const stopLooping = () =>
const toggleLoop = () => {
  settings.toggleLooping()
  initLoop()
//  setInterval(() => {
//   contLooping()
//  }, 1);
}


</script>

<style>
  .loop-control[active]{
    color: rgb(4, 241, 4);
  }
  .loop-control[looping]{
    animation: spin 1s linear infinite;
    color: rgb(255, 0, 0);
  }
    @-moz-keyframes spin {
      from {
        -moz-transform: rotate(0deg);
      }

      to {
        -moz-transform: rotate(360deg);
      }
    }

    @-webkit-keyframes spin {
      from {
        -webkit-transform: rotate(0deg);
      }

      to {
        -webkit-transform: rotate(360deg);
      }
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }
</style>
