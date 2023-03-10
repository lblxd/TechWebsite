<template>
  <div class="page-article" v-if="model">
    <div class="d-flex flex-column ai-center pt-2">
      <img src="../assets/logo.png" alt="" class="mt-3" />
      <h2>加入会员</h2>
      <div>
        <span>会员价格</span>
        <span>15.00元/月</span>
      </div>
      <div class="p-3 border-bottom">
        <button class="btn btn-lg flex-1" @click="isVip">
          <i class="iconfont icon-yijiangoumai"></i>
          点击购买
        </button>
      </div>
      <div
        class="fs-xxl  text-price mt-3 p-2"
        style="line-height: 2rem"
      >
        现在升级成会员身份后可立即享受以下高级权益。
        <ul>
          <li>粉色昵称</li>
          <li>免费视频课程</li>
          <li>免费直播课</li>
          <li>免费提问考研问题</li>
          <li>商城购买考研资料享受8折</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: null,
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`consumer`);
      this.model = res.data;
    },
    async isVip() {
      this.$confirm("是否确定要开通会员", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.model.isvip = true;
        const res = await this.$http.put(
          `consumer/vip/edit/${this.model._id}`,
          this.model
        );
        this.$message({
          type: "success",
          message: "成功开通一个月会员!",
        });
        this.$router.push("/percenter");
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
.page-article {
  height: 100vh;
  .info {
    h2 {
      line-height: 1.5em;
    }
  }
  .icon-fanhui {
    font-size: 1.6923rem;
  }
}
</style>
