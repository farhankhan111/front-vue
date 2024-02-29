<template>
    <div id="comments">
        <h2>Comments</h2>
        <div v-for="(comment, index) in comments" :key="index" class="comment">
            <p><strong>{{ comment.user.name }}:</strong> {{ comment.content }}</p>
        </div>
        <h2>Add a Comment</h2>
        <form @submit.prevent="addComment">
            <label for="comment">Your Comment:</label>
            <ValidationErrors :validationErrors="validationErrors"/>
            <textarea v-model="content" id="comment" name="comment" rows="4"></textarea>
            <input type="submit" value="Submit Comment">
        </form>
    </div>
</template>

<script setup>
import axios from "axios";
import ValidationErrors from "@/components/ValidationErrors.vue";
import {ref} from "vue";
import {useRoute} from "vue-router";

const props = defineProps(["comments"]);
const route = useRoute();
const content = ref('')
const loading = ref(true)
const feedback = ref(null)
const validationErrors = ref([])

const addComment = () => {
    axios.post(`feedbacks/${route.params.id}/comments`, {content: content.value})
        .then(response => {
            validationErrors.value = [];
            content.value = '';
            alert('waiting for moderation');
        }).catch(error => {
        if (error.response && error.response.status === 422) {
            validationErrors.value = error.response.data.errors;
        } else {
            alert(error);
        }
    });
}
</script>

