<template>
  <split-pane direction="row" :min="10" :max="90" :trigger-length="3" v-model:pane-length-percent="paneLengthPercent">
    <template v-slot:one>
      <note-sidebar class="pane pane-left"></note-sidebar>
    </template>
    <template v-slot:two>
      <note-edit-content :value="value" class="pane pane-right"></note-edit-content>
    </template>
  </split-pane>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NoteEditContent from '@/renderer/components/note/edit-content/index.vue';
import NoteSidebar from '@/renderer/components/note/sidebar/index.vue';
import SplitPane from '@/renderer/components/common/split-pane/index.vue';

export default defineComponent({
  name: 'daily-note',
  components: { SplitPane, NoteSidebar, NoteEditContent },
  setup() {
    const name = 'test';
    return {
      name
    };
  },
  data() {
    return {
      paneLengthPercent: 20,
      value: ['# h1', '## h2', '### h3', 'hello']
    };
  }
});
</script>

<style scoped lang="less"></style>
