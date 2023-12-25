export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          { name: 'Login', path: '/user/login', component: './user/Login' },
          { name: 'Register', path: '/user/register', component: './user/Register' },
          { name: 'ResetPassword', path: '/user/resetPassword', component: './user/ResetPassword' },
        ],
      },
      { component: './404' },
    ],
  },
  { name: 'Framework', path: '/framework', icon: 'HeatMap', component: './framework' },

  { name: 'Report', path: '/add_chart', icon: 'LineChart', component: './addChart' },

  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: 'AdminPage',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', component: './Admin' },
    ],
  },

  { path: '/', redirect: '/framework' },
  // { path: '*', layout: false, component: './404' },
  { path: '*', layout: false, component: './404' },
];
