<template>
  <div ref="domRef">
    <Control
      keys="b"
      :label=" t( 'button.loopStart' ) "
      @click="settings.setLoopStart(currentTime)"
      >
      <div
        class="i-mdi-movie-open-edit"
        :title="t( 'button.loopStart' ) "
      ></div>
      <Tooltip>{{ t( 'button.loopStart' )  }} (b)</Tooltip>
    </Control>
  </div>
</template>





<script >
export default {
name: 'LoopStartControl',
};
</script>

<script  setup>
import { usePlayerContext, Control, Tooltip } from '@vime/vue-next';
import { useSettingsStore } from "~/store/playerSettings";
const { t } = useI18n()
const settings = useSettingsStore()
const domRef = ref( null );
const element = ref( null );

const currentTime = usePlayerContext( domRef, 'currentTime', 0 );
const loopStart = ref(0);
onMounted( () => {
  element.value = document.querySelector( '.loop-icon' )
} )
const fire = () => {
  loopStart.value = currentTime.value
  console.log(loopStart.value)
}
</script>
