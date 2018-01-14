<template>
    <my-page title="帮助">
        <ui-article class="article">
            <h2>工具介绍</h2>
            <p>本工具用于计算 BMI 值。</p>
            <p>注：1 公斤（KG）= 2 斤。</p>

            <h2>BMI 介绍</h2>
            <p>BMI（Body Mass Index）即身体质量指数, 亦称克托莱指数、体质指数、体重指数, 是目前国际上常用的衡量人体胖瘦程度以及是否健康的一个标准。</p>
            <p>体重指数与健康的关系，各国和各地区有所差别，在中国大陆，以《中国成人超重和肥胖症预防控制指南》认定的数据为标准：</p>

            <h2>BMI 的计算方法</h2>
            <p><strong>BMI 值计算公式: &nbsp;&nbsp;&nbsp;</strong>BMI = 体重(千克) / 身高<sup>2</sup>(米<sup>2</sup>)</p>
            <p><span class="01">例如：一个 52 公斤的人，身高是 155 厘米，则 BMI 为 :</span></p>
            <p style="color: #00f">52(公斤) / 1.55<sup>2</sup>( 公尺<sup>2 </sup>) = 21.6</p>


            <p><strong>BMI 中国标准：</strong></p>
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

            <p><strong>BMI 国际标准：</strong></p>
            <table class="table table-bordered">
                <tr style="background-color: #8DD8F8">
                    <th>BMI 范围</th>
                    <th>体质</th>
                </tr>
                <tr style="background-color: #ddd">
                    <td>≤ 16.4</td>
                    <td>极瘦</td>
                </tr>
                <tr style="background-color: #ccc">
                    <td>16.5 ~ 18.4</td>
                    <td>偏瘦</td>
                </tr>
                <tr style="background-color: #66cc00">
                    <td>18.5 ~ 24.9</td>
                    <td>正常</td>
                </tr>
                <tr style="background-color: #FFFF00">
                    <td>25.0 ~ 29.9</td>
                    <td>过重</td>
                </tr>
                <tr style="background-color: #ffcc00">
                    <td>30.0 ~ 34.9</td>
                    <td>1 类肥胖</td>
                </tr>
                <tr style="background-color: #ff9900">
                    <td>35.0 ~ 39.0</td>
                    <td>2 类肥胖</td>
                </tr>
                <tr style="background-color: #ff6600">
                    <td>≥ 40.0</td>
                    <td>3 类肥胖</td>
                </tr>
            </table>

            <p>研究显示，当BMI值超过 25 时，每增长 5 个单位，死亡率就会上升 29%。</p>
            <p>BMI因为易于测试，而成为最为常用的肥胖统计标准，但它也存在一定的局限性，比如有些人体重很重，但身材健美，肌肉很多，并没有多余的脂肪，他们的BMI值会超出正常水平而显示为超重或肥胖，但他们却可能比许多BMI值较低的人更为健康。</p>
            <p>因此，如果你觉得你超重是因为经常锻炼，而不是脂肪超标，你可以采用体脂肪率的方法测试。</p>
        </ui-article>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                version: ''
            }
        },
        mounted() {
            this.$http.get('/version').then(
                response => {
                    let data = response.data
                    if (data.code === 200) {
                        console.log(data)
                        this.version = data.data
                    }
                },
                response => {
                    console.log(response)
                })
//            this.$http.post('/example', this.$qs.stringify({
//                param1: 'value1',
//                param2: 'value2'
//            })).then(
//                response => {
//                    let data = response.data
//                    if (data.code === 200) {
//                        console.log(data.data)
//                    }
//                },
//                response => {
//                    console.log(response)
//                })
        }
    }
</script>

<style scoped>
    .article {
        max-width: 900px;
    }
</style>
