<template>
  <div style="height: 100%; overflow: auto">
    <textarea hidden name="" id="daily_editor" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import { RequestTypeEnum } from '@/universal/types/data-object';
import dailyEditor from '@/editor/daily-editor';

export default {
  name: 'note-edit-content',
  props: {
    value: {
      type: Array,
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      default: () => {
        return [];
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    let obj = {
      type: RequestTypeEnum.query,
      data: {
        str: 'hello'
      }
    };
    ipcRenderer.send('data-query', obj);
    dailyEditor.start({
      tools: ['text', 'heading', 'list-unordered', 'double-quotes-l', 'table-2', 'code-view', 'flow-chart', 'link'],
      textareaId: 'daily_editor'
    });
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      content: [],
      activeIndex: -1
    };
  }
};
</script>

<style scoped lang="less">
@import './style/editor.css';
</style>
