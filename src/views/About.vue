<template>
    <my-page title="关于">
        <div>BMI 计算器 v1.1.0</div>
        isInFrame：{{ isInFrame }}
        <div>
           embed: {{ embed }} 
        </div>
        <div class="copyright">© 2018 <a href="https://yunser.com" target="_blank">云设</a></div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                isInFrame: '',
                embed: ''
            }
        },
        mounted() {
            this.isInFrame = window.self !== window.top
            this.embed = this.$route.query.embed === 'true' && this.isInFrame
        }
    }
</script>

<style scoped>
</style>
