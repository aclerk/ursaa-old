<template>
  <div>{{ this.myName }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'note-edit-content',
  setup() {
    const name = 'content';
    return {
      name
    };
  },
  data() {
    return {
      myName: 'content'
    };
  }
});
</script>

<style scoped></style>
