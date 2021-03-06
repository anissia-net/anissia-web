<template>
  <div class="ml">
    <div id="area-under-nav">
      <!-- do not use :key in router-view / :key calls created() to create a component each time. -->
      <router-view />
    </div>

    <nav id="nav">
      <div class="logo">
        <router-link to="/">
          <div class="inline"><img :src="require(`@/assets/layout/nav/logo-${cs}.svg`)" alt=""/></div>
        </router-link>
      </div>
      <div class="tool">
        <div v-if="user.isAdmin">
          <router-link to="/admin"><img src="@/assets/layout/nav/tool-admin.svg" alt="tool"/></router-link>
        </div>
        <div id="nav-tool-toggle" class="inline" @click="onTool = !onTool">
          <img v-if="user.isLogin" src="@/assets/layout/nav/tool-on.svg" alt="tool"/>
          <img v-else src="@/assets/layout/nav/tool-off.svg" alt="tool"/>
        </div>
      </div>
      <div class="menu">
        <router-link to="/schedule">
          <div class="inline" :class="{active: inPath('/schedule')}"><img src="@/assets/layout/nav/schedule.svg" alt=""/></div>
        </router-link>
        <router-link to="/">
          <div class="inline" :class="{active: inPath('/')}"><img src="@/assets/layout/nav/home.svg" alt=""/></div>
        </router-link>
        <router-link to="/anime">
          <div class="inline" :class="{active: inPath('/anime')}"><img src="@/assets/layout/nav/anime.svg" alt=""/></div>
        </router-link>
      </div>
    </nav>
    <nav id="nav-tool" v-if="onTool">
      <div>

        <div class="doc-title">계정</div>
        <div class="menu">
          <div v-if="!user.isLogin"><div @click="login"><div class="nav-tool-item"><img src="@/assets/layout/nav/tool-login.svg" alt=""/> 로그인</div></div></div>
          <div v-if="user.isAdmin"><router-link to="/admin"><div class="nav-tool-item"><img src="@/assets/layout/nav/tool-admin.svg" alt=""/> 관리자</div></router-link></div>
          <div v-if="user.isLogin"><router-link to="/account"><div class="nav-tool-item"><img src="@/assets/layout/nav/tool-user.svg" alt=""/> 회원정보</div></router-link></div>
          <div v-if="user.isLogin"><div @click="logout" class="nav-tool-item"><img src="@/assets/layout/nav/tool-logout.svg" alt=""/> 로그아웃</div></div>
        </div>

        <div class="doc-title">애니메이션</div>
        <div class="menu">
          <div><router-link to="/schedule"><div class="nav-tool-item"><img src="@/assets/layout/nav/schedule.svg" alt=""/> 애니 편성표</div></router-link></div>
          <div><router-link to="/anime"><div class="nav-tool-item"><img src="@/assets/layout/nav/anime.svg" alt=""/> 애니 정보</div></router-link></div>
          <div><router-link to="/translator/apply"><div class="nav-tool-item"><img src="@/assets/layout/nav/anime.svg" alt=""/> 자막제작자 신청</div></router-link></div>
        </div>

        <div class="doc-title">일반메뉴</div>
        <div class="menu">
          <div><router-link to="/introduce"><div class="nav-tool-item"><img src="@/assets/layout/nav/introduce.svg" alt=""/> 애니시아 소개</div></router-link></div>
          <div><router-link to="/notice"><div class="nav-tool-item"><img src="@/assets/layout/nav/notice.svg" alt=""/> 공지사항</div></router-link></div>
          <div><router-link to="/inquiry"><div class="nav-tool-item"><img src="@/assets/layout/nav/inquiry.svg" alt=""/> 문의 게시판</div></router-link></div>
        </div>

        <div class="doc-title">화면</div>
        <div class="color-scheme" @click="toggleColorScheme()">
          <div class="color-scheme-st" :class="`st-${cs}`">{{cs == 'dark' ? 'ON' : 'OFF'}}</div>
          <div class="nav-tool-item">
            <img src="@/assets/layout/nav/tool-dark-mode.svg" alt=""/>
            다크모드
          </div>
        </div>

      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import ColorScheme from "@/utils/ColorScheme";
import SessionService from "@/service/SessionService";
import UserSession from "@/models/UserSession";
import { Options, Vue } from 'vue-class-component';

@Options({
  created() {
    window.addEventListener('click', this.offTool, true);
    SessionService.sync((isLogin) => !isLogin && SessionService.tokenLogin());
    setInterval(() => { SessionService.sync(); }, 5 * 60000);
  },
  beforeUnmount() {
    window.removeEventListener('click', this.offTool, true);
  },
  beforeRouteUpdate(to, from, next) {
    this.onTool = false;
    SessionService.amendPathInSession(to.path) && next();
  },
  watch: {
    user(n: UserSession, o: UserSession) {
      SessionService.amendPathInSession();
    },
  },
  computed: {
    cs() {
      return this.$store.state.colorScheme;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    require(path: string) {
      return require(path);
    },
    inPath(path: string): boolean {
      return path === this.$route.path || (this.$route.path.startsWith(path + '/'));
    },
    toggleColorScheme() {
      const cl = document.documentElement.classList;
      if (!cl.contains("modding")) {
        cl.add("modding");
        this.$nextTick(() => {
          ColorScheme.toggle();
          setTimeout(() => { cl.remove("modding"); }, 500)
        });
      }
    },
    offTool(event: Event) {
      if (this.onTool) {
        let element = event.target;
        do {
          switch ((element as Element).id) {
            case 'nav-tool': case 'nav-tool-toggle': return;
          }
          element = (element as Element).parentElement;
        } while (element != null)
        this.onTool = false;
      }
    },
    login() {
      const path = document.location.pathname;
      const search = document.location.search;
      if (path.length > 1) {
        this.$router.push(`/login?rp=${encodeURIComponent(path + search)}`);
      } else {
        this.$router.push('/login');
      }
    },
    logout() {
      SessionService.logout(() => SessionService.amendPathInSession());
    }
  },
})
export default class Layout extends Vue {
  targetStockId?: string;
  data() {
    return {
      onTool: false
    };
  }
}
</script>

<style>
@import url(~@fortawesome/fontawesome-free/css/all.min.css);
.ml a { text-decoration: none }
.ml :not(.a-text-style) a:hover { text-decoration: underline }
.ml abbr { cursor: help; text-decoration: none;  }
.ml abbr:hover { font-style: oblique;  }
.ml input { box-sizing: border-box }
.ml input::-webkit-outer-spin-button,
.ml input::-webkit-inner-spin-button,
.ml input::-webkit-calendar-picker-indicator { -webkit-appearance: none; display: none; margin: 0; }
.ml .x-tag {
  display: inline-block; padding:2px 6px; border-radius: 1px; border-width: 1px; border-style:solid; margin:4px 6px 0 0;
  font-size:12px;
}
.ml .doc-title { font-size: 20px; padding: 6px 8px 8px; }

#area-under-nav { padding:56px 0 12px; }
#nav { height:56px; position: fixed; top:0; left:0; right:0; user-select: none; }
#nav { -webkit-tap-highlight-color: rgba(0,0,0,0); }
#nav div.inline { display:inline-block; }
#nav img { vertical-align: top }
#nav .logo { float:left; }
#nav .logo img { margin:14px }
#nav .tool { float:right; }
#nav .tool > div { display:inline-block }
#nav .menu { margin:0 170px 0 170px; text-align: center }
#nav .menu div { margin:0 12px; border-bottom: 2px solid transparent; cursor: pointer; transition: all .4s }
#nav .menu div img { width:24px; height:24px; margin: 16px 16px 14px; filter:grayscale(1); transition: all .6s }
#nav .menu div.active,
#nav .menu div:hover{ border-color: #276998 }
#nav .menu div.active img,
#nav .menu div:hover img{ filter:grayscale(0); transition: all 1.2s; }
#nav .tool div img { width:28px; height:28px; margin:14px }
#nav .tool div:hover img { transform: rotate(360deg); transition: all .8s ease-in-out 0s; }

#nav-tool { position: fixed; overflow-y: auto; user-select: none; backdrop-filter: blur(10px); }
#nav-tool a { text-decoration: none; }
#nav-tool .sign { font-weight: bold; padding:48px 0; text-align:center; font-size:14px; cursor: default; }
#nav-tool ruby { transition:all .5s }
#nav-tool rt { transition:all 1s }
#nav-tool .nav-tool-item { line-height: 24px; padding:12px 16px; margin-top:4px; display:inline-block; cursor: pointer }
#nav-tool .nav-tool-item img { width:20px; height:20px; margin:0 8px 0 0; vertical-align: top; filter:grayscale(1); }
#nav-tool .nav-tool-item:hover { color:#276998; transition: all .2s; }
#nav-tool .nav-tool-item:hover img { filter:grayscale(0); transition: all 1.5s; transform: rotateY(360deg) }
#nav-tool .color-scheme .color-scheme-st { font-weight: bold; float: right; text-align: right; padding:16px; }
#nav-tool .color-scheme .color-scheme-st.st-light { color:#bbb }
#nav-tool .color-scheme .color-scheme-st.st-dark { color:#fff }
#nav-tool .doc-title { padding: 8px !important; margin: 8px 8px 8px !important; }

.ml .basic-layout { padding-top:12px; overflow: auto }

.ml .mono-area { margin:120px auto 0; max-width:400px; }
.ml .mono-area .base-mat-body { padding:20px 0; }
.ml .mono-area .input-unit { padding:12px 24px 10px; }
.ml .mono-area input { border:0; padding:8px; height:32px; width:100%; box-sizing: border-box; }

@media (min-width: 1024px) {
  .ml .basic-layout .basic-layout-right { float:right; width:calc(30% - 36px); margin-right:12px; }
  .ml .basic-layout .basic-layout-main { width:70%; margin: 0 30% 0 12px;}
  .ml .basic-layout .basic-layout-mono { margin: 0 12px;}
}
@media (max-width: 1023px) {
  #area-under-nav { padding:45px 0 0; }
  .ml .basic-layout .basic-layout-right { display: none }
  .ml .basic-layout .basic-layout-main,
  .ml .basic-layout .basic-layout-mono { margin:0  }
  .ml .basic-layout .base-mat { border-width: 0 !important; }
}

@media (min-width: 641px) {
  #nav-tool { top:68px; right:12px; bottom:12px; width:320px; }
}

@media (max-width: 640px) {
  #nav .menu { display:none }
  #nav-tool { top:68px; left:12px; right:12px; bottom:12px; }
  .ml .mono-area { margin:80px auto 0; }
}

.ml .popup-background { position: absolute; backdrop-filter: blur(10px); top:0; left:0; right:0; bottom:0; z-index: 1000 }
.ml .popup-background .popup-box { position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%); padding:20px 12px; min-width:240px; }
.ml .popup-background .popup-box .center { text-align: center }
.ml .popup-background .popup-box input { line-height: 32px; height:32px; text-align: center }
.ml .popup-background .popup-box input[type=password] { width:70%; }
.ml .popup-background .popup-box input[type=button] { border:0; width:40%; }
.ml .popup-background .popup-box .button-wrap { margin-top:18px; }


/* modding */
html.modding,
html.modding #nav,
html.modding #nav-tool { transition: background .4s }

/* light mode */
html.light { background: #f4f4f4; }
html.light .ml a { color:#48659a }
html.light,
html.light .ml .a-text-style a { color:#444; text-decoration: none }
html.light .ml .x-tag { border-color:#eee; }
html.light table td,
html.light table th,
html.light .basic-border-color { border-color: #e8e8e8 }
html.light ::-webkit-scrollbar-track{ background-color:#fafafa }
html.light ::-webkit-scrollbar-thumb{ background-color:rgba(197, 197, 197, 0.3) }
html.light ::-webkit-scrollbar-thumb:hover{ background-color:rgba(80, 80, 80, 0.3); }
html.light #nav { background: #fff }
html.light #nav-tool { background: rgba(255, 255, 255, 0.4); }
html.light #nav-tool .sign { color:#ccc; }
html.light #nav-tool,
html.light #nav-tool a { color:#555 }
html.light .base-mat { background: #fff }
html.light .mono-area input[type=text],
html.light .mono-area input[type=password],
html.light .mono-area input[type=text]:-webkit-autofill,
html.light .mono-area input[type=password]:-webkit-autofill,
html.light .std-inp-txt {
  background: #fff; color:#444;
  box-shadow: 0 0 0 30px #fff inset !important;
  -webkit-text-fill-color: #444 !important;
}
html.light .mono-area input[type=button],
html.light input.std-inp-btn { background: #7994b5; color:#fff }
html.light .popup-background .popup-box { background: #fff; border:1px solid #276998; }
html.light .popup-background .popup-box input[type=password] { border:1px solid #ddd }
html.light .search-box input[type=text] { border:4px solid #5c8dbf; }
html.light .search-box input[type=button] { border:0; color:#fff; background: #5c8dbf }
html.light .ml .doc-title { border-bottom: 1px solid #276998; }
html.light .ml .doc-title,
html.light .ml .doc-title a { color: #276998;  }


  /* dark mode */
html.dark { background: #151515; }
html.dark .ml a { color:#9aacc7 }
html.dark,
html.dark .ml .a-text-style a { color:#999; text-decoration: none }
html.dark .ml .x-tag { border-color:#333; }
html.dark table td,
html.dark table th,
html.dark .basic-border-color { border-color: #282828 }
html.dark ::-webkit-scrollbar-track{ background-color:#222 }
html.dark ::-webkit-scrollbar-thumb{ background-color:rgba(120, 120, 120, 0.3) }
html.dark ::-webkit-scrollbar-thumb:hover{ background-color:rgba(180, 180, 180, 0.3) }
html.dark #nav-tool { background: rgba(0, 0, 0, 0.45); }
html.dark #nav { background: #222 }
html.dark #nav-tool .sign { color:#555; }
html.dark #nav-tool,
html.dark #nav-tool a { color:#999 }
html.dark .base-mat { border:1px solid #333 }
html.dark .mono-area input[type=text],
html.dark .mono-area input[type=password],
html.dark .mono-area input[type=text]:-webkit-autofill,
html.dark .mono-area input[type=password]:-webkit-autofill,
html.dark .std-inp-txt {
  background: #111; color:#aaa;
  box-shadow: 0 0 0 30px #111 inset !important;
  -webkit-text-fill-color: #aaa !important;
}
html.dark .mono-area input[type=button],
html.dark input.std-inp-btn { background: #333; color:#aaa; }
html.dark .popup-background .popup-box { background: #000; border:1px solid #276998; }
html.dark .popup-background .popup-box input[type=password] { border:1px solid #444 }
html.dark .search-box input[type=text] { border:4px solid #444; }
html.dark .search-box input[type=button] { border:0; color:#aaa; background: #444 }
html.dark .ml .doc-title { border-bottom: 1px solid #aaa; }
html.dark .ml .doc-title,
html.dark .ml .doc-title a { color: #999;  }

</style>
