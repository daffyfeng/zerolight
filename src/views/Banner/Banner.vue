<!-- banner管理 -->
<template>
    <div class=''>
        <el-row>
            <el-col :span="6">
                <el-input type="text" v-model="searchStr" @keyup.enter="searchData"></el-input>
            </el-col>
            <el-col :span="18">
                <el-button type="primary" @click="searchData">查询</el-button>
                <el-button type="primary" @click="addData">创建</el-button>
                <el-button type="danger" :disabled="deletebled" @click="deleteData">删除</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <custom-table ref="bannerTable" :tableType="'banner'" :search-api="search" :search-str="searchStr"
                    @handle-selection-change="handleSelectionChange" @editData="editData" @deleteData="deleteData">
                </custom-table>
            </el-col>
        </el-row>

        <dialog-form :dialog-visible="visible" :title="title" @close="close(dialogFormRef)"
            @submit="submit(dialogFormRef)">
            <el-form ref="dialogFormRef" :model="formData" :rules="rules" label-position="right" label-width="100px">
                <el-form-item label="说明" prop="bannerDesc">
                    <el-input v-model="formData.bannerDesc" />
                </el-form-item>

                <el-form-item label="跳转链接" prop="bannerLink">
                    <el-input v-model="formData.bannerLink" />
                </el-form-item>
                <el-form-item label="排序" prop="bannerOrder">
                    <el-input-number class="order-num" v-model="formData.bannerOrder" :min="1" />
                </el-form-item>
            </el-form>
            <el-row>
                <span :style="{ width: '100px', 'padding-right': '12px', 'text-align': 'right' }">请上传图标</span>
                <span>
                    <el-upload ref="upload" action="#" list-type="picture-card" :auto-upload="true"
                        :file-list="fileList" :limit="1" :http-request="httpRequest" accept=".png, .jpg, .jpeg">
                        <el-icon>
                            <Plus />
                        </el-icon>
                        <template #file="{ file }">
                            <div>
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                <span class="el-upload-list__item-actions">
                                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove()">
                                        <el-icon>
                                            <Delete />
                                        </el-icon>
                                    </span>
                                </span>
                            </div>
                        </template>
                    </el-upload>
                    Only support .jpg .png format
                </span>

            </el-row>

        </dialog-form>
    </div>
</template>

<script setup lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import {组件名称} from '{组件路径}';
import { ref, reactive, toRefs } from 'vue';
import DialogForm from '@/components/DialogForm.vue';
import { ElMessage, ElMessageBox, genFileId, type FormInstance, type FormRules, type UploadFile, type UploadInstance, type UploadProps, type UploadRawFile, type UploadUserFile } from 'element-plus';
import { Delete, Plus } from '@element-plus/icons-vue'
import CustomTable from '@/components/CustomTable.vue';
import { deleteBanner, deleteBanners, save, search } from '@/api/banner';

const dialogFormRef = ref<FormInstance>()
const disabled = ref(false)
const fileList = ref<UploadUserFile[]>([
    // {
    //     name: 'food.jpeg',
    //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    // }
])


const handleSelectionChange = (val: any) => {
    console.log(val);
    deletebled.value = true
    if (val.length !== 0) {
        deletebled.value = false
    }
    selectedData.value = val
}

const upload = ref<UploadInstance>()

// const handleExceed: UploadProps['onExceed'] = (files) => {
//     upload.value!.clearFiles()
//     const file = files[0] as UploadRawFile
//     file.uid = genFileId()
//     upload.value!.handleStart(file)
//     formData.value.bannerImage = files[0]
// }

const handleRemove = () => {
    fileList.value = []
}

const data = reactive({
    visible: false,
    title: '新增banner',
    deletebled: true,
    searchStr: ''
})

const formData = ref<{ bannerDesc: '', bannerOrder: number, bannerLink: '', bannerImage: any, bannerIcon?: string, bannerCreateTime?: any }>(
    { bannerDesc: '', bannerOrder: 1, bannerLink: '', bannerImage: '' }
)
const { visible, title, deletebled, searchStr } = toRefs(data)
const bannerTable = ref()
const selectedData = ref<any[]>()

const rules = reactive<FormRules>({
    bannerDesc: [{ required: true, message: "请输入说明", trigger: "blur" }],
    bannerLink: [{ required: true, message: "请输入跳转链接", trigger: "blur" }],
    bannerOrder: [{ required: true, message: "请输入排序号", trigger: "blur" }],
});

const searchData = () => {
    bannerTable.value.searchData()
}

const addData = () => {
    title.value = '新增banner';
    visible.value = true
    formData.value = { bannerDesc: '', bannerOrder: 1, bannerLink: '', bannerImage: '' }
    fileList.value = []
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
                const bannerNum = data.map(d => d.bannerNum)
                deleteApi = deleteBanners(bannerNum)
            } else {
                deleteApi = deleteBanner(data.bannerNum)
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
    title.value = "修改banner"
    visible.value = true
    formData.value = data
    fileList.value = [{
        name: data.bannerDesc,
        url: data.bannerIcon
    }]
    searchData()
}


const isChangeFile = ref(false)
const httpRequest = (file: any) => {
    isChangeFile.value = true
    formData.value.bannerImage = file.file;
}

const submit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            if (!formData.value.bannerIcon && !formData.value.bannerImage) {
                ElMessage({
                    type: 'error',
                    message: '请先上传图标',
                })
                return false
            }

            delete formData.value.bannerIcon
            delete formData.value.bannerCreateTime
            save(formData.value).then((data) => {
                visible.value = false
                ElMessage({
                    type: 'success',
                    message: '保存成功',
                })
                searchData()
            })
        }
    })
}

const close = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields()
    visible.value = false
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