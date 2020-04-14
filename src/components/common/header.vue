<!-- 公共头部组件，适用范围《左侧为返回上一页，中间无交互效果，右侧直接跳转链接》-->
<template>
  <div class="headerBox">
    <header :class="publicHeaderStatus.backgroundClass" v-if="publicHeaderStatus.isShow">
      <div class="backBox" v-show="publicHeaderStatus.leftShow" @click="clickBack">
        <x-icon type="ios-arrow-back" size="30" v-if="publicHeaderStatus.leftShowType=='icon'"></x-icon>
        <span v-else-if="publicHeaderStatus.leftShowType=='text'">返回</span>
        <span v-else-if="publicHeaderStatus.leftShowType=='other'" v-html="publicHeaderStatus.leftContent"></span>
      </div>
      <div class="centerBox">
        <span v-if="publicHeaderStatus.centerShowType=='text'" v-text="publicHeaderStatus.centerContent" :class="publicHeaderStatus.centerContentClass"></span>
        <img v-else-if="publicHeaderStatus.centerShowType=='img'" :class="publicHeaderStatus.centerContentClass" :src="publicHeaderStatus.centerContent" alt="">
      </div>
        <div class="moreBox" v-show="publicHeaderStatus.rightShow" @click="clickMore">
          <span v-if="publicHeaderStatus.rightShowType=='text'" v-text="publicHeaderStatus.rightContent" :class="publicHeaderStatus.rightContentClass"></span>
          <img v-else-if="publicHeaderStatus.rightShowType=='img'" :class="publicHeaderStatus.rightContentClass" :src="publicHeaderStatus.rightContent" alt="">
          <span v-else-if="publicHeaderStatus.rightShowType=='other'" :class="publicHeaderStatus.rightContentClass" v-html="publicHeaderStatus.rightContent"></span>
        </div>
    </header>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: 'app-header',
  components: {},
  data() {
    return {
      Id:0
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
    publicHeaderStatus: function() {
      return this.publicInfo.publicHeaderStatus;
    },
    operationPageLink: function() {
      return this.publicInfo.operationPageLink;
    },
  },
  methods: {
    ...mapActions(["setOperationPageLink"]),
    clickMore() {
      this.$router.push({ path: this.publicHeaderStatus.rightTumpLink });
    },
    clickBack() {
      let link = '';
      let type = this.operationPageLink.type; //当前历史路由状态
      let normalArr = this.operationPageLink.normalArr;
      let specialArr = this.operationPageLink.specialArr;
      if (type == 'normal') {
        normalArr.pop();
        if (normalArr.length == 0) {
          link = `/page/index${this.Id}`;
        } else {
          link = normalArr[normalArr.length - 1]
        }
      } else if (type == 'special') {
        specialArr.pop();
        if (specialArr.length == 0) {
          type = 'normal';
          link = normalArr[normalArr.length - 1]
        } else {
          link = specialArr[specialArr.length - 1]
        }
      }
      // 设置历史路由
      this.setOperationPageLink({
        type: type,
        normalArr: normalArr,
        specialArr: specialArr,
      })
      this.$router.push({ path: link });
    },
  },
  props: [],
  created() {
    this.Id = this.$route.params.Id;
  },
  mounted() {}
}

</script>
<style>
.headerBox header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  height: 92px;
  background: red;
  width: 100%;
  text-align: center;
}

.headerBox header.bgImg {
  background: url(../../assets/img/k3_bbg2.png) no-repeat center bottom;
}

.headerBox header.bgColorRed {
  background: #d91f37;
}

.headerBox header.bgColorBlack {
  background: #1B1B1B;
}

/*左侧区域*/
.headerBox header .backBox {
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

.headerBox header .backBox span {
  padding-left: 30px;
}

.headerBox header .backBox .vux-x-icon {
  fill: #FFF;
  margin-top: 16px;
  margin-left: 12px;
}

/*中间区域*/
.headerBox header .centerBox {
  display: inline-block;
  width: auto;
  height: 92px;
  line-height: 92px;
  font-size: 44px;
  font-family: 'PingFang-SC-Medium';
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.headerBox header .centerBox .titlelogo {
  width: 172px;
  height: 42px;
  vertical-align: middle;
}
.headerBox header .centerBox .titleHeaderImg{
  width: 350px;
  height: 46px;
  vertical-align: middle;
}
/*右侧区域*/
.headerBox header .moreBox {
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

.headerBox header .moreBox .indexRightHead {
  width: 38px;
  height: 44px;
  vertical-align: middle;
}

</style>
