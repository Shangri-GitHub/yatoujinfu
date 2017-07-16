<template>
    <div class="stage-dialog-2">
        <!--编辑、查看-->
        <el-dialog @open='dialogOpen' :show-close="false" custom-class="loan-user-edit" :close-on-click-modal="false"
                   :visible.sync="dialogFormVisibleEdit">
            <div class="modal-content">
                <div class="edit-main">
                    <span class="close-btn" @click="closeDetailPage()"></span>
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
                            <span>信贷员手机号</span><span><input type="text" v-model="bdDetailData.saleMobile"
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
                            <div class="my-slider img-list-buliding">
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
                    </div>
                </div>
                <div class="evaluation-one">
                    <div class="title cp">初评</div>
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
                            <span>评价总额(元)</span><span><input type="text" v-model="bdDetailData.firstAssTotalAmt"
                                                             class="readonly"
                                                             disabled></span>
                            <span>可贷金额(元)</span><span><input type="text" v-model="bdDetailData.firstAssLoanAmt"
                                                             class="readonly"
                                                             disabled></span>
                            <span>建筑面积(㎡)</span><span><input type="text" v-model="bdDetailData.houArea"
                                                             class="readonly"
                                                             disabled></span>
                        </div>
                        <div class="line">
                            <span>中介成交价(元)</span><span><input type="text" v-model="bdDetailData.firstAssInterAmt"
                                                              class="readonly"
                                                              disabled></span>
                            <span>房产地址</span><span class="bulid-org"><input type="text" class="readonly" disabled
                                                                            v-model="bdDetailData.houAddr"></span>
                        </div>
                        <div class="line">
                            <span>初评意见</span><span class="fc-suggest" v-html="bdDetailData.firstAssOpinion"></span>
                        </div>
                    </div>
                </div>
                <div class="face-trial-t">
                    <div class="title xhms">下户面审</div>
                    <div class="content">
                        <div class="line ft-time">
                            <span class="must-input fc-must">预约下户时间</span>
                            <span>
                                    <el-date-picker v-model="bdDetailData.visitCustAppTime" type="datetime" size="mini"
                                                    placeholder="选择日期时间">
                                    </el-date-picker>
                                </span>
                            <span style="margin-left: -4px;" class="must-input fc-must">预约下户联系人</span>
                            <span style="width: 195px "><el-input type="text"
                                                                  v-model="bdDetailData.visitCustAppPersion"
                                                                  class="edit is-edit"></el-input></span>
                            <span style="width: 120px;" class="must-input fc-must">预约下户联系方式</span>
                            <span><el-input type="text" v-model="bdDetailData.visitCustAppPhonenum"
                                            class="edit is-edit"></el-input></span>
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
                        <div class="line bqyj2" style="margin-top: 4px;">
                            <span>信息补全意见</span>
                            <span class="replace-area" v-html="bdDetailData.infoCpOpinion"></span>
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
                            <el-input type="textarea" v-model="bdDetailData.visitCustApprOpinion" name=""
                                      id=""></el-input>
                        </div>
                        <div class="line bq-sourse" style="margin-top: 20px;">
                            <span>补全资料类别选择</span>
                            <div class="bq-sourse-c">
                                <el-checkbox-group v-model="fcCheckList" @change="getChecked()">
                                    <el-row>
                                        <el-col :span="2">
                                            <div class="grid-content bg-purple">
                                                身份证
                                            </div>
                                        </el-col>
                                        <el-col :span="1">
                                            <div class="grid-content bg-purple" v-show="picNanNv">
                                                <el-checkbox label="ATTACH_ID_IDCARD" name="身份证(男)">男</el-checkbox>
                                            </div>
                                        </el-col>
                                        <el-col :span="5">
                                            <div class="grid-content bg-purple" v-show="picNanNv">
                                                <el-checkbox label="ATTACH_ID_IDCARD_F" name="身份证(女)">女</el-checkbox>
                                            </div>
                                        </el-col>
                                        <el-col :span="2">
                                            <div class="grid-content bg-purple-light">
                                                户口本
                                            </div>
                                        </el-col>
                                        <el-col :span="1">
                                            <div class="grid-content bg-purple-light" v-show="hkNanNv">
                                                <el-checkbox label="ATTACH_ID_REGITER_FAM" name="户口本(男)">男
                                                </el-checkbox>
                                            </div>
                                        </el-col>
                                        <el-col :span="5">
                                            <div class="grid-content bg-purple" v-show="hkNanNv">
                                                <el-checkbox label="ATTACH_ID_REGITER_FAM_F" name="户口本(女)">女
                                                </el-checkbox>
                                            </div>
                                        </el-col>
                                        <el-col :span="2">
                                            <div class="grid-content bg-purple">
                                                征信
                                            </div>
                                        </el-col>
                                        <el-col :span="1">
                                            <div class="grid-content bg-purple" v-show="zxNanNv">
                                                <el-checkbox label="ATTACH_ID_CREDIT" name="征信(男)">男</el-checkbox>
                                            </div>
                                        </el-col>
                                        <el-col :span="5">
                                            <div class="grid-content bg-purple" v-show="zxNanNv">
                                                <el-checkbox label="ATTACH_ID_CREDIT_F" name="征信(女)">女</el-checkbox>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row style="margin-top: 10px">
                                        <el-col :span="8">
                                            <div class="grid-content bg-purple">
                                                <el-checkbox label="ATTACH_ID_MARRY_CERT" name="结婚证">结婚证</el-checkbox>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="grid-content bg-purple-light">
                                                <el-checkbox label="ATTACH_ID_DIVORCE_CERT" name="离婚证">离婚证</el-checkbox>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="grid-content bg-purple">
                                                <el-checkbox label="ATTACH_ID_DIVORCE_AGREE" name="离婚协议">离婚协议
                                                </el-checkbox>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row style="margin-top: 10px">
                                        <el-col :span="8">
                                            <div class="grid-content bg-purple">
                                                <el-checkbox label="ATTACH_ID_BUSI_LICENSE" name="营业执照">营业执照
                                                </el-checkbox>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="grid-content bg-purple-light">
                                                <el-checkbox label="ATTACH_ID_BANK_LOAN_CONT" name="银行借款合同">银行借款合同
                                                </el-checkbox>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="grid-content bg-purple">
                                                <el-checkbox label="ATTACH_ID_BANK_MORT_CONT" name="银行抵押合同">银行抵押合同
                                                </el-checkbox>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row style="margin-top: 10px">
                                        <el-col :span="24">
                                            <div class="grid-content bg-purple">
                                                <el-checkbox label="ATTACH_ID_HOU_CERT" name="房产证">房产证</el-checkbox>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row style="margin-top: 60px">
                                        <el-col :span="8">
                                            <div class="grid-content bg-purple">
                                                <el-checkbox label="ATTACH_ID_DEAD_CERT" name="死亡证明">死亡证明</el-checkbox>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="grid-content bg-purple-light">
                                                <el-checkbox label="ATTACH_ID_INHERIT_CERT" name="继承公证书">继承公证书
                                                </el-checkbox>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="grid-content bg-purple">
                                                <el-checkbox label="ATTACH_ID_ORIG_CONT" name="原始购房合同">原始购房合同
                                                </el-checkbox>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row style="margin-top: 10px">
                                        <el-col :span="8">
                                            <div class="grid-content bg-purple">
                                                <el-checkbox label="ATTACH_ID_ABAN_PURCH_CERT" name="放弃优先购买权证明">
                                                    放弃优先购买权证明
                                                </el-checkbox>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="grid-content bg-purple-light">
                                                <el-checkbox label="ATTACH_ID_DEED_TICKET" name="契税票">契税票</el-checkbox>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="grid-content bg-purple">
                                                <el-checkbox label="ATTACH_ID_LEASE_PROT" name="租赁协议">租赁协议</el-checkbox>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row style="margin-top: 10px;margin-bottom: 15px">
                                        <el-col :span="8">
                                            <div class="grid-content bg-purple">
                                                <el-checkbox label="ATTACH_ID_LESSEE_ID" name="承租人身份证">承租人身份证
                                                </el-checkbox>
                                            </div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="grid-content bg-purple-light">
                                                <el-checkbox label="ATTACH_ID_END_PROOF" name="结案证明">结案证明</el-checkbox>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <div class="line bqyj" style="margin-top: 4px;">
                            <span>信息补全意见</span>
                            <el-input type="textarea" v-model="bdDetailData.infoCpOpinion" name="" id=""></el-input>
                        </div>
                        <div class="line yj" style="margin-top: 8px;">
                            <span>面审审批意见</span>
                            <el-input type="textarea" v-model="bdDetailData.visitCustFaOpinion" name=""
                                      id=""></el-input>
                        </div>
                        <div class="line bqyj2 jdyy" style="margin-top: 4px;">
                            <span>拒单原因</span>
                            <span class="replace-area" v-html="bdDetailData.refuseReason"></span>
                        </div>
                    </div>
                    <div class="button face-trial-btn" style="margin-top: 20px;">
                        <div class="download">
                            <el-button :plain="true" type="info" @click="downLoadZip()">打包下载</el-button>
                        </div>
                        <div class="infor-all">
                            <el-button :plain="true" type="info" @click="dialogFullInfo = true;queryCpInfoDetail()">
                                信息补全
                            </el-button>
                        </div>
                        <div class="pass">
                            <el-button :plain="true" type="info" @click="passBtn()">通过</el-button>
                        </div>
                        <div class="refuse">
                            <el-button :plain="true" type="warning" @click="refuseDialog=true">拒单</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
        <!--指派弹框-->
        <el-dialog :show-close="false" custom-class="appoint-dialog" :close-on-click-modal="false"
                   :visible.sync="dialogAppointVisible">
            <div class="title">指派</div>
            <div class="content zhipai">
                <el-row style="margin-top: 20px">

                    <div style="float: left">
                        用户姓名
                        <el-input v-model="opName" class="sub-input-top" placeholder="请输入内容"></el-input>
                    </div>

                    <div style="float: left;margin: 0 10px">
                        登录账号
                        <el-input v-model="loginCode" class="sub-input-top" placeholder="请输入内容"></el-input>
                    </div>

                    <div style="float: left" class="zhipai-btn">
                        <el-button :plain="true" type="info" @click="handlePageChangeZp(1)">查 询</el-button>
                    </div>
                    </el-col>
                </el-row>
            </div>
            <div class="appoint-table">
                <template>
                    <el-table highlight-current-row @row-click='handleRowHandle' :data="tableData2"
                              border>
                        <el-table-column prop="opName" label="用户姓名">
                        </el-table-column>
                        <el-table-column prop="loginCode" label="登陆账号">
                        </el-table-column>
                        <el-table-column prop="orgName" label="归属单位">
                        </el-table-column>
                        <el-table-column prop="mobileNo" label="联系方式">
                        </el-table-column>
                    </el-table>
                </template>
                <el-pagination small @current-change="handlePageChangeZp" :current-page="1" :page-size="5"
                               layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>

            </div>
            <div slot="footer" class="appoint-footer">
                <el-button :plain="true" type="warning" @click="closeAppoint">取 消</el-button>
                <el-button :plain="true" type="info" @click="saveAssignOp();">确 定
                </el-button>
            </div>
        </el-dialog>
        <!--信息补全-->
        <el-dialog :show-close="false" custom-class="custom-dialog" :close-on-click-modal="false"
                   :visible.sync="dialogFullInfo">
            <div slot="title">信息补全</div>
            <div class="sub-title">补全资料类别选择</div>
            <div class="dialog-select-data">
                <el-checkbox-group v-model="checkList" @change="getCheckedDialog()">
                    <el-row>
                        <el-col :span="2">
                            <div class="grid-content bg-purple">
                                身份证
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <div class="grid-content bg-purple" v-show="picNanNv">
                                <el-checkbox label="ATTACH_ID_IDCARD" name="身份证(男)">男</el-checkbox>
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content bg-purple" v-show="picNanNv">
                                <el-checkbox label="ATTACH_ID_IDCARD_F" name="身份证(女)">女</el-checkbox>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="grid-content bg-purple-light">
                                户口本
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <div class="grid-content bg-purple-light" v-show="hkNanNv">
                                <el-checkbox label="ATTACH_ID_REGITER_FAM" name="户口本(男)">男
                                </el-checkbox>
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content bg-purple" v-show="hkNanNv">
                                <el-checkbox label="ATTACH_ID_REGITER_FAM_F" name="户口本(女)">女
                                </el-checkbox>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="grid-content bg-purple">
                                征信
                            </div>
                        </el-col>
                        <el-col :span="1">
                            <div class="grid-content bg-purple" v-show="zxNanNv">
                                <el-checkbox label="ATTACH_ID_CREDIT" name="征信(男)">男</el-checkbox>
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content bg-purple" v-show="zxNanNv">
                                <el-checkbox label="ATTACH_ID_CREDIT_F" name="征信(女)">女</el-checkbox>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 10px">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-checkbox label="ATTACH_ID_MARRY_CERT" name="结婚证">结婚证</el-checkbox>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light">
                                <el-checkbox label="ATTACH_ID_DIVORCE_CERT" name="离婚证">离婚证</el-checkbox>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-checkbox label="ATTACH_ID_DIVORCE_AGREE" name="离婚协议">离婚协议
                                </el-checkbox>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 10px">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-checkbox label="ATTACH_ID_BUSI_LICENSE" name="营业执照">营业执照
                                </el-checkbox>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light">
                                <el-checkbox label="ATTACH_ID_BANK_LOAN_CONT" name="银行借款合同">银行借款合同
                                </el-checkbox>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-checkbox label="ATTACH_ID_BANK_MORT_CONT" name="银行抵押合同">银行抵押合同
                                </el-checkbox>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 10px">
                        <el-col :span="24">
                            <div class="grid-content bg-purple">
                                <el-checkbox label="ATTACH_ID_HOU_CERT" name="房产证">房产证</el-checkbox>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 45px">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-checkbox label="ATTACH_ID_DEAD_CERT" name="死亡证明">死亡证明</el-checkbox>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light">
                                <el-checkbox label="ATTACH_ID_INHERIT_CERT" name="继承公证书">继承公证书
                                </el-checkbox>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-checkbox label="ATTACH_ID_ORIG_CONT" name="原始购房合同">原始购房合同
                                </el-checkbox>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 10px">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-checkbox label="ATTACH_ID_ABAN_PURCH_CERT" name="放弃优先购买权证明">
                                    放弃优先购买权证明
                                </el-checkbox>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light">
                                <el-checkbox label="ATTACH_ID_DEED_TICKET" name="契税票">契税票</el-checkbox>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-checkbox label="ATTACH_ID_LEASE_PROT" name="租赁协议">租赁协议</el-checkbox>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 10px;margin-bottom: 25px">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-checkbox label="ATTACH_ID_LESSEE_ID" name="承租人身份证">承租人身份证
                                </el-checkbox>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-light">
                                <el-checkbox label="ATTACH_ID_END_PROOF" name="结案证明">结案证明</el-checkbox>
                            </div>
                        </el-col>
                    </el-row>
                </el-checkbox-group>
                <!--<div class="other-add-data">
                    <span class="other-data">其他信息</span>
                    <span class="san-jiao" @click="showOtherData()">﹀</span>
                </div>-->
            </div>
            <div class="sub-title">补全意见</div>
            <div style="padding:10px 22px">
                <textarea v-model="infoCpOption" name="" id=""
                          style="height: 138px;width: 742px;padding: 3px;"></textarea>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button :plain="true" type="warning" @click="dialogFullInfo = false;">取消</el-button>
                <el-button :plain="true" type="info" @click="dialogFullInfo = false;saveCompletionInfo()">确定</el-button>
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
        <div class="pass-out">
            <!--通过信息不全提示-->
            <el-dialog :modal="false" title="提示" :visible.sync="dialogVisiblePassOut" size="tiny"
                       :close-on-click-modal="false">
                <span>信息尚未补充完全，是否确认通过？</span>
                <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisiblePassOut = false">取 消</el-button>
                <el-button type="info" size="small" @click="dialogVisiblePassin">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisiblePassOut: false,
                opId: '',
                evaluation: "", //填表
                bdDetailData: "",
                firstSuggest: "",
                imgList: "",
                imgListBuliding: "",
                imgListCard: "",
                imgListOwner: "",
                imgListCollateral: "",
                imgListOthers: "",
                refuseReason: '',
                refuseDialog: false,
                dialogFullInfo: false,
                dialogFormVisibleEdit: false,
                dialogAppointVisible: false,
                openIsBJ: false,
                openIsCK: false,
                translateItem: "",
                infoCpOption: '',
                checkList: [],
                fcCheckList: [],
                checked: false,
                passBtnUrl: "",
                comeInU: false,
                tableData2: [],
                total: 0,
                opName: '',
                mobileNo: '',
                loginCode: '',
                imgListSecBusi: "",
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
                picNanNv: true,
                hkNanNv: true,
                zxNanNv: true,
                otherMoreData: false,
                activeIndex: 1
            }
        },
        props: ['orderHouseId', 'openFlag', 'businessStateCode'],
        methods: {
            /*showOtherData(){
             this.otherMoreData=this.otherMoreData?false:true;
             },*/
            queryCpInfoDetail() {
                var that = this
                that.checkList = [];
                that.infoCpOption = "";
                this.$http.get('visit/queryCpInfoDetail', {
                    params: {
                        'orderHouseId': this.orderHouseId,
                    }
                }).then(function (res) {
                    var checkedListStr = res.data.resultData.infoCpItem;
                    if (checkedListStr) {
                        var checkedListArr = checkedListStr.split(';')
                        for (var i = 0; i < checkedListArr.length; i++) {
                            that.checkList.push(checkedListArr[i]);
                        }
                        that.infoCpOption = "";
                        $(that.checkList).each(function (index) {
                            var key = that.checkList[index];
                            var name = $('input[value=' + key + ']').attr('name');
                            that.infoCpOption = that.infoCpOption + name + '，';
                        });
                        that.infoCpOption = that.infoCpOption.substr(0, 1) == "，" ? that.infoCpOption.slice(1) : that.infoCpOption;
                        that.infoCpOption = that.infoCpOption.substring(0, that.infoCpOption.length - 1);
                        that.infoCpOption = "补全" + that.infoCpOption + "信息！";
                    }
                });
            },
            saveCompletionInfo() {
                var that = this;
                this.$http.get('visit/saveCompletionInfo', {
                    params: {
                        'orderHouseId': that.orderHouseId,
                        'infoCpItems': that.checkList.join(';'),
                        'infoCpOption': that.infoCpOption,
                    }
                }).then(function (res) {
                    if (res.data.respCode == '000000') {
                        that.$message({
                            message: '保存成功',
                            type: 'success',
                            duration: "1500",
                        });
                        that.checkList = [];
                    } else {
                        that.$message({
                            message: "保存失败",
                            type: 'warning'
                        });
                    }
                });
                this.$http.get("order/queryOrderDetailByOrderHouseId", {
                    params: {
                        'orderHouseId': this.orderHouseId,
                        'flag': this.openFlag
                    }
                }).then(function (res) {
                    console.log(res);
                    that.bdDetailData = res.data.resultData;
                });
            },
            dialogOpen() {
                $('.el-dialog__wrapper').show().css({
                    'left': 'auto',
                    'right': '-1079px'
                }).animate({
                    right: '0'
                });
                $('.el-dialog__wrapper').css({
                    'display': 'none'
                });
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
                    onClose: function () {
                        that.refuseDialog = false;
                        that.dialogFormVisibleEdit = false;
                        that.$parent.dialogDestroy = false;
                        that.$parent.handlePageChange(1)
                    }
                });
            },
            handleRowHandle(v) {
                this.opId = v.opId
                this.opName = v.opName
                this.mobileNo = v.mobileNo
            },

//
            // 指派给风控经理
            saveAssignOp() {
                var that = this
                // 是否选择指派经理
                if (this.opId && this.opName && this.mobileNo) {
                    this.$http.get('visit/saveAssignOp', {
                        params: {
                            'orderHouseId': this.orderHouseId,
                            'opId': this.opId,
                            'opName': this.opName,
                            'currDealEmpPhonenum': this.mobileNo
                        }
                    }).then(function (res) {
                        that.$parent.dialogDestroy = false;
                        if (res.data.respCode == '000000') {
                            that.$message.success('指派成功')
                            that.dialogAppointVisible = false;
                            //更新列表
                            that.$parent.handlePageChange(1)
                        } else {
                            that.dialogAppointVisible = false;
                            that.$message.error('指派失败');
                        }
                    });
                } else {
                    that.$message.warning('请选择指派经理');
                }


            },
            getChecked(){
                //身份证(男) 身份证(女) 户口本(男) 户口本(女) 征信(男) 征信(女)
                var that = this, a = "";
                this.bdDetailData.infoCpOpinion = '';
                $(this.fcCheckList).each(function (index) {
                    var key = that.fcCheckList[index];
                    var name = $('input[value=' + key + ']').attr('name');
                    that.bdDetailData.infoCpOpinion = that.bdDetailData.infoCpOpinion + name + '，';
                });

                this.bdDetailData.infoCpOpinion = this.bdDetailData.infoCpOpinion.substr(0, 1) == "，" ? this.bdDetailData.infoCpOpinion.slice(1) : this.bdDetailData.infoCpOpinion;
                this.bdDetailData.infoCpOpinion = this.bdDetailData.infoCpOpinion.substring(0, this.bdDetailData.infoCpOpinion.length - 1);
                if (!this.bdDetailData.infoCpOpinion) {
                    this.bdDetailData.infoCpOpinion = "";
                    return;
                }
                this.bdDetailData.infoCpOpinion = "补全" + this.bdDetailData.infoCpOpinion + "信息！";
            },
            passBtn() {
                var that = this, passBtnParams = null;
                if (that.businessStateCode == "24") {
                    passBtnParams = {
                        visitCustFaOpinion: that.bdDetailData.visitCustFaOpinion,
                        orderHouseId: that.bdDetailData.orderHouseId,
                        infoCpItems: that.fcCheckList.join(';'),
                        infoCpOption: that.bdDetailData.infoCpOpinion
                    }
                    console.log(passBtnParams);
                } else if (that.businessStateCode == "25") {
                    passBtnParams = {
                        orderHouseId: that.bdDetailData.orderHouseId,
                    }
                } else {
                    if (!(that.bdDetailData.visitCustAppPersion && that.bdDetailData.visitCustAppPhonenum && that.bdDetailData.visitCustAppTime)) {
                        var str = "";
                        if (!that.bdDetailData.visitCustAppTime) {
                            str = str + "预约下户时间,"
                        }
                        if (!that.bdDetailData.visitCustAppPersion) {
                            str = str + "预约下户联系人,"
                        }
                        if (!that.bdDetailData.visitCustAppPhonenum) {
                            str = str + "预约下户联系方式,"
                        }
                        this.$message({
                            message: "请填写" + str,
                            type: 'warning',
                            duration: "1500",
                        });
                        return;
                    }
                    passBtnParams = {
                        visitCustAppTime: that.getForMatDate2(that.bdDetailData.visitCustAppTime),
                        visitCustAppEmpName: that.bdDetailData.visitCustAppPersion,
                        visitCustAppOpinion: that.bdDetailData.visitCustApprOpinion,
                        visitCustAppPhonenum: that.bdDetailData.visitCustAppPhonenum,
                        orderHouseId: that.bdDetailData.orderHouseId
                    }
                }
                that.$http.get("order/queryOrderDetailByOrderHouseId", {
                    params: {
                        'orderHouseId': this.orderHouseId,
                        'flag': this.openFlag
                    }
                }).then(function (res) {
                    that.bdDetailData = res.data.resultData;
                    if (that.bdDetailData.infoCpState == "1") {
                        that.dialogVisiblePassOut = true;
                        return;
                    } else {
                        that.$http.post(that.passBtnUrl,
                                passBtnParams
                        ).then(function (res) {
                            if (res.data.respCode == "000000") {
                                that.$message({
                                    message: '保存成功',
                                    type: 'success',
                                    duration: "1500",
                                    onClose: function () {
                                        that.closeDetailPage();
                                    }
                                });
                                that.$parent.dialogDestroy = false;
                                $(".content-bdlb").removeClass("face-trial");
                                that.$parent.handlePageChange(1);
                            } else {
                                that.$message.error("保存失败");
                            }
                        });
                    }
                });
            },
            closeAppoint() {
                var that = this;
                that.dialogAppointVisible = false;
                that.$parent.dialogDestroy = false;
            },
            // 指派接口调用
            handlePageChangeZp(val) {
                var that = this;
                var params = {
                    td: 'tableData2',
                    tt: 'total',
                    val: val,
                    ps: 5,
                    url: 'auth/querySysOpListByRoleId',
                }
                this.$http.get(params.url, {
                    params: {
                        'currentPage': params.val,
                        'pageSize': params.ps,
                        'opName': this.opName,
                        'loginCode': this.loginCode,
                    }
                }).then(function (res) {
                    var newData = res.data.resultData;
                    that[params.td] = newData;
                    that[params.tt] = res.data.resultInfo.totalCount;
                });
            },
            closeDetailPage() {
                var that = this;
                if (that.openFlag == "u") {
                    //解锁
                    this.$http.post("order/unlockOrder", {
                        orderHouseId: that.bdDetailData.orderHouseId
                    }).then(function (res) {

                    });
                }
                this.dialogFormVisibleEdit = false;
                $(".content-bdlb").removeClass("face-trial");
                this.$parent.dialogDestroy = false;
            },
            downLoadZip() {
                var url = this.$http.defaults.baseURL + "common/downLoadZip?orderHouseId=" + this.bdDetailData.orderHouseId;
                window.open(url);
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
            dialogVisiblePassin(){
                //调接口，通过信息不全提示
                var that = this;
                var passBtnParams = {
                    orderHouseId: that.bdDetailData.orderHouseId,
                }
                this.$http.post(that.passBtnUrl,
                        passBtnParams
                ).then(function (res) {
                    if (res.data.respCode == "000000") {
                        that.$message({
                            message: '保存成功',
                            type: 'success',
                            duration: "1500",
                            onClose: function () {
                                that.closeDetailPage();
                            }
                        });
                        that.$parent.dialogDestroy = false;
                        $(".content-bdlb").removeClass("face-trial");
                        that.$parent.handlePageChange(1);
                    } else {
                        that.$message.error("保存失败");
                    }
                });
                this.dialogVisiblePassOut = false;
            },
            getCheckedDialog(){
                var that = this;
                that.infoCpOption = "";
                $(this.checkList).each(function (index) {
                    var key = that.checkList[index];
                    var name = $('input[value=' + key + ']').attr('name');
                    that.infoCpOption = that.infoCpOption + name + '，';
                });
                this.infoCpOption = this.infoCpOption.substr(0, 1) == "，" ? this.infoCpOption.slice(1) : this.infoCpOption;
                this.infoCpOption = this.infoCpOption.substring(0, this.infoCpOption.length - 1);
                if (!this.infoCpOption) {
                    this.infoCpOption = "";
                    return;
                }
                this.infoCpOption = "补全" + this.infoCpOption + "信息！";
            },
        },
        mounted: function () {
            $(".content-bdlb").addClass("face-trial");
            if (this.openFlag == 'z') {
                this.dialogAppointVisible = true;
//                this.appoint();
                this.handlePageChangeZp(1);
                return
            }
            //报单信息
            var that = this;
            this.$http.get("order/queryOrderDetailByOrderHouseId", {
                params: {
                    'orderHouseId': this.orderHouseId,
                    'flag': this.openFlag
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
                    that.bdDetailData = res.data.resultData;
                    that.bdDetailData.firstAssTotalAmt = that.formatMoney(that.bdDetailData.firstAssTotalAmt, 2, "", ",");
                    that.bdDetailData.firstAssLoanAmt = that.formatMoney(that.bdDetailData.firstAssLoanAmt, 2, "", ",");
                    that.bdDetailData.firstAssInterAmt = that.formatMoney(that.bdDetailData.firstAssInterAmt, 2, "", ",");
                    that.bdDetailData.visitCustAppLoanAmt = that.formatMoney(that.bdDetailData.visitCustAppLoanAmt, 2, "", ",");
                    that.bdDetailData.visitCustAppFirstMortAmt = that.formatMoney(that.bdDetailData.visitCustAppFirstMortAmt, 2, "", ",");
                    that.bdDetailData.regTime = that.getForMatDate2(that.bdDetailData.regTime);
                    if (that.bdDetailData.visitCustAppMortgage == "一抵") {
                        that.bdDetailData.visitCustAppFirstMortAmt = "无"
                        that.bdDetailData.visitCustAppFirstMortNat = "无"
                    }
                    if (that.bdDetailData.businessState != '25') {
                        that.bdDetailData.infoCpOpinion = "";
                    }
                    that.$nextTick(function () {
                        var caiLiao25 = function () {
                            $(".line.jdyy").css("display", "none");
                            $(".face-trial-t .fc-must").removeClass("must-input");
                            that.passBtnUrl = "visit/saveVisitApprovalInfoDataConfirm";
                            that.comeInU = true;
                            $(".face-trial-t .is-edit,.face-trial-t .ft-time input").addClass("readonly").removeClass("edit").attr("disabled", "true");
                            $(".ft-time .el-input__icon,div.line.bq-sourse").css("display", "none");
                            $("div.line.bqyj").css("display", "none");
                            $("textarea").removeClass("readonly").attr("disabled", true);
                            $(".face-trial-btn").css("display", "flex");
                            $("div.line.yj,div.line.spyj").find("textarea").attr("disabled", true);
                            $(".face-trial-btn .download,.face-trial-btn .infor-all,.face-trial-t .is-show,div.line.yj,div.line.spyj,.face-trial-t").css("display", "block");
                            if (that.openFlag == "v") {
                                $('.must-input').removeClass('must-input')
                                $(".face-trial-btn").css("display", "none");
                            } else {
                                if (that.bdDetailData.infoCpState == "1") {
                                    $(".face-trial-btn .infor-all button").attr("disabled", true).addClass("disabled-btn");
                                } else {
                                    $(".face-trial-btn .infor-all button").removeAttr("disabled").removeClass("disabled-btn");
                                }
                                $(".face-trial-btn").css("display", "flex");
                            }
                        };
                        if (that.businessStateCode == "23"|| that.businessStateCode == "22") {//下户面审申请审批
                            $(".face-trial-t .fc-must").addClass("must-input");
                            $(".face-trial-t").css("display", "block");
                            $(".line.jdyy").css("display", "none");
                            that.passBtnUrl = "visit/saveVisitApplyApprovalInfo";
                            if (that.openFlag == "u") {
                                that.comeInU = true;
                                $(".face-trial-btn .download,.face-trial-btn .infor-all,.face-trial-t .is-show,div.line.yj,div.line.bqyj,div.line.bqyj2,div.line.bq-sourse").css("display", "none");
                                $(".face-trial-t .is-edit").addClass("edit").removeClass("readonly").attr("disabled", false);
                                $("textarea,.ft-time input").removeClass("readonly").removeAttr("disabled");
                                $("div.line.spyj,.face-trial-btn").css("display", "flex").removeAttr("disabled");
                                $(".ft-time .el-input__icon").css("display", "block");
                            }
                            if (that.openFlag == "v") {
                                $('.must-input').removeClass('must-input')
                                $(".face-trial-t .fc-must").removeClass("must-input");
                                that.comeInU = false;
                                $(".face-trial-t .is-edit").addClass("readonly").removeClass("edit");
                                $("textarea,.ft-time input").addClass("readonly").attr("disabled", true);
                                $("div.line.yj,div.line.spyj,div.line.bqyj,div.line.bqyj2,div.line.bq-sourse,.face-trial-btn,.ft-time .el-input__icon,.face-trial-t .is-show").css("display", "none");
                            }
                        }
                        if (that.businessStateCode == "24") {
                            $(".face-trial-t .fc-must").removeClass("must-input");
                            $(".face-trial-t").css("display", "block");
                            $(".line.jdyy").css("display", "none");
                            that.passBtnUrl = "visit/saveVisitApprovalInfo";
                            if (that.openFlag == "u") {
                                that.comeInU = true;
                                $(".face-trial-t .is-show,div.line.bqyj,div.line.bq-sourse,div.line.yj,div.line.spyj").css("display", "block");
                                $(".face-trial-btn").css("display", "flex");
                                $(".ft-time .el-input__icon,.face-trial-btn .download,.face-trial-btn .infor-all,div.line.bqyj2").css("display", "none");
                                $(".face-trial-t .is-edit,.face-trial-t .ft-time input").addClass("readonly").removeClass("edit").attr("disabled", "true");
                                $("textarea").removeClass("readonly");
                                $("div.line.spyj").find("textarea").attr("disabled", true);
                            }
                            if (that.openFlag == "v") {
                                $('.must-input').removeClass('must-input')
                                that.comeInU = false;
                                $(".face-trial-t .is-edit,textarea,.ft-time input").addClass("readonly").removeClass("edit").attr("disabled", "true");
                                $("div.line.yj,div.line.bqyj,div.line.bqyj2,div.line.bq-sourse,.face-trial-btn,.ft-time .el-input__icon").css("display", "none");
                                $("div.line.spyj").find("textarea").attr("disabled", true);
                                $(".face-trial-btn .download,.face-trial-btn .infor-all,.face-trial-t .is-show").css("display", "block");
                            }
                        }
                        if (that.businessStateCode == "25" || that.businessStateCode == "91") {
                            caiLiao25();
                        }
                        if (that.businessStateCode == "91") {
                            $(".line.jdyy").css("display", "block");
                        }
                        if (that.businessStateCode == "21") {
                            $(".line.jdyy").css("display", "none");
                            $(".face-trial-t .fc-must").removeClass("must-input");
                            if (that.openFlag == "v") {
                                $('.must-input').removeClass('must-input')
                                that.comeInU = false;
                                $(".face-trial-t .is-edit,textarea,.ft-time input").addClass("readonly").removeClass("edit").attr("disabled", "true");
                                $("div.line.yj,div.line.spyj,div.line.bqyj,div.line.bqyj2,div.line.bq-sourse,.face-trial-btn,.ft-time .el-input__icon,.face-trial-t").css("display", "none");
                                $(".face-trial-t .is-show").css("display", "block");
                            }
                        }
                        if (that.businessStateCode > 25 && that.businessStateCode != 91) {
                            that.activeIndex = res.data.resultData.stageCode - 1;
                            caiLiao25();
                        }
                        //展示图片，设置是否隐藏箭头  bdDetailData.attachIdOwne
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
                        }, 50);
                    });
                }
            }).catch(function (error) {
                that.$parent.dialogDestroy = false;
            });
            $("input").attr("placeholder", "");
        }
    }
</script>

<style>
    .stage-dialog-1 {
        height: 100%;
        width: 100%;
        position: absolute;
    }

    /*报单列表*/
    .content-bdlb .evaluation-one {
        height: 340px;
    }

    .content-bdlb .stage-dialog-2 {
        top: 0;
    }

    .content-bdlb .loan-user-edit {
        width: 100%;
        top: 0 !important;
        bottom: 0;
        right: 0;
        padding: 0;
        margin: 0;
        height: 100%;
        position: relative;
    }

    /*  .content-bdlb .stage-dialog-2 .loan-user-edit {
          !*height: auto;*!
          min-height: 100%;
      }

      .content-bdlb .stage-dialog-2 .loan-user-edit .face-trial-t {
          margin-bottom: 0;
      }

      .content-bdlb .stage-dialog-2 .button {
          padding-bottom: 40px;
      }

      .content-bdlb .stage-dialog-2 .evaluation-one {
          height: 170px;
      }

      .content-bdlb .stage-dialog-2 textarea {
          width: 674px;
      }*/
</style>