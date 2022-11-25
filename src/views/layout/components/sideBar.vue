<!-- 菜单 -->
<template>
    <el-aside class="layout-aside">
        <el-menu class="menus" :router="true" :default-active="activePath" background-color="rgba(0, 21, 41, 1)"
            text-color="#fff">
            <el-menu-item index="/home">Home</el-menu-item>
            <el-menu-item index="/group">分组管理</el-menu-item>
            <el-menu-item index="/website">网站管理</el-menu-item>
            <el-menu-item index="/banner">banner管理</el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script setup lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import {组件名称} from '{组件路径}';
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()

const activePath = ref(route.path)

</script>
<style lang='scss' scoped>
.layout-aside {
    width: 200px;

    .menus {
        height: calc(100vh - 50px);
    }
}
</style>