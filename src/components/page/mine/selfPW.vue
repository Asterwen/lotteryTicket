<template>
  <!-- 修改支付密码 -->
  <div class="changepay">
    <group>
      <x-input :max="11" v-model="params.account" disabled keyboard="number" is-type="china-mobile">
        <img slot="label" src="../../../assets/img/geren2.png">
      </x-input>
        <div class="msgcodeWrap">
          <x-input class="verifyCode" v-model='params.code' :max="4" placeholder="验证码" keyboard="number">
            <img slot="label"src="../../../assets/img/66.png">
      </x-input><a  class="sentMsg" :class="{disabled: !this.canClick}" @click="getVerifyCode()">{{content}}</a>
        </div>
        <x-input :max="4" v-model='params.psw' placeholder="请输入新密码" keyboard="text" type="password">
          <img slot="label" src="../../../assets/img/55.png">
      </x-input>
          <x-input :max="4" v-model='params.spsw' :equal-with="params.psw" placeholder="请重复输入新密码" keyboard="text" type="password">
            <img slot="label" src="../../../assets/img/55.png" >
      </x-input>
    </group>
    <box gap="30px 30px">
      <x-button @click.native='changPW()'>确定</x-button>
    </box>
    <toast v-model="toast.showValue" type="text" :time="1200" is-show-mask position="middle">{{toast.textValue }}</toast>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Group, XInput, XButton, Box, Toast } from 'vux'

export default {
  components: {
    Group,
    XInput,
    XButton,
    Box,
    Toast
  },
  created(){
    this.Id = this.$route.params.Id;
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    changPW() {
      // console.log(this.params.psw);
      let str = this.params.psw;
      if(!/^[0-9]+$/.test(str)){
        this.params.psw = '';
        this.toast.textValue = '请输入数字密码'
        this.toast.showValue = true;
        return false
      }
      for (let i in this.params) {
        if (this.params[i] == '') {
          this.toast.textValue = '信息不能为空'
          this.toast.showValue = true
          return false
        }
      }
      let _this = this
      this.$api.tradePassWorde(this.params).then(res => {
        /*请求成功后的操作*/
        if (res.data.code == 0) {
          this.toast.textValue = '修改成功！'
          this.toast.showValue = true
          setTimeout(function() {
            _this.$router.push({ path: `/page/mine/selfCountSafe${_this.Id}` })
            // window.history.go(-1)
          }, 1200)
        } else {
          this.toast.textValue = res.data.message
          this.toast.showValue = true
        }
      }).catch(err => {
        console.log(err);
        /*请求失败后的操作*/
      })
    },
    getVerifyCode() {
      let signCode = {};
      signCode.type = '2';
      signCode.smsType = '2';
      let phoneNumber = this.params.account;
      signCode.mobile = phoneNumber;
        this.$api.code(signCode).then(res => {
          this.countDown();
        }).catch(err => {
          this.canClick = true;
        })
    },
    countDown() {
      if (!this.canClick) return //改动的是这两行代码
      this.canClick = false
      this.content = this.totalTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 60
          this.canClick = true //这里重新开启
        }
      }, 1000)
    },
  },
  data() {
    return {
      Id:0,
      userInfo: {
        type: Object
      },
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 60, //记录具体倒计时时间
      canClick: true, //添加canClick
      toast: {
        showValue: false,
        textValue: '成功'
      },
      params: {
        account: '17091002312',
        psw: '',
        spsw: '',
        code: '',
        type: '1'
      },
    }
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
      centerContent: '修改安全密码', //中间区域内容
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
    this.params.account = this.publicInfo.userInfo.phone;
  },
}

</script>
<style>
* {
  touch-action: none;
}

.changepay .weui-cells {
  margin-top: 0;
  background-color: #f4f4f4;
}

.changepay .weui-input {
  font-size: 28px;
}

.msgcodeWrap .weui-input {
  width: 200px;
}

.changepay .msgcodeWrap {
  position: relative;
}

.changepay .weui-cells:before {
  border-top: 0;
}

.weui-cell:before {
  border-top: 0 !important;
}

.changepay .weui-cells:after {
  border-bottom: 0;
}

.changepay .vux-x-input {
  width: 600px;
  height: 60px;
  margin-top: 36px;
  margin-left: 60px;
  border-bottom: 1px solid rgba(169, 169, 169, 1);
}

.changepay .disabled {
  background-color: #ddd;
  border-color: #ddd;
  color: #57a3f3;
  cursor: not-allowed;
}

.changepay .weui-cell__hd img {
  width: 40px;
  height: 40px;
  padding-right: 30px;
}

.msgcodeWrap .verifyCode .weui-cell__ft {
  display: none;
}

.changepay button.weui-btn,
input.weui-btn {
  height: 88px;
  background-color: rgba(194, 29, 43, 1);
  color: #fff;
  font-size: 32px;
}

.changepay .verifyCode {
  display: inline-block;
  width: 380px;
}

.changepay .verifyCode>div {
  display: inline-block;
}

.changepay .verifyCode img {
  vertical-align: middle;
}

a.sentMsg {
  display: inline-block;
  position: absolute;
  margin-left: 30px;
  margin-top: 30px;
  width: 190px;
  height: 60px;
  background-color: rgba(194, 29, 43, 1);
  border-radius: 5px;
  text-align: center;
  line-height: 60px;
  color: #fff;
}

</style>
