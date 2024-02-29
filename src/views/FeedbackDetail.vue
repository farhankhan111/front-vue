<template>
    <TheNav />
    <Notification />
    <div class="main" v-if="feedback!==null">
        <FeedBackView :feedback="feedback" />
        <div>
            <button @click="voteFeedback(feedback.id,'upvote')" class="like-button">
                <i class="fas fa-thumbs-up"></i> Like {{ feedback.upvotes }}
            </button>
            <button @click="voteFeedback(feedback.id,'downvote')" class="dislike-button">
                <i class="fas fa-thumbs-down"></i> Dislike {{ feedback.downvotes }}
            </button>
        </div>
        <CommentsSection :comments="feedback.comments" />
    </div>
</template>

<script setup>
import axios from "axios";
import TheNav from "@/components/TheNav.vue";
import CommentsSection from "@/components/CommentsSection.vue";
import FeedBackView from "@/components/FeedBackView.vue";
import Notification from "@/components/Notification.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
const loading = ref(true)
const feedback = ref(null)
const getFeedback = async () => {
    const id = route.params.id;

    try {
        const response = await axios.get(`feedbacks/${id}`)
        feedback.value = response.data.data;
    } catch (error) {
        if(error.response.status===404){
            alert('404 not found')
        }
    } finally {
        loading.value = false;
    }
}

const voteFeedback = (id,vote_type) => {
    axios.post('votes', {
        feedback_id: id,
        vote_type: vote_type,
    }).then(response => {
        alert('votes submitted successfully')
    }).catch(error => {
        if (error.response && error.response.status === 422) {
            const validationErrors = error.response.data.errors
            if (validationErrors
                && validationErrors.vote_type
                && validationErrors.vote_type[0] === "User already voted for this item.") {
                alert(validationErrors.vote_type[0]);
            } else {
                alert("Validation error occurred.");
            }
        } else {
            console.error(error);
        }
    });
}

onMounted(() => {
    getFeedback()
})

</script>

<style>
.like-button, .dislike-button {
    background-color: #3498db;
    color: #fff;
    padding: 5px 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 0px 1px;

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
body {
    font-family: 'Arial', sans-serif;
    max-width: 1200px;
    margin: auto;
    padding: 20px;
    line-height: 1.6;
}
h1 {
    color: #333;
}
p {
    color: #555;
}
#comments {
    margin-top: 30px;
}
.comment {
    border-bottom: 1px solid #ccc;
    margin-bottom: 15px;
    padding-bottom: 15px;
}
label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}
input, textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
input[type="submit"] {
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
}
input[type="submit"]:hover {
    background-color: #45a049;
}
</style>

