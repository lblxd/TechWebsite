<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom ai-center">
      <router-link
        tag="div"
        to="/matter"
        class="iconfont icon-fanhui text-blue"
      >
      </router-link>
      <strong class="flex-1 text-blue pl-2 text-center"> 问题详情 </strong>
      <div class="text-right">提问时间 : {{ model.creatdAt | date }}</div>
    </div>
    <div
      class="body p-3 bg-white h-100 mt-2 d-flex flex-column"
    > 
      <div class="answer fs-lg p-3">问题:{{ model.question }}</div>
      <div class="answer bottom fs-lg flex-1 p-3">
        <div class="text-price fs-xl">解答</div>
        <div v-if="!model.answer" class="text-price mt-2">该问题尚未被解答</div>
        <div v-html="model.answer" class="mt-3 p-2"></div>
        </div>
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
      model: { author: "" },
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`matter/list/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
.answer {
  border-radius: 50px;
  background: #e6eef4;
  box-shadow: 20px 20px 60px #c4cacf, -20px -20px 60px #ffffff;
}
.bottom{
  margin-top: 30px;
}
.body {
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
    height: auto;
  }
}
</style>
