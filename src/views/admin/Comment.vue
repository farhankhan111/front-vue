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
                <button
                    v-if="!comment.moderate && hasPermission('moderate comment')"
                    @click="moderateComment(comment.id)">Moderate
                </button>
                <span v-else-if="comment.moderate === 1">Moderated</span>
                <span v-else>Pending</span>
            </td>
        </tr>
        </tbody>
    </table>

    <CursorPagination :pagination="pagination" @loadPage="loadPage"/>
</template>

<script setup>
import axios from "axios";
import AdminNav from "@/components/AdminNav.vue";
import CursorPagination from "@/components/CursorPagination.vue";
import {onMounted, ref} from "vue";
import {useRolePermissionChecker} from "@/composables/rolePermissionChecker";

const { hasRole, hasPermission } = useRolePermissionChecker();
const comments = ref([])
const pagination = ref({})

const getComments = (cursor = null) => {
    axios.get(`admin/comments${cursor ? `?cursor=${cursor}` : ''}`)
        .then(response => {
            if (response && response.data) {
                comments.value = response.data;
                pagination.value = {
                    prev_cursor: response.data.meta.prev_cursor,
                    next_cursor: response.data.meta.next_cursor,
                };
            }
        }).catch(error => {
        console.error('Error fetching comments:', error);
    });
}

const moderateComment = (commentId) => {
    axios.put(`admin/comments/${commentId}/moderate`)
        .then(response => {
            const moderatedComment = comments.value.data.find(comment => comment.id === commentId);
            if (moderatedComment) {
                moderatedComment.moderate = 1;
                alert(response.data.metadata.message)
            }
        })
        .catch(error => {
            console.error(error);
        });
}

const loadPage = (cursor) => {
    getComments(cursor);
}

onMounted(() => {
    getComments();
});

</script>


