<template>
    <ul v-if="Object.keys(validationErrors).length > 0">
        <li v-for="validationError in validationErrors" :key="validationError">{{ validationError[0] }}</li>
    </ul>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    validationErrors: {
        type: Object,
        required: true,
    },
});
</script>
