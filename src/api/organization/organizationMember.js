import request from '@/utils/request'


export function fetchOrgMemberList(page,scopes,sorts) {
  return request({
    url: '/service/organization/api/organization/member?page=' + encodeURI(JSON.stringify(page)) + "&scopes=" + encodeURI(JSON.stringify(scopes)) + "&sorts=" + encodeURI(JSON.stringify(sorts)),
    method: 'get'
  })
}

export function bindUserToOrg(orgId,memId) {
  return request({
    url: '/service/organization/api/organization/member/' + orgId + "/" + memId,
    method: 'post'
  })
}


