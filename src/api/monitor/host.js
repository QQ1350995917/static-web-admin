import request from '@/utils/request'

export function requestHostsApi(index, size) {
  return request({
    url: '/monitor/api/admin/host',
    method: 'get'
  })
}

export function requestHostCpuStatApi(index, size) {
  return request({
    url: '/monitor/api/admin/host/cpu/stat',
    method: 'get'
  })
}

