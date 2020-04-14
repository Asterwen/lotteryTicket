<template>
  <!-- 修改昵称-->
  <div class="selfNike">
    <group>
      <x-input :max="11" title='新昵称 :' v-model="params.nickName" keyboard="text">
      </x-input>
    </group>
    <box gap="30px 30px">
      <x-button type="primary" @click.native='changNike()'>确定</x-button>
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
    changNike() {
      // console.log(this.params)
      for (let i in this.params) {
        if (this.params[i] == '') {
          this.toast.textValue = '昵称不能为空'
          this.toast.showValue = true
          return false
        }
      }
      this.$api.modify(this.params).then(res => {
        /*请求成功后的操作*/
        let _this = this
        if (res.data.code == 0) {
          this.toast.textValue = '修改成功！'
          this.toast.showValue = true
          // console.log(res)
          let localNike = JSON.parse(localStorage.getItem("publicInfo"));
          localNike.userInfo.nickName = this.params.nickName
          localStorage.setItem("publicInfo", JSON.stringify(localNike));
          this.$store.state.publicInfo.userInfo.nickName = localNike.userInfo.nickName;
          setTimeout(function() {
            _this.$router.push({ path: `/page/mine/selfControl${_this.Id}` })
          }, 1200)
        } else {
          this.toast.textValue = res.message
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
      Id:0,
      userInfo: {
        type: Object
      },
      toast: {
        showValue: false,
        textValue: ''
      },
      params: {
        nickName: ''
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
      centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
      centerContent: 'src/assets/img/titleHeaderImg/ModifyNickname.png', //中间区域内容
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

.selfNike .weui-cells {
  margin-top: 0;
  background-color: #F4F4F4;

}

.selfNike .msgcodeWrap {
  position: relative;
}

.selfNike .weui-cells:before {
  border-top: 0;
}

.weui-cell:before {
  border-top: 0 !important;
}

.selfNike .weui-cells:after {
  border-bottom: 0;
}

.selfNike .weui-label {
  font-size: 30px;
}

.selfNike .vux-x-input {
  width: 600px;
  height: 60px;
  margin-top: 36px;
  margin-left: 60px;
  border-bottom: 1px solid rgba(169, 169, 169, 1);
}

.selfNike .weui-input {
  font-size: 30px;
}

.selfNike button.weui-btn,
input.weui-btn {
  height: 88px;
  background-color: rgba(194, 29, 43, 1);
  color: #fff;
  font-size: 32px;
}

</style>
