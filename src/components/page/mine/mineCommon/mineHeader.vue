<template>
  <div class="centerPageHeaderBox">
    <div class="center">
      <div class="logo">
        <img :src="'src/assets/img/header/'+publicInfo.userInfo.handUrl" alt="">
      </div>
        <div class="yue">
          <div class='centerInfo'>
            {{userInfo.nickName==null?userInfo.account:userInfo.nickName}}<span v-if="isBindBank">未绑定银行卡</span>
          </div>
          <div class="centerYue">
            ID:{{userInfo.userId}}<br>
          <!--  账户余额: <span>￥<em>{{userInfo.accountBalance}}</em>元</span><br>-->
            账户余额: <span>￥<em>{{userInfo.withDrawBalance}}</em>元</span>
          </div>
        </div>
      </div>
      <ul v-if="showBtn">
        <li @click="clickRecharge">充值</li><i></i>
        <li @click="clickCashWithdrawal">提现</li>
      </ul>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Group, Cell } from 'vux'
export default {
  components: {
    Cell,
    Group
  },
  props: ['showBtn', 'backUserInfo'],
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setBottomNavigation"]),
    clickCashWithdrawal() {
      // localStorage.setItem('money',money)
      this.$router.push({ path: `/page/mine/cashWithdrawal${this.Id}` })
    },
    clickRecharge() {
      // 如果真实姓名为空，则跳转完善资料页面
      // if (this.publicInfo.userInfo.realName == '' || this.publicInfo.userInfo.realName == null) {
      //   this.$router.push({ path: `/page/mine/setPS${this.Id}`})
      // } else {
        this.$router.push({ path: `/page/mine/recharge${this.Id}`})
      // }
    },
  },
  data() {
    return {
      Id:0,
      userInfo: {},
      isBindBank:false
    }
  },
  created() {
    this.Id = localStorage.getItem('Id')
    // this.Id = this.$route.params.Id;
    // console.log(this.Id,'头部');
    // console.log(this.userInfo.withDrawBalance)
    this.$api.withdrawInfo().then(res => {
      localStorage.setItem('Money',res.data.data.withDrawBalance)
      localStorage.setItem('MoneyYE',res.data.data.accountBalance)
      this.userInfo.withDrawBalance = res.data.data.withDrawBalance;
      if (res.data.code == 0) {
        let info = res.data.data;

        // console.log('aaa'+res.data.data.url)

        this.userInfo = info;
        let localUrl = window.location.hostname;
        let code = Math.floor(Math.random()*100);
        let username = null;
        if(!username){
          username = '无昵称'
        }
        let nowurl = res.data.data.url
        nowurl = nowurl + '&code='+code+'&pay_user_name='+username+'&localUrl='+localUrl;
        nowurl = encodeURI(nowurl);
        this.$emit('subUrl',nowurl);
      } else {
        console.log(res.data.message)
      }
    }).catch(err => {
      console.log(err, '---no');
    })
    if(this.publicInfo.userInfo.card=='0'){
      this.isBindBank=false;
    }else if(this.publicInfo.userInfo.card=='1'){
      this.isBindBank=true;
    }
    
  }
}

</script>
<style>
.centerPageHeaderBox{
  position: fixed;
  left: 0;
  top: 92px;
  z-index: 998;
}
.centerPageHeaderBox .center {
  width: 750px;
  height: 250px;
  background: url(../../../../assets/img/mine/center-7.png) top center no-repeat;
  background-size: 750px;
}

.center .logo {
  padding: 30px 0 0 20px;
  float: left;
  width: 126px;
  height: 60px;
  line-height: 60px;
}

.logo img {
  width: 126px;
  height: 126px;
  display: inline-block;
  border-radius: 100%;
}

.logo span {
  font-size: 14px;
  color: #fff;
  display: inline-block;
  padding-left: 10px;
  height: 30px;
  width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.yue {
  padding: 38px 0 0 24px;
  float: left;
  height: 204px;
  font-size: 14px;
  color: #fff;
  line-height: 30px;
}

.centerInfo {
  font-size: 34px;
  height: 36px;
  line-height: 36px;
}

.centerInfo span {
  display: inline-block;
  vertical-align: top;
  margin-left: 8px;
  border-radius: 17px;
  font-size: 20px;
  padding: 1px 12px;
  color: #fff;
  background-color: #ccc;
}

.centerYue {
  padding-top: 20px;
  font-size: 24px;
  color: #ccc;
  line-height: 40px;
}

.centerYue span {
  font-size: 20px;
  color: #ff801a;
}

.centerYue span em {
  font-style: normal;
  font-size: 36px;
}

.centerPageHeaderBox ul {
  width: 100%;
  height: 100px;
  background-color: #d91d37;
}

.centerPageHeaderBox ul i {
  display: inline-block;
  float: left;
  width: 2px;
  height: 60px;
  background-color: #fff;
  margin-top: 20px;
}

.centerPageHeaderBox li {
  list-style: none;
  float: left;
  width: 374px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #fff;
  font-size: 32px;
}

</style>
