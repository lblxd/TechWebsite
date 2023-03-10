<template>
  <div class="login-container">
    <el-card header="注册" class="login-card">
      <el-form @submit.native.prevent="signup">
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <img v-if="model.avatar" :src="model.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="model.username" minlength="4" maxlength="12"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            show-password
            v-model="model.password"
            minlength="6"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item class="text-center">
          <el-button type="primary" native-type="submit">注册</el-button>
        </el-form-item>
        <el-form-item class="text-center">
          <el-button type="text" @click.native="$router.push('/login')"
            >有账号，点我去登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        avatar: "",
      },
    };
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, "avatar", res.url); /* 显式赋值 */
    },

    async signup() {
      if (!this.model.avatar || !this.model.username || !this.model.password) {
        this.$message({
          type: "warning",
          message: "请填写完整信息",
        });
        return;
      }else{
        const res = await this.$http.post("signup", this.model);
        this.$router.push("/login");
        this.$message({
          type: "success",
          message: "注册成功，可以去登录了",
        });
      }
    },
  },
};
</script>

<style>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>
