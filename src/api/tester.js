// src/api/tester.js
import service from './index'

// 示例：获取可测试模型列表
export function getTestModelList(params) {
    return service({
        url: '/tester/models',
        method: 'get',
        params
    })
}

// 示例：申请测试
export function applyTest(data) {
    return service({
        url: '/tester/applyTest',
        method: 'post',
        data
    })
}

// 示例：停止并结束正在测试的模型
export function stopTest(testId) {
    return service({
        url: `/tester/stopTest/${testId}`,
        method: 'delete'
    })
}

// 示例：获取测试结果
export function getTestResult(testId) {
    return service({
        url: `/tester/testResult/${testId}`,
        method: 'get'
    })
}

// ... 其他测试人员相关操作
