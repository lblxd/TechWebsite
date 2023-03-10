<template>
  <div>
    <div class="maintop">
      <div class="d-flex py-3 px-2 border-bottom bg-el-menu ai-center">
        <router-link tag="div" to="/percenter" class="iconfont icon-fanhui text-blue">
        </router-link>
        <strong class="flex-1 text-white pl-2 text-center">个人中心</strong>
        <router-link tag="button" to="/" class="btn text-blue">
        首页  
        </router-link>
      </div>
      <div class="bg-primary pt-3 pb-2">
        <div class="nav pb-1 jc-around">
          <div class="nav-item active">
            <el-dropdown trigger="click">
              <el-button type="text">
                账户管理<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="$router.push(`/percenter/perpassword/${consumer._id}`)">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="$router.push(`/percenter/peredit/${consumer._id}`)">修改账户信息</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="nav-item">
            <el-button type="text" @click="$router.push('/percenter/perbook')"> 订单管理 </el-button>
          </div>
          <div class="nav-item">
            <el-button type="text" @click="$router.push('/percenter/perpaper')"> 历史发帖 </el-button>
          </div>
        </div>
      </div>
    </div>
    <router-view style="height:100vh"></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<style lang="scss">
.maintop {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>

<script>
export default {
  data() {
    return {
      consumer:''
    };
  },
  methods:{
  async fetchConsumer() {
      const res = await this.$http.get("consumer");
      this.consumer = res.data;
    },
  },
  created(){
    this.fetchConsumer()
  }
};
</script>
