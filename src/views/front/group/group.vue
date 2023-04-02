<template>
    <div class='more-site'>
        <group-bar :catalog="catalogId" :catalogName="catalogName" :key="catalogId">
        </group-bar>
    </div>
</template>

<script setup lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import {组件名称} from '{组件路径}';
import { groupStore } from '@/store/group';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import groupBar from '../components/groupBar.vue';
import { getGroups, getBanners } from '@/api/common';
const route = useRoute()
const catalogId = route.query.catalogId as unknown as number
const catalogName = ref('')

const store = groupStore()
if (store.groups && store.groups.length != 0) {
    const group = store.groups.find((g: { catalogId: any; }) => g.catalogId == catalogId)
    catalogName.value = group.catalogName
}else {
    getGroups().then((data) => {
        store.groups = data
        const group = store.groups.find((g: { catalogId: any; }) => g.catalogId == catalogId)
        catalogName.value = group.catalogName
    })
}






</script>
<style lang='scss' scoped>
.more-site {
    width: $content-width;
    margin: 80px auto;
}
</style>