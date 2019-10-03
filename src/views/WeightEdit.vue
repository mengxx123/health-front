<template>
    <my-page title="编辑体重记录" :page="page" backable>
        <div class="common-container">
            <div v-if="weight">
                <div>
                    <ui-text-field v-model.number="weight.weight" type="number" label="体重" hintText=""/>
                    <ui-select-field class="unit" v-model="unit" label="">
                        <ui-menu-item value="kg" title="公斤"/>
                        <ui-menu-item value="jin" title="斤"/>
                    </ui-select-field>
                </div>

                <div>
                    <ui-text-field v-model="weight.note" label="备注" hintText=""/>
                </div>

                <div class="btns">
                    <ui-raised-button label="保存" class="btn" primary @click="save"/>
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
                unit: 'kg',
                weight: null,
                // height: null,
                // weight: null,
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
            this.objectId = this.$route.params.id
            if (this.objectId) {
                this.$http.get(`/weights/${this.objectId}`).then(
                    response => {
                        let data = response.data
                        console.log('latest2', data)
                        this.weight = data
                        // this.$message({
                        //     type: 'success',
                        //     text: '添加成功'
                        // })
                        // this.$router.go(-1)
                    },
                    response => {
                        console.log('cuol')
                        this.loading = false
                    })
            } else {
                this.weight = {
                    weight: null,
                    note: ''
                }
            }
        },
        methods: {
            reset() {
                this.result = this.age = null
            },
            save() {
                if (!this.weight.weight) {
                    this.$message({
                        type: 'danger',
                        text: '请输入体重'
                    })
                    return
                }
                let weight = this.weight.weight
                if (this.unit === 'jin') {
                    weight = (weight / 2).toFixed(2)
                }

                if (this.objectId) {
                    this.$http.put(`/weights/${this.objectId}`, {
                        ...this.weight,
                        weight
                    }).then(
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
                    this.$http.post(`/weights`, {
                        ...this.weight,
                        weight
                    }).then(
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
    .unit {
        position: relative;
        top: 10px;
        // margin-bottom: 0;
        width: 80px;
    }
</style>
