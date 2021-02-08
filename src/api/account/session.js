import request from '@/utils/request'

export function init() {
  return request({
    url: '/service/account/api/admin/session/init',
    method: 'GET'
  })
}

export function refreshCaptcha(){
  return request({
    url: '/account/api/admin/session/captcha',
    method: 'get'
  })
}

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
    url: '/account/api/admin/session',
    method: 'delete'
  })
}

