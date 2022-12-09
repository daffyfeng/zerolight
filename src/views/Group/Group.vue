<template>
    <div class=''>
        <el-row>
            <el-col :span="6">
                <el-input type="text" v-model="searchStr" @keyup.enter="searchData"></el-input>
            </el-col>
            <el-col :span="18">
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="addData">创建</el-button>
                <el-button type="danger" :disabled="deletebled" @click="deleteData(selectedData)">删除</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <custom-table ref="groupTable" :tableType="'group'" :search-api="search" :search-str="searchStr"
                    @handle-selection-change="handleSelectionChange" @editData="editData" @deleteData="deleteData">
                </custom-table>
            </el-col>
        </el-row>

        <dialog-form :dialog-visible="visible" :title="title" @close="close(dialogFormRef)"
            @submit="submit(dialogFormRef)">
            <el-form ref="dialogFormRef" :model="formData" :rules="rules" label-position="right" label-width="100px">
                <el-form-item label="名称" prop="catalogName">
                    <el-input v-model="formData.catalogName" />
                </el-form-item>
                <el-form-item label="描述" prop="catalogDesc">
                    <el-input type="textarea" v-model="formData.catalogDesc" />
                </el-form-item>
            </el-form>
        </dialog-form>
    </div>
</template>

<script setup lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import {组件名称} from '{组件路径}';
import { ref, reactive, toRefs } from 'vue';
import DialogForm from '@/components/DialogForm.vue';
import { ElMessage, ElMessageBox, type FormInstance, type FormRules, type UploadFile, type UploadUserFile } from 'element-plus';
import { Delete, Plus } from '@element-plus/icons-vue'
import CustomTable from '@/components/CustomTable.vue';
import { save, search, deleteGroups, deleteGroup, getAllGroups } from "@/api/group"
import { groupStore } from '@/store/group';

const store = groupStore()
const dialogFormRef = ref<FormInstance>()
const disabled = ref(false)
const fileList = ref<UploadUserFile[]>([{
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
}])


const handleSelectionChange = (val: any) => {
    console.log(val);
    deletebled.value = true
    if (val.length !== 0) {
        deletebled.value = false
    }
    selectedData.value = val
}

const data = reactive({
    visible: false,
    title: '新增分组',
    formData: { catalogName: '', catalogDesc: '' },
    deletebled: true,
    searchStr: ''
})

const { visible, title, formData, deletebled, searchStr } = toRefs(data)
const groupTable = ref()
const selectedData = ref<any[]>()

const rules = reactive<FormRules>({
    catalogName: [{ required: true, message: "请输入分组名称", trigger: "blur" }],
});

const addData = () => {
    title.value = '新增分组';
    visible.value = true
    formData.value = { catalogName: '', catalogDesc: '' }
}

const searchData = () => {
    groupTable.value.searchData()
}

const deleteData = (data: any = []) => {
    ElMessageBox.confirm(
        '确定删除吗?',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            let deleteApi = null
            // 批量删除
            if (data instanceof Array) {
                const catalogIds = data.map(d => d.catalogId)
                deleteApi = deleteGroups(catalogIds)
            } else {
                deleteApi = deleteGroup(data.catalogId)
            }

            deleteApi.then(() => {
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                })
                searchData()
            })
        })
}

const editData = (data: any) => {
    title.value = "修改分组"
    visible.value = true
    formData.value = data
    searchData()
}

const submit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            save(formData.value).then((data) => {
                visible.value = false
                ElMessage({
                    type: 'success',
                    message: '保存成功',
                })
                searchData()
                getGroups()
            })
        }
    })
}

const getGroups = () => {
    getAllGroups().then((data) => {
        store.groups = data
    })
}



const close = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.clearValidate()
    visible.value = false
    formData.value = { catalogName: '', catalogDesc: '' }
}

</script>
<style lang='scss' scoped>
.el-row {
    margin-bottom: 20px;
}

.el-col {
    padding-right: 10px;
}

.order-num {
    width: 150px;
}
</style>