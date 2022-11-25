<!-- eslint-disable prettier/prettier -->

<template>
    <section class="content-carousel">
        <el-carousel height="406px" :interval="5000">
            <el-carousel-item v-for="banner in banners" :key="banner.bannerNum">
                <el-image style="width: 100%; height: 100%; cursor: pointer;" :src="banner.bannerIcon" :fit="'cover'"
                    @click="toggle(banner.bannerLink)" />
            </el-carousel-item>
        </el-carousel>
    </section>
    <section class="content-item">
        <banner-bar></banner-bar>
        <group-bar v-for="g in catalogs" :catalog="g.catalogId" :catalogName="g.catalogName" :key="g.catalogId">
        </group-bar>
    </section>
</template>

<script setup lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）

import { groupStore } from '@/store/group';
import { computed } from 'vue';
import bannerBar from '../components/bannerBar.vue';
import groupBar from '../components/groupBar.vue';


//例如：import {组件名称} from '{组件路径}';
// const groups = ref<[{
//     "catalogId": number,
//     "catalogName": "",
//     "catalogDesc": ""
// }]>()

const store = groupStore()
const catalogs = computed(() => store.groups)
const banners = computed(() => store.banners)

const toggle = (url: string) => {
    window.open(url, '_blank')
}
</script>
<style lang='scss' scoped>

</style>