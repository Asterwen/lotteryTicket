<template>
  <div class="historyBox">
    <div class="everyoneBox" v-for="(item,key) in hidstoryData" :key="key" @click="clickTypeHistory(item)">
      <div class="leftBox">
        <p class="titleBox"><span>{{item.name}}</span>第{{item.issue}}期 {{item.date}}</p>
        <div class="contentBox">
          <div class="quickThreeBox" v-if="item.gameType.indexOf('fast3') != -1">
            <div class="imgBox"><img :src="'src/assets/img/b'+item.num.split('-')[0]+'.png'" alt=""><img :src="'src/assets/img/b'+item.num.split('-')[1]+'.png'" alt=""><img :src="'src/assets/img/b'+item.num.split('-')[2]+'.png'" alt=""></div>
              <p>和值 {{item.biao}}</p>
            </div>
            <div class="timeHonoredBox" v-if="item.gameType.indexOf('fast3') == -1">
              <div class="imgBox">
                <span v-for="(item1,key1) in item.num.split('-')" :key="key1">{{item1}}</span>
              </div>
              <p>{{item.biao}}</p>
            </div>
          </div>
        </div>
        <span class="rightBox"><x-icon type="ios-arrow-right" size="36"></x-icon></span>
      </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      Id:0,
      hidstoryData: []
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    loadHidstoryData() {
      this.$api.getLotterying().then(res => {
        if (res.data.code == 0) {
          let dataArr = res.data.data;
          this.hidstoryData = dataArr;
        } else {
          // console.log(res.data.message)
        }
      }).catch(err => {
        console.log(err);
      })
    },
    clickTypeHistory(item) {
      window.localStorage.setItem('historyKey', item.name + ',' + item.gameType);
      this.$router.push({ path: `/page/history/typeHistory${this.Id}` })
    },
  },
  created() {
    this.Id = this.$route.params.Id;
    this.loadHidstoryData()
  },
  mounted() {
    // 设置公共头部
    this.setPublicHeaderStatus({
      isShow: true, //是否显示公共头部
      backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
      leftShow: false, //左侧区域是否显示
      leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
      leftContent: '', //showType为other时，要在左侧显示的内容
      centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
      centerContent: 'src/assets/img/titleHeaderImg/LotteryRecord.png', //中间区域内容
      centerContentClass: 'titleHeaderImg', //中间区域样式类名
      rightShow: false, //右侧区域是否显示
      rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
      rightContent: '', //要在右侧显示的内容
      rightContentClass: '', //右侧内容样式类名
      rightTumpLink: '', //点击右侧跳转链接
    });
    // 设置公共底部
    this.setBottomNavigation({
      activeNum: 1, //当前选中的底部导航下标
      show: true, //是否显示底部导航
    });
  },
}

</script>
<style>
.historyBox {
	height: 100%;
  background: #f4f4f4;
  overflow: scroll;
}

.historyBox .everyoneBox {
  height: 150px;
  padding: 20px 10px 25px 30px;
  background: #fff;
  margin-bottom: 2px;
  position: relative;
}

.historyBox .everyoneBox .leftBox {
  height: 150px;
}

.historyBox .everyoneBox .leftBox .titleBox {
  font-size: 24px;
  color: #999999;
  margin-bottom: 20px;
}

.historyBox .everyoneBox .leftBox .titleBox span {
  font-size: 30px;
  color: #333333;
  margin-right: 14px;
}

/*快三*/
.historyBox .everyoneBox .leftBox .contentBox .quickThreeBox .imgBox {
  width: 245px;
  height: 85px;
  background: rgba(25, 96, 59, 1);
  border-radius: 10px;
  float: left;
  margin-right: 29px;
  line-height: 85px;
  text-align: center;
}

.historyBox .everyoneBox .leftBox .contentBox .quickThreeBox .imgBox img {
  width: 44px;
  height: 44px;
  vertical-align: middle;
  margin: 0 10px;
}

.historyBox .everyoneBox .leftBox .contentBox .quickThreeBox p {
  font-size: 30px;
  color: #333;
  line-height: 85px;
}

/*时时彩，十一选五*/
.historyBox .everyoneBox .leftBox .contentBox .timeHonoredBox .imgBox {
  float: left;
  margin-right: 10px;
}

.historyBox .everyoneBox .leftBox .contentBox .timeHonoredBox .imgBox span {
  width: 70px;
  height: 70px;
  display: inline-block;
  background: #d91f37;
  line-height: 70px;
  text-align: center;
  border-radius: 50%;
  font-size: 32px;
  color: #fff;
  margin-right: 10px;
}

.historyBox .everyoneBox .leftBox .contentBox .timeHonoredBox p {
  font-size: 30px;
  color: #333;
  line-height: 70px;
}

/*右侧箭头*/
.historyBox .everyoneBox .rightBox {
  position: absolute;
  right: 10px;
  top: 60px;
}

.historyBox .everyoneBox .rightBox .vux-x-icon {
  vertical-align: middle;
  fill: #999999;
}

</style>
