<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom ai-center">
      <router-link tag="div" to="/" class="iconfont icon-fanhui text-blue">
      </router-link>
      <strong class="flex-1 text-blue pl-2 text-center"> 论坛 </strong>
      <router-link
        tag="button"
        to="/forum/create/"
        class="btn bg-blue py-2 text-white"
        >去发帖</router-link
      >
    </div>

    <el-table :data="model" style="width: 100%; height: 100vh;">
      <el-table-column type="index" :index="indexMethod"> </el-table-column>
      <el-table-column prop="author.username" label="发帖人">
      </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
       <el-table-column prop="createdAt" label="发布时间">
        <template slot-scope="scope">
          <div>{{scope.row.createdAt | date}}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="$router.push(`/forum/${scope.row._id}`)" type="text" size="small"
            >查看</el-button
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
      model:[],
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    async fetch() {
      const res = await this.$http.get(`forum/list`);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>
