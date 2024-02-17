<script>
export default {
    name: "ValidationErrors",
    props: {
        validationErrors: {
           // type: String,
            required: true,
        },
    },
}
</script>

<template>
    <ul v-if="validationErrors">
        <li v-for="validationError in validationErrors">{{validationError[0]}}</li>
    </ul>
</template>

<style scoped>

</style>