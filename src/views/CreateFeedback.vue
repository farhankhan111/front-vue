<template>
    <TheNav/>
<!--    <Notification />-->

    <form @submit.prevent="submitFeedback">
        <ValidationErrors :validationErrors="validationErrors"/>

        <label for="title">Title:</label>
        <input v-model="form.title" id="title" type="text">

        <label for="category">Type:</label>
        <select class="form-select" v-model="form.type" id="category">
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="improvement">Improvement</option>
        </select>

        <label for="description">Description:</label>
        <textarea v-model="form.desc" id="description" rows="4"></textarea>

        <strong>File:</strong>
        <input type="file" class="form-control" ref="fileInput">

        <button type="submit">Submit Feedback</button>
    </form>
</template>

<script setup>
import axios from "axios";
import TheNav from "@/components/TheNav.vue";
import ValidationErrors from "@/components/ValidationErrors.vue";
import Notification from "@/components/Notification.vue";
import {onMounted, onUnmounted, ref} from "vue";
import router from "@/router";
import Echo from "laravel-echo";


onUnmounted(() => {
    alert('close')
});



const form = ref({
    title: '',
    type: 'bug',
    desc: '',
    //file: '',
})

const fileInput = ref(null);

const validationErrors = ref([])

const submitFeedback = () => {

    const formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('type', form.value.type);
    formData.append('desc', form.value.desc);
    formData.append('file', fileInput.value.files[0]);


    axios.post('feedbacks', formData)
        .then(response => {
            validationErrors.value = []
            //router.push('/feedbacks')
        })
        .catch(error => {
            if (error.response && error.response.status === 422) {
                validationErrors.value = error.response.data.errors;
            } else {
                console.error(error);
            }
        });
}

onMounted(() => {



    /*window.Echo.channel('farhan')
        .listen('TestEvent', (e) => {
            alert('ok')
        });
*/
})



</script>