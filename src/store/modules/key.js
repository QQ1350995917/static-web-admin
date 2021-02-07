/**
 * Created by pwd on 05/01/2017.
 */
import { getPublicKey } from '@/api/key'

const actions = {
  getPublicKey() {
    console.log("key")
    return new Promise((resolve, reject) => {
      getPublicKey().then(response => {
        console.log("key=" + response)
        resolve(response)
      }).catch(error => {
        console.log("key=" + error)
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}
