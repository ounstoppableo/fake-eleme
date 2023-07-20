import lodash from 'lodash'
export default {
    //设置geohash
    setGeohash(state, value) {
        state.geohash = value
    },
    //设置用户信息
    SET_USER_INFO(state, value) {
        state.userInfo = value
        window.localStorage.setItem('userInfo', JSON.stringify(value))
    },
    //删除用户信息
    DEL_USER_INFO(state) {
        state.userInfo = null
        window.localStorage.setItem('userInfo', JSON.stringify(null))
    },
    //选择地址
    CHOOSE_ADDRESS(state,value){
        state.choosedAddress = value
    }
}