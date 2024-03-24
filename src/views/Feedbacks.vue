<template>
    <TheNav/>

    <div>
        <select class="" v-model="filters.userId">
            <option value="">Select User ID</option>
            <option v-for="user in userIds" :value="user.id" :key="user.id">{{ user.name }}</option>
        </select>

        <select class="" v-model="filters.type">
            <option value="">Select Type</option>
            <option v-for="type in types" :value="type.type" :key="type.type">{{ type.type }}</option>
        </select>
        <button @click="applyFilter">Filter</button>

    </div>

    <!--
        <Notification />
    -->

    <div>
        <h2>Feedbacks</h2>
        <router-link class="btn btn-primary mb-3 mt-3" to="/create-feedback" tag="button">Create Feedback</router-link>

        <SearchFeedBackForm @searchFeedback="searchFeedback"/>

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
import '@fortawesome/fontawesome-free/css/all.css'
import axios from "axios"
import {Bootstrap5Pagination} from 'laravel-vue-pagination';
import TheNav from "@/components/TheNav.vue";
import FeedBackView from "@/components/FeedBackView.vue";
import SearchFeedBackForm from "@/components/SearchFeedBackForm.vue";
import Notification from "@/components/Notification.vue";
import {onMounted, ref} from "vue"
import router from "@/router"

const keywords = ref('')
const feedbackList = ref([])

const userIds = ref([
    {id: 43, name: "user"},
    {id: 44, name: "admin"}
]);

const types = ref([
    {type: "bug"},
    {type: "improvement"}
]);

const filters = ref({
    userId: '',
    type: ''
});

const applyFilter = () => {
    const queryParams = {};
    for (const key in filters.value) {
        if (filters.value[key] !== '') {
            queryParams[key] = filters.value[key]
        }
    }
    router.push({query: queryParams}).then(() => getFeedback())
};

const getFeedback = (page = 1) => {
    const queryParams = router.currentRoute.value.query
    if (keywords.value) {
        queryParams.keywords = keywords.value
    }
    queryParams.page = page

    axios.get('feedbacks', {params: queryParams})
        .then(response => {
            feedbackList.value = response.data && response.data.data.length ? response.data : ''
        }).catch(error => {
        console.error('Error fetching feedback:', error)
    });
}

const searchFeedback = (query) => {
    keywords.value = query
    getFeedback()
};

onMounted(() => {
    getFeedback()
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