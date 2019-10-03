<template>
    <my-page title="健康" :page="page">
        <div class="common-container">
            <app-list :data="groups" />
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                groups: [
                    {
                        name: '工具',
                        apps: [
                            {
                                name: 'BMI',
                                desc: '',
                                icon: '/static/img/health_bmi.svg',
                                to: '/bmi'
                            },
                            {
                                name: '喝水',
                                desc: '',
                                icon: '/static/img/health_blood.svg',
                                to: '/water'
                            },
                            {
                                name: '体重记录',
                                desc: '',
                                icon: '/static/img/health_bmi.svg',
                                to: '/weight'
                            },
                            {
                                name: '最大心率计算器',
                                desc: '',
                                icon: '/static/img/health_heart.svg',
                                to: '/heartRate'
                            },
                            {
                                name: '体脂率计算器',
                                desc: '',
                                icon: '/static/img/health_blood.svg',
                                to: '/bodyFat'
                            },
                            {
                                name: '色盲测试',
                                desc: '色盲色弱测试',
                                icon: '/static/img/health_blind.svg',
                                to: 'xxx',
                                href: 'https://util.yunser.com/blind',
                                target: '_blank'
                            },
                            {
                                name: '运动计时',
                                desc: '',
                                icon: 'https://icons.yunser.com/icons/tool.svg',
                                to: '/timer'
                            }
                        ]
                    },
                    {
                        name: '女性',
                        apps: [
                            {
                                name: '标准三围计算器',
                                desc: '',
                                icon: '/static/img/health_bwh.svg',
                                to: '/bwh'
                            },
                            {
                                name: '预产期计算器',
                                desc: '',
                                icon: '/static/img/health_pregnant_calculator.svg',
                                to: '/birth'
                            },
                            {
                                name: '安全期计算器',
                                desc: '',
                                icon: '/static/img/health_safe_period.svg',
                                to: 'xxx',
                                href: 'https://demo2.yunser.com/safe_period/',
                                target: '_blank'
                            }
                        ]
                    },
                    {
                        name: '疫苗',
                        apps: [
                            {
                                name: '问题疫苗检测',
                                desc: '',
                                icon: '/static/img/health_medical.svg',
                                to: '/medical_check'
                            },
                            {
                                name: '疫苗接种时间',
                                desc: '',
                                icon: '/static/img/health_medical.svg',
                                to: '/medical_table'
                            }
                        ]
                    }
                ],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'search',
                            href: 'https://search.yunser.com?utm_source=health',
                            target: '_blank',
                            title: '搜索'
                        },
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com?utm_source=health',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        },
        computed: {
        },
        mounted() {
        },
        methods: {
            init() {
            },
            fileChange(e) {
            },
            sizeStr: function (size) {
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../scss/var';

.tool-list {
    max-width: 840px;
    margin: 0 auto;
    @include clearfix;
    .list-item {
        position: relative;
        float: left;
        width: 260px;
        height: 96px;
        padding: 8px;
        margin: 2px 16px 16px 2px;
        background-color: #fff;
        //border: 1px solid #ccc;
        &:hover {
            background-color: #f9f9f9;
            // box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
            //border-color: #09c;
            .icon {
                display: block;
            }
        }
        &.active {
            border: 1px solid #f00;
        }
    }
    a {
        display: block;
        height: 100%;
        color: #666;
    }
    .img {
        float: left;
        width: 72px;
        height: 72px;
        margin-right: 16px;
        background-color: #fff;
        border: 1px solid #e9e9e9;
        border-radius: 8px;
    }
    .info {
        float: left;
    }
    .text {
        font-size: 18px;
        color: #000;
    }
    .header {
        overflow: hidden;
    }
    .desc {
        max-width: 150px;
        margin-top: 8px;
    }
    .icon-heart {
        display: none;
        position: absolute;
        top: 8px;
        right: 8px;
        &:hover {
            color: #f00;
        }
    }
    .icon-close {
        display: none;
        position: absolute;
        top: 32px;
        right: 8px;
        &:hover {
            color: #f00;
        }
    }
}
@media all and (max-width: 400px){
    .tool-list {
        .list-item {
            width: 100%;
            margin-right: 0;
        }
    }
}
</style>
