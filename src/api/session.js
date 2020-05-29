import request from '@/utils/request'

export function loginApi(data) {
  return request({
    url: '/account/api/admin/session',
    method: 'put',
    data
  })
}

export function getInfoApi() {
  return request({
    url: '/account/api/admin/session',
    method: 'get'
  })
}

export function logoutApi() {
  return request({
    url: '/account/api/admin/session/logout',
    method: 'post'
  })
}

