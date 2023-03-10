<template>
  <div class="page-article" v-if="model">
    <div class="d-flex flex-column">
      <div class="d-flex py-3 px-2 border-bottom">
        <router-link
          tag="div"
          to="/vipvideo"
          class="iconfont icon-fanhui text-blue"
        >
        </router-link>
        <strong class="flex-1 text-blue pl-2">
          {{ model.name }}
        </strong>
        <div class="text-grey fs-xs">
          视频发布日期{{ model.updatedAt | date }}
        </div>
      </div>
      <!-- end of topbar -->
      <div v-html="model.url" class="mt-3 body border-top"></div>
      <!-- end of description -->
      <div class="px-3 border-top py-3">
        <div class="d-flex ai-center">
          <i class="iconfont icon-gengduo"></i>
          <strong class="text-blue fs-lg mt-1 ml-2">相关视频</strong>
        </div>
        <div class="pt-2">
          <router-link
            class="py-1 text-blue"
            tag="div"
            :to="`/vipvideo/${item._id}`"
            v-for="item in model.related"
            :key="item._id"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
      <!-- end of related -->
    </div>
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
  props: {
    id: { require: true },
  },
  data() {
    return {
      model: null,
    };
  },
  watch: {
    id: "fetch",
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`vip/video/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
.page-article {
  .info {
    h2 {
      line-height: 1.5em;
    }
    .badge {
      margin: 0 0.25rem;
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      text-align: center;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
  }
  .icon-fanhui {
    font-size: 1.6923rem;
  }
  .body {
    height: 100vh;
    h1 {
      line-height: 2em;
    }
    img {
      padding-top: 1rem;
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
