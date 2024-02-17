<template>
    <AdminNav />
    <h2>Admin Dashboard</h2>

</template>

<script>
import axios from "axios";
import {Bootstrap5Pagination} from "laravel-vue-pagination";
import AdminNav from "@/components/AdminNav.vue";
export default {
    components: {AdminNav},
};
</script>
