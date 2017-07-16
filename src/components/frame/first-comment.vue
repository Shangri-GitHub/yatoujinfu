<template>
	<div class="first-comment">
		<search flag='1' :curPage='curPage' tableData='contentTableData' exportBtn='true'></search>
		<div class="bottom">
			<div class="bdlb-data-box">
				<el-table :data="contentTableData" :empty-text='emptyText' border style="width:100%;" highlight-current-row @cell-click=''>
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
					<el-table-column prop="operate" label="操作" width='170'>
						<template scope="scope">
							<span class="edit-icon" v-if='scope.row.businessStateCode=="11"'></span>
							<el-button type="text" size="small" @click="getThisDetailDataFC('u',scope.row)" v-if='scope.row.businessStateCode=="11"'>
								编辑
							</el-button>
							<span class="export-icon" v-if='scope.row.businessStateCode!="11"'></span>
							<el-button type="text" size="small" @click="getExcelData(scope.row)" v-if='scope.row.businessStateCode!="11"' class="export-btn">
								<a :href="exportExcelUrl+scope.row.orderHouseId">导出</a>
							</el-button>
							<span class="info-icon"></span>
							<el-button type="text" @click="getThisDetailDataFC('v',scope.row)" size="small">
								查看
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination small @current-change="handlePageChangeFC" :current-page="curPage" :page-size="10" layout="total,prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!--modal编辑-->
		<component v-bind:is="dialogStageCode" :orderHouseId='orderHouseId' :openFlag='openFlag' :businessStateCode='businessStateCode' v-if='dialogDestroy'></component>
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
				stageCode: 1,
				total: 0,
				dataTotal: [],
				contentTableData: [],
				dialogStageCode: '',
				orderHouseId: '',
				openFlag: '',
				businessStateCode: '',
				dialogDestroy: false,
				searching: false,
				orderHouseCode: '',
				saleName: '',
				startTime: '',
				endTime:'',
				exportExcelUrl:""
			}
		},
		methods: {
			handlePageChangeFC(val) {
				var that = this;
				that.curPage = val;
				if(that.searching) {
					var params = {
						orderHouseCode: that.orderHouseCode,
						saleName: that.saleName,
						stageCode: '1',
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
			//打开详情页，初始化数据
			getThisDetailDataFC(a,b) {
				var that = this;
				that.businessStateCode = b.businessStateCode;
				that.orderHouseId = b.orderHouseId;
				if(a == "u") {
					that.openFlag = 'u';
					that.dialogStageCode = 'stage1'
					that.dialogDestroy = true;
				} else if(a == "v") {
					that.openFlag = 'v';
					that.dialogStageCode = 'stage1'
					that.dialogDestroy = true;
				}
			},
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
			getExcelData(e){
				console.log(e);
			}
		},
		mounted: function() {
			this.exportExcelUrl=this.$http.defaults.baseURL + "common/downloadExcel?stageCode=" + this.stageCode+"&orderHouseId="
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
	@import '../../theme/default/step.css';
	@import "../../theme/default/css/frame/first-comment.css";
</style>


