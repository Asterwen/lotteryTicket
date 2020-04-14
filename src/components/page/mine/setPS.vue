<template>
  <!-- 设置用户身份 提现密码 -->
  <div class="setPs">
    <group>
      <x-input :max="8" title="真实姓名:" v-model='params.realName' placeholder="用户真实姓名" keyboard="text">
      </x-input>
      <x-input :max="18" title="身份证号:" v-model='params.idCard' placeholder="请输入身份证号" keyboard="text">
      </x-input>
      <x-input :min="4" :max="4" title="安全密码:" v-model='params.psw' placeholder="请输入新密码
" keyboard="text" type="password">
      </x-input>
      <x-input :min="4" :max="4" title="确认密码:" v-model='params.spsw' :equal-with="params.psw" placeholder="请重复输入新密码" keyboard="text" type="password">
      </x-input>
    </group>
    <box gap="30px 30px">
      <x-button @click.native='changPW()'>确定</x-button>
    </box>
    <div class="attention">
      <h2>注意事项:</h2>
      <ul>
        <li>1.请务必如实填写“真实姓名”和“身份证号”，这两个信息必须和身份证上的内容完全一致，这是领取大奖时的重要凭证（其他证件无效），请真实填写，否则无法领奖。</li>
        <li>2.依据《彩票管理条例》的规定，未成年人不能购买彩票。</li>
        <li>3.购买彩票是个人行为，请保证以上信息是您个人的真实信息，不要使用公司或他人的信息。</li>
        <li>4.如果您确有修改身份信息的需要，请在客服办公时间联系客服，提供相关资料，修改。</li>
      </ul>
    </div>
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
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation", "setUserInfo"]),
    changPW() {
      for (let i in this.params) {
        if (this.params[i] == '') {
          this.toast.textValue = '修改信息不能为空'
          this.toast.showValue = true
          return false
        }
      }
      let _this = this
      let datalist = this.params
      this.$api.setTradePassWord(datalist).then(res => {
        /*请求成功后的操作*/
        if (res.data.code == 0) {
          this.toast.textValue = '修改成功！'
          this.toast.showValue = true
          _this.publicInfo.payAble = true
          this.setUserInfo({
            payAble: true,
            id: _this.publicInfo.userInfo.id, //用户id
            realName: _this.params.realName, //真实姓名
            nickName: _this.publicInfo.userInfo.nickName, //用户昵称
            phone: _this.publicInfo.userInfo.phone, //手机号
            handUrl: _this.publicInfo.userInfo.handUrl, //用户头像
            card: _this.publicInfo.userInfo.card, // 0是有银行卡  1是没有银行卡
            identityNum: _this.publicInfo.userInfo.identityNum, //实名认证身份证号码
            isAngent: _this.publicInfo.userInfo.isAngent, //0是用户，1是代理，用于判断是否显示代理中心
          })
          let backLink = this.publicInfo.operationPageLink.normalArr[this.publicInfo.operationPageLink.normalArr.length - 2];
          this.$router.push({ 'path': backLink })
        } else {
          // console.log(res);
          this.toast.textValue = res.data.message
          this.toast.showValue = true
        }
      }).catch(err => {
        console.log(err);
        /*请求失败后的操作*/
      })
    },


  },
  data() {
    return {
      userInfo: {
        type: Object
      },
      toast: {
        showValue: false,
        textValue: ''
      },
      params: {
        realName: '',
        idCard: '',
        psw: '',
        spsw: ''
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
      centerContent: '设置支付密码', //中间区域内容
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
  },
}

</script>
<style>
* {
  touch-action: none;
}

.setPs .weui-cells {
  margin-top: 0;
}

.setPs .weui-input {
  font-size: 30px;
}

.setPs .msgcodeWrap {
  position: relative;
}

.setPs .weui-label {
  font-size: 30px;
}

.setPs .weui-cells:before {
  border-top: 0;
}

.weui-cell:before {
  border-top: 0 !important;
}

.setPs .weui-cells:after {
  border-bottom: 0;
}

.setPs .vux-x-input {
  /*font-size: 28px;*/
  width: 600px;
  height: 60px;
  margin-top: 36px;
  margin-left: 60px;
  border-bottom: 1px solid rgba(169, 169, 169, 1);
}

.setPs .disabled {
  background-color: #ddd;
  border-color: #ddd;
  color: #57a3f3;
  cursor: not-allowed;
}

.setPs .weui-cell__hd img {
  width: 40px;
  height: 40px;
  padding-right: 30px;
}

.setPs button.weui-btn,
input.weui-btn {
  height: 88px;
  background-color: #d91f37;
  color: #fff;
  font-size: 32px;
}

.setPs .verifyCode {
  display: inline-block;
  width: 380px;
}

.setPs .verifyCode>div {
  display: inline-block;
}

.setPs .verifyCode img {
  vertical-align: middle;
}

.setPs .attention {
  padding: 50px 60px 40px 60px;
}

.setPs .attention h2 {
  font-size: 30px;
  font-weight: normal;
  color: #d91f37;
}

.setPs .attention li {
  font-size: 26px;
  line-height: 40px;
  text-indent: 40px;
}

a.sentMsg {
  display: inline-block;
  position: absolute;
  margin-left: 30px;
  margin-top: 30px;
  width: 190px;
  height: 60px;
  background-color: #d91f37;
  border-radius: 5px;
  text-align: center;
  line-height: 60px;
  color: #fff;
}

</style>
