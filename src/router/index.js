import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Help = resolve => require(['@/views/Help'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Weight = resolve => require(['@/views/Weight'], resolve)
const Timeline = resolve => require(['@/views/Timeline'], resolve)
const HeartRate = resolve => require(['@/views/HeartRate'], resolve)
const HeartRateHelp = resolve => require(['@/views/HeartRateHelp'], resolve)
const Birth = resolve => require(['@/views/Birth'], resolve)
const BirthHelp = resolve => require(['@/views/BirthHelp'], resolve)
const Bwh = resolve => require(['@/views/Bwh'], resolve)
const BwhHelp = resolve => require(['@/views/BwhHelp'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/help',
        component: Help
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/weight',
        component: Weight
    },
    {
        path: '/heartRate',
        component: HeartRate
    },
    {
        path: '/heartRate/help',
        component: HeartRateHelp
    },
    {
        path: '/birth',
        component: Birth
    },
    {
        path: '/birth/help',
        component: BirthHelp
    },
    {
        path: '/timeline',
        component: Timeline
    },
    {
        path: '/bwh',
        component: Bwh
    },
    {
        path: '/bwh/help',
        component: BwhHelp
    },
    {
        path: '/404',
        component: Error404
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
