<template>
  <div>
    <div class="d-flex py-3 px-2 border-bottom">
        <router-link tag="div" to="/" class="iconfont icon-fanhui text-blue">
        </router-link>
        <strong class="flex-1 text-blue pl-2 text-center">
          新闻资讯
        </strong>
      </div>
      <div style="height:100vh">
   <m-list-card :categories="newsCats">
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
  data() {
    return {
      newsCats: [],
    };
  },
  methods: {
     async fetchNewsCats() {
      const res = await this.$http.get("news/list/more");
      this.newsCats = res.data;
    },
  },
  created() {
    this.fetchNewsCats();
  },
};
</script>
