import request from '@/utils/request'

export function requestTermsApi() {
  return request({
    url: '/service/education/api/edu/term?scopes=' + encodeURI(JSON.stringify([{"hit":"EM","fieldName":"pid","fieldValue":0}]))  + "&sorts=" + encodeURI(JSON.stringify([{"fieldName":"id","sort":"asc"}])),
    method: 'get'
  })
}
export function requestGradesApi(pid) {
  console.log("x" + pid)
  return request({
    url: '/service/education/api/edu/term?scopes=' + encodeURI(JSON.stringify([{"hit":"EM","fieldName":"pid","fieldValue":pid}]))  + "&sorts=" + encodeURI(JSON.stringify([{"fieldName":"id","sort":"asc"}])),
    method: 'get'
  })
}
export function requestStagesApi(pid) {
  return request({
    url: '/service/education/api/edu/term?scopes=' + encodeURI(JSON.stringify([{"hit":"EM","fieldName":"pid","fieldValue":pid}]))  + "&sorts=" + encodeURI(JSON.stringify([{"fieldName":"id","sort":"asc"}])),
    method: 'get'
  })
}
export function requestCoursesApi(tid) {
  return request({
    url: '/service/education/api/edu/term/course?scopes=' + encodeURI(JSON.stringify([{"hit":"EM","fieldName":"tid","fieldValue":tid}]))  + "&sorts=" + encodeURI(JSON.stringify([{"fieldName":"id","sort":"asc"}])),
    method: 'get'
  })
}
export function requestTextbooksApi(tid,cid) {
  return request({
    url: '/service/education/api/edu/term/course/textbook?scopes=' + encodeURI(JSON.stringify([{"hit":"EM","fieldName":"tid","fieldValue":tid},{"hit":"EM","fieldName":"cid","fieldValue":cid}]))  + "&sorts=" + encodeURI(JSON.stringify([{"fieldName":"id","sort":"asc"}])),
    method: 'get'
  })
}
export function requestArticlesApi(pid) {
  return request({
    url: '/service/education/api/edu/term/course/textbook/article?scopes=' + encodeURI(JSON.stringify([{"hit":"EM","fieldName":"pid","fieldValue":pid}]))  + "&sorts=" + encodeURI(JSON.stringify([{"fieldName":"id","sort":"asc"}])),
    method: 'get'
  })
}
