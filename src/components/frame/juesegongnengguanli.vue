<template>
    <div>
        <iframe width="100%" height="830px" :src="url"
                frameborder="0"></iframe>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                url: ''
            }
        },
        mounted: function () {
            this.url = this.$http.defaults.baseURL+this.$route.query.funcUrl
        }
    }
</script>