import request from '@/utils/request'

export function requestHostsApi(index, size) {
  return request({
    url: '/monitor/api/admin/host',
    method: 'get'
  })
}

export function requestHostCpuStatApi(groupName, nodeName,times) {
  return request({
    // url: '/monitor/api/admin/host/cpu/stat/statistics/' + groupName + '/' + nodeName + '/' + times,
    url: '/monitor/api/admin/host/cpu/stat/statistics/test-group/test-nodename/7',
    method: 'get'
  })
}

