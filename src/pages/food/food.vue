<template>
  <div class="food_container">
    <head-top :head-title="headTitle" goBack="true"></head-top>
    <section class="sort_container">
      <!-- 分类 -->
      <div class="sort_item" :class="{ choose_type: sortBy == 'food' }">
        <div class="sort_item_container" @click="chooseType('food')">
          <div class="sort_item_border">
            <span :class="{ category_title: sortBy == 'food' }">{{
              headTitle
            }}</span>
            <svg
              width="10"
              height="10"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              class="sort_icon"
            >
              <polygon points="0,3 10,3 5,8" />
            </svg>
          </div>
        </div>
        <transition name="showlist" v-show="category">
          <section
            v-show="sortBy == 'food'"
            class="category_container sort_detail_type"
          >
            <section class="category_left">
              <ul>
                <li
                  v-for="(item, index) in category"
                  :key="index"
                  class="category_left_li"
                  :class="{
                    category_active: restaurant_category_id == item.id,
                  }"
                  @click="selectCategoryName(item.id, index)"
                >
                  <section>
                    <img
                      :src="getImgPath(item.image_url)"
                      class="category_icon"
                    />
                    <span>{{ item.name }}</span>
                  </section>
                  <section>
                    <span class="category_count">{{ item.count }}</span>
                    <svg
                      width="8"
                      height="8"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      class="category_arrow"
                    >
                      <path
                        d="M0 0 L6 4 L0 8"
                        stroke="#bbb"
                        stroke-width="1"
                        fill="none"
                      />
                    </svg>
                  </section>
                </li>
              </ul>
            </section>
            <section class="category_right">
              <ul>
                <li
                  v-for="(item, index) in categoryDetail"
                  :key="index"
                  class="category_right_li"
                  @click="getCategoryIds(item.id, item.name)"
                  :class="{
                    category_right_choosed:
                      restaurant_category_ids == item.id ||
                      (!restaurant_category_ids && index == 0),
                  }"
                >
                  <span>{{ item.name }}</span>
                  <span>{{ item.count }}</span>
                </li>
              </ul>
            </section>
          </section>
        </transition>
      </div>
      <!-- 排序 -->
      <div class="sort_item" :class="{ choose_type: sortBy == 'sort' }">
        <div class="sort_item_container" @click="chooseType('sort')">
          <div class="sort_item_border">
            <span :class="{ category_title: sortBy == 'sort' }">排序</span>
            <svg
              width="10"
              height="10"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              class="sort_icon"
            >
              <polygon points="0,3 10,3 5,8" />
            </svg>
          </div>
        </div>
        <transition name="showlist">
          <section v-show="sortBy == 'sort'" class="sort_detail_type">
            <ul class="sort_list_container" @click="sortList($event)">
              <li class="sort_list_li">
                <svg>
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#default"
                  ></use>
                </svg>
                <p data-type="0" :class="{ sort_select: sortByType == 0 }">
                  <span>智能排序</span>
                  <svg v-if="sortByType == 0">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"
                    ></use>
                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#distance"
                  ></use>
                </svg>
                <p data-type="5" :class="{ sort_select: sortByType == 5 }">
                  <span>距离最近</span>
                  <svg v-if="sortByType == 5">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"
                    ></use>
                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#hot"
                  ></use>
                </svg>
                <p data-type="6" :class="{ sort_select: sortByType == 6 }">
                  <span>销量最高</span>
                  <svg v-if="sortByType == 6">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"
                    ></use>
                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#price"
                  ></use>
                </svg>
                <p data-type="1" :class="{ sort_select: sortByType == 1 }">
                  <span>起送价最低</span>
                  <svg v-if="sortByType == 1">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"
                    ></use>
                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#speed"
                  ></use>
                </svg>
                <p data-type="2" :class="{ sort_select: sortByType == 2 }">
                  <span>配送速度最快</span>
                  <svg v-if="sortByType == 2">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"
                    ></use>
                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
                  <use
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#rating"
                  ></use>
                </svg>
                <p data-type="3" :class="{ sort_select: sortByType == 3 }">
                  <span>评分最高</span>
                  <svg v-if="sortByType == 3">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"
                    ></use>
                  </svg>
                </p>
              </li>
            </ul>
          </section>
        </transition>
      </div>
      <!-- 筛选 -->
      <div class="sort_item" :class="{ choose_type: sortBy == 'activity' }">
        <div class="sort_item_container" @click="chooseType('activity')">
          <span :class="{ category_title: sortBy == 'activity' }">筛选</span>
          <svg
            width="10"
            height="10"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            class="sort_icon"
          >
            <polygon points="0,3 10,3 5,8" />
          </svg>
        </div>
        <transition name="showlist">
          <section
            v-show="sortBy == 'activity'"
            class="sort_detail_type filter_container"
          >
            <section style="width: 100%">
              <header class="filter_header_style">配送方式</header>
              <ul class="filter_ul">
                <li
                  v-for="(item, index) in Delivery"
                  :key="index"
                  class="filter_li"
                  @click="selectDeliveryMode(item.id)"
                >
                  <svg
                    :style="{
                      opacity: item.id == 0 && delivery_mode !== 0 ? 0 : 1,
                    }"
                  >
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      :xlink:href="
                        delivery_mode == item.id ? '#selected' : '#fengniao'
                      "
                    ></use>
                  </svg>
                  <span
                    :class="{ selected_filter: delivery_mode == item.id }"
                    >{{ item.text }}</span
                  >
                </li>
              </ul>
            </section>
            <section style="width: 100%">
              <header class="filter_header_style">商家属性（可以多选）</header>
              <ul class="filter_ul" style="paddingbottom: 0.5rem">
                <li
                  v-for="(item, index) in Activity"
                  :key="index"
                  class="filter_li"
                  @click="selectSupportIds(index, item.id)"
                >
                  <svg v-show="support_ids[index].status" class="activity_svg">
                    <use
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#selected"
                    ></use>
                  </svg>
                  <span
                    class="filter_icon"
                    :style="{
                      color: '#' + item.icon_color,
                      borderColor: '#' + item.icon_color,
                    }"
                    v-show="!support_ids[index].status"
                    >{{ item.icon_name }}</span
                  >
                  <span
                    :class="{ selected_filter: support_ids[index].status }"
                    >{{ item.name }}</span
                  >
                </li>
              </ul>
            </section>
            <footer class="confirm_filter">
              <div class="clear_all filter_button_style" @click="clearSelect">
                清空
              </div>
              <div
                class="confirm_select filter_button_style"
                @click="confirmSelectFun"
              >
                确定<span v-show="filterNum">({{ filterNum }})</span>
              </div>
            </footer>
          </section>
        </transition>
      </div>
    </section>
    <transition name="showcover">
      <div class="back_cover" v-show="sortBy"></div>
    </transition>
    <section class="shop_list_container">
      <shop-list
        :geohash="geohash"
        :restaurantCategoryId="restaurant_category_id"
        :restaurantCategoryIds="restaurant_category_ids"
        :sortByType="sortByType"
        :deliveryMode="delivery_mode"
        :confirmSelect="confirmStatus"
        :supportIds="support_ids"
        :clearComfirmStatus="clearComfirmStatus"
        v-if="latitude"
      ></shop-list>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getDeliverMode, getCategory, getAttri } from "@/service/getData";
import headTop from "@/components/header/head";
import shopList from "@/components/common/shopList";
export default {
  data() {
    return {
      headTitle: this.$route.query.title,
      sortBy: "", //下拉框类型
      category: [], //分类种类
      restaurant_category_id: "", //餐厅分类id
      categoryDetail: [], //分类细节
      restaurant_category_ids: "", //细节分类Id
      delivery_mode: 0, //配送方式
      support_ids: [], //支持配送的方式
      sortByType: 0, //排序方式
      filterNum: 0,
      confirmStatus: 0, //点击确认变为1
      Delivery: [],
      Activity: [],
    };
  },
  methods: {
    chooseType(value) {
      this.sortBy = this.sortBy !== value ? value : "";
    },
    selectCategoryName(id, index) {
      this.restaurant_category_id = id;
      this.categoryDetail = this.category[index].sub_categories;
    },
    getImgPath(value) {
      return "https://fuss10.elemecdn.com/" + value;
    },
    getCategoryIds(id, name) {
      this.restaurant_category_ids = id;
      this.sortBy = "";
    },
    //排序模块
    sortList(e) {
      this.sortByType = +e.target.parentNode.dataset.type;
      this.sortBy = "";
      document.documentElement.scrollTo(0, 0);
    },
    //过滤模块
    //勾选配送方式
    selectDeliveryMode(value) {
      this.delivery_mode = this.delivery_mode === value ? 0 : value;
      this.delivery_mode === 0 ? this.filterNum-- : this.filterNum++;
    },
    //勾选商家支持
    selectSupportIds(index, id) {
      this.support_ids[index].status = !this.support_ids[index].status;
      this.support_ids[index].status === true
        ? this.filterNum++
        : this.filterNum--;
    },
    //清除所有勾选
    clearSelect() {
      this.delivery_mode = false;
      this.support_ids.forEach((_, index) => {
        this.support_ids[index].status = false;
      });
      this.filterNum = 0;
    },
    confirmSelectFun() {
      if (this.filterNum) {
        this.confirmStatus = 1;
      } else {
        this.confirmStatus = 0;
      }
      this.sortBy = "";
    },
    clearComfirmStatus() {
      this.confirmStatus = 2;
    },
  },
  components: {
    headTop,
    shopList,
  },
  computed: {
    ...mapState(["geohash"]),
    ...mapGetters(["latitude", "longitude"]),
  },
  async beforeMount() {
    const getCategoryRes = await getCategory();
    this.category = getCategoryRes.data;
    const getDeliverModeRes = await getDeliverMode();
    this.Delivery = getDeliverModeRes.data;
    const getAttriRes = await getAttri();
    this.Activity = getAttriRes.data;
    //记录support_ids的状态，默认不选中，点击状态取反，status为true时为选中状态
    this.Activity.forEach((item) => {
      this.support_ids.push({ status: false, id: item.id });
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/mixin";
.food_container {
  padding-top: 3.6rem;
}
.sort_container {
  background-color: #fff;
  border-bottom: 0.025rem solid #f1f1f1;
  position: fixed;
  top: 1.95rem;
  right: 0;
  width: 100%;
  display: flex;
  z-index: 13;
  box-sizing: border-box;
  .sort_item {
    @include sc(0.55rem, #444);
    @include wh(33.3%, 1.6rem);
    text-align: center;
    line-height: 1rem;
    .sort_item_container {
      @include wh(100%, 100%);
      position: relative;
      z-index: 14;
      background-color: #fff;
      box-sizing: border-box;
      padding-top: 0.3rem;
      .sort_item_border {
        height: 1rem;
        border-right: 0.025rem solid $bc;
      }
    }
    .sort_icon {
      vertical-align: middle;
      transition: all 0.3s;
      fill: #666;
    }
  }
  .choose_type {
    .sort_item_container {
      .category_title {
        color: $blue;
      }
      .sort_icon {
        transform: rotate(180deg);
        fill: $blue;
      }
    }
  }
  .showlist-enter-active,
  .showlist-leave-active {
    transition: all 0.3s;
    transform: translateY(0);
  }
  .showlist-enter,
  .showlist-leave-active {
    opacity: 0;
    transform: translateY(-100%);
  }
  .sort_detail_type {
    width: 100%;
    position: absolute;
    display: flex;
    top: 1.6rem;
    left: 0;
    border-top: 0.025rem solid $bc;
    background-color: #fff;
  }
  .category_container {
    .category_left {
      flex: 1;
      background-color: #f1f1f1;
      height: 16rem;
      overflow-y: auto;
      span {
        @include sc(0.5rem, #666);
        line-height: 1.8rem;
      }
      .category_left_li {
        @include fj;
        padding: 0 0.5rem;
        .category_icon {
          @include wh(0.8rem, 0.8rem);
          vertical-align: middle;
          margin-right: 0.2rem;
        }
        .category_count {
          background-color: #ccc;
          @include sc(0.4rem, #fff);
          padding: 0 0.1rem;
          border: 0.025rem solid #ccc;
          border-radius: 0.8rem;
          vertical-align: middle;
          margin-right: 0.25rem;
        }
        .category_arrow {
          vertical-align: middle;
        }
      }
      .category_active {
        background-color: #fff;
      }
    }
    .category_right {
      flex: 1;
      background-color: #fff;
      padding-left: 0.5rem;
      height: 16rem;
      overflow-y: auto;
      .category_right_li {
        @include fj;
        height: 1.8rem;
        line-height: 1.8rem;
        padding-right: 0.5rem;
        border-bottom: 0.025rem solid $bc;
        span {
          color: #666;
        }
      }
      .category_right_choosed {
        span {
          color: $blue;
        }
      }
    }
  }
  .sort_list_container {
    width: 100%;
    .sort_list_li {
      height: 2.5rem;
      display: flex;
      align-items: center;
      svg {
        @include wh(0.7rem, 0.7rem);
        margin: 0 0.3rem 0 0.8rem;
      }
      p {
        line-height: 2.5rem;
        flex: auto;
        text-align: left;
        text-indent: 0.25rem;
        border-bottom: 0.025rem solid $bc;
        @include fj;
        align-items: center;
        span {
          color: #666;
        }
      }
      .sort_select {
        span {
          color: $blue;
        }
      }
    }
  }
  .filter_container {
    flex-direction: column;
    align-items: flex-start;
    min-height: 10.6rem;
    background-color: #f1f1f1;
    .filter_header_style {
      @include sc(0.4rem, #333);
      line-height: 1.5rem;
      height: 1.5rem;
      text-align: left;
      padding-left: 0.5rem;
      background-color: #fff;
    }
    .filter_ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 0.5rem;
      background-color: #fff;
      .filter_li {
        display: flex;
        align-items: center;
        border: 0.025rem solid #eee;
        @include wh(4.7rem, 1.4rem);
        margin-right: 0.25rem;
        border-radius: 0.125rem;
        padding: 0 0.25rem;
        margin-bottom: 0.25rem;
        svg {
          @include wh(0.8rem, 0.8rem);
          margin-right: 0.125rem;
        }
        span {
          @include sc(0.4rem, #333);
        }
        .filter_icon {
          @include wh(0.8rem, 0.8rem);
          font-size: 0.5rem;
          border: 0.025rem solid $bc;
          border-radius: 0.15rem;
          margin-right: 0.25rem;
          line-height: 0.8rem;
          text-align: center;
        }
        .activity_svg {
          margin-right: 0.25rem;
        }
        .selected_filter {
          color: $blue;
        }
      }
    }
    .confirm_filter {
      display: flex;
      background-color: #f1f1f1;
      width: 100%;
      padding: 0.3rem 0.2rem;
      .filter_button_style {
        @include wh(50%, 1.8rem);
        font-size: 0.8rem;
        line-height: 1.8rem;
        border-radius: 0.2rem;
      }
      .clear_all {
        background-color: #fff;
        margin-right: 0.5rem;
        border: 0.025rem solid #fff;
      }
      .confirm_select {
        background-color: #56d176;
        color: #fff;
        border: 0.025rem solid #56d176;
        span {
          color: #fff;
        }
      }
    }
  }
}
.showcover-enter-active,
.showcover-leave-active {
  transition: opacity 0.3s;
}
.showcover-enter,
.showcover-leave-active {
  opacity: 0;
}
.back_cover {
  position: fixed;
  @include wh(100%, 100%);
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
