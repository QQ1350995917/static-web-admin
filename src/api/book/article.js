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

export function requestCreateArticleApi(article) {
  return request({
    url: '/book/api/admin/article',
    method: 'post',
    data: article
  })
}

export function requestUpdateArticleApi(articleId, article) {
  return request({
    url: '/book/api/admin/article/' + articleId,
    method: 'put',
    data: article
  })
}

export function requestRecommendArticlesApi(articleIds) {
}
export function requestRecommendCancelArticlesApi(articleIds) {
}

export function requestVisibleArticlesApi(articleIds) {
  return request({
    url: '/book/api/admin/article/visible',
    method: 'put',
    data: articleIds
  })
}
export function requestVisibleCancelArticlesApi(articleIds) {
  return request({
    url: '/book/api/admin/article/visible/cancel',
    method: 'put',
    data: articleIds
  })
}

export function requestDeleteArticlesApi(articleIds) {
  return request({
    url: '/book/api/admin/article/delete',
    method: 'put',
    data: articleIds
  })
}
export function requestDeleteCancelArticlesApi(articleIds) {
  return request({
    url: '/book/api/admin/article/delete/cancel',
    method: 'put',
    data: articleIds
  })
}
