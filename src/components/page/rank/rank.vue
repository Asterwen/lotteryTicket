<!-- 排行榜页面 -->
<template>
  <div class='rank'>
    <ul class="rankTitle">
      <li :class="{ 'selected':listNumber == 0 }" @click="onItemClick">中奖信息</li>
      <li :class="{ 'selected':listNumber == 1 }" @click="onItemClick">昨日盈利榜</li>
    </ul>
    <div class="selfRecordWrap">
      <div v-if="listNumber == '1'" class="selfWrap2">
        <!-- 昨日盈利 -->
        <ul>
          <li @click='showMeDetail($event,item.userId)' v-for="(item,index) in list1" :key='index'>
            <div class="rankLogo">
              <img :src="item.headurl" alt="">
            </div>
              <div class="rankPerson">
                <span>{{item.nickName}}&nbsp;</span>
                <p>昨日盈利: <span>￥{{item.win}}</span></p>
              </div>
              <span class="rankNumber">{{index+1}}</span>
          </li>
        </ul>
      </div>
      <div v-if="listNumber == '0'" class="selfWrap1">
        <!-- 中奖信息榜 -->
        <ul>
          <li @click='showMeDetail($event,item.userId)' v-for="(item,index) in list2" :key='index'>
            <div class="rankLogo">
              <img :src="item.headurl" alt="">
            </div>
              <div class="rankPerson">
                <span>{{item.nickName}}&nbsp;</span>
                <p>喜中: <span>￥{{item.win}}</span></p>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Group, Cell, Tab, TabItem, XTable } from 'vux'

export default {
  components: {
    Cell,
    Group,
    Tab,
    TabItem,
    XTable
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    // 切换tab
    onItemClick() {
      if (this.listNumber == 0) {
        this.listNumber = 1
      } else {
        this.listNumber = 0
      }
    },
    // 跳转详情页
    showMeDetail(a, userId) {
      let transData = {
        userId: userId
      }
      this.$router.push({
        path: `/page/rank/rankDetail${this.Id}`,
        name: 'rankDetail',
        params: transData
      })
    },
    getNewWin() {}
  },
  data() {
    return {
      Id:0,
      listNumber: '0', //当前选中tab
      list1: [{}], //昨日盈利数据
      list2: [{}], //中奖信息榜数据
      fillData: [{ "account": "137****0973", "headurl": "header14.jpg", "nickName": '停止跳动', "userId": 1, "win": 9 }, { "account": "137****0973", "headurl": "header24.jpg", "nickName": '寂寞拐诱', "userId": 2, "win": 25 }, { "account": "137****0973", "headurl": "header55.jpg", "nickName": '梦醒时分', "userId": 3, "win": 80 }, { "account": "137****0973", "headurl": "header75.jpg", "nickName": '愿无悲喜', "userId": 4, "win": 40 }, { "account": "137****0973", "headurl": "header78.jpg", "nickName": '醉死梦生', "userId": 5, "win": 80 }, { "account": "137****0973", "headurl": "header78.jpg", "nickName": '别来无恙', "userId": 6, "win": 40 }, { "account": "137****0973", "headurl": "header16.jpg", "nickName": '停止呼吸', "userId": 7, "win": 16 }, { "account": "137****0973", "headurl": "header51.jpg", "nickName": '大梦初醒', "userId": 8, "win": 12 }, { "account": "137****0973", "headurl": "header16.jpg", "nickName": '趁着醉意', "userId": 9, "win": 8 }, { "account": "137****0973", "headurl": "header26.jpg", "nickName": '活埋真心', "userId": 10, "win": 10 }, { "account": "137****0973", "headurl": "header86.jpg", "nickName": '久爱不腻', "userId": 11, "win": 25 }, { "account": "137****0973", "headurl": "header8.jpg", "nickName": '镜子别哭', "userId": 12, "win": 16 }, { "account": "137****0973", "headurl": "header37.jpg", "nickName": '缺失爱情', "userId": 13, "win": 240 }, { "account": "137****0973", "headurl": "header25.jpg", "nickName": '如梦初醒', "userId": 14, "win": 80 }, { "account": "137****0973", "headurl": "header90.jpg", "nickName": '完美情人', "userId": 15, "win": 40 }, { "account": "137****0973", "headurl": "header44.jpg", "nickName": '假心情人', "userId": 16, "win": 8 }, { "account": "137****0973", "headurl": "header92.jpg", "nickName": '感情褪色', "userId": 17, "win": 9 }, { "account": "137****0973", "headurl": "header7.jpg", "nickName": '爱憎分明', "userId": 18, "win": 25 }, { "account": "137****0973", "headurl": "header98.jpg", "nickName": '人走茶凉', "userId": 19, "win": 12 }, { "account": "137****0973", "headurl": "header83.jpg", "nickName": '指尖流露', "userId": 20, "win": 40 }, { "account": "137****0973", "headurl": "header94.jpg", "nickName": '爱是信仰', "userId": 21, "win": 40 }, { "account": "137****0973", "headurl": "header73.jpg", "nickName": '倾世温柔', "userId": 22, "win": 10 }, { "account": "137****0973", "headurl": "header84.jpg", "nickName": '晨曦落日', "userId": 23, "win": 40 }, { "account": "137****0973", "headurl": "header15.jpg", "nickName": '天青烟雨', "userId": 24, "win": 40 }, { "account": "137****0973", "headurl": "header2.jpg", "nickName": '爱说寂寞', "userId": 25, "win": 10 }, { "account": "137****0973", "headurl": "header84.jpg", "nickName": '半雅半俗', "userId": 26, "win": 16 }, { "account": "137****0973", "headurl": "header83.jpg", "nickName": '丢了灵魂的孩纸', "userId": 27, "win": 80 }, { "account": "137****0973", "headurl": "header90.jpg", "nickName": '只因太美', "userId": 28, "win": 15 }, { "account": "137****0973", "headurl": "header10.jpg", "nickName": '渔美人', "userId": 29, "win": 25 }, { "account": "137****0973", "headurl": "header3.jpg", "nickName": '敷衍不停的重演', "userId": 30, "win": 40 }, { "account": "137****0973", "headurl": "header35.jpg", "nickName": '大扎王后', "userId": 31, "win": 9 }, { "account": "137****0973", "headurl": "header62.jpg", "nickName": '森系女孩', "userId": 32, "win": 9 }, { "account": "137****0973", "headurl": "header4.jpg", "nickName": '樱桃娃娃', "userId": 33, "win": 8 }, { "account": "137****0973", "headurl": "header26.jpg", "nickName": '蜜桃女', "userId": 34, "win": 25 }, { "account": "137****0973", "headurl": "header36.jpg", "nickName": '我迷了鹿', "userId": 35, "win": 16 }, { "account": "137****0973", "headurl": "header72.jpg", "nickName": '蕾丝控', "userId": 36, "win": 16 }, { "account": "137****0973", "headurl": "header66.jpg", "nickName": '萌奇奇', "userId": 37, "win": 9 }, { "account": "137****0973", "headurl": "header67.jpg", "nickName": '乖乖女', "userId": 38, "win": 16 }, { "account": "137****0973", "headurl": "header30.jpg", "nickName": '夹心巧克力', "userId": 39, "win": 12 }, { "account": "137****0973", "headurl": "header31.jpg", "nickName": '萌娃子', "userId": 40, "win": 10 }, { "account": "137****0973", "headurl": "header13.jpg", "nickName": '米老鼠', "userId": 41, "win": 240 }, { "account": "137****0973", "headurl": "header69.jpg", "nickName": '我是飞车', "userId": 42, "win": 9 }, { "account": "137****0973", "headurl": "header14.jpg", "nickName": '大雨伞', "userId": 43, "win": 25 }, { "account": "137****0973", "headurl": "header68.jpg", "nickName": '小裙摆', "userId": 44, "win": 16 }, { "account": "137****0973", "headurl": "header3.jpg", "nickName": '小鸭蛋', "userId": 45, "win": 80 }, { "account": "137****0973", "headurl": "header9.jpg", "nickName": '快乐红桃', "userId": 46, "win": 240 }, { "account": "137****0973", "headurl": "header88.jpg", "nickName": '超人', "userId": 47, "win": 12 }, { "account": "137****0973", "headurl": "header34.jpg", "nickName": '爱傻笑', "userId": 48, "win": 80 }, { "account": "137****0973", "headurl": "header1.jpg", "nickName": '魅力', "userId": 49, "win": 80 }],
    }
  },
  created() {
    this.Id = this.$route.params.Id;
    // 中奖信息榜
    this.$api.rankList().then(res => {
//  	console.log(res)
      /*请求成功后的操作*/
      if (res.data.code == 0) {
        let datalist = res.data.data
        // if(datalist)
        datalist.forEach((item, index) => {
          item.headurl = 'src/assets/img/header/' + item.headurl
          if (item.nickName) {} else {
            item.nickName = item.account
          }
        })
        this.list1 = datalist;
      } else {}
    }).catch(err => {})

    //昨日盈利榜 
    this.$api.rankWin().then(res => {
    	console.log(res)
      /*请求成功后的操作*/
      let datalist1 = res.data.data
      if (res.data.code == 0) {
        if (datalist1.length > 0) {
          // console.log('有数据！')
          datalist1.forEach((item, index) => {
            item.headurl = 'src/assets/img/header/' + item.headurl
            if (item.nickName) {} else {
              item.nickName = item.account
            }
          })
        } else {
          // console.log('没数据')
          let listNum = 8 + Math.floor(10 * Math.random());
          let listFir = Math.floor((48 - listNum) * Math.random())
          for (let i = 0; i < listNum; i++) {
            datalist1[i] = this.fillData[listFir + i]
          }
          datalist1.forEach((item, index) => {
            item.headurl = 'src/assets/img/header/' + item.headurl
            if (item.nickName) {} else {
              item.nickName = item.account
            }
          })
        }
        this.list2 = datalist1
      } else {}
    }).catch(err => {})
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
      centerContent: 'src/assets/img/titleHeaderImg/RankingList.png', //中间区域内容
      centerContentClass: 'titleHeaderImg', //中间区域样式类名
      rightShow: false, //右侧区域是否显示
      rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
      rightContent: '', //要在右侧显示的内容
      rightContentClass: '', //右侧内容样式类名
      rightTumpLink: '', //点击右侧跳转链接
    });
    // 设置公共底部
    this.setBottomNavigation({
      activeNum: 2, //当前选中的底部导航下标
      show: true, //是否显示底部导航
    });
  },
}

</script>
<style>
.rank {
  padding-top: 16px;
  background-color: #fff;
}

.rank .vux-tab-wrap .vux-tab-item {
  width: 210px;
  height: 66px;
}

.rank .rankLogo {
  width: 80px;
  height: 120px;
  margin-left: 30px;
  margin-right: 20px;
}

.rank .rankLogo img {
  display: block;
  width: 80px;
  height: 80px;
  margin-top: 20px;
  border-radius: 40px;
}

.rank .selfWrap2 li {}

.rank .rankPerson {
  width: 400px;
  padding-top: 14px;
  font-size: 28px;
}

.selfWrap2 li:first-child span.rankNumber {
  color: #fff;
  background: -webkit-linear-gradient(bottom, rgba(255, 89, 103, 0.97), rgba(154, 30, 30, 0.97));
  background: -o-linear-gradient(bottom, rgba(255, 89, 103, 0.97), rgba(154, 30, 30, 0.97));
  background: linear-gradient(to top, rgba(255, 89, 103, 0.97), rgba(154, 30, 30, 0.97));
}

.selfWrap2 li:nth-child(2) span.rankNumber {
  background: -webkit-linear-gradient(bottom, rgba(44, 193, 255, 0.94), rgba(40, 82, 175, 0.94));
  background: -o-linear-gradient(bottom, rgba(44, 193, 255, 0.94), rgba(40, 82, 175, 0.94));
  background: linear-gradient(to top, rgba(44, 193, 255, 0.94), rgba(40, 82, 175, 0.94));
  color: #fff;
}

.selfWrap2 li:nth-child(3) span.rankNumber {
  background: -webkit-linear-gradient(bottom, rgba(255, 186, 0, 0.97), rgba(167, 105, 39, 0.97));
  background: -o-linear-gradient(bottom, rgba(255, 186, 0, 0.97), rgba(167, 105, 39, 0.97));
  background: linear-gradient(to top, rgba(255, 186, 0, 0.97), rgba(167, 105, 39, 0.97));
  color: #fff;
}

.rank .selfWrap2 span.rankNumber {
  display: inline-block;
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 25px;
  line-height: 50px;
  font-size: 30px;
  position: absolute;
  right: 30px;
  top: 35px;
  color: #333333;
}

.rank .rankPerson>span {
  color: #0CB4C3;
}

.rank .rankPerson>p {
  color: #333333;
}

.rank .rankPerson>p span {
  color: #d91f37;
}

.rank .selfRecordWrap {
  margin-top: 16px;
  padding-top: 2px;
  background-color: #f4f4f4;
}

.rank .selfRecordWrap li {
  width: 100%;
  height: 120px;
  margin-bottom: 2px;
  background-color: #fff;
  position: relative;
}

.selfWrap1 li {
  background: #fff url('../../../assets/img/center-right.png') right center no-repeat;
  background-size: 19px 36px;
  background-position: 700px;
}

.rank li>div {
  float: left;
}

.rank .rankTitle {
  width: 428px;
  height: 70px;
  margin: 0 auto;
  border-radius: 6px;
  overflow: hidden;
}

.rank .rankTitle li {
  float: left;
  font-size: 30px;
  width: 210px;
  height: 66px;
  text-align: center;
  line-height: 66px;
  border: 2px solid rgba(194, 29, 43, 1);
}

.rank .rankTitle li.selected {
  background: #d91f37;
  color: #fff;
}

</style>
