<template>
  <div>{{ this.myName }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'note-sidebar',
  setup() {
    const name = 'test';
    return {
      name
    };
  },
  data() {
    return {
      myName: 'test'
    };
  }
});
</script>

<style scoped></style>
