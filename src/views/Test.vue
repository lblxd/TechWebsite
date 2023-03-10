<template>
  <div>
    <div class="d-flex py-3 px-2 border-bottom">
        <router-link tag="div" to="/" class="iconfont icon-fanhui text-blue">
        </router-link>
        <strong class="flex-1 text-blue pl-2 text-center">
          复习备考
        </strong>
      </div>
      <div style="height:100vh">
    <m-list-card :categories="testCats">
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
      testCats:[],
    };
  },
  methods: {
    async fetchTestCats() {
      const res = await this.$http.get("tests/list/more");
      this.testCats = res.data;
    },
  },
  created() {
    this.fetchTestCats();
  },
};
</script>
