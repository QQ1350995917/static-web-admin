import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import settings from './modules/settings'
import accessAdminAccess from './modules/access/Access'
import accessAdminMenu from './modules/access/Menu'
import accessAdminRole from './modules/access/Role'
import accountAdmin from './modules/account/admin'
import accountKey from './modules/account/key'
import accountSession from './modules/account/session'
import educationArticle from './modules/education/article'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    settings,
    accessAdminAccess,
    accessAdminMenu,
    accessAdminRole,
    accountAdmin,
    accountKey,
    accountSession,
    educationArticle
  },
  getters
})

export default store
