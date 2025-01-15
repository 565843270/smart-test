<!-- src/pages/AdminHome.vue -->
<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="padding-top: 10px">
      <el-image style="width: 90%; margin-bottom: 20px;"  src="https://notes-1303967055.cos.ap-chengdu.myqcloud.com/a4-3xbblue.png"  />
      <el-menu default-active="1" router>
        <el-menu-item index="/admin/main-info">主页</el-menu-item>
        <el-menu-item index="/admin/user-manage">用户管理</el-menu-item>
        <el-menu-item index="/admin/model-manage">模型管理</el-menu-item>
        <el-menu-item index="/admin/dataset-manage">数据集管理</el-menu-item>
        <el-menu-item index="/admin/server-manage">服务器管理</el-menu-item>
        <el-menu-item index="/admin/testing-manage">测试管理</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div style="float: right;">
          <el-button type="text" @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-main style="width: 85%; margin: 0 auto;">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  window.location.href = '/login'
}
</script>
