<template>
    <my-page title="体重记录" :page="page">
        <div class="common-container">
            <div class="empty" v-if="!showData">
                暂无记录，<router-link to="/">去记录</router-link>
            </div>
            <div class="container" v-if="showData">
                <div class="weight">
                    <span class="number">{{ showData.weight }}</span>
                    <span class="unit">公斤</span>
                </div>
                <ul class="data-list">
                    <li class="item">
                        <div class="title">目标</div>
                        <div class="content">
                            <span class="number">{{ targetWeight }}</span>
                            <span class="unit">公斤</span>
                        </div>
                    </li>
                    <li class="item">
                        <div class="title">BMI</div>
                        <div class="content">
                            <span class="number">{{ showData.bmi }}</span>
                            <ui-badge :content="showData.text" />
                        </div>
                    </li>
                    <li class="item">
                        <div class="title">比上次</div>
                        <div class="content">
                            <span class="number">{{ showData.change }}</span>
                            <span class="unit">公斤</span>
                        </div>
                    </li>
                </ul>
                <!-- <schart :canvasId="canvasId"
                    :type="type"
                    :width="width"
                    :height="height"
                    :data="data"
                    :options="options"
                ></schart> -->
            </div>
            <ui-drawer class="setting-box" right :open="settingOpen" :docked="false" @close="toggleSetting()">
                <ui-appbar title="设置">
                    <ui-icon-button icon="close" slot="left" title="关闭" @click="toggleSetting" />
                </ui-appbar>
                <div class="body">
                    <ui-text-field type="number" v-model="targetWeight" label="目标体重" />
                </div>
            </ui-drawer>
            <div class="create-time" v-if="showData">{{ createTime }} 更新</div>
        </div>
    </my-page>
</template>

<script>
    import {format} from '../util/time'
    import Schart from 'vue-schart'

    export default {
        data () {
            return {
                targetWeight: '',
                createTime: '',
                showData: null,
                // chart
                canvasId: 'myCanvas',
                type: 'bar',
                width: 500,
                height: 500,
                data: [
                    {name: '2014', value: 1342},
                    {name: '2015', value: 2123},
                    {name: '2016', value: 1654},
                    {name: '2017', value: 1795}
                ],
                options: {
                    // title: 'Total sales of stores in recent years'
                },
                settingOpen: false,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'timeline',
                            to: '/timeline',
                            title: '记录'
                        },
                        {
                            type: 'icon',
                            icon: 'settings',
                            click: this.toggleSetting,
                            title: '设置'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.targetWeight = this.$storage.get('target', '')
            let logs = this.$storage.get('logs', [])
            if (!logs.length) {
                return
            }
            let log = logs[logs.length - 1]
            this.createTime = format(new Date(log.createTime), 'yyyy-MM-dd hh:mm')
            let change = '+0'
            if (logs.length > 1) {
                let prevLog = logs[logs.length - 2]
                change = log.weight - prevLog.weight
                if (change > 0) {
                    change = '+' + change
                }
            }
            this.showData = {
                weight: log.weight,
                bmi: log.bmi,
                text: this.getBmiText(log.bmi),
                change: change
            }
        },
        methods: {
            toggleSetting() {
                this.settingOpen = !this.settingOpen
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
            }
        },
        watch: {
            targetWeight() {
                this.$storage.set('target', this.targetWeight)
            }
        },
        components: {
            Schart
        }
    }
</script>

<style lang="scss" scoped>
.empty {
    padding: 80px 0;
    text-align: center;
}
.weight {
    margin-bottom: 16px;
    text-align: center;
    .number {
        font-weight: 100;
        font-size: 100px;
    }
    .unit {
        font-size: 20px;
    }
}
.data-list {
    overflow: hidden;
    .item {
        float: left;
        width: 33.33%;
        text-align: center;
    }
    .title {
        color: #999;
    }
    .number {
        font-size: 24px;
    }
    .unit {
        color: #666;
    }
    .tag {
        background-color: #09c;
        padding: 2px;
        border-radius: 4px;
    }
}
.container {
    width: 320px;
    max-width: 100%;
    margin: 0 auto;
}
.setting-box {
    width: 100%;
    max-width: 320px;
    .body {
        padding: 16px;
    }
}
.create-time {
    position: absolute;
    left: 16px;
    bottom: 16px;
    color: #999;
}
</style>
