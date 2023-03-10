import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Main from "../views/Main.vue";
import CopyRight from "../views/CopyRight.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Article from "../views/Article.vue";
import Test from "../views/Test.vue";
import News from "../views/News.vue";
import Shop from "../views/Shop.vue";
import Book from "../views/Book.vue";
import BookConfirm from "../views/BookConfirm.vue";
import Matter from "../views/Matter.vue";
import Vip from "../views/Vip.vue";
import VipVideo from "../views/VipVideo.vue";
import VipMatter from "../views/VipMatter.vue";
import VipMatterEdit from "../views/VipMatterEdit.vue";
import Video from "../views/Video.vue";
import Forum from "../views/Forum.vue";
import Paper from "../views/Paper.vue";
import ForumEdit from "../views/ForumEdit.vue";
import ForumReply from "../views/ForumReply.vue";
import PerMain from "../views/PerMain.vue";
import PerPassword from "../views/PerPassword.vue";
import PerMessage from "../views/PerMessage.vue";
import PerMessageEdit from "../views/PerMessageEdit.vue";
import PerBook from "../views/PerBook.vue";
import PerPaper from "../views/PerPaper.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { isPublic: true },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    meta: { isPublic: true },
  },
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "/",
        name: "home",
        components: {
          default: Home,
          footer: CopyRight,
        },
      },
      {
        path: "/vip",
        name: "vip",
        components: {
          default: Vip,
          footer: CopyRight,
        },
      },
      {
        path: "/test",
        name: "test",
        components: {
          default: Test,
          footer: CopyRight,
        },
      },
      {
        path: "/news",
        name: "news",
        components: {
          default: News,
          footer: CopyRight,
        },
      },
      {
        path: "/articles/:id",
        name: "article",
        component:Article,
        props: true,
      },
      //书城
      {
        path: "/shop",
        name: "shop",
        components: {
          default: Shop,
          footer: CopyRight,
        },
      },
      {
        path: "/books/list/:id",
        name: "book",
        component:Book,
        props:true,
      },
      {
        path: "/books/bookconfirm/:id",
        name: "bookconfirm",
        component:BookConfirm,
        props: true,
      },
      //vip视频直播
      {
        path: "/vipvideo",
        name: "vipvideo",
        components: {
          default: VipVideo,
          footer: CopyRight,
        },
      },
      {
        path: "/vipvideo/:id",
        name: "video",
        component:Video,
        props: true,
      },
      //论坛
      {
        path: "/forum",
        name: "forum",
        component: Forum,
      },
      {
        path: "/forum/create",
        name: "forumedit",
        components: {
          default: ForumEdit,
          footer: CopyRight,
        },
      },
      {
        path: "/forum/:id",
        name: "paper",
        component: Paper,
        props: true,
      },
      {
        path: "/forum/reply/:id",
        name: "forumreply",
        component:ForumReply,
        props: true,
      },
      //会员问答
      {
        path: "/matter",
        name: "matter",
        components: {
          default: VipMatter,
          footer: CopyRight,
        },
      },
      {
        path: "/matter/create",
        name: "matteredit",
        component: VipMatterEdit,
      },
      {
        path: "/matter/:id",
        name: "matter1",
        component:Matter,
        props: true,
      },
    ],
  },

  //个人中心
  {
    path: "/percenter",
    component: PerMain,
    children: [
      {
        path: "/percenter",
        name: "perhome",
        components: {
          default: PerMessage,
          footer: CopyRight,
        },
      },
      {
        path: "/percenter/perpassword/:id",
        name: "perpassword",
        component: PerPassword,
        props: true,
      },

      {
        path: "/percenter/peredit/:id",
        name: "peredit",
        component:PerMessageEdit,
        props: true,
      },
      {
        path: "/percenter/perbook",
        name: "perbook",
        component: PerBook,
      },
      {
        path: "/percenter/perpaper",
        name: "perpaper",
        components: {
          default: PerPaper,
          footer: CopyRight,
        },
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next("/login");
  }
  next();
});

export default router;
