<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom ai-center">
      <router-link tag="div" to="/forum" class="iconfont icon-fanhui text-blue">
      </router-link>
      <strong class="flex-1 text-blue pl-2 text-center">
        {{ model.title }}
      </strong>
      <router-link
        tag="button"
        :to="`/forum/reply/${id}`"
        class="btn bg-blue text-white"
        >回帖</router-link
      >
    </div>

    <div>
      <div class="d-flex px-2 py-3 my-3 bg-white ai-center">
        <div class="d-flex flex-column ai-center jc-center border-right">
          <img
            :src="model.author.avatar"
            style="width: 100px; border-radius: 50%"
          />
          <div class="mt-2 pt-1 d-flex ai-center">
            <p style="max-width: 100px" class="text-center">
              {{ model.author.username }}
            </p>
            <p
              v-if="model.author.isvip === true"
              class="text-center text-price"
            >
              <i class="iconfont icon-vip"></i>
            </p>
          </div>
        </div>
        <div class="h-100 d-flex flex-column jc-start flex-1 pl-2">
          <div v-html="model.body" class="fs-lg flex-1"></div>
          <div class="text-right ml-2">{{ model.creatdAt | date }}</div>
        </div>
      </div>
      <!-- end of creator -->
      <div
        v-for="(item, i) in model.reply"
        :key="i"
        class="d-flex px-2 py-3 my-3 bg-white ai-center"
      >
        <div class="d-flex flex-column ai-center jc-center border-right">
          <img
            :src="item.visitorAvatar"
            alt=""
            style="width: 100px; border-radius: 50%"
          />
          <div class="mt-2 pt-1 d-flex ai-center">
            <span
              v-if="(item.visitorIsVip === true)"
              class="text-center text-price"
              ><i class="iconfont icon-vip"></i
            ></span>
            <span class="text-center" style="max-width: 100px">{{ item.visitorName }}</span>
          </div>
        </div>
        <div class="h-100 d-flex flex-column jc-start flex-1 pl-2">
          <div v-html="item.description" class="fs-lg flex-1"></div>
          <div class="text-right">{{ model.creatdAt | date }}</div>
        </div>
      </div>
    </div>
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

  props: {
    id: { require: true },
  },
  data() {
    return {
      model: { author: "" },
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`forum/list/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>
