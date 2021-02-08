/**
 * Created by pwd on 05/01/2017.
 */
import request from '@/utils/request'

export function getAdminPublicKey() {
  return request({
    url: '/service/account/api/admin/key/public',
    method: 'GET'
  })
}

export function getUserPublicKey() {
  return request({
    url: '/service/account/api/key/public',
    method: 'GET'
  })
}

export function refreshAdminPublicKey() {
  return request({
    url: '/service/account/api/admin/key/refresh',
    method: 'PUT'
  })
}

export function refreshUserPublicKey() {
  return request({
    url: '/service/account/api/admin/key/refresh/user',
    method: 'PUT'
  })
}
