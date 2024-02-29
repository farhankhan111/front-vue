<template>
    <TheNav/>
    <Notification />

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

        <button type="submit">Submit Feedback</button>
    </form>
</template>

<script setup>
import axios from "axios";
import TheNav from "@/components/TheNav.vue";
import ValidationErrors from "@/components/ValidationErrors.vue";
import Notification from "@/components/Notification.vue";
import {ref} from "vue";
import router from "@/router";

const form = ref({
    title: '',
    type: 'bug',
    desc: '',
})
const validationErrors = ref([])

const submitFeedback = () => {
    axios.post('feedbacks', form.value)
        .then(response => {
            validationErrors.value = []
            router.push('/feedbacks')
        })
        .catch(error => {
            if (error.response && error.response.status === 422) {
                validationErrors.value = error.response.data.errors;
            } else {
                console.error(error);
            }
        });
}

</script>