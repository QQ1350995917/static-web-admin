import request from '@/utils/request'

export function loginPageInit() {
  return request({
    url: '/account/api/admin/session/init',
    method: 'get'
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

