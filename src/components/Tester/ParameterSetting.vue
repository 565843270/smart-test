<template>
  <div>
    <el-form :model="form" label-width="100px">
      <el-form-item label="学习率">
        <el-input v-model="form.learningRate" />
      </el-form-item>
      <el-form-item label="批大小">
        <el-input v-model="form.batchSize" />
      </el-form-item>
      <el-form-item label="训练轮数">
        <el-input v-model="form.epochs" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveParams">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
// 可将该数据保存在Vuex/Pinia中，也可直接传给后端
// import { saveModelParams } from '@/api/tester'

const form = reactive({
  learningRate: '0.001',
  batchSize: '32',
  epochs: '10'
})

const saveParams = async () => {
  try {
    // await saveModelParams(form)
    ElMessage.success('参数保存成功')
  } catch (error) {
    console.error(error)
    ElMessage.error('保存失败')
  }
}
</script>
