<template>
	<div class="content-fd">

		<search flag='7' :curPage='curPage' tableData='contentTableData'></search>
		<div class="fd-bottom bottom">
			<div class="fd-data-box">
				<el-table :data="contentTableData" :empty-text='emptyText' border style="width:100%;" highlight-current-row @cell-click='getThisDetailDataFC'>
					<el-table-column prop="orderHouseCode" label="报单编号" width='180' show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="houAddr" label="房产地址" width='320' show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="saleNameC" label="信贷员">
					</el-table-column>
					<el-table-column prop="regTime" label="提交时间" width='160'>
					</el-table-column>
					<el-table-column prop="businessState" label="报单状态" width='140'>
					</el-table-column>
					<el-table-column prop="operate" label="操作" width='150'>
						<template scope="scope">
							<span class="edit-icon" v-if='scope.row.businessStateCode=="71"'></span>
							<el-button type="text" @click="" size="small" v-if='scope.row.businessStateCode=="71"'>编辑</el-button>
							<span class="info-icon"></span>
							<el-button type="text" size="small" @click="">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination small @current-change="handlePageChange" :current-page="curPage" :page-size="10" layout="total,  prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!--modal编辑-->
		<component v-bind:is="dialogStageCode" :orderHouseId='orderHouseId' :openFlag='openFlag' :businessStateCode='businessStateCode' v-if='dialogDestroy'></component>

		<!--<el-dialog top="38px" :show-close="false" custom-class="custom-table" :close-on-click-modal="false" @open='dialogOpen' :visible.sync="dialogFormVisibleEdit">-->

		<!--<div class="edit-main">-->
		<!--<span class="close-btn" @click="unLock();closeEdit"></span>-->
		<!--<div class="check-status-ul">-->
		<!--<el-steps :align-center="true" :space="110" :active='6' finish-status="success">-->
		<!--<el-step title="初审"></el-step>-->
		<!--<el-step title="下户面审"></el-step>-->
		<!--<el-step title="批贷"></el-step>-->
		<!--<el-step title="公证"></el-step>-->
		<!--<el-step title="抵押"></el-step>-->
		<!--<el-step title="放贷"></el-step>-->
		<!--<el-step title="返点"></el-step>-->
		<!--</el-steps>-->
		<!--</div>-->
		<!--</div>-->

		<!--<div class="bg">-->

		<!--<div class="title"><span class="icon"></span>返点</div>-->
		<!--<div style="margin-top: 24px">-->
		<!--</div>-->
		<!--<div style="width: 896px;margin: 0 auto;height: auto;">-->
		<!--<div class="fk-line" style="margin-top: 24px;">-->
		<!--<span class="fk-title">借款人姓名</span><span><input type="text" readonly v-model="bdDetailData.custName"></span>-->
		<!--<span class="fk-title">贷款金额</span><span><input type="text"  v-model="bdDetailData.apprLoanAmtMoney" readonly></span>-->
		<!--</div>-->
		<!--<div class="fk-line" style="margin-top: 24px;">-->
		<!--<span class="fk-title">贷款期限</span><span><input type="text" readonly="readonly"  v-model="bdDetailData.apprLoanTerm">月</span>-->
		<!--<span class="fk-title" style="margin-left: 10px;">信贷员姓名</span><span><input type="text" readonly  v-model="bdDetailData.saleNameC"></span>-->
		<!--</div>-->
		<!--<div class="fk-line" style="margin-top: 24px;">-->
		<!--<span class="fk-title">信贷员银行卡卡号</span><span><input type="text" v-model="saleDetailData.bankId" readonly></span>-->
		<!--<span class="fk-title">开户行</span><span><input type="text" v-model="saleDetailData.openBank" readonly></span>-->

		<!--</div>-->
		<!--<div class="fk-line" style="margin-top: 24px;">-->
		<!--<span class="fk-title">返点金额</span><span class="edit-input"><input type="text" style="background: #fff;" value="" v-model="rebateAmount" class="edit"></span>-->
		<!--<span class="fk-title">返点时间</span>-->
		<!--<el-date-picker class="readonly edit-input" v-model="rebateTime" type="datetime" size="mini" format='yyyy-MM-dd HH:mm:ss' placeholder="选择日期时间">-->
		<!--</el-date-picker>-->
		<!--</div>-->
		<!--<div class="fk-line" style="margin-top: 24px;">-->
		<!--<span class="fk-title">返还积分数量</span><span><input type="text"  value="" readonly v-model="rebateInteAmount"></span>-->
		<!--<span class="fk-title">返还积分时间</span>-->
		<!--<el-date-picker class="readonly edit-input" v-model="rebateInteTime" type="datetime" size="mini" format='yyyy-MM-dd HH:mm:ss' placeholder="选择日期时间">-->
		<!--</el-date-picker>-->
		<!--</div>-->
		<!--</div>-->
		<!--<el-row style="margin-top: 26px;text-align: center" class="fandianBtn">-->
		<!--<el-col :span="24">-->
		<!--<div class="grid-content bg-purple-dark">-->
		<!--<el-button style="margin: 0 80px" type="info" @click="commitRebateInfo()">通过</el-button>-->
		<!--<el-button type="danger" @click="refuseBtn()">拒单</el-button>-->
		<!--</div>-->
		<!--</el-col>-->
		<!--</el-row>-->
		<!--</div>-->

		<!--</el-dialog>-->

	</div>

</template>
<script>
	export default {
		data() {
			return {
				emptyText: '加载中',
				curPage: 1,
				stageCode: 7,
				total: 0,
				dataTotal: [],
				contentTableData: [],
				dialogStageCode: '',
				orderHouseId: '',
				openFlag: '',
				businessStateCode: '',
				dialogDestroy: false,
				searching: false,
				orderHouseCode: '',
				saleName: '',
				startTime: '',
				endTime: ''
			};
		},
		methods: {
			handlePageChange(val) {
				var that = this;
				that.curPage = val;
				if(that.searching) {
					var params = {
						orderHouseCode: that.orderHouseCode,
						saleName: that.saleName,
						stageCode: this.stageCode,
						startRegTime: that.getForMatDate(that.startTime),
						endRegTime: that.getForMatDate(that.endTime),
						currentPage: val,
						pageSize: 10
					};
					that.searchPageChange(params);
				} else {
					var params = {
						sc: this.stageCode,
						td: 'contentTableData',
						tt: 'total',
						val: val,
						ps: 10,
						url: 'order/queryOrderListByStage'
					}
					this.getData(params)
				}

			},
			//打开详情页，初始化数据
			getThisDetailDataFC(e, b, c, a) {
				a = event ? event : window.event;
				var str = a.target.innerText.replace(/^\s+|\s+$/g, "");
				var that = this;
				that.businessStateCode = e.businessStateCode;
				that.orderHouseId = e.orderHouseId;
				if(b.property == 'operate') {
					if(str == "编辑") {
						that.openFlag = 'u';
						that.dialogStageCode = 'stage7'
						that.dialogDestroy = true;
					} else if(str == "查看") {
						that.openFlag = 'v';
						that.dialogStageCode = 'stage7'
						that.dialogDestroy = true;
					}
				}
			},
			//            //打开详情页，初始化数据
			//            getThisDetailDataFC(orderHouseId, flag){
			//                var that = this;
			//                this.$http.get("order/queryOrderDetailByOrderHouseId", {
			//                    params: {
			//                        'flag':flag,
			//                        'orderHouseId': orderHouseId,
			//                    }
			//                }).then(function (res) {
			//                    if (res.data.respCode=='000010'){
			//                        that.showMsg("报单已锁定，请稍后尝试编辑！");
			//                    } else {
			//                        that.setPageItemVisibleState(flag);
			//                        that.dialogFormVisibleEdit = true;
			//                        that.bdDetailData = res.data.resultData;
			//                        that.bdDetailData.regTime = that.getForMatDate2(that.bdDetailData.regTime);
			//                        that.rebateInteAmount = (that.bdDetailData.apprLoanAmtMoney*10)/10000;
			//                        that.getSaleInfo(that.bdDetailData.saleMobile);
			//                    }
			//                });
			//                //}
			//            },
			//			previesList() {
			//				$('.previes').toggleClass('showself')
			//			},
			//			closeEdit() {
			//				this.dialogFormVisibleEdit = false
			//				$(".el-dialog__wrapper").hide()
			//			},
			//			handleEdit(index, row) {
			//				console.log(index, row);
			//			},
			//            unLock(){
			//                var that = this;
			//                if(this.openFlag=='u') {
			//                    this.$http.get("order/unlockOrder", {
			//                        params: {
			//                            'orderHouseId': that.bdDetailData.orderHouseId,
			//                        }
			//                    }).then(function (res) {
			//                    });
			//                }
			//            },
			//
			//			fdShowMore() {
			//				if($('.fd-top-more').css('display') == 'none') {
			//					$(".fd-bottom").animate({
			//						marginTop: '78px'
			//					})
			//					setTimeout(function() {
			//						$('.fd-top-more').slideDown()
			//					}, 200)
			//				} else {
			//					$('.fd-top-more').slideUp()
			//					setTimeout(function() {
			//						$(".fd-bottom").animate({
			//							marginTop: '0'
			//						})
			//					}, 200)
			//				}
			//
			//			},
			//			dialogOpen() {
			//				$('.content-fd .el-dialog__wrapper').show().css({
			//					'left': 'auto',
			//					'right': '-1079px'
			//				}).animate({
			//					right: '0'
			//				});
			//			},
			//
			//            setPageItemVisibleState(flag){
			//                if(flag=='v'){
			//                    $(".fandianBtn").css("display", "none");
			//                    $(".edit-input input").attr('disabled','disabled')
			//				} else if(flag=='u'){
			//                    $(".fandianBtn").css("display", "block");
			//                    $(".edit-input input").removeAttr('disabled')
			//                }
			//			},
			//			getSaleInfo(saleMobile){
			//                var that = this;
			//                //信贷员详情saleMobile
			//                this.$http.get("sale/querySaleInfo", {
			//                    params: {
			//                        'saleMobile': saleMobile,
			//                    }
			//                }).then(function (res) {
			//                    that.saleDetailData = res.data.resultData;
			//                });
			//			},
			//			//提交返点信息
			//			commitRebateInfo(){
			//                	var that=this;
			//	                if(that.checkFormInfo()) {
			//                        var btnHttpParmas = {
			//                            url: "rebate/saveRebateApprovalInfo",
			//                            params: {
			//                                saleId:that.saleDetailData.saleId,
			//                                orderHouseId:that.bdDetailData.orderHouseId,
			//                                rebateAmount: that.rebateAmount,
			//                                rebateTime: that.getForMatDate(that.rebateTime),
			//                                rebateInteAmount: that.rebateInteAmount,
			//                                rebateInteTime: that.getForMatDate(that.rebateInteTime)
			//                            }
			//                        }
			//                        that.$http.get(btnHttpParmas.url, {
			//                            params: btnHttpParmas.params
			//                        }).then(function(res) {
			//                            if(res.data.respCode=='000000'){
			//                                that.showSuccessMsg();
			//                                var initParams = {
			//									sc:that.stageCode,
			//									td: 'contentTableData',
			//									tt: 'total',
			//									val: 1,
			//									ps: 10,
			//									url: 'order/queryOrderListByStage'
			//								}
			//								that.getData(initParams)
			//                            } else {
			//								that.showFailMsg();
			//                            }
			//                        });
			//                    }
			//			},
			//			checkFormInfo(){
			//                //校验输入
			//                var str="";
			//                if(!this.rebateAmount||!Number(this.rebateAmount)){
			//                    str= "请填写返点金额";
			//                    this.showMsg(str);
			//                    return false;
			//                }
			//                if(!this.rebateTime){
			//                    str= "请选择返点时间"
			//                    this.showMsg(str);
			//                    return false;
			//                }
			//                if(!this.rebateInteAmount||!Number(this.rebateInteAmount)){
			//                    str= "请填写返还积分数量"
			//                    this.showMsg(str);
			//                    return false;
			//                }
			//                if(!this.rebateInteTime){
			//                    str= "请选择返还积分时间"
			//                    this.showMsg(str);
			//                    return false;
			//                }
			//                return true;
			//			},
			//			//提示校验信息
			//			showMsg(msg){
			//                this.$message({
			//                    message: msg,
			//                    type: 'warning',
			//                    duration: "1500",
			//                });
			//			},
			//			showSuccessMsg(){
			//			    var that = this;
			//                that.$message({
			//                    message: '操作成功',
			//                    type: 'success',
			//                    duration: "1500",
			//                    onClose: function () {
			//                        that.dialogFormVisibleEdit = false;
			//                    }
			//                });
			//			},
			//			showFailMsg(){
			//			    var that = this;
			//                that.$message({
			//                    message: '操作失败',
			//                    type: 'error',
			//                    duration: "1500",
			//                    onClose: function () {
			//                        that.dialogFormVisibleEdit = false;
			//                    }
			//                });
			//			},
			//			//拒单
			//            refuseBtn(){
			//                var that = this;
			//            	var btnHttpParmas = {
			//                url: "order/refuse",
			//                	params: {
			//                    	orderHouseId: this.bdDetailData.orderHouseId
			//                	}
			//            	}
			//                that.$http.get(btnHttpParmas.url, {
			//                    params: btnHttpParmas.params
			//                }).then(function(res) {
			//                    if(res.data.respCode=='000000'){
			//                        that.showSuccessMsg();
			//                    } else {
			//                        that.showFailMsg();
			//                    }
			//				});
			//        },
		},
		mounted: function() {
			var initParams = {
				sc: this.stageCode,
				td: 'contentTableData',
				tt: 'total',
				val: 1,
				ps: 10,
				url: 'order/queryOrderListByStage'
			}
			this.getData(initParams)
		}
	};
</script>
<style>
	.stage-dialog-7 .fk-line input {
		border: 0;
	}
	
	.stage-dialog-7 .fk-line .edit-input input,
	.stage-dialog-7 .fk-line .edit-input select {
		border: 1px solid rgb(191, 203, 217);
	}
	
	.stage-dialog-7 .fk-line .edit-input input:hover,
	.stage-dialog-7 .fk-line .edit-input select:hover {
		border: 1px solid  rgb(131, 145, 165);
	}
	
	.fk-line .el-date-editor input {
		background: #fff;
		height: 28px;
		line-height: 28px;
	}
	
	.content-fd .el-dialog {
		height: auto;
		/*padding-bottom: 40px;*/
		width: 1060px;
		top: 0px!important;
		height: 100%;
		margin: 0;
		width: 100%;
	}
	
	.fd-line {
		width: 100%;
		height: auto;
	}
	
	.fd-line .fd-title {
		width: 120px;
		display: inline-block;
		margin-left: 24px;
	}
	
	.fd-line textarea {
		border: 0;
		outline: 0;
	}
	
	.fd-line input {
		height: 24px;
		line-height: 24px;
		text-indent: 4px;
		font-size: 12px;
		width: 200px;
		background: transparent;
		border: 0;
		outline: none;
		border: 1px solid #999;
		margin: 0 8px;
	}
	
	.cell .edit-icon:nth-of-type(1) {
		margin-left: 0;
	}
	
	.edit-icon {
		margin-right: 4px;
		width: 12px;
		height: 12px;
		display: inline-block;
		vertical-align: middle;
		background: url(../../theme/default/images/edit.png) no-repeat;
		margin-left: 10px;
	}
	
	.appoint-icon {
		margin-right: 4px;
		width: 12px;
		height: 17px;
		display: inline-block;
		vertical-align: middle;
		background: url(../../theme/default/images/appoint.png) no-repeat 0 1px;
		margin-left: 0;
	}
	
	.info-icon {
		margin-right: 4px;
		margin-left: 10px;
		width: 12px;
		height: 12px;
		display: inline-block;
		vertical-align: middle;
		background: url(../../theme/default/images/info.png) no-repeat;
	}
	
	.fd-data-box {
		width: 98%;
		height: auto;
		margin: 0 auto;
		overflow-x: auto;
	}
	
	.fd-top-more {
		width: 100%;
		height: 48px;
		display: none;
		position: absolute;
		top: 76px;
		left: 0;
		background: #fff;
	}
	
	.fd-top-more ul {
		width: 960px;
		height: 48px;
		margin-left: 190px;
	}
	
	.fd-top-more ul li {
		float: left;
		width: auto;
		height: 48px;
	}
	
	.fd-top-more ul li span {
		float: left;
		line-height: 48px;
	}
	
	.fd-top-more ul li input {
		margin-top: 10px;
	}
	
	.content-fd div li {
		font-family: "微软雅黑";
	}
	
	.content-fd {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding-top: 0;
		font-size: 12px;
		position: relative;
	}
	
	.fd-top {
		width: 100%;
		height: 76px;
		z-index: 997;
		box-sizing: border-box;
		background: #fff;
	}
	
	.fd-bottom {
		width: 100%;
		height: auto;
		margin-top: 0;
	}
	
	.fd-top .fd-top-ul {
		width: 850px;
		height: 100%;
		float: left;
	}
	
	.fd-top .fd-top-ul li {
		width: auto;
		float: left;
		height: 76px;
		font-size: 14px;
		line-height: 76px;
	}
	
	.fd-top li span {
		float: left;
		width: auto;
		margin-left: 20px;
	}
	
	.fd-top li input {
		width: 150px;
		height: 28px;
		float: left;
		margin-top: 24px;
		margin-left: 16px;
		border: 1px solid #ccc;
		text-indent: 4px;
	}
	
	.fd-top-more-btn {
		width: 40px;
		height: 76px;
		line-height: 76px;
		float: left;
		margin-left: 16px;
		font-size: 12px;
		color: #666;
		background: url(../../theme/default/images/tiggle.png) no-repeat;
		background-size: 9px 6px;
		background-position: 26px center;
		cursor: pointer;
	}
	
	.el-table {
		font-size: 12px;
	}
	
	.content-fd .el-pagination {
		margin-bottom: 28px;
		/*box-sizing: border-box;
        padding-left: 50%;*/
		display: flex;
		justify-content: flex-end;
	}
	/*弹框*/
	
	.custom-table {
		/*width: 1079px;
		height: 890px;
		position: absolute;*/
		width: 1079px;
		height: 100%;
		overflow-y: auto;
		position: absolute;
		overflow-x: hidden;
	}
	
	.content-fd .el-dialog__wrapper {
		width: 1079px;
		height: auto;
		position: absolute;
		left: auto;
		overflow: auto;
	}
	
	.custom-table .showself {
		display: block !important;
	}
	
	.custom-table .el-dialog__header {
		padding: 0;
	}
	
	.custom-table .el-dialog__body {
		padding: 0;
	}
	
	.custom-table .title {
		width: 100%;
		height: 27px;
		background: -webkit-linear-gradient(left, rgba(252, 81, 31, 0.7) 0%, rgba(252, 81, 31, 0.1) 100%);
		line-height: 27px;
		color: #ffffff;
	}
	
	.custom-table .icon {
		margin-left: 20px;
		padding-left: 20px;
		background: url("../../theme/default/images/jpy-white.png") 0 1px no-repeat;
	}
	
	.content-fd .edit-main {
		width: 100%;
		height: 100px;
		position: relative;
		z-index: 1001;
		background: #fff;
		box-sizing: border-box;
		padding: 0 14px 28px 14px;
	}
	
	.content-fd .close-btn {
		width: 24px;
		height: 24px;
		position: absolute;
		left: 0;
		background: #ccc url(../../theme/default/images/nav/close.png) no-repeat center;
		background-size: 12px 12px;
		cursor: pointer;
	}
	
	.content-fd .check-status-ul {
		width: 100%;
		height: 98px;
		float: left;
		box-sizing: border-box;
		padding: 20px 0 0 10px;
		display: flex;
		justify-content: center;
	}
	
	.content-fd .check-status {
		width: 64px;
		height: 98px;
		float: left;
		position: relative;
	}
	
	.content-fd .check-status:not(:last-child):before {
		content: "------------";
		display: inline-block;
		position: absolute;
		top: 13px;
		right: -80px;
	}
	
	.content-fd .check-status:not(:first-child) {
		margin-left: 78px;
	}
	
	.content-fd .check-status span {
		margin: 0 auto;
		width: 36px;
		height: 36px;
		display: block;
		border-radius: 18px;
		color: #fff;
		background: #ccc;
		text-align: center;
		line-height: 36px;
		font-size: 24px;
		font-family: "times new roman";
	}
	
	.content-fd .check-status.through span {
		background: #fc511f url(../../theme/default/images/nav/duigou.png) no-repeat center;
	}
	
	.content-fd .check-status p {
		width: 100%;
		height: auto;
		margin-top: 10px;
		text-align: center;
		font-size: 14px;
		color: #333;
		font-family: "微软雅黑";
	}
	
	.custom-table .footer {
		width: 606px;
		height: 58px;
		background: #ffffff;
		border: 1px solid rgb(223, 230, 236);
		border-top: none;
		padding: 8px;
		font-size: 14px;
	}
</style>