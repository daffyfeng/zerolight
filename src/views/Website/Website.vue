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
                <el-button type="danger" :disabled="deletebled" @click="deleteData(selectedData)">删除</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <custom-table ref="bannerTable" :tableType="'website'" :search-api="search" :search-str="searchStr"
                    @handle-selection-change="handleSelectionChange" @editData="editData" @deleteData="deleteData">
                </custom-table>
            </el-col>
        </el-row>

        <dialog-form :dialog-visible="visible" :title="title" @close="close(dialogFormRef)"
            @submit="submit(dialogFormRef)">
            <el-form ref="dialogFormRef" class="website-form" :inline="false" :model="formData" :rules="rules"
                label-position="top" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="名称" prop="siteName">
                            <el-input v-model="formData.siteName" />
                            <!-- <input type="text" v-model="formData.name"> -->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="地址" prop="siteAddress">
                            <el-input v-model="formData.siteAddress" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="分组" prop="catalogId">
                            <el-select v-model="formData.catalogId" class="m-2" placeholder="" size="large">
                                <el-option v-for="item in groups" :key="item.catalogId" :label="item.catalogName"
                                    :value="item.catalogId" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="标签" prop="siteTag">
                            <el-select v-model="formData.siteTag" multiple filterable allow-create default-first-option
                                :reserve-keyword="false" placeholder="" class="m-2" size="large">
                                <el-option v-for="item in tags" :key="item.tagId" :label="item.tagDesc"
                                    :value="item.tagDesc" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="排序" prop="siteOrder">
                            <el-input-number class="order-num" v-model="formData.siteOrder" :min="1" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否上推荐" prop="recommendFlag">
                            <el-switch v-model="formData.recommendFlag" active-value="Y" inactive-value="N">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-row :style="{ 'flex-direction': 'column' }">
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
                        <template #tip>
                            <div class="el-upload__tip">
                                Only support .jpg .png format
                            </div>
                        </template>
                    </el-upload>

                </span>
            </el-row>
            <el-form-item label="简介" prop="siteDesc">
                <el-input type="textarea" v-model="formData.siteDesc" />
            </el-form-item>
        </dialog-form>
    </div>
</template>

<script setup lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import {组件名称} from '{组件路径}';
import { ref, reactive, toRefs, onMounted } from 'vue';
import DialogForm from '@/components/DialogForm.vue';
import { ElMessage, ElMessageBox, genFileId, type FormInstance, type FormRules, type UploadFile, type UploadInstance, type UploadProps, type UploadRawFile, type UploadUserFile } from 'element-plus';
import { Delete, Plus } from '@element-plus/icons-vue'
import CustomTable from '@/components/CustomTable.vue';
import { save, search, deleteWebsite, deleteWebsites } from "@/api/website"
import { groupStore } from '@/store/group';

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

const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
    formData.value.siteImage = files[0]
}

const handleRemove = () => {
    fileList.value = []
}

const data = reactive({
    visible: false,
    title: '新增网站',
    deletebled: true,
    searchStr: ''
})

const formData = ref<{ siteName: '', catalogId: '', siteAddress: '', siteDesc: '', siteTag: [], siteOrder: 0, siteImage: any, siteIcon?: string, recommendFlag: string }>(
    { siteName: '', catalogId: '', siteAddress: '', siteDesc: '', siteTag: [], siteOrder: 0, siteImage: '', recommendFlag: 'N' }
)

const { visible, title, deletebled, searchStr } = toRefs(data)
const bannerTable = ref()
const selectedData = ref<any[]>()
const store = groupStore()
const groups = ref<any[]>()
const tags = ref<any[]>()

store.$subscribe((mutation, state) => {
    groups.value = state.groups
    tags.value = store.tags
}, { detached: true })

onMounted(() => {
    groups.value = store.groups
    tags.value = store.tags
})


const rules = reactive<FormRules>({
    siteName: [{ required: true, message: "请输入网站名称", trigger: "blur" }],
    siteAddress: [{ required: true, message: "请输入网站地址", trigger: "blur" }],
    siteOrder: [{ required: true, message: "请输入排序号", trigger: "blur" }],
    siteTag: [{ required: true, message: "请输入标签", trigger: "change" }],
    catalogId: [{ required: true, message: "请选择分组", trigger: "change" }],
});

const searchData = () => {
    bannerTable.value.searchData()
}

const addData = () => {
    title.value = '新增网站';
    visible.value = true
    formData.value = { siteName: '', catalogId: '', siteAddress: '', siteDesc: '', siteTag: [], siteOrder: 0, siteImage: '', recommendFlag: 'N' }
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
                const siteIds = data.map(d => d.siteId)
                deleteApi = deleteWebsites(siteIds)
            } else {
                deleteApi = deleteWebsite(data.siteId)
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
    title.value = "修改网站"
    visible.value = true
    // data.siteTag && typeof data.siteTag === 'string' && (data.siteTag = data.siteTag.split(','))
    formData.value = data
    fileList.value = [{
        name: data.siteName,
        url: data.siteIcon
    }]
}

const isChangeFile = ref(false)
const httpRequest = (file: any) => {
    isChangeFile.value = true
    formData.value.siteImage = file.file;
}

const submit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            // 创建时可以不要图片
            // if (!formData.value.siteIcon && !formData.value.siteImage) {
            //     ElMessage({
            //         type: 'error',
            //         message: '请先上传图标',
            //     })
            //     return false
            // }
            const formClone = new FormData()
            Object.keys(formData.value).forEach((key: string) => {
                if (key !== 'siteTag')
                    formClone.append(key, formData.value[key as keyof typeof formData.value])
                else {
                    // formData.value.siteTag.forEach(t => {
                    //     formClone.append('siteTag', t)
                    // })
                    formClone.append('siteTag', formData.value.siteTag.join(','))

                }
            })
            save(formClone).then((data) => {
                visible.value = false
                ElMessage({
                    type: 'success',
                    message: '保存成功',
                })
                searchData()
            }).catch(() => {

            })
        }
    })
}

const close = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.clearValidate()
    visible.value = false
}

</script>
<style lang='scss' scoped>
.el-row {
    margin-bottom: 20px;
}

.website-form {
    .el-row {
        margin-bottom: 0px;
    }
}

.el-col {
    padding-right: 10px;
}

.order-num {
    width: 150px;
}

.el-select.m-2 {
    width: 100%;
}
</style>