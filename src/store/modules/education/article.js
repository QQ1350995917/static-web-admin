import {
  list,
  detail
} from '@/api/education/article'

const actions = {

  list(commit, query) {
    return new Promise((resolve, reject) => {
      list(query.page, query.scopes, query.sorts).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  detail(commit, uid){
    return new Promise((resolve, reject) => {
      detail(uid).then(response => {
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
