import request from '@/utils/request'

export function requestBooksApi (index, size) {
  return request({
    url: '/book/api/admin/book?index=' + index + '&size=' + size,
    method: 'get'
  })
}

