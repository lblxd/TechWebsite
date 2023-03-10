<template>
  <div>
    <el-form label-width="80px" @submit.native.prevent="save" class="p-2">
      <el-form-item label="新密码" class="mt-3 text-center" >
        <el-input
          type="password"
          show-password
          v-model="consumer.password"
          style="width:90%"
        ></el-input>
      </el-form-item>
      <el-form-item class="text-center">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      consumer: "",
    };
  },
  methods: {
    afterUpload(res) {
      /* this.$set(this.model,'icon',res.url) */ /* 显式赋值 */
      this.consumer.avatar = res.url;
    },
    async fetchConsumer() {
      const res = await this.$http.get("consumer");
      this.consumer = res.data;
    },
    async save() {
      const res = await this.$http.put(`consumer/password/edit/${this.id}`, this.consumer)
      this.$message({
        type: "success",
        message: "修改成功,请重新登录",
      });
      localStorage.clear();
      this.$router.push('/login')
    },
  },
  created() {
    this.fetchConsumer();
  },
};
</script>
