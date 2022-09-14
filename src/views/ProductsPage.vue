<template>
    <main class="main">
        <div class='header'>
            <TypographyTitle :level='2'>Товары</TypographyTitle>
            <Button type='primary' @click="goToCreate()">Добавить</Button>
        </div>
        <div class="table">
            <Input v-model:value="search" />
            <div class="table-content">
                <div></div>
                <div>Название</div>
                <div>Статус</div>
                <div>Цена</div>
                <div></div>
            </div>
            <Divider />
            <div class="items">
                <TableItem v-for="item in paginatedItems" :key="item.key" :item='item' />
            </div>
        </div>
        <div class="buttons">
            <p><Button :disabled="pageIndex===0" @click="pageIndex--">&lt;</Button></p>
            <p>{{pageNumber}}</p>
            <p><Button :disabled="pageIndex >= pageCount-1" @click="pageIndex++">&gt;</Button></p>
        </div>
    </main>
</template>
<script setup lang="ts">
import { Button, TypographyTitle, Input, Divider } from 'ant-design-vue';
import { useStore } from '@/store/useStore';
import { computed, ref } from 'vue';
import TableItem from '../components/TableItem.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const search = ref('');

const store = useStore();
const pageIndex = ref(0);
let pageSize = 5;

const pageNumber = computed(() => {
    let number = pageIndex.value
    return ++number;
})
const pageCount = computed(() => {
    let l = store.items.length, s = pageSize;
    return Math.ceil(l / s);
})
const paginatedItems = computed(() => {
    const start = pageIndex.value * pageSize,
        end = start + pageSize;
    return store.items.slice(start, end);
})
const goToCreate = () => {
    router.push({ name: 'create' })
}

</script>
<style scoped>
.main {
    height: 60%;
    margin: auto;
    padding: 20px;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
}

.table-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr) 50px;
    padding-top: 20px;
}

.items {
    display: flex;
    flex-direction: column;
}

.buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>