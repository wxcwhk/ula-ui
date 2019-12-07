import axios from '../axios'

/**
 * 用户管理
 */

 /**
  * 保存
  */
export const save = (params) =>{
    return axios({
        url:'/user/save',
        method:'post',
        params
    })
}

/**
 * 删除
 */
export const del = (params) =>{
    return axios({
        url: '/user/delete',
        method: 'post',
        params
    })
}

/**
 * 分页查询
 */
// 分页查询
export const findPage = (params) => {
    console.log("3")
    return axios({
        url: '/user/findPage',
        method: 'post',
        params
    })
}

// 查找用户的菜单权限标识集合
export const findPermissions = (params) => {
    return axios({
        url: '/user/findPermissions',
        method: 'get',
        params
    })
}