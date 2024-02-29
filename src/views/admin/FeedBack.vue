<script setup>
import axios from "axios";
import AdminNav from "@/components/AdminNav.vue";
import CursorPagination from "@/components/CursorPagination.vue";
import {onMounted, ref} from "vue";
import router from "@/router";

const feedbacks = ref([]);
const pagination = ref({});

const getFeedback = async (cursor = null) => {
    try {
        const response = await axios.get(`admin/feedbacks${cursor ? `?cursor=${cursor}` : ''}`);

        if (response.data) {
            feedbacks.value = response.data;
            pagination.value = {
                prev_cursor: response.data.meta.prev_cursor,
                next_cursor: response.data.meta.next_cursor,
            };
        }
    } catch (error) {
        console.error('Error fetching feedback:', error);
    }
};

const loadPage = (cursor) => {
    getFeedback(cursor);
};

const editFeedback = (feedbackId) => {
    router.push({ name: 'feedback-edit', params: { id: feedbackId } });
};

const deleteFeedback = async (feedbackId) => {
    try {
        await axios.delete(`admin/feedbacks/${feedbackId}`);
        alert('Feedback deleted successfully');
        getFeedback();
    } catch (error) {
        console.error('Error deleting feedback:', error);
    }
};

onMounted(() => {
    getFeedback();
});

</script>

<template>
    <AdminNav/>

    <div>
        <h2>Admin Dashboard - Feedback Management</h2>
        <table class="table" v-if="feedbacks.data && feedbacks.data.length">
            <thead>
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="feedback in feedbacks.data" :key="feedback.id">
                <td>{{ feedback.title }}</td>
                <td>{{ feedback.desc }}</td>
                <td>
                    <button class="btn btn-primary" @click="editFeedback(feedback.id)">Edit</button>
                    <button class="btn btn-danger" @click="deleteFeedback(feedback.id)">Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
        <div v-else>No Data</div>
    </div>

    <CursorPagination :pagination="pagination" @load-page="loadPage" />

</template>

<style scoped>

button{

    margin-right: 3px;
}

</style>
