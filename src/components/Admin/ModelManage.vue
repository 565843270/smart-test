<template>
  <div>
    <el-row justify="space-between" align="middle">
      <el-col>
        <el-button type="primary" @click="handleAdd">添加模型</el-button>
      </el-col>
      <el-col>
        <el-input v-model="keyword" placeholder="搜索模型名称" @keyup.enter="fetchData" />
      </el-col>
    </el-row>

    <el-table :data="modelList" style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="模型名称" />
      <el-table-column prop="intro" label="模型介绍" />
      <el-table-column prop="requirements" label="测试要求" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加/编辑模型信息弹窗 -->
    <el-dialog :visible.sync="dialogVisible" title="模型信息">
      <el-form :model="form">
        <el-form-item label="模型名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="模型介绍">
          <el-input v-model="form.intro" />
        </el-form-item>
        <el-form-item label="测试要求">
          <el-input v-model="form.requirements" />
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
// 下面API接口需在 api/admin.js 中自行实现，如：getModelList, addModel, editModel, deleteModel
// 这里只是演示如何调用
// import { getModelList, addModel, editModel, deleteModel } from '@/api/admin'

const modelList = ref([])
const keyword = ref('')
const dialogVisible = ref(false)
const isEdit = ref(false)
const form = reactive({
  id: null,
  name: '',
  intro: '',
  requirements: ''
})

const fetchData = async () => {
  try {
    // const res = await getModelList({ keyword: keyword.value })
    // modelList.value = res.data
    // 以下为示例数据
    modelList.value = [
      { id: '1', name: 'ResNet', intro: '图像分类网络', requirements: '需要GPU' },
      { id: '2', name: 'BERT', intro: '自然语言处理', requirements: '需要大内存' }
    ]
  } catch (error) {
    console.error(error)
  }
}

const handleAdd = () => {
  isEdit.value = false
  form.id = null
  form.name = ''
  form.intro = ''
  form.requirements = ''
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  form.id = row.id
  form.name = row.name
  form.intro = row.intro
  form.requirements = row.requirements
  dialogVisible.value = true
}

const handleDelete = async (row) => {
  try {
    // await deleteModel(row.id)
    ElMessage.success('删除成功')
    fetchData()
  } catch (error) {
    console.error(error)
  }
}

const submitForm = async () => {
  try {
    if (isEdit.value) {
      // await editModel(form.id, {
      //   name: form.name,
      //   intro: form.intro,
      //   requirements: form.requirements
      // })
      ElMessage.success('编辑成功')
    } else {
      // await addModel({
      //   name: form.name,
      //   intro: form.intro,
      //   requirements: form.requirements
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
