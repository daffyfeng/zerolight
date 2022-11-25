<template>
    <section class="front-header">
        <section class="left" @click="$router.replace('/front'); searchStr = ''">
            <img :src="logoIcon" alt="icon" class="logoIcon">
            <img :src="lingguangIcon" alt="icon" class="lingguangIcon">
        </section>
        <section class="middle">

        </section>
        <section class="right">
            <el-input v-model="searchStr" :suffix-icon="Search" @change="searchResult"></el-input>
        </section>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import logoIcon from '@/assets/img/logo.png'
import lingguangIcon from '@/assets/img/lingguang.png'


const searchStr = ref('')

const router = useRouter()
const searchResult = () => {
    if (searchStr.value && searchStr.value.trim() !== '') {
        router.push({ path: 'search', query: { key: searchStr.value } })
    }
}
</script>


<style lang="scss" scoped>
.front-header {
    display: flex;
    justify-content: space-between;
    width: $content-width;
    margin: 0 auto;
    line-height: 50px;

    .left {
        .logoIcon {
            width: 26px;
            height: 26px;
            margin-right: 8px;
        }

        .lingguangIcon {
            width: 87px;
            height: 10px;
            margin-bottom: 4px
        }
    }

    .middle {
        .group {
            margin-right: 48px;
        }
    }
}
</style>