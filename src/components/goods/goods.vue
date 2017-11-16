<template>
    <div class="goods">
        <!-- 左侧导航 -->
        <div class="menu-wrapper">
            <ul>
                <li v-for="item in goods">
                    <span class="text">
                        <!-- 添加判断type是否大于0 -->
                        <span v-show="item.type>0" class="icon"></span>{{ item.name }}
                    </span>
                </li>
            </ul>
        </div>
        <!-- 右侧内容 -->
        <div class="foods-wrapper"></div>
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
        .foods-wrapper
            flex: 1
</style>


