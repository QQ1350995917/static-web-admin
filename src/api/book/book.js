import request from '@/utils/request'

export function requestCreateBookApi(editBook) {
  return request({
    url: '/book/api/admin/book',
    method: 'post',
    data: editBook
  })
}

export function requestBookApi(bookId) {
  return request({
    url: '/book/api/admin/book/' + bookId,
    method: 'get'
  })
}

export function requestBooksApi(index, size) {
  return request({
    url: '/book/api/admin/book?index=' + index + '&size=' + size,
    method: 'get'
  })
}

export function requestBookTablesApi(bookId, index, size) {
  return request({
    url: '/book/api/admin/book/' + bookId + "/" + index + "/" + size,
    method: 'get'
  })
}

export function requestUpdateBookApi(bookId, editBook) {
  return request({
    url: '/book/api/admin/book/' + bookId,
    method: 'put',
    data: editBook
  })
}

export function requestRecommendBooksApi(bookIds) {
  return request({
    url: '/book/api/admin/book/recommend',
    method: 'put',
    data: bookIds
  })
}

export function requestRecommendCancelBooksApi(bookIds) {
  return request({
    url: '/book/api/admin/book/recommend/cancel',
    method: 'put',
    data: bookIds
  })
}

export function requestVisibleBooksApi(bookIds) {
  return request({
    url: '/book/api/admin/book/visible',
    method: 'put',
    data: bookIds
  })
}

export function requestVisibleCancelBooksApi(bookIds) {
  return request({
    url: '/book/api/admin/book/visible/cancel',
    method: 'put',
    data: bookIds
  })
}

export function requestDeleteBooksApi(bookIds) {
  return request({
    url: '/book/api/admin/book/delete',
    method: 'put',
    data: bookIds
  })
}

export function requestDeleteCancelBooksApi(bookIds) {
  return request({
    url: '/book/api/admin/book/delete/cancel',
    method: 'put',
    data: bookIds
  })
}

