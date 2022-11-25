<template>
    <div class="login">
        <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="rules" label-position="right"
            label-width="100px">
            <div class="logo">
                <img :src="logoIcon" alt="icon" class="logoIcon">
                <img :src="lingguangIcon" alt="icon" class="lingguangIcon">
            </div>

            <el-form-item label="用户名" prop="useName">
                <el-input v-model="loginForm.useName" />
            </el-form-item>
            <el-form-item label="密码" prop="userPin">
                <el-input v-model="loginForm.userPin" type="password" show-password
                    @keyup.enter="submitForm(loginFormRef)" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(loginFormRef)">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { login } from "@/api/common"
import { localStorageClear, localStorageSet } from "@/utils/localstorage";
import { useRouter } from 'vue-router'
import logoIcon from '@/assets/img/logo.png'
import lingguangIcon from '@/assets/img/lingguang.png'

localStorageClear()

const router = useRouter()

const data = reactive({
    loginForm: {
        useName: "",
        userPin: "",
    }
});

const { loginForm } = toRefs(data)

const loginFormRef = ref<FormInstance>();

const rules = reactive<FormRules>({
    useName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    userPin: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            login(loginForm.value).then((data: any) => {
                if (data.code === "1") {
                    localStorageSet("AuthToken", data.message)
                    localStorageSet("User", { useName: loginForm.value.useName })
                    router.push('/home')
                }
            })
        }
    })

};

// localStorageClear()

// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   formEl.resetFields();
// };
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    // align-items: center;
    background-color: rgba(220, 220, 220, .5);

    .login-form {
        width: 600px;
        background-color: #fff;
        padding: 20px 80px 20px;
        padding-left: 60px;
        border-radius: 10px;
        margin: 200px auto auto;


        .logo {
            width: 100%;
            text-align: center;
            margin-bottom: 10px;

            .logoIcon {
                width: 32px;
                height: 32px;
                margin-right: 8px;
            }

            .lingguangIcon {
                width: 107px;
                height: 14px;
                margin-bottom: 4px
            }
        }
    }
}
</style>
