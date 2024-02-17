import axios from "axios";
export default {
    namespaced: true,

    state : {
        token:null,
        user:null,
    },

    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user = user;
        },
    },

    actions: {

        async signUp({commit, dispatch}, form) {
            const response = await axios.post('auth/signup', form)
            const token = response.data.token
            localStorage.setItem("token", token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            dispatch('getUser', token)
        },

        async signIn({commit, dispatch}, credentials) {
            try {
                const response = await axios.post('auth/signin', credentials)
                return dispatch('getUser',response.data.token)
            } catch (error) {
                throw error
            }
        },

        async getUser({commit}, token) {
            if(!token){
                return
            }

            try {
                const response = await axios.get('auth/me',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                commit('setToken', token);
                commit('setUser', response.data);
                localStorage.setItem("token", token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            } catch (error) {
                commit('setUser', null);
                commit('setToken', null);
                localStorage.removeItem('token');
                console.log(error)
            }
        },

         signOut({commit}) {
            return axios.post('auth/signout').then(()=>{
                commit('setUser', null);
                commit('setToken', null);
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('token');
            })
        },
    },

    getters:{
        authenticated(state) {
            return state.token && state.user
        },
        user(state) {
            return state.user
        },

    }

}

