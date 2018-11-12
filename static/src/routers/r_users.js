const childRouters = [
    {
        path:'edit',
        name:'userEdit',
        component: () => import('../views/user/EditUser'),
        meta:{title:'User Edit'},
        children:[{
            path:':id',
            component: () => import('../views/user/EditUser')
        }]
    },
    {
        path:'list',
        name:'userList',
        component: () => import('../views/user/UserList'),
        meta:{title:'User List'},
    },
]
export default childRouters