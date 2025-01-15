<!-- src/pages/Login.vue -->
<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 style="text-align:center;">智能算法测试系统登录</h2>
      <el-form :model="form" ref="loginForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role" placeholder="选择角色">
            <el-option label="管理员" value="admin" />
            <el-option label="测试人员" value="tester" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'

const form = reactive({
  username: '',
  password: '',
  role: ''
})

const handleLogin = () => {
  // TODO: 调用登录接口，若成功则保存 token、role、跳转相应页面
  if (!form.username || !form.password || !form.role) {
    ElMessage.error('请填写完整信息')
    return
  }
  // 假设此处登录成功
  localStorage.setItem('token', 'mockToken')
  localStorage.setItem('role', form.role)

  if (form.role === 'admin') {
    window.location.href = '/admin/user-manage'
  } else {
    window.location.href = '/tester/model-list'
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-card {
  width: 400px;
}
</style>
