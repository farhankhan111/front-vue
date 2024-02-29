<template>
    <ul>
        <template v-if="authenticated">
            <li>
                {{ user.name }}
            </li>
            <li>
                <a href="#" @click.prevent="signOut"> Signout </a>
            </li>

            <li>
                <router-link to="/profile">Profile</router-link>
            </li>

            <li>
                <router-link to="/feedbacks">All Feedbacks</router-link>
            </li>

        </template>

        <template v-else>
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <router-link to="/signin">Signin</router-link>
            </li>

            <li>
                <router-link to="/signup">SignUp</router-link>
            </li>

        </template>
    </ul>
</template>

<script setup>
import {computed} from "vue";
import {useAuthStore} from "../../stores/useAuthStore";
import router from "@/router";
const store = useAuthStore()
const user = computed(() => store.authUser )
const authenticated = computed(() => store.authenticated )

const signOut = () => {
    store.signOut().then(()=>{
        router.replace({name: 'home'})
    })
}
</script>

<style scoped>

ul {

    list-style: none;
    display: flex;
    gap: 10px;
}
</style>
