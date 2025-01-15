<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-input v-model="keyword" placeholder="搜索数据集名称" @keyup.enter="fetchData" />
      </el-col>
      <el-col :span="4" style="padding-left: 10px;">
        <el-button type="primary" @click="fetchData">搜索</el-button>
      </el-col>
    </el-row>

    <el-table :data="datasetList" style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="数据集ID" width="80" />
      <el-table-column prop="name" label="数据集名称" />
      <el-table-column prop="description" label="描述" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
// import { getAvailableDatasets } from '@/api/tester'

const datasetList = ref([])
const keyword = ref('')

const fetchData = async () => {
  try {
    // const res = await getAvailableDatasets({ keyword: keyword.value })
    // datasetList.value = res.data
    // 示例数据
    datasetList.value = [
      { id: 'd1', name: 'ImageNet', description: '大型图像数据集' },
      { id: 'd2', name: 'COCO', description: '目标检测数据集' }
    ]
  } catch (error) {
    ElMessage.error(error.message)
  }
}

onMounted(() => {
  fetchData()
})
</script>
