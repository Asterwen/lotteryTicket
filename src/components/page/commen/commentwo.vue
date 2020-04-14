<template>
	<div class="backBox">
		<!--<a class="and" href="http://116.62.71.25/lecai_download/downloadApp?appType=1" ></a>
		<a class="ios" href="itms-services://?action=download-manifest&url=https://raw.githubusercontent.com/lecai1/lc/master/manifest.plist" ></a>-->
		<a class="and"  @click="add(1)"></a>
		<a class="ios"  @click="add(2)"></a>
		<div class="Box_img" @click="return_back">
			<img src="../../../assets/img/fanhui.png"/>
			<span>返回</span>
		</div>
		<!--<div class="backBoxMc" v-if="signBoo">
			<div class="backBoxMcBox sign">
				<group>
					<x-input class="classaccount" :max="11" v-model="params.account" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile">
						<img slot="label" src="../../../assets/img/geren2.png">
					</x-input>
					<div class="Verifcode">
						<img slot="label" src="../../../assets/img/66.png" class="label">
						<input type="text" class="Pleaseinput" v-model="params.code" maxlength="4" placeholder="手机验证码" keyboard="number" />
						<span class="startMsg" :class="{disabled: !this.canClick}" @click="getVerifyCode()">{{content}}</span>
					</div>
					<x-input class="Pleaseinput2" :max="10" :min="4" v-model="params.psw" placeholder="请输入登录密码" keyboard="text" type="password">
						<img slot="label" src="../../../assets/img/55.png">
					</x-input>
					<x-input :max="10" :equal-with="params.psw" v-model="params.spsw" placeholder="请重复输入新密码" keyboard="text" type="password">
						<img slot="label" src="../../../assets/img/55.png">
					</x-input>
				</group>
				<box gap="30px 30px">
					<x-button action-type="submit" @click.native="signNow()" type="primary" class="zhuce">注册</x-button>
				</box>
			</div>
		</div>-->
		<toast v-model="toast.showValue" type="text" :time="1200" is-show-mask position="middle">{{toast.textValue }}</toast>
		<!--遮照-->
		<div class="zhezhao" v-show="flag">
			<div>
				<p><span>1</span>点击右上角的<img src="../../../assets/img/diandiandianshu.png"/>按钮<img src="../../../assets/img/jiantou.png" class="wanimg"/></p>
				<p><span>2</span>选择在<img src="../../../assets/img/liulanqi.png"/>浏览器打开</p>
			</div>
		</div>
		<!--温馨提示-->
		<div class="Reminder" v-show="Reminder">
			如果您已点击安装，请关闭浏览器去查看下载内容。
		</div>
	</div>
</template>
<script>
	import { Group, XInput, XButton, Box, Toast } from "vux";
	import { mapState, mapActions } from "vuex";
	export default {
		components: {
			Group,
			XInput,
			XButton,
			Box,
			Toast
		},
		computed: {
			...mapState({
				publicInfo: "publicInfo"
			})
		},
		created() {
			// this.params.srcFrom = 14820537;
			// console.log('传参',this.$route.query.id)//http://localhost:8080/#/commen?dataS=143820537
			this.params.srcFrom = this.$route.query.id;
			// console.log('srcFrom',this.$route.query.id)
			this.Id = this.$route.params.Id;
				var ua = navigator.userAgent.toLowerCase();

			if (ua.match(/MicroMessenger/i) == "micromessenger") {
					this.flag = true
                //在微信中打开
        	}else{
					this.flag = false
        			}
		},
		methods: {

			...mapActions([
				"setPublicHeaderStatus",
				"setLandingStatus",
				"setBottomNavigation",
				"setUserInfo"
			]),
			return_back() {
				this.$router.go(-1)
			},
			add(type){
				const that = this;
				if(type==1){
					window.location.href = "http://116.62.71.25/lecai_download/downloadApp?appType=1"
					that.Reminder = true;
					setTimeout(function() {
						that.Reminder = false;
					}, 8000)
				}else{
					window.location.href = "itms-services://?action=download-manifest&url=https://raw.githubusercontent.com/lecai1/lc/master/manifest.plist"
					that.Reminder = true;
					setTimeout(function() {
						that.Reminder = false;
					}, 8000)
				}
			},
			signNow() {
				for(let i in this.params) {
					if(this.params[i] == "") {
						this.toast.textValue = "注册信息不能为空";
						this.toast.showValue = true;
						return false;
					}
				}
				this.$api
					.registerApp(this.params)
					.then(res => {
						if(res.data.code == 0) {
							//判断实名
							// this.$router.push({ path: "/page/index" });
							this.toast.textValue = '注册完成,请下载登录!';
							this.toast.showValue = true;
							this.signBoo = false;
						} else {
							this.toast.textValue = res.data.message;
							this.toast.showValue = true;
						}
					})
					.catch(err => {
						this.toast.textValue = "注册失败请重试";
						this.toast.showValue = true;
					});
			},
			getVerifyCode() {
				// if (this.finishInvite == false) {
				//   this.toast.textValue = "邀请码不能为空";
				//   this.toast.showValue = true;
				//   return false;
				// }
				let reg = /^1[34578]\d{9}$/;
				let signCode = {};
				signCode.type = "1";
				signCode.smsType = "1";
				let phoneNumber = this.params.account;
				if(phoneNumber != "" && reg.test(phoneNumber)) {
					signCode.mobile = phoneNumber;
					this.$api
						.code(signCode)
						.then(res => {
							this.countDown();
						})
						.catch(err => {
							this.canClick = true;
						});
				} else {
					this.toast.textValue = "手机号不正确";
					this.toast.showValue = true;
				}
			},
			countDown() {
				if(!this.canClick) return; //改动的是这两行代码
				this.canClick = false;
				this.content = this.totalTime + "s后重新发送";
				let clock = window.setInterval(() => {
					this.totalTime--;
					this.content = this.totalTime + "s后重新发送";
					if(this.totalTime < 0) {
						window.clearInterval(clock);
						this.content = "重新发送验证码";
						this.totalTime = 60;
						this.canClick = true; //这里重新开启
					}
				}, 1000);
			},
		},
		data() {
			return {
				Id: 0,
				userInfo: {
					type: Object
				},
				finishInvite: false,
				toast: {
					showValue: false,
					textValue: "成功"
				},
				content: "发送验证码", // 按钮里显示的内容
				totalTime: 60, //记录具体倒计时时间
				canClick: true, //添加canClick
				params: {
					account: "",
					psw: "",
					spsw: "",
					code: "",
					srcFrom: ""
				},
				signBoo: true, //注册台展示
				flag: false,
				Reminder: false
			};
		},
		mounted(){


		}
	};
</script>
<style scoped>
	.backBox {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		height: 100%;
		background: url("../../../assets/img/mine/backimg.png");
		background-size: 100% 100%;
		overflow: hidden;
	}
	.Box_img{
		width: 150px;
		height: 60px;
		/*border: 1px solid #000000;*/
		position: absolute;
		top: 50px;
		left: 30px;
		display: flex;
		align-items: center;
		font-size: 30px;
		color: #FFFFFF;
	}
	.Box_img img{
		display: block;
		width: 55px;
		height: 45px;
	}
	.backBox p {
		width: 60%;
		height: 60px;
	}

	a {
		display: block;
		width: 60%;
		height: 80px;
		margin-left: 20%;
	}

	.and {
		background: #fff;
		background: url("../../../assets/img/mine/andbackimg.png");
		background-size: 100% 100%;
		margin-top: 110%;
	}

	.ios {
		background: yellow;
		background: url("../../../assets/img/mine/iosbackimg.png");
		background-size: 100% 100%;
		margin-top: 5%;
	}

	.backBoxMc {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		/*display: flex;
		justify-content: center;
		padding-top: 30%;*/
		/* align-items: center; */
		padding: 26% 70px;

	}
	.zhezhao{
		box-sizing: border-box;
		padding: 100px 0 0 50px;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		color: #FFFFFF;
		font-size: 30px;
	}
	.zhezhao p{
		width: 100%;
		margin-top: 40px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.zhezhao span{
		display: block;
		border-radius: 50%;
		width: 45px;
		height: 45px;
		background: indianred;
		color: #FFFDEF;
		text-align: center;
		line-height: 45px;
		margin-right: 20px;
	}
	.zhezhao img:nth-of-type(1){
		width: 50px;
		height: 50px;
		background: #CCCCCC;
		margin: 0 15px;
	}
	.wanimg{
		/*width: 200px;
		height: 40px;*/
		width: 200px;
	}
	.Reminder{
		box-sizing: border-box;
		padding-left: 20px;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100px;
		line-height: 100px;
		background: rgba(0, 0, 0, 0.5);
		font-size: 30px;
		color: #FFFFFF;
	}	
	.backBoxMcBox {
		/*display: none;*/
		width: 80%;
		height: 600px;
		background: #fff;
		border-radius: 10px;
	}
	.zhuce{
		background: #000000;
	}

.weui-cell:before {
  border-top: 0 !important;
}

.sign .weui-cells:after {
  border-bottom: 0;
}

.sign .vux-x-input {
  width: 400px;
  height: 60px;
  margin-top: 36px;
  margin-left: 60px;
  border-bottom: 1px solid rgba(169, 169, 169, 1);
}

.sign .weui-cell__hd img {
  width: 40px;
  height: 40px;
  padding-right: 30px;
}

.sign button.weui-btn,
input.weui-btn {
  height: 80px!important;
  background-color: #d91f37;
  color: #fff;
  font-size: 16px;
}
/*登录提示信息框框及字体大小修改*/

	.vux-toast .weui-toast {
		/* padding: 5px 8px; */
		display: flex;
		justify-content: center;
		align-items: center;
		width: auto !important;
		height: auto !important;
		font-size: 12px;
	}

	.vux-toast .weui-toast .weui-toast__content {
		font-size: 12px;
	}
	/*输入框右侧小图标样式修改*/

	.sign .vux-x-input .weui-cell__ft .weui_icon_warn:before,
	.sign .vux-x-input .weui-cell__ft .weui_icon_clear,
	.sign .vux-x-input .weui-cell__ft .weui-icon-success {
		font-size: 30px;
	}

	.sign .weui-cells {
		margin-top: 0;
		font-size: 32px;
		background-color: #f4f4f4;
	}

	.sign .weui-input {
		font-size: 32px;
		color: #666;
	}
	.sign .weui-cells:before {
		border-top: 0;
	}

	.sign .Verifcode {
		box-sizing: border-box;
		padding: 0 50px 0 10px;
		width: 90%;
		height: 110px;
		float: right;
		border-bottom: 1px solid rgba(169, 169, 169, 1);	
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.Pleaseinput2{
		width: 90%;
		height: 90px!important;
	}
	.Verifcode .label{
		width: 45px;
		height: 50px;
	}
	.Pleaseinput{
		box-sizing: border-box;
		width: 190px;
		height: 60px;
		padding-left: 10px;
		font-size: 26px;
		border: none;
		outline: none;
		border-radius: 0;
		background: none;
	}
	.sign .disabled {
		background-color: #ddd;
		border-color: #ddd;
		color: #57a3f3;
		cursor: not-allowed;
	}

	.weui-cell:before {
		border-top: 0 !important;
	}

	.sign .weui-cells:after {
		border-bottom: 0;
	}

	.sign .vux-x-input {
		width: 600px;
		height: 60px;
		margin-top: 36px;
		margin-left: 60px;
		font-size: 26px;
		border-bottom: 1px solid rgba(169, 169, 169, 1);
	}

	.sign .weui-cell__hd img {
		width: 40px;
		height: 40px;
		padding-right: 30px;
	}

	.sign {
		position: relative;
	}

	.sign button.weui-btn,
	input.weui-btn {
		position: absolute;
		bottom: 5%;
		left: 10%;
		width: 80%;
		height: 60px;
		line-height: 60px;
		background-color: #d91f37;
		color: #fff;
		font-size: 28px;
	}
	.vux-x-input-xqcx2 {
		position: absolute;
		top: 0;
		left: 0;
	}

	.startMsg {
		display: inline-block; 
		width: 200px;
		height: 60px;
		background-color: #d91f37;
		border-radius: 5px;
		text-align: center;
		line-height: 60px;
		font-size: 26px;
		color: #fff;
	}
	/* span.sentMsg {
  display: inline-block;
  position: absolute;
  margin-left: 30px;
  margin-top: 30px;
  width: 130px;
  height: 60px;
  background-color: #d91f37;
  border-radius: 5px;
  text-align: center;
  line-height: 60px;
  color: #fff;
} */
	/*登录提示信息框框及字体大小修改*/

	.sign .vux-toast .weui-toast {
		padding: 5px 8px;
		width: 240px !important;
	}

	.sign .vux-toast .weui-toast .weui-toast__content {
		font-size: 30px;
	}
</style>
