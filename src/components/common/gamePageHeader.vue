<!-- 游戏页面头部组件-->
<template>
  <div class="gamePageHeaderBox">
    <header :class="operation.backgroundClass">
      <div class="backBox" @click="clickBack">
        <x-icon type="ios-arrow-back" size="30" v-if="operation.leftShowType=='icon'"></x-icon>
        <span v-else-if="operation.leftShowType=='text'">返回</span>
        <span v-else-if="operation.leftShowType=='other'" v-html="operation.leftContent"></span>
      </div>
      <div class="centerBox">
        <span class="left">玩法</span>
        <div class="right" @click="clickCenter">
          <span class="text"><span v-for="(item,key) in operation.centerContent" :key="key" v-show="item.id==operation.centerContentKey">{{item.name}}</span></span>
          <img src="src/assets/img/2.png" :class="'normalClass '+[operation.centerAlertShow==true?'inverseClass':'']" alt="">
          </div>
        </div>
        <div class="moreBox" @click="clickMore">
          <span v-if="operation.rightShowType=='text'" v-text="operation.rightContent" :class="operation.rightContentClass"></span>
          <img v-else-if="operation.rightShowType=='img'" :class="operation.rightContentClass" :src="operation.rightContent" alt="">
          <span v-else-if="operation.rightShowType=='other'" :class="operation.rightContentClass" v-html="operation.rightContent"></span>
        </div>
    </header>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: 'game-page-header',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setOperationPageLink"]),
    clickMore() {
      this.$emit('clickMore', '')
    },
    clickBack() {
      this.$emit('clickBack', '')
    },
    clickCenter() {
      this.$emit('clickCenter', '')
    }
  },
  props: ["operation"],
  created() {},
  mounted() {}
}

</script>
<style>
.gamePageHeaderBox header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 92px;
  background: red;
  width: 100%;
  text-align: center;
}

.gamePageHeaderBox header.bgImg {
  background: url(../../assets/img/k3_bbg2.png) no-repeat center bottom;
}

.gamePageHeaderBox header.bgColorRed {
  background: #d91f37;
}

.gamePageHeaderBox header.bgColorBlack {
  background: #1B1B1B;
}

/*左侧区域*/
.gamePageHeaderBox header .backBox {
  position: absolute;
  left: 0;
  top: 0;
  width: 92px;
  height: 92px;
  line-height: 92px;
  font-size: 28px;
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
  font-family: 'PingFang-SC-Regular';
}

.gamePageHeaderBox header .backBox span {
  padding-left: 30px;
}

.gamePageHeaderBox header .backBox .vux-x-icon {
  fill: #FFF;
  margin-top: 16px;
  margin-left: 12px;
}

/*中间区域*/
.gamePageHeaderBox header .centerBox {
  display: inline-block;
  width: auto;
  height: 77px;
  padding-top: 15px;
  margin-right: 20px;
}

.gamePageHeaderBox header .centerBox .left {
  display: inline-block;
  writing-mode: vertical-lr;
  font-size: 24px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  width: 66px;
  vertical-align: middle;
  text-align: center;
}

.gamePageHeaderBox header .centerBox .right {
  display: inline-block;
  width: auto;
  height: 36px;
  padding: 10px 15px;
  border: 2px solid rgba(244, 244, 244, 1);
  border-radius: 6px;
  line-height: 36px;
}

.gamePageHeaderBox header .centerBox .right .text {
  font-size: 28px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  vertical-align: middle;
}

.gamePageHeaderBox header .centerBox .right img {
  width: 23px;
  height: 20px;
  vertical-align: middle;
}

.gamePageHeaderBox header .centerBox .right img.normalClass {
  transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
  transition: transform .5s;
}

.gamePageHeaderBox header .centerBox .right img.inverseClass {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transition: transform .5s;
}

/*右侧区域*/
.gamePageHeaderBox header .moreBox {
  position: absolute;
  right: 0;
  top: 0;
  width: 62px;
  height: 92px;
  line-height: 92px;
  padding-right: 30px;
  font-size: 28px;
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
  font-family: 'PingFang-SC-Regular';
  text-align: right;
}

.gamePageHeaderBox header .moreBox .indexRightHead {
  width: 38px;
  height: 44px;
  vertical-align: middle;
}

.gamePageHeaderBox header .moreBox .configClass {
  width: 36px;
  height: 37px;
  vertical-align: middle;
}

</style>
