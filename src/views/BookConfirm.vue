<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <router-link tag="div" :to="`/books/list/${id}`" class="iconfont icon-fanhui text-blue">
      </router-link>
      <strong class="flex-1 text-blue pl-2 text-center"> 确认付款</strong>
      <div class="text-grey fs-xs">{{ model.updatedAt | date }}</div>
    </div>
    <!-- end of topbar -->
    <div class="info d-flex bg-white pt-3 ai-center jc-center">
      <div class="infotext m-0 d-flex flex-column jc-around ai-center">
        <img :src="model.icon" class="mt-3 pb-3" style="width: 40%" />
        <div class="px-2 mt-3">商品名称:{{ model.name }}</div>
        <div class="px-2 mt-3">收货地址:{{ consumer.address }}</div>
        <div class="d-flex jc-around mt-3 w-100">
          <span>图书类型:{{ model.category.name }}</span>
          <span v-if="this.consumer.isvip">图书单价:{{ (model.price *0.8).toFixed(2)}}元</span>
          <span v-if="!this.consumer.isvip">图书单价:{{ model.price}}元</span>
        </div>
        <div class="d-flex jc-around mt-3 w-100">
          <div class="d-flex flex-wrap ai-center jc-center">
            <button @click="sub" class="btn-price">-</button>
            <span class="fs-xxl btn text-center">{{ quantity }}</span>
            <button @click="add" class="btn-price">+</button>
          </div>
          <span class="fs-xxl text-price">总计:{{ total}}</span>
        </div>
        <div class="p-3 d-flex ai-center jc-around w-100">
          <router-link
            tag="button"
            :to="`/books/list/${this.id}`"
            class="btn bg-gray"
          >
            取消
          </router-link>
          <button class="btn btn-lg" @click="pay()">付款</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import count from "../components/count";
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  props: {
    id: { require: true },
  },
  data() {
    return {
      model: {
        category: "",
      },
      price: "",
      quantity: count.state.quantity,
      total: "",
      consumer: {
        purchased: [],
      },
      item: {
        book: "",
        quantity: "",
        total: "",
      },
    };
  },
  watch: {
    id: "fetch",
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`books/list/${this.id}`);
      this.model = res.data;
      const money = JSON.parse(res.data.price);
      return money;
    },
    async fetchConsumer() {
      const res = await this.$http.get("consumer");
      this.consumer = res.data;
    },
    async comp() {
      this.price = await this.fetch();
      if(this.consumer.isvip){
         const a = this.price * this.quantity *0.8;
         this.total = a.toFixed(2)
      }else{
        const a = this.price * this.quantity;
        this.total = a.toFixed(2)
      }
      this.item.book = this.id;
      this.item.quantity = this.quantity;
      this.item.total = this.total;
    },
    add() {
      if (this.quantity < 3) {
        this.quantity++;
        this.comp()
        count.setStateQuantity(this.quantity);
      }
    },
    sub() {
      if (this.quantity > 0) {
        this.quantity--;
        this.comp()
        count.setStateQuantity(this.quantity);
      }
    },
    async pay() {
      this.$confirm(`确定购买`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.post(`/books/pay/${this.id}`, this.item);
        this.consumer.purchased.push(res.data);
        const user = await this.$http.put(
          `consumer/confirm/edit/${this.consumer._id}`,
          this.consumer
        );
        this.$message({
          type: "success",
          message: "购买成功!详情前往个人中心确认",
        });
        this.$router.push(`/books/list/${this.id}`);
      });
    },
  },
  created() {
    this.fetch();
    this.comp();
    this.fetchConsumer();
  },
};
</script>

<style lang="scss">
.page-article {
  .icon-fanhui {
    font-size: 1.6923rem;
  }
  .body {
    h1 {
      line-height: 2em;
    }
    img {
      padding-top: 1rem;
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
