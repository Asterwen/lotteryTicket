<template>
  <div class="bindingBankCardsBox">
    <div class="formBox">
      <x-input title="银行卡号：" :max="19" v-model="userInfo.bankCard" :show-clear="false" required></x-input>
      <x-input title="姓名：" v-model="userInfo.realName" :show-clear="false" :disabled="truefalse" required ></x-input>
      <x-input title="身份证号：" :max="18" v-model="userInfo.indenCard" :show-clear="false" :disabled="truefalse" required ></x-input>
      <x-input title="手机号：" v-model="userInfo.phone" :show-clear="false" name="mobile" :max="13" placeholder="银行预留手机号" keyboard="number" is-type="china-mobile" required></x-input>
      <div class="saveBtn" @click="addBind">确定</div>
    </div>
    <toast style="width:auto" v-model="toast.showValue" type="text" :time="1200" is-show-mask position="middle">{{toast.textValue }}</toast>
    <div class="formBoxBox" v-if="forBoxBox">
      <p>绑卡中,请耐心等待...</p>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { XInput ,Toast} from 'vux'

export default {
  components: {
    XInput,
    Toast
  },
  data() {
    return {
      Id:0,
      userInfo: {
        realName: '',
        indenCard: '',
        bankCard: '',
        phone: '',
      },
      toast: {
        showValue: false,
        textValue: ''
      },
      token:'',
      truefalse:false,
      forBoxBox:false
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  created(){
    this.Id = this.$route.params.Id;
    // console.log('初始化',this.publicInfo.userInfo.identityNum);
    if(this.publicInfo.userInfo.realName == '' || this.publicInfo.userInfo.realName == null){
      this.truefalse = false;
      return;
    }else if(this.publicInfo.userInfo.realName!=null){
      this.truefalse = true;
      this.userInfo.realName = this.publicInfo.userInfo.realName;
      let hideName = this.userInfo.realName.substr(1);//修改过后
      // this.userInfo.realName = this.userInfo.realName
      // this.userInfo.realName = this.userInfo.realName.replace(hideName, '**');
    }
    if(this.publicInfo.userInfo.identityNum == '' || this.publicInfo.userInfo.identityNum == null){
      return;
    }else if(this.publicInfo.userInfo.identityNum!=null){
      this.userInfo.indenCard = this.publicInfo.userInfo.identityNum;
      let rest = this.userInfo.indenCard.substr(4, 10);
      // this.userInfo.indenCard = this.userInfo.indenCard
      // this.userInfo.indenCard = this.userInfo.indenCard.replace(rest, '************');
    }
    // console.log(this.userInfo.indenCard,this.publicInfo.userInfo.identityNum)
    // console.log('初始化',this.publicInfo.userInfo.nickName)
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation", "setUserInfo"]),
    addBind() {
      // console.log(this.userInfo)
      let regName =/^[\u4e00-\u9fa5]{2,4}$/;  //验证真实姓名
      // let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  //身份证正则
      let regbankCard = /^(\d{16}|\d{19})$/; 
      let phones = /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/;
      if(!regbankCard.test(this.userInfo.bankCard)){  
          this.toast.textValue = '银行卡号填写有误'
          this.toast.showValue = true 
          return false;  
          // ||
      }else if(this.userInfo.realName == null){
        // !regName.test(this.userInfo.realName)
        // console.log('姓名',regName.test(this.userInfo.realName));
          this.toast.textValue = '真实姓名填写有误'
          this.toast.showValue = true 
          return false;  
      }else if(this.userInfo.indenCard == null){   
        // console.log('身份证',this.userInfo.indenCard)
          this.toast.textValue = '身份证输入不合法'
          this.toast.showValue = true  
          return  false;  
      }else if(!phones.test(this.userInfo.phone)){
          this.toast.textValue = '手机号输入不合法'
          this.toast.showValue = true  
          return  false;  
      }else{
        // alert('提交成功')
        // if(this.publicInfo.userInfo.withdraw){
        //   alert('有');
        //   let linkArr = this.publicInfo.operationPageLink.normalArr;
        //   linkArr.pop();
        //   this.$router.push({ path: linkArr[linkArr.length - 1] })
        // }else{
        //   alert('没有');
        //   this.$router.push({ path: '/page/mine/selfRealName' })
        // }  
        this.forBoxBox = true
        this.token = JSON.parse(localStorage.getItem('publicInfo'));
        // console.log(this.token.userInfo)
        let locaPublicInfo = JSON.parse(localStorage.getItem('publicInfo'));
        this.$api.addBind(this.userInfo).then(res => {
          // console.log(res, '---yes')
          
          
          if (res.data.code == 0) {
            this.forBoxBox = false;
            this.publicInfo.userInfo.realName = this.userInfo.realName;
          this.publicInfo.userInfo.identityNum = this.userInfo.indenCard;
            // alert("success")
            this.setUserInfo({
              id: this.publicInfo.userInfo.id, //用户id
              realName: this.publicInfo.userInfo.realName, //真实姓名
              nickName: this.publicInfo.userInfo.nickName, //用户昵称
              phone: this.publicInfo.userInfo.phone, //手机号
              handUrl: this.publicInfo.userInfo.handUrl, //用户头像
              payAble: this.publicInfo.userInfo.payAble, //是否设置了支付密码 实名认证
              withdraw:  this.publicInfo.userInfo.withdraw, //是否存在交易密码
              card: '0', // 0是有银行卡  1是没有银行卡
              identityNum: this.publicInfo.userInfo.identityNum, //实名认证身份证号码
              isAngent: this.publicInfo.userInfo.isAngent, //0是用户，1是代理，用于判断是否显示代理中心
              token:this.token.userInfo.token
            })
            // console.log('姓名',this.publicInfo.userInfo.realName)
            //判断是否有无安全密码跳转
            // console.log('第一遍',locaPublicInfo.userInfo.withdraw)
            if(locaPublicInfo.userInfo.withdraw){
              let linkArr = this.publicInfo.operationPageLink.normalArr;
              linkArr.pop();
              this.$router.push({ path: linkArr[linkArr.length - 1] })
            }else{
              localStorage.setItem("publicInfo", JSON.stringify(this.publicInfo));
              this.$router.push({ path: `/page/mine/selfRealName${this.Id}` })
            }
          } else {
            this.forBoxBox = false;
            // console.log(res.data.message)
            this.toast.textValue = res.data.message;
            this.toast.showValue = true 
          }
        }).catch(err => {
          console.log( '---no',err);
        })
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
      centerContent: 'src/assets/img/titleHeaderImg/BindingBankCards.png', //中间区域内容
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
  }
}

</script>
<style>
html,
body {
  background: #f4f4f4;
}

.bindingBankCardsBox .formBox {
  padding: 33px 36px;
}
.formBoxBox{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1001;
  color:#fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.bindingBankCardsBox .vux-toast .weui-toast{
  padding: 5px 8px;
  width:auto !important;
}

.bindingBankCardsBox .formBox .vux-x-input.weui-cell {
  background: #fff;
  height: 40px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 30px 18px;
}

.bindingBankCardsBox .formBox .vux-x-input.weui-cell:before {
  border: 0;
}

.bindingBankCardsBox .formBox .vux-x-input.weui-cell .weui-cell__hd {
  width: 140px;
}

.bindingBankCardsBox .formBox .vux-x-input.weui-cell .weui-cell__hd .weui-label {
  color: #393a3e;
  font-size: 32px;
}

.bindingBankCardsBox .formBox .vux-x-input.weui-cell .weui-cell__bd.weui-cell__primary input {
  font-size: 28px;
  padding-left: 20px;
}

.bindingBankCardsBox .formBox .vux-x-input.weui-cell .weui-cell__bd.weui-cell__primary input::-webkit-input-placeholder {
  color: #666;
  font-size: 28px;
}

.bindingBankCardsBox .formBox .vux-input-icon.weui-icon-warn:before,
.vux-input-icon.weui-icon-success:before {
  font-size: 0.4rem;
}

.bindingBankCardsBox .formBox .saveBtn {
  background: #d91d37;
  text-align: center;
  line-height: 88px;
  height: 88px;
  font-size: 36px;
  color: #fff;
  border-radius: 8px;
  margin-top: 140px;
}

</style>
