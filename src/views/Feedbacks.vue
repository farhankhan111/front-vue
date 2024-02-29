<template>
    <TheNav />

    <Notification />

    <div>
        <h2>Feedbacks</h2>
        <router-link class="btn btn-primary mb-3 mt-3" to="/create-feedback" tag="button">Create Feedback</router-link>

        <SearchFeedBackForm @searchFeedback="searchFeedback" />

        <ul class="blog-list">
            <li v-for="feedback in feedbackList.data" :key="feedback.id" class="blog-item">

                <FeedBackView :feedback="feedback" :hasAnchorTag=true />

                <div class="button-container">
                    <i class="fas fa-thumbs-up"></i> {{ feedback.upvotes }}
                    <i class="fas fa-thumbs-down"></i> {{ feedback.downvotes }}
                </div>
            </li>
        </ul>
    </div>

    <Bootstrap5Pagination
        :data="feedbackList"
        @pagination-change-page="getFeedback"
    />

</template>

<script setup>
import '@fortawesome/fontawesome-free/css/all.css';
import axios from "axios";
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import TheNav from "@/components/TheNav.vue";
import FeedBackView from "@/components/FeedBackView.vue";
import SearchFeedBackForm from "@/components/SearchFeedBackForm.vue";
import Notification from "@/components/Notification.vue";
import {onMounted, ref} from "vue";

const keywords = ref('');
const feedbackList = ref([]);

const getFeedback = (page = 1) => {
    axios.get('feedbacks',{
        params: {
            page,
            keywords: keywords.value
        },
    }).then(response => {
        feedbackList.value = response.data && response.data.data.length ? response.data : '';

    }).catch(error => {
        console.error('Error fetching feedback:', error);
    });
}

const searchFeedback = (query) => {
    keywords.value = query;
    getFeedback();
};

onMounted(()=>{
    getFeedback();
})
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