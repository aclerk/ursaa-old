<template>
  <el-container style="height: 100%">
    <el-aside width="57px" style="background-color: #333333">
      <router-link to="/" class="daily-router">
        <div class="daily-menu">
          <i class="el-icon-house daily-icon" style="font-size: 30px"></i>
        </div>
      </router-link>
      <router-link to="/note" class="daily-router">
        <div class="daily-menu">
          <i class="el-icon-notebook-1 daily-icon" style="font-size: 30px"></i>
        </div>
      </router-link>
      <router-link to="/setting" class="daily-router">
        <div class="daily-menu">
          <i class="el-icon-setting daily-icon" style="font-size: 30px"></i>
        </div>
      </router-link>
    </el-aside>
    <el-main class="daily-container">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </el-main>
  </el-container>
</template>

<style lang="less">
.daily-menu {
  height: 56px;
  width: 56px;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
}
.daily-icon {
  line-height: 56px;
}
.daily-router {
  color: #858585;
}
.daily-container {
  padding: 0 !important;
}
.router-link-active .daily-menu {
  border-left: 1px solid white;
}
.daily-router.router-link-active {
  color: white;
}
</style>
