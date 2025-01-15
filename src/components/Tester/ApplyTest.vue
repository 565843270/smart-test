<!-- src/components/Tester/ApplyTest.vue -->
<template>
  <div>
    <el-form :model="form" label-width="120px" style="max-width: 400px;">
      <el-form-item label="选择模型">
        <el-select v-model="form.model" placeholder="请选择模型">
          <el-option
              v-for="item in modelList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选择数据集">
        <el-select v-model="form.dataset" placeholder="请选择数据集">
          <el-option
              v-for="item in datasetList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选择服务器">
        <el-select v-model="form.server" placeholder="请选择服务器">
          <el-option
              v-for="item in serverList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :disabled="item.occupied">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="模型参数">
        <el-input v-model="form.params" placeholder="请输入模型参数(JSON或其他形式)"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitApply">申请测试</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { applyTest } from '@/api/tester'

const form = ref({
  model: '',
  dataset: '',
  server: '',
  params: ''
})

const modelList = ref([])
const datasetList = ref([])
const serverList = ref([])

// 模拟获取模型、数据集、服务器的接口
const fetchBasicData = () => {
  // TODO: 替换实际 API
  modelList.value = [
    { id: 'm1', name: 'ResNet50' },
    { id: 'm2', name: 'BERT' }
  ]
  datasetList.value = [
    { id: 'd1', name: 'ImageNet' },
    { id: 'd2', name: 'MNIST' }
  ]
  serverList.value = [
    { id: 's1', name: 'Server-1', occupied: false },
    { id: 's2', name: 'Server-2', occupied: true } // 被占用
  ]
}

onMounted(() => {
  fetchBasicData()
})

const submitApply = async () => {
  if (!form.value.model || !form.value.dataset || !form.value.server) {
    ElMessage.error('请填写完整信息')
    return
  }
  try {
    const res = await applyTest({
      modelId: form.value.model,
      datasetId: form.value.dataset,
      serverId: form.value.server,
      params: form.value.params
    })
    // 如果成功
    ElMessage.success('测试申请提交成功')
  } catch (error) {
    console.error(error)
  }
}
</script>
