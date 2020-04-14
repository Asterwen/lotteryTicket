<template>
  <div class="typeHistoryBox">
    <table>
      <thead>
        <tr>
          <th>期号</th>
          <th>开奖号码</th>
          <th>和值</th>
          <th v-if="showPlay">形态</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,key) in typeHistoryData" :key="key">
          <td :style="'width:'+[item.issue.length>8?'182px':'140px']">第{{item.issue}}期&nbsp;&nbsp;{{item.date.split(' ')[1]}}</td>
          <td>{{item.num.split('-').join(" ")}}</td>
          <td :style="!showPlay?'width: 85px;':''">{{item.biao}}</td>
          <td v-if="showPlay" style="width: 85px;">{{item.play}}</td>
        </tr>
      </tbody>
    </table>
    <div class="bottomFixedBox">
      <span @click="toBetting">投注{{name}}</span>
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
      typeHistoryData: [],
      showPlay: false,
      name: '',
      gameType: '',
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    loadTypeHidstoryData(params) {
      this.$api.getLottery(params).then(res => {
        // console.log(res)
        if (res.data.code == 0) {
          let dataArr = res.data.data;
          this.typeHistoryData = dataArr;
        } else {
          alert(res.data.message)
        }
      }).catch(err => {
        console.log(err);
      })
    },
    toBetting() {
    	console.log("11111")
      window.localStorage.setItem('quick3TypeActive', 1);
      window.localStorage.setItem('gameType', this.gameType);
      this.$router.push({ path: `/quickThree${this.Id}` })
      
    },
  },
  created() {
    this.Id = this.$route.params.Id;
    let params = {};
    params.gametype = window.localStorage.getItem("historyKey").split(',')[1]
    this.gameType = params.gametype;
    if (params.gametype.indexOf('fast3') != -1) {
      this.showPlay = true;
    }
    this.loadTypeHidstoryData(params);
  },
  mounted() {
    // 设置公共头部
    let centerContent = '';
    this.name = window.localStorage.getItem("historyKey").split(',')[0]
    if (this.name == '重庆时时彩') {
      centerContent = 'src/assets/img/titleHeaderImg/ChongqingShishicai.png';
    } else if (this.name == '山东11选5') {
      centerContent = 'src/assets/img/titleHeaderImg/ShandongElevenElectionFive.png';
    } else {
      centerContent = 'src/assets/img/titleHeaderImg/' + window.localStorage.getItem("historyKey").split(',')[1] + '.png';
    }
    this.setPublicHeaderStatus({
      isShow: true, //是否显示公共头部
      backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
      leftShow: true, //左侧区域是否显示
      leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
      leftContent: '', //showType为other时，要在左侧显示的内容
      centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
      centerContent: centerContent, //中间区域内容
      centerContentClass: 'titleHeaderImg', //中间区域样式类名
      rightShow: true, //右侧区域是否显示
      rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
      rightContent: '玩法', //要在右侧显示的内容
      rightContentClass: '', //右侧内容样式类名
      rightTumpLink: `/page/history/palyRule${this.Id}`, //点击右侧跳转链接
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
.typeHistoryBox {
  background: #f4f4f4;
}

.typeHistoryBox table {
  width: 100%;
  background: #fff;
}

.typeHistoryBox table thead tr th {
  font-size: 24px;
  color: #999;
  text-align: center;
  padding: 18px 0;
  font-weight: 500;
  border-bottom: 2px solid #f4f4f4;
}

.typeHistoryBox table tbody tr td {
  font-size: 28px;
  color: #333;
  text-align: center;
  vertical-align: middle;
  padding: 36px 0;
  border-bottom: 2px solid #f4f4f4;
}

.typeHistoryBox table tbody tr td:nth-child(2) {
  color: #D91D37;
}

.typeHistoryBox .bottomFixedBox {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: #000000;
  text-align: center;
  line-height: 100px;
}

.typeHistoryBox .bottomFixedBox span {
  width: 392px;
  height: 65px;
  background: #d91f37;
  border-radius: 10px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  line-height: 65px;
  font-size: 32px;
  color: rgba(255, 255, 255, 1);
}

</style>
