  <template>
    <div ref="clearLoops">
      <Control
        keys=""
        :label=" t('button.clearLoop') "
        @click=" settings.clearLoop() "

      >
        <div
          class="loop-icon i-mdi-cancel "
          :title=" t( 'button.clearLoop' ) "
        ></div>
        <Tooltip>{{ t( 'button.clearLoop' ) }} </Tooltip>
      </Control>
    </div>
  </template>
<script  setup lang="ts">
import { Control, Tooltip } from '@vime/vue-next';
import { useSettingsStore } from "~/store/playerSettings";
const settings = useSettingsStore()
const { t } = useI18n()
const clearLoops = ref( null )
const isReady = computed( () => settings.loopReady )
const activate = () => clearLoops.value!.removeAttribute( 'hidden' )
const deactivate = () => clearLoops.value!.setAttribute( 'hidden', '' )
onMounted(()=>deactivate())
watch( isReady, () => {
  ( isReady.value) ? activate(): deactivate()
  }
)
</script>
<style>
    .i-mdi-cancel {
    color: red
  }
</style>
