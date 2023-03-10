<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <router-link tag="div" to="/shop" class="iconfont icon-fanhui text-blue">
      </router-link>
      <strong class="flex-1 text-blue pl-2"> 图书详情 </strong>
      <div class="text-grey fs-xs">{{ model.updatedAt | date }}</div>
    </div>
    <!-- end of topbar -->
    <div class="info d-flex bg-white pt-3 ai-center">
      <img :src="model.icon" height="200" />
      <div class="infotext m-0 ml-3 d-flex flex-column jc-around h-100 flex-1">
        <h2 class="text-center">{{ model.name }}</h2>
        <div class="ml-3 flex-1 d-flex flex-column jc-around">
          <div class="py-3" v-if="!this.consumer.isvip">
            <span class="fs-xl">图书价格:</span>
            <span class="text-price fs-xxl">{{ model.price }}元</span>
          </div>
          <div class="py-3" v-if="this.consumer.isvip">
            <i class="iconfont icon-vip fs-xxl text-red"></i>
            <strong class="fs-xl text-price">会员价:</strong>
            <span class="text-price fs-xxl">{{ (model.price *0.8).toFixed(2)}}</span>
          </div>
          <div>图书作者:{{ model.author }}</div>
          <div class="fs-lg pt-2" v-if="model.category">
            <span>图书类型:{{ model.category.name }}</span>
          </div>
          <div class="d-flex jc-between">
            <div>
              <span>图书评分:</span>
              <span class="badge bg-blue">{{ model.scores }}</span>
            </div>
            <span class="text-red pr-3">单人限购3本!</span>
          </div>
        </div>
        <div class="p-3 d-flex ai-center jc-around flex-wrap">
          <div class="d-flex flex-wrap ai-center jc-center">
            <button @click="sub" class="btn-price">-</button>
            <span class="fs-xxl btn text-center">{{ quantity }}</span>
            <button @click="add" class="btn-price">+</button>
          </div>
          <router-link
            tag="button"
            :to="`/books/bookconfirm/${this.id}`"
            class="btn-lg px-3 py-1 bg-price fs-lg text-white w-100"
            style="border: none"
          >
            <i class="iconfont icon-yijiangoumai"></i>
            点击购买
          </router-link>
        </div>
      </div>
    </div>
    <!-- end of book -->
    <div class="d-flex flex-column">
      <div class="fs-xl pt-3 mt-3 text-red">图书详情</div>
      <div
        v-html="model.description"
        class="pt-3 body fs-lg mt-3 border-top flex-1"
      ></div>
      <!-- end of description -->
    </div>

    <!-- end of related -->
  </div>
</template>

<script>
import count from "../components/count";
import router from "@/router";
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  props: {
    id:{ require: true },
  },
  data() {
    return {
      model: null,
      quantity: count.state.quantity,
      consumer:"",
    };
  },
  watch: {
    id: "fetch",
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`books/list/${this.id}`);
      this.model = res.data;
      console.log(this.id)
    },
    async fetchConsumer() {
      const res = await this.$http.get("consumer");
      this.consumer = res.data;
    },
    add() {
      if (this.quantity < 3) {
        this.quantity ++
        count.setStateQuantity(this.quantity)
      }
    },
    sub() {
      if (this.quantity > 1) {
        this.quantity--;
        count.setStateQuantity(this.quantity)
      }
    },
  },
  created() {
    this.fetch();
    this.fetchConsumer();
  },
  components: { router },
};
</script>

<style lang="scss">
.page-article {
  .info {
    h2 {
      line-height: 1.5em;
    }
  }
  .btn-price {
    border: 1px solid #db9e3f;
    padding:0.2rem 0.8rem;
  }
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
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>
