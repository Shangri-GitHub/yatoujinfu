<template>
	<div class="stage-dialog-3">
		<el-dialog @open='dialogOpen' :show-close="false" custom-class="loan-user-edit" :close-on-click-modal="false" :visible.sync="dialogFormVisibleEdit">
			<div class="modal-content">
				<div class="edit-main">
					<span class="close-btn" @click="unLock()"></span>
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
				<div class="order-infor">
					<div class="title">报单信息</div>
					<div class="content">
						<div class="line">
							<span>报单编号</span><span><input type="text" :value="bdDetailData.orderHouseCode" class="readonly"
                                                              readonly></span>
							<span>提交报单时间</span><span><input type="text" class="readonly" :value="bdDetailData.regTime"
                                                                readonly></span>
							<span>信贷员</span><span><input type="text" class="readonly" :value="bdDetailData.saleNameC" readonly></span>
						</div>
						<div class="line">
							<span>社区名</span><span><input type="text" class="readonly" :value="bdDetailData.houLiveArea" readonly></span>
							<span>楼栋</span><span><input type="text" class="readonly" :value="bdDetailData.houBuilding"></span>
							<span>楼层</span><span><input type="text" class="readonly" :value="bdDetailData.houFloor"></span>
						</div>
						<div class="line">
							<span>信贷员手机号</span><span><input type="text" class="readonly" :value="bdDetailData.saleMobile"
                                                                readonly></span>
							<span>门牌号</span><span><input type="text" class="readonly" :value="bdDetailData.houNum" readonly></span>
							<span>房屋性质</span><span><input type="text" class="readonly" :value="bdDetailData.houCharacter" readonly></span>
						</div>
						<div class="line">
							<span>建筑面积(㎡)</span><span><input type="text" class="readonly" :value="bdDetailData.houArea"
                                                              readonly></span>
							<span>规划用途</span><span><input type="text" class="readonly" :value="bdDetailData.houPosition" readonly></span>
						</div>
						<div class="line0" v-if="bdDetailData.attachIdHouCert">
							<span>房产证</span>
							<div class="my-slider img-list-buliding">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListBuliding" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
					</div>
				</div>
				<div class="evaluation-one">
					<div class="title">初评</div>
					<div class="content">
						<div class="line">
							<span>抵押类型</span><span><input type="text" v-model="bdDetailData.visitCustAppMortgage"
                                                          class="readonly" disabled></span>
							<span>一抵余额(元)</span><span><input type="text" v-model="bdDetailData.visitCustAppFirstMortAmt"
                                                            class="readonly" disabled></span>
							<span>一抵性质</span><span><input type="text" v-model="bdDetailData.visitCustAppFirstMortNat"
                                                         class="readonly" disabled></span>
						</div>
						<div class="line">
							<span>评价总额</span><span><input type="text" :value="bdDetailData.firstAssTotalAmt" class="readonly"
                                                              readonly></span>
							<span>可贷金额(元)</span><span><input type="text" :value="bdDetailData.firstAssLoanAmt" class="readonly"
                                                              readonly></span>
							<span>建筑面积(㎡)</span><span><input type="text" :value="bdDetailData.houArea" class="readonly"
                                                              readonly></span>
						</div>
						<div class="line">
							<span>中介成交价(元)</span><span><input type="text" :value="bdDetailData.firstAssInterAmt" class="readonly"
                                                               readonly></span>
							<span>房产地址</span><span class="bulid-org" style="width: 500px;"><input type="text" style="width: 500px;" class="readonly" readonly
                                                                                :value="bdDetailData.houAddr"></span>
						</div>
						<div class="line">
							<span>初评意见</span><span><input type="text" :value="bdDetailData.firstAssOpinion" class="readonly" readonly></span>
						</div>
					</div>
				</div>
				<div class="content-pd-t content-xhms">
					<div class="title">下户面审</div>
					<div class="content">
						<div class="line">
							<span>预约下户时间</span><span><input type="text" :value="bdDetailData.visitCustAppTime"
                                                                class="readonly"
                                                              readonly></span>
							<span>预约下户联系人</span><span><input type="text" :value="bdDetailData.visitCustAppPersion" class="readonly"
                                                              readonly></span>
							<span style="width: 130px;margin-left: -56px;">预约下户联系方式</span><span><input type="text" :value="bdDetailData.visitCustAppPhonenum" class="readonly"
                                                              readonly></span>
						</div>
						<div class="line">
							<span>抵押类型</span><span><input type="text" :value="bdDetailData.visitCustAppMortgage" class="readonly"
                                                              readonly></span>
							<span>贷款金额(元)</span><span><input type="text" :value="bdDetailData.visitCustAppLoanAmt" class="readonly"
                                                              readonly></span>
							<span style="margin-left: -56px;">建筑面积(㎡)</span><span><input type="text" :value="bdDetailData.houArea" class="readonly"
                                                              readonly></span>
						</div>
						<div class="line">
							<span>借款人</span><span><input type="text" :value="bdDetailData.custName" class="readonly"
                                                              readonly></span>
							<span>借款人婚姻状况</span><span><input type="text" :value="bdDetailData.custMaritalStatus" class="readonly"
                                                              readonly></span>
							<span style="margin-left: -56px;">风控经理</span><span><input type="text" v-model="bdDetailData.currDealEmpName"
														  class="readonly" disabled></span>
						</div>
						<div class="line">
							<span>借款人身份证号</span><span><input type="text" :value="bdDetailData.custId" class="readonly"
														 readonly></span>
							<span>共借人姓名</span><span><input type="text" :value="bdDetailData.jointBorrowerName" class="readonly"
															 readonly></span>
							<span style="margin-left: -56px;">共借人身份证号</span><span><input type="text" v-model="bdDetailData.jointBorrowerId"
																					  class="readonly" disabled></span>
						</div>
						<div class="line0" v-if="bdDetailData.attachIdIdcard">
							<span>身份证(男)</span>
							<div class="my-slider img-list-card-n">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListCardN" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0" v-if="bdDetailData.attachIdIdcardF">
							<span>身份证(女)</span>
							<div class="my-slider img-list-card-g">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListCardG" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdRegiterFam">
							<span>户口本(男)</span>
							<div class="my-slider img-list-hkn">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListHKN" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdRegiterFamF  ">
							<span>户口本(女)</span>
							<div class="my-slider img-list-hkg">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListHKG" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdCredit">
							<span>征信(男)</span>
							<div class="my-slider img-list-zn">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListZN" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdCreditF">
							<span>征信(女)</span>
							<div class="my-slider img-list-zg">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListZG" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdMarryCert">
							<span>结婚证</span>
							<div class="my-slider img-list-jz">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListJZ" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdDivorceCert">
							<span>离婚证</span>
							<div class="my-slider img-list-lz">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListLZ" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdDivorceAgree">
							<span>离婚协议</span>
							<div class="my-slider img-list-lx">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListLX" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdBusiLicense">
							<span>营业执照</span>
							<div class="my-slider img-list-yz">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListYZ" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdBankLoanCont">
							<span>银行借款合同</span>
							<div class="my-slider img-list-yj">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListYJ" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdBankMortCont">
							<span>银行抵押合同</span>
							<div class="my-slider img-list-yd">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListYD" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdDeadCert">
							<span>死亡证明</span>
							<div class="my-slider img-list-sz">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListSZ" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdInheritCert">
							<span>继承公证书</span>
							<div class="my-slider img-list-js">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListJS" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdOrigCont">
							<span>原始购房合同</span>
							<div class="my-slider img-list-yg">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListYG" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdAbanPurchCert">
							<span>放弃优先购买权证明</span>
							<div class="my-slider img-list-fyz">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListFYZ" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdDeedTicket">
							<span>契税票</span>
							<div class="my-slider img-list-qp">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListQP" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdLeaseProt">
							<span>租赁协议</span>
							<div class="my-slider img-list-zxy">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListZXY" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdLesseeId">
							<span>承租人身份证</span>
							<div class="my-slider img-list-czs">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListCZS" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<div class="line0 is-show" v-if="bdDetailData.attachIdEndProof">
							<span>结案证明</span>
							<div class="my-slider img-list-jaz">
								<el-carousel height="80px" :autoplay="false" arrow="always">
									<el-carousel-item v-for="item in imgListJAZ" :key="item">
										<div v-for="a in item" class="area" @click="showBigImg(a)" style="margin-left: 5px;margin-right: 5px;">
											<img :src="a" alt="">
										</div>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>

						<div class="line">
							<span>面审意见</span><span style="width: 750px;vertical-align: top;">{{bdDetailData.visitCustApprOpinion}}</span>
						</div>
						<div class="line line-text" style="margin-bottom: 32px;color: #f31313;" v-if='bdDetailData.businessState==91'>
							<span style="width: 100px;float: left;">拒单原因</span>
							<span style="width: 816px;min-height: 40px;margin-left: 32px;float: left;">{{bdDetailData.refuseReason}}</span>
						</div>
					</div>
				</div>
				<div class="content-pd-t content-pd-edit">
					<div class="title">批贷</div>
					<div class="content">
						<div class="line">
							<span style="margin-right: -16px;" class="must-input">审批金额(元)</span><span class='amtMoney'><el-input placeholder="" v-model='amtMoney'></el-input></span>
							<span style="width:120px;margin-left: -20px;" class="must-input">期限(月)</span><span class='term'><el-input placeholder="" v-model='term'></el-input></span>
							<span style="width: 140px;margin-left: -36px;" class="must-input">批函有效期(自然日)</span><span class='letterTerm'><el-input placeholder="" v-model='letterTerm'></el-input></span>
						</div>
						<div class="line">
							<span style="width: 84px;" class="must-input">抵押物地址</span><span class='mortAddr'><el-input placeholder="" v-model='mortAddr'></el-input></span>
							<span style="width: 120px;margin-left: -20px;" class="must-input">产权证编号</span><span class='propNum'><el-input placeholder="" v-model='propNum'></el-input></span>
							<span style="width: 140px;margin-left: -36px;" class="must-input">批贷函编号</span><span class='letterCode'><el-input placeholder="" v-model='letterCode'></el-input></span>
						</div>
						<div class="line">
							<span style="width: 84px;" class="must-input">担保方式</span><span><template>
							  <el-select v-model="guarantMode" placeholder="-选择担保方式-" class='guarantMode'>
							    <el-option
							      v-for="item in guarantModeOptions"
							      :key="item.value"
							      :label="item.value"
							      :value="item.code">
							    </el-option>
							  </el-select>
							</template></span>
							<span style="width: 120px;margin-left: -20px;" class="must-input">贷款产品</span><span class='product'><template>
							  <el-select v-model="product" placeholder="-选择贷款产品-">
							    <el-option
							      v-for="item in productModeOptions"
							      :key="item.value"
							      :label="item.value"
							      :value="item.code">
							    </el-option>
							  </el-select>
							</template></span>
							<span style="width: 140px;margin-left: -36px;" class="must-input">还款方式</span><span class='repayMode'><template>
							  <el-select v-model="repayMode" placeholder="-选择还款方式-">
							    <el-option
							      v-for="item in repayModeModeOptions"
							      :key="item.value"
							      :label="item.value"
							      :value="item.code">
							    </el-option>
							  </el-select>
							</template></span>
						</div>
						<div class="line">
							<span style="width: 84px;" class="must-input">提前还款</span><span class='isPrepayMent'><template>
							  <el-select v-model="isPrepayMent" placeholder="是否允许提前还款">
							    <el-option
							      v-for="item in isPrepayMentModeOptions"
							      :key="item.value"
							      :label="item.value"
							      :value="item.code">
							    </el-option>
							  </el-select>
							</template></span>
							<span style="width: 120px;margin-left: -20px;" class="must-input">到期续贷</span><span class='continueLoan'><template>
							  <el-select v-model="continueLoan" placeholder="-是否到期续贷-">
							    <el-option
							      v-for="item in continueLoanModeOptions"
							      :key="item.value"
							      :label="item.value"
							      :value="item.code">
							    </el-option>
							  </el-select>
							</template></span>
						</div>
						<div class="line line-text" style="">
							<span style="width: 84px;float: left;" class="must-input">放款条件</span><span class="text-area-edit lendCondition"><el-input
								  type="textarea"
								  :rows="2"
								  placeholder=""
								  v-model="lendCondition">
								</el-input></span>
						</div>
						<div class="line line-text" style="">
							<span style="width: 100px;float: left;">放款前落实手续</span><span class="text-area-edit lendProcedure" style="margin-left: -16px;">
								<el-input
								  type="textarea"
								  :rows="2"
								  placeholder=""
								  v-model="lendProcedure">
								</el-input>
							</span> </div>
						<div class="line line-text" style="margin-bottom: 32px;">
							<span style="width: 84px;float: left;">其他审批意见</span><span class="text-area-edit otherOpinion"><el-input
								  type="textarea"
								  :rows="2"
								  placeholder=""
								  v-model="otherOpinion">
								</el-input></span>
						</div>
						<div class="line line-text down-load" style="margin-bottom: 32px;" v-if='pdfDivVisible'>
							<div>批贷函：<span style="width: auto;margin-left: 80px;"><a id="OrderPdf" href=""></a></span>（点击可下载）</div>
						</div>
					</div>
					<div class="button">
						<el-button size="small" type="info" @click='savePidai($event)'>批贷函预览</el-button>
						<el-button size="small" type="info" @click='savePidai($event)'>通过</el-button>
						<el-button size="small" type="danger" @click='refuseDialog=true'>拒单</el-button>
					</div>
				</div>
			</div>
		</el-dialog>
		<el-dialog title="提示" :close-on-click-modal="false" v-if='refuseDialog' :visible.sync="refuseDialog" style='width:452px;height: 296px;' class='refuseDialog'>
			<div class="refuse-title">
				<span class="refuse-warning"></span>
				<span class="refuse-tip must-input">拒单原因：</span>
			</div>
			<el-input type='textarea' placeholder='请填写拒单原因…' v-model='refuseReason'></el-input>
			<span slot="footer" class="refuse-footer">
				    <el-button @click="refuseDialog=false">取 消</el-button>
				    <el-button type="" @click="refuseOrder()">确 定</el-button>
				  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pdfDivVisible:false,
				dialogFormVisibleEdit: false,
				//				fullscreenLoading: false,
				bdDetailData: [],
				guarantMode: '',
				product: '',
				refuseReason: '',
				refuseDialog: false,
				repayMode: '',
				isPrepayMent: '',
				continueLoan: '',
				lendCondition: '',
				imgList: "",
				imgListBuliding: "",
				imgListCard: "",
				imgListCardN: "",
				imgListOwner: "",
				imgListCollateral: "",
				imgListOthers: "",
				imgListSecBusi: '',
				lendProcedure: '',
				otherOpinion: '',
				imgListCardN: "",
				imgListCardG: "",
				imgListHKN: "",
				imgListHKG: "",
				imgListZN: "",
				imgListZG: "",
				imgListJZ: "",
				imgListLZ: "",
				imgListLX: "",
				imgListYZ: "",
				imgListYJ: "",
				imgListYD: "",
				imgListSZ: "",
				imgListJS: "",
				imgListYG: "",
				imgListFYZ: "",
				imgListQP: "",
				imgListZXY: "",
				imgListCZS: "",
				imgListJAZ: "",
				letterCode: "",
				propNum: "",
				mortAddr: "",
				activeIndex:2,
				pdfName: "",
				pdfDownPath: "",
				letterTerm: "",
				term: "",
				amtMoney: "",
				guarantModeOptions: [],
				productModeOptions: [],
				repayModeModeOptions: [],
				isPrepayMentModeOptions: [],
				continueLoanModeOptions: []
			}
		},
		props: ['orderHouseId', 'openFlag', 'businessStateCode'],
		methods: {
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
			},
			unLock() {
				var that = this;
				if(this.openFlag == 'u') {
					this.$http.post("order/unlockOrder", {
						'orderHouseId': that.bdDetailData.orderHouseId
					}).then(function(res) {
						that.dialogFormVisibleEdit = false;
					});
				} else {
					that.dialogFormVisibleEdit = false;
				}
				that.$parent.dialogDestroy = false;
			},
			savePidai($event) {
				var that = this;
				var guarantMode = that.guarantMode;
				var product = that.product;
				var repayMode = that.repayMode;
				var isPrepayMent = that.isPrepayMent;
				var continueLoan = that.continueLoan;
				var lendCondition = that.lendCondition;
				var otherOpinion = that.otherOpinion;
				var lendProcedure = that.lendProcedure;
				var letterTerm = that.letterTerm;
				var amtMoney = that.amtMoney;
				var term = that.term;
				var mortAddr = that.mortAddr;
				var propNum = that.propNum;
				var letterCode = that.letterCode;
				var preData = {
					'custName': that.bdDetailData.custName,
					'custId': that.bdDetailData.custId,
					'jointBorrowerName': that.bdDetailData.jointBorrowerName,
					'jointBorrowerId': that.bdDetailData.jointBorrowerId,
					'guarantMode': $('.guarantMode input').val(),
					'product': $('.product input').val(),
					'repayMode': $('.repayMode input').val(),
					'isPrepayMent': $('.isPrepayMent input').val(),
					'continueLoan': $('.continueLoan input').val(),
					'letterTerm': letterTerm,
					'amtMoney': amtMoney,
					'term': term,
					'mortAddr': mortAddr,
					'propNum': propNum,
					'lendCondition': lendCondition,
					'lendProcedure': lendProcedure,
					'otherOpinion': otherOpinion,
					'letterCode': letterCode
				};
				var paramsData = {
					'amtMoney': amtMoney,
					'term': term,
					'letterTerm': letterTerm,
					'guarantMode': $('.guarantMode input').val(),
					'guarantModeCode': guarantMode,
					'product': $('.product input').val(),
					'productCode': product,
					'repayMode': $('.repayMode input').val(),
					'repayModeCode': repayMode,
					'mortAddr': mortAddr,
					'propNum': propNum,
					'letterCode': letterCode,
					'isPrepayment': $('.isPrepayMent input').val(),
					'isPrepaymentCode': isPrepayMent,
					'continueLoan': $('.continueLoan input').val(),
					'continueLoanCode': continueLoan,
					'lendCondition': lendCondition,
					'lendProcedure': lendProcedure,
					'otherOpinion': otherOpinion,
					'orderHouseId': that.bdDetailData.orderHouseId,
				};
				for(var key in paramsData) {
					if(paramsData[key] == '' && key != 'otherOpinion' && key != 'lendProcedure') {
						that.$message.error($('.' + key).prev().text() + '输入内容不能为空')
						return
					}
				}
				if(isNaN(amtMoney)) {
					that.$message.error('审批金额必须为数字')
					return
				}
				if(isNaN(term)) {
					that.$message.error('期限必须为数字')
					return
				}
				if(isNaN(letterTerm)) {
					that.$message.error('审批金额必须为数字')
					return
				}
				if($event.target.innerText == '通过') {
					$event.target.innerText = '提交中';
					$(".button button").eq(1).addClass('submiting');
					$event.target.disabled = true;
					this.$http.post('loan/saveLoan', paramsData).then(function(res) {
						if(res.data.respCode == "000000") {
							//							that.fullscreenLoading = false;
							that.$message({
								message: '保存成功',
								type: 'success',
								duration: "1500",
								onClose: function() {
									var initParams = {
										sc: that.stageCode,
										td: 'contentTableData',
										tt: 'total',
										val: 1,
										ps: 10,
										url: 'order/queryOrderListByStage'
									}
									$event.target.innerText = '通过';
									$(".button button").eq(1).removeClass('submiting')
									$(".button button").eq(1).removeAttr('disabled');
									that.getData(initParams)
									that.dialogFormVisibleEdit = false;
									that.$parent.dialogDestroy = false;
									that.$parent.handlePageChange(1);
								}
							});
						} else {
							$(".button button").eq(1).find('span').html('通过');
							$(".button button").eq(1).removeAttr('disabled');
							$(".button button").eq(1).removeClass('submiting')
							//							that.$parent.fullscreenLoading = false;
							that.$message.error("保存失败");
						}
					}).catch(function(error) {
						$(".button button").eq(1).html('通过');
						$(".button button").eq(1).removeAttr('disabled');
						$(".button button").eq(1).removeClass('submiting')
					})

				}
				if($event.target.innerText == '批贷函预览') {
					localStorage.setItem('preData', '');
					localStorage.setItem('preData', JSON.stringify(preData));
					var openUrl = window.location.href;
					var newUrl = openUrl.replace('pd', 'loanpre');
					window.open(newUrl)
				}
			},
			getAttachDetail() {
				var that = this;
				var attachId = this.bdDetailData.attachIdApprLeter
				if(attachId) {
					this.$http.get("common/queryAttachByAttachId", {
						params: {
							'attachId': attachId,
						}
					}).then(function(res) {
						if(res.data.respCode == '000000') {
							that.pdfDivVisible=true;
							that.pdfDownPath = that.$http.defaults.baseURL + "common/downloadPdf?attachId=" + attachId;
							that.pdfName = res.data.resultData.attachName;
							setTimeout(function(){$('#OrderPdf').attr("href", that.pdfDownPath);
							$('#OrderPdf').text(that.pdfName);},0)
						} else {
							that.showMsg("暂无批贷函信息！");
						}
					});
				}
			},
			dialogOpen() {
				$('.stage-dialog-3 .el-dialog__wrapper').show().css({
					'left': 'auto',
					'right': '-1079px'
				}).animate({
					right: '0'
				});
				$('.stage-dialog-3 .el-dialog__wrapper').css({
					'display': 'none'
				});
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
					var userInfo = JSON.parse(localStorage.getItem('powerList'));
					var userId = userInfo.opId;
					var userName = userInfo.list[0].opName;
					if(that.openFlag == "u") {
						//报单详情orderHouseId
						that.$http.get("order/queryOrderDetailByOrderHouseId", {
							params: {
								'orderHouseId': that.orderHouseId,
								'currentEmpId': userId,
								'flag': 'u',
								'currentEmpName': userName
							}
						}).then(function(res) {
							that.bdDetailData = res.data.resultData;
							that.bdDetailData.firstAssTotalAmt = that.formatMoney(that.bdDetailData.firstAssTotalAmt, 2, '');
							that.bdDetailData.firstAssLoanAmt = that.formatMoney(that.bdDetailData.firstAssLoanAmt, 2, '');
							that.bdDetailData.firstAssInterAmt = that.formatMoney(that.bdDetailData.firstAssInterAmt, 2, '');
							that.bdDetailData.visitCustAppLoanAmt = that.formatMoney(that.bdDetailData.visitCustAppLoanAmt, 2, '');
							that.bdDetailData.visitCustAppFirstMortAmt = that.formatMoney(that.bdDetailData.visitCustAppFirstMortAmt, 2, "", ",");
							that.bdDetailData.regTime = that.getForMatDate2(that.bdDetailData.regTime, 2, '');
							that.bdDetailData.visitCustAppTime = that.getForMatDate2(that.bdDetailData.visitCustAppTime, 2, '');
							if(that.bdDetailData.visitCustAppMortgage=="一抵"){
								that.bdDetailData.visitCustAppFirstMortAmt="无"
								that.bdDetailData.visitCustAppFirstMortNat="无"
							}
							that.dialogFormVisibleEdit = true;
							//展示图片，设置是否隐藏箭头
							that.$nextTick(function() {
								setTimeout(function() {
									that.imgListBuliding = that.queryAttachImg(res.data.resultData.attachIdHouCert, $(".img-list-buliding button")); //房本照片
									that.imgListCardN = that.queryAttachImg(res.data.resultData.attachIdIdcard, $(".img-list-card-n button"));
									that.imgListCardG = that.queryAttachImg(res.data.resultData.attachIdIdcardF, $(".img-list-card-g button"));
									that.imgListHKN = that.queryAttachImg(res.data.resultData.attachIdRegiterFam, $(".img-list-hkn button"));
									that.imgListHKG = that.queryAttachImg(res.data.resultData.attachIdRegiterFamF, $(".img-list-hkg button"));
									that.imgListZN = that.queryAttachImg(res.data.resultData.attachIdCredit, $(".img-list-zn button"));
									that.imgListZG = that.queryAttachImg(res.data.resultData.attachIdCreditF, $(".img-list-zg button"));
									that.imgListJZ = that.queryAttachImg(res.data.resultData.attachIdMarryCert, $(".img-list-jz button"));
									that.imgListLZ = that.queryAttachImg(res.data.resultData.attachIdDivorceCert, $(".img-list-lz button"));
									that.imgListLX = that.queryAttachImg(res.data.resultData.attachIdDivorceAgree, $(".img-list-lx button"));
									that.imgListYZ = that.queryAttachImg(res.data.resultData.attachIdBusiLicense, $(".img-list-yz button"));
									that.imgListYJ = that.queryAttachImg(res.data.resultData.attachIdBankLoanCont, $(".img-list-yj button"));
									that.imgListYD = that.queryAttachImg(res.data.resultData.attachIdBankMortCont, $(".img-list-yd button"));
									that.imgListSZ = that.queryAttachImg(res.data.resultData.attachIdDeadCert, $(".img-list-sz button"));
									that.imgListJS = that.queryAttachImg(res.data.resultData.attachIdInheritCert, $(".img-list-js button"));
									that.imgListYG = that.queryAttachImg(res.data.resultData.attachIdOrigCont, $(".img-list-yg button"));
									that.imgListFYZ = that.queryAttachImg(res.data.resultData.attachIdAbanPurchCert, $(".img-list-fyz button"));
									that.imgListQP = that.queryAttachImg(res.data.resultData.attachIdDeedTicket, $(".img-list-qp button"));
									that.imgListZXY = that.queryAttachImg(res.data.resultData.attachIdLeaseProt, $(".img-list-zxy button"));
									that.imgListCZS = that.queryAttachImg(res.data.resultData.attachIdLesseeId, $(".img-list-czs button"));
									that.imgListJAZ = that.queryAttachImg(res.data.resultData.attachIdEndProof, $(".img-list-jaz button"));
								}, 50)
							})
							that.$http.get('common/queryBasicParameterByKindCodes', {
								params: {
									'kindCodes': 'DBFS,DKCP,HKFS,TQHK,SFDQXD'
								}
							}).then(function(res) {
								that.guarantModeOptions = res.data.resultData.DBFS;
								that.productModeOptions = res.data.resultData.DKCP;
								that.repayModeModeOptions = res.data.resultData.HKFS;
								that.isPrepayMentModeOptions = res.data.resultData.TQHK;
								that.continueLoanModeOptions = res.data.resultData.SFDQXD;
							})
						});

					} else if(that.openFlag == "v") {
						$('.must-input').removeClass('must-input')
						that.$http.get("order/queryOrderDetailByOrderHouseId", {
							params: {
								'orderHouseId': that.orderHouseId,
								'currentEmpId': userId,
								'flag': 'v',
								'currentEmpName': userName
							}
						}).then(function(res) {
							that.bdDetailData = res.data.resultData;
							that.bdDetailData.firstAssTotalAmt = that.formatMoney(that.bdDetailData.firstAssTotalAmt, 2, '');
							that.bdDetailData.firstAssLoanAmt = that.formatMoney(that.bdDetailData.firstAssLoanAmt, 2, '');
							that.bdDetailData.firstAssInterAmt = that.formatMoney(that.bdDetailData.firstAssInterAmt, 2, '');
							that.bdDetailData.visitCustAppLoanAmt = that.formatMoney(that.bdDetailData.visitCustAppLoanAmt, 2, '');
							that.bdDetailData.regTime = that.getForMatDate2(that.bdDetailData.regTime);
							that.bdDetailData.visitCustAppTime = that.getForMatDate2(that.bdDetailData.visitCustAppTime);
							if(that.bdDetailData.visitCustAppMortgage=="一抵"){
								that.bdDetailData.visitCustAppFirstMortAmt="无"
								that.bdDetailData.visitCustAppFirstMortNat="无"
							}
							that.dialogFormVisibleEdit = true;
							//展示图片，设置是否隐藏箭头
							that.$nextTick(function() {
								setTimeout(function() {
									that.imgListBuliding = that.queryAttachImg(res.data.resultData.attachIdHouCert, $(".img-list-buliding button")); //房本照片
									that.imgListCardN = that.queryAttachImg(res.data.resultData.attachIdIdcard, $(".img-list-card-n button"));
									that.imgListCardG = that.queryAttachImg(res.data.resultData.attachIdIdcardF, $(".img-list-card-g button"));
									that.imgListHKN = that.queryAttachImg(res.data.resultData.attachIdRegiterFam, $(".img-list-hkn button"));
									that.imgListHKG = that.queryAttachImg(res.data.resultData.attachIdRegiterFamF, $(".img-list-hkg button"));
									that.imgListZN = that.queryAttachImg(res.data.resultData.attachIdCredit, $(".img-list-zn button"));
									that.imgListZG = that.queryAttachImg(res.data.resultData.attachIdCreditF, $(".img-list-zg button"));
									that.imgListJZ = that.queryAttachImg(res.data.resultData.attachIdMarryCert, $(".img-list-jz button"));
									that.imgListLZ = that.queryAttachImg(res.data.resultData.attachIdDivorceCert, $(".img-list-lz button"));
									that.imgListLX = that.queryAttachImg(res.data.resultData.attachIdDivorceAgree, $(".img-list-lx button"));
									that.imgListYZ = that.queryAttachImg(res.data.resultData.attachIdBusiLicense, $(".img-list-yz button"));
									that.imgListYJ = that.queryAttachImg(res.data.resultData.attachIdBankLoanCont, $(".img-list-yj button"));
									that.imgListYD = that.queryAttachImg(res.data.resultData.attachIdBankMortCont, $(".img-list-yd button"));
									that.imgListSZ = that.queryAttachImg(res.data.resultData.attachIdDeadCert, $(".img-list-sz button"));
									that.imgListJS = that.queryAttachImg(res.data.resultData.attachIdInheritCert, $(".img-list-js button"));
									that.imgListYG = that.queryAttachImg(res.data.resultData.attachIdOrigCont, $(".img-list-yg button"));
									that.imgListFYZ = that.queryAttachImg(res.data.resultData.attachIdAbanPurchCert, $(".img-list-fyz button"));
									that.imgListQP = that.queryAttachImg(res.data.resultData.attachIdDeedTicket, $(".img-list-qp button"));
									that.imgListZXY = that.queryAttachImg(res.data.resultData.attachIdLeaseProt, $(".img-list-zxy button"));
									that.imgListCZS = that.queryAttachImg(res.data.resultData.attachIdLesseeId, $(".img-list-czs button"));
									that.imgListJAZ = that.queryAttachImg(res.data.resultData.attachIdEndProof, $(".img-list-jaz button"));
								}, 50)
								if(that.businessStateCode < 41) {
									$('.must-input').removeClass('must-input')
									$(".button").hide()
									$(".content-pd-edit").hide()
								} else {
									that.activeIndex = res.data.resultData.stageCode - 1;
									that.getAttachDetail();
									$('.must-input').removeClass('must-input')
									$(".stage-dialog-3 .button").hide()

									$(".stage-dialog-3 .el-textarea__inner").attr('disabled', 'disabled')
									$(".stage-dialog-3 .el-input__inner").css('border', '0')
									$(".stage-dialog-3 .el-input__inner").attr('disabled', 'disabled')
									$(".stage-dialog-3 .el-input .el-input__icon").css('display', 'none')
									that.amtMoney = that.bdDetailData.apprLoanAmtMoney;
									that.term = that.bdDetailData.apprLoanTerm;
									that.letterTerm = that.bdDetailData.apprLoanLetterTerm;
									that.mortAddr = that.bdDetailData.apprLoanMortAddr;
									that.propNum = that.bdDetailData.apprLoanPropNum;
									that.letterCode = that.bdDetailData.apprLoanLetterCode;
									that.guarantMode = that.bdDetailData.apprLoanGuarantMode;
									that.product = that.bdDetailData.apprLoanProduct;
									that.repayMode = that.bdDetailData.apprLoanRepayMode;
									that.isPrepayMent = that.bdDetailData.apprLoanIsPrepayment;
									that.continueLoan = that.bdDetailData.apprLoanContinueLoan;
									that.lendCondition = that.bdDetailData.apprLoanLendCondition;
									that.lendProcedure = that.bdDetailData.apprLoanLendProcedure;
									that.otherOpinion = that.bdDetailData.apprLoanOtherOpinion;
								}
							})
						});
					}
				}
			}).catch(function(error) {
				that.$parent.dialogDestroy = false;
			})
		}
	}
</script>

<style>
	.el-select-dropdown {
		margin: 0;
	}
	
	.stage-dialog-3 .el-dialog__wrapper {
		overflow-x: hidden;
	}
	
	.content-bdlb .stage-dialog-3 .el-dialog__wrapper {
		overflow-x: hidden;
		overflow-y: hidden;
		height: auto;
	}
	
	.content-bdlb .stage-dialog-3 .evaluation-one {
		min-height: 170px;
		height: auto;
	}
	
	.stage-dialog-3 textarea {
		width: 816px;
	}
	
	.content-bdlb .stage-dialog-3 .content-xhms {
		min-height: 170px;
		height: auto;
	}
	
	.content-bdlb .stage-dialog-3 .line {
		width: 100%;
		margin-top: 16px;
	}
	
	.content-bdlb .stage-dialog-3 .content-pd-edit .edit {
		background: #fff;
	}
	
	.content-bdlb .stage-dialog-3 .content-pd-edit textarea {
		border: 1px solid #BABABA;
	}
	
	.content-bdlb .stage-dialog-3 .term,
	.content-bdlb .stage-dialog-3 .continueLoan,
	.content-bdlb .stage-dialog-3 .product,
	.content-bdlb .stage-dialog-3 .propNum {
		margin-right: 12px;
		margin-left: -8px;
	}
	.stage-dialog-3 #OrderPdf:hover{
		color: #07f!important;
    	border-bottom: 1px solid #07f!important;
	}
	.content-bdlb .stage-dialog-3 .loan-user-edit {
		width: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
		top: 0 !important;
		bottom: 0;
		right: 0;
		padding: 0;
		margin: 0;
		height: 100%;
		position: relative;
	}
	
	.content-bdlb .stage-dialog-3 .content-pd-edit .line-text .text-area-edit textarea {
		margin-top: 8px;
		min-height: 80px;
		margin-left: 18px;
	}
	
	.stage-dialog-3 .content-pd-edit .line-text .text-area-edit textarea {
		margin-top: 8px;
		min-height: 80px;
		margin-left: 48px;
	}
	
	.stage-dialog-3 .button button:hover {
		background: #fff;
		border-color: #50BFFF;
		color: #50BFFF;
	}
	
	.stage-dialog-3 .button button {
		padding: 10px 15px;
		width: 94px;
		font-size: 14px;
		background: #fff;
		border: 1px solid rgb(191, 203, 217);
		color: rgb(31, 45, 61);
	}
	
	.stage-dialog-3 .button button:nth-of-type(3):hover {
		background: #fff;
		border-color: #f7ba2a;
		color: #f7ba2a;
	}
	
	.content-pd .my-slider img {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.content-pd .big-img-content img {
		width: auto;
		height: auto;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		cursor: move;
	}

	
	.content-pd .big-img-content .title-img {
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
	
	.content-pd .big-img-content {
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
	
	.content-pd .line0 .my-slider,
	.line0 span {
		display: inline-block;
		float: left;
		height: 80px;
	}
	
	.content-pd .line0 span {
		vertical-align: top;
		width: 112px;
	}
	
	.content-pd .my-slider {
		width: 653px;
		height: 80px;
		position: relative;
		margin-top: 5px;
	}
	
	.content-pd .my-slider .left,
	.my-slider .right {
		position: absolute;
		width: 30px;
		height: 30px;
		top: 50%;
		transform: translate(0, -50%);
	}
	
	.content-pd .my-slider .left {
		left: -30px;
		background: url("../../theme/default/images/nav/left.png") no-repeat;
	}
	
	.content-pd .my-slider .right {
		background: url("../../theme/default/images/nav/right.png") no-repeat;
		right: -30px;
	}
	
	.content-pd .my-slider .area {
		width: 120px;
		height: 80px;
		background-color: #E5E5E5;
		float: left;
	}
	
	.submiting {
		background: #F2EFEF !important;
	}
	
	.submiting:hover {
		border: 1px solid rgb(191, 203, 217) !important;
		color: #fff !important;
		cursor: not-allowed;
	}
</style>