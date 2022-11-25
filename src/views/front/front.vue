<template>
    <div class="layout-container">
        <el-container>
            <el-header class="header-bar">
                <head-bar></head-bar>
            </el-header>
            <el-main class="content">
                <router-view></router-view>
                <el-backtop :right="100" :bottom="100" />
            </el-main>
            <el-footer class="footer">
                <footer-bar></footer-bar>
            </el-footer>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import headBar from './components/headBar.vue';
import { getGroups, getBanners } from '@/api/common';
import { groupStore } from '@/store/group';
import { localStorageSet, localStorageGet } from '@/utils/localstorage';

import footerBar from './components/footerBar.vue'

const groups = localStorageGet('groups')
const store = groupStore()
if (Object.keys(groups).length > 0) {
    store.groups = groups
} else {
    getGroups().then((data) => {
        store.groups = data
        // 过期时间
        localStorageSet("groups", data, 24)
    })
}

getBanners().then((data) => {
    store.banners = data
})




</script>

<style lang="scss">
.layout-container {
    width: 100%;
    height: 100%;

    .header-bar {
        width: 100%;
        height: 50px;
        overflow: hidden;
        position: fixed;
        top: 0;
        z-index: 999;
        background: rgba($color: #fff, $alpha: 0.3);
        -webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
        padding: 0;
    }

    .content {
        min-height: calc(100vh - 180px);
        padding: 0;

        .content-carousel {
            width: 100%;
        }

        .content-item {
            width: $content-width;
            margin: 0 auto;
        }

        .demonstration {
            color: var(--el-text-color-secondary);
        }

        .el-carousel__item h3 {
            color: #475669;
            opacity: 0.75;
            line-height: 150px;
            margin: 0;
            text-align: center;
        }

        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n + 1) {
            background-color: #d3dce6;
        }
    }

    .footer {
        padding: 0;
    }
}
</style>
