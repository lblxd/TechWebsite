<template>
  <div class="d-flex ai-center flex-column usermessage">
    <p class="fs-lg">账户信息</p>
    <img :src="consumer.avatar" alt="" />
    <h1 class="m-0 mt-3">{{ consumer.username }}</h1>
    <p class="m-0 mt-3 fs-xxl">收货地址:{{ consumer.address }}</p>
    <p>账户创建时间:{{ consumer.createdAt | date }}</p>
    <div v-if="consumer.isvip == true" class="text-center d-flex mt-2">
      <i class="iconfont icon-vip fs-xxl text-red"></i>
      <strong class="text-price">您已经是尊贵的会员了</strong>
    </div>
    <div v-if="consumer.isvip == false" class="text-center d-flex">
      <strong>您还没有开通会员</strong>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("YYYY/MM/DD");
    },
  },
  data() {
    return {
      consumer: "",
    };
  },
  methods: {
    async fetchConsumer() {
      const res = await this.$http.get("consumer");
      this.consumer = res.data;
    },
  },
  created() {
    this.fetchConsumer();
  },
};
</script>

<style lang="scss">
.usermessage {
  height: 100vh;

  img {
    width: 300px;
    border-radius: 50%;
    border: 3px solid #db9e3f;
  }
}
</style>
