<template>
    <AdminNav />
    <h2>Admin Dashboard - Comment Management</h2>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">content</th>
            <th scope="col">Status</th>
            <th scope="col">Moderate</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="comment in comments.data" :key="comment.id">
            <td>{{ comment.content }}</td>
            <td>{{ comment.moderate ? 'moderated' : 'pending' }}</td>
            <td>
                <button v-if="!comment.moderate" @click="moderateComment(comment.id)">Moderate</button>
                <span v-else="comment.moderate === true">Moderated</span>
            </td>
        </tr>
        </tbody>
    </table>

    <CursorPagination :pagination="pagination" @loadPage="loadPage"/>
</template>

<script>
import axios from "axios";
import AdminNav from "@/components/AdminNav.vue";
import CursorPagination from "@/components/CursorPagination.vue";

export default {
    name: "Comment",
    components: {AdminNav,CursorPagination},
    data() {
        return {
            comments: [],
            pagination: {},
        };
    },
    created() {
        this.getComments();
    },
    methods: {

        loadPage(cursor) {
            this.getComments(cursor);
        },

        getComments(cursor = null) {
            axios.get(`admin/comments${cursor ? `?cursor=${cursor}` : ''}`)
                .then(response => {
                    if (response && response.data) {
                        this.comments = response.data.comments;
                        this.pagination.prev_cursor = response.data.comments.prev_cursor
                        this.pagination.next_cursor = response.data.comments.next_cursor
                    }
                }).catch(error => {
                console.error('Error fetching comments:', error);
            });
        },

        moderateComment(commentId) {
            axios.put(`admin/comments/${commentId}/moderate`)
                .then(response => {
                    const moderatedComment = this.comments.data.find(comment => comment.id === commentId);
                    if (moderatedComment) {
                        moderatedComment.moderate = 1;
                        alert(response.data.message)
                    }
                })
                .catch(error => {
                    console.error(`Error`);
                });
        },
    },
};

</script>


