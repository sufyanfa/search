import { createRouter, createWebHistory } from 'vue-router'
/* Guest */
import Welcome from './Search.vue'
import CreateGroup from './CreateGroup.vue'
import CreateBGroup from './CreateBGroup.vue'
import About from './About.vue'

/* Guest */



const routes = [
  { path: '/', name: 'Welcome', component: Welcome, meta: {
      middleware: "guest",
      title: `البحث عن الشعبة`
    }
  },
  {
    path: '/create-group', name: 'CreateGroup', component: CreateGroup, meta: {
      middleware: "auth",
      title:`إنشاء قروب`
    }
  },
  {
    path: '/create-public-group', name: 'CreateBGroup', component: CreateBGroup, meta: {
      middleware: "auth",
      title:`إنشاء قروب عام`
    }
  },
  {
    path: '/about', name: 'About', component: About, meta: {
      middleware: "auth",
      title:`قروب الجامعة`
    }
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router