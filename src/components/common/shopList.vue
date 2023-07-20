<template>
  <div class="shoplist_container">
    <ul v-if="shopListArr.length" type="1">
      <router-link
        :to="{ path: 'shop', query: { id: item.id } }"
        v-for="item in shopListArr"
        tag="li"
        :key="item.id"
        class="shop_li"
        ref="shopItem"
      >
        <section>
          <img :src="imgBaseUrl + item.image_path" class="shop_img" />
        </section>
        <hgroup class="shop_right">
          <header class="shop_detail_header">
            <h4
              :class="item.is_premium ? 'premium' : ''"
              class="shop_title ellipsis"
            >
              {{ item.name }}
            </h4>
            <ul class="shop_detail_ul">
              <li v-for="item in item.supports" :key="item.id" class="supports">
                {{ item.icon_name }}
              </li>
            </ul>
          </header>
          <h5 class="rating_order_num">
            <section class="rating_order_num_left">
              <section class="rating_section">
                <rating-star :rating="item.rating"></rating-star>
                <span class="rating_num">{{ item.rating }}</span>
              </section>
              <section class="order_section">
                月售{{ item.recent_order_num }}单
              </section>
            </section>
            <section class="rating_order_num_right">
              <span
                class="delivery_style delivery_left"
                v-if="item.delivery_mode"
                >{{ item.delivery_mode.text }}</span
              >
              <span
                class="delivery_style delivery_right"
                v-if="zhunshi(item.supports)"
                >准时达</span
              >
            </section>
          </h5>
          <h5 class="fee_distance">
            <p class="fee">
              ¥{{ item.float_minimum_order_amount }}起送
              <span class="segmentation">/</span>
              {{ item.piecewise_agent_fee.tips }}
            </p>
            <p class="distance_time">
              <span v-if="Number(item.distance)"
                >{{
                  item.distance > 1000
                    ? (item.distance / 1000).toFixed(2) + "km"
                    : item.distance + "m"
                }}
                <span class="segmentation">/</span>
              </span>
              <span v-else>{{ item.distance }}</span>
              <span class="segmentation">/</span>
              <span class="order_time">{{ item.order_lead_time }}</span>
            </p>
          </h5>
        </hgroup>
      </router-link>
    </ul>
    <ul v-else class="animation_opactiy">
      <li class="list_back_li" v-for="item in 10" :key="item">
        <img src="../../images/shopback.svg" class="list_back_svg" />
      </li>
    </ul>
    <p v-if="touchend" class="empty_data">没有更多了</p>
    <aside class="return_top" @click="backTop" v-if="showBackStatus">
      <svg class="back_top_svg">
        <use
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="#backtop"
        ></use>
      </svg>
    </aside>
    <div ref="abc" style="background-color: red"></div>
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
  </div>
</template>
<script>
import loading from "./loading.vue";
import ratingStar from "./ratingStar.vue";
import { getNearbyShop } from "@/service/getData";
export default {
  data() {
    return {
      oriList: [],
      hadSort: [],
      shopListArr: [],
      imgBaseUrl: "//elm.cangdu.org/img/",
      touchend: false,
      showBackStatus: false,
      showLoading: true,
    };
  },
  components: {
    loading,
    ratingStar,
  },
  computed: {
    latitude() {
      return this.geohash.split(",")[0];
    },
    longitude() {
      return this.geohash.split(",")[1];
    },
  },
  props: [
    "geohash",
    "navHeight",
    "restaurantCategoryId",
    "restaurantCategoryIds",
    "sortByType",
    "deliveryMode",
    "supportIds",
    "confirmSelect",
    "clearComfirmStatus",
  ],
  methods: {
    backTop() {
      window.scrollTo(0, 0);
    },
    loaderMore() {},
    //准时宝判断
    zhunshi(supports) {
      let flag = false;
      supports.forEach((item) => {
        if (item.icon_name === "准") flag = true;
      });
      return flag;
    },
    // scrollFn() {
    //   //开启和关闭回到顶部模块的逻辑
    //   if (document.documentElement.scrollTop > this.navHeight) {
    //     this.showBackStatus = true;
    //   } else {
    //     this.showBackStatus = false;
    //   }
    //   //达到底部添加item的逻辑
    //   if (this.allShopList.length) {
    //     if (
    //       document.documentElement.clientHeight +
    //         document.documentElement.scrollTop >=
    //       document.documentElement.scrollHeight
    //     ) {
    //       this.allShopList
    //         .splice(0, 10)
    //         .forEach((item) => this.shopListArr.push(item));
    //     }
    //   } else {
    //     this.touchend =true
    //   }
    // },
    sortList() {
      if (this.sortByType) {
        //距离最近排序
        if (this.sortByType === 5) {
          this.shopListArr.sort((a, b) => {
            const aDis =
              a.distance.indexOf("公里") === -1
                ? parseInt(a.distance)
                : parseInt(a.distance) * 1000;
            const bDis =
              b.distance.indexOf("公里") === -1
                ? parseInt(b.distance)
                : parseInt(b.distance) * 1000;
            return aDis - bDis;
          });
        }
        //销量最高排序
        if (this.sortByType === 6) {
          this.shopListArr.sort((a, b) => {
            const aOrdNum = parseInt(a.recent_order_num);
            const bOrdNum = parseInt(b.recent_order_num);
            return bOrdNum - aOrdNum;
          });
        }
        //起送最低排序
        if (this.sortByType === 1) {
          this.shopListArr.sort((a, b) => {
            const aOrdAmount = parseInt(a.float_minimum_order_amount);
            const bOrdAmount = parseInt(b.float_minimum_order_amount);
            return aOrdAmount - bOrdAmount;
          });
        }
        //配送速度最快
        if (this.sortByType === 2) {
          this.shopListArr.sort((a, b) => {
            const ahour =
              a.order_lead_time.indexOf("小时") !== -1
                ? parseInt(a.order_lead_time.split("小时")[0])
                : 0;
            const aminute =
              a.order_lead_time.indexOf("小时") !== -1
                ? parseInt(a.order_lead_time.split("小时")[1])
                : parseInt(a.order_lead_time.split("小时")[0]);
            const bhour =
              b.order_lead_time.indexOf("小时") !== -1
                ? parseInt(b.order_lead_time.split("小时")[0])
                : 0;
            const bminute =
              b.order_lead_time.indexOf("小时") !== -1
                ? parseInt(b.order_lead_time.split("小时")[1])
                : parseInt(b.order_lead_time.split("小时")[0]);
            const aOrdTime = ahour * 60 + aminute;
            const bOrdTime = bhour * 60 + bminute;
            return aOrdTime - bOrdTime;
          });
        }
        //评分最高
        if (this.sortByType === 3) {
          this.shopListArr.sort((a, b) => {
            const aRating = a.rating * 10;
            const bRating = b.rating * 10;
            return bRating - aRating;
          });
        }
      } else {
        this.shopListArr = [];
        this.oriList.forEach((item) => this.shopListArr.push(item));
      }
      this.hadSort = [];
      this.shopListArr.forEach((item) => this.hadSort.push(item));
    },
    filterList() {},
  },
  watch: {
    //监听选择的排序
    sortByType() {
      this.sortList();
    },
    //监听是否有提交
    confirmSelect() {
      //提交，并且选了过滤项后的逻辑
      if (this.confirmSelect === 1) {
        this.shopListArr = [];
        this.hadSort.forEach((item) => this.shopListArr.push(item));
        //如果选了蜂鸟专送
        if (this.deliveryMode) {
          this.shopListArr = this.shopListArr.filter(
            (item) => item.delivery_mode.id === 1
          );
        }
        this.supportIds.forEach((item) => {
          if (item.status) {
            this.shopListArr = this.shopListArr.filter((shopitem) => {
              let flag = false;
              shopitem.supports.forEach((suppItem) => {
                if (suppItem.id === item.id) flag = true;
              });
              return flag;
            });
          }
        });
        this.clearComfirmStatus();
      }
      //提交，但没选过滤项后的逻辑
      if (this.confirmSelect === 0) {
        this.shopListArr = [];
        this.hadSort.forEach((item) => this.shopListArr.push(item));
      }
      //提交结束且没有再次提交
      if (this.confirmSelect === 2) {
      }
    },
  },
  beforeMount() {
    (async () => {
      const getNearbyShopRes = await getNearbyShop(
        this.latitude,
        this.longitude
      );
      this.showLoading = false;
      getNearbyShopRes.data.forEach((item) => this.shopListArr.push(item));
      getNearbyShopRes.data.forEach((item) => this.oriList.push(item));
      getNearbyShopRes.data.forEach((item) => this.hadSort.push(item));
    })();
  },

};
</script>
<style lang="scss" scoped>
@import "../../style/mixin.scss";
.shoplist_container {
  background-color: #fff;
  margin-bottom: 2rem;
}
.shop_li {
  display: flex;
  border-bottom: 0.025rem solid #f1f1f1;
  padding: 0.7rem 0.4rem;
}
.shop_img {
  @include wh(2.7rem, 2.7rem);
  display: block;
  margin-right: 0.4rem;
}
.list_back_li {
  height: 4.85rem;
  .list_back_svg {
    @include wh(100%, 100%);
  }
}
.shop_right {
  flex: auto;
  .shop_detail_header {
    @include fj;
    align-items: center;
    .shop_title {
      width: 8.5rem;
      color: #333;
      padding-top: 0.01rem;
      @include font(0.65rem, 0.65rem, "PingFangSC-Regular");
      font-weight: 700;
    }
    .premium::before {
      content: "品牌";
      display: inline-block;
      font-size: 0.5rem;
      line-height: 0.6rem;
      color: #333;
      background-color: #ffd930;
      padding: 0 0.1rem;
      border-radius: 0.1rem;
      margin-right: 0.2rem;
    }
    .shop_detail_ul {
      display: flex;
      transform: scale(0.8);
      margin-right: -0.3rem;
      .supports {
        @include sc(0.5rem, #999);
        border: 0.025rem solid #f1f1f1;
        padding: 0 0.04rem;
        border-radius: 0.08rem;
        margin-left: 0.05rem;
      }
    }
  }
  .rating_order_num {
    @include fj(space-between);
    height: 0.6rem;
    margin-top: 0.52rem;
    .rating_order_num_left {
      @include fj(flex-start);
      .rating_section {
        display: flex;
        .rating_num {
          @include sc(0.4rem, #ff6000);
          margin: 0 0.2rem;
        }
      }
      .order_section {
        transform: scale(0.8);
        margin-left: -0.2rem;
        @include sc(0.4rem, #666);
      }
    }
    .rating_order_num_right {
      display: flex;
      align-items: center;
      transform: scale(0.7);
      min-width: 5rem;
      justify-content: flex-end;
      margin-right: -0.8rem;
      .delivery_style {
        font-size: 0.4rem;
        padding: 0.04rem 0.08rem 0;
        border-radius: 0.08rem;
        margin-left: 0.08rem;
        border: 1px;
      }
      .delivery_left {
        color: #fff;
        background-color: $blue;
        border: 0.025rem solid $blue;
      }
      .delivery_right {
        color: $blue;
        border: 0.025rem solid $blue;
      }
    }
  }
  .fee_distance {
    margin-top: 0.52rem;
    @include fj;
    @include sc(0.5rem, #333);
    .fee {
      transform: scale(0.9);
      @include sc(0.5rem, #666);
    }
    .distance_time {
      transform: scale(0.9);
      span {
        color: #999;
      }
      .order_time {
        color: $blue;
      }
      .segmentation {
        color: #ccc;
      }
    }
  }
}
.loader_more {
  @include font(0.6rem, 3);
  text-align: center;
  color: #999;
}
.empty_data {
  @include sc(0.5rem, #666);
  text-align: center;
  line-height: 2rem;
}
.return_top {
  position: fixed;
  bottom: 3rem;
  right: 1rem;
  .back_top_svg {
    @include wh(2rem, 2rem);
  }
}
.loading-enter-active,
.loading-leave-active {
  transition: opacity 1s;
}
.loading-enter,
.loading-leave-active {
  opacity: 0;
}
</style>
