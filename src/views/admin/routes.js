import lazy from '../../components/helper/lazy'
import Layout from '../../components/admin/layout'
import PageNotFound from '../../components/NotFound'

import Home from './home'
const Edit = lazy(() => import('./article/edit'))
const ArticleManage = lazy(() => import('./article/manage'))
const Upload = lazy(() => import('./multi/upload'))
const UploadManage = lazy(() => import('./multi/manage'))
const UserManage = lazy(() => import('./user'))
const Login = lazy(() => import('./login'))

export default {
  path: 'admin',
  component: Layout,
  childRoutes: [
    { path: '', icon: 'home', name: '首页', component: Home },
    {
      path: 'articles',
      icon: 'edit',
      name: '文章管理',
      childRoutes: [
        { path: 'edit', icon: 'edit', name: '新增文章', component: Edit },
        { path: 'manage', icon: 'folder', name: '管理文章', component: ArticleManage }
      ]
    },
    {
      path: 'multimanage',
      icon: 'upload',
      name: '文件管理',
      childRoutes: [
        { path: 'edit', icon: 'upload', name: '上传文件', component: Upload },
        { path: 'manage', icon: 'folder', name: '管理文件', component: UploadManage }
      ]
    },
    { path: 'usermanage', icon: 'user', name: '用户管理', component: UserManage },
    { path: 'login', component: Login },
    { path: '*', component: PageNotFound }
  ]
}
