<template>
  <div>main</div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeUpdate } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

export default defineComponent({
  setup() {
    const routeName = ref(useRoute().name);
    onBeforeUpdate(() => {
      routeName.value = useRoute().name;
    });
    return {
      routeName,
      clickFunc() {
        ElMessage('只是一条消息提示');
      }
    };
  }
});
</script>

<style lang="less" scoped></style>
