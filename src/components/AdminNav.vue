<script setup>
import {computed} from "vue";
import {useAuthStore} from "../../stores/useAuthStore";
import {useRouter} from "vue-router";
import axios from "axios";

const router = useRouter();
const store = useAuthStore()
const authenticated = computed(()=> store.authenticated )
const user = computed(()=> store.authUser )

const signOutAction = () => {
    store.signOut().then(()=>{
        router.replace({name: 'home'})
    })
}

const broadcast = () => {
    axios.get(`admin/fire-broadcast`)
        .then(response => {
            /*const moderatedComment = comments.value.data.find(comment => comment.id === commentId);
            if (moderatedComment) {
                moderatedComment.moderate = 1;
                alert(response.data.metadata.message)
            }*/
        })
        .catch(error => {
            console.error(error);
        });
}

</script>

<template>
    <template v-if="authenticated">
        <ul>
            <li>
                {{ user.name }}
            </li>
            <li>
                <a href="#" @click.prevent="signOutAction"> Signout </a>
            </li>
            <li>
                <router-link to="/admin/dashboard">Dashboard</router-link>
            </li>
            <li>
                <router-link to="/admin/comments">Comments</router-link>
            </li>

            <li>
                <router-link to="/admin/feedbacks">FeedBacks</router-link>
            </li>

            <li>
                <button class="btn btn-primary" @click="broadcast">Broadcast</button>
            </li>
        </ul>
    </template>
    <template v-else>
        <li>
            <router-link to="/">Home</router-link>
        </li>
        <li>
            <router-link to="/signin">Signin</router-link>
        </li>
    </template>
</template>

<style scoped>

ul {
    list-style: none;
    display: flex;
    gap: 10px;
}
</style>