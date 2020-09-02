import { create, userList, userInfo, userEnable, userDisable, userDelete, accountList } from '@/api/admin'

const actions = {
  create(commit, state){
    return new Promise((resolve, reject) => {
      const {accountName, accountPwd, userName, pin, empNo, level, gender, summary} = state
      create({
        user: {
          name: userName,
          pin: pin,
          empNo: empNo,
          level: level,
          gender: gender,
          summary: summary
        },
        account: {
          loginName: accountName,
          loginPwd: accountPwd
        }
      }).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userList(commit, query) {
    return new Promise((resolve, reject) => {
      userList(query.page, query.scopes, query.sorts).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userInfo(commit, uid){
    return new Promise((resolve, reject) => {
      userInfo(uid).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userEnable(commit, uids){
    return new Promise((resolve, reject) => {
      userEnable(uids).then(response => {
        if (response.meta.code == 200) {
          resolve(response.data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  userDisable(commit, uids){
    return new Promise((resolve, reject) => {
      userDisable(uids).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userDelete(commit,uids){
    return new Promise((resolve, reject) => {
      userDelete(uids).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userAccountList(commit, uid){
    return new Promise((resolve, reject) => {
      accountList(uid).then(response => {
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
