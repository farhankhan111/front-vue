<template>

    <TheNav/>

    <ValidationErrors :validationErrors="validationErrors"/>

    <form @submit.prevent="submit">
        <label for="username">Email:</label>
        <input type="text" id="email" name="email" v-model="form.email">

        <label for="username">Pass:</label>
        <input type="text" id="password" name="password" v-model="form.password">
        <button type="submit">Submit</button>
    </form>
</template>


<script>
import {mapActions, mapGetters} from 'vuex';
import store from "@/store";
import ValidationErrors from "@/components/ValidationErrors.vue";
import TheNav from "@/components/TheNav.vue";

export default {
    name: "signin",
    components: {TheNav, ValidationErrors},

    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            validationErrors: []
        };
    },

    computed: {
        ...mapGetters('auth', ['user']),
    },

    methods: {
        ...mapActions('auth', ['signIn']),

        submit() {
            this.signIn(this.form)
                .then((user) => {
                    if (this.user.user_type === 'admin') {
                        this.$router.push({name: 'admin-dashboard'})
                    } else {
                        this.$router.push({name: 'profile'})
                    }
                }).catch((error) => {
                    if (error.response && error.response.status === 401) {
                        alert(error.response.data.error);
                    }

                    if (error.response && error.response.status === 422) {
                        this.validationErrors = error.response.data.errors;
                    } else {
                        console.error(error);
                    }
                })
        },
    },

}
</script>