<script>
import axios from "axios";
import AdminNav from "@/components/AdminNav.vue";
import CursorPagination from "@/components/CursorPagination.vue";

export default {
    name: "FeedBack",
    components: {CursorPagination, AdminNav},
    data() {
        return {
            feedbacks: [],
            pagination: {},
        };
    },
    created() {
        this.getFeedback();
    },
    methods: {

        loadPage(cursor) {
            this.getFeedback(cursor);
        },

        getFeedback(cursor = null) {
            axios.get(`admin/feedbacks${cursor ? `?cursor=${cursor}` : ''}`)
                .then(response => {
                    if (response && response.data) {
                        this.feedbacks = response.data.feedbacks;
                        this.pagination.prev_cursor = response.data.feedbacks.prev_cursor
                        this.pagination.next_cursor = response.data.feedbacks.next_cursor
                    }
                }).catch(error => {
                console.error('Error fetching feedback:', error);
            });
        },

        editFeedback(feedbackId) {
            this.$router.push({name: 'feedback-edit', params: {id: feedbackId}});
        },

        deleteFeedback(feedbackId) {
            axios.delete(`admin/feedbacks/${feedbackId}`)
                .then(response => {
                    //this.feedbacks.data = this.feedbacks.data.filter(feedback => feedback.id !== feedbackId);
                    alert(response.data.message)
                    this.getFeedback();
                })
                .catch(error => {
                    console.error(`Error deleting feedback`);
                });
        }
    },
}
</script>

<template>
    <AdminNav/>

    <div>
        <h2>Admin Dashboard - Feedback Management</h2>
        <table class="table">
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
    </div>

    <CursorPagination :pagination="pagination" @loadPage="loadPage" />

</template>

<style scoped>

button{

    margin-right: 3px;
}

</style>
