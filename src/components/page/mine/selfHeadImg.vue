<template>
  <div class="selfHeadImg">
    <div>
      <img v-model="show" :class=" activeIndex == index ? 'active'  : '' " v-for="(item, index) in list" :key='index' :src="item" width="100" @click="choice(index)">
    </div>
      <div v-transfer-dom>
        <confirm v-model="show" :title="'确认使用选中图片'" @on-cancel="onCancel" @on-confirm="onConfirm">
        </confirm>
      </div>
      <toast v-model="toast.showValue" type="text" :time="1200" is-show-mask position="middle">{{toast.textValue }}</toast>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Confirm, TransferDom, Toast } from 'vux'

export default {
  components: {
    Confirm,
    Toast
  },
  directives: {
    TransferDom
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    logIndexChange(arg) {},
    choice(index) {
      this.activeIndex = index
      this.show = true
    },
    onCancel() {},
    onConfirm() {
      let headerindex = this.activeIndex + 1;
      let nameDate = {
        handUrl: 'header' + headerindex + '.jpg'
      }
      this.$api.modify(nameDate).then(res => {
        /*请求成功后的操作*/
        let _this = this
        if (res.data.code == 0) {
          this.toast.textValue = '修改成功！';
          this.toast.showValue = true;

          let localimg = JSON.parse(localStorage.getItem("publicInfo"));
              localimg.userInfo.handUrl = nameDate.handUrl;
              localStorage.setItem("publicInfo", JSON.stringify(localimg));
          this.$store.state.publicInfo.userInfo.handUrl = localimg.userInfo.handUrl;
          // let localimg = JSON.parse(localStorage.getItem("publicInfo"));
          // console.log(localimg.userInfo.handUrl)
          // localimg.userInfo.handUrl = this.nameDate.handUrl;
          // localStorage.setItem("publicInfo", JSON.stringify(localimg));
          // this.$store.state.publicInfo.userInfo.handUrl = localimg.userInfo.handUrl;
          setTimeout(function() {
            _this.$router.push({ path: `/page/mine/selfControl${_this.Id}` })
          }, 1200)
        } else {
          this.toast.textValue = res.message
          this.toast.showValue = true
        }
      }).catch(err => {
        /*请求失败后的操作*/
      })
    }
  },
  data() {
    return {
      Id:0,
      userInfo: {
        type: Object
      },
      show: false,
      activeIndex: '',
      list: [],
      toast: {
        showValue: false,
        textValue: '成功',
      },
      options: {
        getThumbBoundsFn(index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
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
      centerContent: 'src/assets/img/titleHeaderImg/ModifyTheUserAvatar.png', //中间区域内容
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
  created() {
    this.Id = this.$route.params.Id;
    let imgList = []
    for (let i = 1; i <= 100; i++) {
      let imgsrc = 'src/assets/img/header/header' + i + '.jpg'
      imgList.push(imgsrc)
    }
    this.list = imgList
  }

}

</script>
<style>
.selfHeadImg div {
  padding: 20px;
}

.selfHeadImg img {
  display: inline-block;
  width: 140px;
  height: 140px;
}

.selfHeadImg img.active {
  border: 5px solid #d22134;
  width: 130px;
  height: 130px;

}

</style>
