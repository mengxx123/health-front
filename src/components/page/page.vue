<template>
    <ui-page :title="title || page.title" :page="page" :backable="backable" ref="page">
        <div slot="drawer">
            <div class="header">
                <img class="logo" src="/static/img/health_heart.svg">
            </div>
            <ui-list @itemClick="toggle()">
                <ui-list-item title="应用" to="/">
                    <ui-icon slot="left" value="home"/>
                </ui-list-item>
                <ui-list-item title="健康数据" to="/me">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="运动" to="/sport">
                    <ui-icon slot="left" value="grade"/>
                </ui-list-item>
                <ui-list-item title="生活" href="https://life.yunser.com/" target="_blank">
                    <ui-icon slot="left" value="link"/>
                </ui-list-item>
                <ui-list-item title="关于" href="https://project.yunser.com/products/768c65305c5811e888a50737631f72f2" target="_blank">
                    <ui-icon slot="left" value="info"/>
                </ui-list-item>
            </ui-list>
        </div>
        <slot></slot>
    </ui-page>
</template>

<script>
    export default {
        data() {
            return {
                open: false,
                docked: true
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: 'default'
            },
            page: {
                type: Object,
                default: function () {
                    return {
                        title: '云设'
                    }
                }
            },
            backable: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            toggle() {
                console.log(this.$refs.page)
            }
        }
    }
</script>

<style lang="scss" scoped>
.header {
    padding: 40px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.logo {
    display: block;
    width: 80px;
    margin: 0 auto;
}
.ui-position-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}
</style>
