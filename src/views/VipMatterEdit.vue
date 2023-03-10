<template>
  <div class="about">
    <div class="d-flex py-3 px-2 border-bottom ai-center">
      <router-link tag="div" to="/matter" class="iconfont icon-fanhui text-blue">
      </router-link>
      <strong class="flex-1 text-blue pl-2 text-center fs-xl">
        描述您的问题
      </strong>
    </div>
    <el-form label-width="120px" @submit.native.prevent="save" class="mt-3 pt-2">
      <el-form-item label="问题">
        <el-input v-model="model.question"></el-input>
      </el-form-item>
      <el-form-item class="text-center">
        <el-button type="primary" native-type="submit">发帖</el-button>
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
      model: {},
      consumer:'',
    };
  },
  methods: {
    async save() {
      this.model.author = this.consumer._id;
      const res = await this.$http.post("matter", this.model);
      this.$router.push("/matter");
      this.$message({
        type: "success",
        message: "提问成功",
      });
    },
    async fetchConsumer() {
      const res = await this.$http.get("consumer");
      this.consumer = res.data;
    },
  },
  created() {
    this.fetchConsumer()
  },
};
</script>
