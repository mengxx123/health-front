<template>
    <my-page title="编辑喝水记录" :page="page" backable>
        <div class="common-container">
            <div v-if="myObject">
                <div>
                    <ui-text-field v-model.number="myObject.number" type="number" label="容量" hintText=""/>
                </div>
                <div>
                    <ui-text-field v-model="myObject.note" label="备注" hintText=""/>
                </div>
                <div class="btns">
                    <ui-raised-button label="保存" class="btn" primary @click="save2"/>
                </div>
            </div>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                myObject: {
                    number: null,
                    note: '',
                },
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
            this.objectId = this.$route.params.id
            if (this.objectId) {
                this.$http.get(`/water/logs/${this.objectId}`, this.myObject).then(
                    response => {
                        let data = response.data
                        console.log('latest2', data)
                        this.myObject = data
                    },
                    response => {
                        console.log('cuol')
                        this.loading = false
                    })

            }
        },
        methods: {
            reset() {
                this.result = this.age = null
            },
            save2() {
                if (!this.myObject.number) {
                    this.$message({
                        type: 'danger',
                        text: '请输入容量'
                    })
                    return
                }
                if (this.objectId) {
                    this.$http.put(`/water/logs/${this.objectId}`, this.myObject).then(
                    response => {
                        let data = response.data
                        console.log('latest2', data)
                        this.$message({
                            type: 'success',
                            text: '保存成功'
                        })
                        this.$router.go(-1)
                    },
                    response => {
                        console.log('cuol')
                        this.loading = false
                    })
                } else {
                    this.$http.post(`/water/logs`, this.myObject).then(
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
