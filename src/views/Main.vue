<template>
  <div>
    <div class="maintop">
      <div class="topbar bg-black py-2 px-3 d-flex ai-center">
        <router-link tag="div" to="/">
          <img src="../assets/logo.png" height="30" />
        </router-link>
        <div class="px-2 flex-1">
          <div class="text-white">上岸考研教辅网</div>
          <div class="text-grey fs-xxs">一定上岸</div>
        </div>
        <button type="button" class="btn bg-primary" @click="quit">
          退出账号
        </button>
      </div>
      <div class="bg-primary pt-3 pb-2">
        <div class="nav nav-inverse pb-1 jc-around">
          <div class="nav-item active">
            <router-link class="nav-link" tag="div" to="/">首页</router-link>
          </div>
          <div class="nav-item">
            <router-link class="nav-link" tag="div" to="/shop"
              >教辅商城</router-link
            >
          </div>
          <div class="nav-item">
            <router-link class="nav-link" tag="div" to="/percenter"
              >个人中心</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div>
      <router-view class="main-view"></router-view>
      <router-view name="footer"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    quit() {
      localStorage.clear();
      this.$router.push("/login");
      this.$message({
        type: "success",
        message: "退出成功，请重新登录",
      });
    },
  },
};
</script>

<style lang="scss">
.maintop {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
