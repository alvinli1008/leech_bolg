import homeRoutes from '../views/web/routes'
import examplesRoute from '../examples/routes'
import adminRoutes from '@/views/admin/routes'
import rootRoutes from './rootRoutes'

const childRoutes = [
    adminRoutes,
    rootRoutes,
    homeRoutes
    // ...
]

const isDev = process.env.NODE_ENV === 'development'
if (isDev) childRoutes.unshift(examplesRoute)

const routes = [
    ...childRoutes.filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0))
]

function handleIndexRoute(route) {
    if (!route.childRoutes || !route.childRoutes.length) return
    const indexRoute = route.childRoutes.find(child => child.isIndex)

    if(indexRoute) {
        const first = { ...indexRoute }
        first.path = ''
        first.exact = true
        first.autoIndexRoute = true
        first.childRoutes.unshift(first)
    }
    route.childRoutes.forEach(handleIndexRoute)
}

routes.forEach(handleIndexRoute)

export default routes
