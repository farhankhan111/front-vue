<template>
    <button class="btn btn-primary" v-if="pagination.prev_cursor" @click="loadPage(pagination.prev_cursor)">Previous</button>
    <button class="btn btn-primary" v-if="pagination.next_cursor" @click="loadPage(pagination.next_cursor)">Next</button>
</template>


<script>
export default {
    name: "CursorPagination",
    props: {
        pagination:{type: Object },
    },
    emits:['loadPage'],

    methods:{
        loadPage(cursor){
            this.$emit('loadPage', cursor);
        }
    }
}
</script>

<style scoped>

button{

    margin-right: 3px;
}
</style>