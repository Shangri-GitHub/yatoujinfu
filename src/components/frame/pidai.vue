<template>
    <div class="content-pd">

        <search flag='3' :curPage='curPage' tableData='contentTableData'></search>
        <div class="bottom">
            <div class="pd-data-box">
                <el-table :data="contentTableData" :empty-text='emptyText' border style="width:100%;"
                          highlight-current-row @cell-click='getThisDetailDataFC'>
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
                            <span class="edit-icon"
                                  v-if='scope.row.businessStateCode=="31"'></span>
                            <el-button type="text" size="small" @click="dialogFormVisibleEdit = true;"
                                       v-if='scope.row.businessStateCode=="31"'>
                                编辑
                            </el-button>
                            <span class="info-icon"></span>
                            <el-button type="text" @click="dialogFormVisibleEdit = true;" size="small">
                                查看
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination small @current-change="handlePageChange" :current-page="1" :page-size="10"
                               layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <!--modal编辑-->
        <component v-bind:is="dialogStageCode" :orderHouseId='orderHouseId' :openFlag='openFlag'
                   :businessStateCode='businessStateCode' v-if='dialogDestroy'></component>
        <div class="big-img">
            <div class="big-img-content">
                <div class="title-img" @click="closeBigImg()">
                </div>
                <img src="">
                <div class="tool-img">
                    <div class="tb-left" @click="rotateImgLeft()"></div>
                    <div class="tb-right" @click="rotateImgRight()"></div>
                    <div class="tb-small" @click="changSmallImg()"></div>
                    <div class="tb-big" @click="changBigImg()"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                emptyText: '加载中',
                total: 0,
                userId: '',
                curPage: 1,
                stageCode: 3,
                dataTotal: [],
                bdDetailData: [],
                contentTableData: [],
                dialogStageCode: '',
                orderHouseId: '',
                businessStateCode: '',
                dialogDestroy: false,
                searching: false,
                orderHouseCode: '',
                saleName: '',
                startTime: '',
                endTime: ''
            }
        },
        methods: {
            handlePageChange(val) {
                var that = this;
                that.curPage = val;
                if (that.searching) {
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
            closeBigImg() {
                this.closeThisImg();
            },
            changSmallImg() {
                this.changeImg($(".big-img-content img"), -10);
            },
            changBigImg() {
                this.changeImg($(".big-img-content img"), 10);
            },
            rotateImgLeft(){
                this.rotateImg($(".big-img-content img"), -90);
            },
            rotateImgRight(){
                this.rotateImg($(".big-img-content img"), 90);
            },
            getThisDetailDataFC(e, b, c, a) {
                a = event ? event : window.event;
                var str = a.target.innerText.replace(/^\s+|\s+$/g, "");
                var that = this;
                that.businessStateCode = e.businessStateCode;
                that.orderHouseId = e.orderHouseId;
                if (b.property == 'operate') {
                    if (str == "编辑") {
                        that.openFlag = 'u';
                        that.dialogStageCode = 'stage3'
                        that.dialogDestroy = true;
                    } else if (str == "查看") {
                        that.openFlag = 'v';
                        that.dialogStageCode = 'stage3'
                        that.dialogDestroy = true;
                    }
                }
            },
            pdShowMore() {
                if ($('.pd-top-more').css('display') == 'none') {
                    $(".bottom").animate({
                        marginTop: '78px'
                    })
                    setTimeout(function () {
                        $('.pd-top-more').slideDown()
                    }, 200)
                } else {
                    $('.pd-top-more').slideUp()
                    setTimeout(function () {
                        $(".bottom").animate({
                            marginTop: '0'
                        })
                    }, 200)
                }

            },
        },
        mounted: function () {
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
    }
</script>

<style scope>
    /*详情*/

    .content-pd-edit textarea {
        background: #fff !important;
    }

    #swiper-box {
        width: 100px;
        height: 100px;
        overflow: hidden;
        background: red;
    }

    #swiper-box .swiper-slide {
        width: 90%;
        background: yellow;
        height: 100%;
        float: left;
    }

    .content-pd input.readonly {
        outline-style: none;
        border: none;
        background-color: #ffffff;
    }

    .content-pd input.edit {
        background-color: #ffffff;
    }

    .content-pd input {
        width: 80%;
        display: inline-block;
        color: #333333;
    }

    .content-pd .button {
        display: flex;
        justify-content: space-between;
        width: 466px;
        margin: 0 auto;
    }

    .content-pd .button .el-button {
        width: 94px;
        border-radius: 2px;
    }

    .content-pd .order-infor,
    .evaluation-one,
    .content-pd-t {
        margin: 0px 14px 20px 14px;
        background-color: #ffffff;
    }

    .content-pd .order-infor .content,
    .evaluation-one .content,
    .content-pd-t .content {
        padding-left: 50px;
        padding-top: 12px;
    }

    .content-pd .title {
        height: 26px;
        line-height: 26px;
        color: #fff;
        background: url("../../theme/default/images/nav/longbg.png") no-repeat 0 center;
        position: relative;
        padding-left: 45px;
    }

    .content-pd .title:after {
        content: "";
        position: absolute;
        display: inline-block;
        width: 20px;
        height: 20px;
        left: 20px;
        top: 2px;
    }

    .content-pd .modal-content .title:nth-child(1):after {
        background: url("../../theme/default/images/nav/order-info.png") no-repeat 0px center;
    }

    .content-pd .modal-content .title:nth-child(2):after {
        background: url("../../theme/default/images/nav/chuping.png") no-repeat 0px center;
    }

    .content-pd .modal-content .title:nth-child(3):after {
        background: url("../../theme/default/images/nav/xiahu.png") no-repeat 0px center;
    }

    .content-pd .order-infor {
        height: auto;
    }

    .content-pd .evaluation-one {
        /*height: 150px;*/
    }

    .content-pd .content-pd-t {
        height: auto;
        padding-bottom: 72px;
    }

    .content-pd .modal-content .content-pd-edit {
        height: auto;
        padding-bottom: 32px;
    }

    .content-pd .line span {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        margin-top: 8px;
    }

    .content-pd .line span:nth-child(1) {
        width: 100px;
    }

    .content-pd .line span:nth-child(2) {
        width: 200px;
    }

    .content-pd-edit .line span:nth-child(2) {
        width: 230px;
    }

    .content-pd .line span.bulid-org {
        width: 500px;
    }

    .content-pd .line span:nth-child(3) {
        width: 110px;
    }

    .content-pd .line span:nth-child(4) {
        width: 240px;
    }

    .content-pd .line span:nth-child(5) {
        width: 80px;
    }

    .content-pd .content-pd-t .line span:nth-child(5) {
        width: 130px;
    }

    .content-pd .line span:nth-child(6) {
        width: 180px;
    }

    .content-pd .line0 {
        margin-top: 4px;
        height: 90px;
    }

    .content-pd-edit .line {
        margin-top: 8px;
    }

    .content-pd-edit .line input,
    .content-pd-edit .line select {
        width: 180px;
        height: 28px;
        line-height: 28px;
        background: #fff;
    }

    .content-pd-edit .line-text .text-area-edit {
        width: 500px !important;
        height: auto;
    }

    .content-pd .line0 .my-slider,
    .line0 span {
        display: inline-block;
        float: left;
        height: 80px;
    }

    .content-pd .line0 span {
        vertical-align: top;
        width: 100px;
    }

    .content-pd .my-slider {
        width: 734px;
        height: 80px;
        position: relative;
        margin-top: 5px;
        overflow: hidden;
    }

    .content-pd .my-slider .swiper-slide {
        width: 674px !important;
        height: 100%;
        padding: 0 30px;
    }

    .content-pd .my-slider .swiper-wrapper {
        width: 674px;
        height: 80px;
    }

    .content-pd .my-slider .left,
    .content-pd .my-slider .right {
        position: absolute;
        width: 30px;
        height: 100%;
        top: 50%;
        transform: translate(0, -50%);
        z-index: 999;
    }

    .content-pd .my-slider .left {
        left: 0px;
        background: #ffffff url("../../theme/default/images/nav/left.png") no-repeat center center;
    }

    .content-pd .my-slider .right {
        background: #ffffff url("../../theme/default/images/nav/right.png") no-repeat center center;
        right: 0px;
    }

    .content-pd .my-slider .area {
        width: 130px;
        height: 80px;
        background-color: #E5E5E5;
        float: left;
    }

    /*——————————————————————*/

    .content-pd {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }

    .content-pd .modal-content {
        width: 100%;
    }

    .content-pd .loan-user-edit {
        width: 100%;
        top: 0 !important;
        bottom: 0;
        right: 0;
        padding: 0;
        margin: 0;
    }

    .content-pd .el-dialog__wrapper {
        width: 1079px;
        /*height: 100%;*/
        position: absolute;
        background: #fff;
        left: auto;
        overflow-y: scroll;
    }

    .content-pd .el-dialog__header {
        display: none;
    }

    .content-pd .el-dialog__body {
        padding: 0;
    }

    /*.content-pd .el-table__body-wrapper {
        overflow-x: hidden;
    }*/

    .content-pd .pd-data-box {
        width: 98%;
        height: auto;
        margin: 0 auto;
        overflow-x: auto;
    }

    .content-pd .pd-top-more {
        width: 100%;
        height: 48px;
        display: none;
        position: absolute;
        top: 76px;
        left: 0;
        background: #fff;
    }

    .content-pd .pd-top-more ul {
        width: 960px;
        height: 48px;
        margin-left: 176px;
    }

    .content-pd .pd-top-more ul li {
        float: left;
        width: auto;
        height: 48px;
    }

    .content-pd .pd-top-more ul li span {
        float: left;
        line-height: 48px;
    }

    .content-pd .pd-top-more ul li input {
        margin-top: 10px;
    }

    .content-pd .content-pd {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 0;
        position: relative;
    }

    .content-pd .top {
        width: 100%;
        height: 76px;
        z-index: 997;
        box-sizing: border-box;
        background: #fff;
    }

    .content-pd .bottom {
        width: 100%;
        height: 100%;
    }

    .content-pd .top .pd-top-ul {
        width: 850px;
        height: 100%;
        float: left;
    }

    .content-pd .top .pd-top-ul li {
        width: auto;
        float: left;
        height: 76px;
        font-size: 14px;
        line-height: 76px;
    }

    .content-pd .top li span {
        float: left;
        width: auto;
        margin-left: 20px;
    }

    .content-pd .top li input {
        width: 150px;
        height: 28px;
        float: left;
        margin-top: 24px;
        margin-left: 16px;
        border: 1px solid #ccc;
        text-indent: 4px;
    }

    .content-pd .pd-top-more-btn {
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

    .content-pd .dblb-btn {
        width: 80px;
        height: 28px;
        float: left;
        margin-left: 16px;
        margin-top: 26px;
        background: #315b84;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        border: 0;
    }

    .content-pd .dblb-btn:hover {
        background: #3c6a9b;
    }

    .content-pd .el-pagination {
        margin-bottom: 28px;
        /*box-sizing: border-box;
        padding-left: 50%;*/
        display: flex;
        justify-content: flex-end;
    }

    .content-pd .el-pager li {
        width: 28px;
    }

    /*modal*/

    .content-pd .edit-main {
        width: 100%;
        height: 100px;
        position: relative;
        z-index: 1001;
        background: #fff;
        box-sizing: border-box;
        padding: 0 14px 28px 14px;
    }

    .content-pd .close-btn {
        width: 24px;
        height: 24px;
        position: absolute;
        left: 0;
        background: #ccc url(../../theme/default/images/nav/close.png) no-repeat center;
        background-size: 12px 12px;
    }

    .content-pd .check-status-ul {
        width: 100%;
        height: 98px;
        float: left;
        box-sizing: border-box;
        padding: 20px 0 0 10px;
        display: flex;
        justify-content: center;
    }

    .content-pd .check-status {
        width: 64px;
        height: 98px;
        float: left;
        position: relative;
    }

    .content-pd .check-status:not(:last-child):before {
        content: "------------";
        display: inline-block;
        position: absolute;
        top: 13px;
        right: -80px;
    }

    .content-pd .check-status:not(:first-child) {
        margin-left: 78px;
    }

    .content-pd .check-status span {
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

    .content-pd .el-dialog {
        box-shadow: none;
    }

    .content-pd .check-status.through span {
        background: #fc511f url(../../theme/default/images/nav/duigou.png) no-repeat center;
    }

    .content-pd .check-status p {
        width: 100%;
        height: auto;
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        color: #333;
        font-family: "微软雅黑";
    }

    /*指派弹窗*/

    .appoint-dialog {
        width: 667px;
        height: 394px;
    }

    .appoint-dialog .el-dialog__body {
        padding: 0;
    }

    .appoint-dialog .title {
        color: #333333;
        height: 36px;
        padding: 0px 36px;
        line-height: 36px;
        background: #ffffff url("../../theme/default/images/nav/appoint.png") 12px 8px no-repeat;
    }

    .appoint-dialog .content {
        padding: 0 4px;
    }

    .appoint-dialog .sub-input {
        width: 180px;
        height: 28px;
        font-size: 14px;
    }

    .appoint-dialog .sub-input:focus {
        outline: #e86944 solid 2px;
    }

    .appoint-dialog .appoint-table {
        margin-top: 20px;
    }

    .appoint-dialog .appoint-footer {
        padding: 0;
    }

    .appoint-dialog .content {
        padding: 0 14px;
    }

    .appoint-dialog .el-dialog__footer {
        text-align: center;
        margin-top: -32px;
    }

    .appoint-dialog .el-button--small {
        width: 94px;
    }

    .appoint-dialog .el-button + .el-button {
        margin-left: 94px;
    }

    .appoint-dialog .el-button .el-button--danger {
        width: 94px;
        height: 28px;
    }
</style>