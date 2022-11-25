<template>
    <div class='footer'>
        <section class="footer-content">
            <span>
                <router-link :to="{ path: '/disclaimer' }">免责声明</router-link>
            </span>
            <span>关于我们</span>
            <span>联系我们</span>
        </section>
        <el-divider border-style="" />
        <section class="footer-bottom">
            Copyright C 2022灵光-蜀ICP备 16005435号-1
        </section>
    </div>
</template>

<script setup lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import {组件名称} from '{组件路径}';

</script>
<style lang='scss' scoped>
.footer {
    width: 100%;
    height: 180px;
    background-color: #383E45;
    text-align: center;

    .footer-content {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 14px;
        color: #999999;
        display: flex;
        justify-content: space-around;
        align-items: center;
        min-height: 100px
    }

    .el-divider {
        border-color: #292929;
    }

    .footer-bottom {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
        color: #777777;
    }
}
</style>