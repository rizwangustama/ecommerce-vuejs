import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useLoginStore } from '../stores/login';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/detail-product/:id',
      name: 'Detail',
      component: () => import('../views/detailProduct.vue'),
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('../views/Cart.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Registrasi.vue')
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: () => import('../views/Category.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/ourteam',
      name: "Our Team",
      component: () => import('../views/OurTeam.vue')
    }
  ]
});

router.beforeEach(async (to) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  // const auth = useLoginStore();
  // console.log("auth data :")
  // console.log(authRequired);
  // console.log(auth.detailUser.isLogin);

  // if (authRequired && !auth.detailUser.isLogin) {
  //   return '/login'
  // }

  const getToken = localStorage.getItem('token');
  console.log(getToken)
  if (authRequired && !getToken) {
    return '/login'
  }
})


export default router
