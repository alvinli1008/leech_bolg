import adminRoutes from '../views/admin/routes'

const childRoutes = [
    adminRoutes,

]

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
