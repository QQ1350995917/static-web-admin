import request from '@/utils/request'

export function requestHostApi(scopeItems, index, size) {
  let scopes = []
  scopeItems.forEach(function (scopeItem) {
    scopes.push({"hit": "E", "fieldName": scopeItem.key, "fieldValue": scopeItem.value})
  })
  let page = {"index": index, "size": size}
  return request({
    url: '/monitor/api/admin/host?scopes=' + encodeURI(JSON.stringify(scopes)) + '&page=' + encodeURI(JSON.stringify(page)),
    method: 'get'
  })
}

export function requestHostCpuApi(scopeItems, index, size) {
  let scopes = []
  scopeItems.forEach(function (scopeItem) {
    scopes.push({"hit": "E", "fieldName": scopeItem.key, "fieldValue": scopeItem.value})
  })
  let page = {"index": index, "size": size}
  return request({
    url: '/monitor/api/admin/host/cpu?scopes=' + encodeURI(JSON.stringify(scopes)) + '&page=' + encodeURI(JSON.stringify(page)),
    method: 'get'
  })
}

export function requestHostCpuStatApi(scopeItems, index, size) {
  let scopes = []
  scopeItems.forEach(function (scopeItem) {
    scopes.push({"hit": "E", "fieldName": scopeItem.key, "fieldValue": scopeItem.value})
  })
  let page = {"index": index, "size": size}
  return request({
    url: '/monitor/api/admin/host/cpu/stat?scopes=' + encodeURI(JSON.stringify(scopes)) + '&page=' + encodeURI(JSON.stringify(page)),
    method: 'get'
  })
}

export function requestHostDiskStatApi(scopeItems, index, size) {
  let scopes = []
  scopeItems.forEach(function (scopeItem) {
    scopes.push({"hit": "E", "fieldName": scopeItem.key, "fieldValue": scopeItem.value})
  })
  let page = {"index": index, "size": size}
  return request({
    url: '/monitor/api/admin/host/disk/stat?scopes=' + encodeURI(JSON.stringify(scopes)) + '&page=' + encodeURI(JSON.stringify(page)),
    method: 'get'
  })
}

export function requestHostEthernetStatApi(scopeItems, index, size) {
  let scopes = []
  scopeItems.forEach(function (scopeItem) {
    scopes.push({"hit": "E", "fieldName": scopeItem.key, "fieldValue": scopeItem.value})
  })
  let page = {"index": index, "size": size}
  return request({
    url: '/monitor/api/admin/host/ethernet/stat?scopes=' + encodeURI(JSON.stringify(scopes)) + '&page=' + encodeURI(JSON.stringify(page)),
    method: 'get'
  })
}

export function requestHostLoadStatApi(scopeItems, index, size) {
  let scopes = []
  scopeItems.forEach(function (scopeItem) {
    scopes.push({"hit": "E", "fieldName": scopeItem.key, "fieldValue": scopeItem.value})
  })
  let page = {"index": index, "size": size}
  return request({
    url: '/monitor/api/admin/host/load/stat?scopes=' + encodeURI(JSON.stringify(scopes)) + '&page=' + encodeURI(JSON.stringify(page)),
    method: 'get'
  })
}

export function requestHostLoggedStatApi(scopeItems, index, size) {
  let scopes = []
  scopeItems.forEach(function (scopeItem) {
    scopes.push({"hit": "E", "fieldName": scopeItem.key, "fieldValue": scopeItem.value})
  })
  let page = {"index": index, "size": size}
  return request({
    url: '/monitor/api/admin/host/logged/stat?scopes=' + encodeURI(JSON.stringify(scopes)) + '&page=' + encodeURI(JSON.stringify(page)),
    method: 'get'
  })
}

export function requestHostMemoryStatApi(scopeItems, index, size) {
  let scopes = []
  scopeItems.forEach(function (scopeItem) {
    scopes.push({"hit": "E", "fieldName": scopeItem.key, "fieldValue": scopeItem.value})
  })
  let page = {"index": index, "size": size}
  return request({
    url: '/monitor/api/admin/host/memory/stat?scopes=' + encodeURI(JSON.stringify(scopes)) + '&page=' + encodeURI(JSON.stringify(page)),
    method: 'get'
  })
}

export function requestHostCpuStatStatisticsApi(groupName, nodeName, times) {
  return request({
    url: '/monitor/api/admin/host/cpu/stat/statistics/' + groupName + '/' + nodeName + '/' + times,
    method: 'get'
  })
}

export function requestHostDiskStatStatisticsApi(groupName, nodeName, times) {
  groupName = 'test-group'
  nodeName = 'test-nodename'
  times = 60
  return request({
    url: '/monitor/api/admin/host/cpu/stat/statistics/' + groupName + '/' + nodeName + '/' + times,
    method: 'get'
  })
}


