<template>
    <div class="header">
        <!-- 内容区 -->
        <div class="content-wrapper">
            <!-- 左侧头像 -->
            <div class="avatar">
                <!-- src来自data.json 使用v-bind绑定 不能直接src会提示找不到 -->
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <!-- 右侧内容 -->
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{ seller.name }}</span>
                </div>
                <!-- 送达描述 -->
                <div class="description">
                    {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
                </div>
                <!-- 优惠信息 -->
                <div v-if="seller.supports" class="support">
                    <!-- 映射数组 -->
                    <!-- icon动态绑定一个class用来切换图标 -->
                    <span class="icon" :class="iconClassMap[seller.supports[0].type]"></span>
                    <span class="text">{{ seller.supports[0].description }}</span>
                </div>
            </div>
            <!-- 优惠隐藏 -->
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{ seller.supports.length }}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <!-- 公告栏 -->  
        <div class="bulletin-wrapper" @click="showDetail">
             <!-- 文字内容 -->
            <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
            <!-- 箭头 -->
            <i class="icon-keyboard_arrow_right"></i>            
        </div>
        <!-- 背景蒙版图 -->
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%" />
        </div>
        <!-- 全屏蒙版图 -->
        <div v-show="detailShow" class="detail">
            <!-- 清除浮动的外层 -->
            <div class="detail-wrapper clearfix">
                <!-- （内容） -->
                <div class="detail-main">
                    <!-- 标题 -->
                    <h1 class="name">{{ seller.name }}</h1>
                    <!-- 评价星星 -->
                    <div class="star-wrapper">
                        <!-- 使用注册的star插件 -->
                        <star :size="48" :score="seller.score"></star>
                    </div>
                    <!-- 使用flex布局制作title -->
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <!-- 遍历优惠信息 -->
                    <ul v-if="seller.supports" class="supports">
                        <li class="support-item" v-for="item in seller.supports">
                            <!-- 使用$index 取到所有当前下标 -->
                            <span class="icon" :class="iconClassMap[item.type]"></span>
                            <span class="text">{{ item.description }}</span>
                        </li>
                    </ul>
                    <!-- 商家公告 -->
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <!-- 商家公告内容 -->
                    <div class="bulletin">
                        <p class="content">{{ seller.bulletin }}</p>
                    </div>
                </div>
            </div>
            <!-- 关闭按钮 -->
            <div class="detail-close">
                <i class="icon-close"></i>
            </div>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
// 引用star组件
import star from 'components/star/star';

    // 对应app.vue import 创建一个vue实例
    export default{
        // 接受传递过来的v-bind来的属性使用props组件传递数据
        props: {
            seller: {
                //  必须首字母大写
                type: Object
            }
        },
        data() {
            //  编译一个变量，初始化detailShow为none
            return {
                detailShow: false
            };
        },
        //  创建方法
        methods: {
            showDetail() {
                this.detailShow = true;
            }
        },
        // 创建折扣图片数组
        created() {
            this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'gurantee'];
            // console.log(this.iconClassMap);
        },
        //  注册使用子组件star组件
        components: {
            star
        }
    };
</script>

<style lang="stylus" rel='stylesheet/stylus'>

//  引入mixin.styl
    @import "../../common/stylus/mixin.styl";
    .header
        position: relative
        overflow: hidden
        color: #ffffff
        background: rgba(7,17,27,0.5)
        .content-wrapper
            position: relative
            padding: 24px 12px 18px 24px
            // 处理图片和文字中间的空隙
            font-size: 0
            .avatar
                display: inline-block
                vertical-align: top
                img
                    border-radius: 2px 
            .content
                display: inline-block
                margin-left: 16px
                font-size: 14px
            .title
                margin: 2px 0 8px 0
                .brand
                    display: inline-block
                    vertical-align: top
                    width: 30px
                    height: 18px
                    // 直接写图片名填入mixin
                    bg-image('brand')
                    background-size: 30px 18px
                    background-repeat: no-repeat
                .name
                    margin-left: 6px
                    font-size: 16px
                    line-height: 18px
                    font-weight: bold 
            .description
                margin-bottom: 10px
                line-height: 12px
                font-size: 12px
            .support
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 4px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    // 定义折扣图片class 
                    &.decrease
                        bg-image('decrease_1')
                    &.discount
                        bg-image('discount_1')
                    &.gurantee
                        bg-image('guarantee_1')
                    &.invoice
                        bg-image('invoice_1')
                    &.special
                        bg-image('special_1')
                .text
                    font-size: 12px
                    line-height: 10px
            .support-count
                position: absolute
                right: 12px
                bottom: 14px
                padding: 0 8px
                height: 24px
                line-height: 24px
                border-radius: 14px
                background: rgba(0,0,0,0.2)
                text-align: center
                .count
                    vertical-align: top
                    font-size: 10px
                .icon-keyboard_arrow_right
                    margin-left: 2px
                    line-height 24px
                    font-size: 10px
        .bulletin-wrapper
            position: relative
            height: 28px
            line-height: 28px
            padding: 0 22px 0 12px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            background: rgba(7,17,27,0.2)
            .bulletin-title
                display: inline-block
                vertical-align top
                margin-top: 8px
                width: 22px
                height: 12px
                bg-image('bulletin')
                background-size: 22px 12px
                background-repeat: no-repeat
            .bulletin-text
                vertical-align top
                font-size: 10px
                margin: 0 4px
            .icon-keyboard_arrow_right
                position: absolute
                font-size: 10px
                right: 12px
                top: 8px
        .background
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            z-index: -1
            // 添加滤镜效果制作蒙版CSS3 filter
            filter: blur(10px)
        .detail
            position: fixed
            z-index: 100
            top: 0
            left: 0
            width: 100%
            height: 100%
            overflow: auto
            background: rgba(7,17,27,0.8)
            .detail-wrapper
                width: 100%
                min-height: 100%
                .detail-main
                    margin-top: 64px
                    padding-bottom: 64px
                    .name
                        line-height: 16px
                        text-align: center
                        font-size: 16px
                        font-weight: bold 
                    .star-wrapper
                        margin-top: 18px
                        padding: 2px 0
                        text-align: center
                    .title
                        display: flex
                        width: 80%
                        margin: 28px auto 24px auto
                        .line
                            // vue-node编译时自动使用postcss工具会自动添加兼容代码
                            flex: 1
                            position: relative
                            top: -6px
                            border-bottom: 1px solid rgba(255,255,255,0.2)
                        .text
                            padding: 0 12px
                            font-weight: 700
                            font-size: 14px
                    .supports
                        width: 80%
                        margin: 0 auto
                        .support-item
                            padding: 0 12px
                            margin-bottom: 12px
                            font-size: 0
                            &:last-child
                                margin-bottom: 0
                            .icon
                                display: inline-block
                                width: 16px
                                height: 16px
                                vertical-align: top
                                margin-right: 6px
                                background-size: 16px 16px
                                background-repeat: no-repeat
                                &.decrease
                                    bg-image('decrease_2')
                                &.discount
                                    bg-image('discount_2')
                                &.gurantee
                                    bg-image('guarantee_2')
                                &.invoice
                                    bg-image('invoice_2')
                                &.special
                                    bg-image('special_2')
                            .text
                                line-height: 16px
                                font-size: 12px
                    .bulletin
                        width: 80%
                        margin: 0 auto
                        .content
                            padding: 0 12px
                            line-height: 24px
                            font-size: 12px
            .detail-close
                position: relative
                width: 32px
                height: 32px
                margin: -64px auto 0 auto
                clear both
                font-size: 32px
</style>

