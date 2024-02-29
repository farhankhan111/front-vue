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

<script setup>
import ValidationErrors from "@/components/ValidationErrors.vue";
import TheNav from "@/components/TheNav.vue";
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from "../../stores/useAuthStore";
const store = useAuthStore()

const router = useRouter();
const validationErrors = ref([]);
const form = ref({
    name: '',
    email: '',
    password: '',
});

const submit = () => {
    store.signUp(form.value)
        .then(() => {
            router.push({name: 'profile'});
        })
        .catch((error) => {
            if (error.response && error.response.status === 422) {
                validationErrors.value = error.response.data.errors;
            }
        });
};
</script>
