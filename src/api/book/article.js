import request from '@/utils/request'

export function requestArticlesApi(index, size) {
  return request({
    url: '/book/api/admin/article?index=' + index + '&size=' + size,
    method: 'get'
  })
}

export function articleDetailApi(articleId) {
  return request({
    url: '/book/api/admin/article/' + articleId,
    method: 'get'
  })
}
