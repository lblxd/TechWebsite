<template>
  <div class="about">
    <div class="d-flex py-3 px-2 border-bottom ai-center">
      <router-link tag="div" to="/forum" class="iconfont icon-fanhui text-blue">
      </router-link>
      <strong class="flex-1 text-blue pl-2 text-center fs-xl">
        发帖
      </strong>
    </div>
    <el-form label-width="120px" @submit.native.prevent="save" class="mt-3 pt-2">
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章详情">
        <vue-editor
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="model.body"
        ></vue-editor>
      </el-form-item>
      <el-form-item class="text-center">
        <el-button type="primary" native-type="submit">发帖</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {},
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {},
      consumer:'',
    };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      this.model.author = this.consumer._id;
      const res = await this.$http.post("forum", this.model);
      this.$router.push("/forum");
      this.$message({
        type: "success",
        message: "发布成功",
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
