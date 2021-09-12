import request from '@/utils/request'

export function create(params) {
  return request({
    url: '/service/access/api/admin/menu',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/service/access/api/admin/menu/' + params.id,
    method: 'patch',
    data: params
  })
}

export function list(page, scopes, sorts) {
  return request({
    url: '/service/access/api/admin/menu?page=' + encodeURI(JSON.stringify(page)) + "&scopes=" + encodeURI(JSON.stringify(scopes)) + "&sorts=" + encodeURI(JSON.stringify(sorts)),
    method: 'get'
  })
}

export function detail(id) {
  return request({
    url: '/service/access/api/admin/menu/' + id,
    method: 'get'
  })
}

export function enable(uids) {
  return request({
    url: '/service/access/api/admin/menu/enable',
    method: 'patch',
    data: uids
  })
}

export function disable(uids) {
  return request({
    url: '/service/access/api/admin/menu/disable',
    method: 'patch',
    data: uids
  })
}

export function del(uids) {
  return request({
    url: '/service/access/api/admin/menu',
    method: 'delete',
    data: uids
  })
}

