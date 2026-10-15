import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ScreenView from '../views/ScreenView.vue'
import StageView from '../views/StageView.vue'
import FirearmsView from '../views/FirearmsView.vue'
import ChoreographyView from '../views/ChoreographyView.vue'
import NewsView from '../views/NewsView.vue'
import NewsDetailView from '../views/NewsDetailView.vue'
import CalendarView from '../views/CalendarView.vue'
import AgencyView from '../views/AgencyView.vue'
import ContactView from '../views/ContactView.vue'
import AdminView from '../views/AdminView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { newsBySlug } from '../data/content'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'School of performance combat' } },
    { path: '/screen', name: 'screen', component: ScreenView, meta: { title: 'Screen combat' } },
    { path: '/stage', name: 'stage', component: StageView, meta: { title: 'Stage combat' } },
    { path: '/firearms', name: 'firearms', component: FirearmsView, meta: { title: 'Firearms' } },
    { path: '/choreography', name: 'choreography', component: ChoreographyView, meta: { title: 'Choreography' } },
    { path: '/news', name: 'news', component: NewsView, meta: { title: 'News' } },
    { path: '/news/:slug', name: 'news-detail', component: NewsDetailView, meta: { title: 'News' } },
    { path: '/agency', name: 'agency', component: AgencyView, meta: { title: 'Fight team' } },
    { path: '/calendar', name: 'calendar', component: CalendarView, meta: { title: 'Course calendar' } },
    { path: '/contact', name: 'contact', component: ContactView, meta: { title: 'Book a course' } },
    { path: '/admin', name: 'admin', component: AdminView, meta: { title: 'Course admin' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { title: 'Page not found' } },
  ],
})

router.afterEach((to) => {
  if (to.name === 'news-detail') {
    const item = newsBySlug(to.params.slug)
    document.title = item ? `${item.title} · Stagefight` : 'News · Stagefight'
    return
  }
  const title = to.meta.title || 'Stagefight'
  document.title = `${title} · Stagefight`
})

export default router
