<template>
  <div class='trendPageBox'>
    <div class="headerBox">
      <div class="tabBox">
        <span v-for="(item1,key1) in tabArr" :key="key1" @click="clickTab(key1)" :class="key1==tavIndex?'active':''">{{item1.name}}</span>
      </div>
      <div class="theadBox">
        <p v-for="(item2, key2) in tabArr" :key="key2" v-show="key2==tavIndex">
          <span  v-for="(item3, key3) in item2.childs" :key="key3" :class="item3.class" @click="clickFilter(item3, key3,key2)"><span>{{item3.name}}</span><b v-if="item3.isShow"><i :class="[item3.isActive&&item3.isTop?'active':'']"></i><i :class="[item3.isActive&&(!item3.isTop)?'active':'']"></i></b></span>
        </p>
      </div>
    </div>
    <swiper v-model="tavIndex" :show-dots="false" :style="'height:'+(clientHeight-180)+'px'">
      <swiper-item v-for="(item4, key4) in tabArr" :key="key4">
        <div class="contentBox">
          <p v-for="(item5,key5) in data" :key="key5" :class="key5%2==1?'write':''" v-show="item4.name!='冷热'">
            <span class="time" v-show="item4.name=='开奖'">{{item5.issue}}</span>
            <span class="number" v-show="item4.name=='开奖'">{{item5.lotteryNumber.replace(/\-/g,' ')}}</span>
            <span v-show="item4.name=='开奖'"><span class="numberBox">{{item5.lotteryNumber.split('-')[0]}}</span></span>
            <span v-show="item4.name=='开奖'"><span class="numberBox">{{item5.lotteryNumber.split('-')[1]}}</span></span>
            <span v-show="item4.name=='开奖'"><span class="numberBox">{{item5.lotteryNumber.split('-')[2]}}</span></span>
            <span class="time" v-show="item4.name=='走势'">{{item5.issue}}</span>
            <span v-for="(item6,key6) in numberArr" :key="key6" v-show="item4.name=='走势'"><span :class="[item5.lotteryNumber.split('-').indexOf(item6)==-1?'':'numberBox']">{{item5.lotteryNumber.split('-').indexOf(item6)==-1?item5.sumArr[key6]:item6}}</span></span>
          </p>
          <p v-for="(item7,key7) in hotAndColdArr" :key="key7+'-'" :class="key7%2==1?'write':''" v-show="item4.name=='冷热'">
            <span v-show="item4.name=='冷热'"><span class="numberBox">{{item7.number}}</span></span>
            <span v-show="item4.name=='冷热'">{{item7.Thirty}}</span>
            <span v-show="item4.name=='冷热'">{{item7.Fifty}}</span>
            <span v-show="item4.name=='冷热'">{{item7.Hundred}}</span>
            <span v-show="item4.name=='冷热'">{{item7.Omission}}</span>
          </p>
        </div>
      </swiper-item>
    </swiper>
    <footer>
      距<span class="nowStage" v-html="nowStage"></span>期截止：<span class="remainingTimeShow" v-html="remainingTimeShow"></span>
    </footer>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Swiper, SwiperItem } from 'vux'

export default {
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      tavIndex: 0,
      tabArr: [{
          name: '开奖',
          childs: [
            { class: 'time', name: '期号', isShow: true, isTop: true, isActive: true, code: 'issue' },
            { class: 'number', name: '开奖号码', isShow: false, isTop: true, isActive: false, code: '' },
            { class: '', name: '万位', isShow: false, isTop: true, isActive: false, code: '' },
            { class: '', name: '千位', isShow: false, isTop: true, isActive: false, code: '' },
            { class: '', name: '百位', isShow: false, isTop: true, isActive: false, code: '' },
          ],
        },
        {
          name: '走势',
          childs: [
            { class: 'time', name: '期号', isShow: true, isTop: true, isActive: true, code: 'issue' },
            { class: '', name: '01', isShow: false, isTop: true, isActive: false, code: '' },
            { class: '', name: '02', isShow: false, isTop: true, isActive: false, code: '' },
            { class: '', name: '03', isShow: false, isTop: true, isActive: false, code: '' },
            { class: '', name: '04', isShow: false, isTop: true, isActive: false, code: '' },
            { class: '', name: '05', isShow: false, isTop: true, isActive: false, code: '' },
            { class: '', name: '06', isShow: false, isTop: true, isActive: false, code: '' },
            { class: '', name: '07', isShow: false, isTop: true, isActive: false, code: '' },
            { class: '', name: '08', isShow: false, isTop: true, isActive: false, code: '' },
            { class: '', name: '09', isShow: false, isTop: true, isActive: false, code: '' },
            { class: '', name: '10', isShow: false, isTop: true, isActive: false, code: '' },
            { class: '', name: '11', isShow: false, isTop: true, isActive: false, code: '' },
          ]
        },
        {
          name: '冷热',
          childs: [
            { class: '', name: '号码', isShow: true, isTop: true, isActive: true, code: 'number' },
            { class: '', name: '30期', isShow: true, isTop: false, isActive: false, code: 'Thirty' },
            { class: '', name: '50期', isShow: true, isTop: false, isActive: false, code: 'Fifty' },
            { class: '', name: '100期', isShow: true, isTop: false, isActive: false, code: 'Hundred' },
            { class: '', name: '遗漏', isShow: true, isTop: false, isActive: false, code: 'Omission' },
          ],
        }
      ],
      data: [], //开奖数据，走势数据
      hotAndColdArr: [], //冷热数据
      numberArr: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'], //号码数组
      nowStage: '', //当前期号
      remainingTimeShow: '00:00', //当前期剩余时间
      deadlineTime: '', //服务器当前期截至时间
      remainingTime: '', //服务器返回的剩余时间
      clientHeight: '',
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    clickTab(key) {
      this.tavIndex = key;
    },
    clickFilter(item, key1, key2) {
      console.log(item)
      if (item.isShow == false) {
        return false;
      }
      if (key2 == 2) {
        let lastIsActiveKey = '';
        for (let i = 0; i < this.tabArr[2].childs.length; i++) {
          if (this.tabArr[2].childs[i].isActive == true) {
            lastIsActiveKey = i;
          }
          this.tabArr[2].childs[i].isActive = false;
        }
        this.tabArr[2].childs[key1].isActive = true;
        if (key1 == lastIsActiveKey) {
          this.tabArr[2].childs[key1].isTop = !this.tabArr[2].childs[key1].isTop;
        } else {
          this.tabArr[2].childs[key1].isTop = true;
        }
        this.hotAndColdArr.sort(this.sortArr(item.code, this.tabArr[key2].childs[key1].isTop))
      } else {
        this.tabArr[0].childs[key1].isTop = !this.tabArr[0].childs[key1].isTop;
        this.tabArr[1].childs[key1].isTop = !this.tabArr[1].childs[key1].isTop;
        this.data.sort(this.sortArr(item.code, this.tabArr[key2].childs[key1].isTop))
      }
    },
    //对象数组排序
    sortArr(field, flag) {
      return function(a, b) {
        if (flag) {
          return a[field] - b[field];
        } else {
          return b[field] - a[field];
        }
      }
    },
  },
  created() {
    let clientHeight = document.documentElement.clientHeight;
    this.clientHeight = clientHeight;
    let data = [
      { issue: '190302000', lotteryNumber: '02-07-11-04-05' },
      { issue: '190302001', lotteryNumber: '05-08-06-07-01' },
      { issue: '190302002', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302003', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302004', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302005', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302006', lotteryNumber: '05-08-06-02-11' },
      { issue: '190302007', lotteryNumber: '05-03-06-02-01' },
      { issue: '190302008', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302009', lotteryNumber: '04-08-06-02-01' },
      { issue: '190302010', lotteryNumber: '05-08-06-02-10' },
      { issue: '190302011', lotteryNumber: '05-08-06-07-01' },
      { issue: '190302012', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302013', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302014', lotteryNumber: '05-08-06-02-11' },
      { issue: '190302015', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302016', lotteryNumber: '05-10-06-02-01' },
      { issue: '190302017', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302018', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302019', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302020', lotteryNumber: '05-08-06-02-09' },
      { issue: '190302021', lotteryNumber: '05-03-06-02-01' },
      { issue: '190302022', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302023', lotteryNumber: '05-08-06-02-07' },
      { issue: '190302024', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302025', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302026', lotteryNumber: '06-08-09-02-01' },
      { issue: '190302027', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302028', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302029', lotteryNumber: '05-08-06-02-07' },
      { issue: '190302030', lotteryNumber: '02-07-11-04-05' },
      { issue: '190302031', lotteryNumber: '05-08-06-07-01' },
      { issue: '190302032', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302033', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302034', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302035', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302036', lotteryNumber: '05-08-06-02-11' },
      { issue: '190302037', lotteryNumber: '05-03-06-02-01' },
      { issue: '190302038', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302039', lotteryNumber: '04-08-06-02-01' },
      { issue: '190302040', lotteryNumber: '02-07-11-04-05' },
      { issue: '190302041', lotteryNumber: '05-08-06-07-01' },
      { issue: '190302042', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302043', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302044', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302045', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302046', lotteryNumber: '05-08-06-02-11' },
      { issue: '190302047', lotteryNumber: '05-03-06-02-01' },
      { issue: '190302048', lotteryNumber: '05-08-06-02-01' },
      { issue: '190302049', lotteryNumber: '04-08-06-02-01' },
      { issue: '190302050', lotteryNumber: '02-07-11-04-05' },
    ]
    // 计算走势
    for (let i = 0; i < data.length; i++) {
      data[i].sumArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      data[i].lotteryNumberArr = data[i].lotteryNumber.split('-');
      for (let j = 0; j < this.numberArr.length; j++) {
        if (i > 0) {
          if (data[i].lotteryNumberArr.indexOf(this.numberArr[j]) == -1) {
            data[i].sumArr[j] = data[(i - 1)].sumArr[j] + 1;
          } else {
            data[i].sumArr[j] = 0;
          }
        }
      }
    }
    // 计算冷热
    let hotAndColdArr = [];
    for (let k = 0; k < this.numberArr.length; k++) {
      let obj = {}
      obj.number = this.numberArr[k];
      obj.Thirty = 0;
      obj.Fifty = 0;
      obj.Hundred = 0;
      obj.Omission = 0;
      hotAndColdArr.push(obj)
    }
    for (let m = 0; m < data.length; m++) {
      for (let n = 0; n < this.numberArr.length; n++) {
        if (data[m].lotteryNumberArr.indexOf(this.numberArr[n]) == -1) {
          hotAndColdArr[n].Omission++
        } else {
          if (m > 0 && m <= 30) {
            hotAndColdArr[n].Thirty++
          } else if (m > 30 && m <= 50) {
            hotAndColdArr[n].Thirty++
            hotAndColdArr[n].Fifty++
          } else if (m > 50 && m <= 100) {
            hotAndColdArr[n].Thirty++
            hotAndColdArr[n].Fifty++
            hotAndColdArr[n].Hundred++
          }
        }
      }
    }
    this.hotAndColdArr = hotAndColdArr;
    this.data = data;
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
      centerContent: '', //中间区域内容
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
.trendPageBox .headerBox {
  position: fixed;
  top: 92px;
  left: 0;
  z-index: 888;
  background: #F4F2EB;
  height: 170px;
  width: 100%;
}

.trendPageBox .headerBox .tabBox {
  height: 88px;
  width: 100%;
  border-bottom: 2px solid #E2E2E2;
}

.trendPageBox .headerBox .tabBox span {
  width: 196px;
  height: 88px;
  text-align: center;
  line-height: 88px;
  display: inline-block;
  float: left;
  margin-right: 81px;
  color: #333333;
  font-size: 32px;
}

.trendPageBox .headerBox .tabBox span:nth-child(3) {
  margin-right: 0;
}

.trendPageBox .headerBox .tabBox span.active {
  border-bottom: 1px solid #DA1C36;
  color: #DA1C36;
}

.trendPageBox .headerBox .theadBox {
  padding-top: 23px;
}

.trendPageBox .headerBox .theadBox p {
  font-size: 28px;
  color: #8C837B;
  display: flex;
}

.trendPageBox .headerBox .theadBox p>span {
  flex: 1;
  text-align: center;
  border-right: 1px solid #E3E0D7;
  line-height: 35px;
}

.trendPageBox .headerBox .theadBox p>span.number {
  width: 239px;
  flex: initial;
}

.trendPageBox .headerBox .theadBox p>span.time {
  width: 171px;
  flex: initial;
}

.trendPageBox .headerBox .theadBox p>span>span {
  vertical-align: middle;
}

/*箭头*/
.trendPageBox .headerBox .theadBox p>span>b {
  display: inline-block;
  height: 25px;
  width: 19px;
  margin-left: 14px;
  vertical-align: middle;
  font-size: 0;
  line-height: 0;
}

.trendPageBox .headerBox .theadBox p>span>b i {
  float: left;
}

.trendPageBox .headerBox .theadBox p>span>b i:nth-child(1).active {
  border-color: transparent transparent #DA1C36 transparent;
}

.trendPageBox .headerBox .theadBox p>span>b i:nth-child(2).active {
  border-color: #DA1C36 transparent transparent transparent;
}

.trendPageBox .headerBox .theadBox p>span>b i:nth-child(1) {
  display: inline-block;
  width: 0px;
  height: 0px;
  border-width: 0px 10px 10px 10px;
  border-style: solid;
  border-color: transparent transparent #8C837B transparent;
  margin-bottom: 3px;

}

.trendPageBox .headerBox .theadBox p>span>b i:nth-child(2) {
  display: inline-block;
  width: 0px;
  height: 0px;
  border-width: 10px 10px 0px 10px;
  border-style: solid;
  border-color: #8C837B transparent transparent transparent;
}

/*中间内容*/
.trendPageBox .vux-slider {
  margin-top: 170px;
  background: #ffffff;
}

.trendPageBox .vux-slider .vux-swiper {
  height: 975px !important;
  background: #ffffff;
  overflow-y: auto;
}

.trendPageBox .contentBox {
  padding-bottom: 50px;
}

.trendPageBox .contentBox p {
  display: flex;
  background: #F6F6F6;
}

.trendPageBox .contentBox p.write {
  background: #ffffff;
}

.trendPageBox .contentBox p>span {
  flex: 1;
  text-align: center;
  line-height: 88px;
  font-size: 24px;
  color: #8C837B;
}

.trendPageBox .contentBox p>span.number {
  width: 239px;
  flex: initial;
  color: #DA1C36;
}

.trendPageBox .contentBox p>span.time {
  width: 171px;
  flex: initial;
}

.trendPageBox .contentBox p>span>span.numberBox {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: #DA1C36;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  font-size: 24px;
  color: #FFFFFF;
}

/*底部*/
.trendPageBox footer {
  width: 750px;
  height: 100px;
  background: #FFFFFF;
  box-shadow: 0px -3px 2px 0px rgba(240, 240, 240, 0.85);
  font-size: 28px;
  color: #333333;
  text-align: center;
  line-height: 100px;
  position: fixed;
  bottom: 0;
  left: 0;
}

.trendPageBox footer .remainingTimeShow {
  color: #DB243D;
}

</style>
