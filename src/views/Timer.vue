<template>
    <my-page title="运动计时" :page="page">
        <div class="common-container">
            <div>
                <div v-if="isStart">
                    <div class="status" v-if="isSporting">运动中</div>
                    <div class="status" v-if="!isSporting">休息中</div>
                    <div class="time">{{ timeText }}</div>
                </div>
                <div class="btns">
                    <ui-raised-button label="运动" class="btn" primary @click="sport" v-if="!isSporting"/>
                    <ui-raised-button label="休息" class="btn" secondary @click="rest" v-if="isSporting"/>
                    <!-- <ui-raised-button label="记录" class="btn" secondary @click="save" v-if="result"/> -->
                </div>
            </div>
            <ui-article v-if="records.length">
                <h2>记录</h2>
                <ul>
                    <li v-for="item, index in records" :key="index">
                        {{ item }}
                    </li>
                </ul>
                <p>总时间：{{ totalTime | time }}</p>
                <p>
                    <ui-raised-button label="复制" class="btn btn-copy" @click="copy" />
                </p>
                <p>
                    <ui-raised-button label="备注" class="btn" @click="note" />
                </p>
            </ui-article>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    const ClipboardJS = window.ClipboardJS

    export default {
        data () {
            return {
                height: null,
                weight: null,
                result: null,

                timeText: '',
                isStart: false,
                isSporting: false,
                totalTime: 0,
                records: [],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/7a39ede0c42d11e9ba4d81d7826f1b67',
                            target: '_blank',
                            title: '关于'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.init()
        },
        destroyed() {
            this.timer && clearInterval(this.timer)
        },
        methods: {
            copy() {},
            note() {
                let content = prompt('输入备注内容')
                if (content) {
                    this.records[this.records.length - 1] = this.records[this.records.length - 1] + `（${content}）`
                }
            },
            init() {
                this.timer = setInterval(() => {
                    if (this.isStart) {
                        let second = (new Date().getTime() - this.startTime) / 1000
                        let minute = Math.floor(second / 60)
                        second = parseInt(second % 60)
                        this.timeText = `${minute}:${second}`
                    }
                }, 1000)
                // this.sport()

                this.clipboard = new ClipboardJS('.btn-copy', {
                    target(trigger) {
                        return trigger
                    },
                    text: trigger => {
                        return this.records.map(item => '* ' + item).join('\n') + '\n\n' + `总时间：${this.time(this.totalTime)}`
                    }
                })
                this.clipboard.on('success', e => {
                    this.$message({
                        type: 'success',
                        text: '已复制'
                    })
                    e.clearSelection()
                })
                this.clipboard.on('error', e => {
                    console.error('Action:', e.action)
                    console.error('Trigger:', e.trigger)
                })
            },
            sport() {
                if (this.isStart) {
                    let second = (new Date().getTime() - this.startTime) / 1000
                    let minute = Math.floor(second / 60)
                    second = parseInt(second % 60)
                    this.records.push(`休息 ${minute} 分钟 ${second} 秒`)
                    this.totalTime += new Date().getTime() - this.startTime
                }
                this.timeText = '00:00'
                this.isStart = true
                this.isSporting = true
                this.startTime = new Date().getTime()
            },
            rest() {
                if (this.isStart) {
                    let second = (new Date().getTime() - this.startTime) / 1000
                    let minute = Math.floor(second / 60)
                    second = parseInt(second % 60)
                    this.records.push(`运动 ${minute} 分钟 ${second} 秒`)
                    this.totalTime += new Date().getTime() - this.startTime
                }
                this.isStart = true
                this.isSporting = false
                this.startTime = new Date().getTime()
                this.timeText = '00:00'
            },
            calculate() {
                this.result = null
                if (!this.height) {
                    this.$message({
                        type: 'danger',
                        text: '请输入身高'
                    })
                    return
                }
                if (this.height < 40 || this.height > 200) {
                    this.$message({
                        type: 'danger',
                        text: '请输入正确的身高'
                    })
                    return
                }
                if (!this.weight) {
                    this.$message({
                        type: 'danger',
                        text: '请输入体重'
                    })
                    return
                }
                if (this.weight < 20 || this.weight > 100) {
                    this.$message({
                        type: 'danger',
                        text: '请输入正确的体重'
                    })
                    return
                }

                this.$storage.set('height', this.height)
                this.$storage.set('weight', this.weight)

                var height = this.height / 100

                this.result = {}
                this.result.bmi = (this.weight / (height * height)).toFixed(1)
                this.result.state = this.getBmiText(this.result.bmi)
                // if (this.result.bmi <= 18.4) {
                //     this.result.state = '偏瘦'
                // } else if (this.bmi < 24) {
                //     this.result.state = '正常'
                // } else if (this.bmi < 28) {
                //     this.result.state = '过重'
                // } else {
                //     this.result.state = '肥胖'
                // }
                this.result.weight = ((23.9 + 18.5) / 2 * (height * height)).toFixed(1)
            },
            getBmiText(bmi) {
                if (bmi <= 18.4) {
                    return '偏瘦'
                } else if (bmi < 24) {
                    return '标准'
                } else if (bmi < 28) {
                    return '过重'
                } else {
                    return '肥胖'
                }
            },
            save() {
                let logs = this.$storage.get('logs', [])
                logs.push({
                    id: new Date().getTime(),
                    height: this.height,
                    weight: this.weight,
                    bmi: this.result.bmi,
                    createTime: new Date().getTime()
                })
                this.$storage.set('logs', logs)
                this.$router.push('/weight')
            },
            time(value) {
                let second = (value) / 1000
                let minute = Math.floor(second / 60)
                second = parseInt(second % 60)
                return `${minute} 分钟 ${second} 秒`
            }
        },
        filters: {
            time(value) {
                let second = (value) / 1000
                let minute = Math.floor(second / 60)
                second = parseInt(second % 60)
                return `${minute} 分钟 ${second} 秒`
            }
        }
    }
</script>

<style lang="scss" scoped>
    .paper {
        width: 240px;
        padding: 16px;
        margin: 16px 0;
        .title {
            font-size: 20px;
            margin-bottom: 16px;
        }
    }
    .table {
        width: 240px;
    }
    .btns {
        .btn {
            margin-right: 8px;
        }
    }
    .status {
        font-size: 24px;
        margin-bottom: 16px;
    }
    .time {
        font-size: 16px;
        margin-bottom: 16px;
    }
</style>
