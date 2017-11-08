<template>
  <div>
    <v-header></v-header>
    <div class="tab">
      <!-- 使用v-link进行导航 -->
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 路由外链 -->
    <router-view></router-view>
  </div>
</template>

<script>
// 注册import组件
  import header from './components/header/header.vue';
  export default {
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel='stylesheet/stylus'>
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      .tab-item
        flex: 1
        text-align center
        // &表示父元素也就是.tab-item
        & > a
          display: block
</style>
