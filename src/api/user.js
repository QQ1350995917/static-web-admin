import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/account/api/admin/session/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/account/api/admin/session',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/account/api/admin/session/logout',
    method: 'post'
  })
}

