import axios from 'axios'
//获取定位城市信息
export const guessCity = () => axios({
    url: 'https://elm.cangdu.org/v1/cities?type=guess',
    method: 'get',
})
//获取所选城市信息
export const checkedCity = (id) => axios({
    url: `https://elm.cangdu.org/v1/cities/${id}`,
    method: 'get',
})
//搜索地区
export const searchPlace = (id, keyword) => axios({
    url: `https://elm.cangdu.org/v1/pois?city_id=${id}&keyword=${keyword}&type=search`,
    method: 'get',
})
//获取热门城市
export const hotCity = () => axios({
    url: 'https://elm.cangdu.org/v1/cities?type=hot',
    method: 'get',
})
//获取所有城市
export const allCity = () => axios({
    url: 'https://elm.cangdu.org/v1/cities?type=group',
    method: 'get',
})
//获取商品分类列表
export const getShopList = () => axios({
    url: 'https://elm.cangdu.org/v2/index_entry',
    method: 'get',
})
//获取详细定位
export const detiPosi = (geohash) => axios({
    url: `https://elm.cangdu.org/v2/pois/${geohash}`,
    method: 'get'
})
//搜索商铺
export const searchShop = (geohash, keyword) => axios({
    url: `https://elm.cangdu.org/v4/restaurants?geohash=${geohash}&keyword=${keyword}`,
    method: 'get',
})
//获取附近商铺
export const getNearbyShop = (latitude, longitude) => axios({
    url: `https://elm.cangdu.org/shopping/restaurants?latitude=${latitude}&longitude=${longitude}`,
    method: 'get'
})
//获取商铺分类列表
export const getCategory = () => axios({
    url: 'https://elm.cangdu.org/shopping/v2/restaurant/category',
    method: 'get'
})
//获取配送方式
export const getDeliverMode = () => axios({
    url: 'https://elm.cangdu.org/shopping/v1/restaurants/delivery_modes',
    method: 'get'
})
//获取商家属性列表
export const getAttri = () => axios({
    url: 'https://elm.cangdu.org/shopping/v1/restaurants/activity_attributes',
    method: 'get'
})
//获取商铺详情
export const getShopDetail = (id) => axios({
    url: `https://elm.cangdu.org/shopping/restaurant/${id}`,
    method: 'get'
})
//获取商铺的食品列表
export const getFoods = (id) => axios({
    url: `https://elm.cangdu.org/shopping/v2/menu?restaurant_id=${id}`,
    method: 'get',
})
//购物车列表
export const postCarList = (data) => axios({
    url: 'https://elm.cangdu.org/v1/carts/checkout',
    method: 'post',
    data
})
//获取评价分数
export const getScores = (shopId) => axios({
    url: `https://elm.cangdu.org/ugc/v2/restaurants/${shopId}/ratings/scores`,
    method: 'get',
})
//获取评价信息
export const getRatings = (shopId, index) => axios({
    url: `https://elm.cangdu.org/ugc/v2/restaurants/${shopId}/ratings?has_content=true&offset=${index * 10}&limit=10`,
    method: 'get',
})
//获取评价分类
export const getRatingTags = (shopId) => axios({
    url: `https://elm.cangdu.org/ugc/v2/restaurants/${shopId}/ratings/tags`,
    method: 'get',
})
//获取验证码
export const getCaptcha = () => axios({
    url: `https://elm.cangdu.org/v1/captchas`,
    data: {},
    method: 'post',
    withCredentials: true,
})
//登录
export const login = (username, password, captcha_code) => axios({
    url: 'https://elm.cangdu.org/v2/login',
    method: 'post',
    withCredentials: true,
    data: {
        username,
        password,
        captcha_code,
    }
})
//修改密码
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code,) => axios({
    url: 'https://elm.cangdu.org/v2/changepassword',
    method: 'post',
    withCredentials: true,
    data: {
        username,
        oldpassWord,
        newpassword,
        confirmpassword,
        captcha_code,
    },
})
//上传头像
export const uploadImg = () => axios({
    url: `https://cangdu.org/eus/v1/avatar`,
    method: 'post',
})
//获取收获地址列表
export const getAddress = (id) => axios({
    url: `https://elm.cangdu.org/v1/users/${id}/addresses`,
    method: 'get'
})
//增加收获地址
export const addAddress = (id, address, address_detail, geohash, name, phone, tag, sex, phone_bk, tag_type) => axios({
    url: `https://elm.cangdu.org/v1/users/${id}/addresses`,
    method: 'post',
    data: {
        id, address, address_detail, geohash, name, phone, tag, sex, phone_bk, tag_type
    }
})
//删除地址
export const delAddress = (user_id, address_id) => axios({
    url: `https://elm.cangdu.org/v1/users/${user_id}/addresses/${address_id}`,
    method: 'delete'
})
//可用红包
export const getHongbao = (user_id) => axios({
    url: `https://elm.cangdu.org/promotion/v2/users/${user_id}/hongbaos?limit=20&offset=0`,
    method: 'get'
})
//过期红包
export const getGuoqi = (user_id) => axios({
    url: `https://elm.cangdu.org/promotion/v2/users/${user_id}/expired_hongbaos?limit=20&offset=0`,
    method: 'get'
})
//兑换红包
export const exChangeHongbao = (user_id,
    exchange_code,
    captcha_code,) => axios({
        url: `https://elm.cangdu.org/v1/users/:user_id/hongbao/exchange`,
        method: 'post',
        data: {
            user_id,
            exchange_code,
            captcha_code,
        }
    })
export const getService = ()=>axios({
    url: 'https://elm.cangdu.org/v3/profile/explain',
    method: 'get'
})
export const getOrder = (user_id)=>axios({
    url: `https://elm.cangdu.org/bos/v2/users/${user_id}/orders?limit=10&offset=0`,
    method: 'get'
})