<template>
    <my-page title="BMI 身体质量指数" :page="page">
        <div class="common-container">
            <div>
                <div>
                    <ui-text-field v-model.number="height" label="身高（cm）" hintText="如：173"/>
                </div>
                <div>
                    <ui-text-field v-model.number="weight" label="体重（kg）" hintText="如：65"/>
                </div>
                <div class="btns">
                    <ui-raised-button label="计算" class="btn" primary @click="calculate"/>
                    <ui-raised-button label="记录" class="btn" secondary @click="save" v-if="result"/>
                </div>
            </div>
            <div class="result" v-if="result">
                <ui-paper class="paper" :zDepth="1">
                    <h4 class="title">计算结果</h4>
                    <li>你的 BMI 值: <span class="strong">{{ result.bmi }}</span></li>
                    <li>身体状态：<span class="strong">{{ result.state }}</span></li>
                    <li>你的理想体重为：<span class="strong">{{ result.weight }}kg</span></li>
                </ui-paper>
                <ui-article>
                    <p><strong>参考：</strong></p>
                    <table>
                        <tr style="background-color: #8DD8F8">
                            <th>BMI 范围</th>
                            <th>体质</th>
                        </tr>
                        <tr style="background-color: #ccc">
                            <td>≤ 18.4</td>
                            <td>偏瘦</td>
                        </tr>
                        <tr style="background-color: #66cc00">
                            <td>18.5 ～ 23.9</td>
                            <td>正常</td>
                        </tr>
                        <tr style="background-color: #ffff00">
                            <td>24.0 ～ 27.9</td>
                            <td>过重</td>
                        </tr>
                        <tr style="background-color: #ff9900">
                            <td>≥ 28</td>
                            <td>肥胖</td>
                        </tr>
                    </table>
                </ui-article>
            </div>
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                height: null,
                weight: null,
                result: null,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/help',
                            title: '帮助'
                        },
                        {
                            type: 'icon',
                            icon: 'info',
                            href: 'https://project.yunser.com/products/9798ff80fbe111e8a644d75e0db84a23',
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
        methods: {
            init() {
                this.height = this.$route.query.height
                this.weight = this.$route.query.weight
                if (this.height && this.weight) {
                    this.calculate()
                }
                if (this.$storage.get('height')) {
                    this.height = this.$storage.get('height')
                }
                if (this.$storage.get('weight')) {
                    this.weight = this.$storage.get('weight')
                }
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
</style>
