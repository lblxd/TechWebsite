<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/01.jpg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/02.jpg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/03.jpg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/04.jpg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/05.jpg" alt="" />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-2"
        slot="pagination"
      ></div>
    </swiper>
    <!-- end of swiper -->
    <m-list-card :categories="videoCats">
      <template #items="{ category }">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            :to="`/vipvideo/${video._id}`"
            class="p-3 text-center text-ellipsis border-right border-bottom"
            style="width: 25%"
            v-for="(video, i) in category.subjectList"
            :key="i"
          >
            <img :src="video.icon" class="w-100 mt-3" />
            <div class="mt-2">{{ video.name }}</div>
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
      videoCats: [],
    };
  },
  methods: {
    async fetchVideoCats() {
      const res = await this.$http.get("vip/video");
      this.videoCats = res.data;
    },
  },
  created() {
    this.fetchVideoCats();
  },
};
</script>
