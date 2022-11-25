<template>
    <div class="website-bar search-result">
        <div class="bar-head">
            <span class="result-title">搜索结果({{ webSites.length + 1 }})：</span>
        </div>
        <div class="bar-body">
            <div class="website" v-for="site, i in webSites" :key="site.siteId">
                <el-card class="website-card" shadow="hover">
                    <div class="card-body"
                        :class="{ odd: parseInt(i / 4 + '') % 2 === 1, even: parseInt(i / 4 + '') % 2 === 0 }">
                        <el-image class="image" :src="site.siteIcon" :fit="'contain'" />
                        <span class="title">{{ site.siteName }}</span>
                        <span class="desc">{{ site.siteDesc }}</span>
                    </div>
                </el-card>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import {组件名称} from '{组件路径}';

import { searchSite } from '@/api/common';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const webSites = ref()
const route = useRoute()
searchSite({ 'searchKey': route.query.key }).then(data => {
    console.log(data);
    webSites.value = data
})

</script>
<style lang='scss' scoped>
.search-result {
    width: $content-width;
    margin-top: 60px;

    .result-title {
        font-size: 18px;
        line-height: 18px;
        font-weight: 600;
    }
}
</style>