<template>
    <my-page title="问题疫苗检测">
        <div>
            <ui-text-field v-model="code" label="疫苗批号" hintText="如：201605014-01"/>
        </div>
        <div class="btns">
            <ui-raised-button label="查询" class="btn" primary @click="query"/>
        </div>
        <div class="ui-loading" v-if="loading">
            <ui-circular-progress :size="24"/>
        </div>
        <div class="empty" v-if="result && !result.length">
            <p class="strong">搜索不到数据。</p>
            <p>官方公布数据中未检测到您所查询的疫苗批号。</p>
            <p>可能有以下原因：</p>
            <ul class="list">
                <li class="item">① 疫苗批号输入错误，请再次核验；</li>
                <li class="item">② 该疫苗生产企业未能及时上传信息；</li>
                <li class="item">③ 该疫苗批号日期超出了官方公示：2007年-2018年。</li>
            </ul>
        </div>
        <div v-if="result && result.length">
            <div class="status" v-if="success">该疫苗是 <strong>合法疫苗</strong></div>
            <div class="status" v-else>该疫苗是 <strong>问题疫苗</strong></div>

            <ul class="result-list" v-if="result">
                <li class="item" v-for="item in result">
                    <div class="info">
                        <span class="key">疫苗名称：</span>
                        <span class="value">{{ item.name }}</span>
                    </div>
                    <div class="info" v-if="item.specification">
                        <span class="key">疫苗规格：</span>
                        <span class="value">{{ item.specification }}</span>
                    </div>
                    <div class="info">
                        <span class="key">疫苗批号：</span>
                        <span class="value">{{ item.batchNo }}</span>
                    </div>
                    <div class="info" v-if="item.endTime">
                        <span class="key">有效期至：</span>
                        <span class="value">{{ item.endTime }}</span>
                    </div>
                    <div class="info">
                        <span class="key">生产企业：</span>
                        <span class="value">{{ item.manufacturer }}</span>
                    </div>
                    <div class="info" v-if="success">
                        <span class="key">签发结论：</span>
                        <span class="value">{{ item.result }}</span>
                    </div>
                    <div class="info" v-else>
                        <span class="key">药品异常：</span>
                        <span class="value">该药品已被召回</span>
                    </div>
                </li>
            </ul>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                loading: false,
                code: '',
                // code: '201801005',
                // code: '201605014-01',
                result: null,
                success: true,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/heartRate/help',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
            // this.query()
        },
        methods: {
            reset() {
                this.result = this.age = null
            },
            query() {
                if (!this.code) {
                    this.$message({
                        type: 'danger',
                        text: '请输入疫苗批号'
                    })
                    return
                }
                this.loading = true
                this.result = null
                console.log(this.code)
                this.$http.get(`/medical?code=${this.code}`).then(
                    response => {
                        let data = response.data
                        console.log(data)
                        if (!data.success) {
                            this.result = []
                            this.loading = false
                            return
                        }
                        this.result = data.list
                        if (data.unqualifiedList && data.unqualifiedList.length) {
                            this.result = data.unqualifiedList
                            this.success = false
                        }
                        this.loading = false
                        // for (let item of this.result) {
                        //     if (item.status !== 0) {
                        //         this.success = false
                        //         break
                        //     }
                        // }
                    },
                    response => {
                        this.loading = false
                        console.log(response)
                    })

                // this.result = {
                //     maxRate: Math.round(vzdxl),
                //     rate1: Math.round(vzxbxl),
                //     rate2: Math.round(vtemp)
                // }
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
    .result {
        margin-top: 16px;
        .strong {
            color: #f60;
            font-weight: bold;
        }
    }
    .status {
        margin-bottom: 16px;
        strong {
            font-weight: bold;
        }
    }
    .result-list {
        .item {
            margin-bottom: 16px;
            padding: 16px;
            box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
        }
        .info {
            margin: 4px 0;
        }
        .key {
            font-weight: bold;
        }
        .value {}
    }
    .btns {
        margin-bottom: 16px;
    }
    .empty {
        .list {}
        .item {
            margin-bottom: 8px;
        }
        .strong {
            font-weight: bold;
        }
    }
</style>
