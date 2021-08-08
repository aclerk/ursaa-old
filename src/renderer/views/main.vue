<template>
  <el-container style="height: 100%">
    <el-aside width="56px" style="border-color: black">
      <div class="daily-menu">
        <i class="el-icon-notebook-1 daily-icon" style="font-size: 30px" @click="clickFunc"></i>
      </div>
      <div style="height: 56px; width: 56px; line-height: 56px">
        <i class="el-icon-setting" style="font-size: 30px" @click="clickFunc"></i>
      </div>
    </el-aside>
    <el-main>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </el-main>
  </el-container>
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

<style lang="less" scoped>
.daily-menu {
  height: 56px;
  width: 56px;
}
.daily-icon {
  line-height: 56px;
}
</style>
