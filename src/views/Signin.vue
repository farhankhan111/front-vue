<template>
    <TheNav/>
    <ValidationErrors :validationErrors="validationErrors"/>
    <Form @submit="submit">
        <label for="username">Email:</label>
        <Field type="text" name="email" v-model="form.email" :rules="[required,validateEmail]" />
        <ErrorMessage name="email" />

        <label for="username">Pass:</label>
        <Field type="text" name="password" v-model="form.password" :rules="required" />
        <ErrorMessage name="password" />
        <div>
            <button type="submit">Submit</button>
        </div>
    </Form>
</template>

<script setup>

import {Field,Form,ErrorMessage} from "vee-validate";
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

const required = (value) => {
    return !value ? 'This field is required' : true;
}
const validateEmail = (value) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return !regex.test(value) ? 'This field must be a valid email' : true;
}
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
