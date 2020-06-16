import request from '@/utils/request'

export function search (keyword, index, size) {
  return request({
    url: '/book/api/admin/search?keyword=' + keyword + '&index=' + index + '&size=' + size,
    method: 'get'
  })
}

export function searchBook (keyword, index, size) {
  return request({
    url: '/book/api/admin/search/book?keyword=' + keyword + '&index=' + index + '&size=' + size,
    method: 'get'
  })
}

export function searchArticle (keyword, index, size) {
  return request({
    url: '/book/api/admin/search/article?keyword=' + keyword + '&index=' + index + '&size=' + size,
    method: 'get'
  })
}
