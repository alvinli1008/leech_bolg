
import Layout from '../components/examples/layout'
import WelcomePage from './index'
import FormBuilder from './FormBuilder'
import Test from './test'

export default {
  path: 'examples',
  component: Layout,
  childRoutes: [
    { path: '', name: 'Welcome page', component: WelcomePage },
    { path: 'form/:formId', component: FormBuilder },
    { path: 'test', component: Test }
  ]
}
