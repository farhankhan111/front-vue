<template>
    <label>Search:</label>
    <input v-model="keywords" @input="searchFeedback" />
</template>

<script setup>
import debounce from "debounce";
import {ref} from "vue";

const emit = defineEmits(['searchFeedback'])
const keywords = ref('')

const searchFeedback = debounce(function () {
    if(keywords.value.trim() === ''){
        return
    }
    emit('searchFeedback', keywords.value);
}, 500)

</script>