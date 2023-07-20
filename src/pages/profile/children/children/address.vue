 <template>
  <div class="rating_page">
    <head-top head-title="编辑地址" go-back="true">
      <span slot="edit" class="edit" @click="editThing">{{ editText }}</span>
    </head-top>
    <section class="address">
      <ul class="addresslist">
        <li v-for="(item, index) in removeAddress" :key="index">
          <div>
            <p>{{ item.address }}</p>
            <p>
              <span>{{ item.phone }}</span
              ><span v-if="item.phone_bk">、{{ item.phone_bk }}</span>
            </p>
          </div>
          <div class="deletesite" v-if="deletesite">
            <span @click="deleteSite(index, item)">x</span>
          </div>
        </li>
      </ul>
      <router-link to="/profile/info/address/add">
        <div class="addsite">
          <span>新增地址</span>
          <span class="addsvg">
            <svg fill="#d8d8d8">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#arrow-right"
              ></use>
            </svg>
          </span>
        </div>
      </router-link>
    </section>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getAddress,delAddress } from "@/service/getData";
import { mapState } from "vuex";
import headTop from "@/components/header/head.vue";
export default {
  data() {
    return {
      editText: "编辑",
      removeAddress: [],
      deletesite: false,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  components: { headTop },
  methods: {
    editThing() {
      this.editText = this.editText === "编辑" ? "完成" : "编辑";
      this.deletesite = !this.deletesite;
    },
    async deleteSite(index){
		const delAddressRes = await delAddress(this.userInfo.id,this.removeAddress[index].city_id)
		if(!delAddressRes.data.status){
			alert('删除失败')
		}else{
			alert('删除成功')
			this.$router.go(0)
		}
	}
  },
  async beforeMount() {
    const getAddressRes = await getAddress(this.userInfo.id);
    this.removeAddress = getAddressRes.data;
  },
};
</script>
  
<style lang="scss" scoped>
@import "@/style/mixin";

.rating_page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  z-index: 202;
  padding-top: 1.95rem;
  p,
  span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}
.edit {
  right: 0.4rem;
  @include sc(0.7rem, #fff);
  @include ct;
}
.address {
  width: 100%;
  margin-top: 0.4rem;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  .addresslist {
    background: #fff;
    li {
      border-bottom: 1px solid #d9d9d9;
      padding: 0.4rem;
      @include fj(space-between);
      p {
        line-height: 0.9rem;
        @include sc(0.6rem, #333);
        span {
          display: inline-block;
          @include sc(0.6rem, #333);
        }
      }
      .deletesite {
        display: flex;
        align-items: center;
        span {
          display: block;
          @include sc(0.8rem, #999);
        }
      }
    }
    li:nth-of-type(1) {
      background: #fff8c3;
    }
  }
  .addsite {
    margin-top: 0.4rem;
    background: #fff;
    padding: 0.2rem 0.4rem;
    border-top: 1px solid #d9d9d9;
    @include fj(space-between);
    span {
      display: block;
      @include sc(0.7rem, #333);
      line-height: 1.4rem;
    }
    .addsvg {
      @include wh(0.66667rem, 1.4rem);
      svg {
        @include wh(100%, 100%);
      }
    }
  }
}
.router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.4s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>
