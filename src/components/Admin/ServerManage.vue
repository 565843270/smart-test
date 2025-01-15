<template>
  <div>
    <el-row justify="space-between" align="middle">
      <el-col>
        <el-button type="primary" @click="handleAdd">添加服务器</el-button>
      </el-col>
      <el-col>
        <el-input v-model="keyword" placeholder="搜索服务器名称" @keyup.enter="fetchData" />
      </el-col>
    </el-row>

    <el-table :data="serverList" style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="服务器名称" />
      <el-table-column prop="model" label="服务器型号" />
      <el-table-column label="是否占用" width="100">
        <template #default="{ row }">
          <el-tag :type="row.occupied ? 'danger' : 'success'">
            {{ row.occupied ? '占用中' : '空闲' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加/编辑服务器弹窗 -->
    <el-dialog :visible.sync="dialogVisible" title="服务器信息">
      <el-form :model="form">
        <el-form-item label="服务器名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="服务器型号">
          <el-input v-model="form.model" />
        </el-form-item>
        <el-form-item label="是否占用">
          <el-switch v-model="form.occupied" />
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
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
// 需在 api/admin.js 中实现对应的接口方法
// import { getServerList, addServer, editServer, deleteServer } from '@/api/admin'

const serverList = ref([])
const keyword = ref('')
const dialogVisible = ref(false)
const isEdit = ref(false)
const form = reactive({
  id: null,
  name: '',
  model: '',
  occupied: false
})

const fetchData = async () => {
  try {
    // const res = await getServerList({ keyword: keyword.value })
    // serverList.value = res.data
    // 示例数据
    serverList.value = [
      { id: 's1', name: 'Server-1', model: 'RTX 3090 x 2', occupied: false },
      { id: 's2', name: 'Server-2', model: 'V100 x 4', occupied: true }
    ]
  } catch (error) {
    console.error(error)
  }
}

const handleAdd = () => {
  isEdit.value = false
  form.id = null
  form.name = ''
  form.model = ''
  form.occupied = false
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  form.id = row.id
  form.name = row.name
  form.model = row.model
  form.occupied = row.occupied
  dialogVisible.value = true
}

const handleDelete = async (row) => {
  try {
    // await deleteServer(row.id)
    ElMessage.success('删除成功')
    fetchData()
  } catch (error) {
    console.error(error)
  }
}

const submitForm = async () => {
  try {
    if (isEdit.value) {
      // await editServer(form.id, {
      //   name: form.name,
      //   model: form.model,
      //   occupied: form.occupied
      // })
      ElMessage.success('编辑成功')
    } else {
      // await addServer({
      //   name: form.name,
      //   model: form.model,
      //   occupied: form.occupied
      // })
      ElMessage.success('添加成功')
    }
    dialogVisible.value = false
    fetchData()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped></style>
