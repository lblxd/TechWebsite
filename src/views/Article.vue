<template>
  <div class="page-article" v-if="model">
    <div class="d-flex flex-column">
      <div class="d-flex py-3 px-2 border-bottom">
        <router-link tag="div" to="/" class="iconfont icon-fanhui text-blue">
        </router-link>
        <strong class="flex-1 text-blue pl-2">
          {{ model.title }}
        </strong>
        <div class="text-grey fs-xs">{{ model.updatedAt | date }}</div>
      </div>
      <div v-html="model.body" class="px-3 body fs-lg flex-1"></div>
      <div class="px-3 border-top py-3">
        <div class="d-flex ai-center">
          <i class="iconfont icon-gengduo"></i>
          <strong class="text-blue fs-lg mt-1 ml-2">相关资讯</strong>
        </div>
        <div class="pt-2">
          <router-link
            class="py-1 text-blue"
            tag="div"
            :to="`/articles/${item._id}`"
            v-for="item in model.related"
            :key="item._id"
          >
            {{ item.title }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
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
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
  components: { router },
};
</script>

<style lang="scss">
.page-article {
  .icon-fanhui {
    font-size: 1.6923rem;
  }
  .body {
    h1 {
      line-height: 2em;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>
