<!-- form对话框 -->
<template>
    <div class='dialog-form'>
        <el-dialog v-model="visible" :title="title" :before-close="closeForm">

            <slot></slot>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeForm">取消</el-button>
                    <el-button type="primary" @click="submitForm()">
                        保存
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import {组件名称} from '{组件路径}';
import { toRefs, ref, onBeforeMount, watch } from 'vue'
const props = defineProps({
    dialogVisible: {
        type: Boolean,
        required: true,
        default: false
    },
    title: {
        type: String,
        required: true,
    },

})

const { dialogVisible, title } = toRefs(props)
const visible = ref(false)

watch([dialogVisible], (nVal) => {
    visible.value = nVal[0]
})

const init = () => {
    visible.value = dialogVisible.value
}

onBeforeMount(() => {
    init()
})

const emits = defineEmits(['submit', 'close'])

const submitForm = () => {
    emits('submit')
}

const closeForm = () => {
    emits('close')
}
</script>
<style lang='scss' scoped>

</style>