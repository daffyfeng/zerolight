<template>
    <section class="website-bar" shadow="always">
        <div class="bar-head">
            <span class="title">{{ catalogName }}</span>
            <el-button v-if="!!groupId === false" @click="showMore">更多</el-button>
        </div>
        <div class="bar-body">
            <div class="website" v-for="site, i in showSites" :key="site.siteId">
                <el-card class="website-card" shadow="hover" data-warden-container>
                    <div class="card-body" @click="toggle(site.siteAddress)" :data-warden-siteId="site.siteId"
                        :data-warden-siteAddress="site.siteAddress"
                        :class="{ odd: parseInt(i / 4 + '') % 2 === 1, even: parseInt(i / 4 + '') % 2 === 0 }">
                        <el-image class="image" :src="site.siteIcon" :fit="'contain'" />
                        <span class="title">{{ site.siteName }}</span>
                        <span class="desc"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ site.siteDesc }}</span>
                    </div>
                </el-card>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import {组件名称} from '{组件路径}';
import { getWebsitesByCatalog } from '@/api/common';
import { computed, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()

const groupId = route.query.catalogId



const props = defineProps({
    catalog: {
        type: Number,
        required: true,
    },
    catalogName: {
        type: String,
        required: true,
    },
})

const websites = ref<[{
    siteId: number,
    siteName: "",
    catalogId: number,
    siteAddress:
    "",
    siteDesc: "",
    siteOrder: number,
    siteIcon: "",
}]>()


getWebsitesByCatalog(props.catalog).then((data: any) => {
    websites.value = data
})

const showSites = computed(() => {
    return route.path != '/more' ? websites.value?.slice(0, 8) : websites.value
})

const showMore = () => {
    router.push({ path: 'more', query: { catalogId: props.catalog } })
}

const toggle = (url: string) => {
    window.open(url, '_blank')
}
</script>
<style lang='scss'>
.website-bar {
    margin: 10px auto 43px;

    .bar-head {

        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;

        .title {
            font-size: 18px;
            line-height: 18px;
            font-weight: 600;
            color: #666666;
        }

        span.title::after {
            content: " ";
            display: inline-block;
            width: 38px;
            height: 10px;
            margin: 0 0 0 -18px;
            background: url(/img/tag.png) no-repeat;
            z-index: -1;
        }

        .el-button {
            border-radius: 16px;
        }
    }

    .bar-body {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .website:hover {
            z-index: 2;
        }

        .website {
            width: 25%;
            cursor: pointer;
            // background: linear-gradient(90deg, #FAFAFA 2.17%, rgba(244, 244, 244, 0) 98%);
            // transform: matrix(1, 0, 0, -1, 0, 0);

            .website-card {
                border: 0;

                >div {
                    padding: 0;
                }

                .card-body {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    height: 220px;
                }

                .even {
                    background: linear-gradient(90deg, #FAFAFA 2.17%, rgba(244, 244, 244, 0) 98%);
                }

                .odd {
                    background: linear-gradient(-90deg, #FAFAFA 2.17%, rgba(244, 244, 244, 0) 98%);
                }

            }

            .image {
                width: $site-size;
                height: $site-size;
            }


            .title {
                margin: 16px auto 12px;
            }

            .desc {
                margin: 0 16px;
            }

        }


    }
}
</style>