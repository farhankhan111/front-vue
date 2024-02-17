<script>
export default {
    name: "FeedBackView",
    props: {
        feedback: {
            type: Object,
            required: true
        },
        hasAnchorTag: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<template>
    <template v-if="hasAnchorTag">
        <router-link :to="{ name: 'feedback-detail', params: { id: feedback.id }}">
            <h4>{{ feedback.title }}</h4>
        </router-link>
    </template>
    <template v-else>
        <h2>{{ feedback.title }}</h2>
    </template>
    <p>{{ feedback.desc }}</p>
    <p><strong>Author:</strong> {{ feedback.user.name }}</p>

</template>

<style scoped>

</style>