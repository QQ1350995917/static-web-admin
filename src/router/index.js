import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['account','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/organization',
    component: Layout,
    redirect: 'index',
    name: 'Organization',
    meta: {
      title: 'Organization',
      icon: 'peoples'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/organization/list'),
        name: 'OrgList',
        meta: { title: 'OrgList', icon: 'list' }
      },
      {
        path: 'create',
        component: () => import('@/views/organization/create'),
        name: 'CreateOrg',
        meta: { title: 'CreateOrg', icon: 'edit' },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/organization/edit'),
        name: 'EditOrg',
        meta: { title: 'EditOrg', noCache: true },
        hidden: true
      },
      {
        path: 'detail/:id(\\d+)',
        component: () => import('@/views/organization/detail'),
        name: 'OrgDetail',
        meta: { title: 'OrgDetail', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/access',
    component: Layout,
    redirect: '/access/index',
    name: 'access',
    meta: {
      title: 'Access',
      icon: 'user'
    },
    children: [
      {
        path: 'access/Access',
        component: () => import('@/views/access/Access'),
        name: 'Access',
        meta: { title: 'Access', icon: 'list' }
      },
      {
        path: 'access/Menu',
        component: () => import('@/views/access/Menu'),
        name: 'Menu',
        meta: { title: 'Menu', icon: 'list' }
      },
      {
        path: 'access/Role',
        component: () => import('@/views/access/Role'),
        name: 'Role',
        meta: { title: 'Role', icon: 'list' }
      },
    ]
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/list',
    name: 'account',
    meta: {
      title: 'Account',
      icon: 'user'
    },
    children: [
      {
        path: 'admin/list',
        component: () => import('@/views/account/AdminList'),
        name: 'AdminList',
        meta: { title: 'AdminList', icon: 'list' }
      },
      {
        path: 'admin/detail/:id(\\d+)',
        component: () => import('@/views/account/AdminDetail'),
        name: 'AdminDetail',
        meta: { title: 'AdminDetail', noCache: true },
        hidden: true
      },
      {
        path: 'user/list',
        component: () => import('@/views/account/UserList'),
        name: 'UserList',
        meta: { title: 'UserList', icon: 'list' }
      },
      {
        path: 'user/create',
        component: () => import('@/views/account/UserCreate'),
        name: 'UserCreate',
        meta: { title: 'UserCreate', icon: 'edit' }
      },
      {
        path: 'user/detail/:id(\\d+)',
        component: () => import('@/views/account/UserDetail'),
        name: 'UserDetail',
        meta: { title: 'UserDetail', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/book',
    component: Layout,
    redirect: 'book',
    name: 'Book',
    meta: {
      title: 'Book',
      icon: 'documentation'
    },
    children: [
      {
        path: 'search',
        component: () => import('@/views/book/search'),
        name: 'Book-Search',
        meta: { title: 'Search', icon: 'documentation' }
      },
      {
        path: 'book',
        component: () => import('@/views/book/book'),
        name: 'Book-Book',
        meta: { title: 'Book', icon: 'documentation' }
      },
      {
        path: 'article',
        component: () => import('@/views/book/article'),
        name: 'Book-Article',
        meta: { title: 'Article', icon: 'documentation' }
      },
      {
        path: 'articleDetail',
        component: () => import('@/views/book/articleDetail'),
        name: 'Book-ArticleDetail',
        meta: { title: 'ArticleDetail', icon: 'documentation' },
        hidden: true
      },
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    redirect: 'monitor',
    name: 'Monitor',
    meta: {
      title: 'Monitor',
      icon: 'documentation'
    },
    children: [
      {
        path: 'HostDashboard',
        component: () => import('@/views/monitor/dashboard'),
        name: 'HostDashboard',
        meta: { title: 'HostDashboard', icon: 'documentation' }
      },
      {
        path: 'Host',
        component: () => import('@/views/monitor/host'),
        name: 'Host',
        meta: { title: 'Host', icon: 'documentation' }
      },
      {
        path: 'Process',
        component: () => import('@/views/monitor/process'),
        name: 'Process',
        meta: { title: 'Process', icon: 'documentation' }
      },
    ]
  },
  {
    path: '/search',
    component: Layout,
    redirect: 'search',
    name: 'Search',
    meta: {
      title: 'Search',
      icon: 'documentation'
    },
    children: [
      {
        path: 'metadata',
        component: () => import('@/views/search/metadata'),
        name: 'Search-Metadata',
        meta: { title: 'Metadata', icon: 'documentation' }
      },
      {
        path: 'document',
          component: () => import('@/views/search/document'),
        name: 'Search-Document',
        meta: { title: 'Document', icon: 'documentation' }
      },
    ]
  },
  {
    path: '/typeface',
    component: Layout,
    redirect: 'index',
    name: 'Typeface',
    meta: {
      title: 'Typeface',
      icon: 'documentation'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/typeface/index'),
        name: 'Typeface-Index',
        meta: { title: 'Index', icon: 'documentation' }
      },
      {
        path: 'font',
        component: () => import('@/views/typeface/font'),
        name: 'Typeface-Font',
        meta: { title: 'Font', icon: 'documentation' }
      },
      {
        path: 'painting',
          component: () => import('@/views/typeface/painting'),
        name: 'Typeface-Painting',
        meta: { title: 'Painting', icon: 'documentation' }
      },
    ]
  },
  {
    path: '/edu',
    component: Layout,
    redirect: 'edu',
    name: 'Education',
    meta: {
      title: 'Education',
      icon: 'documentation'
    },
    children: [
      {
        path: 'studentSetting',
        component: () => import('@/views/education/studentSetting'),
        name: '学生选课',
        meta: { title: '学生选课', icon: 'documentation' }
      },
      {
        path: 'Article',
        component: () => import('@/views/education/article'),
        name: '同步课文',
        meta: { title: '同步课文', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: false }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user.js roles
*/
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/svg-icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'log',
        component: () => import('@/views/errorLog/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/exportExcel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/selectExcel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/mergeHeader'),
        name: 'MergeHeader',
        meta: { title: 'mergeHeader' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/uploadExcel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'pdf', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-account',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
