<template>

    <AdminNav />
    <h1>Edit Feedback</h1>

    <ValidationErrors :validationErrors="validationErrors"/>

    <form @submit.prevent="submitFeedback">
        <label for="title">Title:</label>
        <input v-model="title" id="title" type="text">

        <label for="category">Type:</label>
        <select class="form-select" v-model="type" id="category">
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="improvement">Improvement</option>
        </select>

        <label for="description">Description:</label>
        <textarea v-model="desc" id="description" rows="4"></textarea>

        <button type="submit">Update Feedback</button>
    </form>
</template>


<script>
import axios from "axios";
import ValidationErrors from "@/components/ValidationErrors.vue";
import AdminNav from "@/components/AdminNav.vue";

export default {
    name: "EditFeedback",
    components: {AdminNav, ValidationErrors},

    data() {
        return {
            title: '',
            type: '',
            desc: '',
            validationErrors: []
        };
    },

    created() {

        this.getFeedback()
    },

    methods: {

        async getFeedback() {
            const id = this.$route.params.id

            try {
                const response = await axios.get(`admin/feedbacks/${id}/edit`)
                this.title = response.data.feedback.title
                this.type = response.data.feedback.type
                this.desc = response.data.feedback.desc
            } catch (error) {
                alert(error)
                console.log(error.response.status)
            } finally {
                this.loading = false;
            }
        },

        submitFeedback() {
            axios.put(`admin/feedbacks/${this.$route.params.id}`, {
                title: this.title,
                type: this.type,
                desc: this.desc,
            }).then(response => {
                this.validationErrors = []
                if (response.status === 200) {
                    alert('updated')
                    //this.$router.push({ name: 'admin-dashboard' });
                } else {
                    console.error('Unexpected status code:', response.status);
                }
            }).catch(error => {
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