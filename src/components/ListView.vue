<template>
  <div class="border-r-2 w-1/4">


      <select
        class="text-light p2 text-center rounded-xl border-white border-2"
        name="mediaTypes"
        id=""
        v-model="type"
      >
        <!-- <option type disabled>Pick a type</option> -->
        <option
          v-for="key in mediaStore.types"
          :value="key"
          class="capitalize"
        >{{ key }}</option>
      </select>
<p class="
    text-center
    mt-5
    mr-4
    flex
    flex-col
    max-w-fit">
      <button
        v-for="data in list"
        class=" min-w-full  m2 border-2 p2 rounded-xl shadow-md hover:shadow-xl shadow-slate-100/40"
        @click=" mediaStore.setCurrentMedia( { type, data } )"
      >

        {{ type }}: {{ JSON.stringify(data, null, 2) }}
      </button>
    </p>




    <button
      @click="setList"
      class="btn"
      hidden
    >Refresh
    </button>
  </div>

</template>

<script lang="ts">
defineComponent({
    name: 'ListView'
  })
</script>

<script lang="ts" setup>
import { useMediaStore } from "~/store/playerMedia";

const mediaStore = useMediaStore()
const type: string | any = ref( mediaStore.randomMediaKey()[0] )
let list: [] | any = ref( mediaStore.media[type.value] )

const setCurrent = ( type: string, data: string | object ) => { mediaStore.setCurrentMedia( { type, data });  }
const setList = () => {
  window.location = window.location
  list.value = mediaStore.media[type.value]
  console.log( type.value )
}
watch( type, () => {
  list.value = mediaStore.media[type.value]
})
onMounted(() => { console.log(type.value)})
</script>

