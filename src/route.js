import { createRouter, createWebHistory } from 'vue-router'
/* Guest */
import Welcome from './Search.vue'

import CreateGroup from './CreateGroup.vue'
import CreateBGroup from './CreateBGroup.vue'
import CreateSubject  from './CreateSubject.vue'
import CreatePage from './CreatePage.vue'
import About from './About.vue'
import SignUp from './SignUp.vue'
import LogIn from './LogIn.vue'

import PageNotFound from './PageNotFound.vue'


/* Guest */



const routes = [
  { path: '/', name: 'Welcome', component: Welcome, meta: {
      middleware: "guest",
      title: `قروبات الجامعة`
    }
  },
  {
    path: '/create', name: 'CreatePage', component: CreatePage , meta: {
      middleware: "auth",
      title:`إضافة قروبات`
    }
  },
  {
    path: '/create-group', name: 'CreateGroup', component: CreateGroup, meta: {
      middleware: "auth",
      title:`إضافة قروب`
    }
  },
  {
    path: '/create-public-group', name: 'CreateBGroup', component: CreateBGroup, meta: {
      middleware: "auth",
      title:`إضافة قروب عام`
    }
  },
  {
    path: '/create-subject', name: 'CreateSubject', component: CreateSubject, meta: {
      middleware: "auth",
      title:`إضافة قروب عام`
    }
  },
  {
    path: '/about', name: 'About', component: About, meta: {
      middleware: "auth",
      title:`قروبات الجامعة`
    }
  },
  { path: '/signup', name: 'SignUp', component: SignUp, meta: {
    middleware: "guest",
    title: `قروبات الجامعة | حساب جديد`
  }
},
{ path: '/login', name: 'LogIn', component: LogIn, meta: {
    middleware: "guest",
    title: `قروبات الجامعة | تسجيل دخول`
  }
},
  {path: '/:pathMatch(.*)*', name: 'PageNotFound', component: PageNotFound, meta: {
    title: `عزام | صفحة غير موجودة`
  }
},

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.meta.middleware == "guest") {
    next()
  } else {
      if (sessionStorage.getItem('token')) {
          next()
      } else {
          next({ name: "LogIn" })
      }
  }
})

export default router