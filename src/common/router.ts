import {createRouter, createWebHistory} from 'vue-router'

import p301 from '../page/301.vue'
import p404 from '../page/404.vue'
import p500 from '../page/500.vue'

import sc2024 from '../page/schedule/2024.vue'
import sc2015 from '../page/schedule/2015.vue'
import sc2009 from '../page/schedule/2009.vue'

import siteLayout from '../page/site/layout.vue'
import home from '../page/site/home.vue'
import schedule from '../page/site/schedule.vue'
import schedule2 from '../page/site/scheduleTest.vue'
import anime from '../page/site/anime.vue'
import translatorApply from '../page/site/translatorApply.vue'
import captionRecent from '../page/site/captionRecent.vue'
import introduce from '../page/site/introduce.vue'
import notice from '../page/site/notice.vue'
import inquiry from '../page/site/inquiry.vue'
import login from '../page/site/login.vue'
import register from '../page/site/register.vue'
import recover from '../page/site/recover.vue'
import account from '../page/site/account.vue'

import adminLayout from '../page/admin/layout.vue'
import adminHome from '../page/admin/home.vue'
import adminAnime from '../page/admin/anime.vue'
import adminSchedule from '../page/admin/schedule.vue'
import adminCaption from '../page/admin/caption.vue'

const defaultTitle = import.meta.env.VITE_TITLE;
const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
const env = import.meta.env.VITE_ENV;

(window as any)['dataLayer'] = (window as any)['dataLayer'] || [];
(window as any)['gtag'] = function() { (window as any)['dataLayer'].push(arguments); }

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ left: 0, top: 0 }), 1);
    });
  },
  routes: [
    // schedule
    { path: '/schedule/2024', component: sc2024, meta: { title: '애니편성표 2024' } },
    { path: '/schedule/2015', component: sc2015, meta: { title: '애니편성표 2015' } },
    { path: '/schedule/2009', component: sc2009, meta: { title: '애니편성표 2009' } },
    // basic
    {
      path: '/', component: siteLayout,
      children: [
        { path: '/', component: home, meta: { title: '애니시아' } },
        { path: '/schedule', component: env == 'production' ? schedule : schedule2, meta: { title: '애니편성표 - 애니시아' } },
        { path: '/anime', component: anime, meta: { title: '애니정보 - 애니시아' } },
        { path: '/caption/recent', component: captionRecent, meta: { title: '최근자막 - 애니시아' } },
        { path: '/translator/apply', component: translatorApply, meta: { title: '자막제작자 신청 - 애니시아' } },
        { path: '/introduce', component: introduce, meta: { title: '소개 - 애니시아' } },
        { path: '/notice', component: notice, meta: { title: '공지 - 애니시아' } },
        { path: '/inquiry', component: inquiry, meta: { title: '질문/답변 - 애니시아' } },
        { path: '/login', component: login, meta: { title: '로그인 - 애니시아' } },
        { path: '/register/:token', component: register, meta: { title: '회원가입 - 애니시아' } },
        { path: '/register', component: register, meta: { title: '회원가입 - 애니시아' } },
        { path: '/recover', component: recover, meta: { title: '계정복구 - 애니시아' } },
        { path: '/recover/:token', component: recover, meta: { title: '계정복구 - 애니시아' } },
        { path: '/account', component: account, meta: { title: '계정관리 - 애니시아' } },
        {
          path: '/admin', component: adminLayout,
          children: [
            { path: '/admin', component: adminHome, meta: { title: '관리자 - 애니시아' } },
            { path: '/admin/anime', component: adminAnime, meta: { title: '애니메이션관리 - 애니시아' } },
            { path: '/admin/schedule', component: adminSchedule, meta: { title: '애니편성표 관리 - 애니시아' } },
            { path: '/admin/caption', component: adminCaption, meta: { title: '자막 관리 - 애니시아' } },
          ]
        },
        { path: '/anitime/:path(.*)', component: p301, meta: { title: '주소이전 - 애니시아' } },
        { path: '/500', component: p500, meta: { title: '에러 예시 페이지 - 애니시아' } },
        { path: '/:path(.*)', component: p404, meta: { title: '404 - 애니시아' } },
      ]
    },
  ],
});

router.afterEach((to, from) => {
  // set title
  // @ts-ignore
  document.title = to.meta.title || defaultTitle;
  const path = to.fullPath.indexOf('#') == -1 ? to.fullPath : to.fullPath.substring(0, to.fullPath.indexOf('#'));

  // sned google analytics
  const gtag = (window as any).gtag;
  gtag('set', 'title', document.title);
  gtag('js', new Date());
  gtag('config', trackingId, {'page_path': path});
});

export default router;