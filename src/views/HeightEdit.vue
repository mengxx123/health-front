<template>
    <my-page title="添加身高" :page="page" backable>
        <div class="common-container">
            <div>
                <ui-text-field v-model.number="height" label="身高" hintText=""/>
            </div>
            <div class="btns">
                <ui-raised-button label="添加" class="btn" primary @click="save2"/>
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
                second: 60,
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
        },
        methods: {
            reset() {
                this.result = this.age = null
            },
            save2() {
                if (!this.height) {
                    this.$message({
                        type: 'danger',
                        text: '请输入身高'
                    })
                    return
                }

                this.$http.post(`/heights`, {
                    height: this.height
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

            },
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
