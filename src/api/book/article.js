import request from '@/utils/request'

export function requestArticlesApi(index, size) {
  return request({
    url: '/book/api/admin/article?index=' + index + '&size=' + size,
    method: 'get'
  })
}
