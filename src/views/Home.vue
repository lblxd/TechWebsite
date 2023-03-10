<template>
  <div>
    <!-- phone-banner -->
    <div class="swiper swiper1 d-flex jc-center">
      <swiper :options="swiperOption" class="banner">
        <swiper-slide>
          <img class="w-100 swiperimg" src="../assets/images/01.jpg" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img class="w-100 swiperimg" src="../assets/images/02.jpg" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img class="w-100 swiperimg" src="../assets/images/03.jpg" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img class="w-100 swiperimg" src="../assets/images/04.jpg" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img class="w-100 swiperimg" src="../assets/images/05.jpg" alt="" />
        </swiper-slide>
        <div
          class="swiper-pagination pagination-home text-right px-3 pb-2"
          slot="pagination"
        ></div>
      </swiper>
    </div>
    <!-- end of swiper -->
    <div
      class="nav-icons bg-white mt-3 d-flex flex-wrap text-center pt-3 text-grey-1"
    >
      <router-link tag="div" to="/test" class="nav-item mb-3">
        <i class="iconfont icon-ceshi"></i>
        <div class="py-2">复习备考</div>
      </router-link>
      <router-link tag="div" to="/forum" class="nav-item mb-3">
        <i class="iconfont icon-14"></i>
        <div class="py-2">论坛交流</div>
      </router-link>
      <a class="nav-item mb-3 text-black" href="https://yz.chsi.com.cn/yzwb/">
        <i class="iconfont icon-baoming"></i>
        <div class="py-2">考试报名</div>
      </a>
      <a
        class="nav-item mb-3 text-black"
        href="https://yz.chsi.com.cn/kyzx/zt/kyfs2022.shtml"
      >
        <i class="iconfont icon-baomingxinxi"></i>
        <div class="py-2">成绩查询</div>
      </a>
      <!-- end of free -->
      <router-link tag="div" to="/vip" class="nav-item mb-3">
        <i class="iconfont icon-vip"></i>
        <div class="py-2">开通会员</div>
      </router-link>
      <div @click="isVip(vipvideo)" class="nav-item mb-3">
        <i class="iconfont icon-shipin"></i>
        <div class="py-2">视频课程</div>
      </div>
      <div @click="isVip(vipvideo)" class="nav-item mb-3">
        <i class="iconfont icon-zhibozhong"></i>
        <div class="py-2">直播班课</div>
      </div>
      <div @click="isVip(matter)" class="nav-item mb-3">
        <i class="iconfont icon-kefu"></i>
        <div class="py-2">考研答疑</div>
      </div>
    </div>
    <!-- pc-banner -->
    <div class="swiper swiper2 d-flex jc-center">
      <swiper :options="swiperOption" class="banner">
        <swiper-slide>
          <img class="w-100 swiperimg" src="../assets/images/01.jpg" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img class="w-100 swiperimg" src="../assets/images/02.jpg" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img class="w-100 swiperimg" src="../assets/images/03.jpg" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img class="w-100 swiperimg" src="../assets/images/04.jpg" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img class="w-100 swiperimg" src="../assets/images/05.jpg" alt="" />
        </swiper-slide>
        <div
          class="swiper-pagination pagination-home text-right px-3 pb-2"
          slot="pagination"
        ></div>
      </swiper>
    </div>
    <!-- end of nav icons -->
    <div class="pctitle d-flex ai-center px-2 m-2">
      <img src="../assets/images/phones.png" alt="" />
      <div class="fs-xl ml-3">新闻资讯--最新资讯一网打尽</div>
    </div>
    <m-list-card
      icon="xinwen"
      gengduo="gengduo"
      title="新闻资讯"
      :categories="newsCats"
      link="/news"
    >
      <template #items="{ category }">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{
            news.title
          }}</span>
          <span class="text-grey-1 fs-sm">{{ news.updatedAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>
    <!-- end of xinwen -->
    <div class="pctitle d-flex ai-center px-2 m-2">
      <img src="../assets/images/living.png" alt="" />
      <div class="fs-xl ml-3">教辅商城--官方直营全部正品</div>
    </div>
    <m-list-card
      icon="shangcheng"
      gengduo="gengduo"
      title="教辅商城"
      :categories="bookCats"
      link="shop"
    >
      <template #items="{ category }">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            :to="`/books/list/${book._id}`"
            class="p-2 text-center text-ellipsis"
            style="width: 25%"
            v-for="(book, i) in category.bookList"
            :key="i"
          >
            <img :src="book.icon" class="w-100" />
            <div class="mt-2">{{ book.name }}</div>
            <strong class="fs-lg text-blue mt-2">{{ book.price }}.0元</strong>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <!-- end of shangcheng -->
    <div class="pctitle d-flex ai-center px-2 m-2">
      <img src="../assets/images/everything.png" alt="" />
      <div class="fs-xl ml-3">复习备考--山高不厌攀</div>
    </div>
    <m-list-card
      icon="ceshi"
      gengduo="gengduo"
      title="复习备考"
      :categories="testCats"
      link="test"
    >
      <template #items="{ category }">
        <router-link
          tag="div"
          :to="`/articles/${test._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(test, i) in category.testList"
          :key="i"
        >
          <span class="text-info">[{{ test.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{
            test.title
          }}</span>
          <span class="text-grey-1 fs-sm">{{ test.updatedAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
        },
      },
      newsCats: [],
      bookCats: [],
      testCats: [],
      consumer: "",
      vipvideo: "vipvideo",
      matter: "matter",
      shop: "shop",
      test: "test",
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchBookCats() {
      const res = await this.$http.get("books/list");
      this.bookCats = res.data;
    },
    async fetchTestCats() {
      const res = await this.$http.get("tests/list");
      this.testCats = res.data;
    },
    async fetch() {
      const res = await this.$http.get(`consumer`);
      this.consumer = res.data;
    },
    async isVip(action) {
      if (this.consumer.isvip === false) {
        this.$router.push("/vip");
      } else {
        this.$router.push(`/${action}`);
      }
      console.log(this.consumer.isvip);
      console.log(action);
    },
  },
  created() {
    this.fetchNewsCats();
    this.fetchBookCats();
    this.fetchTestCats();
    this.fetch();
  },
};
</script>
<style lang="scss">
@import "../assets/scss/variables";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($map: $colors, $key: "white");
    &.swiper-pagination-bullet-active {
      background: map-get($map: $colors, $key: "info");
    }
  }
}

.nav-icons {
  border: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
  }
}
@media screen and (max-width: 800px) {
  .pctitle {
    display: none;
  }
  .swiper2 {
    display: none;
  }
}

@media screen and (min-width: 800px) {
  .pctitle {
    margin-top: 40px;
    border-radius: 50px;
    background: #f0f8ff;
    box-shadow: 20px 20px 60px #ccd3d9, -20px -20px 60px #ffffff;
    img{
      width: 64px;
    }
  }
  .swiper1 {
    display: none;
  }
  .swiper {
    border-radius: 10px;
    background: #f0f8ff;
    box-shadow: 20px 20px 49px #ccd3d9, -20px -20px 49px #ffffff;
    margin-top: 50px;
    padding: 30px 0;
  }
  .banner {
    width: 650px;
  }
  .nav-icons {
    flex-wrap: nowrap;
    border: none;
    border-radius: 0px;
    background: #ffffff;
    box-shadow: 20px 20px 49px #d9d9d9, -20px -20px 49px #ffffff;
    .nav-item {
      width: 30%;
      border: none;
      div,
      i {
        font-size: 20px;
      }
    }
  }
}
</style>
