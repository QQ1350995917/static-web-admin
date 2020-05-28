import request from '@/utils/request'

export function loginApi(data) {
  return request({
    url: '/account/api/admin/session',
    method: 'put',
    data
  })
}

export function getInfoApi(token) {
  return request({
    url: '/account/api/admin/session',
    method: 'get',
    params: { token }
  })
}

export function logoutApi() {
  return request({
    url: '/account/api/admin/session/logout',
    method: 'post'
  })
}

