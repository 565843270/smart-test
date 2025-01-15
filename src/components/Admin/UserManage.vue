<!-- src/components/Admin/UserManage.vue -->
<template>
  <div>
    <el-row justify="space-between" align="middle">
      <el-col>
        <el-button type="primary" @click="handleAdd">添加用户</el-button>
      </el-col>
      <el-col>
        <el-input v-model="keyword" placeholder="搜索用户名" @keyup.enter="fetchData" />
      </el-col>
    </el-row>

    <el-table :data="userList" style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="contact" label="联系方式" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加/编辑用户弹窗 -->
    <el-dialog :visible.sync="dialogVisible" title="用户信息">
      <el-form :model="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input v-model="form.contact"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { getUserList, addUser, editUser, deleteUser } from '@/api/admin'

const userList = ref([])
const keyword = ref('')
const dialogVisible = ref(false)
const isEdit = ref(false)
const form = reactive({
  id: null,
  username: '',
  contact: ''
})

const fetchData = async () => {
  try {
    const res = await getUserList({ keyword: keyword.value })
    // 假设res.data就是用户数组
    userList.value = res.data || []
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchData()
})

const handleAdd = () => {
  isEdit.value = false
  form.id = null
  form.username = ''
  form.contact = ''
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  form.id = row.id
  form.username = row.username
  form.contact = row.contact
  dialogVisible.value = true
}

const handleDelete = async (row) => {
  try {
    await deleteUser(row.id)
    ElMessage.success('删除成功')
    fetchData()
  } catch (error) {
    console.error(error)
  }
}

const submitForm = async () => {
  try {
    if (isEdit.value) {
      await editUser(form.id, {
        username: form.username,
        contact: form.contact
      })
      ElMessage.success('编辑成功')
    } else {
      await addUser({
        username: form.username,
        contact: form.contact
      })
      ElMessage.success('添加成功')
    }
    dialogVisible.value = false
    fetchData()
  } catch (error) {
    console.error(error)
  }
}
</script>
