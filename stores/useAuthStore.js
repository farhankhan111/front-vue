import {defineStore} from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth', {

    state: () => ({
        token: null,
        user: null,
    }),

    getters: {
        authenticated(state) {
            return state.token !== null && state.user !== null;

        },
        authUser(state) {
            return state.user
        },

        userRoles(state) {
            return state.user.roles || null
        },

        userPermissions(state) {
            return state.user.permissions || null
        },

    },

    actions: {

        async signIn(credentials) {
            try {
                const response = await axios.post('auth/signin', credentials)
                return this.getUser(response.data.token)
            } catch (error) {
                throw error
            }
        },

        async getUser(token) {
            if (!token) {
                return
            }

            try {
                const response = await axios.get('auth/me',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.token = token;
                this.user = response.data.data;
                localStorage.setItem("token", token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            } catch (error) {
                this.token = null;
                this.user = null;
                localStorage.removeItem('token');
                console.log(error)
            }
        },

        async signUp(form) {
            try {
                const response = await axios.post('auth/signup', form)
                const token = response.data.token
                localStorage.setItem("token", token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                return this.getUser(response.data.token)
            } catch (error) {
                throw error
            }
        },

        signOut() {
            return axios.post('auth/signout').then(()=>{
                this.token = null;
                this.user = null;
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('token');
            })
        },
    }

})