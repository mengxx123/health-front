<template>
    <my-page title="添加跑步记录" :page="page" backable>
        <div class="common-container">
            <div>
                <ui-text-field v-model.number="distance" label="距离" hintText=""/>
            </div>
            <div>
                <ui-text-field v-model.number="minute" type="number" label="分钟" hintText=""/>
            </div>
            <div>
                <ui-text-field v-model.number="second" type="number" label="秒" hintText=""/>
            </div>
            <div class="btns">
                <ui-raised-button label="添加" class="btn" primary @click="save3"/>
            </div>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                height: null,
                weight: null,
                minute: null,
                second: null,
                result: null,
                page: {
                    menu: [
                        // {
                        //     type: 'icon',
                        //     icon: 'help',
                        //     href: 'https://project.yunser.com/products/cf644730583411e9ac3981c0eb0eea3e',
                        //     target: '_blank',
                        //     title: '帮助'
                        // }
                    ]
                }
            }
        },
        mounted() {
            let time = this.$route.query.time
            console.log('time', time)
            time = time / 1000
            this.minute = Math.floor(time / 60)
            this.second = Math.ceil(time % 60)
        },
        methods: {
            reset() {
                this.result = this.age = null
            },
            save3() {
                if (!this.distance) {
                    this.$message({
                        type: 'danger',
                        text: '请输入距离'
                    })
                    return
                }
                if (!this.minute) {
                    this.$message({
                        type: 'danger',
                        text: '请输入分钟'
                    })
                    return
                }
                if (!this.second) {
                    this.second = 0
                }

                this.$http.post(`/running/logs`, {
                    distance: this.distance,
                    time: this.minute * 60 + (this.second || 60)
                }).then(
                    response => {
                        let data = response.data
                        console.log('latest2', data)
                        this.$message({
                            type: 'success',
                            text: '添加成功'
                        })
                        this.$router.go(-1)
                    },
                    response => {
                        console.log('cuol')
                        this.loading = false
                    })

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
