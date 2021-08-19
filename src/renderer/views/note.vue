<template>
  <div class="daily-pane">
    <daily-note></daily-note>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DailyNote from '@/renderer/components/note/index.vue';

export default defineComponent({
  name: 'note',
  components: { DailyNote },
  data() {
    return {};
  }
});
</script>

<style scoped lang="less">
.daily-pane {
  height: 100%;
}
</style>
