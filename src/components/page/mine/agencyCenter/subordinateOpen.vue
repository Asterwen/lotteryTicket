<template>
  <div class="subordinateOpenBox">
    <div class="tabBox">
      <span :class="showBox=='下级开户'?'active':''" @click="changeShowBox('下级开户')">下级开户</span>
      <span :class="showBox=='下级开户'?'':'active'" @click="changeShowBox('邀请码')">邀请码</span>
    </div>
    <div class="typeBox">
      <span class="title">开户类型</span>
      <span class="type" @click="changeType(1)"><i :class="{'active':type==1}"></i>代理类型</span>
      <span class="type" @click="changeType(0)"><i :class="{'active':type==0}"></i>玩家类型</span>
    </div>
    <div class="juniorOpenBox" v-show="showBox=='下级开户'">
      <div class="inputBox" v-for="(item,key) in juniorOpenList" :key="key">
        <span>{{item.name}}</span>
        <input type="number" v-model="item.ratio" :placeholder="'自身返点'+item.myRatio+'，可设置返点0.0-'+item.maxRadio" @blur="inputBlur(item)">
      </div>
      <button @click="clickSave">生成邀请码</button>
    </div>
    <div class="invitationCode" v-show="showBox=='邀请码'">
      <table cellspacing="0">
        <thead>
          <tr>
            <th>邀请码</th>
            <th>生成时间</th>
            <th>状态</th>
            <th>推广链接</th>
          </tr>
        </thead>
        <tbody>
          <tr @click="clickInvitationCode(item1.invitationCode)" v-show="item1.state==type" v-for="(item1,key1) in invideCodeData" :key="key1">
            <td>{{item1.invitationCode}}</td>
            <td>{{item1.createTime}}</td>
            <td>注册（{{item1.sum}}）</td>
            <td><button class="clickBtn" @click.stop="clickBtn(item1.invitationCode)">分享</button></td>
          </tr>
        </tbody>
      </table>
      <p>已显示全部数据</p>
    </div>
    <div class="actionsheetBox">
      <actionsheet v-model="showActionsheet" :menus="actionsheetMenu" show-cancel @on-click-menu="clickActionsheet"></actionsheet>
    </div>
    <div class="sOpenBoxBox" v-if="clickBtnToFile" @click.stop="clickBtnTo()">
      <div class="McBox" id="TooF" @click.stop>
        <img class="McBtn" src="../../../../assets/img/mine/mengcengBtn.png" alt="" @click.stop="clickBtnToClose()">
        <p class="p1">
          <input type="text" id="foo" v-model="Channel" disabled>
          <button v-clipboard:copy="Channel" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</button>
        </p>
        <p class="p2">
          <input type="text" id="fooT" v-model="HttpCopyT" disabled>
          <button v-clipboard:copy="HttpCopyT" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</button>
        </p>
        <p class="p3">邀请码:{{dataS}}</p>
      </div>
    </div>
    <div class="popupBox">
      <popup v-model="showPopup">
        <popup-header right-text="关闭" title="返点详情" :show-bottom-border="false" @on-click-right="showPopup = false"></popup-header>
        <div class="everyBox" v-for="(item1,key1) in popupList" :key="key1">
          <span>{{item1.name}}</span><span>{{item1.ratio}}</span>
        </div>
      </popup>
    </div>
    <toast v-model="toast.showValue" type="text" :time="1200" is-show-mask position="middle">{{toast.textValue }}</toast>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Actionsheet, Toast, Popup, PopupHeader} from 'vux'
export default {
  components: { Actionsheet, Toast, Popup, PopupHeader},
  data() {
    return {
      toast: {
        showValue: false,
        textValue: '成功'
      },
      dataS:0,
      CodeId:0,
      HttpCopy:'http://localhost:8080/#/commen?id=143820537',//app复制路径
      // HttpCopyT:'',//H5复制路径
      showBox: '下级开户',
      type: 1,
      showPopup: false,
      popupList: [{
        name: '快3',
        ratio: '',
        gameType: 'fast3'
      }, {
        name: '时时彩',
        ratio: '',
        gameType: 'ssckj'
      }, {
        name: '11选5',
        ratio: '',
        gameType: '11vv5'
      }],
      juniorOpenList: [{
        name: '快3',
        myRatio: '',
        ratio: '',
        maxRadio: '',
        radioArr: [],
        gameType: 'fast3'
      }, {
        name: '时时彩',
        myRatio: '',
        ratio: '',
        maxRadio: '',
        radioArr: [],
        gameType: 'ssckj'
      }, {
        name: '11选5',
        myRatio: '',
        ratio: '',
        maxRadio: '',
        radioArr: [],
        gameType: '11vv5'
      }],
      juniorOpenListCopy: [{
        name: '快3',
        myRatio: '',
        ratio: '',
        maxRadio: '',
        radioArr: [],
        gameType: 'fast3'
      }, {
        name: '时时彩',
        myRatio: '',
        ratio: '',
        maxRadio: '',
        radioArr: [],
        gameType: 'ssckj'
      }, {
        name: '11选5',
        myRatio: '',
        ratio: '',
        maxRadio: '',
        radioArr: [],
        gameType: '11vv5'
      }],
      actionsheetMenu: [{
        label: '查看返点',
      }],
      showActionsheet: false,
      invideCodeData: [],
      channel:'',//分享链接
      HttpCopyT:'',//分享链接
      clickBtnToFile:false,//分享蒙层
      McImg:'../../../../assets/img/mine/mengceng.png',
      McBtn:'../../../../assets/img/mine/mengcengBtn.png'
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    changeShowBox(obj) {
      this.showBox = obj;
      this.type = 1;
    },
    changeType(obj) {
      this.type = obj;
    },
    clickSave() {
      let params = {};
      params.type = this.type;
      let juniorOpenData = [];
      for (var i = 0; i < this.juniorOpenList.length; i++) {
        let obj = {};
        obj.gameType = this.juniorOpenList[i].gameType;
        obj.ratio = this.juniorOpenList[i].ratio;
        juniorOpenData.push(obj)
      }
      for (let j in this.juniorOpenList) {
        if (this.juniorOpenList[j].ratio == "") {
          this.toast.textValue = "信息不能为空";
          this.toast.showValue = true;
          return false;
        }
      }
      params.data = JSON.stringify(juniorOpenData);
      // console.log(params, '---this is params')
      this.$api.open(params).then(res => {
        // console.log(res, '----this is res')
        if (res.data.code == 0) {
          this.loadInvideCode();
          this.showBox = '邀请码';
          this.juniorOpenList = this.juniorOpenListCopy;
          for (let j in this.juniorOpenList) {
            this.juniorOpenList[j].ratio = ""
          }
        } else {
          // console.log(res.data.message);
        }
      }).catch(err => {
        console.log(err);
      })
    },
    clickInvitationCode(item) {
      this.CodeId = item;
      this.showActionsheet = true;
    },
    clickBtn(dataS){
      this.dataS = dataS;
      // http://www.tgyhh.cm/commen?id=143820537
      //http://localhost:8080/#/commen?dataS=143820537
    //  this.Channel = this.channel+'/#/commen?id='+dataS;
    //h5
      this.HttpCopyT =  this.channel+'/job/jump?channel=0&pages='+dataS;
      //app
     this.Channel = this.channel+'/job/jump?channel=1&pages='+dataS
      // this.HttpCopyT =  'http://localhost:8080/#/page/index'+dataS;
      // console.log(this.dataS)
      // alert('buttom')
      this.clickBtnToFile = true;
    },
    clickBtnTo(){
      this.clickBtnToFile = false;
    },
    clickBtnToClose(){
      this.clickBtnToFile = false;
    },
    // 复制成功
    onCopy(e) {
      this.clickBtnToFile = false;
      this.toast.textValue = '复制成功'
      this.toast.showValue = true;
    },
    // 复制失败
    onError(e) {
      this.clickBtnToFile = false;
      this.toast.textValue = '请重试~'
      this.toast.showValue = true
    },
    //查看返点
    clickActionsheet() {
      this.showPopup = true;
      let params = {};
          params.codeId = this.CodeId;
          // console.log(params)
      this.$api.userRatioById(params).then(res => {
            console.log(res, '----this is res')
            if (res.data.code == 0) {
              this.showActionsheet = false;
              for (var m = 0; m < res.data.data.length; m++) {
                for (var n = 0; n < this.popupList.length; n++) {
                  if (res.data.data[m].gameType == this.popupList[n].gameType) {
                    this.popupList[n].ratio = res.data.data[m].userRatio;
                  }
                }
              }
              this.showPopup = true;
            } else {
              alert(res.data.message)
            }
          }).catch(err => {
            console.log(err);
          })
    },
    inputBlur(item) {
      if (item.radioArr.indexOf(Number(item.ratio)) == -1) {
        alert("自身返点" + item.myRatio + "，可设置返点0.0-" + item.maxRadio + "，且必须是0.5的倍数")
        item.ratio = '';
      }
    },
    lookBackCode() {
      let params = {};
      params.userId = "";
      this.$api.userRatio(params).then(res => {
        // console.log(res, '----this is resssss')
        if (res.data.code == 0) {
          let dataArr = res.data.data;
          for (let i = 0; i < dataArr.length; i++) {
            for (let j = 0; j < this.juniorOpenList.length; j++) {
              if (this.juniorOpenList[j].gameType == dataArr[i].gameType) {
                this.juniorOpenList[j].myRatio = dataArr[i].userRatio;
                if (Number(dataArr[i].userRatio) - 0.5 >= 0) {
                  this.juniorOpenList[j].maxRadio = Number(dataArr[i].userRatio) - 0.5;
                } else {
                  this.juniorOpenList[j].maxRadio = 0;
                }
                let num = 0;
                for (let m = 0; m < this.juniorOpenList[j].myRatio / 0.5; m++) {
                  this.juniorOpenList[j].radioArr.push(num);
                  num += 0.5;
                }
              }
            }
          }
          this.juniorOpenListCopy=this.juniorOpenList;
        } else {
          alert(res.data.message)
        }
      }).catch(err => {
        console.log(err);
      })
    },
    loadInvideCode() {
      this.$api.invideCode().then(res => {
        // console.log(res.data.data)
        // console.log(res, '----this is res')
        if (res.data.code == 0) {
          // console.log(res.data.channel.parametervalue,'12');
          this.channel = res.data.channel.parametervalue;
          this.invideCodeData = res.data.data;
        } else {
          alert(res.data.message)
        }
      }).catch(err => {
        console.log(err);
      })
    },
  },
  created() {
    this.lookBackCode();
    this.loadInvideCode();
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
      centerContent: 'src/assets/img/titleHeaderImg/LowerLevelAccountOpening.png', //中间区域内容
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
.subordinateOpenBox{
  overflow: hidden;
}
.subordinateOpenBox .tabBox {
  margin: 20px auto;
  width: 420px;
  height: 68px;
  border: 2px solid #D91D37;
  border-radius: 6px;
  overflow: hidden;
}
.clickBtn{
  width: 80%;
  height: 50%;
  /* line-height: 30%; */
  margin-top: 5%;
  border-radius: 50px;
  border: 2px solid #D91D37;
  background: #fff;
  /* border: none; */
  outline: none;
  color:#D91D37;
}
.subordinateOpenBox .tabBox span {
  width: 210px;
  height: 68px;
  text-align: center;
  line-height: 68px;
  display: inline-block;
  float: left;
  font-size: 30px;
}

.subordinateOpenBox .tabBox span.active {
  background: #D91D37;
  color: #fff;
}

.subordinateOpenBox .typeBox {
  background: #fff;
  margin-bottom: 20px;
  height: 90px;
  padding-left: 30px;
  line-height: 90px;
  font-size: 28px;
  color: rgba(51, 51, 51, 1);
}

.subordinateOpenBox .typeBox .title {
  margin-right: 50px;
}

.subordinateOpenBox .typeBox .type {
  margin-right: 80px;
}

.subordinateOpenBox .typeBox .type i {
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 2px solid #D91D37;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 23px;
}

.subordinateOpenBox .typeBox .type i.active {
  background: #D91D37
}

/*下级开户*/
.subordinateOpenBox .juniorOpenBox {
  background: #fff;
}

.subordinateOpenBox .juniorOpenBox .inputBox {
  position: relative;
  height: 90px;
  border-bottom: 2px solid #f4f4f4;
}

.subordinateOpenBox .juniorOpenBox .inputBox span {
  position: absolute;
  font-size: 28px;
  color: rgba(51, 51, 51, 1);
  display: inline-block;
  height: 90px;
  font-weight: 500;
  line-height: 90px;
  top: 0;
  left: 25px;
}

.subordinateOpenBox .juniorOpenBox .inputBox input {
  height: 90px;
  border: none;
  padding-left: 190px;
  width: 560px;
  outline: none;
  font-size: 28px;
}

.subordinateOpenBox .juniorOpenBox .inputBox input::-webkit-input-placeholder {
  font-size: 24px;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
  font-size: 28px;
}

.subordinateOpenBox .juniorOpenBox button {
  width: 690px;
  height: 88px;
  background: rgba(217, 29, 55, 1);
  border-radius: 10px;
  color: rgba(255, 255, 255, 1);
  font-size: 37px;
  line-height: 88px;
  text-align: center;
  margin: 80px 30px;
  border: none;
}

/*邀请码*/
.subordinateOpenBox .invitationCode table {
  width: 100%;
}

.subordinateOpenBox .invitationCode table thead tr th {
  height: 90px;
  font-size: 28px;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  background: #E3E3E3;
}

.subordinateOpenBox .invitationCode table tbody tr td {
  border-top: 2px solid #f4f4f4;
  height: 90px;
  text-align: center;
  vertical-align: middle;
  color: rgba(51, 51, 51, 1);
  font-size: 28px;
  background: #fff;
}

.subordinateOpenBox .invitationCode p {
  background: #fff;
  height: 80px;
  line-height: 80px;
  text-align: center;
  color: rgba(51, 51, 51, 1);
  font-size: 24px;
  margin-top: 2px;
}

/*弹层*/
.subordinateOpenBox .actionsheetBox .vux-actionsheet .weui-actionsheet .weui-actionsheet__menu .weui-actionsheet__cell,
.subordinateOpenBox .actionsheetBox .vux-actionsheet .weui-actionsheet .weui-actionsheet__action .weui-actionsheet__cell {
  height: 90px;
  line-height: 90px;
  padding: 0;
  font-size: 30px;
  color: rgba(0, 0, 0, 1);
}

.subordinateOpenBox .actionsheetBox .vux-actionsheet .weui-actionsheet .weui-actionsheet__action {
  margin-top: 20px;
}
.subordinateOpenBox>.sOpenBoxBox{
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: #000000;
  background-color:rgba(0, 0, 0, 0.8);
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.subordinateOpenBox .sOpenBoxBox #TooF{
  width: 80%;
  height: 52%;
  opacity: 1;
  z-index: 1001 !important;
  background: url('../../../../assets/img/mine/mengceng.png') no-repeat;
  background-size:100% auto;
  opacity: 1;
  position: relative;
}
.subordinateOpenBox .sOpenBoxBox .McBox .McBtn{
  width: 50px;
  height: 50px;
  position: absolute;
  right: 15px;
  top: 15px;
}
.subordinateOpenBox .sOpenBoxBox .McBox p{
  width: 100%;
  padding-left: 3.5%;
  display: flex;
  align-items: center;
}
.subordinateOpenBox .sOpenBoxBox .McBox p > input{
  width: 65%;
  height: 60px;
  background: none;
  border: 2px solid #fff;
  border-radius: 15px;
  outline: none;
  color: #fff;
  text-indent: 1em;
}
::-webkit-input-placeholder {
				color: #CCCCCC;
}
.subordinateOpenBox .sOpenBoxBox .McBox .p1{
  margin-top: 300px;
}
.subordinateOpenBox .sOpenBoxBox .McBox .p2{
  margin-top: 105px;
}
.subordinateOpenBox .sOpenBoxBox .McBox .p3{
  width: 100%;
  position: absolute;
  bottom: 20px;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 40px;
}
.subordinateOpenBox .sOpenBoxBox .McBox p > button{
  width: 20%;
  height: 60px;
  border: none;
  background: yellow;
  border-radius: 15px;
  color: #000;
  margin-left: 3%;
}
.subordinateOpenBox .popupBox .vux-popup-dialog .vux-popup-header {
  height: 90px;
  line-height: 90px;
  padding: 0;
  font-size: 30px;
  color: #666;

}

.subordinateOpenBox .popupBox .vux-popup-dialog .vux-popup-header .vux-popup-header-right {
  color: #666;
}

.subordinateOpenBox .popupBox .vux-popup-dialog .everyBox {
  height: 90px;
  line-height: 90px;
  padding: 0;
  font-size: 30px;
  background: #fff;
  padding: 0 30px;
  border-bottom: 2px solid #f4f4f4;
}

.subordinateOpenBox .popupBox .vux-popup-dialog .everyBox span:nth-child(1) {
  color: #000;
  float: left;
}

.subordinateOpenBox .popupBox .vux-popup-dialog .everyBox span:nth-child(2) {
  color: #666;
  float: right;
}
/* ::-webkit-input-placeholder {
				color: #CCCCCC;
} */
/* .subordinateOpenBox .sOpenBoxBox .McBox p:nth-child(1){
  position: absolute;
  top: 50%;
  left: 0;
} */
</style>
