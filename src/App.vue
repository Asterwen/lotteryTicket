<template>
  <div id="app">
    <app-header></app-header>
    <div class="routerViewBox" :style="'min-height:'+[publicInfo.bottomNavigation.show==true?clientHeight:(clientHeight+47)]+'px;padding-bottom:'+[publicInfo.bottomNavigation.show==true?49:0]+'px'">
      <router-view v-if="isRouterlive"></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import AppHeader from './components/common/header.vue'
import AppFooter from './components/common/tabbar.vue'
//import './assets/font/font.css';
export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  provide(){
  	return {
  		reload: this.reload
  	}
  },
  data() {
    return {
      clientHeight: 0,
      commen: false,
      isRouterlive: true
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
    Listener() {
      return localStorage.getItem('commenn');
    }
  },
  watch: {
    '$route.path': function(newVal, oldVal) {
      // 获取当前路由数组
      let Id = this.$route.params.Id;
      let type = this.publicInfo.operationPageLink.type; //路由状态
      let normalArr = this.publicInfo.operationPageLink.normalArr; //历史路由数组
      let specialArr = this.publicInfo.operationPageLink.specialArr; //特殊路由数组，预留，暂未使用
      let bottomNavigationNum = this.publicInfo.bottomNavigation.activeNum; //当前选中底部导航下标
      let bottomNavigationShow = true; //是否显示底部导航
      // 判断是否在一级页面，是则清空路由数组
      if (newVal == `/page/index${Id}` || newVal == `/page/history${Id}` || newVal == `/page/rank${Id}` || newVal == `/page/record${Id}` || newVal == `/page/mine${Id}`) {
        // 判断是否在一级页面，在则清空历史路由数组，显示底部导航
        bottomNavigationShow = true;
        type = 'normal';
        normalArr = [];
        specialArr = [];
      } else {
        bottomNavigationShow = false;
      }
      // 判断当前路由状态，正常则走normal数组
      if (type == 'normal') {
        // 将当前页面路由添加到路由数组
        normalArr.push(newVal);
        // 创建临时数组
        let newNormalArr = [];
        // 循环当前路由数组，将路由挨个push进临时数组，如果当前路由已经存在于当前数组，则跳出循环，保证当前路由数组的畅通性
        for (let i = 0; i < normalArr.length; i++) {
          if (normalArr[i] == newVal) {
            newNormalArr.push(normalArr[i])
            break;
          } else {
            newNormalArr.push(normalArr[i])
          }
        }
        normalArr = newNormalArr;
      } else if (type == 'special') {
        specialArr.push(newVal);
      }
      // 设置历史路由
      this.setOperationPageLink({
        type: type,
        normalArr: normalArr,
        specialArr: specialArr,
      })
      // 设置底部导航
      this.setBottomNavigation({
        activeNum: bottomNavigationNum, //当前选中的底部导航下标
        show: bottomNavigationShow, //是否显示底部导航
      })
    }
  },
  created() {
    localStorage.setItem('Id', this.$route.params.Id);
    // console.log('appvue',this.$route.params.Id);
    let clientHeight = document.documentElement.clientHeight - 95;
    this.clientHeight = clientHeight;
    //在页面加载时读取localStorage里的状态信息
    if (localStorage.getItem("publicInfo")) {
      this.setPublicInfo(JSON.parse(localStorage.getItem("publicInfo")))
    }
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("publicInfo", JSON.stringify(this.publicInfo));
    })
    // 公共头部初始化
    this.setPublicHeaderStatus({
      isShow: true, //是否显示公共头部
      backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
      leftShow: false, //左侧区域是否显示
      leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
      leftContent: '', //showType为other时，要在左侧显示的内容
      centerShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；
      centerContent: '', //中间区域内容
      centerContentClass: '', //中间区域样式类名
      rightShow: false, //右侧区域是否显示
      rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
      rightContent: '', //要在右侧显示的内容
      rightContentClass: '', //右侧内容样式类名
      rightTumpLink: '', //点击右侧跳转链接
    })
  },
  methods: {
    ...mapActions(["setPublicInfo", "setOperationPageLink", "setBottomNavigation", "setPublicHeaderStatus"]),
    reload(){
    		this.isRouterlive = false
    		this.$nextTick(function(){
    			this.isRouterlive = true
    		})
    }
  },
  mounted() {},
}

</script>
<style>
body {
  margin: 0;
}

#test {
  display: block;
  bottom: 3px;
  right: 3px;
  width: 130px;
  position: fixed;
}

/* 以下是写给IE6的 */
* html body {
  height: 100%;
  overflow-y: auto;
}

* html #test {
  position: absolute;
  right: 18px;
}

* html {
  overflow-x: auto;
  overflow-y: hidden;
}

#app .routerViewBox {
  height: auto;
  padding-top: 92px;
  background-color: #f4f4f4;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.mint-msgbox {
	    width: 70%;
	    font-size: 30px;
	    color: #333;
	}
	.mint-msgbox-title{
		font-size: 30px;
	}
	.mint-msgbox-btn {
		font-size: 30px;
	}
	.mint-msgbox-header{
		padding: 25px 0 0;
	}
	.mint-msgbox-content {
	    padding: 20px 40px 15px;
	    border-bottom: 1px solid #ddd;
	    min-height: 80px;
	    position: relative;
	}
	.mint-msgbox-btns{
		height: 90px;
	}
	.mint-msgbox-confirm{
		padding: 20px;
	}
	.mint-toast{
		font-size: 40px;
	}
</style>
<style lang="less">
@import '~vux/src/styles/reset.less';

li {
  list-style: none;
}

/* 清除浮动 在称不开父元素宽高的时候使用 */
.clearfix:after {
  content: ".";
  clear: both;
  height: 0;
  overflow: hidden;
  visibility: hidden;
  display: block;
}

.clearfix {
  zoom: 1;
}
</style>
