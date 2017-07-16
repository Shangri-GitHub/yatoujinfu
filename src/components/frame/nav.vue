<template>
	<div>
		<div id="header">
			<div class="header-left">
				<span class="header-left-logo"></span>
				<span class="header-logo-text"></span>
			</div>
			<div class="header-right-login">
				<div class="pending-tip">
					<span></span>
					<p>待处理（{{pendingNum}}）</p>
				</div>
				<div class="login-box">
					<div class="login-status">
						<span></span>
						<p>{{opName}}</p>
					</div>
					<div class="login-hover">
						<div class="pw-change" @click="changePwDialog=true">
							<span></span>
							<p>修改密码</p>
						</div>
						<div class="login-control">
							<span></span>
							<p @click="dialogVisibleClose = true">注销</p>
						</div>
					</div>
				</div>

				<el-dialog style="z-index: 20000" title="提示" :visible.sync="dialogVisibleClose" size="tiny">
					<span>确认是否退出？</span>
					<span slot="footer" class="dialog-footer">
				      <el-button size="small" @click="dialogVisibleClose = false">取 消</el-button>
				      <el-button type="info" size="small" @click="Logout">确 定</el-button>
				    </span>
				</el-dialog>

			</div>
		</div>
		<div id="nav">
			<ul class="nav-list-ul">
				<li v-for="item in items" class="nav-list" @click='getList($event,item.funcCode,item.funcUrl)'>
					<div v-if="item.funcCode=='bdlb'">
						<img :src="bdlbImg" />
					</div>
					<div v-if="item.funcCode=='cp'">
						<img :src="cpImg" />
					</div>
					<div v-if="item.funcCode=='xhms'">
						<img :src="xhmsImg" />
					</div>
					<div v-if="item.funcCode=='pd'">
						<img :src="pdImg" />
					</div>
					<div v-if="item.funcCode=='gz'">
						<img :src="gzImg" />
					</div>
					<div v-if="item.funcCode=='dy'">
						<img :src="dyImg" />
					</div>
					<div v-if="item.funcCode=='fk'">
						<img :src="fkImg" />
					</div>
					<div v-if="item.funcCode=='fd'">
						<img :src="fjImg" />
					</div>
					<div v-if="item.funcCode=='bdjs'">
						<img :src="bdjsImg" />
					</div>
					<div v-if="item.funcCode=='xdygl'">
						<img :src="xdyglImg" />
					</div>
					<div v-if="item.funcCode=='zzyggl'">
						<img :src="zzygglImg" />
					</div>
					<div v-if="item.funcCode=='jsgl'">
						<img :src="hsglImg" />
					</div>
					<div v-if="item.funcCode=='jsgngl'">
						<img :src="jsgnglImg" />
					</div>
					<input type='hidden' :value='item.funcCode' />
					<p>{{item.funcName}}</p>
				</li>
			</ul>
		</div>
		<div id="content-box">
			<router-view @closeModel='close'></router-view>
		</div>
		<span style="display: none;">
			<audio :src="tipAudio" id="mes-tip" preload></audio>
		</span>
		<el-dialog title="修改密码" :visible.sync="changePwDialog" :close-on-click-modal="false" style='width:452px;height: 402px;' class='changePwDialog'>
			<p>旧密码</p>
			<el-input placeholder='' auto-complete="off" type="password" v-model='oldPw'></el-input>
			<p>新密码</p>
			<el-input placeholder='' auto-complete="off" type="password" v-model='newPw'></el-input>
			<p>确认密码</p>
			<el-input placeholder='' auto-complete="off" type="password" v-model='checkPw'></el-input>
			<span slot="footer">
			    <el-button @click="changePwDialog=false">取 消</el-button>
			    <el-button type="primary" @click="changePw()">确 定</el-button>
			  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {

		data() {
			return {
				dialogVisibleClose: false,
				changePwDialog: false,
				items: [],
				opName: '',
				oldPw: '',
				newPw: '',
				checkPw: '',
				tipAudio: this.$http.defaults.baseURL + 'common/downloadPdf?attachId=1',
				pendingNum: 0,
				loginStatus: false,
				bdlbImg: require('../../theme/default/images/nav/bdlb.png'),
				cpImg: require('../../theme/default/images/nav/cp.png'),
				xhmsImg: require('../../theme/default/images/nav/xhms.png'),
				pdImg: require('../../theme/default/images/nav/pd.png'),
				gzImg: require('../../theme/default/images/nav/gz.png'),
				dyImg: require('../../theme/default/images/nav/dy.png'),
				fkImg: require('../../theme/default/images/nav/fk.png'),
				fjImg: require('../../theme/default/images/nav/fd.png'),
				bdjsImg: require('../../theme/default/images/nav/ddjs.png'),
				xdyglImg: require('../../theme/default/images/nav/xdygl.png'),
				zzygglImg: require('../../theme/default/images/nav/zzyggl.png'),
				hsglImg: require('../../theme/default/images/nav/jsgl.png'),
				jsgnglImg: require('../../theme/default/images/nav/jsgngl.png')
			}
		},
		watch: {
			changePwDialog(val) {
				if(!val) {
					this.oldPw = '';
					this.newPw = '';
					this.checkPw = '';
				}
			}
		},
		methods: {
			getList($event, name, funcUrl) {
				$('.nav-list').removeClass('nav-list-active');
				$event.currentTarget.className = 'nav-list nav-list-active';
				//                this.$router.push('/nav/' + name)
				this.$router.push({
					path: '/nav/' + name,
					query: {
						funcUrl: funcUrl
					}
				})
			},
			open() {
				$('#cover').show()

			},
			close() {
				$('#cover').hide()
				this.$router.go('-1')
			},
			changePw() {
				var that = this;
				if(this.oldPw != '' && this.newPw != '' && this.checkPw != '') {
					if(this.newPw !== this.checkPw) {
						this.$message({
							message: '两次密码不一致',
							type: 'warning',
							duration: "1500"
						});
						return
					}
					this.$http.post('sys/op/modifyPassword', {
						oldPwd: that.oldPw,
						newPwd: that.newPw
					}).then(function(res) {
						console.log(res)
						if(res.data.result == '1') {
							that.$message({
								message: '密码修改成功',
								type: 'success',
								duration: "1500",
								onClose: function() {
									that.Logout()
								}
							});
						} else if(res.data.result == '2') {
							that.$message({
								message: '旧密码错误',
								type: 'warning',
								duration: "1500",
								onClose: function() {
									that.changePwDialog = false;
								}
							});
						} else if(res.data.result == '3') {
							that.$message({
								message: 'session已过期',
								type: 'warning',
								duration: "1500",
								onClose: function() {
									that.changePwDialog = false;
								}
							});
						}
					})
				} else {
					this.$message({
						message: '请完整填写',
						type: 'warning',
						duration: "1500"
					});
				}
			},

			Logout() {
				var that = this;
				var params = {
					url: 'yatouLogout'
				}
				this.$http.get(params.url, {}).then(function(res) {
					if(res.data.success) {
						that.loginStatus = false;
						that.$router.push({
							path: '/'
						})
					} else {
						that.$message.error(res.data.errMsg);
					}
				})
			}
		},
		mounted: function() {
			this.items = JSON.parse(localStorage.getItem('powerList')).list;
			this.opName = this.items[0].opName;
			this.loginStatus = true;
			var that = this;

			function checkMes() {
				console.log(that.loginStatus)
				if(!that.loginStatus) {
					return
				} else {
					that.$http.get('order/queryOrderListDealCount', {}).then(function(res) {
						if(res.data.resultData <= that.pendingNum) {
							that.pendingNum = res.data.resultData;
							return
						}
						that.pendingNum = res.data.resultData;
						if(res.data.resultData > 0) {
							$("#mes-tip")[0].play()
						}
					})
					setTimeout(function() {
						checkMes()
					}, 30000)
				}

			};
			checkMes();
			var reg = /^.*(nav|nav\/)$/;
			var url = window.location.href;
			url = url.split('?');
			if(reg.exec(url[0])) {
				this.$nextTick(function() {
					var linkFlag = $(".nav-list").eq(0).find('input').val();
					$(".nav-list").eq(0).addClass('nav-list-active')
					this.$router.push('/nav/' + linkFlag)
				})
			} else {
				url = url[0].split('/');
				var flag = url[url.length - 1];
				this.$nextTick(function() {
					var len = $(".nav-list").length;
					for(var i = 0; i < len; i++) {
						if($(".nav-list").eq(i).find('input').val() == flag) {
							$(".nav-list").eq(i).addClass('nav-list-active')
						}
					}
				})
			}

		}
	}
</script>

<style>

</style>