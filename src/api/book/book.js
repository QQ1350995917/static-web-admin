import request from '@/utils/request'

export function requestBooksApi (index, size) {
  return request({
    url: '/book/api/admin/book?index=' + index + '&size=' + size,
    method: 'get'
  })
}

export function requestBookTablesApi (bookId, index, size) {
  return request({
    url: '/book/api/admin/book/' + bookId + "/" + index + "/" + size,
    method: 'get'
  })
}

