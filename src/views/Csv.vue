<template>
    <form @submit.prevent="submit">
        <strong>File:</strong>
        <input type="file" class="form-control" ref="fileInput">
        <button type="submit">Submit Feedback</button>
    </form>
</template>

<script setup>
import axios from "axios";
import {ref} from "vue";

const fileInput = ref(null);
const submit = () => {

    const formData = new FormData()
    formData.append('csv_file', fileInput.value.files[0])

    axios.post('upload-csv', formData,{
            headers: {
               // 'Content-Type': 'multipart/form-data' // Important for file uploads
            }
        })
        .then(response => {})
        .catch(error => {
            console.error(error)
        });
}

</script>
