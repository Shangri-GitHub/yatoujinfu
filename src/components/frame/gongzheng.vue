<template>
    <div class="content-gz">
        <search flag='4' :curPage='curPage' tableData='contentTableData'></search>
        <div class="gz-bottom bottom">
            <div class="gz-data-box">
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
                                  v-if='(scope.row.businessStateCode=="42"&& roleId=="7")||(scope.row.businessStateCode=="43"&& roleId=="8")||(scope.row.businessStateCode=="44"&&roleId=="7")||(scope.row.businessStateCode=="42"&&roleId=="2")||(scope.row.businessStateCode=="43"&&roleId=="2")||(scope.row.businessStateCode=="44"&&roleId=="2")'></span>
                            <el-button type="text" size="small"
                                       v-if='(scope.row.businessStateCode=="42"&& roleId=="7")||(scope.row.businessStateCode=="43"&& roleId=="8")||(scope.row.businessStateCode=="44"&&roleId=="7")||(scope.row.businessStateCode=="42"&&roleId=="2")||(scope.row.businessStateCode=="43"&&roleId=="2")||(scope.row.businessStateCode=="44"&&roleId=="2")'>
                                编辑
                            </el-button>

                            <span class="info-icon"></span>
                            <el-button type="text" size="small"> 查看
                            </el-button>

                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination small @current-change="handlePageChange" :current-page="curPage" :page-size="10"
                               layout="total,  prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

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
                curPage: 1,
                dataTotal: [],
                stageCode: 4,
                contentTableData: [],
                tableData: [],
                checked: false,
                resultData: {},
                orderHouseId: '',
                businessStateCode: '',
                openFlag: '',
                dialogStageCode: '',
                searching: false,
                orderHouseCode: '',
                saleName: '',
                startTime: '',
                endTime: '',
                dialogDestroy: false,
                roleId: ''
            };
        },
        methods: {
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
            },
            //打开详情页，初始化数据
            getThisDetailDataFC(e, b, c, a) {
                a = event ? event : window.event;
                var str = a.target.innerText.replace(/^\s+|\s+$/g, "");
                var that = this;
                that.businessStateCode = e.businessStateCode;
                that.orderHouseId = e.orderHouseId;
                if (str == "编辑") {
                    that.openFlag = 'u';
                    that.dialogStageCode = 'stage4'
                    that.dialogDestroy = true;
                } else if (str == "查看") {
                    that.openFlag = 'v';
                    that.dialogStageCode = 'stage4'
                    that.dialogDestroy = true;
                }
            },
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
            gzShowMore() {
                if ($('.gz-top-more').css('display') == 'none') {
                    $(".gz-bottom").animate({
                        marginTop: '78px'
                    })
                    setTimeout(function () {
                        $('.gz-top-more').slideDown()
                    }, 200)
                } else {
                    $('.gz-top-more').slideUp()
                    setTimeout(function () {
                        $(".gz-bottom").animate({
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
            // 获取角色的判断
            this.roleId = JSON.parse(localStorage.getItem('powerList')).roleId
        }
    };
</script>
<style scope>
    @import '../../theme/default/step.css';
    @import '../../theme/default/css/frame/gongzheng.css';
</style>