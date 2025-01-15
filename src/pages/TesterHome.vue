<!-- src/pages/TesterHome.vue -->
<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px">
      <el-image style="width: 90%; margin-bottom: 20px;"  src="https://notes-1303967055.cos.ap-chengdu.myqcloud.com/a4-3xbblue.png"  />
      <el-menu default-active="1" router>
        <el-menu-item index="/tester/model-list">可测试模型列表</el-menu-item>
        <el-menu-item index="/tester/environment">硬件&软件环境</el-menu-item>
        <el-menu-item index="/tester/parameter">设置模型参数</el-menu-item>
        <el-menu-item index="/tester/dataset">选择数据集</el-menu-item>
        <el-menu-item index="/tester/apply-test">申请测试</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div style="float: right;">
          <el-button type="text" @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-main>
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
