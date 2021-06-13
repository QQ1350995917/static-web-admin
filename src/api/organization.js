import request from '@/utils/request'

export function fetchNodeList(page,scopes,sorts) {
  return request({
    url: '/service/organization/api/organization?page=' + encodeURI(JSON.stringify(page)) + "&scopes=" + encodeURI(JSON.stringify(scopes)) + "&sorts=" + encodeURI(JSON.stringify(sorts)),
    method: 'get'
  })
}

export function createNode(params) {
  var data = {'pid':params.pid,'name':params.name};
  return request({
    url: '/service/organization/api/organization',
    method: 'post',
    data
  })
}

export function editNode(params) {
  var data = {'id':params.id,'name':params.name};
  console.log(data)
  return request({
    url: '/service/organization/api/organization/' + data.id,
    method: 'patch',
    data
  })
}

export function deleteNode(id) {
  return request({
    url: '/service/organization/api/organization/' + id + '',
    method: 'delete'
  })
}

