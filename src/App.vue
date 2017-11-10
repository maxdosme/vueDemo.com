<template>
  <div>
    <!-- 绑定v-bind vue-resource请求来的数据 -->
    <v-header :bind="seller"></v-header>
    <div class="tab border-1px">
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

<script type='text/ecmascript-6'>
// 注册import组件
  import header from './components/header/header.vue';

  const ERR_OK = 0;

  export default {
    //  ajax请求seller数据.PS:可以使用一个插件vue-resource处理前后端交互
    data() {
      return {
        seller: {}
      };
    },
    //  使用生命周期钩子使用vue-resource插件
    created() {
      //  拿到商家数据调用.then方法es6方法
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        // console.log(response);
        if (response.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data);
          // console.log(this.seller);
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel='stylesheet/stylus'>
  //  引入mixin.styl
  @import "./common/stylus/mixin.styl"
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align center
        // &表示父元素也就是.tab-item
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
