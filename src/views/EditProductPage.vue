<template>
    <div class="form-container">
        <div class="header">
            <Button @click="$router.back()">&lt;</Button>
            <TypographyTitle :level="3">Изменить товар</TypographyTitle>
        </div>
        <div>
            <Form @finish="onAdd" :model="formState" layout="vertical" class="form">
                <Form.Item class="name" name="name" label="Название товара"
                    :rules="{ required: true, message: 'Введите название продукта!' }">
                    <a-input v-model:value="formState.name" />
                </Form.Item>
                <div class="description">
                    <label for="description">Описание</label>
                    <QuillEditor theme="snow" v-model:content="content" />
                </div>
                <div class='status'>
                    <p>Активный
                        <Switch v-model:checked='status' /> Архивный
                    </p>
                </div>
                <!-- <Form.Item class="example" name="image" required
                    :validateStatus="previewImage.length ? 'success': 'error'">
                    <img :src="image" class="uploading-image" v-for="image in previewImage" :key="image" />
                    <label for="image">Загрузить</label>
                    <input type="file" id="image" accept="image/*" @change=uploadImage>
                </Form.Item> -->
                <Form.Item name="fileList" label="Медиа" class="upload"
                    :rules="{ required: true, message: 'Загрузите изображение товара'}">
                    <a-upload v-model:file-list="formState.fileList" :before-upload="beforeUpload"
                        list-type="picture-card" @preview="handlePreview" accept=".jpg, .jpeg, .png" action="">
                        <div v-if="formState.fileList.length < 8">
                            <plus-outlined />
                            <div style="margin-top: 8px">Загрузить</div>
                        </div>
                    </a-upload>
                    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                        <img alt="example" style="width: 100%" :src="previewImage" />
                    </a-modal>
                </Form.Item>
                <Form.Item class="price">
                    <Form.Item class="price-check" label="Цена">
                        <a-checkbox v-model:checked="checked">Одна цена для всех товаров</a-checkbox>
                        <Form.Item name="price" :rules="{required: checked,
                        message: 'Нужна цена', }" style="margin-top: 8px; width: 500px;">
                            <a-input-number v-model:value="formState.price" :disabled="!checked"  min="1" placeholder="Цена"
                                style="width: 500px" suffix="₸" :controls="false" />
                        </Form.Item>
                    </Form.Item>
                    <div class="price_cities" v-if="!checked">
                        <div class="table-header">
                            <p>Город</p>
                            <p>Цена</p>
                        </div>
                        <Divider style="margin: 15px 0;" />
                        <div v-for="city in cities.cities" :key="city.id">
                            <Form.Item class="table-content" name="prices" :rules="{
                              required: true,
                              message: 'Нужна цена',
                            }">
                                <p>{{city.name}}</p>
                                <a-input-number v-model:value='formState.prices[city.id]' placeholder="Цена" min="1"
                                    :controls="false" style="width: 500px" />
                            </Form.Item>
                            <Divider style="margin: 15px 0;" />
                        </div>
                    </div>
                </Form.Item>
                <div class="footer">
                    <Button @click="$router.push({name: 'products'})">Отмена</Button>
                    <Button html-type="submit" type="primary">Сохранить</Button>
                </div>

            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    Form, Button,
    TypographyTitle, Input as AInput, Upload as AUpload,
    Modal as AModal, Checkbox as ACheckbox, Divider,
    InputNumber as AInputNumber, message, Switch
} from 'ant-design-vue';
import type { UploadProps } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useStore } from '@/store/useStore';
import cities from '@/composables/cities.json';

const store = useStore();
const route = useRoute();
const router = useRouter();
const item = store.getItem(+route.params.id)

const formState = ref({
    name: item?.name || '',
    price: item?.price?.length === 1 && item?.price[0] || '',
    fileList: item?.images,
    prices: item?.price || []
});
const content = ref(item?.description);
const previewImage = ref();
const previewVisible = ref(false);
const checked = ref(item?.price?.length === 1);
const status = ref(item?.status || false);

function getBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const beforeUpload = (file: UploadProps['fileList'][number]) => {
    const type = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase()
    const arr = ['.jpg', '.png', '.jpeg']
    if (arr.includes('.' + type)) {
        return true
    } else {
        message.warning(`Загрузите только изображение`)
        file.status = 'error'
        return false
    }
};

const handleCancel = () => {
    previewVisible.value = false;
};
const handlePreview = async (file: UploadProps['fileList'][number]) => {
    if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string;
    }
    previewImage.value = file || file.url || file.preview;
    previewVisible.value = true;
};

const onAdd = () => {
    let fPrice = checked.value ? [+formState.value.price] : formState.value.prices


    const newItem = {
        key: item?.key,
        name: formState.value.name,
        price: fPrice,
        description: content.value,
        images: formState.value.fileList,
        status: status.value
    }
    store.updateItem(item?.key, newItem);
    router.push({ name: 'products' })
}

</script>
<style scoped>
.form-container {
    padding-bottom: 50px;
}

.header {
    display: flex;
    align-items: baseline;
}

.header>button {
    margin-right: 15px;
}

.description {
    margin-bottom: 20px;
}

.form {
    padding: 25px;
    border: 1px solid darkgray;
}

.name {
    margin-bottom: 10px;
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}


.price_cities {
    padding-top: 30px;
}

.table-header,
.table-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.footer {
    display: flex;
    align-content: center;
    justify-content: space-between;
    padding-top: 20px;
}

.example {
    padding-top: 20px;
}

.uploading-image {
    width: 100px;
    height: 100px;
}
</style>