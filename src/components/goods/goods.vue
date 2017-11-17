<template>
    <div class="goods">
        <!-- 左侧导航 -->
        <div class="menu-wrapper">
            <ul>
                <li v-for="item in goods" class="menu-item">
                    <span class="text border-1px">
                        <!-- 添加判断type是否大于0的显示 -->
                        <span class="icon" v-show="item.type>0" :class="iconClassMap[item.type]"></span>{{ item.name }}
                    </span>
                </li>
            </ul>
        </div>
        <!-- 右侧内容 -->
        <div class="foods-wrapper">
            <ul>
                <li v-for="item in goods" class="food-list">
                    <h1 class="title">{{ item.name }}</h1>
                    <!-- 商品 -->
                    <ul>
                        <li v-for="food in item.foods" class="food-item">
                            <!-- 左右两个盒子 -->
                            <div class="icon">
                                <img :src="food.icon" />
                            </div>
                            <div class="content">
                                <!-- 商品标题 -->
                                <h2 class="name">{{ food.name }}</h2>
                                <!-- 描述 -->
                                <p class="desc">{{ food.description }}</p>
                                <!-- 备注 -->
                                <div class="extra">
                                    <!-- 销售情况 -->
                                    <span>月售{{  food.sellCount }}份</span>
                                    <span>好评率{{  food.rating }}%</span>
                                </div>
                                <!-- 价格 -->
                                <div class="price">
                                    <!-- 售价 -->
                                    <span>￥{{  food.price }}</span>
                                    <!-- 原价通过oldPrice是否有来显示 -->
                                    <span v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

//  引入axios
import axios from 'axios';
    export default {
        // 通过vue-route传数据
        props: {
            seller: {
                type: Object
            }
        },
        //  绑定goods 赋值给data
        data() {
            return {
                goods: []
            };
        },
        // 使用钩子函数创建
        created() {
            // 创建图片数组
                this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'gurantee'];
                // console.log(this.iconClassMap);

            // axios获取json数据
            axios.get('static/data.json').then((res) => {
                this.goods = res.data.goods;
                // console.log(this.goods);
            });
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">

//  引入mixin.styl
@import "../../common/stylus/mixin.styl";

    .goods
        position: absolute
        display:flex
        width: 100%
        top: 174px
        bottom: 46px
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px
            // 兼容性写法需要独立在写一个宽度，不然安卓显示错误
            width: 80px
            background: #f3f5f7
            .menu-item
                display: table
                width: 56px
                height: 54px
                line-height: 14px
                padding: 0 12px
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    // 定义折扣图片class 
                    &.decrease
                        bg-image('decrease_3')
                    &.discount
                        bg-image('discount_3')
                    &.gurantee
                        bg-image('guarantee_3')
                    &.invoice
                        bg-image('invoice_3')
                    &.special
                        bg-image('special_3')
                .text
                    display: table-cell
                    width: 56px
                    // table布局中的垂直居中
                    vertical-align: middle
                    border-1px(rgba(7,17,27,0.1))
                    font-size: 12px
        .foods-wrapper
            flex: 1
            .title
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #d9dde1
                font-size: 12px
                color: rgb(147,153,159)
                background: #f3f5f7
</style>


