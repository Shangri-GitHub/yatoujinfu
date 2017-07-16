<template>
    <div class="stage-dialog-1">
        <el-dialog @open='dialogOpen' :show-close="false" custom-class="loan-user-edit" :close-on-click-modal="false"
                   :visible.sync="dialogFormVisibleEdit">
            <div class="modal-content">
                <div class="edit-main">
                    <span class="close-btn" @click="unLock();dialogFormVisibleEdit = false"></span>
                    <div class="check-status-ul">
                        <el-steps :align-center="true" :space="110" :active=activeIndex finish-status="success">
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
                            <span>报单编号</span><span><input type="text" v-model="bdDetailData.orderHouseCode"
                                                          class="readonly" disabled></span>
                            <span>提交报单时间</span><span><input type="text" v-model="bdDetailData.regTime"
                                                            class="readonly" disabled></span>
                            <span>信贷员</span><span><input type="text" v-model="bdDetailData.saleNameC"
                                                         class="readonly" disabled></span>
                        </div>
                        <div class="line">
                            <span>社区名</span><span><input type="text" v-model="bdDetailData.houLiveArea"
                                                         class="readonly" disabled></span>
                            <span>楼栋</span><span><input type="text" v-model="bdDetailData.houBuilding"
                                                        class="readonly" disabled></span>
                            <span>楼层</span><span><input type="text" v-model="bdDetailData.houFloor" class="readonly"
                                                        disabled></span>
                        </div>
                        <div class="line">
                            <span>信贷员手机号</span><span><input type="text" v-model="bdDetailData.houFloor"
                                                            class="readonly" disabled></span>
                            <span>门牌号</span><span><input type="text" v-model="bdDetailData.houNum" class="readonly"
                                                         disabled></span>
                            <span>房屋性质</span><span><input type="text" v-model="bdDetailData.houCharacter"
                                                          class="readonly" disabled></span>
                        </div>
                        <div class="line">
                            <span>建筑面积(㎡)</span><span><input type="text" v-model="bdDetailData.houArea"
                                                             class="readonly" disabled></span>
                            <span>规划用途</span><span><input type="text" v-model="bdDetailData.houPosition"
                                                          class="readonly" disabled></span>
                        </div>
                        <div class="line0" v-if="bdDetailData.attachIdHouCert">
                            <span>房产证</span>
                            <div class="my-slider img-list-buliding" ref="imgBuliding">
                                <el-carousel height="80px" :autoplay="false" arrow="always">
                                    <el-carousel-item v-for="item in imgListBuliding" :key="item">
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
                                            <img :src="a" alt="">
                                        </div>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                        <div class="line jdyy">
                            <span class="jdyy-title">拒单原因</span><span class="jdyy-con"
                                                                      v-html="bdDetailData.refuseReason"></span>
                        </div>
                    </div>
                </div>
                <div class="evaluation-one">
                    <div class="title cp">初评</div>
                    <div class="content">
                        <div class="line always-disa">
                            <span>抵押类型</span><span><input type="text" v-model="bdDetailData.visitCustAppMortgage"
                                                          class="readonly" disabled></span>
                            <span>一抵余额(元)</span><span><input type="text" v-model="bdDetailData.visitCustAppFirstMortAmt"
                                                             class="readonly" disabled></span>
                            <span>一抵性质</span><span><input type="text" v-model="bdDetailData.visitCustAppFirstMortNat"
                                                          class="readonly" disabled></span>
                        </div>
                        <div class="line">
                            <span class="must-input is-must">评价总额(元)</span><span><el-input type="text"
                                                                                           v-model="evaluation"
                                                                                           class="edit"></el-input></span>
                            <span class="must-input is-must">可贷金额(元)</span><span><el-input type="text"
                                                                                           v-model="loanMoney"
                                                                                           class="edit"></el-input></span>
                            <span class="must-input is-must">建筑面积(㎡)</span><span><el-input type="text"
                                                                                           v-model="bulidingArea"
                                                                                           class="edit"></el-input></span>
                        </div>
                        <div class="line">
                            <span class="must-input is-must">中介成交价(元)</span><span><el-input type="text"
                                                                                            v-model="intermediary"
                                                                                            class="edit"></el-input></span>
                        </div>
                        <div class="line">
                            <span class="must-input is-must">房产地址</span><span class="buliding-adress"><el-input
                                type="text"
                                v-model="bdDetailData.houAddr"
                                class="edit"></el-input></span>

                        </div>
                        <div class="line bulid-org">
                            <span>初评意见</span>
                            <el-input type="textarea" v-model="firstSuggest" name="" id=""></el-input>
                        </div>
                    </div>
                    <div class="button">
                        <el-button :plain="true" type="info" @click="passBtn()">通过</el-button>
                        <el-button :plain="true" type="warning" @click="refuseDialog=true">拒单</el-button>
                    </div>
                </div>
                <div class="face-trial-t">
                    <div class="title xhms">下户面审</div>
                    <div class="content">
                        <div class="line ft-time">
                            <span class=" fc-must">预约下户时间</span>
                            <span style="margin-left: -4px;">
                                    <input  type="text"
                                            v-model="bdDetailData.visitCustAppTime"
                                            class="readonly"
                                           disabled/>
                                </span>
                            <span  class=" fc-must">预约下户联系人</span>
                            <span style="margin-left: -4px;">
                                <input  type="text"
                                        v-model="bdDetailData.visitCustAppPersion"
                                        disabled
                                        class="readonly"/>
                            </span>
                            <span style="" class=" fc-must">预约下户联系方式</span>
                            <span style="margin-left: -4px;">
                                <input type="text"
                                       v-model="bdDetailData.visitCustAppPhonenum"
                                       disabled
                                       class="readonly"/>
                            </span>
                        </div>
                        <div class="line">
                            <span>抵押类型</span><span><input type="text" v-model="bdDetailData.visitCustAppMortgage"
                                                          class="readonly" disabled></span>
                            <span>贷款金额(元)</span><span><input type="text"
                                                             v-model="bdDetailData.visitCustAppLoanAmt"
                                                             class="readonly" disabled></span>
                            <span>建筑面积(㎡)</span><span><input type="text" v-model="bdDetailData.houArea"
                                                             class="readonly" disabled></span>
                        </div>
                        <div class="line">
                            <span>借款人姓名</span><span><input type="text" v-model="bdDetailData.custName"
                                                           class="readonly" disabled></span>
                            <span>借款人婚姻状态</span><span><input type="text" v-model="bdDetailData.custMaritalStatus"
                                                             class="readonly" disabled></span>
                            <span>风控经理</span><span><input type="text" v-model="bdDetailData.currDealEmpName"
                                                          class="readonly" disabled></span>

                        </div>
                        <div class="line">
                            <span>借款人身份证号</span><span><input type="text" v-model="bdDetailData.custId
"
                                                             class="readonly" disabled></span>
                            <span>共借人姓名</span><span><input type="text" v-model="bdDetailData.jointBorrowerName"
                                                           class="readonly" disabled></span>
                            <span>共借人身份证号</span><span><input type="text" v-model="bdDetailData.jointBorrowerId"
                                                             class="readonly" disabled></span>
                        </div>
                        <div class="line0" v-if="bdDetailData.attachIdIdcard">
                            <span>身份证(男)</span>
                            <div class="my-slider img-list-card-n">
                                <el-carousel height="80px" :autoplay="false" arrow="always">
                                    <el-carousel-item v-for="item in imgListCardN" :key="item">
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
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
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
                                            <img :src="a" alt="">
                                        </div>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>

                        <div class="line spyj" style="">
                            <span>面审申请审批意见</span>
                            <el-input type="textarea" v-model="bdDetailData.visitCustApprOpinion" name="" readonly
                                      id=""></el-input>
                        </div>
                        <div class="line yj" style="margin-top: 8px;">
                            <span>面审审批意见</span>
                            <el-input type="textarea" v-model="bdDetailData.visitCustFaOpinion" name="" readonly
                                      id=""></el-input>
                        </div>
                    </div>
                </div>
                <div class="order-infor repayment">
                    <div class="title hkjh">还款计划</div>
                    <div class="content">
                        <div class="line0">
                            <span>还款计划表</span>
                            <div class="my-slider img-list-hkjh">
                                <el-carousel height="80px" :autoplay="false" arrow="always">
                                    <el-carousel-item v-for="item in imgListHKJH" :key="item">
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-left: 5px;margin-right: 5px;">
                                            <img :src="a" alt="">
                                        </div>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="refuseDialog"
                   style='width:452px;height: 296px;' class='refuseDialog'>
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
                dialogFormVisibleEdit: false,
//				fullscreenLoading: false,
                evaluation: "", //填表
                bdDetailData: "",
                loanMoney: "",
                bulidingArea: "",
                intermediary: "",
                firstSuggest: "",
                refuseReason: '',
                refuseDialog: false,
                dialogFormVisibleEdit: false,
                bulidingAdr: "",
                imgListBuliding: "",
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
                imgListHKJH:"",
                activeIndex: 0
            }
        },
        props: ['orderHouseId', 'openFlag', 'businessStateCode'],
        methods: {
            dialogOpen() {
                $('.first-comment .el-dialog__wrapper').show().css({
                    'left': 'auto',
                    'right': '-1079px'
                }).animate({
                    right: '0'
                });
                $('.first-comment .el-dialog__wrapper').css({
                    'display': 'none'
                });
            },
            unLock() {
                var that = this;
                if (this.openFlag == 'u') {
                    this.$http({
                        method: 'post',
                        url: "order/unlockOrder",
                        data: {
                            'orderHouseId': that.bdDetailData.orderHouseId
                        }
                    }).then(function (res) {
                    })
                }
                that.$parent.dialogDestroy = false;
                $(".content-bdlb").removeClass("first-comment");
            },
            refuseOrder() {
                var that = this;
                if (this.refuseReason == '') {
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
                that.$http.post(btnHttpParmas.url, btnHttpParmas.params).then(function (res) {
                    if (res.data.respCode == '000000') {
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
            showSuccessMsg(str) {
                var that = this;
                that.$message({
                    message: str + '成功',
                    type: 'success',
                    duration: "1500",
                    onClose: function () {
                        that.refuseDialog = false;
                        that.dialogFormVisibleEdit = false;
                        that.$parent.dialogDestroy = false;
                        $(".content-bdlb").removeClass("first-comment");
                        that.$parent.handlePageChangeFC(1)
                    }
                });
            },
            showFailMsg(str) {
                var that = this;
                that.$message({
                    message: str + '失败',
                    type: 'error',
                    duration: "1500",
                    onClose: function () {
                        that.refuseDialog = false;
                        that.dialogFormVisibleEdit = false;
                        that.$parent.dialogDestroy = false;
                        $(".content-bdlb").removeClass("first-comment");
                        that.$parent.handlePageChangeFC(1)
                    }
                });
            },
            showMsg(msg){
                this.$message({
                    message: msg,
                    type: 'warning',
                    duration: "1500",
                });
            },
            passBtn() {
                var that = this;
                var str = "";
                if (!this.evaluation) {
                    str = "请填写评价总额";
                    this.showMsg(str);
                    return false;
                }
                if (!Number(this.evaluation) && this.evaluation != 0) {
                    str = "请填写纯数字格式的评价总额";
                    this.showMsg(str);
                    return false;
                }
                if (!this.loanMoney) {
                    str = "请填写可贷金额"
                    this.showMsg(str);
                    return false;
                }
                if (!Number(this.loanMoney) && this.loanMoney != 0) {
                    str = "请填写纯数字格式的可贷金额"
                    this.showMsg(str);
                    return false;
                }
                if (!this.bulidingArea) {
                    str = "请填写建筑面积"
                    this.showMsg(str);
                    return false;
                }
                if (!Number(this.bulidingArea) && this.bulidingArea != 0) {
                    str = "请填写纯数字格式的建筑面积"
                    this.showMsg(str);
                    return false;
                }
                if (!this.intermediary) {
                    str = "请填写中介成交价"
                    this.showMsg(str);
                    return false;
                }
                if (!Number(this.intermediary) && this.intermediary != 0) {
                    str = "请填写纯数字格式的中介成交价"
                    this.showMsg(str);
                    return false;
                }
                if (!this.bdDetailData.houAddr) {
                    str = "请填写房产地址";
                    this.showMsg(str);
                    return false;
                }

                this.$http({
                    method: 'post',
                    url: "asess/saveAsessInfo",
                    data: {
                        firstAssTotalAmt: this.evaluation,
                        firstAssLoanAmt: this.loanMoney,
                        houArea: this.bulidingArea,
                        firstAssOpinion: this.firstSuggest,
                        houAddr: this.bdDetailData.houAddr,
                        firstAssInterAmt: this.intermediary,
                        orderHouseId: that.bdDetailData.orderHouseId
                    },
                }).then(function (res) {
                    if (res.data.respCode == "000000") {
//						that.fullscreenLoading = false;
                        that.$message({
                            message: '保存成功',
                            type: 'success',
                            duration: "1500",
                            onClose: function () {
                                that.dialogFormVisibleEdit = false;
                                that.$parent.dialogDestroy = false;
                                $(".content-bdlb").removeClass("first-comment");
                                that.$parent.handlePageChangeFC(1);
                            }
                        });
                    } else {
//						that.fullscreenLoading = false;
                        that.$message.error("保存失败");
                    }

                })
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
        },
        mounted: function () {
            $(".content-bdlb").addClass("first-comment");
            var that = this;
            this.$http.get("order/queryOrderDetailByOrderHouseId", {
                params: {
                    'orderHouseId': that.orderHouseId,
                    'flag': that.openFlag,
                }
            }).then(function (res) {
                if (res.data.respCode == '000010') {
                    that.$message({
                        message: "报单已锁定，请稍后尝试编辑",
                        type: 'warning',
                        duration: "1500",
                    });
                    that.$parent.dialogDestroy = false;
                } else {
                    that.dialogFormVisibleEdit = true;
                    that.$nextTick(function () {
                        if (that.openFlag == "u") {
                            $(".first-comment .evaluation-one .line span").css("height","39px")
                            $(".evaluation-one").css("display", "block")
                            $(".button").css("display", "flex")
                            $(".jdyy,.face-trial-t,.repayment").css("display", "none")
                            $(".evaluation-one .is-must").addClass("must-input")
                            $(".evaluation-one input").removeClass("ready-only").removeAttr("disabled");
                            $(".evaluation-one .always-disa input").attr("disabled", true);
                            $(".evaluation-one textarea").removeAttr("disabled");
                        }
                        if (that.openFlag == "v") {
                            $(".first-comment .evaluation-one .line span").css("height","30px")
                            if (that.businessStateCode == "11") {
                                $(".evaluation-one,.face-trial-t,.repayment").css("display", "none")
                                $(".jdyy").css("display", "none")
                            }
                            if (that.businessStateCode == "91") {
                                $(".evaluation-one,.face-trial-t,.repayment").css("display", "none")
                                $(".jdyy").css("display", "block")
                            }
                            if (that.businessStateCode > 11 && that.businessStateCode != 91) {
                                that.activeIndex = res.data.resultData.stageCode - 1;
                                $(".evaluation-one,.face-trial-t").css("display", "block")
                                $(".button,.jdyy,.repayment").css("display", "none")
                                if (that.businessStateCode > 61){
                                    $(".repayment").css("display", "block")
                                }
                                $(".evaluation-one .is-must").removeClass("must-input")
                                $(".evaluation-one input").addClass("ready-only").attr("disabled", true);
                                $(".evaluation-one textarea,.face-trial-t textarea").attr("disabled", true);
                                this.evaluation = that.formatMoney(that.bdDetailData.firstAssTotalAmt, 2, "", ",");
                                this.loanMoney = that.formatMoney(that.bdDetailData.firstAssLoanAmt, 2, "", ",");
                                this.bulidingArea = that.bdDetailData.houArea;
                                this.firstSuggest = that.bdDetailData.firstAssOpinion;
                                this.intermediary = that.formatMoney(that.bdDetailData.firstAssInterAmt, 2, "", ",");
                                that.bdDetailData.visitCustAppLoanAmt = that.formatMoney(that.bdDetailData.visitCustAppLoanAmt, 2, "", ",");
                                that.bdDetailData.visitCustAppTime = that.getForMatDate2(that.bdDetailData.visitCustAppTime);
                                setTimeout(function () {
                                    that.imgListBuliding = that.queryAttachImg(res.data.resultData.attachIdHouCert, $(".img-list-buliding button"));//房本照片
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
                                    that.imgListHKJH = that.queryAttachImg(res.data.resultData.attachIdRepayPlanTab, $(".img-list-hkjh button"));
                                }, 50);
                            }
                        }
                        that.imgListBuliding = that.queryAttachImg(res.data.resultData.attachIdHouCert, $(".img-list-buliding button"));
                    })
                    that.bdDetailData = res.data.resultData;
                    that.bdDetailData.regTime = that.getForMatDate2(that.bdDetailData.regTime);
                    that.bdDetailData.visitCustAppFirstMortAmt = that.formatMoney(that.bdDetailData.visitCustAppFirstMortAmt, 2, "", ",");
                    if (that.bdDetailData.visitCustAppMortgage == "一抵") {
                        that.bdDetailData.visitCustAppFirstMortAmt = "无"
                        that.bdDetailData.visitCustAppFirstMortNat = "无"
                    }
                }

            }).catch(function (error) {
                that.$parent.dialogDestroy = false;
            });
        }
    }
</script>

<style>
    .stage-dialog-1 {
        height: 100%;
        width: 100%;
        position: absolute;
    }

    /*初评*/

    /* .first-comment .stage-dialog-1 .loan-user-edit {
         width: 100%;
         top: 0 !important;
         overflow-y: scroll;
         bottom: 0;
         right: 0;
         padding: 0;
         margin: 0;
         height: 100%;
         position: relative;
     }

     !*报单列表*!

     .content-bdlb .stage-dialog-1 input.edit {
         border: 1px solid #BABABA;
         background-color: #fff;
         height: 28px;
         line-height: 28px;
     }

     .content-bdlb .stage-dialog-1 textarea {
         padding: 14px;
         display: inline-block;
         margin-left: -4px;
         vertical-align: top;
     }

     .content-bdlb .stage-dialog-1 .line {
         margin-top: 8px;
     }

     .content-bdlb .stage-dialog-1 .evaluation-one .button {
         margin-top: 30px;
     }

     .content-bdlb .stage-dialog-1 .evaluation-one {
         min-height: 340px;
         height: auto;
     }

     .content-bdlb .stage-dialog-1 .order-infor {
         min-height: 254px;
         height: auto;
     }*/

    /*  .content-bdlb .stage-dialog-1 {
          top: 0;
      }*/

    /* .content-bdlb .stage-dialog-1 .el-dialog__wrapper {
         overflow-y: hidden;
         height: auto;
     }*/

    /*.content-bdlb .stage-dialog-1 .loan-user-edit {
        width: 100%;
        overflow-y: scroll;
        top: 0 !important;
        bottom: 0;
        right: 0;
        padding: 0;
        margin: 0;
        height: 100%;
        position: relative;
    }*/
</style>