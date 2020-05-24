import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/book/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/book/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/book/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/book/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/book/update',
    method: 'post',
    data
  })
}
