<template>
    <button class="btn btn-primary" v-if="pagination.prev_cursor" @click="loadPage(pagination.prev_cursor)">Previous</button>
    <button class="btn btn-primary" v-if="pagination.next_cursor" @click="loadPage(pagination.next_cursor)">Next</button>
</template>

<script setup>
import { defineProps } from 'vue';
const emits = defineEmits(['loadPage']);

const props = defineProps({
    pagination: {
        type: Object,
        required: true,
    },
});

const loadPage = (cursor) => {
    emits('loadPage', cursor);
};
</script>
