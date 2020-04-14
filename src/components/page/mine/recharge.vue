<template>
	<div class="recharge">
		<div class="recharge_nav">
			<div>
				<p>账户余额</p>
				<p>￥<span class="cash_money">{{Money}}</span></p>
			</div>
		</div>
		<div class="rharge_tis">
			<span>温馨提示：</span>支付未到账，请点击原支付方式进行查询
		</div>
		<ul class="rharge_main">
			<!--<li><el-checkbox v-model="checked">聚合支付</el-checkbox><img src="../../../assets/img/mine/tubiaozhizuomoban.png"/></li>
	    		<li><el-checkbox v-model="checked">支付宝</el-checkbox><img src="../../../assets/img/mine/zhifubao.png"/></li>
	    		<li><el-checkbox v-model="checked">微信支付</el-checkbox><img src="../../../assets/img/mine/weixin.png"/></li>-->
			<li @click="rharge_btn">
				<div class="main_left">
					<img src="../../../assets/img/mine/tubiaozhizuomoban.png" />
					<div>
						<p>聚合支付</p>
						<span>稳定便捷，无支付上限，提供金牌专属客服</span>
					</div>
				</div>
				<img src="../../../assets/img/mine/right_arrow.png" class="main_img" />
			</li>
			<li>
				<div class="main_left">
					<img src="../../../assets/img/mine/zhifubao.png" />
					<div>
						<p>支付宝支付</p>
						<span>支付宝维护中.....</span>
					</div>
				</div>
				<img src="../../../assets/img/mine/right_arrow.png" class="main_img" />
			</li>
			<li>
				<div class="main_left">
					<img src="../../../assets/img/mine/weixin.png" />
					<div>
						<p>微信支付</p>
						<span>微信维护中.....</span>
					</div>
				</div>
				<img src="../../../assets/img/mine/right_arrow.png" class="main_img" />
			</li>
		</ul>
		<div class="rharge_spinner" v-show="isFlag">
			<div class="spinner">
			  <div class="spinner-container container1">
			    <div class="circle1"></div>
			    <div class="circle2"></div>
			    <div class="circle3"></div>
			    <div class="circle4"></div>
			  </div>
			  <div class="spinner-container container2">
			    <div class="circle1"></div>
			    <div class="circle2"></div>
			    <div class="circle3"></div>
			    <div class="circle4"></div>
			  </div>
			  <div class="spinner-container container3">
			    <div class="circle1"></div>
			    <div class="circle2"></div>
			    <div class="circle3"></div>
			    <div class="circle4"></div>
			  </div>
			</div>
		</div>
		
	</div>
</template>
<script>
	import { mapState, mapActions } from "vuex";
	import PasswordInput from '../../common/passwordInput.vue'
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	export default {
		name: 'recharge',
		beforeCreate() {
			Indicator.open()
		},
		data() {
			return {
				Id: 0,
				Money: '',
				screenHeight: window.innerHeight,
				screenWidth: window.innerWidth,
				veryHeight: '',
				frameUrl: '',
				checked: true,
				isFlag: false,
				choiceAmountKey: 0, //当前选中金额下标
				Budgettlt: '收支明细',
				Budgetimg: 'src/assets/img/mine/Budget.png', //收支
				Rechargetlt: '充值帮助',
				Rechargeimg: 'src/assets/img/mine/Recharge.png', //充值
				rechargeMoneyData: [{
					money: 100,
					id: 1
				}, {
					money: 200,
					id: 2
				}, {
					money: 500,
					id: 3
				}, {
					money: 1000,
					id: 4
				}, {
					money: 2000,
					id: 5
				}],
				choiceRechargeModeList: [{
					img: "src/assets/img/mine/wechat.png",
					name: "微信支付",
					show: false
				}, {
					img: "src/assets/img/mine/zhifubao.png",
					name: "支付宝支付",
					show: true
				}],
				choiceRechargeModeKey: '',
				showKey: false,
				thisBrowser: '', //当前浏览器种类
				showQrcodeKey: false, //是否显示二维码层
				QrcodeImg: '', //二维码层二维码图片
				userInfo: {}, //用户数据
				showLiveWx: false, //是否显示离开微信浏览器提示层
				queryResults: '支付结果查询', //二维码层查询按钮文字
				QrcodeTime: 15, //二维码有效期倒计时
				showQrcodeTime: true,
				orderNo: '', //订单号
				showPositionValue: false,
				otherMoney: '', //其他金额
				choiceRechargeTip: false, //未选择充值方式提示
				choiceAmountTip: false, //未选择金额提示
			}
		},
		computed: {
			...mapState({
				publicInfo: "publicInfo"
			}),
		},
		watch: {
			otherMoney: function(newValue, oldValue) {
				this.otherMoney = this.otherMoney.replace(/\D/g, '');
			}
		},
		methods: {
			...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
			rechargeMoney(key) {
				this.choiceAmountKey = key;
				this.otherMoney = ''
			},
			rharge_btn() {
				this.isFlag = true
				let params = {};
				params.amount = 50,
				params.payWay = "ALI"
				params.urlParam = window.location.href
				this.$api.rechargePay(params).then(res => {
					console.log(res, '---yes')
					if(res.data.code == 0) {
						this.isFlag = false
						window.location.href = res.data.message;
					}else if(res.data.code == 1){
						this.isFlag = false
						alert(res.data.message)
					}
				}).catch(err => {
					console.log(err, '---no');
				
				})
			},
			subUrl(msg) {
				this.frameUrl = msg;
			},
			choiceRechargeMode(item) {
				this.choiceRechargeModeKey = item;
			},
			backUserInfo(info) {
				this.userInfo = info;
			},
			loadPage(url) {
				url = url.replace(/===/g, '&');
				let localUrl = window.location.href;
				localUrl = localUrl.replace('#', '====');

				console.log(localUrl)
				if(url) {
					url += '&localUrl=' + localUrl;
					console.log('url', url)
					window.location.href = url;
				}
			},
			backFun() {
				if(this.choiceRechargeModeKey == '') {
					this.choiceRechargeTip = true;
					return;
				}
				if(this.choiceAmountKey == 0 && this.otherMoney == '') {
					this.choiceAmountTip = true;
					return;
				}
				let params = {};
				if(this.choiceRechargeModeKey == "微信支付") {
					params.amount = this.rechargeMoneyData[(this.choiceAmountKey - 1)].money;
					params.payWay = 'WX';
				} else if(this.choiceRechargeModeKey == "支付宝支付") {
					params.payWay = 'ALI';
					if(this.thisBrowser == '微信支付') {
						this.showLiveWx = true;
						return;
					}
					if(this.otherMoney == '') {
						params.amount = this.rechargeMoneyData[(this.choiceAmountKey - 1)].money;
					} else {
						params.amount = this.otherMoney;
					}
				}
				// console.log(params, '---this is value')
				this.$api.rechargePay(params).then(res => {
					console.log(res, '---yes')
					if(res.data.code == 0) {
						if(params.payWay == 'WX') {
							this.showQrcodeTime = true;
							this.QrcodeTime = 15;
							this.QrcodeImg = res.data.message;
							this.orderNo = res.data.data;
							this.showQrcodeKey = true;
							let QrcodeTimeFun = setInterval(() => {
								this.QrcodeTime--;
								if(this.QrcodeTime <= 0) {
									this.QrcodeTime = 0;
									clearInterval(QrcodeTimeFun);
									this.QrcodeImg = "src/assets/img/mine/noTime.png"
									this.showQrcodeTime = false;
								}
							}, 1000)
						} else if(params.payWay == 'ALI') {
							window.location.href = res.data.message;
						}
					}
				}).catch(err => {
					console.log(err, '---no');
				})
			},
			clickQueryResults() {
				this.queryResults = '查询中--10';
				let timeNum = 10;
				let params = {};
				params.orderNo = this.orderNo;
				let TimeFun = setInterval(() => {
					timeNum--;
					this.queryResults = '查询中--' + timeNum;;
					if(timeNum == 5) {
						let _this = this;
						this.$api.chargeState(params).then(res => {
							console.log(res, '---yes')
							if(res.data.code == 0) {
								if(res.data != null && res.data.status == 1) {
									this.showPositionValue = true;
									setTimeout(() => {
										_this.$router.push({
											path: `/page/mine/selfRecord${_this.Id}`
										})
									}, 800)
								}
							} else {
								alert(res.data.message)
							}
						}).catch(err => {
							console.log(err, '---no');
						})
					}
					if(timeNum <= 0) {
						let _this = this;
						this.queryResults = '支付结果查询';
						timeNum = 0;
						clearInterval(TimeFun);
						this.$api.chargeState(params).then(res => {
							console.log(res, '---yes')
							if(res.data != null && res.data.status == 1) {
								this.showPositionValue = true;
								setTimeout(() => {
									_this.$router.push({
										path: `/page/mine/selfRecord${_this.Id}`
									})
								}, 800)
							}
						}).catch(err => {
							console.log(err, '---no');
							this.$router.push({
								path: `/page/mine/selfRecord${this.Id}`
							})
						})
					}
				}, 1000)
			},
			Budget() {
				// alert('收支');
				localStorage.setItem('selfRecordTab', 1);
				localStorage.setItem("routerBackT", JSON.stringify(`/page/mine/recharge${this.Id}`));
				this.$router.push({
					path: `/page/mine/selfRecord${this.Id}`
				})
			},
			BudgetTwo() {
				// console.log('进去了')
				this.$router.push({
					path: `/page/commen/rechargehelp${this.Id}`
				})
			}
		},
		created() {
			const that = this
			this.Id = this.$route.params.Id;
			this.veryHeight = (this.screenHeight / this.screenWidth) * 7.5;
			this.$api.withdrawInfo().then(res => {

				if(res.data.code == 0) {
					that.Money = res.data.data.withDrawBalance;
					let pathHead = window.location.protocol;
					let localPath = window.location.hostname;
					let localUrl = pathHead + '//' + localPath

					let code = Math.floor(Math.random() * 100);
					let username = res.data.data.nickName;
					if(!username) {
						username = '无昵称'
					}
					let nowurl = res.data.data.url
					console.log(nowurl)
					nowurl = nowurl + '&code=' + code + '&pay_user_name=' + username + '&localUrl=' + localUrl;
					nowurl = encodeURI(nowurl);
					that.subUrl(nowurl)
				} else {
					console.log(res.data.message)
				}
			}).catch(err => {
				console.log(err, '---no');
			})
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
				centerContent: 'src/assets/img/titleHeaderImg/Recharge.png', //中间区域内容
				centerContentClass: 'titleHeaderImg', //中间区域样式类名
				rightShow: false, //右侧区域是否显示
				rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
				rightContent: '', //要在右侧显示的内容
				rightContentClass: '', //右侧内容样式类名
				rightTumpLink: '', //点击右侧跳转链接
			});
			window['loadNew'] = (res) => {
				this.loadPage(res)
			};

			// 设置公共底部
			this.setBottomNavigation({
				activeNum: this.publicInfo.bottomNavigation.activeNum, //当前选中的底部导航下标
				show: false, //是否显示底部导航
			});
		},
		deactivated() {
			this.$destroy()
		}
	}
</script>
<style lang="scss">
	.recharge {
		.recharge_nav {
			background: url(../../../assets/img/mine/WechatIMG3.png) no-repeat;
			background-size: 100%;
			width: 92%;
			height: 300px;
			/*border: 1px solid royalblue;*/
			margin: 30px auto;
			div {
				box-sizing: border-box;
				padding: 160px 0 0 30px;
				p:nth-of-type(1) {
					font-size: 24px;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					opacity: 0.8;
				}
				p:nth-of-type(2) {
					/*margin-top: 0.06rem;*/
					display: flex;
					align-items: center;
					font-size: 30px;
					color: rgba(255, 255, 255, 1);
					span {
						font-size: 48px;
						font-family: DINAlternate-Bold;
						/*margin-right: 0.15rem;*/
					}
				}
			}
		}
		.rharge_tis {
			box-sizing: border-box;
			padding: 0 20px;
			width: 100%;
			height: 80px;
			line-height: 80px;
			/*border: 1px dashed #000000;*/
			background: #FFFFFF;
			span{
				color: #F64343;
			}
		}
		.rharge_main {
			box-sizing: border-box;
			width: 100%;
			height: 300px;
			margin-top: 20px;
			li {
				box-sizing: border-box;
				padding: 0 20px 0 40px;
				height: 130px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #FFFFFF;
				margin-top: 20px;
				.main_left {
					display: flex;
					align-items: center;
					img {
						width: 70px;
						height: 70px;
						margin-right: 30px;
					}
					p {
						font-size: 32px;
						color: #000000;
					}
					span {
						font-size: 24px;
						color: #989898;
					}
				}
				.main_img {
					width: 20px;
					height: 34px;
				}
			}
		}
		.rharge_spinner{
			position: fixed;
			top: 50%;
			left: 43%;
			width: 15%;
			height: 12%;
			border-radius: 8px;
			background:rgba(2,2,2,0.5);
			z-index: 9999;
		}
		.spinner {
  margin: 50% auto;
  width: 40px;
  height: 40px;
  position: relative;
}
 
.container1 > div, .container2 > div, .container3 > div {
  width: 6px;
  height: 6px;
  background-color: #FFFFFF;
 
  border-radius: 100%;
  position: absolute;
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
  animation: bouncedelay 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
 
.spinner .spinner-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
 
.container2 {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}
 
.container3 {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}
 
.circle1 { top: 0; left: 0; }
.circle2 { top: 0; right: 0; }
.circle3 { right: 0; bottom: 0; }
.circle4 { left: 0; bottom: 0; }
 
.container2 .circle1 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
 
.container3 .circle1 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
.container1 .circle2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
 
.container2 .circle2 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
 
.container3 .circle2 {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
 
.container1 .circle3 {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
 
.container2 .circle3 {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
 
.container3 .circle3 {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
 
.container1 .circle4 {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
 
.container2 .circle4 {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
 
.container3 .circle4 {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}
 
@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}
 
@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
	}
</style>