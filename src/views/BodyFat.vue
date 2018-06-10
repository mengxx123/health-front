<template>
    <my-page title="体脂率计算器" :page="page">
        <div>
            <form name="bfForm"  id="toolsForm">
                <ul class="list_3">
                    <li class="sex">
                        <span>性别：</span>
                        <label>
                            <input name="sex" checked="checked" type="radio" value="1">
                            男
                        </label>
                        <label>
                            <input name="sex" type="radio" value="2">
                            女
                        </label>
                    </li>
                </ul>
            </form>
            <!-- <div>
                <ui-radio class="demo-radio" v-model="input.sex" label="男" name="group" nativeValue="1"/>
                <ui-radio class="demo-radio" v-model="input.sex" label="女" name="group" nativeValue="2"/>
            </div> -->
            <div>
                <ui-text-field v-model.number="input.age" type="number" label="年龄（岁）" />
            </div>
            <div>
                <ui-text-field v-model.number="input.weight" type="number" label="体重（公斤、KG）" />
            </div>
            <div>
                <ui-text-field v-model.number="input.height" type="number" label="身高（厘米、CM）" />
            </div>
            <div>
                <ui-text-field v-model.number="input.abd" type="number" label="腰围（CM（厘米））" />
                <ui-icon class="icon" value="help" @click="showHelp(1)" />
            </div>
            <div>
                <ui-text-field v-model.number="input.iliac" type="number" label="髂骨（CM（厘米））" />
                <ui-icon class="icon" value="help" @click="showHelp(2)" />
            </div>
            <div>
                <ui-text-field v-model.number="input.hips" type="number" label="臀围（CM（厘米））" />
                <ui-icon class="icon" value="help" @click="showHelp(3)" />
            </div>
        </div>
        <div>
            <!-- <div>
                <ui-text-field v-model.number="height" label="身高（cm）" hintText="如：173"/>
            </div>
            <div>
                <ui-text-field v-model.number="weight" label="体重（kg）" hintText="如：65"/>
            </div> -->
            <div class="btns">
                <ui-raised-button label="计算" class="btn" primary @click="calculate"/>
            </div>
        </div>
        <div class="result" v-if="result">
            <ui-paper class="paper" :zDepth="1">
                <li>体脂率： <span class="strong">{{ result.fbw }}</span></li>
                <li>去脂后的体重：<span class="strong">{{ result.fbw2 }}</span></li>
            </ui-paper>
        </div>
        <ui-drawer class="help-box" right :open="open" :docked="false" @close="toggle()">
            <ui-appbar :title="helpTitle">
                <ui-icon-button icon="close" @click="toggle" slot="left" />
            </ui-appbar>
            <div class="body">
                <div v-if="helpType === 1">
                    <img class="img" src="/static/img/abd.jpg">
                    <div class="text">过肚脐的腰围和胸骨低端到肚脐中间的腰围的平均值</div>
                </div>
                <div v-if="helpType === 2">
                    <img class="img" src="/static/img/iliac.jpg">
                    <div class="text">测量骨盆上部最突出的地方的围度，你可以在两边的腰臀部位摸到它们</div>
                </div>
                <div v-if="helpType === 3">
                    <img class="img" src="/static/img/hips.jpg">
                    <div class="text">最大臀围</div>
                </div>
            </div>
        </ui-drawer>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                height: null,
                weight: null,
                result: null,
                abd: null,
                input: {
                    sex: '1',
                    age: null,
                    weight: null,
                    height: null,
                    abd: null,
                    iliac: null,
                    hips: null
                },
                open: false,
                helpType: 1,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/bodyFat/help',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        computed: {
            helpTitle() {
                if (this.helpType === 1) {
                    return '腰围'
                }
                if (this.helpType === 2) {
                    return '髂骨'
                }
                return '臀围'
            }
        },
        mounted() {
            this.input.age = 24
            this.input.weight = 56
            this.input.height = 173
            this.input.abd = 100
            this.input.iliac = 100
            this.input.hips = 100
            this.init()
        },
        methods: {
            toggle () {
               this.open = !this.open
            },
            showHelp(type) {
                this.helpType = type
                this.open = true
            },
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
                // if (!this.height) {
                //     alert('请输入你的身高')
                //     return
                // }
                var male = document.bfForm.sex[0];
                var female = document.bfForm.sex[1];
                var age = this.input.age

                var initWeight = this.input.weight
                var initHeight = this.input.height
                var initAbd = this.input.abd
                var initIliac = this.input.iliac
                var initHips = this.input.hips

                var weight = Number(initWeight * 2.20462262);
                var height = Number(initHeight / 2.54);
                var abd = Number(initAbd / 2.54);
                var iliac = Number(initIliac / 2.54);
                var hips = Number(initHips / 2.54);

                var y = 495;

                var z = 450;

                if (male.checked) {
                    let sex = "male";
                    var a = 0.57914807 * abd * 2.54;
                    var b = 0.25189114 * hips * 2.54;
                    var c = 0.21366088 * iliac * 2.54;
                    var d = 0.35595404 * weight * .4535923704;
                    var result = a + b + c - d - 47.371817;
                    var perfat = result;
                    var pleanmass = 1 - (perfat / 100);
                }

                if (female.checked) {
                    sex = "female";
                    var a = 0.002824 * abd * 2.54;
                    var b = 0.0000122098 * abd * 2.54 * abd * 2.54;
                    var c = 0.000733128 * hips * 2.54;
                    var d = 0.000510477 * height * 2.54;
                    var e = 0.000216161 * age;
                    var result = 1.168297 - a + b - c + d - e;
                    var perfat = (y / (result)) - z;
                    var pleanmass = 1 - (perfat / 100);
                }

                var remain = perfat % 10;
                var bfint = Math.round(perfat);
                remain = perfat - bfint;
                var suff = Math.round(remain * 10);

                var finbf = bfint + suff / 10;



                var leanmass = pleanmass * weight;



                var lmint = Math.round(leanmass);

                var remain2 = leanmass % 10;

                remain2 = leanmass - lmint;

                var suff2 = Math.round(remain2 * 10);

                var finlm = lmint + suff2 / 10;

                if (true) {

                    var remain = weight % 100;

                    var wint = Math.round(weight);

                    remain = weight - wint;

                    var suff = Math.round(remain * 100);

                    weight = wint + suff / 100;

                }

                if (true) {

                    var remain = height % 100;

                    var hint = Math.round(height);

                    remain = height - hint;

                    var suff = Math.round(remain * 100);

                    height = hint + suff / 100;

                }

                if (true) {

                    var remain = abd % 100;

                    var aint = Math.round(abd);

                    remain = abd - aint;

                    var suff = Math.round(remain * 100);

                    abd = aint + suff / 100;

                }

                if (true) {

                    var remain = iliac % 100;

                    var ilint = Math.round(iliac);

                    remain = iliac - ilint;

                    var suff = Math.round(remain * 100);

                    iliac = ilint + suff / 100;

                }

                if (true) {

                    var remain = hips % 100;

                    var hipint = Math.round(hips);

                    remain = hips - hipint;

                    var suff = Math.round(remain * 100);

                    hips = hipint + suff / 100;

                }



                //validation
                if ((!male.checked) && (!female.checked)) {
                    alert("你必须选择性别");
                    return false;
                }

                if ((age > 100) || (age < 15)) {
                    alert("年龄必须在15-100之间");
                    return false;
                }

                if ((initWeight > 600) || (initWeight < 35)) {
                    alert("体重必须在35-600之间");
                    return false;
                }

                if ((initHeight > 240) || (initHeight < 36)) {
                    alert("身高必须在36-240之间");
                    return false;
                }

                if ((initAbd > 200) || (initAbd < 12)) {
                    alert("腰围必须在12-200之间");
                    return false;
                }

                if ((initIliac > 400) || (initIliac < 12)) {
                    alert("髂骨必须在12-400之间");
                    return false;
                }

                if ((initHips > 400) || (initHips < 12)) {
                    alert("臀围必须在12-400之间");
                    return false;
                }
                this.result = {
                    fbw: finbf.toFixed(1) + "%",
                    fbw2: (finlm / 2.20462262).toFixed(1) + "公斤"
                }
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
.icon {
    color: #999;
    cursor: pointer;
}
.help-box {
    width: 100%;
    max-width: 400px;
    .body {
        position: absolute;
        top: 64px;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 24px;
        overflow: hidden;
    }
    .img {
        display: block;
        margin: 0 auto;
        margin-bottom: 16px;
        max-width: 300px;
        border: 1px solid #eee;
    }
}
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
