<template>
  <div ref="domRef">
    <Control
      keys="b"
      :label=" t( 'button.restart' ) "
      @click="currentTime = 0"
      >
        <div
          class="i-mdi-skip-backward"
          title="t('button.restart2')"

        />
      <Tooltip>{{ t('button.restart')  }} (b)</Tooltip>
    </Control>
  </div>
</template>





<script >
export default {
name: 'RestartControl',
};
</script>

<script  setup>
import { usePlayerContext, Control, Tooltip } from '@vime/vue-next';

const { t } = useI18n()

const domRef = ref( null );

const currentTime = usePlayerContext( domRef, 'currentTime', 0 );
</script>
