<template>
  <div>
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
    <!-- end of swiper -->
    <m-list-card :categories="bookCats">
      <template #items="{ category }">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            :to="`/books/list/${book._id}`"
            class="p-3 text-center text-ellipsis border-right border-bottom"
            style="width: 25%"
            v-for="(book, i) in category.bookList"
            :key="i"
          >
            <img :src="book.icon" class="w-100 mt-3" />
            <div class="mt-2">{{ book.name}}</div>
            <strong class="fs-lg text-blue mt-2">{{ book.price }}元</strong>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
        },
      },
      bookCats: [],
    };
  },
  methods: {
    async fetchBookCats() {
      const res = await this.$http.get("books/list/more");
      this.bookCats = res.data;
    },
  },
  created() {
    this.fetchBookCats();
  },
};
</script>
<style>
@media screen and (min-width: 800px) {
  .swiper1{
    display: none;
  }
  .swiper {
    border-radius: 10px;
    background: #f0f8ff;
    box-shadow: 20px 20px 49px #ccd3d9, -20px -20px 49px #ffffff;
    padding: 30px 0;
  }
  .banner {
    width: 650px;
  }
}
</style>
