<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom ai-center">
      <router-link tag="div" to="/" class="iconfont icon-fanhui text-blue">
      </router-link>
      <strong class="flex-1 text-blue pl-2 text-center">
        会员问题列表
      </strong>
      <router-link
        tag="button"
        to="/matter/create/"
        class="btn bg-blue py-2 text-white"
        >去提问</router-link
      >
    </div>

    <el-table
    :data="model.filter(data => !search || data.question.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%;height: 100vh;">
      <el-table-column type="index" :index="indexMethod"> </el-table-column>
      <el-table-column prop="question" label="问题">
      </el-table-column>
      <el-table-column prop="state" label="问题状态" width="180" align="center">
        <template slot-scope="scope">
          <el-switch
            style="display: block;"
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="已解决"
            inactive-text="未解决"
            disabled
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="提问时间" width="100">
        <template slot-scope="scope">
          <div>{{ scope.row.createdAt | date }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="90">
        <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="搜索"/>
      </template>
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/matter/${scope.row._id}`)"
            type="text"
            size="small"
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
      model: [],
      search: ''
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    async fetch() {
      const res = await this.$http.get(`matter/list`);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>
