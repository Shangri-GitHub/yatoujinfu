<template>
    <div class="loan-user">
        <div class="top">
            <ul class="bdlb-top-ul bdlb-top-ul-list">
                <li>
                    <span>信贷员姓名</span>
                    <input type="text" class="order-code" v-model="loanUserName"/>
                </li>
                <li>
                    <span>手机号</span>
                    <input type="text" class="order-code" v-model="loanUserTel"/>
                </li>
            </ul>
            <!--<div class="bdlb-top-more-btn" @click='bdlbShowMore'>更多</div>-->
            <button class="dblb-search-btn dblb-btn" @click="getLoadListData">查询</button>
            <button class="dblb-reset-btn dblb-btn" @click="resetLoadListData">重置</button>
            <!--<div class="bdlb-top-more">
                <ul>
                    <li>
                        <span>报单编号</span>
                        <input type="text" class="order-code"/>
                    </li>
                    <li>
                        <span>报单提交开始时间</span>
                        <input type="text" class="order-code"/>
                    </li>
                    <li>
                        <span>报单提交结束时间</span>
                        <input type="text" class="order-code"/>
                    </li>
                </ul>
            </div>-->
        </div>
        <div class="bottom">
            <div class="bdlb-data-box">
                <el-table :data="contentTableData" border style="width:100%;">
                    <el-table-column prop="saleNameC" label="信贷员姓名" width='180'>
                    </el-table-column>
                    <el-table-column prop="saleMobile" label="手机号" width='320' show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="orderCount" label="报单数" width='140'>
                    </el-table-column>
                    <el-table-column prop="cash" label="已返点金额（元）" width='200'>
                    </el-table-column>
                    <el-table-column prop="score" label="已赠送积分" width='150'>
                    </el-table-column>
                    <el-table-column prop="operate" align="center" label="操作">
                        <template scope="scope">
                            <span class="info-icon"></span>
                            <el-button type="text" size="small" @click="getThisDetailData(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination small @current-change="handleCurrentChange" :current-page="curPage" :page-size="10"
                               layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <!--modal查看-->
        <div>
            <el-dialog @open='dialogOpen' :show-close="false" custom-class="loan-user-edit"
                       :close-on-click-modal="false"
                       :visible.sync="dialogFormVisible">
                <div class="modal-content">
                    <div class="edit-main">
                        <span class="close-btn" @click="closeDetailLoanUser"></span>
                    </div>
                    <div class="order-infor">
                        <div class="title">信贷员基本信息</div>
                        <div class="content">
                            <div class="line">
                                <span>信贷员姓名</span><span>{{detailItemId.saleNameC}}</span>
                                <span>手机号码</span><span>{{detailItemId.saleMobile}}</span>
                                <span>城市</span><span>{{detailItemId.adrRegionName}}</span>
                            </div>
                            <div class="line">
                                <span>身份证</span><span>{{detailItemId.id}}</span>
                                <span>开户行</span><span style=" width: 500px;">{{detailItemId.openBank}}</span>
                            </div>
                            <div class="line">
                                <span>银行卡卡号</span><span>{{detailItemId.bankId}}</span>
                                <span>已赠送积分</span><span>{{detailItemId.score}}</span>
                                <span>已返点金额（元）</span><span>{{detailItemId.cash}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="loan-user-t" >
                        <div class="title bd">报单记录</div>
                        <div class="content">
                            <div class="top">
                                <ul class="bdlb-top-ul">
                                    <li>
                                        <span>报单提交开始时间</span>
                                        <!--<input type="text" class="order-code"/>-->
                                        <span>
                                            <el-date-picker
                                                    v-model="dateValueS"
                                                    type="datetime"
                                                    size="mini"
                                                    placeholder="选择日期时间">
                                            </el-date-picker>
                                        </span>
                                    </li>
                                    <li>
                                        <span>报单提交结束时间</span>
                                        <!--<input type="text" class="order-code"/>-->
                                        <span>
                                            <el-date-picker
                                                    v-model="dateValueD"
                                                    type="datetime"
                                                    size="mini"
                                                    placeholder="选择日期时间">
                                        </el-date-picker>
                                        </span>
                                    </li>
                                    <li class="bd-sslected-list" >
                                        <span>报单状态</span>
                                        <span class="reload-select">
                                             <el-select v-model="loanUserBdSelect" placeholder="全部" >
                                                 <el-option
                                                         v-for="item in options"
                                                         :key="item.value"
                                                         :label="item.label"
                                                         :value="item.value">
                                                 </el-option>
                                             </el-select>
                                        </span>
                                    </li>
                                    <button class="dblb-search-btn dblb-btn" @click="getLoanUserBd()">查询</button>
                                </ul>
                                <!--<div class="bdlb-top-more-btn" @click='bdlbShowMore'>更多</div>-->
                                <!--<button class="dblb-reset-btn dblb-btn">重置</button>-->
                                <div class="bdlb-top-more">
                                    <ul>
                                        <li>
                                            <span>报单编号</span>
                                            <input type="text" class="order-code"/>
                                        </li>
                                        <li>
                                            <span>报单提交开始时间</span>
                                            <input type="text" class="order-code"/>
                                        </li>
                                        <li>
                                            <span>报单提交结束时间</span>
                                            <input type="text" class="order-code"/>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="bottom">
                                <div class="bdlb-data-box">
                                    <el-table :data="tableDataDetail" border style="width:100%;">
                                        <el-table-column prop="orderHouseCode" label="报单编码" width='150'>
                                        </el-table-column>
                                        <el-table-column prop="houAddr" label="房产地址" width='200' show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="saleNameC" label="信贷员姓名" width='120'>
                                        </el-table-column>
                                        <el-table-column prop="regTime" label="提交时间" width='200'>
                                        </el-table-column>
                                        <el-table-column prop="balance" label="返点金额（元）" width='140'>
                                        </el-table-column>
                                        <!--  <el-table-column prop="score" label="赠送积分" width='100'>
                                          </el-table-column>-->
                                        <el-table-column prop="businessState" label="报单状态">
                                        </el-table-column>
                                    </el-table>
                                    <el-pagination small @current-change="handleCurrentChangeDetail"
                                                   :current-page="curPageNum"
                                                   :page-size="6"
                                                   layout="total,prev, pager, next, jumper" :total="totalNum">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                curPage: 1,
                curPageNum: 1,
                dialogFormVisible: false,
                dialogFormVisibleEdit: false,
                dialogAppointVisible: false,
                total: 0,
                totalNum: 0,
                tableData: [],
                tableDataDetail: [],
                detailItemId: "",
                dateValueS: "",
                dateValueD: "",
                loanUserName: "",
                loanUserTel: "",
                options: [
                    {
                        value: '-1',
                        label: '全部'
                    }, {
                        value: '11',
                        label: '初评'
                    }, {
                        value: '21',
                        label: '询值完毕'
                    }, {
                        value: '22',
                        label: '待指派'
                    }, {
                        value: '23',
                        label: '下户申请时间确认'
                    }, {
                        value: '24',
                        label: '待下户面审'
                    },
                    {
                        value: '25',
                        label: '材料确认'
                    }, {
                        value: '31',
                        label: '待批贷'
                    }, {
                        value: '41',
                        label: '公证申请'
                    }, {
                        value: '42',
                        label: '公证申请时间确认'
                    }, {
                        value: '43',
                        label: '前期费用'
                    }, {
                        value: '44',
                        label: '公证'
                    }, {
                        value: '51',
                        label: '抵押申请'
                    }, {
                        value: '52',
                        label: '抵押申请时间确认'
                    }, {
                        value: '53',
                        label: '抵押'
                    }, {
                        value: '61',
                        label: '待放款'
                    }, {
                        value: '71',
                        label: '待返点'
                    }, {
                        value: '81',
                        label: '已完成'
                    }, {
                        value: '91',
                        label: '拒单'
                    }
                ],
                loanUserBdSelect: "",
                searching: false,
                detailSearching: false,
                loanUserName: '',
                loanUserTel: '',
                contentTableData: [],
                nowPage: 1,
            }
        },
        methods: {
            handleCurrentChange(val){
                this.nowPage = val;//记录当前打开的是第几页
                var that = this;
                that.curPage = val;
                if (that.searching) {
                    var params = {
                        td: 'contentTableData',
                        tt: 'total',
                        url: 'sale/querySaleList',
                        data: {
                            currentPage: val,
                            pageSize: 10,
                            saleNameC: this.loanUserName,
                            saleMobile: this.loanUserTel,
                        }
                    }
                    this.getDetailData(params)
                } else {
                    var params = {
                        sc: this.stageCode,
                        td: 'contentTableData',
                        tt: 'total',
                        val: val,
                        ps: 10,
                        url: 'sale/querySaleList'
                    }
                    this.getData(params)
                }
            },
            handleCurrentChangeDetail(val){
                this.curPageNum = val;
                if (this.detailSearching) {
                    var params = {
                        td: 'tableDataDetail',
                        tt: 'totalNum',
                        url: 'order/querySaleOrderListByParam',
                        data: {
                            currentPage: val,
                            pageSize: 6,
                            saleId: this.detailItemId.saleId,
                            regStartTime: this.getForMatDate(this.dateValueS),
                            regEndTime: this.getForMatDate(this.dateValueD),
                            busiState: this.loanUserBdSelect || -1
                        }
                    }
                    this.getDetailData(params)
                } else {
                    var params = {
                        td: 'tableDataDetail',
                        tt: 'totalNum',
                        url: 'order/querySaleOrderListByParam',
                        data: {
                            currentPage: val,
                            pageSize: 6,
                            saleId: this.detailItemId.saleId,
                        }
                    }
                    this.getDetailData(params)

                }
            },
            closeDetailLoanUser(){
                this.dialogFormVisible = false;
                this.handleCurrentChange(this.nowPage);
                $(".el-select-dropdown__item").removeClass("selected")//初始化下拉框
            },
            bdlbShowMore() {
                if ($('.bdlb-top-more').css('display') == 'none') {
                    $(".bottom").animate({
                        marginTop: '152px'
                    })
                    setTimeout(function () {
                        $('.bdlb-top-more').slideDown()
                    }, 200)
                } else {
                    $('.bdlb-top-more').slideUp()
                    setTimeout(function () {
                        $(".bottom").animate({
                            marginTop: '78px'
                        })
                    }, 200)
                }

            },
            dialogOpen() {
                $('.content-bdlb .el-dialog__wrapper').show().css({
                    'left': 'auto',
                    'right': '-1079px'
                }).animate({
                    right: '0'
                });
                $('.content-bdlb .el-dialog__wrapper').css({
                    'display': 'none'
                });
            },
            //打开详情页，初始化数据
            getThisDetailData(e){
                this.dialogFormVisible = true;
                this.loanUserBdSelect="";//初始化下拉框
                this.$nextTick(function () {
                    $(".bd-sslected-list .reload-select input").val("");//初始化下拉框
                })
                //信贷员详情
                this.detailItemId = e;
                this.curPageNum = 1;
                //信贷员报单列表初始化
                var params = {
                    td: 'tableDataDetail',
                    tt: 'totalNum',
                    url: 'order/querySaleOrderListByParam',
                    data: {
                        currentPage: 1,
                        pageSize: 6,
                        saleId: this.detailItemId.saleId,
                    }
                }
                this.getDetailData(params)
            },
            //信贷员报单列表查询
            getLoanUserBd(){
                this.curPageNum = 1;
                this.detailSearching = true;
                var initParamsList = {
                    td: 'tableDataDetail',
                    tt: 'totalNum',
                    url: 'order/querySaleOrderListByParam',
                    data: {
                        currentPage: 1,
                        pageSize: 6,
                        saleId: this.detailItemId.saleId,
                        regStartTime: this.getForMatDate(this.dateValueS),
                        regEndTime: this.getForMatDate(this.dateValueD),
                        busiState: this.loanUserBdSelect || -1
                    }
                }
                this.getDetailData(initParamsList);//信贷员报单列表
            },
            //信贷员列表查询
            getLoadListData(){
                this.curPage = 1;
                this.searching = true;
                var params = {
                    td: 'contentTableData',
                    tt: 'total',
                    val: 1,
                    ps: 10,
                    url: 'sale/querySaleList',
                    data: {
                        currentPage: 1,
                        pageSize: 10,
                        saleNameC: this.loanUserName,
                        saleMobile: this.loanUserTel
                    }
                }
                this.getDetailData(params);
            },
            //信贷员列表重置
            resetLoadListData(){
                this.curPage = 1;
                this.searching = false;
                this.loanUserName = "";
                this.loanUserTel = "";
                var params = {
                    td: 'contentTableData',
                    tt: 'total',
                    val: 1,
                    ps: 10,
                    url: 'sale/querySaleList',
                    saleNameC: "",
                    saleMobile: "",
                    data: {
                        currentPage: 1,
                        pageSize: 10,
                        saleNameC: "",
                        saleMobile: ""
                    }
                }
                this.getDetailData(params);
            }
        },
        mounted: function () {
            //初始化信贷员列表
            var params = {
                sc: this.stageCode,
                td: 'contentTableData',
                tt: 'total',
                val: 1,
                ps: 10,
                url: 'sale/querySaleList'
            }
            this.getData(params)
        }
    }
</script>

<style scope>
    .bd-sslected-list .el-select {
        line-height: 38px;
    }

    /*详情*/
    .el-picker-panel__content {
        margin-top: 0;
        margin-bottom: 0;
    }

    .el-select-dropdown__list {
        padding: 0;
    }

    /* .el-select .el-input .el-input__icon{
         top:45px;
     }*/
    /*.el-select-dropdown {
        top: 307px !important;
    }*/
    .loan-user .el-table tbody tr td:last-child {
        text-align: center;
    }

    .loan-user .bd-sslected-list input {
        float: none !important;
    }

    .loan-user input {
        width: 80%;
        /*height: 65%;*/
        display: inline-block;
    }

    .loan-user .button {
        display: flex;
        justify-content: space-between;
        width: 466px;
        margin: 0 auto;
    }

    .loan-user .order-infor {
        margin: 0px 14px 20px 14px;
        background-color: #fff;
    }

    .loan-user .order-infor .content {
        padding-left: 61px;
        padding-top: 12px;
    }

    .loan-user .line {
        /*height: 28px;*/
    }

    .loan-user .title {
        height: 26px;
        line-height: 26px;
        color: #fff;
        background: url("../../theme/default/images/nav/longbg.png") no-repeat 0 center;
        position: relative;
        padding-left: 45px;
    }

    .loan-user .title:after {
        content: "";
        position: absolute;
        display: inline-block;
        width: 20px;
        height: 20px;
        left: 20px;
        top: 2px;
    }

    .loan-user .modal-content .title:nth-child(1):after {
        background: url("../../theme/default/images/nav/loan-user.png") no-repeat 0px center;
    }

    .loan-user .modal-content .title.bd:after {
        background: url("../../theme/default/images/nav/loan-list.png") no-repeat 0px center;
    }

    .loan-user .order-infor {
        height: 140px;
    }

    .loan-user .evaluation-one {
        height: 135px;
    }

    .loan-user .loan-user-t {
        height: 410px;
    }

    .loan-user .line span {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        float: left;
    }

    .loan-user .line span:nth-child(1) {
        width: 100px;
        color: #666;
    }

    .loan-user .line span:nth-child(2) {
        width: 230px;
        color: #333;
    }

    .loan-user .line span.bulid-org {
        width: 500px;
    }

    .loan-user .line span:nth-child(3) {
        width: 110px;
        color: #666;
    }

    .loan-user .line span:nth-child(4) {
        width: 205px;
        color: #333;
    }

    .loan-user .line span:nth-child(5) {
        width: 120px;
        color: #666;
    }

    .loan-user .loan-user-t .line span:nth-child(5) {
        width: 130px;
    }

    .loan-user .line span:nth-child(6) {
        width: 150px;
        color: #333;
    }

    .loan-user .line0 {
        margin-top: 4px;
        height: 90px;
    }

    .loan-user .line0 .my-slider, .line0 span {
        display: inline-block;
        float: left;
        height: 80px;
    }

    .loan-user .line0 span {
        vertical-align: top;
        width: 100px;
    }

    .loan-user .my-slider {
        width: 674px;
        height: 80px;
        position: relative;
        margin-top: 5px;
    }

    .loan-user .loan-user-t .my-slider {
        width: 540px;
    }

    .loan-user .my-slider .left, .my-slider .right {
        position: absolute;
        width: 30px;
        height: 30px;
        top: 50%;
        transform: translate(0, -50%);
    }

    .loan-user .my-slider .left {
        left: -30px;
    }

    .loan-user .my-slider .right {
        background: url("../../theme/default/images/nav/right.png") no-repeat;
        right: -30px;
    }

    .loan-user .my-slider .area {
        width: 120px;
        height: 80px;
        background-color: #E5E5E5;
        float: left;
    }

    /*——————————————————————*/
    .loan-user {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }

    .loan-user .modal-content {
        width: 100%;
    }

    .loan-user .loan-user-edit {
        width: 100%;
        top: 0 !important;
        bottom: 0;
        right: 0;
        padding: 0;
        margin: 0;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .loan-user-t .title {
        margin-left: 14px;
    }

    .loan-user .el-dialog__wrapper {
        width: 1079px;
        height: 100%;
        position: absolute;
        left: auto;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .loan-user .el-dialog__header {
        display: none;
    }

    .loan-user .el-dialog__body {
        padding: 0;
    }

    .loan-user .el-table__body-wrapper {
        overflow-x: hidden;
    }

    .loan-user .bdlb-data-box {
        width: 98%;
        height: auto;
        margin: 0 auto;
        overflow-x: auto;
    }

    .loan-user .bdlb-top-more {
        width: 100%;
        height: 48px;
        display: none;
        position: absolute;
        top: 76px;
        left: 0;
        background: #fff;
    }

    .loan-user .bdlb-top-more ul {
        width: 960px;
        height: 48px;
        margin-left: 176px;
    }

    .loan-user .bdlb-top-more ul li {
        float: left;
        width: auto;
        height: 48px;
    }

    .loan-user .bdlb-top-more ul li span {
        float: left;
        line-height: 48px;
    }

    .loan-user .bdlb-top-more ul li input {
        margin-top: 10px;
    }

    .loan-user .loan-user {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 0;
        position: relative;
    }

    .loan-user .top {
        width: 100%;
        height: 76px;
        z-index: 997;
        box-sizing: border-box;
        background: #fff;
    }

    .loan-user .bottom {
        width: 100%;
        height: 100%;
    }

    .loan-user .top .bdlb-top-ul {
        width: 930px;
        height: 100%;
        float: left;
    }

    .loan-user .loan-user-t .top .bdlb-top-ul {
        width: 100%;
        margin-left: 25px;
    }

    .loan-user .loan-user-t .dblb-btn {
        margin-left: 36px;
    }

    .loan-user .top .bdlb-top-ul-list input {
        margin-left: 15px;
    }

    .loan-user .top .bdlb-top-ul-list span {
        margin-left: 20px;
    }

    .loan-user .top .bdlb-top-ul li {
        width: auto;
        float: left;
        height: 76px;
        font-size: 14px;
        line-height: 76px;
    }

    .loan-user .top .bdlb-top-ul li:last-child {
        margin-left: 50px;
    }

    .loan-user .top li span {
        float: left;
        width: auto;
        margin-left: 13px;
    }

    .loan-user .top li input, .loan-user .top li select {
        width: 228px;
        height: 28px;
        float: left;
        margin-top: 24px;
        /*margin-left: 16px;*/
        border: 1px solid #ccc;
        text-indent: 4px;
        padding-right: 0px;
        padding-bottom: 0;
    }

    .loan-user .loan-user-t li input {
        width: 98%;

    }

    .loan-user .loan-user-t .el-input__icon {
        top: 38px;
        height: 12px;
    }

    .loan-user .loan-user-t .el-date-editor .el-input__icon {
        top: 32px;
    }

    .loan-user .bdlb-top-more-btn {
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

    .loan-user .el-pagination {
        margin-bottom: 28px;
        /*box-sizing: border-box;
        padding-left: 50%;*/
        display: flex;
        justify-content: flex-end;
    }

    .loan-user .el-pager li {
        width: 28px;
    }

    /*modal*/
    .loan-user .edit-main {
        width: 100%;
        height: 30px;
        position: relative;
        z-index: 1001;
        background: #fff;
        box-sizing: border-box;
        padding: 0 14px 28px 14px;
    }

    .loan-user .close-btn {
        width: 24px;
        height: 24px;
        position: absolute;
        left: 0;
        background: #ccc url(../../theme/default/images/nav/close.png) no-repeat center;
        background-size: 12px 12px;
    }

    .loan-user .check-status-ul {
        width: 100%;
        height: 98px;
        float: left;
        box-sizing: border-box;
        padding: 20px 0 0 10px;
        display: flex;
        justify-content: center;
    }

    .loan-user .check-status {
        width: 64px;
        height: 98px;
        float: left;
        position: relative;
    }

    .loan-user .check-status:not(:last-child):before {
        content: "------------";
        display: inline-block;
        position: absolute;
        top: 13px;
        right: -80px;
    }

    .loan-user .check-status:not(:first-child) {
        margin-left: 78px;
    }

    .loan-user .check-status span {
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

    .loan-user .check-status.through span {
        background: #fc511f url(../../theme/default/images/nav/duigou.png) no-repeat center;
    }

    .loan-user .check-status p {
        width: 100%;
        height: auto;
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        color: #333;
        font-family: "微软雅黑";
    }

    .dblb-btn {
        color: #6a6a6a;
        border: 1px solid #838383;
        background: #fff;
        cursor: pointer;
    }

    .dblb-btn {
        width: 80px;
        height: 28px;
        float: left;
        margin-left: 16px;
        margin-top: 26px;
        font-size: 14px;
        border-radius: 2px;
        border: 1px solid rgb(191, 203, 217);
        color: rgb(31, 45, 61);
    }

    .dblb-search-btn:hover {
        background: #fff;
        border-color: #50BFFF;
        color: #50BFFF;
    }

    .dblb-reset-btn:hover {
        background: #fff;
        border-color: #f7ba2a;
        color: #f7ba2a;
    }
</style>