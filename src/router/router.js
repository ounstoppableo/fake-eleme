const home = () => import('../pages/home/home')
const city = () => import('../pages/city/city')
const msite = () => import('../pages/msite/msite')
const search = () => import('../pages/search/search')
const food = () => import('../pages/food/food')
const shop = () => import('../pages/shop/shop')
const login = () => import('../pages/login/login')
const forget = () => import('../pages/forget/forget')
const foodDetail = () => import('../pages/shop/children/foodDetail')
const shopDetail = () => import('../pages/shop/children/shopDetail')
const profile = () => import('../pages/profile/profile')
const info = () => import('../pages/profile/children/info')
const address = () => import('../pages/profile/children/children/address')
const add = () => import('../pages/profile/children/children/children/add')
const addDetail = () => import('../pages/profile/children/children/children/children/addDetail')
const setusername = () => import('../pages/profile/children/children/setusername.vue')
const shopSafe = () => import('../pages/shop/children/children/shopSafe')
const balance = () => import('../pages/balance/balance.vue')
const detail = () => import('../pages/balance/children/detail.vue')
const benefit = () => import('../pages/benefit/benefit.vue')
const hbHistory = () => import('../pages/benefit/children/hbHistory')
const hbDescription = () => import('../pages/benefit/children/hbDescription.vue')
const coupon = () => import('../pages/benefit/children/coupon.vue')
const exchange = () => import('../pages/benefit/children/exchange.vue')
const commend = () => import('../pages/benefit/children/commend.vue')
const points = () => import('../pages/points/points.vue')
const pointsDetail = () => import('../pages/points/children/detail.vue')
const vipcard = () => import('../pages/vipcard/vipcard.vue')
const vipDescription = () => import('../pages/vipcard/children/vipDescription.vue')
const useCart = () => import('../pages/vipcard/children/useCart.vue')
const invoiceRecord = () => import('../pages/vipcard/children/invoiceRecord.vue')
const service = () => import('../pages/service/service.vue')
const questionDetail = () => import('../pages/service/children/questionDetail.vue')
const order = () => import('../pages/order/order.vue')
// import { search } from 'core-js/fn/symbol'
export default [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: home,
        beforeEnter(to, from, next) {
            next()
        }
    },
    {
        path: '/city/:id',
        component: city,
        props: true,
    },
    {
        path: '/msite',
        component: msite,
        keepAlive: true
    },
    {
        path: '/search',
        component: search,
    },
    {
        path: '/food',
        component: food,
        keepAlive: true
    },
    {
        path: '/shop',
        component: shop,
        keepAlive: true,
        children: [
            {
                path: 'foodDetail',
                component: foodDetail,
            },
            {
                path: 'shopDetail',
                component: shopDetail,
                children: [
                    {
                        path: 'shopSafe',
                        component: shopSafe
                    }
                ],
            }
        ],
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/forget',
        component: forget
    },
    {
        path: '/profile',
        component: profile,
        children: [
            {
                path: 'info',
                component: info,
                children: [
                    {
                        path: 'address',
                        component: address,
                        children: [
                            {
                                path: 'add',
                                component: add,
                                children: [
                                    { path: 'addDetail', component: addDetail }
                                ],
                            }
                        ],
                    },
                    {
                        path: 'setusername',
                        component: setusername
                    }
                ],
            }
        ],
    },
    {
        path: '/balance',
        component: balance,
        children: [
            {
                path: 'detail',
                component: detail,
            }
        ]
    },
    {
        path: '/benefit',
        component: benefit,
        children: [
            {
                path: 'hbHistory',
                component: hbHistory
            },
            {
                path: 'hbDescription',
                component: hbDescription
            },
            {
                path: 'coupon',
                component: coupon
            },
            {
                path: 'exchange',
                component: exchange
            },
            {
                path: 'commend',
                component: commend
            }
        ],
    },
    {
        path: '/points',
        component: points,
        children: [
            {
                path: 'detail',
                component: pointsDetail
            }
        ],
    },
    {
        path: '/vipcard',
        component: vipcard,
        children: [
            {
                path: 'vipDescription',
                component: vipDescription
            },
            {
                path: 'useCart',
                component: useCart
            }, {
                path: 'invoiceRecord',
                component: invoiceRecord
            }
        ],
    },
    {
        path: '/service',
        component: service,
        children: [
            {
                path: 'questionDetail',
                component: questionDetail
            }
        ],
    },
    {
        path: '/order',
        component: order,
    }
]
