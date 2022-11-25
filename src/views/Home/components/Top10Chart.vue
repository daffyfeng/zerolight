<template>
    <custom-echarts v-bind:options="options" style="width: 100%;height: 100%"></custom-echarts>
</template>

<script setup lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import {组件名称} from '{组件路径}';
import CustomEcharts from '@/components/CustomEcharts.vue';
import { computed, onMounted, ref } from 'vue';
import { getTodayTop10 } from "@/api/home"
import formatDate from '@/utils/formatDate';

const props = defineProps({
    type: {
        type: String,
        required: true,
        default() {
            return '历史'
        }
    },

})

const options = ref({})
const site_names = ref(['', '', '', '', '', '', '', '', '', ''])
const access_nums = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
const title = computed(() => props.type + '访问Top10')

function updateEchart() {
    options.value = {
        title: { text: title.value },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        axisPointer: {
            link: [
                {
                    xAxisIndex: 'all'
                }
            ]
        },
        xAxis: {

        },
        yAxis: {
            data: site_names.value.reverse(),
            boundaryGap: false,
            type: 'category',
            axisLine: { onZero: false },
        },
        series: [
            {
                name: "pv",
                type: "bar",
                data: access_nums.value.reverse(),
            },
        ],
    }
}

function init() {
    const params = props.type === '今日' ? { accessDate: formatDate(Date.now(), 'yyyy-MM-dd') } : {}
    getTodayTop10(params).then((data: any) => {
        data.forEach((d: any, i: any) => {
            site_names.value[i] = d.site_name || ''
            access_nums.value[i] = d.access_num
        })
        updateEchart();
    })
}

onMounted(() => {
    init()
})

</script>
<style lang='scss' scoped>

</style>