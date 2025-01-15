<template>
  <div>
    <el-table :data="testingList" style="width: 100%;">
      <el-table-column prop="id" label="测试ID" width="80" />
      <el-table-column prop="modelName" label="模型" />
      <el-table-column prop="datasetName" label="数据集" />
      <el-table-column prop="serverName" label="服务器" />
      <el-table-column prop="startTime" label="开始时间" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑测试信息弹窗（若需要） -->
    <el-dialog :visible.sync="dialogVisible" title="编辑测试信息">
      <el-form :model="form">
        <el-form-item label="模型参数">
          <el-input v-model="form.params" />
        </el-form-item>
        <el-form-item label="测试时间">
          <el-date-picker v-model="form.testTime" type="datetime" placeholder="选择时间" />
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
// import { getTestingList, editTestingInfo, deleteTesting } from '@/api/admin'
import { ElMessage } from 'element-plus'

const testingList = ref([])
const dialogVisible = ref(false)
const form = reactive({
  id: null,
  params: '',
  testTime: ''
})
const isEdit = ref(false)

const fetchData = async () => {
  try {
    // const res = await getTestingList()
    // testingList.value = res.data
    // 示例数据
    testingList.value = [
      {
        id: 't1',
        modelName: 'ResNet',
        datasetName: 'ImageNet',
        serverName: 'Server-1',
        startTime: '2025-01-15 10:00:00'
      },
      {
        id: 't2',
        modelName: 'BERT',
        datasetName: 'COCO',
        serverName: 'Server-2',
        startTime: '2025-01-15 09:30:00'
      }
    ]
  } catch (error) {
    console.error(error)
  }
}

const handleEdit = (row) => {
  isEdit.value = true
  form.id = row.id
  form.params = row.params || ''
  form.testTime = row.startTime || ''
  dialogVisible.value = true
}

const handleDelete = async (row) => {
  try {
    // await deleteTesting(row.id)
    ElMessage.success('删除成功')
    fetchData()
  } catch (error) {
    console.error(error)
  }
}

const submitForm = async () => {
  try {
    if (isEdit.value) {
      // await editTestingInfo(form.id, {
      //   params: form.params,
      //   testTime: form.testTime
      // })
      ElMessage.success('编辑成功')
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
