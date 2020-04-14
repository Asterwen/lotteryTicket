<template>
  <!-- 登陆后修改密码 -->
  <div class="forget">
    <group>
      <x-input :max="16" v-model='params.ypsw' placeholder="请输入登录密码" keyboard="text">
        <img slot="label" src="../../../assets/img/55.png">
      </x-input>
        <x-input :max="16" v-model='params.psw' placeholder="请输入新密码" keyboard="text" type="password">
          <img slot="label" src="../../../assets/img/55.png">
      </x-input>
          <x-input :max="16" v-model='params.spsw' :equal-with="params.psw" placeholder="请重复输入新密码" keyboard="text" type="password">
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
  data() {
    return {
      Id:0,
      userInfo: {
        type: Object
      },
      toast: {
        showValue: false,
        textValue: ''
      },
      params: {
        ypsw: '',
        psw: '',
        spsw: ''
      },
    }
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
      for (let i in this.params) {
        if (this.params[i] == '') {
          this.toast.textValue = '修改信息不能为空'
          this.toast.showValue = true
          return false
        }
      }
      let _this = this
      // console.log(this.params)
      let datalist = this.params
      this.$api.logForget(datalist).then(res => {
        /*请求成功后的操作*/
        if (res.code == 0) {
          this.toast.textValue = '修改成功！'
          this.toast.showValue = true
          setTimeout(function() {
            _this.$router.push({ path: '/page/mine/selfCountSafe' })
          }, 1200)
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
  mounted() {
    // 设置公共头部
    this.setPublicHeaderStatus({
      isShow: true, //是否显示公共头部
      backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
      leftShow: true, //左侧区域是否显示
      leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
      leftContent: '', //showType为other时，要在左侧显示的内容
      centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
      centerContent: 'src/assets/img/titleHeaderImg/ChangePassword.png', //中间区域内容
      centerContentClass: 'titleHeaderImg', //中间区域样式类名
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

.forget .weui-cells {
  margin-top: 0;
  background-color: #f4f4f4;
}

.forget .weui-input {
  font-size: 30px;
}

.forget .msgcodeWrap {
  position: relative;
}

.forget .weui-cells:before {
  border-top: 0;
}

.weui-cell:before {
  border-top: 0 !important;
}

.forget .weui-cells:after {
  border-bottom: 0;
}

.forget .vux-x-input {
  /*font-size: 28px;*/
  width: 600px;
  height: 60px;
  margin-top: 36px;
  margin-left: 60px;
  border-bottom: 1px solid rgba(169, 169, 169, 1);
}

.forget .disabled {
  background-color: #ddd;
  border-color: #ddd;
  color: #57a3f3;
  cursor: not-allowed;
}

.forget .weui-cell__hd img {
  width: 40px;
  height: 40px;
  padding-right: 30px;
}

.forget button.weui-btn,
input.weui-btn {
  height: 88px;
  background-color: rgba(194, 29, 43, 1);
  color: #fff;
  font-size: 32px;
}

.forget .verifyCode {
  display: inline-block;
  width: 380px;
}

.forget .verifyCode>div {
  display: inline-block;
}

.forget .verifyCode img {
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
