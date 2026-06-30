<template>
  <h1>this is test</h1>
  <div>
    <h1>测试页面</h1>
    <button @click="handleTest" :disabled="loading">
      {{ loading ? '请求中...' : '测试后端接口' }}
    </button>
    <div v-if="result" class="result">
      <p>响应结果: {{ result }}</p>
    </div>
    <div v-if="error" class="error">
      <p>错误: {{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { testApi } from '@/api/test'

const loading = ref(false)
const result = ref(null)
const error = ref(null)

const handleTest = async () => {
  loading.value = true
  error.value = null
  result.value = null

  try {
    const res = await testApi.test()
    result.value = res
    console.log('接口调用成功:', res)
  } catch (err) {
    error.value = err.message
    console.error('接口调用失败:', err)
  } finally {
    loading.value = false
  }
}
</script>
