<template>
    <my-page title="最大心率计算器" :page="page">
        <div class="common-container">
            <div>
                <ui-text-field v-model.number="age" label="年龄" hintText=""/>
            </div>
            <div class="btns">
                <ui-raised-button label="查看结果" class="btn" primary @click="showResult"/>
                <ui-raised-button label="我要重做" class="btn" @click="reset" />
            </div>
            <div class="result" v-if="result">
                <ul class="result-list">
                    <li>在 60 秒内，</li>
                    <!--<li>在
                        <select v-model="second">
                            <option value="6">6秒</option>
                            <option selected="selected" value="10">10秒</option>
                            <option value="15">15秒</option>
                            <option value="30">30秒</option>
                            <option value="60">60秒</option>
                        </select>内，
                    </li>-->
                    <li>最大心率： <span class="strong">{{ result.maxRate }}</span> 下；</li>
                    <li>靶心率： <span class="strong">{{ result.rate1 }}</span> 下到 <span class="strong">{{ result.rate2 }}</span> 下之间。</li>
                </ul>
            </div>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                age: null,
                second: 60,
                result: null,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/cf644730583411e9ac3981c0eb0eea3e',
                            target: '_blank',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
        },
        methods: {
            reset() {
                this.result = this.age = null
            },
            showResult() {
                if (!this.age) {
                    this.$message({
                        type: 'danger',
                        text: '请输入年龄'
                    })
                    return
                }
                if (this.age < 1 || this.age > 120) {
                    this.$message({
                        type: 'danger',
                        text: '年龄输入有误，请输入 1-120 之间数值'
                    })
                    return
                }
                let re = /^[1-9]+[0-9]*]*$/
                if (!re.test(this.age)) {
                    this.$message({
                        type: 'danger',
                        text: '年龄输入有误'
                    })
                    return
                }
                var vtemp, xf, vzdxl, vzxbxl, xl;
                //变量负值
                //计数公式
                //        vtest = 0.7 * vheight;
                //        vtest1 = 208 - vtest;
                //        vtemp = 0.75 * vtest1;
                //        vtemp = 0.75 * (208 - 0.7 * vheight);
                vzdxl = 208 - 0.7 * this.age;
                vtemp = 0.75 * vzdxl;
                vzxbxl = 0.5 * vzdxl;

                switch (this.second) {
                    case 6:
                        vzdxl = vzdxl / 10;
                        vtemp = vtemp / 10;
                        vzxbxl = vzxbxl / 10;
                        break;
                    case 10:
                        vzdxl = vzdxl / 6;
                        vtemp = vtemp / 6;
                        vzxbxl = vzxbxl / 6;
                        break;
                    case 15: {
                        vzdxl = vzdxl / 4;
                        vtemp = vtemp / 4;
                        vzxbxl = vzxbxl / 4;
                    }
                        break;
                    case 30: {
                        vzdxl = vzdxl / 2;
                        vtemp = vtemp / 2;
                        vzxbxl = vzxbxl / 2;
                    }
                        break;

                    case 60:
                        break;
                }

                this.result = {
                    maxRate: Math.round(vzdxl),
                    rate1: Math.round(vzxbxl),
                    rate2: Math.round(vtemp)
                }
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
</style>
