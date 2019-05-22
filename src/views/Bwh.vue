<template>
    <my-page title="标准三围计算器" :page="page">
        <div class="common-container">
            <ui-text-field v-model.number="height" type="number" label="身高（cm）" />
            <div class="btns">
                <ui-raised-button label="计算" class="btn" primary @click="calculate"/>
            </div>
            <div class="result" v-if="result">
                <ul class="result-list">
                    <li>你的标准胸围是：<span class="strong">{{ result.bust }}</span> 厘米</li>
                    <li>你的标准腰围是：<span class="strong">{{ result.waist }}</span> 厘米</li>
                    <li>你的标准臀围是：<span class="strong">{{ result.hips }}</span> 厘米</li>
                </ul>
            </div>
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                height: null,
                result: null,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/bwh/help',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
            let height = this.$route.query.height
            if (height) {
                this.height = parseInt(height)
                this.calculate()
            }
        },
        methods: {
            calculate() {
                if (!/^\d{2,3}$/.test(this.height)) {
                    this.$message({
                        type: 'danger',
                        text: '请输入正确的身高（单位：厘米）'
                    })
                    return false
                }

                this.result = {
                    bust: Math.round(this.height * 0.535),
                    waist: Math.round(this.height * 0.365),
                    hips: Math.round(this.height * 0.565)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .btns {
        margin-top: 16px;
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
