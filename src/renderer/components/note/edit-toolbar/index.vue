<template>
  <div>
    <el-skeleton :rows="1" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'note-edit-toolbar',
  setup() {
    return {};
  },
  data() {
    return {
      myName: 'content'
    };
  }
});
</script>

<style scoped></style>
