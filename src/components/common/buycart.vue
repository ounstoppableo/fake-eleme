<template>
  <section class="cart_module">
    <section v-if="!foods.specifications.length" class="cart_button">
      <transition name="showReduce">
        <span
          @click="
            removeOutCart(
              foods.category_id,
              foods.item_id,
              foods.specfoods[0].food_id,
              foods.specfoods[0].name,
              foods.specfoods[0].price,
              '',
              foods.specfoods[0].packing_fee,
              foods.specfoods[0].sku_id,
              foods.specfoods[0].stock
            )
          "
          v-if="foodNum"
        >
          <svg>
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#cart-minus"
            ></use>
          </svg>
        </span>
      </transition>
      <transition name="fade">
        <span class="cart_num" v-if="foodNum">{{ foodNum }}</span>
      </transition>
      <span
        @click="
          addToCart(
            $event,
            foods.category_id,
            foods.item_id,
            foods.specfoods[0].food_id,
            foods.specfoods[0].name,
            foods.specfoods[0].price,
            '',
            foods.specfoods[0].packing_fee,
            foods.specfoods[0].sku_id,
            foods.specfoods[0].stock
          )
        "
      >
        <svg>
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#cart-add"
          ></use>
        </svg>
      </span>
    </section>
    <section v-else class="choose_specification">
      <section class="choose_icon_container">
        <transition name="showReduce">
          <svg class="specs_reduce_icon" v-if="foodNum" @click="showReduceTip">
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#cart-minus"
            ></use>
          </svg>
        </transition>
        <transition name="fade">
          <span class="cart_num" v-if="foodNum">{{ foodNum }}</span>
        </transition>
        <span class="show_chooselist" @click="showChooseList(foods)"
          >选规格</span
        >
      </section>
    </section>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      foodNum: 0,
    };
  },
  computed: {
    ...mapState(["geohash", "cartList"]),
  },
  props: ["shopId", "foods"],
  methods: {
    showReduceTip() {
      this.$emit("showReduceTip");
    },
    removeOutCart(
      categoryId,
      itemId,
      foodId,
      name,
      price,
      packingFee,
      skuId,
      stock
    ) {
      this.foodNum--;
      const data = {
        restaurant_id: this.shopId,
        categoryId,
        itemId,
        foodId,
        name,
        num: this.foodNum,
        specs: "",
        price,
        packingFee,
        skuId,
        stock,
      };
      this.$emit("listenCart", data);
    },
    addToCart(
      e,
      categoryId,
      itemId,
      foodId,
      name,
      price,
      packingFee,
      skuId,
      stock
    ) {
      this.foodNum++;
      const data = {
        restaurant_id: this.shopId,
        categoryId,
        itemId,
        foodId,
        name,
        num: this.foodNum,
        specs: "",
        price,
        packingFee,
        skuId,
        stock,
      };
      this.$emit("listenCart", data);
      this.$emit("showMoveDotFun",e);
    },
    showChooseList(foodScroll) {
      this.$emit("showChooseList", foodScroll);
    },
  },
  beforeMount() {
    const initData = JSON.parse(window.localStorage.getItem("buycart"));
    if (initData) {
      const hadFinded = initData.filter((item) => {
        let flag = false;
        if (
          this.foods.specfoods[0].food_id === item.foodId &&
          this.shopId === item.restaurant_id
        ) {
          flag = true;
        }
        return flag;
      })[0];
      if (typeof hadFinded === "object") {
        this.foodNum = hadFinded.num;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin";
.cart_module {
  .add_icon {
    position: relative;
    z-index: 9;
  }
  .cart_button {
    display: flex;
    align-items: center;
  }
  svg {
    @include wh(0.9rem, 0.9rem);
    fill: #3190e8;
  }
  .specs_reduce_icon {
    fill: #999;
  }
  .cart_num {
    @include sc(0.65rem, #666);
    min-width: 1rem;
    text-align: center;
    font-family: Helvetica Neue, Tahoma;
  }
  .choose_specification {
    .choose_icon_container {
      display: flex;
      align-items: center;
      .show_chooselist {
        display: block;
        @include sc(0.55rem, #fff);
        padding: 0.1rem 0.2rem;
        background-color: $blue;
        border-radius: 0.2rem;
        border: 1px solid $blue;
      }
    }
  }
}
.showReduce-enter-active,
.showReduce-leave-active {
  transition: all 0.3s ease-out;
}
.showReduce-enter,
.showReduce-leave-active {
  opacity: 0;
  transform: translateX(1rem);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fadeBounce-enter-active,
.fadeBounce-leave-active {
  transition: all 0.3s;
}
.fadeBounce-enter,
.fadeBounce-leave-active {
  opacity: 0;
  transform: scale(0.7);
}
</style>

