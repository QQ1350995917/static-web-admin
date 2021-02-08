import {
  init,
  refreshCaptcha,
  login,
  logout,
  getInfo
} from '@/api/account/session'

import {
  getToken,
  getUserId,
  setToken,
  setUserId,
  setAccountId,
  removeAnonymousToken,
  removeToken,
  removeUserId
} from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  init() {
    return new Promise((resolve, reject) => {
      init().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  captcha() {
    return new Promise((resolve, reject) => {
      refreshCaptcha().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user login
  login({commit}, userInfo) {
    const {username, password, captchaExpect} = userInfo
    return new Promise((resolve, reject) => {
      login({
        loginName: username.trim(),
        loginPwd: password.trim(),
        captcha: captchaExpect.trim()
      }).then(response => {
        if (response.meta.code == 200) {
          commit('SET_TOKEN', response.data.session.token)
          setToken(response.data.session.token)
          setUserId(response.data.session.uid)
          setAccountId(response.data.session.aid)
          removeAnonymousToken();
          resolve(response)
        } else {
          reject(response.meta)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        if (!response) {
          reject('Verification failed, please Login again.')
        }
        if (response.meta.code == 401) {
          reject('Session timeout, please Login again.')
        }
        const {roles, name, avatar, introduction} = response.data
        // roles must   be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeUserId()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({commit}) {
    console.log("resetToken")
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeUserId()
      resolve()
    })
  },

  // Dynamically modify permissions
  changeRoles({commit, dispatch}, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)
      setUserId("pwd-temp")

      const {roles} = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {root: true})

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
