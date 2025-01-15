// src/api/admin.js
import service from './index'

// 示例：获取用户信息列表
export function getUserList(params) {
    return service({
        url: '/admin/users',
        method: 'get',
        params
    })
}

// 示例：添加用户
export function addUser(data) {
    return service({
        url: '/admin/users',
        method: 'post',
        data
    })
}

// 示例：编辑用户
export function editUser(userId, data) {
    return service({
        url: `/admin/users/${userId}`,
        method: 'put',
        data
    })
}

// 示例：删除用户
export function deleteUser(userId) {
    return service({
        url: `/admin/users/${userId}`,
        method: 'delete'
    })
}

// 以下同理，可以封装其他API: 模型管理、数据集管理、服务器管理等
