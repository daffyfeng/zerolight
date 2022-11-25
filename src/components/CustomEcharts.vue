<!--  -->
<template>
    <div ref="myChartEle" class='m-echarts'></div>
</template>

<script setup lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import {组件名称} from '{组件路径}';
import { onMounted, ref, watch, inject } from 'vue'

const echarts: any = inject('echarts')
const props = defineProps({
    options: {
        type: Object,
        required: true,
    }
})
console.log(3);

const myChartEle = ref<any>(null)

const getRandomId = () => {
    let count = 6, str = '';

    while (count > 0) {
        str += getRandomLower()
        count--
    }
    return 'my-echart-' + str
}

const getRandomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

const initEchart = () => {
    const randomId = getRandomId()
    myChartEle.value.id = randomId
    const myChart = echarts.init(document.getElementById(randomId))
    myChart.setOption(props.options)
}

onMounted(() => {
    console.log(4);
    initEchart();
})

watch(() => props.options, () => {
    initEchart();
})



</script>
<style lang='scss' scoped>
.m-echarts {
    width: 100%;
    height: 100%;
}
</style>