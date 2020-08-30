import request from '@/utils/request'

export function adminUserList() {
  return request({
    url: '/account/api/admin/admin/user',
    method: 'get'
  })
}
