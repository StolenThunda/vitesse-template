<template>
  <div class="flex h-screen">
    <list-view class="w-1/3" />
    <VimePlayer class="grow" v-bind="current.data" :type="current.type" />
  </div>

</template>
<script lang="ts">
defineComponent( {
    name: "PlayerUI"
  })
</script>

<script setup lang="ts">
import { useMediaStore } from "~/store/playerMedia";
const mStore = useMediaStore()
const current = computed( () => mStore.getCurrent )
</script>
