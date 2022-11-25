<template>
    <section class="header">
        <section class="logo"> Lingguang</section>
        <section class="header-user">
            <el-icon class="user-icon">
                <User />
            </el-icon>
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{ user.useName }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </section>
    </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ArrowDown, User } from '@element-plus/icons-vue'
import { groupStore } from '@/store/group';
import { useRouter } from 'vue-router'
import { localStorageGet } from "@/utils/localstorage";

const router = useRouter()
const store = groupStore()
const handleCommand = (command: string | number | object) => {
    if (command === 'logout') {
        store.$reset()
        router.push('/login')
    }
}

const user = localStorageGet('User')
</script>


<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;

    .logo {
        background-color: rgba(0, 21, 41, 1);
        width: 200px;
        color: #fff;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        font-weight: bold;
        border-right: solid 1px var(--el-menu-border-color);
        border-bottom: solid 1px#253c53;
        text-align: center;
    }

    .header-user {
        margin-right: 20px;
        line-height: 50px;
        cursor: pointer;

        .user-icon {
            margin-right: 10px;
        }

        // width: 10%;
        .el-dropdown {
            line-height: 50px;
        }

    }
}
</style>