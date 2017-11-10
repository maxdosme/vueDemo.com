<template>
    <div class="header">
        <!-- 内容区 -->
        <div class="content-wrapper">
            <div class="avatar">
                <!-- src来自data.json 使用v-bind绑定 不能直接src会提示找不到 -->
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name"></span>
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
        }
    };
</script>

<style lang="stylus" rel='stylesheet/stylus'>

</style>

