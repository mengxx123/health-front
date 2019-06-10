<template>
    <my-page title="跑步" :page="page">
        <div class="common-container container">
            <a href="javascript:;" v-if="!$store.state.user" @click="login">点击登陆</a>
            <div v-if="$store.state.user">

                <div class="runing-box">
                    <div v-if="isStart">
                        <div class="state">跑步中...</div>
                    </div>
                    <div class="btns">
                        <ui-raised-button class="btn" secondary label="结束跑步" @click="endRun" v-if="isStart" />
                        <ui-raised-button class="btn" primary label="开始跑步" @click="startRun" v-if="!isStart" />
                        <ui-raised-button class="btn" label="取消" @click="cancel" v-if="isStart" />
                    </div>

                </div>

                <ul class="data-list" v-if="stat">
                    <li class="item">
                        <div class="title">今日</div>
                        <div class="content">
                            <div class="value">
                                <div class="number">{{ stat.day }}</div>
                                <div class="unit">公里</div>
                            </div>
                        </div>
                    </li>
                    <li class="item">
                        <div class="title">本周</div>
                        <div class="content">
                            <div class="value">
                                <div class="number">{{ stat.week }}</div>
                                <div class="unit">公里</div>
                            </div>
                        </div>
                    </li>
                    <li class="item">
                        <div class="title">本月</div>
                        <div class="content">
                            <div class="value">
                                <div class="number">{{ stat.month }}</div>
                                <div class="unit">公里</div>
                            </div>
                        </div>
                    </li>
                    <li class="item">
                        <div class="title">一年内</div>
                        <div class="content">
                            <div class="value">
                                <div class="number">{{ stat.year }}</div>
                                <div class="unit">公里</div>
                            </div>
                        </div>
                    </li>
                    <li class="item">
                        <div class="title">累计跑步距离</div>
                        <div class="content">
                            <div class="value">
                                <div class="number">{{ stat.total }}</div>
                                <div class="unit">公里</div>
                            </div>
                        </div>
                    </li>
                </ul>

                <div class="pui-section-title">我的最佳成绩</div>
                <ul class="data-list" v-if="stat">
                    <li class="item">
                        <div class="title">最远距离</div>
                        <div class="content">
                            <div class="value">
                                <div class="number">{{ stat.distance.distance }}</div>
                                <div class="unit">公里</div>
                            </div>
                            <!-- <div class="time">{{ height.recordTime }}</div> -->
                        </div>
                    </li>
                    <li class="item">
                        <div class="title">最长用时</div>
                        <div class="content">
                            <div class="value">
                                <div class="number">{{ stat.time.data }}</div>
                                <!-- <div class="unit">秒</div> -->
                            </div>
                            <!-- <div class="time">{{ height.recordTime }}</div> -->
                        </div>
                    </li>
                    <li class="item">
                        <div class="title">最快配速</div>
                        <div class="content">
                            <div class="value">
                                <div class="number">{{ stat.speed.data }}</div>
                                <!-- <div class="unit">秒</div> -->
                            </div>
                            <!-- <div class="time">{{ height.recordTime }}</div> -->
                        </div>
                    </li>
                </ul>
                <div v-else>没有统计数据</div>

                <h2 class="pui-section-title">总记录（{{ objects.length }}）</h2>
                <div class="empty" v-if="!objects.length">没有记录</div>
                <ul class="record-list">
                    <li class="item" v-for="item, index in objects" :key="index">
                        <router-link class="link" :to="`/heights/${item.id}`">
                            <div class="info">
                                <div class="name">
                                    {{ item.distance }} 
                                    <span class="unit">km</span>
                                </div>
                                <div class="note">{{ item.note }}</div>
                            </div>
                        </router-link>
                        <div class="time">{{ item.recordTime | time }}</div>
                        <!-- <div class="time" v-if="item.duration">{{ item.duration | duration }}</div>
                        <div @click="remove(item, index)">删除</div>
                        <div @click="finish(item, index)" v-if="!item.duration">刚刚完成</div> -->

                    </li>
                </ul>
            </div>
        </div>
        <ui-float-button class="float-button" icon="add" secondary @click="add" />
        
    </my-page>
</template>

<script>
    /* eslint-disable */
    import oss from '@/util/oss'
    const moment = window.moment

    export default {
        data () {
            return {
                isStart: false,
                keyword: '',
                objects: [],
                stat: null,
                page: {
                    menu: [
                        // {
                        //     type: 'icon',
                        //     icon: 'list',
                        //     click: this.goToPosition,
                        //     title: '位置'
                        // },
                        // {
                        //     type: 'icon',
                        //     icon: 'info',
                        //     href: 'https://project.yunser.com/products/df9b94604be511e9b23dd705ccff6367',
                        //     target: '_blank',
                        //     title: '记录列表'
                        // },
                    ]
                }
            }
        },
        mounted() {
            console.log(this.$store)
            let { date } = this.$route.query
            if (!date) {
                date = moment().format('YYYY-MM-DD')
            }
            this.date = date
            this.loadData()

            this.isStart = this.$storage.get('isStart', false)
            if (this.isStart) {
                this.startTime = this.$storage.get('startTime', false)
            }
        },
        methods: {
            startRun() {
                this.isStart = true
                this.startTime = new Date().getTime()
                this.$storage.set('isStart', this.isStart)
                this.$storage.set('startTime', this.startTime)
            },
            endRun() {
                this.isStart = false
                this.$storage.set('isStart', this.isStart)
                let time = new Date().getTime() - this.startTime
                // alert(time)
                this.$router.push(`/running/add?time=${time}`)
            },
            cancel() {
                this.isStart = false
                this.$storage.set('isStart', this.isStart)
            },
            clearKeyword() {
                this.keyword = ''
                this.$router.push('/objects')
            },
            goToPosition() {
                this.$router.push('/positions')
            },
            loadData() {
                let user = this.$store.state.user
                if (!user) {
                    return
                }
                let { keyword } = this.$route.query
                // this.userId = this.$route.params.id
                this.keyword = keyword
                // let { date } = this.$route.query
                this.$http.get(`/running/logs`).then(
                    response => {
                        let data = response.data
                        console.log(data)
                        this.objects = data
                    },
                    response => {
                        console.log('cuol')
                        if (response.code === 403) {
                            this.$store.state.user = null
                        }
                        this.loading = false
                    })
                this.$http.get(`/running/stat`).then(
                    response => {
                        let data = response.data
                        console.log('stat', data)
                        this.stat = data
                        this.stat.time.data = `${Math.floor(this.stat.time.time / 60)}′${this.stat.time.time % 60}〃`
                        this.stat.speed.data = `${Math.floor(this.stat.speed.speed / 60)}′${this.stat.speed.speed % 60}〃`
                    },
                    response => {
                        console.log('cuol')
                        if (response.code === 403) {
                            this.$store.state.user = null
                        }
                        this.loading = false
                    })
            },
            view(item, index) {
                this.$router.push(`/records/${item.id}`)
            },
            add() {
                this.$router.push('/running/add')
            },
            sign(item, index) {
                this.list[index].times++
                this.list[index].lastTime = new Date().getTime()
                this.list[index].updateTime = new Date().getTime()
                this.$storage.set('list', this.list)
                let logs = this.$storage.get('logs', [])
                logs.unshift({
                    id: '' + new Date().getTime(),
                    taskId: this.list[index].id,
                    time: new Date().getTime(),
                    createTime: new Date().getTime(),
                    updateTime: new Date().getTime()
                })
                this.$storage.set('logs', logs)
            },
            remove(item, index) {
                let ret = window.confirm(`确认删除 ${item.content}？`)
                if (!ret) {
                    return
                }
                this.$http.delete(`/records/${item.id}`).then(
                    response => {
                        let data = response.data
                        console.log(data)
                        this.loadData()
                    },
                    response => {
                        console.log(response)
                        this.loading = false
                    })
            },
            finish(item, index) {
                let ret = window.confirm(`确认完成 ${item.content}？`)
                if (!ret) {
                    return
                }
                let endTime = moment().format('YYYY-MM-DD HH:mm:ss')
                let duration = (new Date().getTime() - moment(item.startTime).toDate().getTime()) / 1000
                console.log(duration)
                // return
                this.$http.put(`/records/${item.id}`, {
                    ...item,
                    endTime,
                    duration
                }).then(
                    response => {
                        let data = response.data
                        console.log(data)
                        this.loadData()
                    },
                    response => {
                        console.log(response)
                        this.loading = false
                    })
            },
            quickAdd(item) {
                this.$http.post(`/records`, {
                    content: item
                }).then(
                    response => {
                        let data = response.data
                        console.log(data)
                        // this.$router.go(-1)
                        this.loadData()
                    },
                    response => {
                        console.log(response)
                        this.loading = false
                    })
            },
            viewTodayBefore() {
                this.$router.push(`/users/1?date=${moment().subtract(1, 'days').format('YYYY-MM-DD')}`)
            },
            viewToday() {
                this.$router.push(`/users/1`)
            },
            viewTodayAfter() {
                this.$router.push(`/users/1?date=${moment().add(1, 'days').format('YYYY-MM-DD')}`)
            },
            login() {
                location.href = oss.getOauthUrl()
            },
            search() {
                if (!this.keyword) {
                    this.$message({
                        type: 'danger',
                        text: '请输入关键词'
                    })
                    return
                }
                this.$router.push(`/objects?keyword=${encodeURIComponent(this.keyword)}`)
            },
        },
        filters: {
            time(value) {
                if (!value) {
                    return '--'
                }
                return moment(new Date(value)).format('YYYY-MM-DD HH:mm')
            },
            duration(value) {
                return Math.ceil(value / 60) + '分钟'
            }
        }
    }
</script>

<style lang="scss" scoped>
.state {
    padding: 80px 0;
    text-align: center;
    font-size: 16px;
}
.btns {
    margin-bottom: 24px;
    text-align: center;
    .btn {
        margin-right: 8px;
    }
}
.runing-box {
    margin-bottom: 16px;
}
.simple-login-box {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .12);
}
.container {
    max-width: 400px;
}
// .section—title {
//     font-size: 24px;
//     margin: 16px 0;
// }
.quick-list {
    display: flex;
    flex-wrap: wrap;
    .item {
        padding: 4px 8px;
        margin-right: 8px;
        margin-bottom: 8px;
        border: 1px solid #000;
        cursor: pointer;
    }
}
.record-list {
    .item {
        // display: flex;
        // justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid rgba(0, 0, 0, .12);
    }
    .link {
        display: flex;
        justify-content: space-between;
        color: inherit;
    }
    .name {
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
    }
    .unit {
        color: #999;
    }
    .times {
        color: #666;
        cursor: pointer;
    }
    .note {
        color: #999;
    }
    .number {
        text-align: right;
    }
    .price {
        color: #f00;
        text-align: right;
    }
}
.float-button {
    position: fixed;
    right: 24px;
    bottom: 24px;
}
.float-button2 {
    position: fixed;
    left: 24px;
    bottom: 24px;
}
.sign {
    margin-bottom: 8px;
}
.empty {
    .text {
        color: #999;
        padding: 80px 0;
        text-align: center;
    }
}
.search-box {
    display: flex;
    width: 100%;
    max-width: 100%;
    margin-bottom: 24px;
    // border: 1px solid #eee;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    background-color: #fff;
    &:hover {
        box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
    }
    .input {
        flex-grow: 1;
        display: block;
        height: 48px;
        padding: 0 16px;
        line-height: 48px;
        border: none;
        outline: none;
    }
}
</style>
