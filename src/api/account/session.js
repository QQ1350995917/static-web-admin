import request from '@/utils/request'

export function init() {
  return request({
    url: '/service/account/api/admin/session/init',
    method: 'GET'
  })
}

export function refreshCaptcha(){
  return request({
    url: '/service/account/api/admin/session/captcha',
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/service/account/api/admin/session',
    method: 'put',
    data
  })
}

export function getInfo() {
  return request({
    url: '/account/api/admin/session',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/account/api/admin/session',
    method: 'delete'
  })
}

