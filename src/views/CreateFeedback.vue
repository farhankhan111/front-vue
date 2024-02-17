<template>
    <TheNav/>
    <Notification />
    <ValidationErrors :validationErrors="validationErrors"/>

    <form @submit.prevent="submitFeedback">
        <label for="title">Title:</label>
        <input v-model="form.title" id="title" type="text">

        <label for="category">Type:</label>
        <select class="form-select" v-model="form.type" id="category">
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="improvement">Improvement</option>
        </select>

        <label for="description">Description:</label>
        <textarea v-model="form.desc" id="description" rows="4"></textarea>

        <button type="submit">Submit Feedback</button>
    </form>
</template>


<script>
import axios from "axios";
import TheNav from "@/components/TheNav.vue";
import ValidationErrors from "@/components/ValidationErrors.vue";
import Notification from "@/components/Notification.vue";


export default {
    name: "CreateFeedback",
    components:{
        Notification,
        TheNav,
        ValidationErrors

    },

    data() {
        return {
            form:{
                title: '',
                type: 'bug',
                desc: '',
            },
            validationErrors: []
        };
    },

    methods: {
        submitFeedback() {
            axios.post('feedbacks', this.form)
                .then(response => {
                    this.validationErrors = []
                    this.$router.push('/feedbacks')
                })
                .catch(error => {
                if (error.response && error.response.status === 422) {
                    this.validationErrors = error.response.data.errors;
                } else {
                    console.error(error);
                }
            });
        },
    }

}
</script>