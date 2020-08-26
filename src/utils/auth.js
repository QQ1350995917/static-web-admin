import Cookies from 'js-cookie'

const tokenKey = 'Admin-Token'
const userIdKey = 'Admin-User-Id'
const accountIdKey = 'Admin-Account-Id'

export function getToken() {
  console.log("getToken=" + Cookies.get(tokenKey))
  return Cookies.get(tokenKey) == undefined ? '' : Cookies.get(tokenKey);
}
export function setToken(token) {
  console.log("setToken=" + token)
  return Cookies.set(tokenKey, token)
}
export function removeToken() {
  console.log("removeToken=")
  return Cookies.remove(tokenKey)
}

export function getUserId() {
  return Cookies.get(userIdKey) == undefined ? 0 : Cookies.get(userIdKey);
}
export function setUserId(uid) {
  return Cookies.set(userIdKey, uid)
}
export function removeUserId() {
  return Cookies.remove(userIdKey)
}

export function getAccountId() {
  return Cookies.get(accountIdKey) == undefined ? 0 : Cookies.get(accountIdKey);
}
export function setAccountId(aid) {
  return Cookies.set(accountIdKey, aid)
}
export function removeAccountId() {
  return Cookies.remove(accountIdKey)
}
