<template>
    <div class="search-top">
        <ul class="search-top-ul">
            <li>
                <span>报单编号</span>
                <input type="text" class="order-code"/>
            </li>
            <li>
                <span>报单提交开始时间</span>
                <el-date-picker v-model="startTime" type="datetime" size="mini" format='yyyy-MM-dd HH:mm:ss'
                                placeholder="选择日期时间">
                </el-date-picker>
            </li>
            <li>
                <span>报单提交结束时间</span>
                <el-date-picker v-model="endTime" type="datetime" size="mini" format='yyyy-MM-dd HH:mm:ss'
                                placeholder="选择日期时间">
                </el-date-picker>
            </li>
        </ul>
        <div class="search-top-more-btn" @click='searchShowMore'>更多</div>
        <div class=search-top-btn>
            <div class="export-button down-load-excel" v-if='exportBtn'><a href=""></a>
            </div>
            <button class="dblb-search-btn dblb-btn" @click='consoleCur(flag,tableData)'>查询</button>
            <button class="dblb-reset-btn dblb-btn" @click='searchClear'>重置</button>
        </div>
        <div class="search-top-more">
            <ul>
                <li>
                    <span>信贷员</span>
                    <input type="text" class="sale-name"/>
                </li>
                <li>
                    <span>房产地址</span>
                    <input type="text" class="houAddr" v-model="houAddr"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                startTime: '',
                endTime: '',
                houAddr:''
            }
        },
        props: ['flag', 'curPage', 'tableData', 'exportBtn'],
        methods: {
            searchShowMore() {
                if ($('.search-top-more').css('display') == 'none') {
                    $(".bottom").animate({
                        marginTop: '78px'
                    })
                    setTimeout(function () {
                        $('.search-top-more').slideDown()
                    }, 200)
                } else {
                    $('.search-top-more').slideUp()
                    setTimeout(function () {
                        $(".bottom").animate({
                            marginTop: '0'
                        })
                    }, 200)
                }
            },
            searchClear() {
                //重置搜索条件
                var that = this;
                this.$parent.searching = false;
                this.$parent.startTime = '';
                this.$parent.endTime = '';
                this.$parent.orderHouseCode = '';
                this.$parent.saleName = '';
                this.$parent.curPage = 1;
                $('.search-top-ul input').val('');
                $(".sale-name").val('');
                $(".houAddr").val('');
                that.startTime = '';
                that.endTime = '';
                var initParams = {
                    stageCode: that.flag,
                    currentPage: 1,
                    pageSize: 10
                }
                if (that.flag == 'lock') {
                    var initParams = {
                        currentPage: 1,
                        pageSize: 10
                    }
                    that.$http.get('order/queryLockedOrderList', {
                        params: initParams
                    }).then(function (res) {
                        var newData = res.data.resultData;
                        var len = res.data.resultData.length;
                        for (var i = 0; i < len; i++) {
                            newData[i].regTime = that.getForMatDate2(res.data.resultData[i].regTime);
                            ;
                            var stateCode = res.data.resultData[i].businessState;
                            newData[i].businessState = that.switchState(stateCode);
                            newData[i].businessStateCode = stateCode;
                        }
                        that.checkPagination(res.data.resultInfo.totalCount);
                        that.$parent._data.contentTableData = newData;
                        that.$parent.curPage = 1;
                        that.$parent.total = res.data.resultInfo.totalCount;
                    })
                    return
                }
                that.$http.get('order/queryOrderListByStage', {
                    params: initParams
                }).then(function (res) {
                    var newData = res.data.resultData;
                    var len = res.data.resultData.length;
                    for (var i = 0; i < len; i++) {
                        newData[i].regTime = that.getForMatDate2(res.data.resultData[i].regTime);
                        ;
                        var stateCode = res.data.resultData[i].businessState;
                        newData[i].businessState = that.switchState(stateCode);
                        newData[i].businessStateCode = stateCode;
                    }
                    that.checkPagination(res.data.resultInfo.totalCount);
                    that.$parent._data.contentTableData = newData;
                    that.$parent.curPage = 1;
                    that.$parent.total = res.data.resultInfo.totalCount;
                })
                this.exportExcel();
            },
            consoleCur(a, b) {
                //搜索条件
                var that = this;
                var orderCode = $(".order-code").val();
                var saleName = $(".sale-name").val();
                var houAddr = that.houAddr;
                that.$parent.searching = true;
                that.$parent.startTime = this.getForMatDate(this.startTime);
                that.$parent.endTime = this.getForMatDate(this.endTime);
                that.$parent.curPage = 1;
                that.$parent.orderHouseCode = orderCode;
                that.$parent.saleName = saleName;
                var queryParams = {
                    orderHouseCode: orderCode,
                    saleName: saleName,
                    stageCode: a,
                    houAddr:houAddr,
                    startRegTime: this.getForMatDate(this.startTime),
                    endRegTime: this.getForMatDate(this.endTime),
                    currentPage: 1,
                    pageSize: 10
                }
                that.getSearchData(queryParams);
                that.$parent.curPage = 1;
                this.exportExcel();
            },
            exportExcel(){
                $(".down-load-excel a").attr('href', this.$http.defaults.baseURL + "common/downloadExcel?stageCode=" + this.flag+"&saleName="+$(".sale-name").val()+"&houAddr="+this.houAddr+"&startRegTime="+this.getForMatDate(this.startTime)+"&endRegTime="+this.getForMatDate(this.endTime)+"&orderHouseCode="+ $(".order-code").val());

            }
        },
        mounted: function() {

            this.exportExcel();
        }
    }
</script>

<style>
    .search-top-btn{
        float: right;
        margin-right: 12px;
    }
    .search-top-more {
        width: 100%;
        height: 48px;
        display: none;
        background: #fff;
    }

    .search-top-more ul {
        width: 960px;
        height: 48px;
    }

    .search-top-more ul li:nth-of-type(1) {
        float: left;
        width: auto;
        height: 48px;
        margin-left: 10px;
    }

    .search-top-more ul li span {
        float: left;
        line-height: 48px;
    }

    .search-top-more ul li input {
        margin-top: 10px;
        margin-left: 14px;
    }

    .search-top-more ul li:nth-of-type(2) input {
        margin-top: 10px;
        margin-left: 58px;
    }

    .content-search div li {
        font-family: "微软雅黑";
    }

    .content-search {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding-top: 0;
        font-size: 12px;
    }

    .search-top {
        width: 100%;
        height: 76px;
        z-index: 997;
        box-sizing: border-box;
        background: #fff;
    }

    .search-bottom {
        width: 100%;
        height: auto;
        margin-top: 0;
    }

    .search-top .search-top-ul {
        width: 850px;
        height: 100%;
        float: left;
        margin-left: 8px;
    }

    .search-top .search-top-ul li > span {
        margin-left: 6px;
        line-height: 80px;
    }

    .search-top .search-top-ul li {
        width: auto;
        float: left;
        height: 76px;
        font-size: 14px;
        line-height: 76px;
    }

    .search-top li span {
        float: left;
        width: auto;
        margin-left: 4px;
        margin-right: 8px;
    }

    .search-top li input,
    .search-top li .el-input__inner {
        width: 160px;
        height: 28px;
        float: left;
        margin-top: 26px;
        border: 1px solid #ccc;
        text-indent: 4px;
        color: #666;
        border-radius: 0;
        line-height: 28px;
        text-indent: 4px;
        outline: 0;
        padding-top: 0;
        padding-bottom: 0;
        padding-left: 0px;
    }

    .el-date-picker.has-time {
        z-index: 2501 !important;
    }

    .search-top-more-btn {
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

    .export-button {
        width: 30px;
        height: 76px;
        line-height: 76px;
        float: left;
        margin-left: 17px;
        cursor: pointer;
        background: url(../../theme/default/images/export-btn.png) no-repeat center;
    }

    .export-button:hover {
        background: url(../../theme/default/images/export-btn-hover.png) no-repeat center;
    }

    .search-top .el-date-editor.el-input {
        width: 160px;
    }

    .search-top .el-input__icon {
        top: 12px;
        right: -4px;
    }

    .search-top .el-input__icon + .el-input__inner {
        padding-right: 20px;
    }

    .search-top .dblb-search-btn:hover {
        background: #fff;
        border-color: #50BFFF;
        color: #50BFFF;
    }

    .search-top .dblb-reset-btn:hover {
        background: #fff;
        border-color: #f7ba2a;
        color: #f7ba2a;
    }

    .search-top .dblb-btn {
        color: #6a6a6a;
        border: 1px solid #838383;
        background: #fff;
        cursor: pointer;
    }

    .search-top .dblb-btn {
        width: 80px;
        height: 28px;
        float: left;
        margin-left: 10px;
        margin-top: 26px;
        font-size: 14px;
        border-radius: 2px;
        border: 1px solid rgb(191, 203, 217);
        color: rgb(31, 45, 61);
    }

    .down-load-excel a {
        display: inline-block;
        width: 25px;
        height: 25px;
        margin-left: 3px;
        margin-top: 26px;
    }
</style>