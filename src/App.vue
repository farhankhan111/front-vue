<template>
    <div id="app">
        <router-view/>
  </div>
</template>

<script>
    import TheNav from "@/components/TheNav.vue"
    import Notification from "@/components/Notification.vue";

    export default {
      components:{
        TheNav,
        Notification
      }
    }

</script>
