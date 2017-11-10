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
        </div>
        <!-- 公告 -->
        <div class="bulletin-wrapper"></div>
    </div>
</template>

<script type='text/ecmascript-6'>
    // 对应app.vue import
    export default{
        // 接受传递过来的v-bind来的属性使用props组件传递数据
        props: {
            seller: {
                //  必须首字母大写
                type: Object
            }
        },
        // 创建折扣图片数组
        created() {
            this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
            // console.log(this.iconClassMap);
        }
    };
</script>

<style lang="stylus" rel='stylesheet/stylus'>

//  引入mixin.styl
    @import "../../common/stylus/mixin.styl";
    .header
        color: #ffffff
        background: #000
        .content-wrapper
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
                    line-height: 12px
</style>

