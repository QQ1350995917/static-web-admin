import request from '@/utils/request'

export function fetchNodeList(page,scopes,sorts) {
  return request({
    url: '/service/organization/api/organization?page=' + encodeURI(JSON.stringify(page)) + "&scopes=" + encodeURI(JSON.stringify(scopes)) + "&sorts=" + encodeURI(JSON.stringify(sorts)),
    method: 'get'
  })
}

export function createNode(data) {
  return request({
    url: '/service/organization/api/organization',
    method: 'post',
    data
  })
}

export function deleteNode(id) {
  console.log(id)
  return request({
    url: '/service/organization/api/organization/' + id + '',
    method: 'delete'
  })
}

