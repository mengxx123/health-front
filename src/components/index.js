import page from './page'
import formItem from './formItem'
import appList from './app-list'

export default {
    install: function (Vue) {
        Vue.component('my-page', page)
        Vue.component('my-form-item', formItem)
        Vue.component('app-list', appList)
    }
}
