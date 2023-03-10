<template>
  <div>
    <el-table :data="model" style="width: 100%; height: 100vh">
      <el-table-column type="index" :index="indexMethod"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="createdAt" label="发布时间">
        <template slot-scope="scope">
          <div>{{ scope.row.createdAt | date }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/forum/${scope.row._id}`)"
            type="text"
            size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  data() {
    return {
      model: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("consumer/paper");
      this.model = res.data;
    },
    indexMethod(index) {
      return index + 1;
    },
    async remove(row) {
      this.$confirm(`是否确定要删除标题为"${row.title}"的帖子吗，一旦删除，用不恢复"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`consumer/paper/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetch();
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>
