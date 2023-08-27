import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue';
const AboutView = () => import('../views/About.vue');
const ContactView = () => import('../views/Contact.vue');
const PrivacyView = () => import('../views/Privacy.vue');
const AlphabetView = () => import('../views/Alphabet.vue');
const CommonSignsView = () => import('../views/CommonSigns/Index.vue');
const CommonSignDetails = () => import('../views/CommonSigns/Details.vue')
const DictionaryIndex = () => import('../views/Dictionary/Index.vue');
const DictionaryShow = () => import('../views/Dictionary/ShowWords.vue');
const ShowWordDetials = () => import('../views/Dictionary/ShowWordDetials.vue');
const FlashCards = () => import('../views/FlashCards.vue');
const RegisterPage = () => import('../views/Auth/register.vue');
const LoginPage = () => import('../views/Auth/login.vue');
const ForgotPassword = () => import('../views/Auth/forgotPassword.vue');
const ResetPassword = () => import('../views/Auth/resetPassword.vue');
const DashboardIndexView = () => import('../views/Dashboard/Index.vue');
const DashboardOverview = () => import('../views/Dashboard/Overview/DashboardOverview.vue');
const AddNewItem = () => import('../views/Dashboard/AddNewItem/Index.vue');
const ManageUsers = () => import('../views/Dashboard/ManageUsers/Index.vue');
const UserProfile = () => import('../views/Profile/Index.vue');
const Notfound = () => import('../views/Notfound.vue');

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
    component: CommonSignsView,
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
  },
  {
    path: '/profile',
    name: 'user-profile',
    component: UserProfile,
    beforeEnter(to, from, next) {
      if (store.getters.getUserLoginState) {
        next();
      }else {
        next({ name: 'home' });
      }
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: Notfound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
