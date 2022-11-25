<template>
    <div class="layout-container">
        <el-container>
            <el-header class="header-bar">
                <head-bar></head-bar>
            </el-header>
            <el-container>
                <side-bar></side-bar>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import headBar from './components/headBar.vue';
import sideBar from './components/sideBar.vue';
import * as echarts from 'echarts';
import { provide } from 'vue'
import { getAllGroups } from '@/api/group';
import { groupStore } from '@/store/group';
import { getSiteTages } from '@/api/website';
const store = groupStore()

getAllGroups().then((data) => {
    store.groups = data
})

getSiteTages().then((data) => {
    store.tags = data
})


provide('echarts', echarts)
</script>

<style lang="scss">
.layout-container {
    width: 100%;
    height: 100%;

    .header-bar {
        height: 50px;
        overflow: hidden;
        position: relative;
        background: #fff;
        -webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
        padding: 0;
    }
}
</style>
