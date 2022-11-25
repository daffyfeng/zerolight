<!-- 自定义table -->
<template>
    <div class='custom-table'>
        <el-table ref="bannerTable" :data="tableData" header-row-class-name="custom-table-header"
            :header-cell-style="headerStyle" table-layout="fixed" :border="true" stripe
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column v-for="item in tableHeader" v-bind:key="item.prop" :prop="item.prop" :label="item.label"
                :width="item.width">
                <template #default="scope">
                    <span v-if="item.type === 'date'">{{ formatDate(scope.row[item.prop]) }}</span>
                    <span v-else>{{ scope.row[item.prop] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200px">
                <template #default="scope">
                    <el-button size="small" type="primary" :icon="Edit" @click="editData(scope.row)"></el-button>
                    <el-button size="small" type="danger" :icon="Delete" @click="deleteData(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="custom-table-pagination">
            <el-pagination v-model:currentPage="pageNum" v-model:page-size="pageSize" :page-sizes="[10]" background
                layout="total, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import {组件名称} from '{组件路径}';
import { ref, onBeforeMount, watch } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { tableHeaders } from "@/assets/js/common"
import formatDate from '@/utils/formatDate';


const headerStyle = {
    "background-color": "rgb(245, 247, 250)"
}


const props = defineProps({
    tableType: {
        type: String,
        required: true,
        validator(value: any) {
            return ['group', 'website', 'banner'].includes(value)
        }
    },
    searchApi: {
        type: Function,
        required: true,
    },
    searchStr: {
        type: String,
        default: ''
    }
})

watch(() => props.tableType, (nVal: string) => {
    if (nVal) {
        // header类型确认
        tableHeader.value = tableHeaders[nVal]
    }
})

onBeforeMount(() => {
    tableHeader.value = tableHeaders[props.tableType]
    searchData()
})


const tableHeader = ref<any[]>([])
const tableData = ref<any[]>([])
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)


const searchData = () => {
    const params = {
        searchKey: props.searchStr,
        pageNum: pageNum.value,
        pageSize: pageSize.value,
    }
    props.searchApi(params).then(({ datas, totalNum }: { datas: any, totalNum: any }) => {
        tableData.value = datas
        total.value = totalNum
    })
}

const emits = defineEmits(['handleSelectionChange', 'editData', 'deleteData'])

const handleSelectionChange = (val: any) => {
    emits('handleSelectionChange', val)
}

const editData = (data: any) => {
    emits('editData', data)
}

const deleteData = (data: any) => {
    console.log(data);
    emits('deleteData', data)
}

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
    pageSize.value = val
    searchData()
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    pageNum.value = val
    searchData()
}

defineExpose({ searchData, deleteData })

</script>
<style lang='scss' scoped>
.custom-table-pagination {
    margin-top: 20px;
    display: flex;
    flex-direction: row-reverse;
}
</style>