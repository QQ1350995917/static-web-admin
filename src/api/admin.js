import request from '@/utils/request'

export function adminUserList(page, scopes, sorts) {
  return request({
    url: '/account/api/admin/admin/user?page=' + encodeURI(JSON.stringify(page)),
    method: 'get'
  })
}

export function adminCreate(params) {
  return request({
    url: '/account/api/admin/admin',
    method: 'post',
    data: params
  })
}

export function adminUserInfo(uid) {
  return request({
    url: '/account/api/admin/admin/user/' + uid,
    method: 'get'
  })
}

export function adminAccountList(uid) {
  return request({
    url: '/account/api/admin/admin/account/' + uid,
    method: 'get'
  })
}
