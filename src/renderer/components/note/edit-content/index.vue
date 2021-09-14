<template>
  <div style="height: 100%; overflow: auto">
    <textarea name="" id="daily_editor" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import { RequestTypeEnum } from '@/universal/types/data-object';
import Editor from '@/editor/editor';

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
    window.editor = new Editor({ tools: ['header', 'picture'] });
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

<style scoped lang="less"></style>
