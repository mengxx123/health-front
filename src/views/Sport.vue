<template>
    <my-page title="运动" :page="page">
        <div>
            <a href="javascript:;" v-if="!$store.state.user" @click="login">点击登陆</a>
        </div>
        <div class="common-container container">
            <div class="container" v-if="$store.state.user">
                <!-- <div class="pui-section-title">运动</div> -->
                <ul class="data-list">

                    <li class="item2" v-if="walk">
                        <router-link class="item linkable" to="walk">
                            <div class="title">步行</div>
                            <div class="content">
                                <div class="value">
                                    <div class="number">{{ walk.distance }}</div>
                                    <div class="unit">公里</div>
                                </div>
                                <div class="time">{{ walk.recordTime }}</div>
                            </div>
                        </router-link>
                    </li>
                    <div v-else>没有步行数据</div>

                    <li class="item2" v-if="running">
                        <router-link class="item linkable" to="running">
                            <div class="title">跑步</div>
                            <div class="content">
                                <div class="value">
                                    <div class="number">{{ running.distance }}</div>
                                    <div class="unit">公里</div>
                                </div>
                                <div class="time">{{ running.recordTime }}</div>
                            </div>
                        </router-link>
                    </li>
                    <div v-else>没有跑步数据</div>

                    <li class="item2" v-if="cycle">
                        <router-link class="item linkable" to="cycle">
                            <div class="title">骑行</div>
                            <div class="content">
                                <div class="value">
                                    <div class="number">{{ cycle.distance }}</div>
                                    <div class="unit">公里</div>
                                </div>
                                <div class="time">{{ cycle.recordTime }}</div>
                            </div>
                        </router-link>
                    </li>
                    <div v-else>没有骑行数据</div>

                    <li class="item2" v-if="pushUp">
                        <router-link class="item linkable" to="pushUp">
                            <div class="title">俯卧撑</div>
                            <div class="content">
                                <div class="value">
                                    <div class="number">{{ pushUp.number }}</div>
                                    <div class="unit">个</div>
                                </div>
                                <div class="time">{{ pushUp.recordTime }}</div>
                            </div>
                        </router-link>
                    </li>
                    <div v-else>没有俯卧撑数据</div>

                    <li class="item2" v-if="sitUp">
                        <router-link class="item linkable" to="sitUp">
                            <div class="title">仰卧起坐</div>
                            <div class="content">
                                <div class="value">
                                    <div class="number">{{ sitUp.number }}</div>
                                    <div class="unit">个</div>
                                </div>
                                <div class="time">{{ sitUp.recordTime }}</div>
                            </div>
                        </router-link>
                    </li>
                    <div v-else>没有仰卧起坐数据</div>
                </ul>
                
                <!-- <div class="pui-section-title">应用推荐（开发中）</div> -->
                <!-- <ui-float-button class="float-button" icon="add" secondary @click="add" /> -->
            </div>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import oss from '@/util/oss'

    const moment = window.moment

    export default {
        data () {
            return {
                pushUp: null,
                sitUp: null,
                height: null,
                weight: null,
                heartRate: null,
                running: null,
                walk: null,
                cycle: null,
                page: {
                    menu: [
                    ]
                }
            }
        },
        computed: {
        },
        mounted() {
            let asd = 1275 / 3.04
            console.log('asd', asd / 60, asd % 60)
            this.loadData()
        },
        methods: {
            add() {
                this.$router.push('/weight/add')
            },
            loadData() {
                let user = this.$store.state.user
                if (!user) {
                    return
                }
                this.$http.get(`/heights/latest`).then(
                    response => {
                        let data = response.data
                        console.log('latest', data)
                        this.height = data
                        this.height.recordTime = moment(this.height.recordTime).format('YYYY-MM-DD HH:mm')
                    },
                    response => {
                        console.log('cuol')
                        if (response.code === 403) {
                            this.$store.state.user = null
                        }
                        this.loading = false
                    })
                this.$http.get(`/weights/latest`).then(
                    response => {
                        let data = response.data
                        console.log('latest2', data)
                        this.weight = data
                        this.weight.recordTime = moment(this.weight.recordTime).format('YYYY-MM-DD HH:mm')
                    },
                    response => {
                        console.log('cuol')
                        if (response.code === 403) {
                            this.$store.state.user = null
                        }
                        this.loading = false
                    })
                this.$http.get(`/running/logs/latest`).then(
                    response => {
                        let data = response.data
                        console.log('latest2', data)
                        this.running = data
                        this.running.recordTime = moment(this.running.recordTime).format('YYYY-MM-DD HH:mm')
                    },
                    response => {
                        console.log('cuol')
                        if (response.code === 403) {
                            this.$store.state.user = null
                        }
                        this.loading = false
                    })
                this.$http.get(`/walk/logs/latest`).then(
                    response => {
                        let data = response.data
                        console.log('latest2', data)
                        this.walk = data
                        this.walk.recordTime = moment(this.walk.recordTime).format('YYYY-MM-DD HH:mm')
                    },
                    response => {
                        console.log('cuol')
                        if (response.code === 403) {
                            this.$store.state.user = null
                        }
                        this.loading = false
                    })
                this.$http.get(`/heartRate/logs/latest`).then(
                    response => {
                        let data = response.data
                        console.log('latest2', data)
                        this.heartRate = data
                        this.heartRate.recordTime = moment(this.heartRate.recordTime).format('YYYY-MM-DD HH:mm')
                    },
                    response => {
                        console.log('cuol')
                        if (response.code === 403) {
                            this.$store.state.user = null
                        }
                        this.loading = false
                    })
                this.$http.get(`/cycle/logs/latest`).then(
                    response => {
                        let data = response.data
                        console.log('latest2', data)
                        this.cycle = data
                        this.cycle.recordTime = moment(this.cycle.recordTime).format('YYYY-MM-DD HH:mm')
                    },
                    response => {
                        console.log('cuol')
                        if (response.code === 403) {
                            this.$store.state.user = null
                        }
                        this.loading = false
                    })
                this.$http.get(`/pushUps/latest`).then(
                    response => {
                        let data = response.data
                        console.log('latest2', data)
                        this.pushUp = data
                        this.pushUp.recordTime = moment(this.pushUp.recordTime).format('YYYY-MM-DD HH:mm')
                    },
                    response => {
                        console.log('cuol')
                        if (response.code === 403) {
                            this.$store.state.user = null
                        }
                        this.loading = false
                    })
                this.$http.get(`/sitUps/latest`).then(
                    response => {
                        let data = response.data
                        console.log('latest2', data)
                        this.sitUp = data
                        this.sitUp.recordTime = moment(this.sitUp.recordTime).format('YYYY-MM-DD HH:mm')
                    },
                    response => {
                        console.log('cuol')
                        if (response.code === 403) {
                            this.$store.state.user = null
                        }
                        this.loading = false
                    })
            },
            init() {
            },
            fileChange(e) {
            },
            sizeStr: function (size) {
            },
            login() {
                location.href = oss.getOauthUrl()
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../scss/var';

.container {
    max-width: 400px;
    margin: 0 auto;
}

.float-button {
    position: fixed;
    right: 24px;
    bottom: 24px;
}

.tool-list {
    max-width: 840px;
    margin: 0 auto;
    @include clearfix;
    .list-item {
        position: relative;
        float: left;
        width: 260px;
        height: 96px;
        padding: 8px;
        margin: 2px 16px 16px 2px;
        background-color: #fff;
        //border: 1px solid #ccc;
        &:hover {
            background-color: #f9f9f9;
            // box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
            //border-color: #09c;
            .icon {
                display: block;
            }
        }
        &.active {
            border: 1px solid #f00;
        }
    }
    a {
        display: block;
        height: 100%;
        color: #666;
    }
    .img {
        float: left;
        width: 72px;
        height: 72px;
        margin-right: 16px;
        background-color: #fff;
        border: 1px solid #e9e9e9;
        border-radius: 8px;
    }
    .info {
        float: left;
    }
    .text {
        font-size: 18px;
        color: #000;
    }
    .header {
        overflow: hidden;
    }
    .desc {
        max-width: 150px;
        margin-top: 8px;
    }
    .icon-heart {
        display: none;
        position: absolute;
        top: 8px;
        right: 8px;
        &:hover {
            color: #f00;
        }
    }
    .icon-close {
        display: none;
        position: absolute;
        top: 32px;
        right: 8px;
        &:hover {
            color: #f00;
        }
    }
}
@media all and (max-width: 400px){
    .tool-list {
        .list-item {
            width: 100%;
            margin-right: 0;
        }
    }
}
</style>
