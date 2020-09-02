import request from '@/utils/request'

export function create(params) {
  return request({
    url: '/account/api/admin/admin',
    method: 'post',
    data: params
  })
}

export function userList(page, scopes, sorts) {
  return request({
    url: '/account/api/admin/admin/user?page=' + encodeURI(JSON.stringify(page)) + "&scopes="  + encodeURI(JSON.stringify(scopes))  + "&sorts="  + encodeURI(JSON.stringify(sorts)),
    method: 'get'
  })
}

export function userInfo(uid) {
  return request({
    url: '/account/api/admin/admin/user/' + uid,
    method: 'get'
  })
}

export function userEnable(uids) {
  return request({
    url: '/account/api/admin/admin/user/enable',
    method: 'patch',
    data: uids
  })
}

export function userDisable(uids) {
  return request({
    url: '/account/api/admin/admin/user/disable',
    method: 'patch',
    data: uids
  })
}

export function userDelete(uids) {
  return request({
    url: '/account/api/admin/admin/user',
    method: 'delete',
    data: uids
  })
}

export function accountList(uid) {
  return request({
    url: '/account/api/admin/admin/account/' + uid,
    method: 'get'
  })
}
