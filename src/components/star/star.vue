<template>
    <!-- 星星组件 -->
    <div class="star" :class="starType">
        <!-- 使用v-for循环输出星星(数组) -->
        <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script type="text/ecmascript-6">

// 定义常量
    // 星星长度
    const LENGTH = 5;

    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';

    // 定义组件new一个实例。外传入两个参数：star尺寸大小、star得分
    export default {
        props: {
            // 尺寸
            size: {
                // 尺寸类型（首字母大写数字类型）
                type: Number
            },
            // 分数
            score: {
                type: Number
            }
        },
        // 使用vue的计算属性,映射出星星计算方法。
        computed: {
            starType() {
                // 依赖跟踪size: {}（可以添加不同的class:star-）
                return 'star-' + this.size;
            },
            // 计算itemClasses
            itemClasses() {
                let result = [];
                //  向下取0.5倍数变量
                let score = Math.floor(this.score * 2) / 2;
                //  定义如果不等于0变量
                let hasDecimal = score % 1 !== 0;
                //  整数（向下取整）取整转化分数，4.2 -> 4 变量
                let integer = Math.floor(score);
                //  循环转换后的全星
                for (let i = 0; i < integer; i++) {
                    //  数组添加全星
                    result.push(CLS_ON);
                }
                    //  如果不为0 添加半星
                if (hasDecimal) {
                    result.push(CLS_HALF);
                }
                //  多出来的长度添加“灰星”
                while (result.length < LENGTH) {
                    result.push(CLS_OFF);
                }
                return result;
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">

// 引入mixin.styl切换星星class
@import "../../common/stylus/mixin.styl";

    .star
        font-size: 0
        // 通用样式
        .star-item
            display: inline-block
            background-repeat: no-repeat
        &.star-48
            .star-item
                width 20px
                height: 20px
                margin-right: 22px
                background-size: 20px 20px
                // 清除最后一个星星的margin-right
                &:last-child
                    margin-right: 0
                // 星星三种状态：on、half、off使用mixin.styl更换
                &.on
                    bg-image('star48_on')
                &.half
                    bg-image('star48_half')
                &.off
                    bg-image('star48_off')
        &.star-36
            .star-item
                width 15px
                height: 15px
                margin-right: 6px
                background-size: 15px 15px
                // 清除最后一个星星的margin-right
                &:last-child
                    margin-right: 0
                // 星星三种状态：on、half、off使用mixin.styl更换
                &.on
                    bg-image('star36_on')
                &.half
                    bg-image('star36_half')
                &.off
                    bg-image('star36_off')
        &.star-24
            .star-item
                width 10px
                height: 10px
                margin-right: 3px
                background-size: 10px 10px
                // 清除最后一个星星的margin-right
                &:last-child
                    margin-right: 0
                // 星星三种状态：on、half、off使用mixin.styl更换
                &.on
                    bg-image('star24_on')
                &.half
                    bg-image('star24_half')
                &.off
                    bg-image('star24_off')
</style>


