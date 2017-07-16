<template>
    <div class="stage-dialog-4">
        <!--公证申请查看-->
        <el-dialog top="0" :show-close="false" custom-class="custom-table" :close-on-click-modal="false"
                   @open='dialogOpen' :visible.sync="falseShowGzSqInfo">

            <div class="edit-main">
                <span class="close-btn" @click='closeEdit'></span>
                <div class="check-status-ul">
                    <el-steps :align-center="true" :space="110" :active='3' finish-status="success">
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

                <div class="title"><span class="icon"></span>公证</div>

                <div class="down-load" style="margin-top: 20px">
                    <div>批贷函：<span><a id="OrderPdf" href=""></a></span>（点击可下载）</div>
                </div>
                <!--拒单-->
                <div v-show="resultData.refuseReason" class="gz-line" style="margin: 34px 0 0 56px;color:#f31313">
                    <span class="gz-title">拒单原因</span><span class="refuseReason"><span
                        v-html="resultData.refuseReason" type="text"></span></span>
                </div>
            </div>

        </el-dialog>
        <!--公证申请审批查看-->
        <el-dialog top="0" :show-close="false" custom-class="custom-table" :close-on-click-modal="false"
                   @open='dialogOpen' :visible.sync="falseShowQzInfo1">
            <div class="edit-main">
                <span class="close-btn" @click='closeEdit'></span>
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
            <div class="bg view-input" style="height: 788px;">

                <div class="title"><span class="icon"></span>公证</div>


                <div v-show="roleId=='7'&&businessStateCode>'43'||roleId=='2'&&businessStateCode>'43'"
                     class="sub_title">
                    <span class="sub_line">公证审批信息</span>
                </div>
                <div class="down-load" style="margin: 20px 0 0 100px">
                    <div>批贷函：<span><a id="OrderPdf" href=""></a></span>（点击可下载）</div>
                </div>
                <div v-show="roleId=='8'">
                    <!--前期费用表格-->
                    <div style="margin: 24px 0 0 24px">
                        <table cellspacing="0" cellpadding="0" class="table" width="896">
                            <tr>
                                <td width="91px">姓名</td>
                                <td width="159px" colspan="2"><input class="insert-info" type="text" readonly
                                                                     v-model="resultData.propFeeName"></td>
                                <td width="91px" class="special">贷款金额</td>
                                <td width="183px" colspan="2"><input class="insert-info" type="text" readonly
                                                                     v-model="resultData.propFeeLoanAmt">
                                </td>
                                <td class="special">抵押类型</td>
                                <td><input class="insert-info" type="text" readonly
                                           v-model="resultData.propFeeMortType">
                                </td>
                                <td class="special">期数</td>
                                <td><input class="insert-info" type="text" readonly v-model="resultData.propFeeTermNum">
                                </td>
                            </tr>
                            <tr>
                                <td width="91px">抵押数</td>
                                <td width="159px" colspan="2"><input class="insert-info" type="text" readonly
                                                                     v-model="resultData.propFeeMortNum">　
                                </td>
                                <td width="91px" class="special">终端点位</td>
                                <td width="" colspan="2"><input class="insert-info" type="text" readonly
                                                                v-model="resultData.nataAppTermPoint"></td>
                                <td width="" class="special">业务员姓名</td>
                                <td width="" colspan="3"><input class="insert-info" type="text" readonly
                                                                v-model="resultData.propFeeBusiName"></td>
                            </tr>
                            <tr>
                                <td width="91px">服务费率</td>
                                <td width="67px"><input class="insert-info" type="text" readonly
                                                        v-model="resultData.propFeeServRate"></td>
                                <td width="91px" class="special">渠道服务费率</td>
                                <td width=" "><input class="insert-info" type="text" readonly
                                                     v-model="resultData.propFeeChnServRate">
                                </td>
                                <td width="91px" class="special"> 服务费</td>
                                <td width=" "><input class="insert-info" type="text" readonly
                                                     v-model="resultData.propFeeServAmt">
                                </td>
                                <td width=" " class="special"> 渠道服务费　</td>
                                <td width=" "><input class="insert-info" type="text" readonly
                                                     v-model="resultData.propFeeChnServAmt">
                                </td>
                                <td width="91px" class="special"> 前期合计　</td>
                                <td width=" "><input class="insert-info" type="text" readonly
                                                     v-model="resultData.propFeeSum"></td>
                            </tr>

                            <tr>
                                <td width="91px">月息率</td>
                                <td width="67px"><input class="insert-info" type="text" readonly
                                                        v-model="resultData.propFeeMonInterRate"></td>
                                <td width="91px" class="special"> 渠道月息率　</td>
                                <td width=" "><input class="insert-info" type="text" readonly
                                                     v-model="resultData.propFeeChnMonInterRate"></td>
                                <td width="91px" class="special"> 月息　</td>
                                <td width=" "><input class="insert-info" type="text" readonly
                                                     v-model="resultData.propFeeMonInter">
                                </td>
                                <td class="special"> 渠道月息　</td>
                                <td width="91px"><input class="insert-info" type="text" readonly
                                                        v-model="resultData.propFeeChnMonInter"></td>
                                <td class="special"> 月息合计　</td>
                                <td><input class="insert-info" type="text" readonly
                                           v-model="resultData.propFeeSumMonInter"></td>
                            </tr>

                            <tr>
                                <td width="91px">综合服务费率</td>
                                <td width="67px"><input class="insert-info" type="text" readonly
                                                        v-model="resultData.propFeeComServRate1"></td>
                                <td width="91px"><input class="insert-info" type="text" readonly
                                                        v-model="resultData.propFeeComServRate2"></td>
                                <td width="91px"><input class="insert-info" type="text" readonly
                                                        v-model="resultData.propFeeComServRate3"></td>
                                <td width="91px" class="special"> 公证费　</td>
                                <td width="91px"><input class="insert-info" type="text" readonly
                                                        v-model="resultData.propFeeNataFee">
                                </td>
                                <td width="91px" class="special"> 前期费用　</td>
                                <td width="91px" colspan="3"><input class="insert-info" type="text" readonly
                                                                    v-model="resultData.propFeeCost"></td>
                            </tr>

                        </table>
                    </div>
                    <!--前期费用图片-->
                    <div class="fk-line" v-if=""
                         style="margin-top: 12px;padding: 30px 20px;width: 896px;margin: 0 auto;">
                        <span style="float: left;width: 100px;">前期费用图片</span>
                        <div class="my-slider img-list-PropFee">
                            <el-carousel height="80px" :autoplay="false" arrow="always">
                                <el-carousel-item v-for="item in imgListPropFee" :key="item">
                                    <div style="margin-left: 65px">
                                        <div v-for="a in item" class="area" @click="showBigImg(a)"
                                             style="margin-right: 5px;">
                                            <img :src="a" alt="" style="width: 100%;height: 100%;">
                                        </div>
                                    </div>

                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <!--前期费用表-->
                    <div style="padding: 0 61px;margin:24px 0 24px 24px">
                        <div class="arrow-up"></div>
                        <div class="previes-table">前期费用表</div>
                        <div style="margin-top: 16px">
                            <el-table :data="tableAfterData" border>
                                <el-table-column prop="date" label="项目" width="180">
                                </el-table-column>
                                <el-table-column prop="name" label="金额" width="180">
                                </el-table-column>
                                <el-table-column prop="address" label="明细">
                                </el-table-column>
                            </el-table>
                        </div>

                    </div>
                </div>
                <div v-show="roleId!='8'" style="width: 896px;margin: 0 auto;height: auto;">
                    <div class="gz-line" style="margin-top: 24px;">
                        <span class="gz-title">预约公证时间</span><span><el-date-picker
                            v-model="value1"
                            type="datetime"
                            readonly
                            placeholder="选择日期时间">
    </el-date-picker></span>
                        <span style="margin-left: 48px" class="gz-title">公证联系人</span><span class="edit"><el-input
                            v-model="resultData.nataAppPersion" type="text"></el-input></span>
                    </div>
                    <div class="gz-line" style="margin-top: 24px;">
                        <span class="gz-title">联系人手机号</span><span class="edit"><el-input
                            v-model="resultData.nataAppPhonenum" type="text"></el-input></span>
                    </div>
                    <div class="gz-line" style="margin-top: 24px;">
                        <span class="gz-title">公证地点</span><span class="edit gz-address"><el-input style="width: 250px"
                                                                                                  v-model="resultData.nataAppApprAddr"
                                                                                                  type="text"></el-input></span>
                    </div>
                    <div class="gz-line" style="margin-top: 24px;">
                        <span class="gz-title">办事员姓名</span><span class="edit"><el-input
                            v-model="resultData.nataAppApprName" type="text"></el-input></span>
                        <span class="gz-title">办事员联系方式</span><span class="edit"><el-input
                            v-model="resultData.nataAppApprPhonenum" type="text"></el-input></span>
                    </div>
                    <div class="gz-line clearfix" style="margin-top: 24px;">
                        <span class="gz-title textarea">公证所需材料</span>
                        <span class="textarea">
                            <el-input
                                    style="width: 650px;margin-left: 8px"
                                    :autosize="{ minRows: 5, maxRows: 5}"
                                    type="textarea"
                                    readonly
                                    placeholder=""
                                    v-model="resultData.nataAppApprMaterial">
                            </el-input>
                        </span>
                    </div>

                    <!--公证申请审批意见-->
                    <div id="gzspyj" class="gz-line clearfix" style="margin-top:24px;display: none">
                        <span class="gz-title textarea">公证申请审批意见</span>
                        <span class="textarea">
                            <el-input
                                    style="width: 650px;margin-left: 8px"
                                    type="textarea"
                                    readonly
                                    placeholder="请输入内容"
                                    v-model="resultData.nataAppApprOpinion">
                            </el-input>
                        </span>
                    </div>
                    <!--公正意见-->
                    <div id="gzyj" class="gz-line clearfix" style="margin-top:24px;display: block">
                        <span class="gz-title textarea">公正意见</span>
                        <span class="textarea">
                            <el-input
                                    style="width: 650px;margin-left: 8px"
                                    type="textarea"
                                    readonly
                                    placeholder="请输入内容"
                                    v-model="resultData.nataApprOpinion">
                            </el-input>
                        </span>
                    </div>
                    <div v-show="roleId=='7'&&businessStateCode>'43'&&nataAppIsMortAppShow==1||roleId=='2'&&businessStateCode>'43'&&nataAppIsMortAppShow==1"
                         class="sub_title" style="margin-top: 30px">
                        <span class="sub_line">抵押申请审批信息</span>
                    </div>
                    <!--是否有抵押-->
                    <div v-show="nataAppIsMortAppShow==1" class="nataAppIsMortApp">
                        <!--抵押申请展示表单-->
                        <div class="gz-line clearfix" style="margin-top:24px;">
                            <span class="gz-title">预约抵押时间</span><span><el-date-picker
                                v-model="value2"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker></span>
                            <span style="margin-left: 46px" class="gz-title">预约抵押联系人</span><span
                                class="edit"><el-input
                                v-model="resultData.mortAppPersion" type="text"></el-input></span>
                        </div>
                        <div class="gz-line" style="margin-top: 24px;">
                            <el-form :model="resultData" label-width="147px">
                                <el-form-item label="是否客户本人抵押">
                                    <el-select style="margin-left: -4px" v-model="resultData.mortAppIsSameone"
                                               class="mortAppIsSameone"
                                               placeholder="请选择">
                                        <el-option
                                                v-for="item in mortAppIsSameones"
                                                :key="item"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="gz-line" style="margin-top: 24px;">
                            <span class="gz-title">抵押联系方式</span><span class="edit"><el-input
                                v-model="resultData.mortAppPhonenum" type="text"></el-input></span>
                            <span style="margin-left: 38px" class="gz-title">房本携带人</span><span class="edit"><el-input
                                v-model="resultData.mortAppHouCarryPer" type="text"></el-input></span>
                        </div>
                        <div class="gz-line" style="margin-top: 24px;">
                            <span class="gz-title">预约放款时间</span><span><el-date-picker
                                v-model="value3"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker></span>
                            <span style="margin-left: 46px" class="gz-title">抵押排队人</span><span class="edit"><el-input
                                v-model="resultData.mortAppQueuePer" type="text"></el-input></span>
                        </div>
                        <!--抵押所需携带材料-->
                        <div class="gz-line clearfix" style="margin-top: 24px;">
                            <span class="gz-title textarea">抵押所需携带材料</span>
                            <span class="textarea">
                            <el-input style="width: 650px;margin-left: 8px"
                                      :autosize="{ minRows: 5, maxRows: 5}"
                                      type="textarea"
                                      v-model="textareaText1">
                            </el-input>
                            </span>
                        </div>
                        <div class="gz-line clearfix" style="margin: 32px 0">
                            <span class="gz-title textarea">抵押申请审批意见</span>
                            <span class="textarea">
                            <el-input style="width: 650px;margin-left: 8px"
                                      type="textarea"
                                      placeholder="请输入内容"
                                      v-model="resultData.mortAppApprOpinion">
                            </el-input>
                            </span>
                        </div>
                    </div>

                    <div v-show="roleId=='7'&&businessStateCode>'43'||roleId=='2'&&businessStateCode>'43'"
                         class="sub_title" style="margin-top: 30px">
                        <span class="sub_line">前期费用</span>
                    </div>
                    <!--已完成阶段环节展示前期费用表在下-->
                    <div class="hideSomeModelBottom">
                        <!--前期费用表格-->
                        <div style="margin: 24px 0 0 21px">
                            <table cellspacing="0" cellpadding="0" class="table" width="876">
                                <tr>
                                    <td width="91px">姓名</td>
                                    <td width="159px" colspan="2"><input class="insert-info" type="text" readonly
                                                                         v-model="resultData.propFeeName"></td>
                                    <td width="91px" class="special">贷款金额</td>
                                    <td width="183px" colspan="2"><input class="insert-info" type="text" readonly
                                                                         v-model="resultData.propFeeLoanAmt">
                                    </td>
                                    <td class="special">抵押类型</td>
                                    <td><input class="insert-info" type="text" readonly
                                               v-model="resultData.propFeeMortType">
                                    </td>
                                    <td class="special">期数</td>
                                    <td><input class="insert-info" type="text" readonly
                                               v-model="resultData.propFeeTermNum">
                                    </td>
                                </tr>
                                <tr>
                                    <td width="91px">抵押数</td>
                                    <td width="159px" colspan="2"><input class="insert-info" type="text" readonly
                                                                         v-model="resultData.propFeeMortNum">　
                                    </td>
                                    <td width="91px" class="special">终端点位</td>
                                    <td width="" colspan="2"><input class="insert-info" type="text" readonly
                                                                    v-model="resultData.nataAppTermPoint"></td>
                                    <td width="" class="special">业务员姓名</td>
                                    <td width="" colspan="3"><input class="insert-info" type="text" readonly
                                                                    v-model="resultData.propFeeBusiName"></td>
                                </tr>
                                <tr>
                                    <td width="91px">服务费率</td>
                                    <td width="67px"><input class="insert-info" type="text" readonly
                                                            v-model="resultData.propFeeServRate"></td>
                                    <td width="91px" class="special">渠道服务费率</td>
                                    <td width=" "><input class="insert-info" type="text" readonly
                                                         v-model="resultData.propFeeChnServRate">
                                    </td>
                                    <td width="91px" class="special"> 服务费</td>
                                    <td width=" "><input class="insert-info" type="text" readonly
                                                         v-model="resultData.propFeeServAmt">
                                    </td>
                                    <td width=" " class="special"> 渠道服务费　</td>
                                    <td width=" "><input class="insert-info" type="text" readonly
                                                         v-model="resultData.propFeeChnServAmt">
                                    </td>
                                    <td width="91px" class="special"> 前期合计　</td>
                                    <td width=" "><input class="insert-info" type="text" readonly
                                                         v-model="resultData.propFeeSum"></td>
                                </tr>

                                <tr>
                                    <td width="91px">月息率</td>
                                    <td width="67px"><input class="insert-info" type="text" readonly
                                                            v-model="resultData.propFeeMonInterRate"></td>
                                    <td width="91px" class="special"> 渠道月息率　</td>
                                    <td width=" "><input class="insert-info" type="text" readonly
                                                         v-model="resultData.propFeeChnMonInterRate"></td>
                                    <td width="91px" class="special"> 月息　</td>
                                    <td width=" "><input class="insert-info" type="text" readonly
                                                         v-model="resultData.propFeeMonInter">
                                    </td>
                                    <td class="special"> 渠道月息　</td>
                                    <td width="91px"><input class="insert-info" type="text" readonly
                                                            v-model="resultData.propFeeChnMonInter"></td>
                                    <td class="special"> 月息合计　</td>
                                    <td><input class="insert-info" type="text" readonly
                                               v-model="resultData.propFeeSumMonInter"></td>
                                </tr>

                                <tr>
                                    <td width="91px">综合服务费率</td>
                                    <td width="67px"><input class="insert-info" type="text" readonly
                                                            v-model="resultData.propFeeComServRate1"></td>
                                    <td width="91px"><input class="insert-info" type="text" readonly
                                                            v-model="resultData.propFeeComServRate2"></td>
                                    <td width="91px"><input class="insert-info" type="text" readonly
                                                            v-model="resultData.propFeeComServRate3"></td>
                                    <td width="91px" class="special"> 公证费　</td>
                                    <td width="91px"><input class="insert-info" type="text" readonly
                                                            v-model="resultData.propFeeNataFee">
                                    </td>
                                    <td width="91px" class="special"> 前期费用　</td>
                                    <td width="91px" colspan="3"><input class="insert-info" type="text" readonly
                                                                        v-model="resultData.propFeeCost"></td>
                                </tr>

                            </table>
                        </div>
                        <!--前期费用图片-->
                        <div class="fk-line" v-if=""
                             style="margin-top: 12px;padding: 30px 20px;width: 896px;margin: 0 auto;">
                            <span style="float: left;width: 100px;">前期费用图片</span>
                            <div class="my-slider img-list-PropFee">
                                <el-carousel height="80px" :autoplay="false" arrow="always">
                                    <el-carousel-item v-for="item in imgListPropFee" :key="item">
                                        <div style="margin-left: 65px">
                                            <div v-for="a in item" class="area" @click="showBigImg(a)"
                                                 style="margin-right: 5px;">
                                                <img :src="a" alt="" style="width: 100%;height: 100%;">
                                            </div>
                                        </div>

                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                        <!--前期费用表-->
                        <div style="margin:24px 0 34px 24px">
                            <div class="arrow-up"></div>
                            <div class="previes-table">前期费用表</div>
                            <div style="margin-top: 16px">
                                <el-table :data="tableAfterData" border>
                                    <el-table-column prop="date" label="项目" width="180">
                                    </el-table-column>
                                    <el-table-column prop="name" label="金额" width="180">
                                    </el-table-column>
                                    <el-table-column prop="address" label="明细">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>


                    <!--拒单-->
                    <div v-show="resultData.refuseReason" class="gz-line" style="margin-top: 200px;color:#f31313">
                        <span class="gz-title">拒单原因</span><span class="refuseReason"><span
                            v-html="resultData.refuseReason" type="text"></span></span>
                    </div>
                </div>
            </div>


        </el-dialog>
        <!--公证申请审批编辑-->
        <el-dialog top="0" :show-close="false" custom-class="custom-table" :close-on-click-modal="false"
                   @open='dialogOpen' :visible.sync="dialogFormVisibleQzEdit">

            <div class="edit-main">
                <span class="close-btn" @click='closeEdit'></span>
                <div class="check-status-ul">
                    <el-steps :align-center="true" :space="110" :active='3' finish-status="success">
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


            <div class="bg clearfix" style="">

                <div class="title"><span class="icon"></span>公证</div>

                <div class="down-load" style="margin: 20px 0 0 100px">
                    <div>批贷函：<span><a id="OrderPdf" href=""></a></span>（点击可下载）</div>
                </div>
                <div style="width: 896px;margin: 0 auto;height: auto;">
                    <div class="gz-line" style="margin-top: 24px;">
                        <span class="gz-title must-input">预约公证时间</span><span><el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
                     </el-date-picker></span>
                        <span style="margin-left: 46px" class="gz-title must-input">公证联系人</span><span class="edit"><el-input
                            v-model="resultData.nataAppPersion" type="text"></el-input></span>
                    </div>
                    <div class="gz-line" style="margin-top: 24px;">
                        <span class="gz-title must-input">联系人手机号</span><span class="edit"><el-input
                            v-model="resultData.nataAppPhonenum" type="text"></el-input></span>
                    </div>
                    <div class="gz-line" style="margin-top: 24px;">
                        <el-form :model="resultData" label-width="91px">
                            <el-form-item class="must-input1" label="公证地点">
                                <el-select style="margin-left: 52px" v-model="resultData.nataAppApprAddr"
                                           class="nataAppApprAddr"
                                           placeholder="请选择公证地点">
                                    <el-option
                                            v-for="item in apprAddroptions"
                                            :key="item.id"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="gz-line " style="margin-top: 24px;">
                        <span class="gz-title must-input">办事员姓名</span><span class="edit"><el-input
                            v-model="resultData.nataAppApprName" type="text"></el-input></span>
                        <span style="margin-left: 41px" class="gz-title must-input">办事员联系方式</span><span class="edit"><el-input
                            v-model="resultData.nataAppApprPhonenum" type="text"></el-input></span>
                    </div>
                    <div class="gz-line clearfix" style="margin-top: 24px;">
                        <span class="gz-title must-input textarea">公证所需材料</span>
                        <span class="textarea">
                            <el-input
                                    style="width: 650px;margin-left: 8px"
                                    :autosize="{ minRows: 5, maxRows: 5}"
                                    type="textarea"
                                    v-model="textareaText">
                            </el-input>
                        </span>
                    </div>
                    <!--公正意见-->
                    <div class="gz-line clearfix" style="margin-top:24px;">
                        <span class="gz-title textarea">公证申请审批意见</span>
                        <span class="textarea">
                            <el-input
                                    style="width: 650px;margin-left: 8px"
                                    type="textarea"
                                    placeholder="请输入内容"
                                    v-model="resultData.nataAppApprOpinion">
                            </el-input>
                        </span>
                    </div>

                    <div class="nataAppIsMortApp" style="display: none;">
                        <!--抵押申请展示表单-->
                        <div class="gz-line clearfix" style="margin-top:24px;">
                            <span class="gz-title must-input">预约抵押时间</span><span><el-date-picker
                                v-model="value2"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker></span>
                            <span style="margin-left: 46px" class="gz-title must-input">预约抵押联系人</span><span
                                class="edit"><el-input
                                v-model="resultData.mortAppPersion" type="text"></el-input></span>
                        </div>
                        <div class="gz-line" style="margin-top: 24px;">
                            <el-form :model="resultData" label-width="147px">
                                <el-form-item class="must-input1" label="是否客户本人抵押">
                                    <el-select style="margin-left: -4px" v-model="resultData.mortAppIsSameone"
                                               class="mortAppIsSameone"
                                               placeholder="请选择">
                                        <el-option
                                                v-for="item in mortAppIsSameones"
                                                :key="item"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="gz-line" style="margin-top: 24px;">
                            <span class="gz-title must-input">抵押联系方式</span><span class="edit"><el-input
                                v-model="resultData.mortAppPhonenum" type="text"></el-input></span>
                            <span style="margin-left: 38px" class="gz-title must-input">房本携带人</span><span class="edit"><el-input
                                v-model="resultData.mortAppHouCarryPer" type="text"></el-input></span>
                        </div>
                        <div class="gz-line" style="margin-top: 24px;">
                            <span class="gz-title must-input">预约放款时间</span><span><el-date-picker
                                v-model="value3"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker></span>
                            <span style="margin-left: 46px" class="gz-title must-input">抵押排队人</span><span class="edit"><el-input
                                v-model="resultData.mortAppQueuePer" type="text"></el-input></span>
                        </div>
                        <!--抵押所需携带材料-->
                        <div class="gz-line clearfix" style="margin-top: 24px;">
                            <span class="gz-title textarea">抵押所需携带材料</span>
                            <span class="textarea">
                            <el-input style="width: 650px;margin-left: 8px"
                                      :autosize="{ minRows: 5, maxRows: 5}"
                                      type="textarea"
                                      v-model="textareaText1">
                            </el-input>
                            </span>
                        </div>
                        <div class="gz-line clearfix" style="margin-top: 32px;">
                            <span class="gz-title textarea">抵押申请审批意见</span>
                            <span class="textarea">
                            <el-input style="width: 650px;margin-left: 8px"
                                      type="textarea"
                                      placeholder="请输入内容"
                                      v-model="resultData.mortAppApprOpinion">
                            </el-input>
                            </span>
                        </div>
                    </div>
                </div>

            </div>


            <el-row v-show="nataAppIsMortAppShow==2" style="margin:30px 0;text-align: center">
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <el-button style="margin: 0 80px;width:94px" type="info" :plain="true"
                                   @click="handPass('gzsp')">通过
                        </el-button>
                        <el-button style="width:94px" :plain="true" type="warning"
                                   @click="refuseDialog=true">拒单
                        </el-button>
                    </div>
                </el-col>
            </el-row>
            <!--有抵押-->
            <el-row v-show="nataAppIsMortAppShow==1" style="margin:30px 0;text-align: center">
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <el-button style="margin: 0 80px;width:94px" type="info" :plain="true"
                                   @click="handNataAppIsMortAppPass()">通过
                        </el-button>
                        <el-button style="width:94px" :plain="true" type="warning"
                                   @click="refuseDialog=true">拒单
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </el-dialog>
        <!--公证编辑-->
        <el-dialog top="0" :show-close="false" custom-class="custom-table" :close-on-click-modal="false"
                   @open='dialogOpen' :visible.sync="dialogFormVisibleQzEditGz">

            <div class="edit-main">
                <span class="close-btn" @click='closeEdit'></span>
                <div class="check-status-ul">
                    <el-steps :align-center="true" :space="110" :active='3' finish-status="success">
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

            <div class="bg view-input" style="height: 788px;">

                <div class="title"><span class="icon"></span>公证</div>

                <div class="down-load" style="margin: 20px 0 0 100px">
                    <div>批贷函：<span><a id="OrderPdf" href=""></a></span>（点击可下载）</div>
                </div>


                <!--前期费用表格-->
                <div style="margin: 24px 0 0 24px">
                    <table cellspacing="0" border="0" cellpadding="0" class="table" width="896">
                        <tr>
                            <td width="91px">姓名</td>
                            <td width="159px" colspan="2"><input class="insert-info"
                                                                 type="text" readonly
                                                                 v-model="resultData.custName"></td>
                            <td width="91px" class="special">贷款金额</td>
                            <td width="183px" colspan="2"><input class="insert-info" type="text" v-on:input="inputFunc"
                                                                 v-model="resultData.propFeeLoanAmt">
                            </td>
                            <td class="special">抵押类型</td>
                            <td><input class="insert-info" type="text" readonly
                                       v-model="resultData.propFeeMortType">
                            </td>
                            <td class="special">期数</td>
                            <td><input class="insert-info" type="text" v-model="resultData.propFeeTermNum">
                            </td>
                        </tr>
                        <tr>
                            <td width="91px">抵押数</td>
                            <td width="159px" colspan="2"><input class="insert-info" type="text" v-on:input="inputFunc"
                                                                 v-model="resultData.propFeeMortNum">　
                            </td>
                            <td width="91px" class="special">终端点位</td>
                            <td width="" colspan="2"><input class="insert-info" type="text" readonly
                                                            v-model="resultData.nataAppTermPoint"></td>
                            <td width="" class="special">业务姓名</td>
                            <td width="" colspan="3"><input class="insert-info" type="text" readonly
                                                            v-model="resultData.propFeeBusiName"></td>
                        </tr>
                        <tr>
                            <td width="91px">服务费率</td>
                            <td width="67px"><input class="insert-info" type="text" v-on:input="inputFunc"
                                                    v-model="resultData.propFeeServRate"></td>
                            <td width="91px" class="special">渠道服务费率</td>
                            <td width=" "><input class="insert-info" type="text" v-on:input="inputFunc"
                                                 v-model="resultData.propFeeChnServRate">
                            </td>
                            <td width="91px" class="special"> 服务费</td>
                            <td width=" "><input class="insert-info" type="text" v-model="resultData.propFeeServAmt">
                            </td>
                            <td width=" " class="special"> 渠道服务费　</td>
                            <td width=" "><input class="insert-info" type="text" v-model="resultData.propFeeChnServAmt">
                            </td>
                            <td width="91px" class="special"> 前期合计　</td>
                            <td width=" "><input class="insert-info" type="text" v-on:input="inputFunc"
                                                 v-model="resultData.propFeeSum"></td>
                        </tr>

                        <tr>
                            <td width="91px">月息率</td>
                            <td width="67px"><input class="insert-info" type="text" v-on:input="inputFunc"
                                                    v-model="resultData.propFeeMonInterRate"></td>
                            <td width="91px" class="special"> 渠道月息率　</td>
                            <td width=" "><input class="insert-info" type="text" v-on:input="inputFunc"
                                                 v-model="resultData.propFeeChnMonInterRate"></td>
                            <td width="91px" class="special"> 月息　</td>
                            <td width=" "><input class="insert-info" type="text" v-model="resultData.propFeeMonInter">
                            </td>
                            <td class="special"> 渠道月息　</td>
                            <td width="91px"><input class="insert-info" type="text"
                                                    v-model="resultData.propFeeChnMonInter"></td>
                            <td class="special"> 月息合计　</td>
                            <td><input class="insert-info" type="text" v-model="resultData.propFeeSumMonInter"></td>
                        </tr>

                        <tr>
                            <td width="91px">综合服务费率</td>
                            <td width="67px"><input class="insert-info" type="text"
                                                    v-model="resultData.propFeeComServRate1"></td>
                            <td width="91px"><input class="insert-info" type="text"
                                                    v-model="resultData.propFeeComServRate2"></td>
                            <td width="91px"><input class="insert-info" type="text"
                                                    v-model="resultData.propFeeComServRate3"></td>
                            <td width="91px" class="special"> 公证费　</td>
                            <td width="91px"><input class="insert-info" type="text" v-model="resultData.propFeeNataFee">
                            </td>
                            <td width="91px" class="special"> 前期费用　</td>
                            <td width="91px" colspan="3"><input class="insert-info" type="text"
                                                                v-model="resultData.propFeeCost"></td>
                        </tr>

                    </table>
                </div>
                <div class="fk-line" v-if="" style="margin-top: 12px;padding: 30px 20px;width: 896px;margin: 0 auto;">
                    <span style="float: left;width: 100px;">前期费用图片</span>
                    <div class="my-slider img-list-PropFee">
                        <el-carousel height="80px" :autoplay="false" arrow="always">
                            <el-carousel-item v-for="item in imgListPropFee" :key="item">
                                <div style="margin-left: 65px">
                                    <div v-for="a in item" class="area" @click="showBigImg(a)"
                                         style="margin-right: 5px;">
                                        <img :src="a" alt="" style="width: 100%;height: 100%;">
                                    </div>
                                </div>

                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
                <!--前期费用表-->
                <div style="padding: 0 62px;margin:24px 0 0 24px">
                    <div class="arrow-up"></div>
                    <div class="previes-table">前期费用表</div>
                    <div style="margin-top: 16px">
                        <el-table :data="tableAfterData" border>
                            <el-table-column prop="date" label="项目" width="180">
                            </el-table-column>
                            <el-table-column prop="name" label="金额" width="180">
                            </el-table-column>
                            <el-table-column prop="address" label="明细">
                            </el-table-column>
                        </el-table>
                    </div>

                </div>

                <div style="width: 896px;margin: 0 auto;height: auto;">
                    <div class="gz-line" style="margin-top: 24px;">
                        <span class="gz-title">预约公证时间</span><span> <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
    </el-date-picker></span>
                        <span style="margin-left: 46px" class="gz-title">公证联系人</span><span class="edit"><el-input
                            v-model="resultData.nataAppPersion" type="text"></el-input></span>
                    </div>
                    <div class="gz-line" style="margin-top: 24px;">
                        <span class="gz-title">联系人手机号</span><span class="edit"><el-input
                            v-model="resultData.nataAppPhonenum" type="text"></el-input></span>
                    </div>
                    <div class="gz-line" style="margin-top: 24px;">
                        <span class="gz-title">公证地点</span><span class="edit gz-address"><el-input
                            v-model="resultData.nataAppApprAddr" type="text"></el-input></span>
                    </div>
                    <div class="gz-line" style="margin-top: 24px;">
                        <span class="gz-title">办事员姓名</span><span class="edit"><el-input
                            v-model="resultData.nataAppApprName" type="text"></el-input></span>
                        <span class="gz-title">办事员联系方式</span><span class="edit"><el-input
                            v-model="resultData.nataAppApprPhonenum" type="text"></el-input></span>
                    </div>
                    <div class="gz-line clearfix" style="margin-top: 24px;">
                        <span class="gz-title textarea">公证所需材料</span>
                        <span class="textarea">
                            <el-input
                                    style="width: 650px;margin-left: 8px"
                                    type="textarea"
                                    readonly
                                    :autosize="{ minRows: 5, maxRows: 5}"
                                    v-model="resultData.nataAppApprMaterial">
                            </el-input>
                        </span>
                    </div>

                    <!--公正意见-->
                    <div class="gz-line clearfix" style="margin-top:24px;">
                        <span class="gz-title textarea">公证意见</span>
                        <span class="textarea">
                            <el-input
                                    style="width: 650px;margin-left: 8px"
                                    type="textarea"
                                    placeholder="请输入内容"
                                    v-model="resultData.nataApprOpinion">
                            </el-input>
                        </span>
                    </div>
                </div>
                <el-row style="margin-top: 24px;text-align: center">
                    <el-col :span="24">
                        <div class="grid-content bg-purple-dark">
                            <el-button style="margin: 0px 80px;width:94px" type="info" :plain="true"
                                       @click="handPass('gz')">通过
                            </el-button>
                            <el-button style="width:94px" :plain="true" type="warning"
                                       @click="refuseDialog=true">拒单
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>

        </el-dialog>
        <!--财务编辑-->
        <el-dialog top="0" :show-close="false" custom-class="custom-table" :close-on-click-modal="false"
                   @open='dialogOpen' :visible.sync="dialogFormVisibleCwEdit">

            <div class="edit-main">
                <span class="close-btn" @click='closeEdit'></span>
                <div class="check-status-ul">
                    <el-steps :align-center="true" :space="110" :active='3' finish-status="success">
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

                <div class="title"><span class="icon"></span>前期费用</div>

                <div class="down-load" style="margin-top: 20px">
                    <div>批贷函：<span><a id="OrderPdf" href=""></a></span>（点击可下载）</div>
                </div>
                <div style="margin-top: 24px">
                    <table cellspacing="0" border="0" cellpadding="0" class="table" width="896">
                        <tr>
                            <td width="91px">姓名</td>
                            <td width="159px" colspan="2"><input style="background: #f8f8f8;" class="insert-info"
                                                                 type="text" readonly
                                                                 v-model="resultData.custName"></td>
                            <td width="91px" class="special">贷款金额</td>
                            <td width="183px" colspan="2"><input class="insert-info" type="text" v-on:input="inputFunc"
                                                                 v-model="formatMoneyValue">
                            </td>
                            <td class="special">抵押类型</td>
                            <td><input class="insert-info" type="text" readonly style="background: #f8f8f8;"
                                       v-model="resultData.visitCustAppMortgage">
                            </td>
                            <td class="special">期数</td>
                            <td><input class="insert-info" type="text" v-model="resultData.apprLoanTerm">
                            </td>
                        </tr>
                        <tr>
                            <td width="91px">抵押数</td>
                            <td width="159px" colspan="2"><input class="insert-info" type="text" v-on:input="inputFunc"
                                                                 v-model="resultData.propFeeMortNum">　
                            </td>
                            <td width="91px" class="special">终端点位</td>
                            <td width="" colspan="2"><input class="insert-info" type="text" readonly
                                                            style="background: #f8f8f8;"
                                                            v-model="resultData.nataAppTermPoint"></td>
                            <td width="" class="special">业务员姓名</td>
                            <td width="" colspan="3"><input class="insert-info" type="text" readonly
                                                            style="background: #f8f8f8;"
                                                            v-model="resultData.saleNameC"></td>
                        </tr>
                        <tr>
                            <td width="91px">服务费率</td>
                            <td width="67px"><input class="insert-info" type="text" v-on:input="inputFunc"
                                                    v-model="resultData.propFeeServRate"></td>
                            <td width="91px" class="special">渠道服务费率</td>
                            <td width=" "><input class="insert-info" type="text" v-on:input="inputFunc"
                                                 v-model="resultData.propFeeChnServRate">
                            </td>
                            <td width="91px" class="special"> 服务费</td>
                            <td width=" "><input class="insert-info" type="text" v-model="resultData.propFeeServAmt">
                            </td>
                            <td width=" " class="special"> 渠道服务费　</td>
                            <td width=" "><input class="insert-info" type="text" v-model="resultData.propFeeChnServAmt">
                            </td>
                            <td width="91px" class="special"> 前期合计　</td>
                            <td width=" "><input class="insert-info" type="text" v-on:input="inputFunc"
                                                 v-model="resultData.propFeeSum"></td>
                        </tr>

                        <tr>
                            <td width="91px">月息率</td>
                            <td width="67px"><input class="insert-info" type="text" v-on:input="inputFunc"
                                                    v-model="resultData.propFeeMonInterRate"></td>
                            <td width="91px" class="special"> 渠道月息率　</td>
                            <td width=" "><input class="insert-info" type="text" v-on:input="inputFunc"
                                                 v-model="resultData.propFeeChnMonInterRate"></td>
                            <td width="91px" class="special"> 月息　</td>
                            <td width=" "><input class="insert-info" type="text" v-model="resultData.propFeeMonInter">
                            </td>
                            <td class="special"> 渠道月息　</td>
                            <td width="91px"><input class="insert-info" type="text"
                                                    v-model="resultData.propFeeChnMonInter"></td>
                            <td class="special"> 月息合计　</td>
                            <td><input class="insert-info" type="text" v-model="resultData.propFeeSumMonInter"></td>
                        </tr>

                        <tr>
                            <td width="91px">综合服务费率</td>
                            <td width="67px"><input class="insert-info" type="text"
                                                    v-model="resultData.propFeeComServRate1"></td>
                            <td width="91px"><input class="insert-info" type="text"
                                                    v-model="resultData.propFeeComServRate2"></td>
                            <td width="91px"><input class="insert-info" type="text"
                                                    v-model="resultData.propFeeComServRate3"></td>
                            <td width="91px" class="special"> 公证费　</td>
                            <td width="91px"><input class="insert-info" type="text" v-model="resultData.propFeeNataFee">
                            </td>
                            <td width="91px" class="special"> 前期费用　</td>
                            <td width="91px" colspan="3"><input class="insert-info" type="text"
                                                                v-model="resultData.propFeeCost"></td>
                        </tr>

                    </table>

                    <div class="up-load-content">
                        <div class="up-load">
                            <div class="must-input">前期费用图片</div>
                            <div class="up-load-bg">
                                <form id="uploadForm" enctype="multipart/form-data" @change="upLoadTextBtn()">
                                    选择文件<i class="el-icon-upload el-icon--right"></i>
                                    <input type="file" name="uploadFile" id="files" accept="image/png,image/JPG,image/JPEG"/>
                                </form>
                            </div>
                            <span style="line-height: 40px;margin-left: 8px;">(只能上传jpg,jpeg,png格式的图片)</span>
                        </div>
                    </div>
                    <div class="">
                        <div class="up-load-selected">
                        </div>
                    </div>


                </div>
                <el-row style="margin-top: 26px;text-align: center">
                    <el-col :span="24">
                        <div class="grid-content bg-purple-dark">


                            <el-button @click="previesList()" :plain="true" type="info">前期费用表预览</el-button>
                            <el-button style="margin: 0 80px;width:94px" type="info" :plain="true"
                                       @click="beforeHandCost()">通过
                            </el-button>
                            <el-button style="width:94px" type="warning" :plain="true"
                                       @click="refuseDialog=true">拒单
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="previes-gz">
                <div class="arrow-up"></div>
                <div class="previes-table">前期费用表</div>
                <div style="margin-top: 16px">
                    <el-table :data="tableData" border>
                        <el-table-column prop="date" label="项目" width="200">
                        </el-table-column>
                        <el-table-column prop="name" label="金额" width="200">
                        </el-table-column>
                        <el-table-column prop="address" label="明细">
                        </el-table-column>
                    </el-table>
                </div>

            </div>

        </el-dialog>
        <!--财务查看-->
        <el-dialog top="0" :show-close="false" custom-class="custom-table" :close-on-click-modal="false"
                   @open='dialogOpen' :visible.sync="dialogFormShowCwInfo">
            <div class="edit-main">
                <span class="close-btn" @click='closeEdit'></span>
                <div class="check-status-ul">
                    <el-steps :align-center="true" :space="110" :active='3' finish-status="success">
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
                <div v-show="roleId=='8'" class="title"><span class="icon"></span>前期费用</div>
                <div v-show="roleId=='7'" class="title"><span class="icon"></span>公证申请</div>
                <div class="down-load" style="margin: 20px 0 0 100px">
                    <div>批贷函：<span><a id="OrderPdf" href=""></a></span>（点击可下载）</div>
                </div>
                <div class="view-input" v-show="roleId=='7'" style="width: 896px;margin: 0 auto;height: auto;">
                    <div class="gz-line" style="margin-top: 24px;">
                        <span class="gz-title">预约公证时间</span><span><el-date-picker
                            v-model="value1"
                            type="datetime"
                            readonly
                            placeholder="选择日期时间">
    </el-date-picker></span>
                        <span style="margin-left: 48px" class="gz-title">公证联系人</span><span class="edit"><el-input
                            v-model="resultData.nataAppPersion" type="text"></el-input></span>
                    </div>
                    <div class="gz-line" style="margin-top: 24px;">
                        <span class="gz-title">联系人手机号</span><span class="edit"><el-input
                            v-model="resultData.nataAppPhonenum" type="text"></el-input></span>
                    </div>
                    <div class="gz-line" style="margin-top: 24px;">
                        <span class="gz-title">公证地点</span><span class="edit gz-address"><el-input style="width: 250px"
                                                                                                  v-model="resultData.nataAppApprAddr"
                                                                                                  type="text"></el-input></span>
                    </div>
                    <div class="gz-line" style="margin-top: 24px;">
                        <span class="gz-title">办事员姓名</span><span class="edit"><el-input
                            v-model="resultData.nataAppApprName" type="text"></el-input></span>
                        <span class="gz-title">办事员联系方式</span><span class="edit"><el-input
                            v-model="resultData.nataAppApprPhonenum" type="text"></el-input></span>
                    </div>
                    <div class="gz-line clearfix" style="margin-top: 24px;">
                        <span class="gz-title textarea">公证所需材料</span>
                        <span class="textarea">
                            <el-input
                                    style="width: 650px;margin-left: 8px"
                                    :autosize="{ minRows: 5, maxRows: 5}"
                                    type="textarea"
                                    readonly
                                    placeholder=""
                                    v-model="resultData.nataAppApprMaterial">
                            </el-input>
                        </span>
                    </div>
                    <!--是否有抵押-->
                    <div v-show="nataAppIsMortAppShow==1" class="nataAppIsMortApp">
                        <!--抵押申请展示表单-->
                        <div class="gz-line clearfix" style="margin-top:24px;">
                            <span class="gz-title">预约抵押时间</span><span><el-date-picker
                                v-model="value2"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker></span>
                            <span style="margin-left: 46px" class="gz-title">预约抵押联系人</span><span
                                class="edit"><el-input
                                v-model="resultData.mortAppPersion" type="text"></el-input></span>
                        </div>
                        <div class="gz-line" style="margin-top: 24px;">
                            <el-form :model="resultData" label-width="147px">
                                <el-form-item label="是否客户本人抵押">
                                    <el-select style="margin-left: -4px" v-model="resultData.mortAppIsSameone"
                                               class="mortAppIsSameone"
                                               placeholder="请选择">
                                        <el-option
                                                v-for="item in mortAppIsSameones"
                                                :key="item"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="gz-line" style="margin-top: 24px;">
                            <span class="gz-title">抵押联系方式</span><span class="edit"><el-input
                                v-model="resultData.mortAppPhonenum" type="text"></el-input></span>
                            <span style="margin-left: 38px" class="gz-title">房本携带人</span><span class="edit"><el-input
                                v-model="resultData.mortAppHouCarryPer" type="text"></el-input></span>
                        </div>
                        <div class="gz-line" style="margin-top: 24px;">
                            <span class="gz-title">预约放款时间</span><span><el-date-picker
                                v-model="value3"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker></span>
                            <span style="margin-left: 46px" class="gz-title">抵押排队人</span><span class="edit"><el-input
                                v-model="resultData.mortAppQueuePer" type="text"></el-input></span>
                        </div>
                        <!--抵押所需携带材料-->
                        <div class="gz-line clearfix" style="margin-top: 24px;">
                            <span class="gz-title textarea">抵押所需携带材料</span>
                            <span class="textarea">
                            <el-input style="width: 650px;margin-left: 8px"
                                      :autosize="{ minRows: 5, maxRows: 5}"
                                      type="textarea"
                                      v-model="textareaText1">
                            </el-input>
                            </span>
                        </div>
                        <div class="gz-line clearfix" style="margin: 32px 0">
                            <span class="gz-title textarea">抵押申请审批意见</span>
                            <span class="textarea">
                            <el-input style="width: 650px;margin-left: 8px"
                                      type="textarea"
                                      placeholder="请输入内容"
                                      v-model="resultData.mortAppApprOpinion">
                            </el-input>
                            </span>
                        </div>
                    </div>
                </div>
                <div v-show="roleId=='8'||roleId=='2'" style="margin-top: 24px">
                    <table cellspacing="0" cellpadding="0" class="table" width="896">
                        <tr>
                            <td width="91px">姓名</td>
                            <td width="159px" colspan="2"><input class="insert-info" type="text" readonly
                                                                 v-model="resultData.custName"></td>
                            <td width="91px" class="special">贷款金额</td>
                            <td width="183px" colspan="2"><input class="insert-info" type="text" readonly
                                                                 v-model="resultData.apprLoanAmtMoney">
                            </td>
                            <td class="special">抵押类型</td>
                            <td><input class="insert-info" type="text" readonly
                                       v-model="resultData.visitCustAppMortgage">
                            </td>
                            <td class="special">期数</td>
                            <td><input class="insert-info" type="text" readonly v-model="resultData.apprLoanTerm">
                            </td>
                        </tr>
                        <tr>
                            <td width="91px">抵押数</td>
                            <td width="159px" colspan="2"><input class="insert-info" type="text" readonly
                                                                 v-model="resultData.propFeeMortNum">　
                            </td>
                            <td width="91px" class="special">终端点位</td>
                            <td width="" colspan="2"><input class="insert-info" type="text" readonly
                                                            v-model="resultData.nataAppTermPoint"></td>
                            <td width="" class="special">业务姓名</td>
                            <td width="" colspan="3"><input class="insert-info" type="text" readonly
                                                            v-model="resultData.saleNameC"></td>
                        </tr>
                        <td width="91px" class="special">服务费率</td>
                        <td width="67px"><input class="insert-info" type="text" value="" readonly></td>
                        <td width="91px" class="special">渠道服务费率</td>
                        <td width=" "><input class="insert-info" type="text" value="" readonly></td>
                        <td width="91px" class="special"> 服务费　</td>
                        <td width=" "><input class="insert-info" type="text" value="" readonly></td>
                        <td width=" " class="special"> 渠道服务费　</td>
                        <td width=" "><input class="insert-info" type="text" value="" readonly></td>
                        <td width="91px" class="special"> 前期合计　</td>
                        <td width=" "><input class="insert-info" type="text" value="" readonly></td>
                        </tr>

                        <tr>
                            <td width="91px">月息率</td>
                            <td width="67px"><input class="insert-info" type="text" value="" readonly></td>
                            <td width="91px" class="special"> 渠道月息率　</td>
                            <td width=" "><input class="insert-info" type="text" value="" readonly></td>
                            <td width="91px" class="special"> 月息　</td>
                            <td width=" "><input class="insert-info" type="text" value="" readonly></td>
                            <td class="special"> 渠道月息　</td>
                            <td width="91px"><input class="insert-info" type="text" value="" readonly></td>
                            <td class="special"> 月息合计　</td>
                            <td><input class="insert-info" type="text" value="" readonly></td>
                        </tr>

                        <tr>
                            <td width="91px">综合服务费率</td>
                            <td width="67px"><input readonly class="insert-info" type="text" value=""></td>
                            <td width="91px"><input readonly class="insert-info" type="text" value=""></td>
                            <td width="91px"><input readonly class="insert-info" type="text" value=""></td>
                            <td width="91px" class="special"> 公证费　</td>
                            <td width="91px"><input readonly class="insert-info" type="text" value=""></td>
                            <td width="91px" class="special"> 前期费用　</td>
                            <td width="91px" colspan="3"><input readonly class="insert-info" type="text" value=""></td>
                        </tr>

                    </table>

                </div>

                <!--拒单-->
                <div v-show="resultData.refuseReason" class="gz-line" style="margin: 34px 0 0 56px;color:#f31313">
                    <span class="gz-title">拒单原因</span><span class="refuseReason"><span
                        v-html="resultData.refuseReason" type="text"></span></span>
                </div>
            </div>
        </el-dialog>
        <!--拒单意见-->
        <el-dialog v-if="refuseDialog" title="提示" :close-on-click-modal="false" :visible.sync="refuseDialog"
                   style='width:452px;height: 296px;' class='refuseDialog'>
            <div class="refuse-title">
                <span class="refuse-warning"></span>
                <span class="refuse-tip must-input">拒单原因：</span>
            </div>
            <el-input type='textarea' placeholder='请填写拒单时间…' v-model='refuseReason'></el-input>
            <span slot="footer" class="refuse-footer">
				    <el-button @click="refuseDialog=false">取 消</el-button>
				    <el-button type="" @click="refuseOrder()">确 定</el-button>
				  </span>
        </el-dialog>


    </div>
</template>
<script>
    import qs from 'qs'
    export default {
        data() {
            return {
                refuseReason: '1、借款人身份证、借款人户口本、借款人房产证、借款人婚姻证明1、借款人身份证、借款人户口本、借款人房产证、借款人婚姻证明',
                refuseDialog: false,
                message: '343425',
                apprAddroptions: [],
                mortAppIsSameones: [],
                contentTableData: [],
                stageCode: 4,
                tableData: [],
                tableAfterData: [],
                checked: false,
                falseShowGzSqInfo: false,
                falseShowQzInfo1: false,
                dialogFormVisibleQzEdit: false,
                dialogFormVisibleCwEdit: false,
                dialogFormVisibleQzEditGz: false,
                dialogFormShowCwInfo: false,
                resultData: {},
                value1: '',
                value2: '',
                value3: '',
                activeIndex: 3,
                resultData1: '',
                resultData2: '',
                userInfo: '',
                roleId: '',
                formatMoneyValue: '',
                attrAttach: '',
                imgListPropFee: "",
                nataAppIsMortAppShow: '1',
                textareaText1: '1、客户本人抵押，需携带房本、身份证;\n' +
                '2、非客户本人抵押，携带房本\n',
                textareaText: '1、借款人身份证、借款人户口本、借款人房产证、借款人婚姻证明;\n' +
                '2、如果有共借人，需提供共借人身份证、共借人户口本；\n' +
                '3、如果是二抵，需要一抵合同；\n4、如果是经济适用房，需原始购房合同、契税票\n5、如果是商品房，需提供契税票原件或者商品房购房合同原件；',
            };
        },
        props: ['orderHouseId', 'openFlag', 'businessStateCode'],
        methods: {

//            放大图片
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
//            上传图片
            upLoadTextBtn(){
                var that = this;
                if (!$("#files").val()) {
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
                    success: function (data) {
                        if (data.respCode == "000000") {
                            $(".up-load-selected").css("display", "block");
                            $(".up-load-selected").append("<div attr-attach=" + data.resultData.icAttachId + ">" + data.resultData.attachName + "<span></span></div>");
                            $(".up-load-selected span").each(function () {
                                $(this).on("click", function () {
                                    $(this).parent("div").remove();
                                })
                            });
                        } else if (data.respCode == "000013") {
                            that.showMsg("附件大小超出限制，最大20M！")
                        } else if (data.respCode == "000014") {
                            that.showMsg("附件为空")
                        } else if (data.respCode == "000011") {
                            that.showMsg("附件不存在")
                        } else {
                            that.showMsg("附件上传失败")
                        }
                    },
                    error: function () {
                        that.showMsg("附件大小超出限制，最大20M！")
                    }
                });
                $("#uploadForm").html("选择文件<i class='el-icon-upload el-icon--right'></i><input accept='image/png,image/JPG,image/JPEG' type='file' name='uploadFile' id='files' />")
            },
            // 拒单接口
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
                        orderHouseId: this.orderHouseId,
                        refuseReason: this.refuseReason
                    }
                }
                that.$http.post(btnHttpParmas.url, btnHttpParmas.params).then(function (res) {
                    if (res.data.respCode == "000000") {
                        that.dialogFormVisibleCwEdit = false;
                        that.dialogFormVisibleQzEdit = false;
                        that.refuseDialog = false;
                        that.$parent.dialogDestroy = false;
                        that.$message({
                            message: '拒单成功',
                            type: 'success',
                            duration: "1500",
                        });
                        //更新列表
                        that.$parent.handlePageChange(1)
                    } else {
                        that.$message.error("拒单失败");
                    }
                });
            },
            // 服务费率的计算
            inputFunc(){
                $('.previes-gz').removeClass('showself')


                this.resultData.apprLoanAmtMoney = this.formatMoneyValue.replace(/,/g, "")
                // 验证数据的合法性
                if (this.resultData.propFeeServRate > this.resultData.nataAppTermPoint / 100) {
                    this.resultData.propFeeServRate = ''
                    this.$message.error("服务费率*100<=终端点位");
                    return;
                }

                if (this.resultData.propFeeChnServRate > this.resultData.nataAppTermPoint / 100) {
                    this.resultData.propFeeChnServRate = ''
                    this.$message.error("渠道服务费率*100<=终端点位");
                    return;
                }

                if (this.resultData.propFeeMonInterRate > this.resultData.nataAppTermPoint / 100) {
                    this.resultData.propFeeMonInterRate = ''
                    this.$message.error("月息率*100<=终端点位");
                    return;
                }

                if (this.resultData.propFeeChnMonInterRate > this.resultData.nataAppTermPoint / 100) {
                    this.resultData.propFeeChnMonInterRate = ''
                    this.$message.error("渠道月息率*100<=终端点位");
                    return;
                }

//                 服务费率的计算
                this.resultData.propFeeServAmt = (this.resultData.apprLoanAmtMoney * this.resultData.apprLoanTerm * this.resultData.propFeeServRate).toFixed(2);
//                 渠道服务费
                this.resultData.propFeeChnServAmt = (this.resultData.apprLoanAmtMoney * this.resultData.propFeeChnServRate * this.resultData.apprLoanTerm).toFixed(2);
//                 前期合计
                this.resultData.propFeeSum = (this.resultData.propFeeServAmt * 1 + this.resultData.propFeeChnServAmt * 1).toFixed(2)
//                 月息
                this.resultData.propFeeMonInter = (this.resultData.apprLoanAmtMoney * this.resultData.propFeeMonInterRate).toFixed(2)
//                 渠道月息
                this.resultData.propFeeChnMonInter = (this.resultData.apprLoanAmtMoney * this.resultData.propFeeChnMonInterRate).toFixed(2)
//                 月息合计
                this.resultData.propFeeSumMonInter = (this.resultData.propFeeMonInter * 1 + this.resultData.propFeeChnMonInter * 1).toFixed(2)
                //综合服务费率
                this.resultData.propFeeComServRate1 = (this.resultData.propFeeServRate * 1 + this.resultData.propFeeChnServRate * 1).toFixed(4)
                this.resultData.propFeeComServRate2 = (this.resultData.propFeeComServRate1 * 100).toFixed(4)
                this.resultData.propFeeComServRate3 = (this.resultData.propFeeComServRate2 * this.resultData.apprLoanTerm).toFixed(4)
                //公证费
                this.resultData.propFeeNataFee = (this.resultData.apprLoanAmtMoney * 0.003 + this.resultData.propFeeMortNum * 1800).toFixed(2)
                // 前期费用
                if (this.resultData.houPosition.indexOf('别墅') == '-1') {
                    var villaFlag = 280;
                } else {
                    var villaFlag = 880;
                }
                this.resultData.propFeeCost = (villaFlag * this.resultData.propFeeMortNum + this.resultData.apprLoanAmtMoney * 0.0003).toFixed(2)
            },
            //查询批贷函附件详情
            getAttachDetail(){
                var that = this;
                var attachId = this.resultData.attachIdApprLeter
                if (attachId) {
                    this.$http.get("common/queryAttachByAttachId", {
                        params: {
                            'attachId': attachId,
                        }
                    }).then(function (res) {
                        if (res.data.respCode == '000000') {
                            that.pdfDownPath = that.$http.defaults.baseURL + "common/downloadPdf?attachId=" + attachId;
                            that.pdfName = res.data.resultData.attachName;
                            $('#OrderPdf').attr("href", that.pdfDownPath);
                            $('#OrderPdf').text(that.pdfName);
                        } else {
                            that.showMsg("暂无批贷函信息！");
                        }
                    });
                }
            },

            dialogOpen() {
                $('.content-gz .el-dialog__wrapper').show().css({
                    'left': 'auto',
                    'right': '-1079px'
                }).animate({
                    right: '0'
                });
            },
            closeEdit() {
                var that = this;
                if (this.openFlag == 'u') {
                    this.$http.post("order/unlockOrder", {
                        'orderHouseId': that.orderHouseId
                    }).then(function (res) {
                        that.falseShowGzSqInfo = false
                        that.falseShowQzInfo1 = false
                        that.dialogFormVisibleQzEdit = false
                        that.dialogFormVisibleCwEdit = false
                        that.dialogFormShowCwInfo = false
                        that.dialogFormVisibleQzEditGz = false
                        that.$parent.dialogDestroy = false;
                        that.$parent.handlePageChange(1);
                    });
                } else {
                    that.falseShowGzSqInfo = false
                    that.falseShowQzInfo1 = false
                    that.dialogFormVisibleQzEdit = false
                    that.dialogFormVisibleCwEdit = false
                    that.dialogFormShowCwInfo = false
                    that.dialogFormVisibleQzEditGz = false
                    that.$parent.dialogDestroy = false;
                }

                $(".el-dialog__wrapper").hide()
            },
            // 财务人员前期费用通过
            beforeHandCost(){
                var that = this
                if ($(".up-load-selected div").length == 0) {
                    this.showMsg("请上传文件");
                    return;
                }
                $(".up-load-selected div").each(function () {
                    var value = $(this).attr('attr-attach') + "";
                    that.attrAttach = that.attrAttach + value + ",";
                });
                if (this.attrAttach.endsWith(",")) {
                    this.attrAttach = this.attrAttach.substring(0, this.attrAttach.length - 1);
                }

                var objParamsInit = {
                    'orderHouseId': this.resultData.orderHouseId,
                    'propFeeName': this.resultData.custName,
                    'propFeeLoanAmt': this.resultData.apprLoanAmtMoney,
                    'propFeeMortType': this.resultData.visitCustAppMortgage,
                    'propFeeTermNum': this.resultData.apprLoanTerm,

                    'propFeeMortNum': this.resultData.propFeeMortNum,
                    'propFeeBusiName': this.resultData.saleNameC,
                    'propFeeServRate': this.resultData.propFeeServRate,
                    'propFeeChnServRate': this.resultData.propFeeChnServRate,
                    'propFeeServAmt': this.resultData.propFeeServAmt,

                    'propFeeChnServAmt': this.resultData.propFeeChnServAmt,
                    'propFeeSum': this.resultData.propFeeSum,
                    'propFeeMonInterRate': this.resultData.propFeeMonInterRate,
                    'propFeeChnMonInterRate': this.resultData.propFeeChnMonInterRate,
                    'propFeeMonInter': this.resultData.propFeeMonInter,

                    'propFeeChnMonInter': this.resultData.propFeeChnMonInter,
                    'propFeeSumMonInter': this.resultData.propFeeSumMonInter,
                    'propFeeComServRate1': this.resultData.propFeeComServRate1,
                    'propFeeComServRate2': this.resultData.propFeeComServRate2,
                    'propFeeComServRate3': this.resultData.propFeeComServRate3,

                    'propFeeNataFee': this.resultData.propFeeNataFee,
                    'propFeeCost': this.resultData.propFeeCost,

                    'attachIdPropFeeTab': this.attrAttach


                }
                this.$http.post('nota/savePropFeeApprovalInfo',
                        objParamsInit
                ).then(function (res) {
                    if (res.data.respCode == '000000') {
                        that.$message.success('保存成功')
                        that.dialogFormVisibleCwEdit = false;
                        that.$parent.dialogDestroy = false;
                        $(".el-dialog__wrapper").hide()
                        //更新列表
                        that.$parent.handlePageChange(1)
                    } else {
                        that.$message.error('保存失败');
                    }
                });

            },


            // 抵押校验
            checkNataAppIsMortAppInfo() {
                //校验输入
                var str = "";
                if (!this.value2) {
                    str = "请填写预约抵押时间";
                    this.showMsg(str);
                    return false;
                }
                if (!this.resultData.mortAppPersion) {
                    str = "请填写预约抵押联系人"
                    this.showMsg(str);
                    return false;
                }
                if (!this.resultData.nataAppApprPhonenum) {
                    str = "请填写办事员联系方式"
                    this.showMsg(str);
                    return false;
                }
                if (!this.resultData.mortAppIsSameone) {
                    str = "请选择是否为客户本人抵押"
                    this.showMsg(str);
                    return false;
                }

                if (!this.resultData.mortAppPhonenum) {
                    str = "请填写抵押联系方式"
                    this.showMsg(str);
                    return false;
                }
                if (!this.resultData.mortAppHouCarryPer) {
                    str = "请填写房本携带人"
                    this.showMsg(str);
                    return false;
                }
                if (!this.value3) {
                    str = "请填写预约放款时间"
                    this.showMsg(str);
                    return false;
                }
                if (!this.resultData.mortAppQueuePer) {
                    str = "请填写抵押排队人"
                    this.showMsg(str);
                    return false;
                }
                return true;
            },

            // 公证申请审批
            checkFormInfo() {
                //校验输入
                var str = "";
                if (!this.textareaText) {
                    str = "请填写公证地点";
                    this.showMsg(str);
                    return false;
                }
                if (!this.resultData.nataAppApprName) {
                    str = "请填写办事员姓名"
                    this.showMsg(str);
                    return false;
                }
                if (!this.resultData.nataAppApprPhonenum) {
                    str = "请填写办事员联系方式"
                    this.showMsg(str);
                    return false;
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
            handPass(url){
                if (this.checkFormInfo()) {
//                    this.dialogFormVisibleQzEdit = false;
//                    this.dialogFormVisibleQzEditGz = false;
//                    $(".el-dialog__wrapper").hide()
                    var that = this
                    if (url == 'gzsp') {

                        var Approval = {
                            'url': 'nota/saveNotarizationApplyApprovalInfo',   // 公证申请审批
                            'paramsInit': {
                                'orderHouseId': this.resultData.orderHouseId,
                                'nataAppApprovalTime': that.value1,
                                'nataAppPerson': this.resultData.nataAppPersion,
                                'nataAppPhonenum': this.resultData.nataAppPhonenum,
                                'nataAppApprAddr': $('.nataAppApprAddr input').val(),

                                'nataAppApprAddrCode': this.resultData.nataAppApprAddr,
                                'nataAppApprName': this.resultData.nataAppApprName,
                                'nataAppApprPhoneNum': this.resultData.nataAppApprPhonenum,
                                'nataAppApprMaterial': this.textareaText,
                                'nataAppApprOpinion': this.resultData.nataAppApprOpinion,
                            }

                        }
                    } else if (url == 'gz') {
                        var Approval = {
                            'url': 'nota/saveNotarizationApprovalInfo',   // 公证审批
                            'paramsInit': {
                                'orderHouseId': this.resultData.orderHouseId,
                                'nataApprOpinion': this.resultData.nataApprOpinion,
                            }
                        }
                    }
                    this.$http.post(Approval.url,
                            Approval.paramsInit
                    ).then(function (res) {
                        if (res.data.respCode == '000000') {
                            that.$message.success('保存成功')
                            that.dialogFormVisibleQzEdit = false;
                            that.dialogFormVisibleQzEditGz = false;
                            that.$parent.dialogDestroy = false;
                            //更新列表
                            that.$parent.handlePageChange(1)
                        } else {
                            that.$message.error('保存失败');
                        }
                    });
                }
            },
            //公证抵押申请审批接口
            handNataAppIsMortAppPass(){

                if (this.checkFormInfo() && this.checkNataAppIsMortAppInfo()) {
                    var that = this;
                    var nataAppIsMortApp = {
                        'url': 'nota/saveNotaAndMortApplyApprovalInfo',   // 公证抵押申请审批
                        'paramsInit': {
                            'orderHouseId': this.resultData.orderHouseId,
                            'nataAppApprovalTime': this.getForMatDate2(this.value1),
                            'nataAppPerson': this.resultData.nataAppPersion,
                            'nataAppPhonenum': this.resultData.nataAppPhonenum,
                            'nataAppApprAddr': $('.nataAppApprAddr input').val(),

                            'nataAppApprAddrCode': this.resultData.nataAppApprAddr,
                            'nataAppApprName': this.resultData.nataAppApprName,
                            'nataAppApprPhoneNum': this.resultData.nataAppApprPhonenum,
                            'nataAppApprMaterial': this.textareaText,
                            'nataAppApprOpinion': this.resultData.nataAppApprOpinion,

                            'mortAppTime': this.getForMatDate2(this.value2),
                            'mortAppPerson': this.resultData.mortAppPersion,
                            'mortAppPhonenum': this.resultData.mortAppPhonenum,
                            'mortAppIsSameone': $('.mortAppIsSameone input').val(),
                            'mortAppIsSameoneCode': this.resultData.mortAppIsSameone,

                            'mortAppHouCarryPer': this.resultData.mortAppHouCarryPer,
                            'mortApprOrderLoanTs': this.getForMatDate2(this.value3),
                            'mortAppQueuePer': this.resultData.mortAppQueuePer,
                            'mortAppApprMaterial': this.textareaText1,
                            'mortAppApprOpinion': this.resultData.mortAppApprOpinion,
                        }
                    }
                    this.$http.post(nataAppIsMortApp.url,
                            nataAppIsMortApp.paramsInit
                    ).then(function (res) {
                        if (res.data.respCode == '000000') {
                            that.$message.success('保存成功')
                            that.dialogFormVisibleQzEdit = false;
                            that.dialogFormVisibleQzEditGz = false;
                            that.$parent.dialogDestroy = false;
                            //更新列表
                            that.$parent.handlePageChange(1)
                        } else {
                            that.$message.error('保存失败');
                        }
                    });
                }

            },


            // 表格计算
            previesList() {
                var allAppTermPoint = this.resultData.propFeeServRate * 1 + this.resultData.propFeeChnServRate * 1 + this.resultData.propFeeMonInterRate * 1 + this.resultData.propFeeChnMonInterRate * 1
                if ((allAppTermPoint * 100).toFixed(2) == this.resultData.nataAppTermPoint) {
                    var resultData = this.resultData
                    if (resultData.houPosition.indexOf('别墅') == '-1') {
                        var villaFlag = 200;
                    } else {
                        var villaFlag = 800;
                    }
                    $('.previes-gz').toggleClass('showself')
                    this.resultData1 = (villaFlag * resultData.propFeeMortNum + resultData.apprLoanAmtMoney * 0.0033 + resultData.propFeeMortNum * 1880).toFixed(2)
                    this.resultData2 = (this.resultData1 * 1 + (resultData.apprLoanAmtMoney * resultData.apprLoanTerm * (resultData.propFeeServRate * 1 + resultData.propFeeChnServRate * 1))).toFixed(2);
                    this.tableData = [
                        {
                            date: '评估费',
                            name: (villaFlag * resultData.propFeeMortNum).toFixed(2),
                            address: '住宅200/独栋别墅800  乘以 抵押数'
                        },
                        {
                            date: '保险费',
                            name: (resultData.apprLoanAmtMoney * 0.0003).toFixed(2),
                            address: '贷款金额*0.3‰'
                        },
                        {
                            date: '公证费',
                            name: (resultData.apprLoanAmtMoney * 0.003).toFixed(2),
                            address: '借款公证*3‰'
                        },
                        {
                            date: '委托',
                            name: (resultData.propFeeMortNum * 1000).toFixed(2),
                            address: '委托 1000 乘以抵押数'
                        },
                        {
                            date: '证件公证',
                            name: (resultData.propFeeMortNum * 800).toFixed(2),
                            address: '证件公证800 乘以抵押数'
                        },
                        {
                            date: '抵押登记',
                            name: (resultData.propFeeMortNum * 80).toFixed(2),
                            address: '住宅80 乘以抵押数'
                        },
                        {
                            date: '合计',
                            name: this.resultData1,
                            address: ''
                        },
                        {
                            date: '服务费',
                            name: (resultData.apprLoanAmtMoney * resultData.apprLoanTerm * (resultData.propFeeServRate * 1 + resultData.propFeeChnServRate * 1)).toFixed(2),
                            address: ''
                        },
                        {
                            date: '合计',
                            name: this.resultData2,
                            address: ''
                        },
                    ]
                } else {
                    this.$message.error("(服务费率+渠道服务费率+月息率+渠道月息率)*100=终端点位");
                }
            },

            previesListGZ() {
                var resultData = this.resultData
                if (resultData.houPosition.indexOf('别墅') == '-1') {
                    var villaFlag = 200;
                } else {
                    var villaFlag = 800;
                }
                this.resultData1 = (villaFlag * resultData.propFeeMortNum + resultData.propFeeLoanAmt * 0.0033 + resultData.propFeeMortNum * 1880).toFixed(2)
                this.resultData2 = (this.resultData1 * 1 + (resultData.propFeeLoanAmt * resultData.propFeeTermNum * (resultData.propFeeServRate * 1 + resultData.propFeeChnServRate * 1))).toFixed(2);
                this.tableAfterData = [
                    {
                        date: '评估费',
                        name: (villaFlag * resultData.propFeeMortNum).toFixed(2),
                        address: '住宅200/独栋别墅800  乘以 抵押数'
                    },
                    {
                        date: '保险费',
                        name: (resultData.propFeeLoanAmt * 0.0003).toFixed(2),
                        address: '贷款金额*0.3‰'
                    },
                    {
                        date: '公证费',
                        name: (resultData.propFeeLoanAmt * 0.003).toFixed(2),
                        address: '借款公证*3‰'
                    },
                    {
                        date: '委托',
                        name: (resultData.propFeeMortNum * 1000).toFixed(2),
                        address: '委托 1000 乘以抵押数'
                    },
                    {
                        date: '证件公证',
                        name: (resultData.propFeeMortNum * 800).toFixed(2),
                        address: '证件公证800 乘以抵押数'
                    },
                    {
                        date: '抵押登记',
                        name: (resultData.propFeeMortNum * 80).toFixed(2),
                        address: '住宅80 乘以抵押数'
                    },
                    {
                        date: '合计',
                        name: this.resultData1,
                        address: ''
                    },
                    {
                        date: '服务费',
                        name: (resultData.propFeeLoanAmt * resultData.propFeeMortNum * (resultData.propFeeServRate * 1 + resultData.propFeeChnServRate * 1)).toFixed(2),
                        address: ''
                    },
                    {
                        date: '合计',
                        name: this.resultData2,
                        address: ''
                    },
                ]
            },
        },
        mounted: function () {
            var that = this;
            this.userInfo = JSON.parse(localStorage.getItem('powerList')).opId;
            this.roleId = JSON.parse(localStorage.getItem('powerList')).roleId;
            console.log(this.roleId);
            this.$http.get('order/queryOrderDetailByOrderHouseId', {
                params: {
                    'orderHouseId': that.orderHouseId,
                    'flag': that.openFlag,
                }
            }).then(function (res) {
                that.nataAppIsMortAppShow = res.data.resultData.nataAppIsMortAppCode
                // 请求公证地点的接口
                that.$http.get('common/queryBasicParameterByKindCodes', {
                    params: {
                        'kindCodes': 'GZC,SFKHBRDY'
                    }
                }).then(function (res) {
                    var apprAddroptionArr = res.data.resultData.GZC;
                    var resultData = res.data.resultData.SFKHBRDY;
                    for (var i = 0; i < resultData.length; i++) {
                        var item = {
                            value: resultData[i].code,
                            label: resultData[i].value
                        }
                        that.mortAppIsSameones.push(item)
                    }
                    for (var i = 0; i < apprAddroptionArr.length; i++) {
                        var item = {
                            value: apprAddroptionArr[i].code,
                            label: apprAddroptionArr[i].value
                        }
                        that.apprAddroptions.push(item)
                    }
                })

                if (res.data.respCode == '000010') {
                    that.$message({
                        message: "报单已锁定，请稍后尝试编辑",
                        type: 'warning',
                        duration: "1500",
                    });
                    that.$parent.dialogDestroy = false;
                } else {
                    // 查看页全部显示
                    if (res.data.resultData.stageCode > '4') {
                        that.activeIndex = res.data.resultData.stageCode - 1;
                        $('.must-input').removeClass('must-input')
                        that.falseShowQzInfo1 = true;
                        that.$nextTick(function () {
                            $('#gzspyj').show()
                            $('#gzyj').show()
                            $('.hideSomeModelBottom').show();
                            that.previesListGZ();
                            $('.view-input input').css({'border': '0'})
                            $('.view-input input').attr('disabled', true)
                            $('.view-input .el-input__icon').css("display", "none");

                        })
                    }
                    if (that.businessStateCode == '41') {
                        that.falseShowGzSqInfo = true
                    } else if (that.businessStateCode == '42') {
                        if (that.openFlag == 'u') {
                            that.dialogFormVisibleQzEdit = true
                            console.log(that.nataAppIsMortAppShow);
                            // 是否展示抵押页面
                            that.$nextTick(function () {
                                if (that.nataAppIsMortAppShow == '1') {
                                    $('.nataAppIsMortApp').show()
                                } else if (that.nataAppIsMortAppShow == '2') {
                                    $('.nataAppIsMortApp').hide()
                                }
                            })

                        } else if (that.openFlag == 'v') {
                            $('.must-input').removeClass('must-input')
                            that.falseShowQzInfo1 = true
                            that.$nextTick(function () {
                                $('#gzspyj').show()
                                $('#gzyj').hide()
                                $('.view-input input').css('border', '0')
                                $('.view-input input').attr('disabled', true)
                                $('.view-input .el-input__icon').css("display", "none");
                                $('.hideSomeModelBottom').hide();
                            })

                        }
                    } else if (that.businessStateCode == '44') {

                        if (that.openFlag == 'u') {
                            that.dialogFormVisibleQzEditGz = true
                            that.$nextTick(function () {
                                $('.view-input input').css({'border': '0'})
                                $('.view-input input').attr('disabled', true)
                                $('.view-input .el-input__icon').css("display", "none");
                                that.previesListGZ();
                            })

                        } else if (that.openFlag == 'v') {
                            that.falseShowQzInfo1 = true
                            that.$nextTick(function () {
                                $('#gzspyj').hide()
                                $('#gzyj').show()
                                $('.hideSomeModelBottom').show();
                                $('.view-input input').css({'border': '0'})
                                $('.view-input input').attr('disabled', true)
                                $('.view-input .el-input__icon').css("display", "none");
                                that.previesListGZ();
                            })

                        }
                    } else if (that.businessStateCode == '43') {
                        if (that.openFlag == 'u') {
                            that.dialogFormVisibleCwEdit = true
                        } else if (that.openFlag == 'v') {
                            $('.must-input').removeClass('must-input')
                            that.dialogFormShowCwInfo = true
                            that.$nextTick(function () {
                                $('.view-input input').css('border', '0')
                                $('.view-input input').attr('disabled', true)
                                $('.view-input .el-input__icon').css("display", "none");
                            })


                        }
                    } else if (that.businessStateCode == '91') {
                        if (that.userInfo != '8') {
                            if (that.openFlag == 'u') {
                                that.dialogFormVisibleQzEdit = true
                            } else if (that.openFlag == 'v') {
                                $('.must-input').removeClass('must-input')
                                that.$nextTick(function () {
                                    $('.view-input input').css('border', '0')
                                    $('.view-input input').attr('disabled', true)
                                    $('.view-input .el-input__icon').css("display", "none");
                                })
                                that.falseShowQzInfo1 = true
                            }
                        } else {
                            if (that.openFlag == 'u') {
                            } else if (that.openFlag == 'v') {
                                $('.must-input').removeClass('must-input')
                                that.dialogFormShowCwInfo = true
                            }
                        }
                    }

                }
                that.resultData = res.data.resultData
                console.log(that.resultData);
                setTimeout(function () {
                    that.imgListPropFee = that.queryAttachImg(res.data.resultData.attachIdPropFeeTab, $(".img-list-PropFee button"));
                    console.log(that.imgListPropFee);
                }, 0)

                that.formatMoneyValue = that.formatMoney(that.resultData.apprLoanAmtMoney, 2, '')
                that.value1 = that.getForMatDate2(that.resultData.nataAppApprovalTime)
                that.value2 = that.getForMatDate2(that.resultData.mortAppTime)
                that.value3 = that.getForMatDate2(that.resultData.mortApprOrderLoanTs)
                that.getAttachDetail()

            }).catch(function (error) {
                that.$parent.dialogDestroy = false;
            });
        }
    }
</script>
<style>

    .stage-dialog-4 .edit {
        display: inline-block;
        height: 28px;
    }

    .stage-dialog-4 .textarea {
        float: left;
    }
</style>