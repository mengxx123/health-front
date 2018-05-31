<template>
    <my-page title="预产期计算器" :page="page">
        <div>
            <div>
                <ui-text-field v-model.number="cycle" type="number" label="平均月经周期（天）" hintText=""/>
                <input v-model="luteal" type="hidden" name="luteal" size="3" value="14">
            </div>
            <div>
                <div class="form-group"><label class="control-label col-sm-4">末次月经时间：</label>
                    <div class="col-sm-8">
                        <select name="y" size="1" v-model="y" class="set_select">
                            <option value="2016">2016</option>
                            <option value="2017" selected="">2017</option>
                            <option value="2018">2018</option>
                        </select>

                        年
                        <select name="m" size="1" v-model="m" class="set_select">
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        月
                        <select name="d" size="1" v-model="d" class="set_select">
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                        日
                    </div>
                </div>
            </div>
            <div class="btns">
                <ui-raised-button label="计算预产期" class="btn" primary @click="calc"/>
            </div>
        </div>
        <div class="result" v-if="result">
            <!-- <h4 class="result-title">预产日期自测结果</h4> -->
            <ul class="result-list">
                <!-- <li>大概受孕时间： <span class="strong">{{ result.conception }}</span></li> -->
                <li>预计出生时间： <span class="strong">{{ result.duedate }}</span></li>
                <li>宝宝当前月龄： <span class="strong">{{ result.fetalage }}</span></li>
            </ul>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    function isValidDate(dateStr) {
        var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{4})$/;
        var matchArray = dateStr.match(datePat);
        if (matchArray == null) {
            alert("请输入合法日期");
            return false;
        }
        let day = matchArray[3];
        let month = matchArray[1];
        let year = matchArray[4];

        if (month < 1 || month > 12) {
            alert("月份必须在1-12之间");
            return false;
        }
        if (day < 1 || day > 31) {
            alert("日期必须在1-31之间");
            return false;
        }
        if ((month==4 || month==6 || month==9 || month==11) && day==31) {
            alert("该月没有31天！")
            return false;
        }
        if (month == 2) { // check for february 29th
            var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
            if (day>29 || (day==29 && !isleap)) {
                alert(year + "年二月份没有" + day + " 天!");
                return false;
            }
        }
        return true;
    }

    function dispDate(dateObj) {
        let month = dateObj.getMonth()+1;
        month = (month < 10) ? "0" + month : month;
        let day   = dateObj.getDate();
        day = (day < 10) ? "0" + day : day;
        let year  = dateObj.getYear();
        if (year < 2000) year += 1900;
        return (year +"年"+month + "月" + day + "日" );
    }

    function hidedive(){
        var i;
        for (i=1;i<13;i++){
            document.getElementById("horodiv"+i).style.display="none";
        }
    }

    function IsDigit() {
        return ((event.keyCode >= 48) && (event.keyCode <= 57));
    }

    export default {
        data () {
            return {
                cycle: 28,
                luteal: 14,
                y: 2017,
                m: 1,
                d: 1,
                result: null,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/birth/help',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
        },
        methods: {
            calc() {
                let menstrual = new Date();
                let ovulation = new Date();
                let duedate = new Date();
                let today = new Date();

                var yy = this.y
                var mm = this.m
                var dd = this.d

                var cycle = this.cycle
                var luteal = this.luteal

                if (isValidDate(mm+"/"+dd+"/"+yy)) {
                    let menstrualinput = new Date(mm+"/"+dd+"/"+yy);
                    menstrual.setTime(menstrualinput.getTime())
                }
                else return false;


                if (!this.cycle) {
                    this.$message({
                        type: 'danger',
                        text: '请输入月经周期'
                    })
                    return
                }
                if (this.cycle < 22) {
                    this.$message({
                        type: 'danger',
                        text: '您的月经周期过短，请重新输入'
                    })
                    return
                }
                if (this.cycle > 45) {
                    this.$message({
                        type: 'danger',
                        text: '您的月经周期过长，请重新输入'
                    })
                    return
                }
                if (luteal != "" && (luteal < 9 || luteal > 16)) {
                    alert("您的黄体期过长或过短 \n"
                        + "我们尽量使计算结果正确 \n"
                        + "用您输入的数字进行计算");
                }
                ovulation.setTime(menstrual.getTime() + (cycle*86400000) - (luteal*86400000))

                this.result = {}
                this.result.conception = dispDate(ovulation)
                //$('#conception').val(dispDate(ovulation))

                duedate.setTime(ovulation.getTime() + 266*86400000);

                // $('#duedate').val(dispDate(duedate))
                this.result.duedate = dispDate(duedate)

                var fetalage = 280 - ((duedate - today) / 86400000);
                let weeks = parseInt(fetalage / 7);
                let days = Math.floor(fetalage % 7);
                fetalage = weeks + " 周"  + ", " + days + " 天";

                this.result.fetalage = fetalage
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
