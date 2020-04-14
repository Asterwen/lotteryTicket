<!-- 返回特殊页面头部组件，适用范围《中间无交互效果，左右按钮点击后由页面处理事件》-->
<template>
  <div class="eventProcessingHeaderBox">
    <header :class="operation.backgroundClass">
      <div class="backBox" @click="clickBack">
        <x-icon type="ios-arrow-back" size="30" v-if="operation.leftShowType=='icon'"></x-icon>
        <span v-else-if="operation.leftShowType=='text'">返回</span>
        <span v-else-if="operation.leftShowType=='other'" v-html="operation.leftContent"></span>
      </div>
      <div class="centerBox">
        <span v-if="operation.centerShowType=='text'" v-text="operation.centerContent" :class="operation.centerContentClass"></span>
        <img v-else-if="operation.centerShowType=='img'" :class="operation.centerContentClass" :src="operation.centerContent" alt="">
      </div>
      <div class="moreBox" v-show="operation.rightShow" @click="clickMore">
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
  name: 'event-processing-header',
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
      this.$emit('clickMore', 'this.childValue')
    },
    clickBack() {
      this.$emit('clickBack', 'this.childValue')
    },
  },
  props: ["operation"],
  created() {},
  mounted() {}
}

</script>
<style>
.eventProcessingHeaderBox header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 92px;
  background: red;
  width: 100%;
  text-align: center;
}

.eventProcessingHeaderBox header.bgImg {
  background: url(../../assets/img/k3_bbg2.png) no-repeat center bottom;
}

.eventProcessingHeaderBox header.bgColorRed {
  background: #d91f37;
}

.eventProcessingHeaderBox header.bgColorBlack {
  background: #1B1B1B;
}

/*左侧区域*/
.eventProcessingHeaderBox header .backBox {
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

.eventProcessingHeaderBox header .backBox span {
  padding-left: 30px;
}

.eventProcessingHeaderBox header .backBox .vux-x-icon {
  fill: #FFF;
  margin-top: 16px;
  margin-left: 12px;
}

/*中间区域*/
.eventProcessingHeaderBox header .centerBox {
  display: inline-block;
  width: auto;
  height: 92px;
  line-height: 92px;
  font-size: 44px;
  font-family: 'PingFang-SC-Medium';
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.eventProcessingHeaderBox header .centerBox .titlelogo {
  width: 172px;
  height: 42px;
  vertical-align: middle;
}

.eventProcessingHeaderBox header .centerBox .titleHeaderImg {
  width: 350px;
  height: 46px;
  vertical-align: middle;
}

/*右侧区域*/
.eventProcessingHeaderBox header .moreBox {
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

.eventProcessingHeaderBox header .moreBox .indexRightHead {
  width: 38px;
  height: 44px;
  vertical-align: middle;
}

</style>
