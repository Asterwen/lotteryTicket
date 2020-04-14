<template>
  <div class="record">
    <div v-if="showMyCord" class="record_list" @click='showMeDetail($event,item.dealOrder,item.gameType,item.gameName)' v-for='item in list' :key='item.id'>
      <ul>
        <li class="record_time">{{item.year}} {{item.hour}}<span>({{item.gameName}} 第{{item.issue}}期)</span></li>
        <li class=""><span>订单号:</span>{{item.dealOrder}}</li>
        <li class=""><span>投注:</span>{{item.buynum}}注 {{item.amount}}元</li>
        <li class="textright" v-bind:class="{ 'getMoney':item.doIGet }">{{item.type}}</li>
      </ul>
    </div>
    <div class="moreBox" v-if="showMyCord" @click="getMore">{{moreText}}</div>
    <div v-if="showNull" class="recordIntro">
      <h2>您暂无购买记录</h2>
      <img src="../../../assets/img/recordEmpty.png" alt="">
      <p>快三、最火爆的彩种。</p>
      <a @click="toVote()">立即投注</a>
    </div>
    <div class="outOfNet" v-if='netbuzy'>
      <img src="../../../assets/img/record_buzy.png" alt="">
      <p>当前网络繁忙，请重试。</p>
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
      showMyCord: false, //显示信息
      showNull: false, //没有记录
      netbuzy: false, //网络繁忙
      list: [], //购买记录数据
      start: 0, //加载数据开始位置
      moreText: '点击加载更多数据', //点击加载更多数据/已加载全部数据
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    // 时间格式化函数
    transTime(time) {
      let d = new Date(time); //根据时间戳生成的时间对象
      let date = {};
      let form = {}
      form.month = d.getMonth() + 1;
      form.day = d.getDate();
      form.hour = d.getHours();
      form.minutes = d.getMinutes();
      for (let i in form) {
        if (form[i] < 10) {
          form[i] = '0' + form[i].toString();
        }
      }
      date.year = (d.getFullYear()) + '-' + form.month + '-' + form.day
      date.hour = form.hour + ':' + form.minutes
      return date;
    },
    // 去下注，跳转快三
    toVote() {
      window.localStorage.setItem('quick3TypeActive', 1);
      this.$router.push({ path: `/quickThree${this.Id}?name=北京快3` })
    },
    // 购买记录详情页
    showMeDetail(event, order, type, name) {
      let transData = {
        dealOrder: order,
        tableName: type,
        gameTransName: name
      }
      this.$router.push({
        path: `/page/mine/recordDetail${this.Id}`,
        name: 'recordDetail',
        params: transData
      })
    },
    // 点击加载更多
    getMore() {
      if (this.moreText == "已加载全部数据") {
        return false;
      }
      this.start += 10;
      this.loadRecordData()
    },
    // 数据加载
    loadRecordData() {
      let params = {};
      params.start = this.start;
      this.$api.record(params).then(res => {
        /*请求成功后的操作*/
        if (res.data.code == 0) {
          let datalist = res.data.data.list
          if (datalist.length > 0) {
            this.showMyCord = true;
            datalist.forEach((item, index) => {
              let showTime = this.transTime(item.createTime);
              item.year = showTime.year;
              item.hour = showTime.hour;
              switch (item.lotteryStatus) {
                case '0':
                  item.type = '等待开奖'
                  item.doIGet = true
                  break;
                case '1':
                  item.type = '未中奖'
                  item.doIGet = false
                  break;
                case '2':
                  item.type = '中奖:' + item.win + '元'
                  item.doIGet = true
                  break;
              }
              this.list.push(item)
            })
            if (this.list.length % 10 == 0) {
              this.moreText = "点击加载更多数据"
            } else {
              this.moreText = "已加载全部数据"
            }
          } else {
            this.showNull = true;
          }
        } else {
          this.netbuzy = true
          // 接口返回失败时的展示
        }
      }).catch(err => {
        // 接口请求失败时的展示
        this.netbuzy = true
      })
    },
  },
  created() {
    this.Id = this.$route.params.Id;
    this.loadRecordData()
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
      centerContent: 'src/assets/img/titleHeaderImg/PurchaseRecord.png', //中间区域内容
      centerContentClass: 'titleHeaderImg', //中间区域样式类名
      rightShow: false, //右侧区域是否显示
      rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
      rightContent: '', //要在右侧显示的内容
      rightContentClass: '', //右侧内容样式类名
      rightTumpLink: '', //点击右侧跳转链接
    });
    // 设置公共底部
    this.setBottomNavigation({
      activeNum: 3, //当前选中的底部导航下标
      show: true, //是否显示底部导航
    });
  }
}

</script>
<style>
.record {
  background-color: #F4F4F4;
  min-height: 600px;
}

.record .record_list {
  text-align: left;
  border-bottom: 4px solid #ccc;
}

.record .textright {
  text-align: right;
}

.record .recordIntro {
  text-align: center;
}

.record .recordIntro h2 {
  font-size: 32px;
  font-weight: 400;
  padding-top: 200px;
  color: #7F7F7F;
}

.record .recordIntro img {
  width: 240px;
}

.record .recordIntro p {
  color: #716D6A;
  font-size: 26px;
}

.record .recordIntro a {
  display: inline-block;
  width: 300px;
  height: 60px;
  background-color: #d91f37;
  color: #fff;
  font-size: 32px;
  line-height: 60px;
  margin-top: 40px;
  border-radius: 10px;

}

.record .record_list ul {
  position: relative;
  padding: 30px;
  width: 690px;
  height: 130px;
  background-color: #fff;
}

.record .record_time span {
  padding-left: 20px;
}

.record .record_list ul li {
  list-style: none;
  font-size: 28px;
  color: #333;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.record .record_list ul li span {
  font-size: 24px;
  color: #666;
  padding-right: 12px;
}

.record .outOfNet {
  text-align: center;
}

.record .outOfNet img {
  width: 140px;
  padding-top: 300px;
}

.record .outOfNet p {
  font-size: 26px;
  color: #ccc;
}

.record .record_list ul li.getMoney {
  color: #d91d37;
}

.record .record_list li:last-child {
  position: absolute;
  right: 30px;
  bottom: 30px;
  padding-right: 10px;
  float: right;
  color: rgba(153, 153, 153, 1);
  padding-left: 15px;
}

.record .moreBox {
  background: #fff;
  text-align: center;
  line-height: 66px;
  height: 66px;
  color: #666;
}

</style>
