import { adminUserList } from '@/api/admin'

const actions = {
  adminList({commit, state}) {
    return new Promise((resolve, reject) => {
      adminUserList(state).then(response => {
        const data = response
        resolve(data)
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
