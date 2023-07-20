<template>
  <div class="restContainer">
    <head-top head-title="重置密码" goBack="true"></head-top>
    <form class="restForm">
      <section class="input_container phone_number">
        <input
          type="text"
          placeholder="账号"
          name="phone"
          maxlength="20"
          v-model.lazy="phoneNumber"
        />
        <!-- <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
                <button  @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button> -->
      </section>
      <section class="input_container">
        <input
          type="text"
          placeholder="旧密码"
          name="oldPassWord"
          v-model="oldPassWord"
        />
      </section>
      <section class="input_container">
        <input
          type="password"
          placeholder="请输入新密码"
          name="newPassWord"
          v-model="newPassWord"
        />
      </section>
      <section class="input_container">
        <input
          type="password"
          placeholder="请确认密码"
          name="confirmPassWord"
          v-model="confirmPassWord"
        />
      </section>
      <section class="input_container captcha_code_container">
        <input
          type="text"
          placeholder="验证码"
          name="mobileCode"
          maxlength="6"
          v-model="mobileCode"
        />
        <div class="img_change_img">
          <img v-show="captchaCodeImg" :src="captchaCodeImg" />
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <div class="login_container" @click="resetButton">确认修改</div>
    <alert-tip
      v-if="showAlert"
      :showHide="showAlert"
      @closeTip="closeTip"
      :alertText="alertText"
    ></alert-tip>
  </div>
</template>

<script>
import headTop from "@/components/header/head";
import alertTip from "@/components/common/alertTip";
import { getCaptcha, changePassword } from "@/service/getData";
export default {
  data() {
    return {
      phoneNumber: "",
      oldPassWord: "",
      newPassWord: "",
      confirmPassWord: "",
      mobileCode: "",
      captchaCodeImg: "",
      alertText: "",
      showAlert: false,
    };
  },
  methods: {
    async getCaptchaCode() {
      this.captchaCodeImg = (await getCaptcha()).data.code;
    },
    async resetButton() {
      if (!this.phoneNumber.trim()) {
        this.alertText = "请输入账号";
        this.showAlert = true;
        return;
      }
      if (!this.oldPassWord.trim()) {
        this.alertText = "请输入旧密码";
        this.showAlert = true;
        return;
      }
      if (!this.newPassWord.trim()) {
        this.alertText = "请输入新密码";
        this.showAlert = true;
        return;
      }
      if (!this.confirmPassWord.trim()) {
        this.alertText = "请确认新密码";
        this.showAlert = true;
        return;
      }
      if (this.confirmPassWord !== this.newPassWord) {
        this.alertText = "密码不一致";
        this.showAlert = true;
        return;
      }
      if (!this.mobileCode.trim()) {
        this.alertText = "请输入验证码";
        this.showAlert = true;
        return;
      }
      const res = await changePassword(
        this.phoneNumber,
        this.oldPassWord,
        this.newPassWord,
        this.confirmPassWord,
        this.mobileCode
      );
      this.alertText = res.data.message || res.data.success;
      this.showAlert = true;
      this.getCaptchaCode();
    },
    closeTip() {
      this.showAlert = false;
    },
  },
  created() {
    this.getCaptchaCode();
  },
  components: { headTop, alertTip },
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";

.restContainer {
  padding-top: 1.95rem;
}
.restForm {
  background-color: #fff;
  margin-top: 0.6rem;
  .input_container {
    display: flex;
    justify-content: space-between;
    padding: 0.6rem 0.8rem;
    border-bottom: 1px solid #f1f1f1;
    input {
      @include sc(0.7rem, #666);
    }
    button {
      @include sc(0.65rem, #fff);
      font-family: Helvetica Neue, Tahoma, Arial;
      padding: 0.28rem 0.4rem;
      border: 1px;
      border-radius: 0.15rem;
    }
    .right_phone_number {
      background-color: #4cd964;
    }
  }
  .phone_number {
    padding: 0.3rem 0.8rem;
  }
  .captcha_code_container {
    height: 2.2rem;
    .img_change_img {
      display: flex;
      align-items: center;
      img {
        @include wh(3.5rem, 1.5rem);
        margin-right: 0.2rem;
      }
      .change_img {
        display: flex;
        flex-direction: "column";
        flex-wrap: wrap;
        width: 2rem;
        justify-content: center;
        p {
          @include sc(0.55rem, #666);
        }
        p:nth-of-type(2) {
          color: #3b95e9;
          margin-top: 0.2rem;
        }
      }
    }
  }
}
.captcha_code_container {
  height: 2.2rem;
  .img_change_img {
    display: flex;
    align-items: center;
    img {
      @include wh(3.5rem, 1.5rem);
      margin-right: 0.2rem;
    }
    .change_img {
      display: flex;
      flex-direction: "column";
      flex-wrap: wrap;
      width: 2rem;
      justify-content: center;
      p {
        @include sc(0.55rem, #666);
      }
      p:nth-of-type(2) {
        color: #3b95e9;
        margin-top: 0.2rem;
      }
    }
  }
}
.login_container {
  margin: 1rem 0.5rem;
  @include sc(0.7rem, #fff);
  background-color: #4cd964;
  padding: 0.5rem 0;
  border: 1px;
  border-radius: 0.15rem;
  text-align: center;
}
</style>
