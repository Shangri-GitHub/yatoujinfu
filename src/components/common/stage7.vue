<template>
	<div class="stage-dialog-7">

		<el-dialog :show-close="false" custom-class="custom-table" :close-on-click-modal="false" @open='dialogOpen' :visible.sync="dialogFormVisibleEdit">
			<div class="edit-main">
				<span class="close-btn" @click="unLock();closeEdit"></span>
				<div class="check-status-ul">
					<el-steps :align-center="true" :space="110" :active='stageActive' finish-status="success">
						<el-step title="初审"></el-step>
						<el-step title="下户面审"></el-step>
						<el-step title="批贷"></el-step>
						<el-step title="公证"></el-step>
						<el-step title="抵押"></el-step>
						<el-step title="放款"></el-step>
						<el-step title="返点"></el-step>
					</el-steps>
				</div>
			</div>

			<div class="bg">

				<div class="title"><span class="icon"></span>返点</div>
				<div style="margin-top: 24px">
				</div>
				<div style="width: 896px;margin: 0 auto;height: auto;">
					<div class="fk-line" style="margin-top: 24px;">
						<span class="fk-title">借款人姓名</span><span><input type="text" readonly v-model="bdDetailData.custName"></span>
						<span class="fk-title" style="margin-left: 8px;">贷款金额</span><span><input type="text"  v-model="bdDetailData.apprLoanAmtMoney" readonly></span>
					</div>
					<div class="fk-line" style="margin-top: 24px;">
						<span class="fk-title">贷款期限(月)</span><span><input type="text" readonly="readonly"  v-model="bdDetailData.apprLoanTerm"></span>
						<span class="fk-title" style="margin-left: 10px;">信贷员姓名</span><span><input type="text" readonly  v-model="bdDetailData.saleNameC"></span>
					</div>
					<div class="fk-line" style="margin-top: 24px;">
						<span class="fk-title">信贷员银行卡卡号</span><span><input type="text" v-model="saleDetailData.bankId" readonly></span>
						<span class="fk-title" style="margin-left: 8px;">开户行</span><span><input type="text" v-model="saleDetailData.openBank" readonly></span>

					</div>
					<div class="fk-line" style="margin-top: 24px;">
						<span class="fk-title must-input">返点金额(元)</span><span class="edit-input" style="display: inline-block;width: 200px;"><el-input placeholder="" v-model='rebateAmount'></el-input></span>
						<span class="fk-title must-input">返点时间</span>
						<el-date-picker class="readonly edit-input" v-model="rebateTime" type="datetime" size="mini" format='yyyy-MM-dd HH:mm:ss' placeholder="选择日期时间">
						</el-date-picker>
					</div>
					<div class="fk-line" style="margin-top: 24px;">
						<span class="fk-title">返还积分数量</span><span><input type="text"  value="" readonly v-model="rebateInteAmount"></span>
					</div>
					<!--推荐人信息-->
					<span v-if='refereeInfo'>
						<div class="fk-line" style="margin-top: 24px;">
							<span class="fk-title" style="margin-left: 24px;">推荐人姓名</span><span><input type="text" readonly  v-model="refereeInfo.saleNameC"></span>
				</div>
				<div class="fk-line" style="margin-top: 24px;">
					<span class="fk-title">推荐人银行卡卡号</span><span><input type="text" v-model="refereeInfo.bankId" readonly></span>
					<span class="fk-title" style="margin-left: 8px;">推荐人开户行</span><span><input type="text" v-model="refereeInfo.openBank" readonly></span>
				</div>
				<div class="fk-line" style="margin-top: 24px;">
					<span class="fk-title must-input">推荐人返点金额(元)</span><span class="edit-input" style="display: inline-block;width: 200px;"><el-input placeholder="" v-model='recRebateAmount'></el-input></span>
					<span class="fk-title must-input">推荐人返点时间</span>
					<el-date-picker class="readonly edit-input" v-model="recRebateTime" type="datetime" size="mini" format='yyyy-MM-dd HH:mm:ss' placeholder="选择日期时间">
					</el-date-picker>
				</div>
				<div class="fk-line" style="margin-top: 24px;">
					<span class="fk-title must-input">推荐人返还积分数量</span><span class="edit-input" style="display: inline-block;width: 200px;"><el-input placeholder="" v-model='recRebateInteAmount'></el-input></span>
				</div>
				</span>
				<div class="fk-line" style="padding:30px 20px;color: #f31313;" v-if='bdDetailData.businessState==91'>
					<span style="width: 120px;float: left;margin-left: 4px;">拒单原因</span>
					<span style="width: 716px;min-height: 40px;float: left;margin-left: 12px;">{{bdDetailData.refuseReason}}</span>
				</div>
			</div>
			<el-row style="margin-top: 26px;text-align: center;padding-bottom: 40px;" class="fandianBtn">
				<el-col :span="24">
					<div class="grid-content bg-purple-dark">
						<el-button style="margin-right:80px;margin-left: -100px;" type="info" @click="commitRebateInfo()">通过</el-button>
						<el-button type="danger" @click="refuseDialog=true">拒单</el-button>
					</div>
				</el-col>
			</el-row>
	</div>

	</el-dialog>
	<el-dialog title="提示" :close-on-click-modal="false" :visible.sync="refuseDialog" v-if='refuseDialog' style='width:452px;height: 296px;' class='refuseDialog'>
		<div class="refuse-title">
			<span class="refuse-warning"></span>
			<span class="refuse-tip must-input">拒单原因：</span>
		</div>
		<el-input type='textarea' placeholder='请填写拒单原因…' v-model='refuseReason'></el-input>
		<span slot="footer" class="refuse-footer">
			    <el-button @click="refuseDialog=false">取 消</el-button>
			    <el-button type="primary" @click="refuseOrder()">确 定</el-button>
			  </span>
	</el-dialog>

	</div>

</template>
<script>
	export default {
		data() {
			return {
				rebateTime: '',
				refuseReason: '',
				refuseDialog: false,
				rebateAmount: '',
				rebateInteAmount: '',
				rebateInteTime: '',
				recRebateAmount: '',
				recRebateTime: '',
				recRebateInteAmount: '',
				bdDetailData: "", //报单详情
				saleDetailData: "", //信贷员详情
				checked: false,
				dialogFormVisibleEdit: false,
				//				fullscreenLoading: false,
				refereeInfo: '',
				stageActive: 6,
				inviteSaleId: ''
			};
		},
		props: ['orderHouseId', 'openFlag', 'businessStateCode'],
		methods: {
			dialogOpen() {
				$('.content-fd .el-dialog__wrapper').show().css({
					'left': 'auto',
					'right': '-1079px'
				}).animate({
					right: '0'
				});
			},
			unLock() {
				var that = this;
				that.$parent.dialogDestroy = false;
				if(this.openFlag == 'u') {
					this.$http.post("order/unlockOrder", {
						'orderHouseId': that.bdDetailData.orderHouseId
					}).then(function(res) {});
				}
			},
			refuseOrder() {
				var that = this;
				if(this.refuseReason == '') {
					that.$message({
						message: '请填写拒单原因',
						type: 'warning',
						duration: "1500"
					});
					return
				}
				var btnHttpParmas = {
					url: "order/refuse",
					params: {
						orderHouseId: this.bdDetailData.orderHouseId,
						refuseReason: this.refuseReason
					}
				}
				that.$http.post(btnHttpParmas.url, btnHttpParmas.params).then(function(res) {
					if(res.data.respCode == '000000') {
						//						that.fullscreenLoading = false;
						that.showSuccessMsg('拒单');
					} else {
						//						that.fullscreenLoading = false;
						that.showFailMsg('拒单');
					}
				});
			},
			refuseResult() {
				this.refuseDialog = true;
			},
			closeEdit() {
				//this.dialogFormVisible = false
				this.dialogFormVisibleEdit = false
				$(".el-dialog__wrapper").hide()
			},
			setPageItemVisibleState() {
				if(this.openFlag == 'v') {
					$(".fandianBtn").css("display", "none");
					$(".edit-input input").attr('disabled', 'disabled')
				} else if(this.openFlag == 'u') {
					$(".fandianBtn").css("display", "block");
					$(".edit-input input").removeAttr('disabled')
				}
			},
			getSaleInfo(saleMobile) {
				var that = this;
				//信贷员详情saleMobile
				this.$http.get("sale/querySaleInfo", {
					params: {
						'saleMobile': saleMobile,
					}
				}).then(function(res) {
					that.saleDetailData = res.data.resultData;
				});
			},
			//提交返点信息
			commitRebateInfo() {
				var that = this;
				if(that.checkFormInfo()) {
					var inviteSaleId;
					if(that.refereeInfo != '') {
						inviteSaleId = that.refereeInfo.saleId
					}
					//				that.fullscreenLoading = true;
					var btnHttpParmas = {
						url: "rebate/saveRebateApprovalInfo",
						params: {
							saleId: that.saleDetailData.saleId,
							orderHouseId: that.bdDetailData.orderHouseId,
							rebateAmount: that.rebateAmount,
							rebateTime: that.getForMatDate(that.rebateTime),
							rebateInteAmount: that.rebateInteAmount,
							inviteSaleId: inviteSaleId,
							recRebateAmount: that.recRebateAmount,
							recRebateTime: that.getForMatDate(that.recRebateTime),
							recRebateInteAmount: that.recRebateInteAmount
						}
					}
					that.$http.post(btnHttpParmas.url, btnHttpParmas.params).then(function(res) {
						if(res.data.respCode == '000000') {
							//							that.fullscreenLoading = false;
							that.showSuccessMsg('保存');
							var initParams = {
								sc: that.stageCode,
								td: 'contentTableData',
								tt: 'total',
								val: 1,
								ps: 10,
								url: 'order/queryOrderListByStage'
							}
							that.getData(initParams)
						} else {
							//							that.fullscreenLoading = false;
							that.showFailMsg('保存');
						}
					});
				}
			},
			checkFormInfo() {
				//校验输入
				var str = "";
				if(!this.rebateAmount || isNaN(this.rebateAmount)) {
					str = "请填写返点金额";
					this.showMsg(str);
					return false;
				}
				if(!this.rebateTime) {
					str = "请选择返点时间"
					this.showMsg(str);
					return false;
				}
				if(!this.saleDetailData.bankId){
					str = "请补全信贷员银行卡信息";
					this.showMsg(str);
					return false;
				}
				if(this.refereeInfo != '') {
					if(!this.recRebateAmount || isNaN(this.recRebateAmount)) {
						str = "请填写推荐人返点金额";
						this.showMsg(str);
						return false;
					}
					if(!this.recRebateTime) {
						str = "请选择推荐人返点时间"
						this.showMsg(str);
						return false;
					}
				}
				return true;
			},
			//提示校验信息
			showMsg(msg) {
				this.$message({
					message: msg,
					type: 'warning',
					duration: "1500",
				});
			},
			showSuccessMsg(str) {
				var that = this;
				that.$message({
					message: str + '成功',
					type: 'success',
					duration: "1500",
					onClose: function() {
						that.refuseDialog = false;
						that.dialogFormVisibleEdit = false;
						that.$parent.dialogDestroy = false;
						that.$parent.handlePageChange(1)
					}
				});
			},
			showFailMsg(str) {
				var that = this;
				that.$message({
					message: str + '失败',
					type: 'error',
					duration: "1500",
					onClose: function() {
						that.refuseDialog = false;
						that.dialogFormVisibleEdit = false;
						that.$parent.dialogDestroy = false;
						that.$parent.handlePageChange(1)
					}
				});
			}
		},
		mounted: function() {
			var that = this;
			this.$nextTick(function() {
				if(that.businessStateCode == '81') {
					$(".el-steps .el-step").eq(6).find('.el-step__head').removeClass('is-process')
					$(".el-steps .el-step").eq(6).find('.el-step__head').addClass('is-success')
				}
			})
			this.$http.get("order/queryOrderDetailByOrderHouseId", {
				params: {
					'flag': that.openFlag,
					'orderHouseId': that.orderHouseId
				}
			}).then(function(res) {
				console.log(res)
				if(res.data.respCode == '000010') {
					that.showMsg("报单已锁定，请稍后尝试编辑！");
					that.$parent.dialogDestroy = false;
				} else {
					that.setPageItemVisibleState();
					that.dialogFormVisibleEdit = true;
					that.bdDetailData = res.data.resultData;
					that.bdDetailData.regTime = that.getForMatDate2(that.bdDetailData.regTime);
					that.rebateInteAmount = Math.floor((that.bdDetailData.apprLoanAmtMoney * 10) / 10000);
					that.bdDetailData.apprLoanAmtMoney = that.formatMoney(that.bdDetailData.apprLoanAmtMoney, 2, '')
					that.getSaleInfo(that.bdDetailData.saleMobile);
					if(that.businessStateCode == 81) {
						that.stageActive = 7;
						that.rebateAmount = res.data.resultData.rebateAmount;
						if(!res.data.resultData.rebateTime) {
							$('.edit-input .el-icon-time').eq(0).parent().hide()
						} else {
							that.rebateTime = that.getForMatDate(res.data.resultData.rebateTime);
						}
					}
					that.$http.get('sale/querySaleInfoByOwnId', {
						params: {
							'saleId': res.data.resultData.saleId
						}
					}).then(function(res) {
						if(res.data.resultData) {
							that.refereeInfo = res.data.resultData
							console.log(that.refereeInfo)
						}
						that.$nextTick(function() {
							if(that.openFlag == 'v') {
								$('.must-input').removeClass('must-input')
								$('.stage-dialog-7 button').hide()
								$(".stage-dialog-7 .el-input__inner").css('padding-left', '0 !important')
								$('.edit-input input').css('border', '0')
								$('.stage-dialog-7 button').css('border', '0')
								$('.edit-input input').attr('disabled', 'disabled')
								$('.stage-dialog-7 button').attr('disabled', 'disabled')
								$('.edit-input .el-icon-time').hide()
								$('.fandianBtn').hide()
								if(that.businessStateCode < 81) {
									$('.edit-input input').hide()
									$('.edit-input .el-icon-time').hide()
								} else {
									that.recRebateAmount = that.bdDetailData.balanceMoney;
									that.recRebateInteAmount = that.bdDetailData.balanceScore;
									if(!that.bdDetailData.tradeTs) {
										$('.edit-input .el-icon-time').eq(1).parent().hide()
									} else {
										that.recRebateTime = that.getForMatDate2(that.bdDetailData.tradeTs);
									}
									$('.edit-input .el-icon-time').hide()
								}
							}
						})
					})
					that.$nextTick(function() {
						if(that.openFlag == 'v') {
							$('.must-input').removeClass('must-input')
							$('.stage-dialog-7 button').hide()
							$(".stage-dialog-7 .el-input__inner").css('padding-left', '0 !important')
							$('.edit-input input').css('border', '0')
							$('.stage-dialog-7 button').css('border', '0')
							$('.edit-input input').attr('disabled', 'disabled')
							$('.stage-dialog-7 button').attr('disabled', 'disabled')
							$('.edit-input .el-icon-time').hide()
							$('.fandianBtn').hide()
							if(that.businessStateCode < 81) {
								$('.edit-input input').hide()
								$('.edit-input .el-icon-time').hide()
							} else {
								$('.edit-input .el-icon-time').hide()
							}
						}
					})
				}
			}).catch(function(error) {
				that.$parent.dialogDestroy = false;
			});
		}
	};
</script>
<style>
	.stage-dialog-7 {
		width: 100%;
		height: 100%;
		top: 0;
		bottom: 0;
		position: absolute;
		font-size: 14px;
	}
	
	.fk-title {
		white-space: nowrap;
	}
	
	.content-bdlb .stage-dialog-7 .el-dialog__wrapper {
		overflow-x: hidden;
	}
	
	.content-bdlb .stage-dialog-7 .el-dialog__wrapper .el-dialog {
		top: 0 !important;
		margin-bottom: 0;
		height: 100%;
		left: 540px;
	}
	
	.content-bdlb .stage-dialog-7 .refuseDialog .el-dialog {
		position: relative;
		left: 50%;
	}
	
	.stage-dialog-7 button:hover {
		background: #fff;
		border-color: #50BFFF;
		color: #50BFFF;
	}
	
	.stage-dialog-7 button {
		padding: 10px 15px;
		width: 94px;
		font-size: 14px;
		background: #fff;
		border: 1px solid rgb(191, 203, 217);
		color: rgb(31, 45, 61);
	}
	
	.stage-dialog-7 button:nth-of-type(2):hover {
		background: #fff;
		border-color: #f7ba2a;
		color: #f7ba2a;
	}
	
	.content-bdlb .stage-dialog-7 .fandianBtn button:nth-of-type(1) {
		margin-left: -100px !important;
	}
	.stage-dialog-7 .fk-title{
		margin-left: 24px;
	}
</style>