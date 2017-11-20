<template>
    <div class="goods">
        <!-- 左侧导航ref对应scroll插件中$refs -->
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <!-- 反馈menuCurrentIndex() Y实时变化：改变class -->
                <li v-for="(item,index) in goods" :class="index==menuCurrentIndex?'menu-item-selected':'menu-item'">
                    <span class="text border-1px">
                        <!-- 添加判断type是否大于0的显示 -->
                        <span class="icon" v-show="item.type>0" :class="iconClassMap[item.type]"></span>{{ item.name }}
                    </span>
                </li>
            </ul>
        </div>
        <!-- 右侧内容ref对应scroll插件中$refs -->
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{ item.name }}</h1>
                    <!-- 商品 -->
                    <ul>
                        <li v-for="food in item.foods" class="food-item border-1px">
                            <!-- 左右两个盒子 -->
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon" />
                            </div>
                            <div class="content">
                                <!-- 商品标题 -->
                                <h2 class="name">{{ food.name }}</h2>
                                <!-- 描述 -->
                                <p class="desc">{{ food.description }}</p>
                                <!-- 备注 -->
                                <div class="extra">
                                    <!-- 销售情况 -->
                                    <span class="count">月售{{  food.sellCount }}份</span>
                                    <span>好评率{{  food.rating }}%</span>
                                </div>
                                <!-- 价格 -->
                                <div class="price">
                                    <!-- 售价 -->
                                    <span class="now">￥{{  food.price }}</span>
                                    <!-- 原价通过oldPrice是否有来显示 -->
                                    <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
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

//  引入better-scroll插件
import BScroll from 'better-scroll';

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
                goods: [],
                listHeight: [],
                foodsScrollY: 0
            };
        },
        //  使用vue计算属性
        computed: {
            //  定义左侧当前索引位置
            menuCurrentIndex() {
                //  遍历listHeight
                for (let i = 0, l = this.listHeight.length; i < l; i++) {
                    //  获得当前索引值的高度
                    let height1 = this.listHeight[i];
                    //  获得下一个高度
                    let height2 = this.listHeight[i + 1];
                    //  如果是最后一个或满足这个区间条件则返回当前索引（实时发生变化）
                    if (!height2 || (this.foodsScrollY >= height1 && this.foodsScrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            }
        },
        // 使用钩子函数创建
        created() {
            // 创建图片数组
                this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'gurantee'];
                // console.log(this.iconClassMap);

            // axios获取json数据
            axios.get('static/data.json').then((res) => {
                this.goods = res.data.goods;
                //  将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
                this.$nextTick(() => {
                    this._initScroll();         //  初始化scroll
                    this._calculateHeight();    // 初始化列表高度列表
                });
            });
        },
        methods: {
            // 使用scroll插件对应$refs dom元素是ref=""
            _initScroll() {
                this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
                    click: true
                });
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    click: true,
                    //  探针：显示实时滚动的位置
                    probeType: 3
                });

                //  侦听实时滚动:报告
                this.foodsScroll.on('scroll', (pos) => {
                    //  foodsScrollY去接收这个pos.y，因为是小数需要Math取整。Math.abs转换成正值
                    this.foodsScrollY = Math.abs(Math.round(pos.y));
                });
            },
            //  计算高度（使用原生dom来获取）
            _calculateHeight() {
                //  获取.food-list-hook 先获取父元素foodsWrapper在使用JQ获取子元素每个li
                let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
                //  临时变量
                let height = 0;
                //  把第一个高度赋值进去给height变量
                this.listHeight.push(height);
                //  循环获取多个数组遍历foodList
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    //  累加height 使用clientHeight DOM接口拿到每个foodlist高度
                    height += item.clientHeight;
                    //  push到listHeight里
                    this.listHeight.push(height);
                }
            }
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
            .menu-item-selected
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #ffffff
                    font-weight: 700
            .menu-item, .menu-item-selected
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
            .food-item
                display: flex
                margin 18px
                padding-bottom: 18px
                border-1px(rgba(7,17,27,0.1))
                &:last-child
                    border-none()
                    margin-bottom: 0
                .icon
                    flex 0 0 57px
                    margin-right: 10px
                .content
                    flex 1
                    .name
                        margin: 2px 0 8px 0
                        height: 14px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7,17,27)
                    .desc, .extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147,153,159)
                    .desc
                        margin-bottom: 8px
                    .extra
                        line-height: 10px
                        &.count
                            margin-right: 12px
                    .price
                        font-weight: 700
                        line-height: 24px
                        .now
                            margin-right: 8px
                            font-size: 14px
                            color: rgb(240,20,20)
                        .old
                            text-decoration: line-through
                            font-size: 10px
                            color: rgb(147,153,159)
</style>


