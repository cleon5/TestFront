import Reloj from '../views/Timer.vue'
import Login from '../views/Login.vue'
import PageHome from '../views/Home.vue'
import GitProfile from '../views/GitProfile.vue'
import TodoList from '../views/TodoList.vue'


export default [
  {path:"/", component:PageHome},
  {path:"/login", component:Login},
  {path:"/git", component:GitProfile},
  {path:"/todolist", component:TodoList},
  {path:"/reloj", component:Reloj}
]

/*
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NavBar
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    }
  ]
})*/

//export default router