import request from '@/utils/request'

export function create(params) {
  return request({
    url: '/service/access/api/admin/role',
    method: 'post',
    data: params
  })
}

export function edit(params) {
  return request({
    url: '/service/access/api/admin/role/' + params.id,
    method: 'patch',
    data: params
  })
}

export function list(page, scopes, sorts) {
  return request({
    url: '/service/access/api/admin/role?page=' + encodeURI(JSON.stringify(page)) + "&scopes=" + encodeURI(JSON.stringify(scopes)) + "&sorts=" + encodeURI(JSON.stringify(sorts)),
    method: 'get'
  })
}

export function detail(id) {
  return request({
    url: '/service/access/api/admin/role/' + id,
    method: 'get'
  })
}

export function enable(ids) {
  return request({
    url: '/service/access/api/admin/role/enable',
    method: 'patch',
    data: ids
  })
}

export function disable(ids) {
  return request({
    url: '/service/access/api/admin/role/disable',
    method: 'patch',
    data: ids
  })
}

export function del(ids) {
  return request({
    url: '/service/access/api/admin/role',
    method: 'delete',
    data: ids
  })
}

