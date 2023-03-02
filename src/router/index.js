import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ContactView from '../views/ContactView.vue';
import PrivacyView from '../views/PrivacyView.vue';
import AlphabetView from '../views/AlphabetView.vue';
import CommonSignsView from '../views/CommonSignsView.vue';
import DictionaryIndex from '../views/dictionary/index.vue';
import DictionaryShow from '../views/dictionary/show.vue';
import FlashCards from '../views/FlashCardsView.vue';
import RegisterPage from '../views/auth/register.vue';
import LoginPage from '../views/auth/login.vue';
import ResetPage from '../views/auth/reset.vue';
import AdminDashboard from '../views/dashboard/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    alias: '/home'
  },
  {
    path: '/alphabet',
    name: 'alphabet',
    component: AlphabetView
  },
  {
    path: '/common-signs',
    name: 'common-signs',
    component: CommonSignsView
  },
  {
    path: '/dictionary',
    name: 'dictionary-index',
    component: DictionaryIndex
  },
  {
    path: '/dictionary/:id',
    name: 'dictionary-show',
    component: DictionaryShow
  },
  {
    path: '/flash-cards',
    name: 'flash-cards',
    component: FlashCards
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: PrivacyView
  },
  {
    path: '/register',
    name: "register-page",
    component: RegisterPage
  },
  {
    path: '/login',
    name: 'login-page',
    component: LoginPage
  },
  {
    path: '/reset',
    name: 'reset-page',
    component: ResetPage
  },
  {
    path: '/dashboard',
    name: 'admin-dashboard',
    component: AdminDashboard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
