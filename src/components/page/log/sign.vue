<template>
  <!-- 注册页面 -->
  <div class="sign">
    <group>
      <x-input
        :max="11"
        @on-blur="verifyInvite()"
        v-model="params.srcFrom"
        disabled
        placeholder="请输入邀请码(非必填)"
        keyboard="text"
      >
        <img slot="label" src="../../../assets/img/88.png">
      </x-input>
      <x-input
        :max="11"
        v-model="params.account"
        placeholder="请输入手机号码"
        keyboard="number"
        is-type="china-mobile"
      >
        <img slot="label" src="../../../assets/img/geren2.png">
      </x-input>
      <div class="msgcodeWrap">
        <x-input
          class="verifyCode"
          v-model="params.code"
          :max="11"
          placeholder="手机验证码"
          keyboard="number"
        >
          <img slot="label" src="../../../assets/img/66.png">
        </x-input>
        <span
          class="sentMsg"
          :class="{disabled: !this.canClick}"
          @click="getVerifyCode()"
        >{{content}}</span>
      </div>
      <x-input
        :max="16"
        :min="6"
        v-model="params.psw"
        placeholder="请输入登录密码"
        keyboard="text"
        type="password"
      >
        <img slot="label" src="../../../assets/img/55.png">
      </x-input>
      <x-input
        :max="16"
        :equal-with="params.psw"
        v-model="params.spsw"
        placeholder="请重复输入新密码"
        keyboard="text"
        type="password"
      >
        <img slot="label" src="../../../assets/img/55.png">
      </x-input>
    </group>
    <box gap="30px 30px">
      <x-button action-type="submit" @click.native="signNow()" type="primary">注册</x-button>
    </box>
    <toast
      v-model="toast.showValue"
      type="text"
      :time="1200"
      is-show-mask
      position="middle"
    >{{toast.textValue }}</toast>
  </div>
</template>
<script>
import { Group, XInput, XButton, Box, Toast } from "vux";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Group,
    XInput,
    XButton,
    Box,
    Toast
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    })
  },
  methods: {
    ...mapActions([
      "setPublicHeaderStatus",
      "setLandingStatus",
      "setBottomNavigation",
      "setUserInfo"
    ]),
    signNow() {
      // for (let i in this.params) {
      //   if (this.params[i] == "") {
      //     this.toast.textValue = "注册信息不能为空";
      //     this.toast.showValue = true;
      //     return false;
      //   }
      // }
      this.$api
        .sign(this.params)
        .then(res => {
          /*请求成功后的操作*/
          if (res.data.code == 0) {
            let token = res.data.sessionId;
            this.$store.state.publicInfo.userInfo.token = token;
            //判断实名
            let payAvailabel = false;

            if (res.data.data.realName) {
              payAvailabel = true;
            }
            //判断提现密码
            let withdrawPassword = false;
            if (res.data.data.withdrawPassword) {
              withdrawPassword = true;
            }
            //token
            // let tokens = res.data.data.token;

            let identity = "";
            if (res.data.data.identityNum) {
              identity = res.data.data.identityNum;
              let rest = identity.substr(2, 14);
              // identity = identity.replace(rest, '************');
            }
            let realname = "";
            if (res.data.data.realName) {
              realname = res.data.data.realName;
              let hideName = realname.substr(1);
              // realname = realname.replace(hideName, '**');
            }
            let phonenum = "";
            if (res.data.data.phone) {
              phonenum = res.data.data.phone;
              let hidephone = phonenum.substr(3, 4);
          //    phonenum = phonenum.replace(hidephone, "****");
            }
            this.setLandingStatus(true);
            // 设置用户信息
            this.setUserInfo({
              id: res.data.data.id, //用户id
              realName: realname, //真实姓名
              nickName: res.data.data.nickName, //用户昵称
              phone: phonenum, //手机号
              token:token,//token
              withdraw: withdrawPassword, //是否存在交易密码
              handUrl: res.data.data.handUrl, //用户头像
              payAble: payAvailabel,
              card: res.data.data.comments2,
              identityNum: identity,
              isAngent: res.data.data.isAngent
            });
            localStorage.setItem("publicInfo", JSON.stringify(this.publicInfo));
            this.$router.push({ path: `/page/index${this.Id}` });
          } else {
            this.toast.textValue = res.data.message;
            this.toast.showValue = true;
          }
        })
        .catch(err => {
          this.toast.textValue = "注册失败请重试";
          this.toast.showValue = true;
        });
    },
    getVerifyCode() {
//    let reg = /^1[2345678]\d{9}$/;/^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/i
	  let reg = /^(12[0-9]|13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/i;
      let signCode = {};
      signCode.type = "0";
      signCode.smsType = "0";
      let phoneNumber = this.params.account;
      if (phoneNumber != "" && reg.test(phoneNumber)) {
        signCode.mobile = phoneNumber;
        this.$api
          .code(signCode)
          .then(res => {
            this.countDown();
          })
          .catch(err => {
            this.canClick = true;
          });
      } else {
        this.toast.textValue = "手机号不正确";
        this.toast.showValue = true;
      }
    },
    countDown() {
      if (!this.canClick) return; //改动的是这两行代码
      this.canClick = false;
      this.content = this.totalTime + "s后重新发送";
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + "s后重新发送";
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.content = "重新发送验证码";
          this.totalTime = 60;
          this.canClick = true; //这里重新开启
        }
      }, 1000);
    },
    verifyInvite() {
      if (this.params.srcFrom == "") {
        this.toast.textValue = "邀请码不能为空";
        this.toast.showValue = true;
      } else {
        let invitCode = {};
        invitCode.invitationCode = this.params.srcFrom;
        this.$api
          .invitationCode(invitCode)
          .then(res => {
            if (res.data.code == 0) {
              this.finishInvite = true;
            } else {
              this.params.srcFrom = "";
              this.toast.textValue = "请输入正确的链接地址，进行注册";
              this.toast.showValue = true;
            }
          })
          .catch(err => {
            this.params.srcFrom = "";
            this.toast.textValue = "请输入正确的链接地址，进行注册";
            this.toast.showValue = true;
          });
      }
    }
  },
  data() {
    return {
      Id:0,
      userInfo: {
        type: Object
      },
      finishInvite: false,
      toast: {
        showValue: false,
        textValue: "成功"
      },
      content: "发送验证码", // 按钮里显示的内容
      totalTime: 60, //记录具体倒计时时间
      canClick: true, //添加canClick
      params: {
        account: "",
        psw: "",
        spsw: "",
        code: "",
        srcFrom: ""
      }
    };
  },
  created() {
    this.Id = this.$route.params.Id;
    this.params.srcFrom = this.Id;
  },
  mounted() {
    // 设置公共头部
    this.setPublicHeaderStatus({
      isShow: true, //是否显示公共头部
      backgroundClass: "bgColorRed", //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
      leftShow: true, //左侧区域是否显示
      leftShowType: "icon", //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
      leftContent: "", //showType为other时，要在左侧显示的内容
      centerShowType: "text", //text：在content中输入纯文字；img：在content中输入图片路径；
      centerContent: "注册", //中间区域内容
      centerContentClass: "", //中间区域样式类名
      rightShow: false, //右侧区域是否显示
      rightShowType: "text", //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
      rightContent: "", //要在右侧显示的内容
      rightContentClass: "", //右侧内容样式类名
      rightTumpLink: "" //点击右侧跳转链接
    });
    // 设置公共底部
    this.setBottomNavigation({
      activeNum: this.publicInfo.bottomNavigation.activeNum, //当前选中的底部导航下标
      show: false //是否显示底部导航
    });
  }
};
</script>
<style>
* {
  touch-action: none;
}

.sign .weui-cells {
  margin-top: 0;
  font-size: 32px;
  background-color: #f4f4f4;
}

.sign .weui-input {
  font-size: 32px;
  color: #666;
}

.msgcodeWrap .weui-input {
  width: 200px;
}

.sign .weui-cells:before {
  border-top: 0;
}

.sign .msgcodeWrap {
  position: relative;
}

.sign .disabled {
  background-color: #ddd;
  border-color: #ddd;
  color: #57a3f3;
  cursor: not-allowed;
}

.weui-cell:before {
  border-top: 0 !important;
}

.sign .weui-cells:after {
  border-bottom: 0;
}

.sign .vux-x-input {
  width: 600px;
  height: 60px;
  margin-top: 36px;
  margin-left: 60px;
  border-bottom: 1px solid rgba(169, 169, 169, 1);
}

.sign .weui-cell__hd img {
  width: 40px;
  height: 40px;
  padding-right: 30px;
}

.sign button.weui-btn,
input.weui-btn {
  height: 88px;
  background-color: #d91f37;
  color: #fff;
  font-size: 32px;
}

.msgcodeWrap .verifyCode .weui-cell__ft {
  display: none;
}

.sign .verifyCode {
  display: inline-block;
  width: 360px;
}

.sign .verifyCode > div {
  display: inline-block;
}

.sign .verifyCode img {
  vertical-align: middle;
}

span.sentMsg {
  display: inline-block;
  position: absolute;
  margin-left: 30px;
  margin-top: 30px;
  width: 210px;
  height: 60px;
  background-color: #d91f37;
  border-radius: 5px;
  text-align: center;
  line-height: 60px;
  color: #fff;
  font-size: 26px;
}

/*登录提示信息框框及字体大小修改*/
.sign .vux-toast .weui-toast {
  padding: 5px 8px;
  width: 240px !important;
}

.sign .vux-toast .weui-toast .weui-toast__content {
  font-size: 30px;
}

/*输入框右侧小图标样式修改*/
.sign .vux-x-input .weui-cell__ft .weui_icon_warn:before,
.sign .vux-x-input .weui-cell__ft .weui_icon_clear,
.sign .vux-x-input .weui-cell__ft .weui-icon-success {
  font-size: 30px;
}
</style>
