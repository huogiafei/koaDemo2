module.exports = [
    {
        path:'edit',
        name:'userEdit',
        component: () => import('../views/user/EditUser'),
        children:[{
            path:'/:id',
            component: () => import('../views/user/EditUser')
        }]
    },
    {
        path:'list',
        name:'userList',
        component: () => import('../views/user/UserList')
    },
]