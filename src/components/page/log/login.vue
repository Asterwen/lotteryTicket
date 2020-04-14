<template>
  <!-- 登陆页面 -->
  <div class="login">
    <group>
      <x-input :max="11" placeholder="请输入手机号码" v-model="loginForm.account" keyboard="number" is-type="china-mobile">
        <img slot="label" style="padding-right:10px;display:block;" src="../../../assets/img/geren2.png" width="24" height="24">
      </x-input>
        <x-input :max="16" placeholder="请输入登录密码" v-model="loginForm.psw" keyboard="text" type="password">
          <img slot="label" style="padding-right:10px;display:block;" src="../../../assets/img/55.png" width="24" height="24">
      </x-input>
    </group>
    <box gap="30px 30px">
      <x-button @click.native='loginNow()'>登录</x-button>
    </box>
    <div class="logElse">
      <a @click="goSign()">快速注册</a><a @click="goForget()" style="float: right;">忘记密码?</a>
    </div>
    <toast v-model="toast.showValue" type="text" :time="1200" is-show-mask position="middle">{{toast.textValue }}</toast>
  </div>
</template>
<script>
import { Group, XInput, XButton, Box, Toast } from 'vux'
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
    }),
    operationPageLink: function() {
      return this.publicInfo.operationPageLink;
    }
  },
  data() {
    return {
      loginForm: {
        account: '',
        psw: ''
      },
      toast: {
        showValue: false,
        textValue: '成功',
      },
      Id:0//页面id
    }
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setLandingStatus", "setBottomNavigation", "setUserInfo"]),
    loginNow() {
      var reg = /^1[34578]\d{9}$/;
      if (this.loginForm.account != '' && reg.test(this.loginForm.account) && this.loginForm.psw != '' && this.loginForm.psw.length < 16) {
        let params = {}
        params.account = this.loginForm.account
        params.psw = this.loginForm.psw
        // console.log(params.account)
        //  console.log(123)

        this.$api.login(params).then(res => {
          this.Id = res.data.data.invitationCode;
          // console.log(res.data.data.invitationCode,'登录邀请码')
          // console.log(res)
          // console.log("code",res.data)
          if (res.data.code == 0) {
            let token = res.data.sessionId;
            this.$store.state.publicInfo.userInfo.token = token;
            let payAvailabel = false;
            if (res.data.data.realName) {
              payAvailabel = true;
            }
             let withdrawPassword = false;
            if (res.data.data.withdrawPassword) {
              withdrawPassword = true;
            }
            let identity = ''
            if (res.data.data.identityNum) {
              identity = res.data.data.identityNum;
              let rest = identity.substr(2, 14);
              // identity = identity.replace(rest, '************');
            }
            let realname = ''
            if (res.data.data.realName) {
              realname = res.data.data.realName;
              let hideName = realname.substr(1);
              // realname = realname.replace(hideName, '**');
            }
            let phonenum = ''
            if (res.data.data.phone) {
              phonenum = res.data.data.phone;
              let hidephone = phonenum.substr(3, 4);
            //  phonenum = phonenum.replace(hidephone, '****')
            }
            // 设置登陆状态
            this.setLandingStatus(true)
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
              card: res.data.data.comments2Î,
              identityNum: identity,
              isAngent: res.data.data.isAngent,
            })
            localStorage.setItem("publicInfo", JSON.stringify(this.publicInfo));
            localStorage.setItem("Id",res.data.data.invitationCode)
            this.$router.push({ path: `/page/index${this.Id}` })
          } else {
            this.toast.textValue = res.data.message
            this.toast.showValue = true
          }
        }).catch(err => {
          this.toast.textValue = '账号或者密码错误!'
            this.toast.showValue = true
        })
      } else {
        this.toast.textValue = '登录信息不正确'
        this.toast.showValue = true
      }
    },
    goSign() {
      this.$router.push({ path: `/page/log/sign${this.Id}` })
    },
    goForget() {
      this.$router.push({ path: `/page/log/forget${this.Id}` })
    }
  },
  created() {
    // this.id = JSON.parse(localStorage.getItem('publicInfo')).userInfo.id;
    this.Id = this.$route.params.Id;
    if(this.Id == undefined || null){
      this.Id = localStorage.getItem('Id');
    }
    // console.log(this.Id);
  },
  mounted() {
    // 设置公共头部
    this.setPublicHeaderStatus({
      isShow: true, //是否显示公共头部
      backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
      leftShow: true, //左侧区域是否显示
      leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
      leftContent: '', //showType为other时，要在左侧显示的内容
      centerShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；
      centerContent: '登录', //中间区域内容
      centerContentClass: '', //中间区域样式类名
      rightShow: false, //右侧区域是否显示
      rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
      rightContent: '', //要在右侧显示的内容
      rightContentClass: '', //右侧内容样式类名
      rightTumpLink: '', //点击右侧跳转链接
    });
    // 设置公共底部
    this.setBottomNavigation({
      activeNum: this.publicInfo.bottomNavigation.activeNum, //当前选中的底部导航下标
      show: false, //是否显示底部导航
    });
  }
}

</script>
<style>
* {
  touch-action: none;
}

.login .weui-cells {
  font-size: 32px;
  margin-top: 40px;
  background-color: #f4f4f4;
}

.login .weui-input {
  color: #666;
}

.login .weui-cells:before {
  border-top: 0;
}

.weui-cell:before {
  border-top: 0 !important;
}

.login .weui-cells:after {
  border-bottom: 0;
}

.login .vux-x-input {
  width: 600px;
  height: 60px;
  margin-top: 36px;
  margin-left: 60px;
  color: rgba(169, 169, 169, 1);
  border-bottom: 1px solid rgba(230, 230, 230, 1);
}

.logElse {
  width: 600px;
  margin: 0 auto;
  color: #157EFB;
  font-size: 28px;
}

.login .weui-cell__hd img {
  width: 40px;
  height: 40px;
  padding-right: 30px;
}

.login button.weui-btn,
input.weui-btn {
  height: 88px;
  background-color: #d91f37;
  color: #fff;
  font-size: 32px;
}

/*登录提示信息框框及字体大小修改*/
.login .vux-toast .weui-toast {
  padding: 5px 8px;
  width: 240px !important;
}

.login .vux-toast .weui-toast .weui-toast__content {
  font-size: 30px;
}

/*输入框右侧小图标样式修改*/
.login .vux-x-input .weui-cell__ft .weui_icon_warn:before,
.login .vux-x-input .weui-cell__ft .weui_icon_clear {
  font-size: 30px;
}

</style>
