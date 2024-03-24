import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Signin from "@/views/Signin.vue";
import Profile from "@/views/Profile.vue";
import CreateFeedback from "@/views/CreateFeedback.vue";
import Feedbacks from "@/views/Feedbacks.vue";
import FeedbackDetail from "@/views/FeedbackDetail.vue";
import AdminDashboard from "@/views/admin/AdminDashboard.vue";
import EditFeedback from "@/views/admin/EditFeedback.vue";
import Comment from "@/views/admin/Comment.vue";
import FeedBack from "@/views/admin/FeedBack.vue";
import Signup from "@/views/Signup.vue";
import {useAuthStore} from "../../stores/useAuthStore";
import Csv from "@/views/Csv.vue";

const routes = [

  {
    path: '/upload-csv',
    name: 'csv',
    component: Csv
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },

  {
    path: '/profile',
    name: 'profile',
    component: Profile,

    beforeEnter: (to, from, next) => {
      const store = useAuthStore()
      if (!store.authenticated) {
        next('/signin');
      } else {
        next();
      }
    },
  },

  {
    path: '/feedbacks',
    name: 'feedbacks',
    component: Feedbacks,
    beforeEnter: (to, from, next) => {
      const store = useAuthStore()
      if (!store.authenticated) {
        next('/signin');
      } else {
        next();
      }
    },
  },

  {
    path: '/feedback/:id',
    name: 'feedback-detail',
    component: FeedbackDetail,
    //props: true,
  },

  {
    path: '/create-feedback',
    name: 'create-feedback',
    component: CreateFeedback
  },


  {
    path: '/admin/feedbacks',
    name: 'admin-feedback',
    component: FeedBack,
  },

  {
    path: '/admin/feedbacks/:id/edit',
    name: 'feedback-edit',
    component: EditFeedback,
  },


  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: AdminDashboard,
    /*beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        next('/signin');
      } else if(store.getters['auth/user'].user_type == 'admin') {
        next();
      } else {
        next('/profile');
      }
    },*/
  },

  {
    path: '/admin/comments',
    name: 'admin-comments',
    component: Comment,
    /*beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        next('/signin');
      } else if(store.getters['auth/user'].user_type === 'admin') {
        next();
      } else {
        next('/profile');
      }
    },*/
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
