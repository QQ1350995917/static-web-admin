import {loginPageInit, refreshCaptcha, loginApi, logoutApi, getInfoApi} from '@/api/session'
import {getToken, getUserId, setToken, setUserId, removeToken, removeUserId} from '@/utils/auth'
import router, {resetRouter} from '@/router'

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
      loginPageInit().then(response => {
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
      loginApi({loginName: username.trim(), loginPwd: password.trim(), captcha: captchaExpect.trim()}).then(response => {
        // const { data } = response
        // commit('SET_TOKEN', response.data.token)
        // setToken(response.data.token)
        // setUserId(response.data.uid)
        // setAccountId(response.data.aid)
        resolve(response)
      }).catch(error => {
        console.log("error" + error)
        reject(error)
      })
    })
  },

  // get user info
  getInfo({commit, state}) {
    // return new Promise((resolve, reject) => {
    //   getInfoApi().then(response => {
    //     const data = response
    //     if (!data) {
    //       reject('Verification failed, please Login again.')
    //     }
    //     const { roles, name, avatar, introduction } = data.data
    //     console.log(roles)
    //     // roles must   be a non-empty array
    //     if (!roles || roles.length <= 0) {
    //       reject('getInfo: roles must be a non-null array!')
    //     }
    //
    //     commit('SET_ROLES', roles)
    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     commit('SET_INTRODUCTION', introduction)
    //     resolve(data.data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // user logout
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      logoutApi(state.token).then(() => {
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
