import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Bmi = resolve => require(['@/views/Bmi'], resolve)
const Help = resolve => require(['@/views/Help'], resolve)

const Height = resolve => require(['@/views/Height'], resolve)
const HeightEdit = resolve => require(['@/views/HeightEdit'], resolve)

const Weight2 = resolve => require(['@/views/Weight2'], resolve)
const Weight = resolve => require(['@/views/Weight'], resolve)

const WeightEdit = resolve => require(['@/views/WeightEdit'], resolve)
const Timeline = resolve => require(['@/views/Timeline'], resolve)
const HeartRate = resolve => require(['@/views/HeartRate'], resolve)

const Birth = resolve => require(['@/views/Birth'], resolve)
const BirthHelp = resolve => require(['@/views/BirthHelp'], resolve)

const Bwh = resolve => require(['@/views/Bwh'], resolve)
const BwhHelp = resolve => require(['@/views/BwhHelp'], resolve)

const BodyFat = resolve => require(['@/views/BodyFat'], resolve)
const BodyFatHelp = resolve => require(['@/views/BodyFatHelp'], resolve)
const MedicalCheck = resolve => require(['@/views/MedicalCheck'], resolve)

const Running = resolve => require(['@/views/Running'], resolve)
const RunningEdit = resolve => require(['@/views/RunningEdit'], resolve)

const Walk = resolve => require(['@/views/Walk'], resolve)
const WalkEdit = resolve => require(['@/views/WalkEdit'], resolve)

const Cycle = resolve => require(['@/views/Cycle'], resolve)
const CycleEdit = resolve => require(['@/views/CycleEdit'], resolve)

const PushUp = resolve => require(['@/views/PushUp'], resolve)
const PushUpEdit = resolve => require(['@/views/PushUpEdit'], resolve)

const SitUp = resolve => require(['@/views/SitUp'], resolve)
const SitUpEdit = resolve => require(['@/views/SitUpEdit'], resolve)

const MedicalTable = resolve => require(['@/views/MedicalTable'], resolve)
const Me = resolve => require(['@/views/Me'], resolve)
const Sport = resolve => require(['@/views/Sport'], resolve)

const Error404 = resolve => require(['@/views/error/Error404'], resolve)
const OauthCallback = resolve => require(['@/views/oauth/Callback'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/bmi',
        component: Bmi
    },

    {
        path: '/running',
        component: Running
    },
    {
        path: '/running/add',
        component: RunningEdit
    },

    {
        path: '/cycle',
        component: Cycle
    },
    {
        path: '/cycle/add',
        component: CycleEdit
    },

    {
        path: '/walk',
        component: Walk
    },
    {
        path: '/walk/add',
        component: WalkEdit
    },

    {
        path: '/pushUp',
        component: PushUp
    },
    {
        path: '/pushUp/add',
        component: PushUpEdit
    },

    {
        path: '/sitUp',
        component: SitUp
    },
    {
        path: '/sitUp/add',
        component: SitUpEdit
    },

    //
    {
        path: '/height',
        component: Height
    },
    {
        path: '/height/add',
        component: HeightEdit
    },

    {
        path: '/weight2',
        component: Weight2
    },
    {
        path: '/help',
        component: Help
    },
    {
        path: '/weight',
        component: Weight
    },
    {
        path: '/weight/add',
        component: WeightEdit
    },
    {
        path: '/heartRate',
        component: HeartRate
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
        path: '/bodyFat',
        component: BodyFat
    },
    {
        path: '/bodyFat/help',
        component: BodyFatHelp
    },
    {
        path: '/medical_check',
        component: MedicalCheck
    },
    {
        path: '/medical_table',
        component: MedicalTable
    },
    {
        path: '/me',
        component: Me
    },
    {
        path: '/sport',
        component: Sport
    },
    {
        path: '/404',
        component: Error404
    },
    {
        path: '/oauth/callback',
        component: OauthCallback
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
