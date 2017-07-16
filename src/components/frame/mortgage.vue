<template>
    <div class="mortgage">
        <search flag='5' :curPage='curPage' tableData='contentTableData'></search>
        <div class="bottom">
            <div class="bdlb-data-box">
                <el-table :data="contentTableData" :empty-text='emptyText' border style="width:100%;" highlight-current-row  >
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
                                  v-if='scope.row.businessStateCode=="52"||scope.row.businessStateCode=="53"'></span>
                            <el-button type="text" size="small" @click="getThisDetailDataM(scope.row,'u')"
                                       v-if='scope.row.businessStateCode=="52"||scope.row.businessStateCode=="53"'>编辑
                            </el-button>
                            <!--@click="getOrderDetailData(scope.row.orderHouseId, 'u',scope.row.businessStateCode);"-->
                            <span class="info-icon"></span>
                            <el-button type="text"
                                       @click="getThisDetailDataM(scope.row,'v')"
                                       size="small">查看
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination small @current-change="handlePageChange" :current-page="curPage" :page-size="10"
                               layout="total,prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <component v-bind:is="dialogStageCode" :orderHouseId='orderHouseId' :openFlag='openFlag' :businessStateCode='businessStateCode' v-if='dialogDestroy'></component>
    </div>
</template>
<script>
    export default {
        data() {
            return {
				emptyText:'加载中',
                curPage: 1,
                dialogStageCode: '',
                total: 0,
                curPage: 1,
                stageCode: 5,
                contentTableData: [],
                openFlag: '',
                orderHouseId: "",
                businessStateCode: '',
                dialogDestroy: false,
                searching: false,
                orderHouseCode: '',
                saleName: '',
                startTime: '',
                endTime:''
            }
        },
        methods: {
            getThisDetailDataM(e,a) {
                var that=this;
                that.businessStateCode = e.businessStateCode;
                that.orderHouseId = e.orderHouseId;
                if(a == "u") {
                    that.openFlag = 'u';
                    that.dialogStageCode = 'stage5'
                    that.dialogDestroy = true;
                } else if(a == "v") {
                    that.openFlag = 'v';
                    that.dialogStageCode = 'stage5'
                    that.dialogDestroy = true;
                }
            },
            handlePageChange(val) {
                var that = this;
                that.curPage = val;
                if(that.searching) {
                    var params = {
                        orderHouseCode: that.orderHouseCode,
                        saleName: that.saleName,
                        stageCode: that.stageCode,
                        startRegTime: that.getForMatDate(that.startTime),
                        endRegTime: that.getForMatDate(that.endTime),
                        currentPage: val,
                        pageSize: 10
                    };
                    that.searchPageChange(params);
                } else {
                    var params = {
                        sc: that.stageCode,
                        td: 'contentTableData',
                        tt: 'total',
                        val: val,
                        ps: 10,
                        url: 'order/queryOrderListByStage'
                    }
                    this.getData(params)
                }
            },
            bdlbShowMore() {
                if ($('.bdlb-top-more').css('display') == 'none') {
                    $(".bottom").animate({
                        marginTop: '64px'
                    })
                    setTimeout(function () {
                        $('.bdlb-top-more').slideDown()
                    }, 200)
                } else {
                    $('.bdlb-top-more').slideUp()
                    setTimeout(function () {
                        $(".bottom").animate({
                            marginTop: '0px'
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

<style >
    @import "../../theme/default/css/frame/mortgage.css";
    /*详情*/
    .mortgage .bdlb-data-box {
        width: 98%;
        height: auto;
        margin: 0 auto;
        overflow-x: auto;
    }
    .mortgage .bottom {
        width: 100%;
        height: 100%;
    }
</style>
