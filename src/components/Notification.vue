<template>
<!--    <div>
        <ul>
            <li v-for="notification in notifications" :key="notification.id">
                {{ notification.data.message }}
            </li>
        </ul>
    </div>-->
</template>

<script setup>
import axios from "axios";
import {computed, onMounted, ref} from "vue";
import {useToast,POSITION} from "vue-toastification";
import {useAuthStore} from "../../stores/useAuthStore";

const toast = useToast()
const notifications = ref([])
const store = useAuthStore()
const user = computed(()=> store.authUser )
const fetchNotifications = async () => {
    try {
        const response = await axios.get('notifications');
        const notifications = response.data.data;
        notifications.forEach(notification => {
            //notifications.value = response.data;
            toast.success(notification.message, { position: POSITION.BOTTOM_RIGHT });
        });
    } catch (error) {
        console.error('Error fetching notifications', error);
    }
}

onMounted(() => {
    fetchNotifications();

    window.Echo.private(`App.Models.User.${user.value.id}`)
        .notification((notification) => {
            toast.success(notification.message, { position: POSITION.BOTTOM_RIGHT });
        });
})


</script>
