<script>
import axios from "axios";
import ValidationErrors from "@/components/ValidationErrors.vue";

export default {
    name: "CommentsSection",
    components: {ValidationErrors},
    props: {
        comments: Array,
    },

    data() {
        return {
            content: '',
            loading: true,
            feedback: null,
            validationErrors: []
        }
    },

    methods:{
        addComment() {
            axios.post(`feedbacks/${this.$route.params.id}/comments`, {content: this.content})
                .then(response => {
                    this.validationErrors = []
                   // this.feedback.comments.push(response.data.comment)
                    this.content = ''
                    alert('waiting for moderation')
                }).catch(error => {
                    if (error.response && error.response.status === 422) {
                        this.validationErrors = error.response.data.errors
                    } else {
                        alert(error)
                    }
            });
        },
    }
}
</script>

<template>

    <ValidationErrors :validationErrors="validationErrors"/>

    <div id="comments">
        <h2>Comments</h2>
        <div v-for="(comment, index) in comments" :key="index" class="comment">
            <p><strong>{{ comment.user.name }}:</strong> {{ comment.content }}</p>
        </div>

        <h2>Add a Comment</h2>
       <form @submit.prevent="addComment">
            <label for="comment">Your Comment:</label>
            <textarea v-model="content" id="comment" name="comment" rows="4"></textarea>
            <input type="submit" value="Submit Comment">
        </form>
    </div>

</template>