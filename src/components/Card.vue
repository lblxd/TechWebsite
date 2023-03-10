<template>
  <div class="card bg-white p-3 mt-3">
    <div class="card-header d-flex ai-center pb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2">{{title}}</div>
      <router-link
      tag="div"
      :to="`${link}`"
      ><i class="iconfont" :class="`icon-${gengduo}`"></i></router-link>
    </div>
    <div class="card-body pt-3">
        <slot></slot>
    </div>
  </div>
</template>
<script>
import router from '@/router';

export default {
    props: {
        title: { type: String },
        icon: { type: String },
        gengduo: { type: String },
        link: { type: String },
    },
    components: { router }
};
</script>

<style lang="scss">
@import '../assets/scss/variables';
.card{
    .card-header{
        border-bottom: 1px solid $border-color;
    }
     border-bottom: 1px solid $border-color;
}
</style>