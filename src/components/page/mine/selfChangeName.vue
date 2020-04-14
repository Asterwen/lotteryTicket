<template>
  <div class="selfChangeName">
    <group>
      <x-input title="设置昵称:" :max="11" placeholder="请输入。。" keyboard="text"></x-input>
    </group>
    <box gap="30px 30px">
      <x-button @click.native='selfChangeName'>提交</x-button>
    </box>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Group, XInput, XButton, Box } from 'vux'

export default {
  components: {
    Group,
    XInput,
    XButton,
    Box
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    selfChangeName() {
      // console.log(this.params);
      this.$api.selfChangeName(this.params).then(res => {
        /*请求成功后的操作*/
      }).catch(err => {
        console.log(err);
        /*请求失败后的操作*/
      })
    }
  },
  data() {
    return {
      userInfo: {
        type: Object
      },
      params: {
        account: 17091002312,
        psw: 123
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

.selfChangeName .weui-cells {
  margin-top: 0;
}

.selfChangeName .weui-cells:before {
  border-top: 0;
}

.selfChangeName .weui-label {
  font-size: 30px;
}

.weui-cell:before {
  border-top: 0 !important;
}

.selfChangeName .weui-cells:after {
  border-bottom: 0;
}

.selfChangeName .vux-x-input {
  /*width: 600px;*/
  height: 60px;
  /*margin-top: 36px;*/
  /*margin-left: 60px;*/
  /*color: rgba(169,169,169,1);*/
  /*border-bottom: 1px solid rgba(230,230,230,1);*/
}

.selfChangeName .weui-input {
  font-size: 24px;
  color: #999;
}

.selfChangeName button.weui-btn,
input.weui-btn {
  height: 88px;
  background-color: rgba(194, 29, 43, 1);
  color: #fff;
  font-size: 32px;
}

</style>
