/**
 * Created by pwd on 05/01/2017.
 */
import request from '@/utils/request'

export function getPublicKey() {
  return request({
    url: '/api/admin/key/public/admin',
    method: 'GET'
  })
}
