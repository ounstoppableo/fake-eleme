export default {
    // 当前位置纬度
    latitude(state){
        return state.geohash.split(',')[0]
    },
    // 当前位置经度
    longitude(state){
        return state.geohash.split(',')[1]
    } 
}