<template>
  <div>
    <el-form label-width="100px" @submit.native.prevent="save" class="p-2">
      <el-form-item label="更换头像" style="text-align: center" class="mt-3 ">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="consumer.avatar" :src="consumer.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="consumer.username"></el-input>
      </el-form-item>
      <el-form-item label="收货地址">
        <el-input v-model="consumer.address"></el-input>
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
      const res = await this.$http.put(`consumer/edit/${this.id}`, this.consumer)
      this.$message({
        type: "success",
        message: "修改成功",
      });
    },
  },
  created() {
    this.fetchConsumer();
  },
};
</script>
