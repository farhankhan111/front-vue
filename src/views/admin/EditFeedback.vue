<template>

    <AdminNav/>
    <h1>Edit Feedback</h1>

    <form @submit.prevent="submitFeedback">
        <ValidationErrors :validationErrors="validationErrors"/>

        <label for="title">Title:</label>
        <input v-model="title" id="title" type="text">

        <label for="category">Type:</label>
        <select class="form-select" v-model="type" id="category">
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="improvement">Improvement</option>
        </select>

        <label for="description">Description:</label>
        <textarea v-model="desc" id="description" rows="4"></textarea>

        <button type="submit">Update Feedback</button>
    </form>
</template>


<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';
import ValidationErrors from '@/components/ValidationErrors.vue';
import AdminNav from '@/components/AdminNav.vue';
import {useRoute} from "vue-router";
import router from "@/router";

const title = ref('');
const type = ref('');
const desc = ref('');
const route = useRoute()
const validationErrors = ref([]);
const loading = ref(false);

const getFeedback = async () => {
    try {
        loading.value = true;
        const id = useRoute().params.id;
        const response = await axios.get(`admin/feedbacks/${id}/edit`);
        title.value = response.data.data.title;
        type.value = response.data.data.type;
        desc.value = response.data.data.desc;
    } catch (error) {
        console.error('Error fetching feedback:', error);
        alert(error.message);
    } finally {
        loading.value = false;
    }
};


const submitFeedback = async () => {
   try {
        const id = route.params.id;

        const response = await axios.put(`admin/feedbacks/${id}`, {
            title: title.value,
            type: type.value,
            desc: desc.value,
        });

        if (response.status === 200) {
            validationErrors.value = [];
            alert('Feedback updated successfully!');
            router.push({name: 'admin-feedback'});
        } else {
            console.error('Unexpected status code:', response.status);
        }
    } catch (error) {
        if (error.response && error.response.status === 422) {
            validationErrors.value = error.response.data.errors;
        } else {
            console.error(error);
        }
    }
};

onMounted(()=> {

    getFeedback()

});
</script>



