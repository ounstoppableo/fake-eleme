 <template>
  <div class="rating_page">
    <head-top head-title="新增地址" go-back="true"></head-top>
    <section class="adddetail">
      <form action="" v-on:submit.prevent>
        <section class="ui-padding-block">
          <div class="input-new">
            <input
              type="text"
              placeholder="请填写你的姓名"
              :class="{ verifies: verify }"
              v-model="message"
              @input="inputThing"
            />
            <p v-if="verify">请填写您的姓名</p>
          </div>
          <router-link
            to="/profile/info/address/add/addDetail"
            class="add-detail"
          >
            <div class="input-new">
              <input
                type="text"
                placeholder="小区/写字楼/学校等"
                readonly="readonly"
                v-model="addAddress"
              />
            </div>
          </router-link>
          <div class="input-new">
            <input
              type="text"
              placeholder="请填写详细送餐地址"
              :class="{ verifies: verifythree }"
              @input="inputThingthree"
              v-model="mesthree"
            />
            <p v-if="verifythree">{{ sendaddress }}</p>
          </div>
          <div class="input-new">
            <input
              type="text"
              placeholder="请填写能够联系到您的手机号"
              :class="{ verifies: verifyfour }"
              v-model="telenum"
              @input="inputThingfour"
            />
            <p v-if="verifyfour">{{ telephone }}</p>
          </div>
          <div class="input-new">
            <input
              type="text"
              placeholder="备用联系电话（选填）"
              v-model="standbytelenum"
              @input="inputThingfive"
            />
            <p v-if="verifyfive">{{ standbytele }}</p>
          </div>
        </section>
        <section class="addbutton">
          <button :class="{ butopacity: butpart }" @click.prevent="submitThing">
            新增地址
          </button>
        </section>
      </form>
    </section>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
    <alert-tip
      v-if="showAlert"
      @closeTip="showAlert = false"
      :alertText="alertText"
    ></alert-tip>
  </div>
</template>

<script>
import headTop from "@/components/header/head";
import alertTip from "@/components/common/alertTip";
import { addAddress } from "@/service/getData";
import { mapState } from "vuex";
export default {
  data() {
    return {
      message: "",
      verify: false,
      verifythree: false,
      verifyfour: false,
      verifyfive: false,
      mesthree: "",
      sendaddress: "",
      telenum: "",
      telephone: "",
      standbytelenum: "",
      standbytele: "",
      butpart: false,
      showAlert: false,
      alertText: "",
    };
  },
  components: {
    headTop,
    alertTip,
  },
  computed: {
    ...mapState(["geohash", "userInfo"]),
    addAddress() {
      return this.$store.state.choosedAddress;
    },
  },
  methods: {
    inputThing() {
      if (!this.message) {
        this.verify = true;
      } else {
        this.verify = false;
      }
    },
    inputThingthree() {
      if (!this.mesthree) {
        this.verifythree = true;
        this.sendaddress = "请填写详细的送餐地址";
      } else if (this.mesthree.length < 3) {
        this.verifythree = true;
        this.sendaddress = "送餐地址太短了，不能识别";
      } else {
        this.verifythree = false;
      }
    },
    inputThingfour() {
      if (!this.telenum.length) {
        this.verifyfour = true;
        this.telephone = "手机号不能为空";
      } else {
        const reg_tel =
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (!reg_tel.test(this.telenum)) {
          this.verifyfour = true;
          this.telephone = "请输入正确的手机号";
        } else {
          this.verifyfour = false;
        }
      }
    },
    inputThingfive() {
      if (this.standbytelenum) {
        const reg_tel =
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (!reg_tel.test(this.standbytelenum)) {
          this.verifyfive = true;
          this.standbytele = "请输入正确的手机号";
        } else {
          this.verifyfive = false;
        }
      } else {
        this.verifyfive = false;
      }
    },
    async submitThing() {
      if (
        !this.verify &&
        !this.verifythree &&
        !this.verifyfour &&
        !this.verifyfive &&
        this.addAddress
      ) {
        const phone_bk = this.standbytelenum ? this.standbytelenum : "无";
        const addAddressRes = await addAddress(
          this.userInfo.id,
          this.addAddress,
          this.mesthree,
          this.geohash,
          this.message,
          this.telenum,
          "家",
          1,
          phone_bk,
          2
        );
        if (!addAddressRes.data.status) {
          this.showAlert = true;
          this.alertText = "添加地址失败";
        }else{
			this.$router.go(-1)
		}
      } else {
        this.showAlert = true;
        this.alertText = "请确认填写信息无误";
      }
    },
  },
};
</script>
  
<style lang="scss" scoped>
@import "@/style/mixin";
.router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.4s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
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
.adddetail {
  margin-top: 0.4rem;
}
.ui-padding-block {
  background: #fff;
  padding-top: 0.4rem;
  .add-detail {
    display: block;
  }
  .input-new {
    padding-bottom: 0.4rem;
    input {
      display: block;
      width: 15rem;
      font-size: 0.6rem;
      margin: 0 auto;
      padding: 0.3rem;
      background: #f2f2f2;
      border: 1px solid #ddd;
      @include borderRadius(3px);
    }
    .verifies {
      border-color: #ea3106;
    }
    p {
      @include sc(0.4rem, #ea3106);
      padding-left: 0.5rem;
      margin-top: 0.2rem;
    }
  }
}
.addbutton {
  margin: 0.6rem auto;
  width: 15rem;
  background: #4cd964;
  @include borderRadius(3px);
  button {
    width: 100%;
    @include sc(0.6rem, #fff);
    line-height: 1.6rem;
    background: none;
    font-weight: 700;
    opacity: 0.6;
  }
  .butopacity {
    transition: all 0.4s;
    opacity: 1;
  }
}
</style>
