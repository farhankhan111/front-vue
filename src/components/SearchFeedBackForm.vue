<template>
    <label>Search:</label>
    <input v-model="keywords" @input="searchFeedback" />
</template>

<script>
import debounce from "debounce";

export default {
    name: "SearchFeedBackForm",
    emits: ['searchFeedback'],

    data() {
        return {
            keywords: '',
        };
    },

    methods: {
        searchFeedback: debounce(function () {
            if(this.keywords.trim() === ''){
                return
            }
            this.$emit('searchFeedback', this.keywords);
        }, 500),
    }
}
</script>