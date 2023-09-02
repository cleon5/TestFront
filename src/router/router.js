import Reloj from '../views/Timer.vue'
import Login from '../views/Login.vue'
import GitProfile from '../views/GitProfile.vue'
import TodoList from '../views/TodoList.vue'


export default [
  {path:"/login", component:Login},
  {path:"/git", component:GitProfile},
  {path:"/todolist", component:TodoList},
  {path:"/reloj", component:Reloj}
]