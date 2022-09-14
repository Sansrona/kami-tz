<template>
    <div class="card">
        <!-- <img :src="require(' '+props.item.images[0])" :alt="props.item.name" /> -->
        <Image :width="60" :src="props.item.images[0].thumbUrl" :alt="props.item.name" />
        <p class="name">
            <router-link :to="`/products/edit/${props.item.key}`">{{ props.item.name}}</router-link>
        </p>
        <p class="status">{{props.item.status ? 'Архивный' : 'Активный'}}</p>
        <p class="price">{{ store.getPrice(props.item.key)}}</p>
        <p>
            <img src="@/assets/trash.svg" alt="иконка удаления" class="icon" @click="store.removeItem(props.item.key)">
        </p>
    </div>
    <Divider />
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { Image, Divider } from 'ant-design-vue';
import { useStore } from '@/store/useStore';

const store = useStore();
const props = defineProps(['item']);

</script>
<style scoped>
.card {
    display: grid;
    grid-template-columns: repeat(4, 1fr) 50px;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
}
</style>