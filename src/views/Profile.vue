<template>
    <TheNav/>

<!--
    <Notification/>
-->

    <h1>Profile</h1>
    <h2>My Feedbacks</h2>
    <div v-if="feedbackList && feedbackList.data && feedbackList.data.length > 0">
        <div>
            <ul class="blog-list">
                <li v-for="feedback in feedbackList.data" :key="feedback.id" class="blog-item">
                    <FeedBackView :feedback="feedback" :hasAnchorTag=true />
                </li>
            </ul>
        </div>
        <Bootstrap5Pagination
            :data="feedbackList"
            @pagination-change-page="getFeedback"
        />
    </div>
    <p v-else>{{ noFeedbackMessage }}</p>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {Bootstrap5Pagination} from 'laravel-vue-pagination';
import Notification from "@/components/Notification.vue";
import TheNav from "@/components/TheNav.vue";
import FeedBackView from "@/components/FeedBackView.vue";

const feedbackList = ref([]);
const noFeedbackMessage = ref('');

const getFeedback = async (page = 1) => {

    axios.get('user-feedbacks', {
        params: {
            page
        }
    })
    .then(response => {
        if (response.data.data && response.data.data.length) {
            feedbackList.value = response.data;
        } else {
            noFeedbackMessage.value = 'No Record Found';
        }
    })
    .catch(error => {
        console.error('Error fetching feedback:', error);
    });
}

onMounted(() => {
    getFeedback();
});

</script>

<style scoped>
.blog-list {
    list-style: none;
    padding: 0;
}

.blog-item {
    margin-bottom: 20px;
}

.button-container {
    display: flex;
    gap: 10px;
}

.like-button,
.dislike-button {
    background-color: #3498db;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.like-button:hover {
    background-color: #2980b9;
}

.dislike-button:hover {
    background-color: #e74c3c;
}

/* Font Awesome icons (Make sure to include the Font Awesome library in your project) */
.fa-thumbs-up,
.fa-thumbs-down {
    margin-right: 5px;
}
</style>

