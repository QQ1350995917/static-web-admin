import { list } from '@/api/orgnaization'
import { getToken } from '@/utils/auth'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  status: 0,
  roles: []
}

const actions = {
  // get user info
  listOrg({ commit, state }) {
    return new Promise((resolve, reject) => {
      list(state).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        console.log('err : ' + response)
        reject(error)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  actions
}
