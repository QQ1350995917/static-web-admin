import request from '@/utils/request'

export function adminCreate(params) {
  return request({
    url: '/account/api/admin/admin',
    method: 'post',
    data: params
  })
}

export function adminUserList(page, scopes, sorts) {
  return request({
    url: '/account/api/admin/admin/user?page=' + encodeURI(JSON.stringify(page)) + "&scopes=" + encodeURI(JSON.stringify(scopes)) + "&sorts=" + encodeURI(JSON.stringify(sorts)),
    method: 'get'
  })
}

export function adminUserInfo(uid) {
  return request({
    url: '/account/api/admin/admin/user/' + uid,
    method: 'get'
  })
}

export function adminUserEnable(uids) {
  return request({
    url: '/account/api/admin/admin/user/enable',
    method: 'patch',
    data: uids
  })
}

export function adminUserDisable(uids) {
  return request({
    url: '/account/api/admin/admin/user/disable',
    method: 'patch',
    data: uids
  })
}

export function adminUserDelete(uids) {
  return request({
    url: '/account/api/admin/admin/user',
    method: 'delete',
    data: uids
  })
}

export function adminAccountList(uid,page, scopes, sorts) {
  return request({
    url: '/account/api/admin/admin/account/' + uid + '?page=' + encodeURI(JSON.stringify(page)) + "&scopes=" + encodeURI(JSON.stringify(scopes)) + "&sorts=" + encodeURI(JSON.stringify(sorts)),
    method: 'get'
  })
}


export function adminAccountEnable(params) {
  return request({
    url: '/account/api/admin/admin/account/enable?userId=' + params.userId + '&accountId=' + params.accountId,
    method: 'patch'
  })
}

export function adminAccountDisable(params) {
  return request({
    url: '/account/api/admin/admin/account/disable?userId=' + params.userId + '&accountId=' + params.accountId,
    method: 'patch'
  })
}

export function adminAccountDelete(params) {
  return request({
    url: '/account/api/admin/admin/account?userId=' + params.userId + '&accountId=' + params.accountId,
    method: 'delete'
  })
}

export function userCreate(params) {
  return request({
    url: '/account/api/admin/user',
    method: 'post',
    data: params
  })
}
export function userUserList(page, scopes, sorts) {
  return request({
    url: '/account/api/admin/user/user?page=' + encodeURI(JSON.stringify(page)) + "&scopes=" + encodeURI(JSON.stringify(scopes)) + "&sorts=" + encodeURI(JSON.stringify(sorts)),
    method: 'get'
  })
}
export function userUserInfo(uid) {
  return request({
    url: '/account/api/admin/user/' + uid,
    method: 'get'
  })
}

export function userUserEnable(uids) {
  return request({
    url: '/account/api/admin/user/user/enable',
    method: 'patch',
    data: uids
  })
}

export function userUserDisable(uids) {
  return request({
    url: '/account/api/admin/user/user/disable',
    method: 'patch',
    data: uids
  })
}

export function userUserDelete(uids) {
  return request({
    url: '/account/api/admin/user/user',
    method: 'delete',
    data: uids
  })
}

export function userAccountList(uid) {
  return request({
    url: '/account/api/admin/user/account/' + uid,
    method: 'get'
  })
}

export function userAccountEnable(uids) {
  return request({
    url: '/account/api/user/account/enable',
    method: 'patch',
    data: uids
  })
}

export function userAccountDisable(uids) {
  return request({
    url: '/account/api/user/account/disable',
    method: 'patch',
    data: uids
  })
}

export function userAccountDelete(uids) {
  return request({
    url: '/account/api/user/account',
    method: 'delete',
    data: uids
  })
}
