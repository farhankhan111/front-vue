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

<script setup>
import TheNav from "@/components/TheNav.vue";
import ValidationErrors from "@/components/ValidationErrors.vue";
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "../../stores/useAuthStore";
const store = useAuthStore()
const router = useRouter();
const validationErrors = ref([]);
const user = computed(() => store.authUser )
const form = ref({
    email: '',
    password: '',
});

const submit = () => {
    store.signIn(form.value)
        .then(() => {
            if (user.value.user_type === 'admin') {
                router.push({name: 'admin-dashboard'})
            } else {
                router.push({name: 'profile'})
            }
        }).catch((error) => {
        if (error.response && error.response.status === 401) {
            alert(error.response.data.error);
        }

        if (error.response && error.response.status === 422) {
            validationErrors.value = error.response.data.errors;
        } else {
            console.error(error);
        }
    })
}

</script>
