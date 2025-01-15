<template>
  <div>
    <h3>硬件环境</h3>
    <el-table :data="hardwareList" style="width: 100%;">
      <el-table-column prop="id" label="硬件ID" width="80" />
      <el-table-column prop="name" label="硬件名称" />
      <el-table-column prop="detail" label="配置详情" />
    </el-table>

    <h3 style="margin-top: 20px;">软件环境</h3>
    <el-table :data="softwareList" style="width: 100%;">
      <el-table-column prop="id" label="软件ID" width="80" />
      <el-table-column prop="name" label="软件名称" />
      <el-table-column prop="version" label="版本" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 需要在 tester.js 或其他文件中实现接口： getEnvironment()
const hardwareList = ref([])
const softwareList = ref([])

const fetchEnvData = async () => {
  // 示例数据，实际应调用接口
  hardwareList.value = [
    { id: 'h1', name: 'NVIDIA GPU', detail: 'RTX 3090 x 2, 128G RAM' },
    { id: 'h2', name: 'CPU Server', detail: 'Intel Xeon E5' }
  ]
  softwareList.value = [
    { id: 'sw1', name: 'Ubuntu', version: '20.04' },
    { id: 'sw2', name: 'Docker', version: '19.03' }
  ]
}

onMounted(() => {
  fetchEnvData()
})
</script>
