<template>
    <div class="face-trial">
        <search flag='2' :curPage='curPage' tableData='contentTableData'></search>
        <div class="bottom">
            <div class="bdlb-data-box">
                <el-table :data="contentTableData" :empty-text='emptyText' border style="width:100%;"  highlight-current-row
                         >
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
                                  v-if='(scope.row.businessStateCode=="23"&&(roleId=="5"||roleId=="6"||roleId=="2"||roleId=="9"))||
                                  (scope.row.businessStateCode=="24"&&(roleId=="5"||roleId=="6"||roleId=="2"||roleId=="9"))||
                                  (scope.row.businessStateCode=="25"&&(roleId=="5"||roleId=="2"||roleId=="9"))'></span>
                            <el-button type="text" size="small"
                                       @click="getThisDetailDataFC(scope.row,'u')"
                                       v-if='(scope.row.businessStateCode=="23"&&(roleId=="5"||roleId=="6"||roleId=="2"||roleId=="9"))||
                                       (scope.row.businessStateCode=="24"&&(roleId=="5"||roleId=="6"||roleId=="2"||roleId=="9"))||
                                       (scope.row.businessStateCode=="25"&&(roleId=="5"||roleId=="2"||roleId=="9"))'> 编辑
                            </el-button>
                            <span class="appoint-icon" v-if='scope.row.businessStateCode=="22"&&(roleId=="5"||roleId=="2"||roleId=="9")'></span>
                            <el-button type="text" size="small"
                                       @click="getThisDetailDataFC(scope.row,'z')"
                                       v-if='scope.row.businessStateCode=="22"&&(roleId=="5"||roleId=="2"||roleId=="9")'>指派
                            </el-button>
                            <span class="info-icon"></span>
                            <el-button type="text" size="small" @click="getThisDetailDataFC(scope.row,'v')">
                                查看
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination small @current-change="handlePageChange" :current-page="curPage" :page-size="10"
                               layout="total,prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <!--modal-->

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
				emptyText:'加载中',
                curPage: 1,
                stageCode: 2,
                dataTotal: [],
                contentTableData: [],
                //打开的是编辑还是查看
                bdDetailData: "",
                ftCpData: "",
                opId: "",
                opName: "",
                total: 0,
                orderHouseId: "",
                dialogStageCode: '',
                orderHouseId: '',
                openFlag: '',
                dialogDestroy: false,
                searching: false,
                orderHouseCode: '',
                saleName: '',
                startTime: '',
                endTime:'',
                roleId:""
            }
        },
        methods: {
            getThisDetailDataFC(e,a) {
                var that = this;
                that.businessStateCode = e.businessStateCode;
                that.orderHouseId = e.orderHouseId;
                if (a == "u") {
                    that.openFlag = 'u';
                    that.dialogStageCode = 'stage2'
                    that.dialogDestroy = true;
                } else if (a == "v") {
                    that.openFlag = 'v';
                    that.dialogStageCode = 'stage2'
                    that.dialogDestroy = true;
                } else if (a == "z") {
                    that.openFlag = 'z';
                    that.dialogStageCode = 'stage2'
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
                        stageCode: '2',
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
            dialogOpen() {
                $('.face-trial .el-dialog__wrapper').show().css({
                    'left': 'auto',
                    'right': '-1079px'
                }).animate({
                    right: '0'
                });
                $('.face-trial .el-dialog__wrapper').css({
                    'display': 'none'
                });
            },
            //放大轮播图
            closeBigImg() {
                this.closeThisImg();
            },
            changSmallImg(){
                this.changeImg($(".big-img-content img"),-10);
            },
            changBigImg(){
                this.changeImg($(".big-img-content img"),10);
            },
            rotateImgLeft(){
                this.rotateImg($(".big-img-content img"),-90);
            },
            rotateImgRight(){
                this.rotateImg($(".big-img-content img"),90);
            }
        },
        mounted: function () {
            this.roleId = JSON.parse(localStorage.getItem('powerList')).roleId;
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

<style>
    @import "../../theme/default/css/frame/face-trial.css";

</style>
