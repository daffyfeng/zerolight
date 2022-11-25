<template>
    <custom-echarts v-bind:options="options" style="width: 100%;height: 100%"></custom-echarts>
</template>

<script setup lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import {组件名称} from '{组件路径}';
import { getPV, getUV } from '@/api/home';
import CustomEcharts from '@/components/CustomEcharts.vue';
import { computed, onMounted, ref } from 'vue';


const props = defineProps({
    type: {
        type: String,
        required: true,
        default() {
            return '近30日'
        }
    },

})

const title = computed(() => props.type + '访问趋势')
const options = ref({})

function updateEchart() {
    options.value = {
        title: { text: title.value },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        legend: {
            show: true
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 0,
                end: 100,
                xAxisIndex: [0]
            },
        ],
        axisPointer: {
            link: [
                {
                    xAxisIndex: 'all'
                }
            ]
        },
        xAxis: {
            data: timeline.value,
            boundaryGap: false,
            type: 'category',
            axisLine: { onZero: true },
        },
        yAxis: {},
        series: [
            {
                name: "pv",
                type: "line",
                data: pv.value,
                smooth: true
            },
            {
                name: "uv",
                type: "line",
                data: uv.value,
                smooth: true
            },
        ],
    }
}

onMounted(() => {
    getData().then(() => {
        updateEchart();
    })

})

const pv = ref<any[]>([])
const uv = ref<any[]>([])
const timeline = ref<any[]>([])

function getData() {
    const dayNum = props.type === '近30日' ? 30 : 0
    const type = props.type === '近30日' ? 2 : 1
    return Promise.allSettled([getPV(dayNum), getUV(dayNum)]).then(results => {
        console.log(results);
        results.forEach((result, i) => {
            if (result.status == "fulfilled") {
                const { value } = result
                timeline.value = []
                value.forEach((item: any) => {
                    const time = type === 1 ? item.time.split(' ')[1].replace(/:00/g, '') + ':00' : item.time.split(' ')[0].substring(5).replace('-', '.')
                    timeline.value.push(time)
                    i === 0 ? (pv.value.push(item.PV)) : (uv.value.push(item.UV))
                });
            }
        })
    })
}

</script>
<style lang='scss' scoped>

</style>