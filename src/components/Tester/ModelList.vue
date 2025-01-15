<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-input v-model="keyword" placeholder="搜索模型名称" @keyup.enter="fetchData" />
      </el-col>
      <el-col :span="4" style="padding-left: 10px;">
        <el-button type="primary" @click="fetchData">搜索</el-button>
      </el-col>
    </el-row>

    <el-table :data="modelList" style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="模型ID" width="80" />
      <el-table-column prop="name" label="模型名称" />
      <el-table-column prop="intro" label="模型介绍" />
      <el-table-column prop="requirements" label="测试要求" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import { getTestModelList } from '@/api/tester'
import { ElMessage } from 'element-plus'

const modelList = ref([])
const keyword = ref('')

const fetchData = async () => {
  try {
    // const res = await getTestModelList({ keyword: keyword.value })
    // modelList.value = res.data
    // 示例数据
    modelList.value = [
      { id: 'm1', name: 'ResNet', intro: '图像分类网络', requirements: '需要GPU' },
      { id: 'm2', name: 'BERT', intro: '自然语言处理模型', requirements: '需要大内存' }
    ]
  } catch (error) {
    ElMessage.error(error.message)
  }
}

onMounted(() => {
  fetchData()
})
</script>
