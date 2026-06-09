import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue'
import AgendaPoints from '../pages/AgendaPoints.vue'
import BoSMembers from '../pages/BoSMembers.vue'
import AboutDept from '../pages/AboutDept.vue'
import AboutInstitution from '../pages/AboutInstitution.vue'
import ProposedCurriculum from '../pages/ProposedCurriculum.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/agenda-points',
    component: AgendaPoints
  },
  {
    path: '/bos-members',
    component: BoSMembers
  },
  {
    path: '/about-department',
    component: AboutDept
  },
  {
    path: '/about-institution',
    component: AboutInstitution
  },
  {
    path: '/proposed-curriculum',
    component: ProposedCurriculum
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
