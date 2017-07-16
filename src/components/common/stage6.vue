<template>
	<div class="stage-dialog-6">
		<el-dialog top="38px" :show-close="false" custom-class="custom-table" :close-on-click-modal="false" @open='dialogOpen' :visible.sync="dialogFormVisible">

			<div class="edit-main">
				<span class="close-btn" @click='unLock();dialogFormVisible = false'></span>
				<div class="check-status-ul">
					<el-steps :align-center="true" :space="110" :active='activeIndex' finish-status="success">
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

			<div class="bg" style="height: 100%;padding-bottom: 40px;">

				<div class="title"><span class="icon"></span>前期费用</div>
				<div class="down-load" style="margin-top: 20px">
					<div>批贷函：<span><a id="OrderPdf" href=""></a></span>（点击可下载）</div>
				</div>
				<div style="margin-top: 24px" class="fk-custom-table">
					<table cellspacing="0" cellpadding="0" class="table" width="896">
						<tr>
							<td width="91px">姓名</td>
							<td width="159px" colspan="2"><input disabled='disabled' class="insert-info" type="text" value="张乐乐" v-model="bdDetailData.custName"></td>
							<td width="91px">贷款金额</td>
							<td width="183px" colspan="2"><input disabled='disabled' class="insert-info" type="text" value="100,100,100" v-model="bdDetailData.propFeeLoanAmt"></td>
							<td>抵押</td>
							<td><input disabled='disabled' class="insert-info" type="text" value="一" v-model="bdDetailData.visitCustAppMortgage"></td>
							<td>期数</td>
							<td><input disabled='disabled' class="insert-info" type="text" value="十二" v-model="bdDetailData.propFeeTermNum"></td>
						</tr>
						<tr>
							<td width="91px">抵押数</td>
							<td width="159px" colspan="2"><input disabled='disabled' class="insert-info" type="text" value="1" v-model="bdDetailData.propFeeMortNum">
							</td>
							<td width="91px">终端点位</td>
							<td width="" colspan="2"><input disabled='disabled' class="insert-info" type="text" value="0.95" v-model="bdDetailData.nataAppTermPoint"></td>
							<td width="">业务姓名</td>
							<td width="" colspan="3"><input disabled='disabled' class="insert-info" type="text" value="段雪" v-model="bdDetailData.saleNameC"></td>
						</tr>
						<tr>
							<td width="91px">服务费率</td>
							<td width="67px"><input disabled='disabled' class="insert-info" type="text" value="0.001" v-model="bdDetailData.propFeeServRate"></td>
							<td width="91px">渠道服务费率</td>
							<td width=" "><input disabled='disabled' class="insert-info" type="text" value="0.95" v-model="bdDetailData.propFeeChnServRate"></td>
							<td width="91px"> 服务费　</td>
							<td width=" "><input disabled='disabled' class="insert-info" type="text" value="12000" v-model="bdDetailData.propFeeServAmt"></td>
							<td width=" "> 渠道服务费　</td>
							<td width=" "><input disabled='disabled' class="insert-info" type="text" value="0" v-model="bdDetailData.propFeeChnServAmt"></td>
							<td width="91px"> 前期合计　</td>
							<td width=" "><input disabled='disabled' class="insert-info" type="text" value="12000" v-model="bdDetailData.propFeeSum"></td>
						</tr>
						<tr>
							<td width="91px">月息率</td>
							<td width="67px"><input disabled='disabled' class="insert-info" type="text" value="0.0085" v-model="bdDetailData.propFeeMonInterRate"></td>
							<td width="91px"> 渠道月息率　</td>
							<td width=" "><input disabled='disabled' class="insert-info" type="text" value="0" v-model="bdDetailData.propFeeChnMonInterRate"></td>
							<td width="91px"> 月息　</td>
							<td width=" "><input disabled='disabled' class="insert-info" type="text" value="8500" v-model="bdDetailData.propFeeMonInter"></td>
							<td> 渠道月息　</td>
							<td width="91px"><input disabled='disabled' class="insert-info" type="text" value="0" v-model="bdDetailData.propFeeChnMonInter"></td>
							<td> 月息合计　</td>
							<td><input disabled='disabled' class="insert-info" type="text" value="8500" v-model="bdDetailData.propFeeSumMonInter"></td>
						</tr>

						<tr>
							<td width="91px">综合服务费率</td>
							<td width="67px"><input disabled='disabled' class="insert-info" type="text" value="0.001" v-model="bdDetailData.propFeeComServRate1"></td>
							<td width="91px"><input disabled='disabled' class="insert-info" type="text" value="0.1" v-model="bdDetailData.propFeeComServRate2"></td>
							<td width="91px"><input disabled='disabled' class="insert-info" type="text" value="1.2" v-model="bdDetailData.propFeeComServRate3"></td>
							<td width="91px"> 公证费　</td>
							<td width="91px"><input disabled='disabled' class="insert-info" type="text" value="485,000.00" v-model="bdDetailData.propFeeNataFee"></td>
							<td width="91px"> 前期费用　</td>
							<td width="91px" colspan="3"><input disabled='disabled' class="insert-info" type="text" value="580.00" v-model="bdDetailData.propFeeCost"></td>
						</tr>

					</table>
				</div>
				<!--<div class="fk-line" v-if="bdDetailData.attachIdRepayPlanTab">-->
				<div class="fk-line" v-if="bdDetailData.attachIdPropFeeTab" style="margin-top: 12px;padding: 30px 20px;width: 896px;margin: 0 auto;">
					<span style="float: left;width: 100px;">前期费用图片</span>
					<div class="my-slider img-list-PropFee">
						<el-carousel height="80px" :autoplay="false" arrow="always">
							<el-carousel-item v-for="item in imgListPropFee" :key="item">
								<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
									<img :src="a" alt="" style="width: 100%;height: 100%;">
								</div>
							</el-carousel-item>
						</el-carousel>
					</div>
				</div>
				<div class="fk-line" v-if="imgListRepayPlan" style="margin-top: 12px;padding: 30px 20px;width: 896px;margin: 0 auto;">
					<span style="float: left;width: 100px;">还款计划图片</span>
					<div class="my-slider img-list-RepayPlan">
						<el-carousel height="80px" :autoplay="false" arrow="always">
							<el-carousel-item v-for="item in imgListRepayPlan" :key="item">
								<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
									<img :src="a" alt="" style="width: 100%;height: 100%;">
								</div>
							</el-carousel-item>
						</el-carousel>
					</div>
				</div>
				<div v-if="!imgListRepayPlan" class="up-load-content">
					<div class="up-load">
						<span class="must-input" style="line-height: 33px;">还款计划图片</span>
						<div class="up-load-bg">
							<form id="uploadForm" enctype="multipart/form-data" @change="upLoadTextBtn()">
								选择文件<i class="el-icon-upload el-icon--right"></i>
								<input type="file" name="uploadFile" id="files" accept="image/png,image/JPG,image/JPEG" style="width: 98px;height: 33px;" />
							</form>
						</div>
						<span style="line-height: 33px;margin-left: 8px;">(只能上传jpg,jpeg,png格式的图片)</span>
					</div>
				</div>
				<div class="">
					<div class="up-load-selected">
					</div>
				</div>
				<div class="fk-line" style="padding:30px 20px;color: #f31313;" v-if='bdDetailData.businessState==91'>
					<span style="width: 100px;float: left;margin-left: 60px;">拒单原因</span>
					<span style="width: 816px;min-height: 40px;float: left;">{{bdDetailData.refuseReason}}</span>
				</div>
				<div style="width: 896px;margin: 0 auto;height: auto;" v-show='repayPlanVisible'>
					<div class="fk-line table-maker" style="margin-top: 24px;">
						<span class="fk-title must-input">放款编号</span><span style="width: 180px;display: inline-block;margin-right: 60px;"><el-input placeholder="yyyy-mm-dd-01" v-model='lendCode'></el-input></span>

						<span class="fk-title must-input">收款人</span><span style="height: 28px;display: inline-block;width: auto;">
							  <el-select v-model="payeeSel" placeholder="-选择收款人-" popper-class='payeeSel'>
							    <el-option
							      v-for="item in payeeSelOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
						</span>
					</div>
					<!--<div class="fk-line" style="margin-top: 24px;" v-if='payeeInfo.cardNum'>
						<span class="fk-title">收款账号</span><span><input type="text" class="readonly"
                                                                       :value="payeeInfo.cardNum"></span>
					</div>
					<div class="fk-line" style="margin-top: 24px;" v-if='payeeInfo.bank'>
						<span class="fk-title">开户行</span><span><input type="text" class="readonly"
                                                                      :value="payeeInfo.bank"></span>
					</div>-->
				</div>
				<el-row style="margin-top: 32px;padding-bottom:24px;text-align: center" v-show='btnVisible'>
					<el-col :span="24">
						<div class="grid-content bg-purple-dark button">
							<el-button type='info' @click='getFkPlanData()' style='width: 140px;margin-left: -20px;'>还款计划预览</el-button>
							<el-button style="margin-left: 100px;" type="info" @click="commitFkOrderInfo()">通过</el-button>
							<el-button style="margin-left: 100px;" type="danger" @click="refuseDialog=true">拒单</el-button>
						</div>
					</el-col>
				</el-row>
				<div class="repayPlan" style="margin-top: 24px;width: 896px;margin: 0 auto;background: #fff8f6;padding:12px 8px 40px;position: relative;border-radius: 8px;">
					<div class="arrow-up" style="left: 225px;top: -16px;"></div>
					<div class="fk-line">
						<span class="fk-title">还款计划表</span>
					</div>
					<div class="fk-line" style="margin-top: 24px;">
						<el-table :data="hkPlanTableData" border cellspacing="0" cellpadding="0" class="table fk-plan" style="width:100%;">
							<el-table-column prop="fkDate" label="日期">
							</el-table-column>
							<el-table-column prop="capital" label="应还本金" width='240' show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="interest" label="应还利息" width='240'>
							</el-table-column>
							<el-table-column prop="total" label="应还(付)总额" width='240'>
							</el-table-column>
						</el-table>
					</div>
				</div>
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
				activeIndex: 5,
				refuseReason: '',
				refuseDialog: false,
				dialogFormVisible: false,
				dialogFormVisibleEdit: false,
				bdDetailData: '',
				repayPlanVisible: true,
				btnVisible: true,
				imgListPropFee: "",
				imgListRepayPlan: "",
				lendCode: '',
				payeeSel: '',
				propFeeLoanAmt: '',
				propFeeSumMonInter: '',
				payeeInfo: {},
				lendDate: '',
				initAmt: 0,
				attrAttach: "",
				hkPlanTableData: [],
				payeeInfoS: {
					'person1': {
						name: '王皎',
						cardNum: '622908 323008 765638',
						bank: '兴业银行北京东外支行'
					}
				},
				payeeSelOptions: [{
					value: 'person1',
					label: '王皎'
				}]
			}
		},
		watch: {
			payeeSel(val) {
				if(val == '王皎') {
					val = 'person1'
				}
				this.payeeInfo = this.payeeInfoS[val]
				if(this.businessStateCode < 71) {
					$(".repayPlan").hide()
				}

			},
			lendCode(val) {
				if(this.businessStateCode < 71) {
					$(".repayPlan").hide()
				}
				this.lendDate = this.lendCode.split('-');
			}
		},
		props: ['orderHouseId', 'openFlag', 'businessStateCode'],
		methods: {
			checkFormInfo() {
				//校验输入

				var str = "";
				if($(".up-load-selected div").length == 0) {
					str = "请上传文件";
					this.showMsg(str);
					return false;
				}
				if(!this.lendCode) {
					str = "请填写放款编号";
					this.showMsg(str);
					return false;
				}
				//                if(!this.lendAmount||!Number(this.lendAmount)){
				//                    str= "请填写放款金额"
				//                    this.showMsg(str);
				//                    return false;
				//                }
				if(!this.payeeInfo || !this.payeeInfo.name) {
					str = "请选择收款人信息"
					this.showMsg(str);
					return false;
				}
				var reg = /^\d{4}-\d{2}-\d{2}-\d{1,}$/;
				if(!reg.test(this.lendCode)) {
					str = "请填写放款编号格式为yyyy-mm-dd-01";
					this.showMsg(str);
					return false;
				}
				return true;
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
			repayShow() {
				var that = this;
				that.repayPlanVisible = true;
				that.btnVisible = true;
			},
			showBigImg(a) {
				$(".big-img-content").css("display", "block");
				$(".big-img-content img").css({
					"top": "50%",
					"left": "50%",
					"zoom": "100%",
					"transform": "translate(-50%,-50%)"
				});
				$(".big-img-content img").attr("src", a);
				this.dragmove($(".big-img-content img"));
			},
			showMsg(msg) {
				this.$message({
					message: msg,
					type: 'warning',
					duration: "1500",
				});
			},
			getFkPlanData() {
				//放款编号
				if(!this.lendCode) {
					this.showMsg("请填写放款编号")
					return;
				}
				var reg = /^\d{4}-\d{2}-\d{2}-\d{1,}$/;
				if(!reg.test(this.lendCode)) {
					var str = "请填写放款编号格式为yyyy-mm-dd-01";
					this.showMsg(str);
					return
				}
				if(this.payeeSel == '') {
					this.showMsg("请选择收款人")
					return;
				}
				//获取放款日期
				//放款期数
				var dataNum = this.bdDetailData.apprLoanTerm + 1;
				//放款金额
				var appMoney = parseFloat(this.initAmt);
				var propFee = parseFloat(this.initAmt) * (this.bdDetailData.propFeeMonInterRate + this.bdDetailData.propFeeChnMonInterRate);
				this.getHkDate(this.lendDate, dataNum, appMoney, propFee);
			},
			//制保留2位小数，如：2，会在2后面补上00.即2.00
			toDecimal2(x) {
				var f = parseFloat(x);
				if(isNaN(f)) {
					return;
				}
				f = Math.round(x * 100) / 100;
				return f;
			},
			//制保留2位小数，如：2，会在2后面补上00.即2.00
			toDecimal(x) {
				if(!x) {
					return '0.00'
				}
				var f = parseFloat(x);
				if(isNaN(f)) {
					return false;
				}
				var f = Math.round(x * 100) / 100;
				var s = f.toString();
				var rs = s.indexOf('.');
				if(rs < 0) {
					rs = s.length;
					s += '.';
				}
				while(s.length <= rs + 2) {
					s += '0';
				}
				return s;
			},
			repayHide() {
				var that = this;
				$('.must-input').removeClass('must-input')
				that.repayPlanVisible = false;
				that.btnVisible = false;
			},
			getDay(year, month, day) {
				var day1;
				if(day < 5) {
					day1 = 5;
				} else if(day < 10) {
					day1 = 10;
				} else if(day < 15) {
					day1 = 15;
				} else if(day < 20) {
					day1 = 20;
				} else if(day < 25) {
					day1 = 25;
				} else {}
				return day1;
			},
			makeTable() {
				this.$nextTick(function() {
					if($(".repayPlan tbody").find('.payeeTd').length <= 0) {
						var item = '<tr><td  colspan="4" style="line-height:32px;padding:8px 24px;font-size:14px;" class="payeeTd">收款姓名:&nbsp;' + this.payeeInfo.name + '<br>收款账号:&nbsp;' + this.payeeInfo.cardNum + '<br>开户行:&nbsp;&nbsp;' + this.payeeInfo.bank + '</td></tr>';
						$(".repayPlan tbody").append(item)
					}
					if(this.businessStateCode >= 71) {
						$('.arrow-up').css('display', 'none');
						$('.repayPlan').css('background', '#fff');
						$('.repayPlan').css('margin-top', '-64px');
						$('.repayPlan .fk-line').eq(1).css('margin-top', '12px');
					}
					$(".repayPlan").slideDown()
				})
			},
			getHkDate(cureentDate, num, appMoney, propFee) { //获取还款时间
				var that = this;
				this.hkPlanTableData = [];
				var year = cureentDate[0];
				var month = cureentDate[1];
				var day = cureentDate[2];
				for(var i = 0; i <= num - 1; i++) {
					var d = new Date(year, month, day);
					d.setMonth((d.getMonth() - 1) + i)
					var yy1 = d.getFullYear();
					var mm1 = d.getMonth() + 1;
					var dd1 = d.getDate();
					if(dd1 < 25) {
						dd1 = that.getDay(yy1, mm1, dd1);
					} else {
						if(mm1 == 2) { //2月份
							if(dd1 < 28) {
								var new_date = new Date(yy1, mm1, 1); //取当年当月中的第一天
								var date_count = (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate(); //获取当月的天数
								console.log(date_count);
								dd1 = date_count;
							} else {
								mm1 = mm1 + 1
								dd1 = 5; //下个月5号
							}
						} else {
							if(day < 30) {
								dd1 = 30;
							} else {
								mm1 = mm1 + 1;
								dd1 = 5
							}
						}
					}
					if((i == num - 1)) {
						if(day > 1) {
							dd1 = day - 1;
						} else {
							dd1 = 1;
						}
					}
					if(mm1 < 10) {
						mm1 = '0' + mm1;
					}
					if(dd1 < 10) {
						dd1 = '0' + dd1;
					}
					var hkDate = yy1 + '/' + mm1 + '/' + dd1;
					if(i < num - 1) {
						var fkObj = {
							'fkDate': hkDate,
							'capital': '/',
							'interest': that.toDecimal(propFee),
							'total': that.toDecimal(propFee),
							'remark': ''
						};
					} else {
						var fkObj = {
							'fkDate': hkDate,
							'capital': that.toDecimal(appMoney),
							'interest': '/',
							'total': that.toDecimal(appMoney),
							'remark': ''
						};
					}
					that.hkPlanTableData[i] = fkObj;
				}
				var totalI = (num - 1) * propFee;
				var totalM = ((num - 1) * propFee) + appMoney;
				var fkObjTotal = {
					'fkDate': '合计',
					'capital': that.toDecimal(appMoney),
					'interest': that.toDecimal(totalI),
					'total': that.toDecimal(totalM),
					'remark': ''
				};

				that.hkPlanTableData[num] = fkObjTotal;
				that.makeTable();
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
						that.dialogFormVisible = false;
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
						that.dialogFormVisible = false;
						that.$parent.dialogDestroy = false;
						that.$parent.handlePageChange(1)
					}
				});
			},
			commitFkOrderInfo() { //提交放款信息
				var that = this;
				if(that.checkFormInfo()) {
					$(".up-load-selected div").each(function() {
						var value = $(this).attr('attr-attach') + "";
						that.attrAttach = that.attrAttach + value + ",";
					});
					if(that.attrAttach.endsWith(",")) {
						that.attrAttach = that.attrAttach.substring(0, this.attrAttach.length - 1);
					}
					//					that.fullscreenLoading = true;
					var btnHttpParmas = {
						url: "lend/saveLendApprovalInfo",
						params: {
							orderHouseId: that.bdDetailData.orderHouseId,
							lendCode: that.lendCode,
							lendEmpId: that.bdDetailData.lendEmpId,
							lendEmpName: that.bdDetailData.lendEmpName,
							lendPayeeName: that.payeeInfo.name,
							lendPayeeBankId: that.payeeInfo.cardNum,
							lendPayeeOpenBank: that.payeeInfo.bank,
							propFeeLoanAmt: that.propFeeLoanAmt,
							propFeeTermNum: that.bdDetailData.propFeeTermNum,
							propFeeSumMonInter: that.propFeeSumMonInter,
							attachIdRepayPlanTab: that.attrAttach
						}
					}
					that.$http.post(btnHttpParmas.url, btnHttpParmas.params).then(function(res) {
						if(res.data.respCode == '000007') {
							that.$message({
								message: '放款编号已存在，请核对后填写',
								type: 'error',
								duration: "1500"
							});
							return
						}
						if(res.data.respCode == '000000') {
							//							that.fullscreenLoading = false;
							var initParams = {
								sc: that.stageCode,
								td: 'contentTableData',
								tt: 'total',
								val: 1,
								ps: 10,
								url: 'order/queryOrderListByStage'
							}
							//							that.fullscreenLoading = false;
							that.showSuccessMsg('保存')
							that.getData(initParams)
						} else {
							//							that.fullscreenLoading = false;
							that.showFailMsg('保存');
						}
					});
				}
			},
			//拒单
			//						refuseBtn() {
			//							
			//						},
			//查询批贷函附件详情
			getAttachDetail(attachId) {
				var that = this;
				this.$http.get("common/queryAttachByAttachId", {
					params: {
						'attachId': attachId,
					}
				}).then(function(res) {
					if(res.data.respCode == '000000') {
						that.pdfDownPath = that.$http.defaults.baseURL + "common/showImg?attachId=" + attachId;
						that.pdfName = res.data.resultData.attachName;
						$('#OrderPdf').attr("href", that.pdfDownPath);
						$('#OrderPdf').text(that.pdfName);
					} else {
						that.showMsg("暂无批贷函信息！");
					}
				});
			},
			unLock() {
				var that = this;
				if(this.openFlag == 'u') {
					this.$http.post("order/unlockOrder", {
						'orderHouseId': that.bdDetailData.orderHouseId,
					}).then(function(res) {});
				}
				that.dialogFormVisible = false;
				that.$parent.dialogDestroy = false;
			},
			dialogOpen() {
				$('.content-fk .el-dialog__wrapper').show().css({
					'left': 'auto',
					'right': '-1079px'
				}).animate({
					right: '0'
				});
			},
			upLoadTextBtn() {
				var that = this;
				if(!$("#files").val()) {
					return;
				}
				var formData = new FormData($("#uploadForm")[0]);
				$.ajax({
					url: this.$http.defaults.baseURL + '/common/upload',
					type: 'POST',
					dataType: "JSON",
					data: formData,
					cache: false,
					contentType: false,
					processData: false,
					success: function(data) {
						if(data.respCode == "000000") {
							$(".up-load-selected").css("display", "block");
							$(".up-load-selected").append("<div attr-attach=" + data.resultData.icAttachId + ">" + data.resultData.attachName + "<span></span></div>");
							$(".up-load-selected span").each(function() {
								$(this).on("click", function() {
									$(this).parent("div").remove();
								})
							});
						} else if(data.respCode == "000013") {
							that.showMsg("附件大小超出限制，最大20M！")
						} else if(data.respCode == "000014") {
							that.showMsg("附件为空")
						} else if(data.respCode == "000011") {
							that.showMsg("附件不存在")
						} else {
							that.showMsg("附件上传失败")
						}
					},
					error: function() {
						that.showMsg("附件大小超出限制，最大20M！")
					}
				});
				$("#uploadForm").html("选择文件<i class='el-icon-upload el-icon--right'></i><input type='file' name='uploadFile' id='files' accept='image/png,image/JPG,image/JPEG' style='width: 98px;height: 33px;'/>")
			}
		},
		mounted: function() {
			var that = this;
			this.$http.get("order/queryOrderDetailByOrderHouseId", {
				params: {
					'flag': that.openFlag,
					'orderHouseId': that.orderHouseId
				}
			}).then(function(res) {
				if(res.data.respCode == '000010') {
					that.showMsg("报单已锁定，请稍后尝试编辑！");
					that.$parent.dialogDestroy = false;
				} else {
					that.dialogFormVisible = true;
					that.bdDetailData = res.data.resultData;
					that.initAmt = that.bdDetailData.propFeeLoanAmt;
					that.propFeeSumMonInter = that.bdDetailData.propFeeSumMonInter;
					that.propFeeLoanAmt = that.bdDetailData.propFeeLoanAmt;
					that.bdDetailData.regTime = that.getForMatDate2(that.bdDetailData.regTime);
					that.bdDetailData.propFeeLoanAmt = that.toDecimal(that.bdDetailData.propFeeLoanAmt);
					that.bdDetailData.propFeeServAmt = that.toDecimal(that.bdDetailData.propFeeServAmt);
					that.bdDetailData.propFeeChnServAmt = that.toDecimal(that.bdDetailData.propFeeChnServAmt);
					that.bdDetailData.propFeeSumMonInter = that.toDecimal(that.bdDetailData.propFeeSumMonInter);
					that.bdDetailData.propFeeNataFee = that.toDecimal(that.bdDetailData.propFeeNataFee);
					that.bdDetailData.propFeeCost = that.toDecimal(that.bdDetailData.propFeeCost);
					that.bdDetailData.propFeeMonInter = that.toDecimal(that.bdDetailData.propFeeMonInter);
					that.bdDetailData.propFeeSum = that.toDecimal(that.bdDetailData.propFeeSum);
					that.bdDetailData.propFeeLoanAmt = that.formatMoney(that.bdDetailData.propFeeLoanAmt, 2, '');
					that.bdDetailData.propFeeServAmt = that.formatMoney(that.bdDetailData.propFeeServAmt, 2, '');
					that.bdDetailData.propFeeSum = that.formatMoney(that.bdDetailData.propFeeSum, 2, '');
					that.bdDetailData.propFeeMonInter = that.formatMoney(that.bdDetailData.propFeeMonInter, 2, '');
					that.bdDetailData.propFeeChnMonInter = that.formatMoney(that.bdDetailData.propFeeChnMonInter, 2, '');
					that.bdDetailData.propFeeSumMonInter = that.formatMoney(that.bdDetailData.propFeeSumMonInter, 2, '');
					that.bdDetailData.propFeeNataFee = that.formatMoney(that.bdDetailData.propFeeNataFee, 2, '');
					that.bdDetailData.propFeeCost = that.formatMoney(that.bdDetailData.propFeeCost, 2, '');
					setTimeout(function() {
						that.imgListPropFee = that.queryAttachImg(res.data.resultData.attachIdPropFeeTab, $(".img-list-PropFee button"));
					}, 0)
					if(that.bdDetailData.attachIdApprLeter) {
						that.getAttachDetail(that.bdDetailData.attachIdApprLeter);
					}
					that.$nextTick(function() {
						if(this.openFlag == 'u') {
							this.repayShow();
						} else {
							if(that.businessStateCode < 71) {
								this.repayHide();
								$('.repayPlan').css('display', 'none !important')
							} else {
								that.activeIndex = res.data.resultData.stageCode - 1;
								$(".fk-line input").css('border', '0');
								$('.must-input').removeClass('must-input');
								$(".fk-line .fk-title").css('margin-left', '0')
								$(".table-maker .el-input__icon").css('display', 'none');
								$(".button").css('display', 'none');
								$(".table-maker input").attr('disabled', 'disabled');
								that.lendCode = that.bdDetailData.lendCode;
								that.lendDate = that.lendCode.split('-');
								that.payeeSel = that.bdDetailData.lendPayeeName;
								that.getFkPlanData();
								that.imgListRepayPlan = true;
								that.$nextTick(function() {
									that.imgListRepayPlan = that.queryAttachImg(that.bdDetailData.attachIdRepayPlanTab, $(".img-list-RepayPlan button"));
								})
							}
						}
					})
				}
			}).catch(function(error) {
				that.$parent.dialogDestroy = false;
			});
		}
	}
</script>

<style>
	.stage-dialog-6 {
		width: 100%;
		height: 100%;
		position: absolute;
		bottom: 0;
	}
	
	.fk-line .fk-plan tr td:nth-last-child(1) {
		text-align: center;
	}
	
	.fk-line .fk-plan tr:nth-last-child(1) td:nth-last-child(1) {
		text-align: left;
	}
	
	.repayPlan {
		display: none;
	}
	
	.content-bdlb .stage-dialog-6 .el-dialog__wrapper {
		overflow-y: hidden;
		overflow-x: hidden;
	}
	
	.content-bdlb .stage-dialog-6 .el-dialog__wrapper .el-dialog {
		top: 0 !important;
		margin-bottom: 0;
		height: 100%;
		overflow-y: scroll;
		left: 540px;
		overflow-x: hidden;
	}
	
	.fk-line input {
		height: 28px;
		line-height: 28px;
		text-indent: 4px;
		font-size: 14px;
		width: 200px;
		color: rgb(72, 87, 106);
		background: transparent;
		border: 0;
		outline: none;
		border: 1px solid #999;
		margin: 0 8px;
	}
	
	.stage-dialog-6 .fk-line .el-select input {
		width: 200px;
		height: 28px;
		margin-left: 0;
	}
	
	.stage-dialog-6 .el-button--info:hover {
		background: #fff;
		border-color: #50BFFF !important;
		color: #50BFFF !important;
	}
	
	.stage-dialog-6 .el-button--danger:hover {
		background: #fff;
		border-color: #f7ba2a !important;
		color: #f7ba2a !important;
	}
	
	.stage-dialog-6 .el-button button {
		padding: 10px 15px;
		width: 94px;
		font-size: 14px;
		background: #fff;
		border: 1px solid rgb(191, 203, 217);
		color: rgb(31, 45, 61);
	}
	
	.stage-dialog-6 .button button:nth-of-type(2):hover {
		background: #fff;
		border-color: #f7ba2a;
		color: #f7ba2a;
	}
	
	.stage-dialog-6 .table-maker button:hover {
		background: #fff;
		border-color: #50BFFF;
		color: #50BFFF;
	}
	
	.content-bdlb .stage-dialog-6 .table-maker span:nth-of-type(3) {
		margin-left: 60px;
	}
	
	.stage-dialog-6 .table-maker button {
		width: 160px;
		background: #fff;
		border: 1px solid rgb(191, 203, 217);
		color: rgb(31, 45, 61);
	}
	
	.stage-dialog-6 .el-button--warning {
		margin-right: 200px !important;
	}
	
	.stage-dialog-6 .custom-table .table tr td {
		background: rgb(238, 241, 246);
	}
	
	.fk-title {
		display: inline-block;
		height: 28px;
	}
	
	.stage-dialog-6 .table-maker .fk-title {
		width: 100px;
	}
	
	.fk-custom-table .table {
		border-right: 1px solid rgb(223, 230, 236);
		border-bottom: 1px solid rgb(223, 230, 236)
	}
	
	.fk-custom-table .table td {
		border-left: 1px solid rgb(223, 230, 236);
		border-top: 1px solid rgb(223, 230, 236)
	}
	
	.custom-table .table tr {
		height: 32px;
	}
	
	.stage-dialog-6 .up-load-content {
		height: 45px;
		width: 896px;
		margin: 0 auto;
		margin-top: 24px;
	}
	
	.stage-dialog-6 .up-load span:first-child {
		width: 100px;
		height: 45px;
		float: left;
	}
	
	.stage-dialog-6 .up-load-bg {
		display: inline-block;
		height: 28px;
		margin-top: 3px;
		color: #fff;
		line-height: 28px;
		text-align: center;
		background: #20a0ff;
		width: 80px;
		position: relative;
		width: 98px;
		height: 33px;
		border-radius: 4px;
		line-height: 33px;
	}
	
	.stage-dialog-6 .up-load-selected span {
		width: 12px;
		height: 12px;
		display: inline-block;
		background: url(../../theme/default/images/nav/delete-upload.png) no-repeat right center;
		vertical-align: middle;
		margin-left: 10px;
		/* cursor: pointer; */
	}
	
	.stage-dialog-6 .up-load-selected {
		width: 700px;
		margin-left: 178px;
		display: none;
		margin-bottom: 20px;
	}
	
	.stage-dialog-6 .bg .button button {
		background: #fff;
		border: 1px solid rgb(191, 203, 217);
		color: rgb(31, 45, 61);
	}
	
	.content-fk .big-img-content img {
		width: auto;
		height: auto;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		cursor: move;
	}
	
	.content-fk .big-img-content .title-img {
		width: 24px;
		height: 24px;
		position: absolute;
		top: 0;
		right: 0;
		background: rgb(72, 87, 106) url(../../theme/default/images/nav/close.png) no-repeat center;
		background-size: 12px 12px;
		cursor: pointer;
		z-index: 99999999;
	}
	
	.content-fk .big-img-content {
		width: 500px;
		height: 400px;
		background-color: #aaa;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: none;
		z-index: 9999999;
		overflow: hidden;
	}
</style>