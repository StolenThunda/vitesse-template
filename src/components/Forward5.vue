<template>
  <div ref="domRef">
    <Control
      keys="b"
      :label=" t( 'button.forward5' ) "
      @click="currentTime = (currentTime + 5)"
    >
      <div
        class="i-mdi-fast-forward-5"
        title="Forward 5 sec"
      ></div>
      <Tooltip>{{ t('button.forward5')  }} (b)</Tooltip>
    </Control>
  </div>
</template>





<script >
export default {
name: 'Forward5Control',
};
</script>

<script  setup>
import { usePlayerContext, Control, Tooltip } from '@vime/vue-next';

const { t } = useI18n()

const domRef = ref( null );

const currentTime = usePlayerContext( domRef, 'currentTime', 0 );
</script>
