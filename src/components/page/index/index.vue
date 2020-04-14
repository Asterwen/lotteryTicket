<template>
	<div class="indexBox">
		<swiper loop auto :list="imgList" :show-desc-mask='false'></swiper>
		<div class="contentBox">
			<div class="wenxints" @click="xiazaiapp">
				<img src="../../../assets/img/laba.png"/>
				<p>
					温馨提示：<span>点击下载app</span>享受不一样的感觉
				</p>
			</div>
			<div class="rowBox" v-for="(item1,key1) in categoryList" :key="key1">
				
				<div class="squareBox" v-for="(item2,key2) in item1" :key="key2" @click="onItemClick(key1,key2)">
					<img :src="item2.img" v-if="item2.img!=''" alt="">
					<p>
						<span class="name">{{item2.name}}</span>
						<br>
						<span class="suspendText" v-show="item2.showWold=='suspendText'">{{item2.suspendText}}</span>
						<span class="hotText" v-show="item2.showWold=='hotText'">{{item2.hotText}}</span>
						<span class="tipsText" v-show="item2.showWold=='tipsText'">{{item2.tipsText}}</span>
						<span class="explainText" v-show="item2.showWold=='explainText'">{{item2.explainText}}</span>
					</p>
					<b v-show="key2==0"></b>
				</div>
				<div class="displayBox" v-if="item3.showChild" v-for="(item3,key3) in item1" :key="key3+'-'">
					<div class="squareBox" v-for="(item4,key4) in item3.childs" :key="key4" @click="goLink(item4)">
						<img :src="item4.img" v-if="item4.img!=''" alt="">
						<p>
							<span class="name">{{item4.name}}</span>
							<br>
							<span class="suspendText" v-show="item4.showWold=='suspendText'">{{item4.suspendText}}</span>
							<span class="hotText" v-show="item4.showWold=='hotText'">{{item4.hotText}}</span>
							<span class="tipsText" v-show="item4.showWold=='tipsText'">{{item4.tipsText}}</span>
							<span class="explainText" v-show="item4.showWold=='explainText'">{{item4.explainText}}</span>
						</p>
						<b v-show="key4%2==0"></b>
					</div>
					<div class="squareBox" v-if="squareBox"></div>
					<i :class="item3.showArrow" v-show="item3.childs.length>0"></i>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapState, mapActions } from "vuex";
	import { Swiper, SwiperItem } from 'vux'

	export default {
		components: {
			Swiper,
			SwiperItem
		},
		data() {
			return {
				imgList: [], //banner图片数组
				categoryList: [], //菜单数组
				showToast: false,
				squareBox: false,
				Id: 0
			}
		},
		computed: {
			...mapState({
				publicInfo: "publicInfo"
			}),
		},
		methods: {
			...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
			onItemClick(key1, key2) {
				if(key1 == 0 && key2 == 1) {
					this.squareBox = true;
				} else {
					this.squareBox = false;
				}
				let category = [];
				this.categoryList.forEach((item, index) => {
					category[index] = [];
					item.forEach((item2, index2) => {
						let showStatus = item2.showChild;
						item2.showChild = false;
						if(index == key1 && index2 == key2) {
							if(showStatus == false) {
								item2.showChild = true;
							}
						}
						category[index][index2] = item2;
					})
				})
				this.categoryList = category;
			},
			xiazaiapp(){
				console.log(this.Id)
				this.$router.push({
						path: "/commentwo?id="+this.Id
					})
			},
			goLink(item) {
				// console.log(item)
				if(item.link == '') {
					return;
				}
				
				if(item.link == "/quickThree") {
					window.localStorage.setItem('quick3TypeActive', 1);
					window.localStorage.setItem('gameType', item.code);
					let xzData = window.localStorage.getItem("xzData")
					if(xzData) {
						this.$router.push({
							path: `/bets${this.Id}`
						})
					} else {
						this.$router.push({
							path: item.link + `${this.Id}`,
							query: item
						})
					}
				} else if(item.link == "/page/index/elevenChooseFive/elevenChooseFive") {
					window.localStorage.setItem('centerContentKey', 1);
					let orderDataArr = JSON.parse(window.localStorage.getItem("orderDataArr"))
					if(orderDataArr.length != 0) {
						this.$router.push({
							path: `/page/index/elevenChooseFive/bettingPage${this.Id}`
						})
					} else {
						this.$router.push({
							path: item.link + `${this.Id}`,
							query: item
						});
					}
				} else if(item.link == "/purchase") {
//					window.localStorage.setItem('centerContentKey', 1);
//					let orderDataArr = JSON.parse(window.localStorage.getItem("orderDataArr"))
						this.$router.push({
							path: `/purchase${this.Id}`
						})
					
				}
			}
		},
		created() {
			this.Id = this.$route.params.Id;
			// localStorage.setItem('Id',this.Id);
			// console.log()
			if(!this.$route.params.Id) {
				console.log('没有');
				this.$router.push({
					path: `/page/log${0}`
				})
			}
			let imgData = [{
				url: 'javascript:',
				img: 'src/assets/img/hall/banner1.png'
			}, {
				url: 'javascript:',
				img: 'src/assets/img/hall/banner2.png'
			}, {
				url: 'javascript:',
				img: 'src/assets/img/hall/banner3.png'
			}];
			let categoryListData = [{
				name: '11选5系列', //名字，标题
				img: 'src/assets/img/hall/logo_y11_list.png', //图标路径
				suspendText: '暂停销售', //暂停销售文字
				hotText: '试试手气', //有背景的提示文字
				tipsText: '', //红色提示文字
				explainText: '', //普通说明文字
				showWold: 'hotText', //当前显示文字
				showChild: false, //是否显示子菜单开关
				link: '', //当前菜单跳转路径
				showArrow: 'left', //小箭头显示位置
				childs: [{
						name: '老11选5',
						img: 'src/assets/img/hall/logo_jxd11.png',
						suspendText: '暂停销售',
						hotText: '',
						tipsText: '最火爆',
						explainText: '',
						showWold: 'tipsText',
						link: '/page/index/elevenChooseFive/elevenChooseFive',
						code: 'jl11vv5'
					},
					{
						name: '',
						img: '',
						suspendText: '暂停销售',
						hotText: '',
						tipsText: '',
						explainText: '',
						showWold: 'tipsText',
						link: '',
						code: ''
					},
					// {
					//   name: '好运11选5',
					//   img: 'src/assets/img/hall/logo_hljd11.png',
					//   suspendText: '暂停销售',
					//   hotText: '',
					//   tipsText: '',
					//   explainText: '',
					//   showWold: 'suspendText',
					//   link: '',
					// }, {
					//   name: '粤11选5',
					//   img: 'src/assets/img/hall/logo_hljd11.png',
					//   suspendText: '暂停销售',
					//   hotText: '',
					//   tipsText: '',
					//   explainText: '',
					//   showWold: 'suspendText',
					//   link: '',
					// }, {
					//   name: '11选5',
					//   img: 'src/assets/img/hall/logo_y11.png',
					//   suspendText: '暂停销售',
					//   hotText: '',
					//   tipsText: '',
					//   explainText: '',
					//   showWold: 'suspendText',
					//   link: '',
					// }, {
					//   name: '易乐11选5',
					//   img: 'src/assets/img/hall/logo_zjd11.png',
					//   suspendText: '暂停销售',
					//   hotText: '',
					//   tipsText: '',
					//   explainText: '',
					//   showWold: 'suspendText',
					//   link: '',
					// }, {
					//   name: '辽宁11选5',
					//   img: 'src/assets/img/hall/logo_lnd11.png',
					//   suspendText: '暂停销售',
					//   hotText: '',
					//   tipsText: '',
					//   explainText: '',
					//   showWold: 'suspendText',
					//   link: '',
					// }, 
				], //子菜单数组
			}, {
				name: '快3系列',
				img: 'src/assets/img/hall/logo_k3_list.png',
				suspendText: '暂停销售',
				hotText: '试一把',
				tipsText: '',
				explainText: '',
				showChild: false,
				showWold: 'hotText',
				link: '',
				showArrow: 'right',
				childs: [{
						name: '北京快3',
						img: 'src/assets/img/hall/logo_gxk3.png',
						suspendText: '暂停销售',
						hotText: '',
						tipsText: '最火爆',
						explainText: '',
						showWold: 'tipsText',
						link: '/quickThree',
						code: 'bjfast3'
					}, {
						name: '江西快3',
						img: 'src/assets/img/hall/logo_hbk3.png',
						suspendText: '暂停销售',
						hotText: '',
						tipsText: '试一把',
						explainText: '试一把',
						showWold: 'explainText',
						link: '/quickThree',
						code: 'jxfast3'
					}, {
						name: '福建快3',
						img: 'src/assets/img/hall/logo_ahk3.png',
						suspendText: '暂停销售',
						hotText: '',
						tipsText: '试一把',
						explainText: '试一把',
						showWold: 'explainText',
						link: '/quickThree',
						code: 'fjfast3'
					}, {
						name: '江苏快3',
						img: 'src/assets/img/hall/logo_gxk3.png',
						suspendText: '暂停销售',
						hotText: '',
						tipsText: '试一把',
						explainText: '试一把',
						showWold: 'explainText',
						link: '/quickThree',
						code: 'jsfast3'
					}, {
						name: '上海快3',
						img: 'src/assets/img/hall/logo_hbk3.png',
						suspendText: '暂停销售',
						hotText: '',
						tipsText: '试一把',
						explainText: '试一把',
						showWold: 'explainText',
						link: '/quickThree',
						code: 'shfast3'
					}, {
						name: '河北快3',
						img: 'src/assets/img/hall/logo_ahk3.png',
						suspendText: '暂停销售',
						hotText: '',
						tipsText: '试一把',
						explainText: '试一把',
						showWold: 'explainText',
						link: '/quickThree',
						code: 'hbfast3'
					}, {
						name: '吉林快3',
						img: 'src/assets/img/hall/logo_gxk3.png',
						suspendText: '暂停销售',
						hotText: '',
						tipsText: '试一把',
						explainText: '试一把',
						showWold: 'explainText',
						link: '/quickThree',
						code: 'jlfast3'
					}
					// , {
					//   name: '广西快3',
					//   img: 'src/assets/img/hall/logo_hbk3.png',
					//   suspendText: '暂停销售',
					//   hotText: '',
					//   tipsText: '试一把',
					//   explainText: '试一把',
					//   showWold: 'explainText',
					//   link: '/quickThree',
					//   code: 'gxfast3'
					// }
				]
			}, {
				name: '刮刮乐',
				img: 'src/assets/img/hall/daletou.png',
				suspendText: '刮一把',
				hotText: '',
				tipsText: '',
				explainText: '',
				showWold: 'suspendText',
				showChild: false,
				link: '',
				showArrow: 'top',
				childs: [{
						name: '刮刮乐',
						img: 'src/assets/img/hall/logo_gxk3.png',
						suspendText: '暂停销售',
						hotText: '',
						tipsText: '试一把',
						explainText: '试一把',
						showWold: 'explainText',
						link: '/purchase',
//						link: '/Scratchmusic',
						code: 'jsfast3'
				},{
						name: '',
						img: '',
						suspendText: '',
						hotText: '',
						tipsText: '',
						explainText: '',
						showWold: 'explainText',
						link: '',
						code: ''
					}
					],
			}, {
				name: '双色球',
				img: 'src/assets/img/hall/shuanseqiu.png',
				suspendText: '暂停销售',
				hotText: '',
				tipsText: '',
				explainText: '',
				showWold: 'suspendText',
				showChild: false,
				link: '',
				showArrow: 'right',
				childs: [],
			}, {
				name: '竞彩篮球',
				img: 'src/assets/img/hall/logo_jclq.png',
				suspendText: '暂停销售',
				hotText: '',
				tipsText: '',
				explainText: '',
				showWold: 'suspendText',
				showChild: false,
				link: '',
				showArrow: 'left',
				childs: [],
			}, {
				name: '竞彩足球',
				img: 'src/assets/img/hall/logo_jczq.png',
				suspendText: '暂停销售',
				hotText: '',
				tipsText: '',
				explainText: '',
				showWold: 'suspendText',
				showChild: false,
				link: '',
				showArrow: 'right',
				childs: [],
			}, {
				name: '3D',
				img: 'src/assets/img/hall/logo_3d.png',
				suspendText: '暂停销售',
				hotText: '',
				tipsText: '',
				explainText: '',
				showWold: 'suspendText',
				showChild: false,
				link: '',
				showArrow: 'left',
				childs: [],
			}, {
				name: '足球单场',
				img: 'src/assets/img/hall/logo_bjdc.png',
				suspendText: '暂停销售',
				hotText: '',
				tipsText: '',
				explainText: '',
				showWold: 'suspendText',
				showChild: false,
				link: '',
				showArrow: 'right',
				childs: [],
			}, {
				name: '排列3',
				img: 'src/assets/img/hall/logo_pl3.png',
				suspendText: '暂停销售',
				hotText: '',
				tipsText: '',
				explainText: '',
				showWold: 'suspendText',
				showChild: false,
				link: '',
				showArrow: 'left',
				childs: [],
			}, {
				name: '排列5',
				img: 'src/assets/img/hall/logo_pl5.png',
				suspendText: '暂停销售',
				hotText: '',
				tipsText: '',
				explainText: '',
				showWold: 'suspendText',
				showChild: false,
				link: '',
				showArrow: 'right',
				childs: [],
			}]
			let newCategoryData = [];
			let arr = [];
			categoryListData.forEach((item, index) => {
				if(index % 2 == 0) {
					arr = []
				}
				arr.push(item);
				if(index % 2 == 1) {
					newCategoryData.push(arr)
				}
			})
			this.imgList = imgData;
			this.categoryList = newCategoryData;
		},
		mounted() {
			// 设置公共头部
			let landingStatus = this.publicInfo.landingStatus;
			if(landingStatus) {
				this.setPublicHeaderStatus({
					isShow: true, //是否显示公共头部
					backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
					leftShow: false, //左侧区域是否显示
					leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
					leftContent: '', //showType为other时，要在左侧显示的内容
					centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
					centerContent: 'src/assets/img/titleHeaderImg/MusicColorHighFrequency.png', //中间区域内容
					centerContentClass: 'titleHeaderImg', //中间区域样式类名
					rightShow: true, //右侧区域是否显示
					rightShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
					rightContent: 'src/assets/img/hall/indexRightHead.png', //要在右侧显示的内容
					rightContentClass: 'indexRightHead', //右侧内容样式类名
					rightTumpLink: `/page/mine/activity/activity${this.Id}`, //点击右侧跳转链接  /page/mine/activity/activity
				})
			} else {
				this.setPublicHeaderStatus({
					isShow: true, //是否显示公共头部
					backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
					leftShow: false, //左侧区域是否显示
					leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
					leftContent: '', //showType为other时，要在左侧显示的内容
					centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
					centerContent: 'src/assets/img/titleHeaderImg/MusicColorHighFrequency.png', //中间区域内容
					centerContentClass: 'titleHeaderImg', //中间区域样式类名
					rightShow: true, //右侧区域是否显示
					rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
					rightContent: '登录', //要在右侧显示的内容
					rightContentClass: 'indexRightHead', //右侧内容样式类名
					rightTumpLink: `/page/log${this.Id}`, //点击右侧跳转链接
				})
			}
			// 设置公共底部
			this.setBottomNavigation({
				activeNum: 0, //当前选中的底部导航下标
				show: true, //是否显示底部导航
			});
		}
	}
</script>
<style>
	/*轮播*/
	
	.indexBox .vux-slider>.vux-swiper {
		height: 279px !important;
	}
	/*菜单*/
	
	.indexBox .contentBox .rowBox {}
	/* .displayBox div:nth-child(7){
  display: block;
  width: 100%;
  margin-right: 50%;
  position: relative;
} */
	
	.displayBox {
		width: 100%;
	}
	
	.indexBox .contentBox .rowBox .squareBox {
		width: 315px;
		float: left;
		padding: 31px 30px;
		height: 88px;
		border-bottom: 2px solid #f4f4f4;
		background: #fff;
		position: relative;
	}
	
	.indexBox .contentBox .rowBox .squareBox b {
		display: inline-block;
		height: 60px;
		width: 2px;
		background: #E5E5E5;
		position: absolute;
		right: 0;
		top: 45px;
	}
	
	.indexBox .contentBox .rowBox .squareBox:nth-child(2) {
		border-right: none;
	}
	
	.indexBox .contentBox .rowBox .displayBox .squareBox {
		background: #F5F3E4;
	}
	
	.indexBox .contentBox .rowBox .displayBox {
		position: relative;
	}
	
	.indexBox .contentBox .rowBox .displayBox i {
		display: inline-block;
		width: 0;
		height: 0;
		border-width: 30px 20px;
		border-style: solid;
		border-color: transparent transparent #F5F3E4 transparent;
		position: absolute;
		top: 100px;
		left: 551px;
		z-index: 999;
	}
	
	
	.indexBox .contentBox .rowBox .displayBox i.left {
		left: 177px;
	}
	
	.indexBox .contentBox .rowBox .displayBox i.right {
		left: 551px;
	}
	
	.indexBox .contentBox .rowBox .displayBox i.top {
		top: 248px;
		left: 177px;
		z-index: 999;
	}
	.indexBox .contentBox .rowBox .displayBox .squareBox:nth-child(2),
	.indexBox .contentBox .rowBox .displayBox .squareBox:nth-child(4),
	.indexBox .contentBox .rowBox .displayBox .squareBox:nth-child(6),
	.indexBox .contentBox .rowBox .displayBox .squareBox:nth-child(8),
	.indexBox .contentBox .rowBox .displayBox .squareBox:nth-child(10) {
		border-right: none;
	}
	
	.indexBox .contentBox .rowBox .squareBox img {
		width: 88px;
		height: 88px;
		display: inline-block;
		float: left;
		margin-right: 15px;
	}
	
	.indexBox .contentBox .rowBox .squareBox p .name {
		font-size: 30px;
		color: rgba(51, 51, 51, 1);
		line-height: 150%;
	}
	
	.indexBox .contentBox .rowBox .squareBox p .suspendText,
	.indexBox .contentBox .rowBox .squareBox p .explainText {
		font-size: 24px;
		color: rgba(153, 153, 153, 1);
		margin-top: 20px;
	}
	
	.indexBox .contentBox .rowBox .squareBox p .hotText {
		color: rgba(255, 255, 255, 1);
		font-size: 24px;
		width: 136px;
		height: 39px;
		background: #d91f37;
		border-radius: 20px;
		display: inline-block;
		text-align: center;
		line-height: 39px;
		margin-top: 13px;
	}
	
	.indexBox .contentBox .rowBox .squareBox p .tipsText {
		font-size: 24px;
		color: #d91f37;
		margin-top: 20px;
	}
	.wenxints{
		box-sizing: border-box;
		padding: 0 20px;
		width: 100%;
		height: 70px;
		/*border: 1px solid red;*/
		background: #FFFFFF;
		font-size: 26px;
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}
	.wenxints img{
		display: block;
		width: 45px;
		height: 45px;
		margin-right: 15px;
	}
	.wenxints span{
		color: #dc3b40;
	}
</style>