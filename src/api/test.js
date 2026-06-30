import request from '@/utils/request'

export const testApi = {
  // GET 请求 - 对应 @GetMapping()
  test: () => request.get('/test'), // 完整路径: /v1/test
}
