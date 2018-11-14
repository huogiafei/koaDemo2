const childRouters = [
    {
        path:'index',
        name:'webIndex',
        component: () => import('../views/web/WebIndex'),
        meta:{title:'website index'},
    },
    {
        path:'product',
        name:'webProduct',
        component: () => import('../views/web/WebProduct'),
        meta:{title:'website product'},
    },
]
export default childRouters