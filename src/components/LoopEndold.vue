<template>
  <div ref="domRef">
    <Control
      keys="b"
      :label=" t( 'button.loopEnd' ) "
      @click="setVal"
    >
      <div
        class="i-mdi-movie-edit loop-icon"
        :title=" t( 'button.loopEnd' )  "
      ></div>
      <Tooltip>{{ t( 'button.loopEnd' )  }} (b)</Tooltip>
    </Control>
  </div>
</template>









<script >
export default {
name: 'LoopEndControl',
};
</script>

<script  setup>
import { usePlayerContext, Control, Tooltip } from '@vime/vue-next';
import { useSettingsStore } from "~/store/playerSettings";
const settings = useSettingsStore()

const element = ref(null)
const { t } = useI18n()
const setVal =() =>{
  // alert( currentTime.value )
  settings.setLoopEnd( currentTime.value )
}
const domRef = ref( null );
const currentTime = usePlayerContext( domRef, 'currentTime', 0 );

onMounted(() => {
  element.value = document.querySelector('.loop-icon')
})
watch(
  () => settings.getEnd,
  ( end ) => {
    if ( end != 0 ) {
      element.value.setAttribute('active','')
    } else {
      element.value.removeAttribute('active')

    }
  }
  )
</script>
<style>
  [active]{
    color: green
  }
</style>

