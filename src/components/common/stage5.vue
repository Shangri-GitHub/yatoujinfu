<template>
    <div class="stage-dialog-5">
        <!--modal抵押申请审批51,52-->
        <div class="dysq">
            <el-dialog @open='dialogOpen' :show-close="false" custom-class="loan-user-edit"
                       :close-on-click-modal="false" :visible.sync="dialogFormVisible">
                <div class="modal-content">
                    <div class="edit-main">
                        <span class="close-btn" @click="unLock()"></span>
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
                        <div class="title">抵押</div>
                        <div class="content">
                            <div class="line m-time">
                                <span class="must-input">预约抵押时间</span>
                                <span>
                                     <el-date-picker class="readonly edit-input" v-model="bdDetailData.mortAppTime"
                                                     type="datetime" size="mini" format='yyyy-MM-dd HH:mm:ss'
                                                     placeholder="选择日期时间">
                                    </el-date-picker>
                                </span>
                                <span class="must-input">预约抵押联系人</span>
                                <span><el-input type="text" v-model="bdDetailData.mortAppPersion"></el-input></span>

                            </div>
                            <div class="line">
                                <span class="must-input">是否客户本人抵押</span>
                                <span>
                                    <select name="" id="mortAppIsSameone">
                                        <option value="0">是</option>
                                        <option value="1">否</option>
                                    </select>
                                </span>
                                <span class="must-input">抵押联系方式</span><span><el-input type="text"
                                                                                      v-model="bdDetailData.mortAppPhonenum"></el-input></span>
                            </div>
                            <div class="line">
                                <span class="must-input">房本携带人</span><span><el-input type="text"
                                                                                     v-model="bdDetailData.mortAppHouCarryPer"></el-input></span>
                                <span class="must-input">抵押排队人</span><span><el-input type="text"
                                                                                     v-model="bdDetailData.mortAppQueuePer"></el-input></span>
                            </div>
                            <div class="line m-time">
                                <span class="must-input">预约放款时间</span>
                                <span>
                                     <el-date-picker class="readonly edit-input"
                                                     v-model="bdDetailData.mortApprOrderLoanTs"
                                                     type="datetime" size="mini" format='yyyy-MM-dd HH:mm:ss'
                                                     placeholder="选择日期时间">
                                    </el-date-picker>
                                </span>
                            </div>
                            <div class="line0">
                                <span>抵押所需携带材料</span>
                                <div class="text-area">
                                    <el-input name="" type="textarea"
                                              v-model="bdDetailData.mortAppApprMaterial"></el-input>
                                </div>
                            </div>
                            <div class="line0 suggest">
                                <span>抵押申请审批意见</span>
                                <div class="text-area">
                                    <el-input name="" type="textarea"
                                              v-model="bdDetailData.mortAppApprOpinion"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="button">
                            <el-button :plain="true" type="info" @click="commit()">通过</el-button>
                            <el-button :plain="true" type="warning" @click="refuseDialog=true">拒单</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <!--modal抵押审批53-->
        <div class="dysp">
            <el-dialog @open='dialogOpen2' :show-close="false" custom-class="loan-user-edit"
                       :close-on-click-modal="false" :visible.sync="dialogFormVisibleEdit">
                <div class="modal-content">
                    <div class="edit-main">
                        <span class="close-btn" @click="unLock();"></span>
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
                        <div class="title">抵押</div>
                        <div class="content">
                            <div class="line ">
                                <span>预约抵押时间</span>
                                <span><input type="text" v-model="bdDetailData.mortAppTime" class="readonly"
                                             readonly></span>
                                <span>预约抵押联系人</span>
                                <span><input type="text" v-model="bdDetailData.mortAppPersion" class="readonly"
                                             readonly></span>
                            </div>
                            <div class="line">
                                <span>预约抵押联系方式</span><span><input type="text" v-model="bdDetailData.mortAppPhonenum"
                                                                  class="readonly" readonly></span>
                                <span>是否客户本人抵押</span><span><input type="text" v-model="bdDetailData.mortAppIsSameone"
                                                                  class="readonly" readonly></span>
                            </div>
                            <div class="line">
                                <span>房本携带人</span><span><input type="text" v-model="bdDetailData.mortAppHouCarryPer"
                                                               class="readonly" readonly></span>
                                <span>抵押排队人</span><span><input type="text" v-model="bdDetailData.mortAppQueuePer"
                                                               class="readonly" readonly></span>
                            </div>
                            <div class="line">
                                <span>预约放款时间</span><span><input type="text" v-model="bdDetailData.mortApprOrderLoanTs"
                                                                class="readonly" readonly></span>
                            </div>
                            <div class="line0">
                                <span>抵押所需携带材料</span>
                                <div class="text-area text-area-dy">
                                    <el-input type="textarea" name="" :rows="10" readonly class="readonly"
                                              v-model="bdDetailData.mortAppApprMaterial" readonly>
                                    </el-input>
                                </div>
                            </div>
                            <div class="up-load-content">
                                <div class="up-load">
                                    <div class="must-input">抵押受理通知单</div>
                                    <div class="up-load-bg">
                                        <form id="uploadForm" enctype="multipart/form-data" @change="upLoadTextBtn()">
                                            选择文件<i class="el-icon-upload el-icon--right"></i>
                                            <input type="file" name="uploadFile" id="files"/>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="">
                                <div class="up-load-selected">
                                </div>
                            </div>
                            <div class="down-load-content">
                                <div class="down-load">
                                    <div class="name">抵押受理通知单</div>
                                    <div class="down-load-selected">
                                    </div>
                                </div>
                            </div>
                            <div class="line0 ss-suggest">
                                <span>抵押申请审批意见</span>
                                <div class="text-area">
                                    <el-input type="textarea" name="" :rows="10"
                                              v-model="bdDetailData.mortAppApprOpinion" readonly>
                                    </el-input>
                                </div>
                            </div>
                            <div class="line0 suggest">
                                <span>抵押审批意见</span>
                                <div class="text-area">
                                    <el-input type="textarea" name="" :rows="10" v-model="bdDetailData.mortApprOpinion">
                                    </el-input>
                                </div>
                            </div>
                            <div class="line jdyy">
                                <span class="jdyy-title">拒单原因</span><span class="jdyy-con"
                                                                          v-html="bdDetailData.refuseReason"></span>
                            </div>
                        </div>
                        <div class="button">
                            <el-button :plain="true" type="info" @click="commit()">通过</el-button>
                            <el-button :plain="true" type="warning" @click="refuseDialog=true">拒单</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
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
                dialogStageCode: '',
                dialogFormVisible: false,
                dialogFormVisibleEdit: false,
                total: 0,
                curPage: 1,
                stageCode: 5,
                dataTotal: [],
                refuseReason: '',
                refuseDialog: false,
                contentTableData: [],
                bdDetailData: '',
                attrAttach: "",
                activeIndex:4
            }
        },
        methods: {
            dialogOpen() {
                $('.mortgage .dysq .el-dialog__wrapper').show().css({
                    'left': 'auto',
                    'right': '-1079px'
                }).animate({
                    right: '0'
                });
                $('.mortgage .dysq .el-dialog__wrapper').css({
                    'display': 'none'
                });
            },
            dialogOpen2() {
                $('.mortgage .dysp .el-dialog__wrapper').show().css({
                    'left': 'auto',
                    'right': '-1079px'
                }).animate({
                    right: '0'
                });
                $('.mortgage .dysp .el-dialog__wrapper').css({
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
                        that.$parent.dialogDestroy = false;
                        $(".content-bdlb").removeClass("mortgage");
                        that.$parent.handlePageChange(1);
                        that.dialogFormVisible = false;
                        that.dialogFormVisibleEdit = false;
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
                        that.$parent.dialogDestroy = false;
                        $(".content-bdlb").removeClass("mortgage");
                        that.$parent.handlePageChange(1);
                        that.dialogFormVisible = false;
                        that.dialogFormVisibleEdit = false;
                    }
                });
            },
            checkFormInfo(){
                //校验输入
                var str = "";
                if (!this.bdDetailData.mortAppTime) {
                    str = "请选择抵押时间";
                    this.showMsg(str);
                    return false;
                }
                if (!this.bdDetailData.mortAppPersion) {
                    str = "请填写抵押联系人"
                    this.showMsg(str);
                    return false;
                }
                if (!this.bdDetailData.mortAppPhonenum) {
                    str = "请填写抵押联系方式"
                    this.showMsg(str);
                    return false;
                }
                if (!this.bdDetailData.mortAppHouCarryPer) {
                    str = "请填写房本携带人"
                    this.showMsg(str);
                    return false;
                }
                if (!this.bdDetailData.mortAppQueuePer) {
                    str = "请填写抵押排队人";
                    this.showMsg(str);
                    return false;
                }
                return true;
            },
            commit(){
                if (this.bdDetailData.businessState == '52') {//抵押申请审批
                    this.commitDyAppInfo();
                } else {
                    this.commitDy();
                }
            },
            //提交抵押申请审批信息
            commitDyAppInfo(){
                var that = this, mortAppIsSameone, mortAppIsSameoneCode;
                /*that.$http.get('common/queryBasicParameterByKindCodes', {
                 params: {
                 'kindCodes': 'SFDYSQ'
                 }
                 }).then(function(res) {
                 console.log(res);
                 //that.continueLoanModeOptions = res.data.resultData.SFDYSQ;
                 })*/
                if ($('#mortAppIsSameone').get(0).selectedIndex == 0) {
                    mortAppIsSameone = "是";
                    mortAppIsSameoneCode = "1";
                } else {
                    mortAppIsSameone = "否";
                    mortAppIsSameoneCode = "2";
                }
                if (that.checkFormInfo()) {
                    var btnHttpParmas = {
                        url: "mort/saveMortgageApplyApprovalInfo",
                        params: {
                            orderHouseId: that.bdDetailData.orderHouseId,
                            mortAppTime: that.getForMatDate(that.bdDetailData.mortAppTime),
                            mortAppPerson: that.bdDetailData.mortAppPersion,
                            mortAppIsSameone: mortAppIsSameone,
                            mortAppIsSameoneCode: mortAppIsSameoneCode,
                            mortAppHouCarryPer: that.bdDetailData.mortAppHouCarryPer,
                            mortAppQueuePer: that.bdDetailData.mortAppQueuePer,
                            mortAppApprMaterial: that.bdDetailData.mortAppApprMaterial,
                            mortAppApprOpinion: that.bdDetailData.mortAppApprOpinion,
                            mortAppPhonenum: that.bdDetailData.mortAppPhonenum,
                            mortApprOrderLoanTs: that.getForMatDate(that.bdDetailData.mortApprOrderLoanTs),
                        }
                    }
                    that.$http.post(btnHttpParmas.url,
                            btnHttpParmas.params
                    ).then(function (res) {
                        if (res.data.respCode == '000000') {
                            that.showSuccessMsg("保存");
                        } else {
                            that.showFailMsg("保存");
                        }
                    });
                }
            },
            commitDy(){
                var that = this;
                //提交抵押审批信息
                //校验受理通知单必填
                if (typeof String.prototype.endsWith != 'function') {
                    String.prototype.endsWith = function (suffix) {
                        return this.indexOf(suffix, this.length - suffix.length) !== -1;
                    };
                }
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
                var btnHttpParmas = {
                    url: "mort/saveMortgageApprovalInfo",
                    params: {
                        orderHouseId: that.bdDetailData.orderHouseId,
                        attachIdAcceptNotice: that.attrAttach,
                        mortApprOpinion: that.bdDetailData.mortApprOpinion
                    }
                }
                that.$http.post(btnHttpParmas.url,
                        btnHttpParmas.params
                ).then(function (res) {
                    if (res.data.respCode == '000000') {
                        that.showSuccessMsg("保存");
                    } else {
                        that.showFailMsg("保存");
                    }
                });
            },
            //提示校验信息
            showMsg(msg){
                this.$message({
                    message: msg,
                    type: 'warning',
                    duration: "1500",
                });
            },
            unLock(){
                var that = this;
                if (this.openFlag == 'u') {
                    this.$http.post("order/unlockOrder", {
                        'orderHouseId': that.bdDetailData.orderHouseId,
                    }).then(function (res) {
                    });
                }
                this.dialogFormVisible = false;
                this.dialogFormVisibleEdit = false;
                this.$parent.dialogDestroy = false;
                $(".content-bdlb").removeClass("mortgage");
            },
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
                $("#uploadForm").html("选择文件<i class='el-icon-upload el-icon--right'></i><input type='file' name='uploadFile' id='files'/>")
            }
        },
        props: ['orderHouseId', 'openFlag', 'businessStateCode'],
        mounted: function () {
            $(".content-bdlb").addClass("mortgage");
            var that = this;
            this.$http.get("order/queryOrderDetailByOrderHouseId", {
                params: {
                    'flag': that.openFlag,
                    'orderHouseId': that.orderHouseId,
                }
            }).then(function (res) {
                if (res.data.respCode == '000010') {
                    that.showMsg("报单已锁定，请稍后尝试编辑！");
                    that.$parent.dialogDestroy = false;
                } else {
                    that.bdDetailData = res.data.resultData;
                    if (!that.bdDetailData.mortAppApprMaterial) {
                        that.bdDetailData.mortAppApprMaterial = "1、客户本人抵押，需携带房本、身份证；\n2、非客户本人抵押，携带房本"
                    }
                    that.bdDetailData.mortAppTime = that.getForMatDate(that.bdDetailData.mortAppTime);
                    that.bdDetailData.mortApprOrderLoanTs = that.getForMatDate(that.bdDetailData.mortApprOrderLoanTs);
                    that.$nextTick(function () {
                        if (that.businessStateCode == "53") {
                            that.dialogFormVisibleEdit = true;
                            setTimeout(function () {
                                $(".dysp textarea").attr("disabled", "true");
                                $(".jdyy,.down-load-content").css("display", "none");
                                if (that.openFlag == "u") {
                                    $(".dysp .order-infor .up-load-content,.dysp .order-infor .suggest,.dysp .button,.ss-suggest").css("display", "block");
                                    $(".dysp .button").css("display", "flex");
                                    $(".suggest textarea").removeAttr("disabled");
                                }
                                if (that.openFlag == "v") {
                                    $('.must-input').removeClass('must-input')
                                    $(".ss-suggest").css("display", "block");
                                    $(".dysp .order-infor .up-load-content,.dysp .order-infor .suggest,.dysp .button,.up-load-selected").css("display", "none");
                                }
                            })
                        }
                        if (that.businessStateCode == "52" || that.businessStateCode == '51') {
                            setTimeout(function () {
                                if (that.openFlag == "u") {
                                    that.dialogFormVisible = true;
                                    $(".dysq .suggest,.dysq .button,.m-time .el-input__icon").css("display", "block");
                                    $(".dysq .button").css("display", "flex");
                                    $(".dysq input,.dysq textarea,.dysq select").removeClass("readonly").attr("readonly", false).removeAttr("disabled");
                                    $(".jdyy,.down-load-content").css("display", "none");
                                    setTimeout(function () {
                                        if (that.bdDetailData.mortAppIsSameone == '是') {
                                            $('#mortAppIsSameone').get(0).selectedIndex = 0;
                                        } else {
                                            $('#mortAppIsSameone').get(0).selectedIndex = 1;
                                        }
                                    })
                                }
                                if (that.openFlag == "v") {
                                    $('.must-input').removeClass('must-input')
                                    that.dialogFormVisibleEdit = true;
                                    setTimeout(function () {
                                        if (that.openFlag == "v") {
                                            $(".dysp .order-infor .up-load-content,.dysp .order-infor .suggest,.dysp .button,.up-load-selected,.ss-suggest").css("display", "none");
                                            $(".jdyy,.down-load-content").css("display", "none");
                                            $(".dysp textarea").attr("disabled", "true");
                                        }
                                    })
                                }
                            })
                        }
                        if (that.businessStateCode == "91") {
                            that.dialogFormVisibleEdit = true;
                            setTimeout(function () {
                                if (that.openFlag == "v") {
                                    $('.must-input').removeClass('must-input')
                                    $(".jdyy").css("display", "block");
                                    $(".dysp .order-infor .up-load-content,.dysp .order-infor .suggest,.dysp .button,.up-load-selected,.ss-suggest,.down-load-content").css("display", "none");
                                    $(".dysp textarea").attr("disabled", "true");
                                }
                            })
                        }
                        if (that.businessStateCode > 53 && that.businessStateCode != 91 ) {
                            that.activeIndex = res.data.resultData.stageCode - 1;
                            that.dialogFormVisibleEdit = true;
                            that.$nextTick(function () {
                                setTimeout(function () {
                                    $(".dysp textarea").attr("disabled", "true");
                                    $(".jdyy").css("display", "none");
                                    $('.must-input').removeClass('must-input')
                                    $(".suggest,.ss-suggest,.down-load-content").css("display", "block");
                                    $(".dysp .order-infor .up-load-content,.dysp .button,.up-load-selected").css("display", "none");
                                    //下载文件
                                    var filesArr = that.bdDetailData.attachIdAcceptNotice.split(",");
                                    $(filesArr).each(function (index, ele) {
                                        that.$http.get("common/queryAttachByAttachId", {
                                            params: {
                                                attachId: ele
                                            }
                                        }).then(function (res) {
                                            $(".down-load-selected").append("<div> <a href=" + that.$http.defaults.baseURL + "common/downloadPdf?attachId=" + ele + " >" + res.data.resultData.attachName + "</a>（点击可下载）</div>")
                                        });
                                    })
                                })
                            })
                        }
                    });

                }
            }).catch(function (error) {
                that.$parent.dialogDestroy = false;
            });
        }
    }
</script>