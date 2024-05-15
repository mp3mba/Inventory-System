import React from "react";

//Authentication pages
const Login = React.lazy(() => import('./views/pages/Login'))
const Registration = React.lazy(() => import('./views/pages/Register'))

const routes = [
    {path: '/login', name: 'Login', element: Login},
    {path: '/registration', name: 'Registration', element: Registration},
]

export default routes