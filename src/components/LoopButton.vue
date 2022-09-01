<template>
  <div ref="domRef">
    <Control
      keys=""
      :label="label "
      @click="setVal"
      disabled
    >
      <div class="flex ">

        <div
          class="loop-icon flex-1"
          :class="icon"
          :title="label"
        ></div>
      </div>
      <!-- <Tooltip>{{ label }} </Tooltip> -->

      <div>
         <Tooltip
        v-if="props.fn === 'start'"
        name="start"
      >{{ settings.get_start }}</Tooltip>
      <Tooltip
        v-if="props.fn === 'end'"
        name="end"
      >{{ settings.get_end}}</Tooltip>
      </div>

    </Control>
    </div>
</template>


<script lang="ts">
export default {
name: 'LoopSetButton',
};
</script>

<script  setup lang="ts">
import { usePlayerContext, Control, Tooltip } from '@vime/vue-next';
import { useSettingsStore } from "~/store/playerSettings";
const settings = useSettingsStore()

let element: Element
const { t } = useI18n()
const props = defineProps( {
  fn: {
    type: String,
    default: 'start'
  }
} )
const icons: { [key: string]: string }  = {
  start: 'i-mdi-movie-open-edit',
  end: 'i-mdi-movie-edit'
}

const activate = () => {
  element.setAttribute( 'active', '' )
  // element.title =
}
const deactivate = () => element.removeAttribute( 'active' )
const domRef = ref( null );
const currentTime = usePlayerContext( domRef, 'currentTime', 0 );
let i18nName = `button.${props.fn}`
const label = computed( () => { return t( 'button.setLoop' ) + ' ' + t(i18nName)})
const icon = computed( () => {
  let key = ''
  let options = Object.keys(icons)
  if ( options.includes( props.fn ) ) key = props.fn
  return icons[key]
} )

onMounted( () => {
  let selector = `.${icon.value}`
  let temp = document.querySelector(selector)
  if ( temp ) element = temp
} )

watch(
  () => settings.get_start,
  (startVal: number ) => {
    if ( props.fn === 'start' ) {
      ( startVal > 0 ) ? activate() : deactivate()

    }
}
)

watch(
  () => settings.get_end,
  ( endVal: number ) => {
    if ( props.fn === 'end' ) {
      ( endVal > 0 ) ? activate() : deactivate()
    }
  }
)

const setVal = () => {
  // alert( currentTime.value )
  settings.setLoopPart( props.fn, currentTime.value )
  activate()
}
</script>
<style>
  .loop-icon[active]{
    color:rgb(4, 241, 4);
  }
</style>

