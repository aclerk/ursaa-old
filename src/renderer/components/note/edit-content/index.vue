<template>
  <div>
    <textarea name="" id="html_result" cols="30" rows="10"></textarea>
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
      default: () => {
        return [];
      }
    }
  },
  mounted() {
    let obj = {
      type: RequestTypeEnum.query,
      data: {
        str: 'hello'
      }
    };
    ipcRenderer.send('data-query', obj);
    window.editor = new Editor('html_result');
  },
  data() {
    return {
      content: [],
      activeIndex: -1
    };
  }
};
</script>

<style scoped lang="less">
#markdown {
  height: 100%;
  box-sizing: border-box;
}
#markdown:focus {
  outline: none;
}
</style>
