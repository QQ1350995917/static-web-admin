import Vue from 'vue'
import Vuex from 'vuex'
import key from './modules/key'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import settings from './modules/settings'
import account from './modules/account'
import accountSession from './modules/account_session'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    key,
    app,
    errorLog,
    permission,
    tagsView,
    settings,
    account,
    accountSession,
  },
  getters
})

export default store
