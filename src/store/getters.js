const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.accountSession.token,
  avatar: state => state.accountSession.avatar,
  name: state => state.accountSession.name,
  introduction: state => state.accountSession.introduction,
  roles: state => state.accountSession.roles,
  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  errorLogs: state => state.errorLog.logs
}
export default getters

// state后边的变量是store/index.js中的modules
