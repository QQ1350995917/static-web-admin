import { adminUserList, adminCreate,adminUserInfo,adminAccountList } from '@/api/admin'

const actions = {
  adminList(commit, page, scopes, sorts) {
    return new Promise((resolve, reject) => {
      adminUserList(page, scopes, sorts).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
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
  adminUserAccountList(commit, uid){
    return new Promise((resolve, reject) => {
      adminAccountList(uid).then(response => {
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
