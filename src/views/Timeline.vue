<template>
    <my-page title="记录" backable>
        <ui-article>
            <div class="empty" v-if="!logs.length">暂无记录</div>
            <table>
                <tr>
                    <td>体重</td>
                    <td>记录时间</td>
                </tr>
                <tr v-for="log in logs">
                    <td>{{ log.weight }}</td>
                    <td>{{ log.createTime | time }}</td>
                </tr>
            </table>
        </ui-article>
    </my-page>
</template>

<script>
    import {format} from '../util/time'

    export default {
        data () {
            return {
                logs: []
            }
        },
        filters: {
            time(value) {
                return format(new Date(value), 'yyyy-MM-dd hh:mm')
            }
        },
        mounted() {
            this.logs = this.$storage.get('logs', [])
        }
    }
</script>

<style scoped>
.empty {
    padding: 80px 0;
    text-align: center;
}
</style>
