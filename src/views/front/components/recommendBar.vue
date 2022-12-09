<template>
    <el-card class="banner-card" shadow="always">
        <div class="card-body" data-warden-container>
            <div class="banner" v-for="site in recommendSites" :key="site.siteId" @click="toggle(site.siteAddress)"
                :data-warden-siteId="site.siteId" :data-warden-siteAddress="site.siteAddress">
                <el-image class="image" :src="site.siteIcon" :fit="'contain'" />
                <span class="message">
                    <span class="title">{{ site.siteName }}</span>
                    <span class="desc">{{ site.siteDesc }}</span>
                </span>
            </div>
        </div>
    </el-card>
</template>

<script setup lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import {组件名称} from '{组件路径}';
import { getRecommendSites } from '@/api/common';
import { ref } from 'vue';
const recommendSites = ref<[{
    siteId: 0, siteName: '', catalogId: '', siteAddress: '', siteDesc: '', siteOrder: 0, siteIcon: string
}]>()

getRecommendSites().then((data: any) => {
    recommendSites.value = data
})

const toggle = (url: string) => {
    window.open(url, '_blank')
}
</script>
<style lang='scss'>
.banner-card {
    margin: 0 auto 43px;

    &.el-card {
        border-radius: 12px;
    }

    .card-body {
        display: flex;
        justify-content: space-around;
        height: 100px;

        .banner {
            display: flex;
            align-items: center;
            cursor: pointer;

            .image {
                width: $banner-size;
                height: $banner-size;
            }

            .message {
                margin-left: 8px;
                display: flex;
                flex-direction: column;

                .title {}

                .desc {
                    margin-top: 4px;
                }
            }

        }
    }
}
</style>