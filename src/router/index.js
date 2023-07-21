import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ContactView from '../views/ContactView.vue';
import PrivacyView from '../views/PrivacyView.vue';
const AlphabetView = () => import('../views/AlphabetView.vue');
const CommonSignsView = () => import('../views/common-signs/index.vue');
const CommonSignDetails = () => import('../views/common-signs/CommonSignDetails.vue')
const DictionaryIndex = () => import('../views/dictionary/index.vue');
const DictionaryShow = () => import('../views/dictionary/ShowWords.vue');
const ShowWordDetials = () => import('../views/dictionary/ShowWordDetials.vue');
const FlashCards = () => import('../views/FlashCardsView.vue');
import RegisterPage from '../views/auth/register.vue';
import LoginPage from '../views/auth/login.vue';
import ForgotPassword from '../views/auth/forgotPassword.vue';
import ResetPassword from '../views/auth/resetPassword.vue';
import DashboardIndexView from '../views/dashboard/index/indexView.vue';
import DashboardOverview from '../views/dashboard/overview/DashboardOverview.vue'
import AddNewItem from '../views/dashboard/addNewItem/AddNewItemView.vue'
import ManageUsers from '../views/dashboard/manageUsers/ManageUsersView.vue'
import store from '@/store';

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
    path: '/common-signs/:word',
    name: 'common-sign-details',
    component: CommonSignDetails,
    props: true
  },
  {
    path: '/dictionary',
    name: 'dictionary-index',
    component: DictionaryIndex,
    
  },
  {
    path: '/dictionary/:letter',
    name: 'dictionary-show',
    component: DictionaryShow,
    props: true,
  },
  {
    path: '/dictionary/:letter/details',
    name: 'show-word-detials',
    component: ShowWordDetials,
    // props: route => ({ word: route.query.word })
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
    component: RegisterPage,
    beforeEnter(to, from, next) {
      if (store.getters.getUserLoginState) {
        next({ name: 'home' });
      }else {
        next();
      }
    }
  },
  {
    path: '/login',
    name: 'login-page',
    component: LoginPage,
    beforeEnter(to, from, next) {
      if (store.getters.getUserLoginState) {
        next({ name: 'home' });
      }else {
        next();
      }
    }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
    beforeEnter(to, from, next) {
      if (store.getters.getUserLoginState) {
        next({ name: 'home' });
      }else {
        next();
      }
    }
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword,
    beforeEnter(to, from, next) {
      if (store.getters.getUserLoginState) {
        next({ name: 'home' });
      }else {
        next();
      }
    }
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/overview',
    component: DashboardIndexView,
    beforeEnter(to, from, next) {
      if (store.getters.getUserLoginState && store.getters.getUserRole === 'admin') {
        next();
      }else {
        next({ name: 'home' })
      }
    },
    children: [
      {
        path: 'overview',
        name: 'dashboard-overview',
        component: DashboardOverview
      },
      {
        path: 'addNewItem',
        name: 'add-new-item',
        component: AddNewItem
      },
      {
        path: 'manageUsers',
        name: 'manage-users',
        component: ManageUsers
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
