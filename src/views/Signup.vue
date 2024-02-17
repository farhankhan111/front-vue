<template>

    <TheNav/>

    <ValidationErrors :validationErrors="validationErrors"/>

    <form @submit.prevent="submit">
        <label for="username">Username:</label>
        <input type="text" id="email" name="name" v-model="form.name">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" v-model="form.email">
        <label for="username">Pass:</label>
        <input type="text" id="password" name="password" v-model="form.password">
        <button type="submit">SignUp</button>
    </form>
</template>

<script>
import {mapActions} from "vuex";
import ValidationErrors from "@/components/ValidationErrors.vue";
import TheNav from "@/components/TheNav.vue";

export default {
    name: "Signup",
    components: {TheNav, ValidationErrors},

    data() {
        return {
            form: {
                name: '',
                email: '',
                password: ''
            },
            validationErrors: []
        };
    },

    methods: {
        ...mapActions('auth', ['signUp']),

        submit() {
            this.signUp(this.form)
                .then(() => {
                    this.$router.push({name: 'profile'})
                }).catch((error) => {

                if (error.response && error.response.status === 422) {
                    this.validationErrors = error.response.data.errors;
                }
            })
        },
    },
}
</script>