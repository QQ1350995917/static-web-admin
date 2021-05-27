import request from '@/utils/request'

export function fetchRoot(data) {
  return request({
    url: '/service/organization/api/organization',
    method: 'get',
    params: data
  })
}

export function createRoot(data) {
  console.log("data:" + JSON.stringify(data))
  return request({
    url: '/service/organization/api/admin/org/root',
    method: 'post',
    data
  })
}

export function fetchList(data) {
  return request({
    url: '/service/organization/api/admin/org',
    method: 'get',
    params: data
  })
}
