<template>

  <div >
    <!-- <div class="flex flex-row gap-5">

      <div>
        Start: {{ settings.get_start }}
      </div>
      <div>
        End: {{ settings.get_end }}
      </div>
    </div> -->

    <div v-show="settings.loopReady">
      <slot class="flex flex-row" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSettingsStore } from "~/store/playerSettings";
const settings = useSettingsStore()
</script>
