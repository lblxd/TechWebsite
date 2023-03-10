<template>
  <div class="about">
    <div class="d-flex py-3 px-2 border-bottom ai-center">
      <router-link
        tag="div"
        :to="`/forum/${id}`"
        class="iconfont icon-fanhui text-blue"
      >
      </router-link>
      <strong class="flex-1 text-blue pl-2 text-center fs-xl">
        编辑回帖内容
      </strong>
    </div>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
      class="mt-3 pt-2"
    >
      <el-form-item label="内容">
        <vue-editor
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="newreply.description"
        ></vue-editor>
      </el-form-item>
      <el-form-item class="text-center">
        <el-button type="primary" native-type="submit">发送</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: { require: true },
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      model:null,
      newreply: {
        visitor: "",
        description: "",
      },
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
      this.newreply.visitorName = this.consumer.username
      this.newreply.visitorAvatar = this.consumer.avatar
      this.newreply.visitorIsVip = this.consumer.isvip
      this.model.reply.push(this.newreply)
      const res = await this.$http.put(`forum/${this.id}`, this.model);
      this.$router.push(`/forum/${this.id}`);
      this.$message({
        type: "success",
        message: "回复成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`forum/list/${this.id}`);
      this.model = res.data;
    },
     async fetchConsumer() {
      const res = await this.$http.get("consumer");
      this.consumer = res.data;
    },
  },
  created(){
      this.fetch()
      this.fetchConsumer()
  }
};
</script>
