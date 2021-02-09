import request from '@/utils/request'

export function list(page, scopes, sorts) {
  return request({
    url: '/service/education/api/admin/article/table?page=' + encodeURI(JSON.stringify(page)) + "&scopes=" + encodeURI(JSON.stringify(scopes)) + "&sorts=" + encodeURI(JSON.stringify(sorts)),
    method: 'get'
  })
}

export function detail(articleId) {
  return request({
    url: '/service/education/api/admin/article/content/' + articleId,
    method: 'get'
  })
}

