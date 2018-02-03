<template>
    <my-page title="BMI 身体质量指数">
        <div>
            <div>
                <ui-text-field v-model.number="height" label="身高（cm）" hintText="如：173"/>
            </div>
            <div>
                <ui-text-field v-model.number="weight" label="体重（kg）" hintText="如：65"/>
            </div>
            <ui-raised-button label="计算" class="demo-raised-button" primary @click="calculate"/>
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
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                height: '',
                weight: '',
                result: null
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                if (this.$storage.get('height')) {
                    this.height = this.$storage.get('height')
                }
                if (this.$storage.get('weight')) {
                    this.weight = this.$storage.get('weight')
                }
            },
            calculate: function () {
                if (!this.height) {
                    alert('请输入你的身高')
                    return
                }
                if (this.height < 100 || this.height > 200) {
                    alert('请输入正确的身高')
                    return
                }
                if (!this.weight) {
                    alert('请输入你的体重')
                    return
                }
                if (this.weight < 20 || this.weight > 100) {
                    alert('请输入正确的体重')
                    return
                }

                this.$storage.set('height', this.height)
                this.$storage.set('weight', this.weight)

                var height = this.height / 100

                this.result = {}
                this.result.bmi = (this.weight / (height * height)).toFixed(1)

                if (this.result.bmi <= 18.4) {
                    this.result.state = '偏瘦'
                } else if (this.bmi < 24) {
                    this.result.state = '正常'
                } else if (this.bmi < 28) {
                    this.result.state = '过重'
                } else {
                    this.result.state = '肥胖'
                }

                this.result.weight = ((23.9 + 18.5) / 2 * (height * height)).toFixed(1)
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
    .input-box {
    }
    .input-box .tip {
        margin-bottom: 16px;
        color: #999;
    }
    .input-box textarea {
        margin-bottom: 16px;
    }
    .input-box .result {
        margin-top: 16px;
    }
    .table {
        width: 240px;
    }
    .tool-box .result {}
    .tool-box .result .result-title {
        margin: 8px 0;
        font-weight: bold;
    }
    .tool-box .result-list .strong {
        color: #f60;
        font-weight: bold;
    }
</style>
