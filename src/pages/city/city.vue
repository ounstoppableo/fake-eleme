<template>
  <div class="city_container">
    <head-top :head-title="cityname" go-back="true">
      <router-link to="/home" slot="changecity" class="change_city"
        >切换城市</router-link
      >
    </head-top>
    <form class="city_form" v-on:submit.prevent>
      <div>
        <input
          type="search"
          name="city"
          placeholder="输入学校、商务楼、地址"
          class="city_input input_style"
          required
          v-model="inputVaule"
        />
      </div>
      <div>
        <input
          type="submit"
          name="submit"
          class="city_submit input_style"
          @click="postpois"
          value="提交"
        />
      </div>
    </form>
    <header v-if="historytitle" class="pois_search_history">搜索历史</header>
    <ul class="getpois_ul">
      <li v-for="(item, index) in placelist" @click="nextpage(item.geohash)" :key="index">
        <h4 class="pois_name ellipsis">{{ item.name }}</h4>
        <p class="pois_address ellipsis">{{ item.address }}</p>
      </li>
    </ul>
    <footer
      v-if="historytitle && placelist.length"
      class="clear_all_history"
      @click="clearAll"
    >
      清空所有
    </footer>
    <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
  </div>
</template>
<script>
import { set } from "vue";
import headTop from "@/components/header/head.vue";
import { checkedCity, searchPlace } from "@/service/getData";
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      inputVaule: "", // 搜索地址
      cityid: "", // 当前城市id
      cityname: "", // 当前城市名字
      placelist: [], //搜索结果
      placeHistory: [], // 历史搜索记录
      historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
      placeNone: false, // 搜索无结果，显示提示信息
    };
  },
  components: {
    headTop,
  },
  props: ["id"],
  mounted() {
    checkedCity(this.id).then((res) => {
      this.cityname = res.data.name;
      this.cityid = this.id;
    });
    this.initData();
  },
  methods: {
    ...mapMutations(['setGeohash']),
    initData() {
      //如果本地存储有搜索记录
      if (window.localStorage.getItem("placeHistory")) {
        this.placelist = JSON.parse(
          window.localStorage.getItem("placeHistory")
        );
      }
    },
    //提交后发生的事
    postpois() {
      const id = this.cityid;
      const keyword = this.inputVaule;
      //进入搜索
      if (!keyword.trim()) return;
      checkedCity(id).then((res) => {
        const place = {
          geohash: res.data.latitude + "," + res.data.longitude,
        };
        this.historytitle = false;
        this.placelist.push = place;
        this.placeNone = false
        //搜索完后的本地存储处理
        if (this.placeHistory.indexOf(this.inputVaule) === -1)
          this.placeHistory.push(place);
        window.localStorage.setItem(
          "placeHistory",
          JSON.stringify(this.placeHistory)
        );
        this.inputVaule = "";
      });
      this.initData()
    },
    nextpage(geohash){
      this.setGeohash(geohash)
      this.$router.push({path:'/msite'})
    },
    //清空历史记录
    clearAll() {
      window.localStorage.setItem("placeHistory", "");
      this.initData();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/mixin";
.city_container {
  padding-top: 2.35rem;
}
.change_city {
  right: 0.4rem;
  @include sc(0.6rem, #fff);
  @include ct;
}
.city_form {
  background-color: #fff;
  border-top: 1px solid $bc;
  border-bottom: 1px solid $bc;
  padding-top: 0.4rem;
  div {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    .input_style {
      border-radius: 0.1rem;
      margin-bottom: 0.4rem;
      @include wh(100%, 1.4rem);
    }
    .city_input {
      border: 1px solid $bc;
      padding: 0 0.3rem;
      @include sc(0.65rem, #333);
    }
    .city_submit {
      background-color: $blue;
      @include sc(0.65rem, #fff);
    }
  }
}
.pois_search_history {
  border-top: 1px solid $bc;
  border-bottom: 1px solid $bc;
  padding-left: 0.5rem;
  @include font(0.475rem, 0.8rem);
}
.getpois_ul {
  background-color: #fff;
  border-top: 1px solid $bc;
  li {
    margin: 0 auto;
    padding-top: 0.65rem;
    border-bottom: 1px solid $bc;
    .pois_name {
      margin: 0 auto 0.35rem;
      width: 90%;
      @include sc(0.65rem, #333);
    }
    .pois_address {
      width: 90%;
      margin: 0 auto 0.55rem;
      @include sc(0.45rem, #999);
    }
  }
}
.search_none_place {
  margin: 0 auto;
  @include font(0.65rem, 1.75rem);
  color: #333;
  background-color: #fff;
  text-indent: 0.5rem;
}
.clear_all_history {
  @include sc(0.7rem, #666);
  text-align: center;
  line-height: 2rem;
  background-color: #fff;
}
</style>
