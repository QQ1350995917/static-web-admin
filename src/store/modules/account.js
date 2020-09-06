import {
  adminCreate,
  adminUserList,
  adminUserInfo,
  adminUserEnable,
  adminUserDisable,
  adminUserDelete,
  adminAccountList
} from '@/api/account'

import {
  userCreate,
  userUserList,
  userUserInfo,
  userUserEnable,
  userUserDisable,
  userUserDelete,
  userAccountList
} from '@/api/account'

const actions = {
  adminCreate(commit, state){
    return new Promise((resolve, reject) => {
      const {accountName, accountPwd, userName, pin, empNo, level, gender, summary} = state
      adminCreate({
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
  adminUserList(commit, query) {
    return new Promise((resolve, reject) => {
      adminUserList(query.page, query.scopes, query.sorts).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  adminUserInfo(commit, uid){
    return new Promise((resolve, reject) => {
      adminUserInfo(uid).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  adminUserEnable(commit, uids){
    return new Promise((resolve, reject) => {
      adminUserEnable(uids).then(response => {
        if (response.meta.code == 200) {
          resolve(response.data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  adminUserDisable(commit, uids){
    return new Promise((resolve, reject) => {
      adminUserDisable(uids).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  adminUserDelete(commit, uids){
    return new Promise((resolve, reject) => {
      adminUserDelete(uids).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  adminAccountList(commit, uid){
    return new Promise((resolve, reject) => {
      adminAccountList(uid).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userCreate(commit, state){
    return new Promise((resolve, reject) => {
      const {accountName, accountPwd, userName, pin, empNo, level, gender, summary} = state
      userCreate({
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
  userUserList(commit, query) {
    return new Promise((resolve, reject) => {
      userUserList(query.page, query.scopes, query.sorts).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userUserInfo(commit, uid){
    return new Promise((resolve, reject) => {
      userUserInfo(uid).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userUserEnable(commit, uids){
    return new Promise((resolve, reject) => {
      userUserEnable(uids).then(response => {
        if (response.meta.code == 200) {
          resolve(response.data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  userUserDisable(commit, uids){
    return new Promise((resolve, reject) => {
      userUserDisable(uids).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userUserDelete(commit, uids){
    return new Promise((resolve, reject) => {
      userUserDelete(uids).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userAccountList(commit, uid){
    return new Promise((resolve, reject) => {
      userAccountList(uid).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  actions
}
