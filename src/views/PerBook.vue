<template>
  <div>
    <el-table :data="model" style="width: 100%;">
      <el-table-column type="index" :index="indexMethod"> </el-table-column>
      <el-table-column prop="book.name" label="商品名称"> </el-table-column>
      <el-table-column prop="quantity" label="购买数量" width="50"> </el-table-column>
      <el-table-column prop="total" label="总花费"> </el-table-column>
      <el-table-column prop="createdAt" label="购买时间">
        <template slot-scope="scope">
          <div>{{ scope.row.createdAt | date }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="50">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/books/list/${scope.row.book._id}`)"
            type="text"
            size="small"
            >查看</el-button
          ><br/>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
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
      const res = await this.$http.get("consumer");
      this.model = res.data.purchased;
    },
    indexMethod(index) {
      return index + 1;
    },
    async remove(row) {
      this.$confirm(`是否确定要删除"${row.book.name}记录，不可恢复"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`consumer/book/${row._id}`);
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
