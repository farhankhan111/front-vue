<template>
    <ul>
        <template v-if="authenticated">
            <li>
                {{ user.name }}
            </li>
            <li>
                <a href="#" @click.prevent="signOutAction"> Signout </a>
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

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "TheNav",
    computed: {
        ...mapGetters('auth', ['authenticated', 'user']),
    },

    methods: {
        ...mapActions('auth', ['signOut']),

        signOutAction() {
            this.signOut().then(()=>{
                this.$router.replace({name: 'home'})
            })
        }
    }
}

</script>

<style scoped>

ul {

    list-style: none;
    display: flex;
    gap: 10px;
}
</style>
