import request from '@/utils/request'

export function userCreate(params) {
  var data = {
    user:{
      empNo: params.empNo,
      gender: params.gender,
      level: params.level,
      name: params.userName,
      pin: params.pin,
      summary: params.summary
    },
    account:{
      loginName: params.accountName,
      loginPwd: params.accountPwd
    }
  }

  return request({
    url: '/service/account/api/admin/user',
    method: 'post',
    data: data
  })
}
export function userUserList(page, scopes, sorts) {
  return request({
    url: '/service/account/api/admin/user/user?page=' + encodeURI(JSON.stringify(page)) + "&scopes=" + encodeURI(JSON.stringify(scopes)) + "&sorts=" + encodeURI(JSON.stringify(sorts)),
    method: 'get'
  })
}
export function userUserInfo(uid) {
  return request({
    url: '/service/account/api/admin/user/' + uid,
    method: 'get'
  })
}

export function userUserEnable(uids) {
  return request({
    url: '/service/account/api/admin/user/user/enable',
    method: 'patch',
    data: uids
  })
}

export function userUserDisable(uids) {
  return request({
    url: '/service/account/api/admin/user/user/disable',
    method: 'patch',
    data: uids
  })
}

export function userUserDelete(uids) {
  return request({
    url: '/service/account/api/admin/user/user',
    method: 'delete',
    data: uids
  })
}

export function userAccountList(uid) {
  return request({
    url: '/service/account/api/admin/user/account/' + uid,
    method: 'get'
  })
}

export function userAccountEnable(uids) {
  return request({
    url: '/service/account/api/user/account/enable',
    method: 'patch',
    data: uids
  })
}

export function userAccountDisable(uids) {
  return request({
    url: '/service/account/api/user/account/disable',
    method: 'patch',
    data: uids
  })
}

export function userAccountDelete(uids) {
  return request({
    url: '/service/account/api/user/account',
    method: 'delete',
    data: uids
  })
}
