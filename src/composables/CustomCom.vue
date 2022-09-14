<template>
    <slot></slot>
</template>
<script lang ="ts">
// custom component
import { Form } from 'ant-design-vue';
export default {
    name: 'custom-name',
    setup() {
        const formItemContext = Form.useInjectFormItemContext();
    },
};
</script>