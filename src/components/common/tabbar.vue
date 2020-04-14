<template>
  <div class="tabbarBox">
    <tabbar v-if="bottomNavigation.show">
      <tabbar-item :selected="key==Number(bottomNavigation.activeNum)?true:false" :link="item.link" @click.native="LinkTo(item.name)" v-for="(item,key) in tabList" :key='key' @on-item-click="clickItem(key)">
        <img slot="icon" :src="item.icon" >
        <img slot="icon-active" :src="item.activeIcon">
        <span slot="label">{{item.name}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Tabbar, TabbarItem } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem
  },
  props: [],
  data() {
    return {
      Id:0,
      tabList: [{
          name: '大厅',
          icon: 'src/assets/img/footerImg/hall.png',
          activeIcon: 'src/assets/img/footerImg/hallActive.png'
        },
        {
          name: '开奖记录',
          icon: 'src/assets/img/footerImg/lotteryRecord.png',
          activeIcon: 'src/assets/img/footerImg/lotteryRecordActive.png'
        },
        {
          name: '排行榜',
          icon: 'src/assets/img/footerImg/rankingList.png',
          activeIcon: 'src/assets/img/footerImg/rankingListActive.png'
        },
        {
          name: '购买记录',
          icon: 'src/assets/img/footerImg/purchaseRecord.png',
          activeIcon: 'src/assets/img/footerImg/purchaseRecordActive.png'
        },
        {
          name: '我的',
          icon: 'src/assets/img/footerImg/personalCenter.png',
          activeIcon: 'src/assets/img/footerImg/personalCenterActive.png'
        }
      ],
      showTabbar: true
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
    bottomNavigation: function() {
      return this.publicInfo.bottomNavigation
    }
  },
  created() { 

      this.Id = localStorage.getItem('Id'); 
    if(this.Id == undefined || null){
    this.Id = this.$route.params.Id;

    }
    
  },
  methods: {
    ...mapActions(["setBottomNavigation"]),
    clickItem(num) {
      this.setBottomNavigation({
        activeNum: num, //当前选中的底部导航下标
        show: true, //是否显示底部导航
      })
    },
    LinkTo(linkTo){ 
      // debugger
        this.Id = localStorage.getItem('Id');
      // console.log('外',this.Id)
      if(this.Id == undefined || this.null){
      this.Id = this.$route.params.Id;
        // console.log('内',this.Id)
      }
      
      if(linkTo == '大厅'){
        // console.log(linkTo);
        localStorage.setItem('Id',this.Id)
        this.$router.push({ path: `/page/index${this.Id}` });
      }else if(linkTo == '开奖记录'){
        // console.log(linkTo);
        localStorage.setItem('Id',this.Id)
        this.$router.push({ path: `/page/history${this.Id}` });
      }else if(linkTo == '排行榜'){
        // console.log(linkTo);
        localStorage.setItem('Id',this.Id)
        this.$router.push({ path: `/page/rank${this.Id}` });
      }else if(linkTo == '购买记录'){
        // console.log(linkTo);
        localStorage.setItem('Id',this.Id)
        this.$router.push({ path: `/page/record${this.Id}` });
      }else if(linkTo == '我的'){
        // console.log(linkTo);
        localStorage.setItem('Id',this.Id)
        this.$router.push({ path: `/page/mine${this.Id}` });
      }
    }
  }
}

</script>
<style>
.tabbarBox .weui-tabbar {
  background-color: #000;
  height: 98px;
  position: fixed;

}

.tabbarBox .weui-tabbar .weui-tabbar__item {
  padding-top: 14px;
}

.tabbarBox .weui-tabbar .weui-tabbar__item .weui-tabbar__icon,
.tabbarBox .weui-tabbar .weui-tabbar__item .weui-tabbar__icon img {
  width: 40px;
  height: 40px;
}

.tabbarBox .weui-tabbar .weui-tabbar__item .weui-tabbar__label {
  font-family: 'PingFangSC';
  font-size: 22px;
}

</style>
