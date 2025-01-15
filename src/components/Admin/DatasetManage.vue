<template>
  <div>
    <el-row justify="space-between" align="middle">
      <el-col>
        <el-button type="primary" @click="handleAdd">添加数据集</el-button>
      </el-col>
      <el-col>
        <el-input v-model="keyword" placeholder="搜索数据集名称" @keyup.enter="fetchData" />
      </el-col>
    </el-row>

    <el-table :data="datasetList" style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="数据集名称" />
      <el-table-column prop="description" label="描述" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加/编辑数据集弹窗 -->
    <el-dialog :visible.sync="dialogVisible" title="数据集信息">
      <el-form :model="form">
        <el-form-item label="数据集名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" />
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
// 同理，需要在 api/admin.js 中自行实现以下API
// import { getDatasetList, addDataset, editDataset, deleteDataset } from '@/api/admin'

const datasetList = ref([])
const keyword = ref('')
const dialogVisible = ref(false)
const isEdit = ref(false)
const form = reactive({
  id: null,
  name: '',
  description: ''
})

const fetchData = async () => {
  try {
    // const res = await getDatasetList({ keyword: keyword.value })
    // datasetList.value = res.data
    // 以下为示例数据
    datasetList.value = [
      { id: '1', name: 'ImageNet', description: '大型图像数据集' },
      { id: '2', name: 'COCO', description: '目标检测数据集' }
    ]
  } catch (error) {
    console.error(error)
  }
}

const handleAdd = () => {
  isEdit.value = false
  form.id = null
  form.name = ''
  form.description = ''
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  form.id = row.id
  form.name = row.name
  form.description = row.description
  dialogVisible.value = true
}

const handleDelete = async (row) => {
  try {
    // await deleteDataset(row.id)
    ElMessage.success('删除成功')
    fetchData()
  } catch (error) {
    console.error(error)
  }
}

const submitForm = async () => {
  try {
    if (isEdit.value) {
      // await editDataset(form.id, {
      //   name: form.name,
      //   description: form.description
      // })
      ElMessage.success('编辑成功')
    } else {
      // await addDataset({
      //   name: form.name,
      //   description: form.description
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
