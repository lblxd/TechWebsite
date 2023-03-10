<template>
  <m-card :icon="icon" :title="title" :gengduo="gengduo" :link="link">
        <div class="nav jc-between">
          <div
            class="nav-item"
            :class="{ active: active === i }"
            v-for="(category, i) in categories"
            :key="i"
            @click="$refs.list.swiper.slideTo(i)"
          >
            <div class="nav-link">{{ category.name }}</div>
          </div>
        </div>
        <div class="pt-3">
          <swiper
            ref="list"
            :options="{ autoHeight: true }"
            @slide-change="() => (active = $refs.list.swiper.realIndex)"
          >
            <!-- 这里的ref类似html的id -->
            <swiper-slide v-for="(category, i) in categories" :key="i">
              <slot name="items" :category="category"></slot>
              <!--外层v-for的category传给了这个slot,这样在外面要用的时候就可以用这里的category了 -->
            </swiper-slide>
          </swiper>
        </div>
  </m-card>
</template>

<script>
export default {
  props: {
    title: { type: String },
    icon: { type: String },
    gengduo: { type: String },
    categories: { type: Array },
    link: { type: String },
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>
