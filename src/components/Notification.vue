<template>
    <div>
        <h2>Notifications</h2>
        <ul>
            <li v-for="notification in notifications" :key="notification.id">
                {{ notification.data.message }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name:'notifications',

    data() {
        return {
            notifications: [],
        };
    },
    mounted() {
        this.fetchNotifications();
    },
    methods: {
        async fetchNotifications() {
            try {
                const response = await axios.get('notifications');
                this.notifications = response.data;
            } catch (error) {
                console.error('Error fetching notifications', error);
            }
        },
    },
};
</script>
