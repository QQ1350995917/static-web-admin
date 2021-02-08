/**
 * Created by pwd on 05/01/2017.
 */
import {
  getAdminPublicKey,
  getUserPublicKey,
  refreshAdminPublicKey,
  refreshUserPublicKey,
} from '@/api/account/key'

const actions = {
  getAdminPublicKey() {
    return new Promise((resolve, reject) => {
      getAdminPublicKey().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUserPublicKey() {
    return new Promise((resolve, reject) => {
      getUserPublicKey().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  refreshAdminPublicKey() {
    return new Promise((resolve, reject) => {
      refreshAdminPublicKey().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  refreshUserPublicKey() {
    return new Promise((resolve, reject) => {
      refreshUserPublicKey().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}
