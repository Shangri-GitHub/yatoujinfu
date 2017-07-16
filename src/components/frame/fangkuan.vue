<template>
	<div class="content-fk">
		<search flag='6' :curPage='curPage' tableData='contentTableData'></search>
		<div class="fk-bottom bottom">
			<div class="fk-data-box">
				<el-table :data="contentTableData" :empty-text='emptyText' border style="width:100%;" highlight-current-row @cell-click='getThisDetailDataFC'>
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
							<span class="edit-icon" v-if='scope.row.businessStateCode=="61"'></span>
							<el-button type="text" @click="repayShow()" size="small" v-if='scope.row.businessStateCode=="61"'>编辑
							</el-button>
							<span class="info-icon"></span>
							<el-button type="text" size="small" @click="repayHide()">查看
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination small @current-change="handlePageChange" :current-page="1" :page-size="10" layout="total,  prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
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
				total: 0,
				curPage: 1,
				dataTotal: [],
				contentTableData: [],
				stageCode: 6,
				checked: false,
				dialogFormVisible: false,
				repayPlanVisible: true,
				bdDetailData: '',
				pdfDownPath: '', //批贷函下载路径
				pdfName: '', //批贷函名称
				lendAmount: '',
				openFlag: '',
				dialogDestroy: '',
				searching: false,
				orderHouseCode: '',
				saleName: '',
				startTime: '',
				endTime: ''
			};
		},
		methods: {
			previesList() {
				$('.previes').toggleClass('showself')
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			repayShow() {
				var that = this;
				that.repayPlanVisible = true;
				that.btnVisible = true;
			},
			repayHide() {
				var that = this;
				that.repayPlanVisible = false;
				that.btnVisible = false;
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
            	a = event? event: window.event;
				var str = a.target.innerText.replace( /^\s+|\s+$/g, "" );
				var that = this;
				that.businessStateCode = e.businessStateCode;
				that.orderHouseId = e.orderHouseId;
				if(b.property=='operate'){if(str == "编辑") {
					that.openFlag = 'u';
					that.dialogStageCode = 'stage6'
					that.dialogDestroy = true;
				} else if(str == "查看") {
					that.openFlag = 'v';
					that.dialogStageCode = 'stage6'
					that.dialogDestroy = true;
				}}
			},
			
            handlePageChange(val) {
				var that = this;
				that.curPage = val;
				if(that.searching) {
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
			fkShowMore() {
				if($('.fk-top-more').css('display') == 'none') {
					$(".fk-bottom").animate({
						marginTop: '78px'
					})
					setTimeout(function() {
						$('.fk-top-more').slideDown()
					}, 200)
				} else {
					$('.fk-top-more').slideUp()
					setTimeout(function() {
						$(".fk-bottom").animate({
							marginTop: '0'
						})
					}, 200)
				}

			},
			//提示校验信息
			showMsg(msg) {
				this.$message({
					message: msg,
					type: 'warning',
					duration: "1500",
				});
			},
			showSuccessMsg() {
				var that = this;
				that.$message({
					message: '操作成功',
					type: 'success',
					duration: "1500",
					onClose: function() {
						that.dialogFormVisible = false;
					}
				});
			},
			showFailMsg() {
				var that = this;
				that.$message({
					message: '操作失败',
					type: 'error',
					duration: "1500",
					onClose: function() {
						that.dialogFormVisible = false;
					}
				});
			},
		},
		mounted: function() {
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
	};
</script>
<style>
	.area {
		float: left;
	}
	
	.content-fk .my-slider .area {
		width: 130px;
		height: 80px;
		background-color: #E5E5E5;
		float: left;
	}
	
	.content-fk .my-slider {
		width: 734px;
		height: 80px;
		position: relative;
		margin-top: 5px;
		overflow: hidden;
	}
	
	.content-fk .order-infor {
		margin: 0px 14px 20px 14px;
		background-color: #ffffff;
	}
	
	.table-maker button {
		margin-left: 32px;
	}
	
	.table-maker input {
		background: #fff !important;
		margin-left: 0 !important;
		height: 28px !important;
		border: 1px solid rgb(169, 169, 169);
	}
	
	.content-fk .fk-plan {
		width: 800px;
		margin: 0 auto;
	}

	
	.content-fk .fk-plan tr td {
		font-size: 12px;
		background: #fff !important;
	}
	
	.content-fk .fk-plan tr td:nth-last-child(1) {
		text-align: left;
	}
	.content-fk .el-dialog {
		height: auto;
		min-height: 100%;
		padding-bottom: 0;
		margin-bottom: 0;
		top: 0 !important;
		box-sizing: border-box;
		width: 1060px;
	}
	
	.fk-line {
		width: 100%;
		height: auto;
	}
	
	.fk-line .fk-title {
		width: 120px;
		display: inline-block;
	}
	
	.fk-line textarea {
		border: 0;
		outline: 0;
	}
	
	.edit-icon {
		margin-right: 4px;
		width: 12px;
		height: 12px;
		display: inline-block;
		vertical-align: middle;
		background: url(../../theme/default/images/edit.png) no-repeat;
	}
	
	.appoint-icon {
		margin-right: 4px;
		width: 12px;
		height: 12px;
		display: inline-block;
		vertical-align: middle;
		background: url(../../theme/default/images/appoint.png) no-repeat;
	}
	
	.info-icon {
		margin-right: 4px;
		margin-left: 10px;
		width: 12px;
		height: 12px;
		display: inline-block;
		vertical-align: middle;
		background: url(../../theme/default/images/info.png) no-repeat;
	}
	
	.fk-data-box {
		width: 98%;
		height: auto;
		margin: 0 auto;
		overflow-x: auto;
	}
	
	.fk-top-more {
		width: 100%;
		height: 48px;
		display: none;
		position: absolute;
		top: 76px;
		left: 0;
		background: #fff;
	}
	
	.fk-top-more ul {
		width: 960px;
		height: 48px;
		margin-left: 190px;
	}
	
	.fk-top-more ul li {
		float: left;
		width: auto;
		height: 48px;
	}
	
	.fk-top-more ul li span {
		float: left;
		line-height: 48px;
	}
	
	.fk-top-more ul li input {
		margin-top: 10px;
	}
	
	.content-fk div li {
		font-family: "微软雅黑";
	}
	
	.content-fk {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding-top: 0;
		font-size: 12px;
		overflow-y: hidden;
		position: relative;
		top: 0;
	}
	
	.fk-top {
		width: 100%;
		height: 76px;
		z-index: 997;
		box-sizing: border-box;
		background: #fff;
	}
	
	.fk-bottom {
		width: 100%;
		height: auto;
		margin-top: 0;
	}
	
	.fk-top .fk-top-ul {
		width: 850px;
		height: 100%;
		float: left;
	}
	
	.fk-top .fk-top-ul li {
		width: auto;
		float: left;
		height: 76px;
		font-size: 14px;
		line-height: 76px;
	}
	
	.fk-top li span {
		float: left;
		width: auto;
		margin-left: 20px;
	}
	
	.fk-top li input {
		width: 150px;
		height: 28px;
		float: left;
		margin-top: 24px;
		margin-left: 16px;
		border: 1px solid #ccc;
		text-indent: 4px;
	}
	
	.fk-top-more-btn {
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
	
	.el-table {
		font-size: 12px;
	}
	
	.content-fk .el-pagination {
		margin-bottom: 28px;
		/*box-sizing: border-box;
        padding-left: 50%;*/
		display: flex;
		justify-content: flex-end;
	}
	

	/*弹框*/
	
	.stage-dialog-3 {
		width: 1079px;
		height: 100%;
		position: absolute;
	}
	
	.content-fk .el-dialog__wrapper {
		width: 1079px;
		/*height: 100%;*/
		position: absolute;
		left: auto;
		overflow: auto;
	}
	
	.stage-dialog-3 .showself {
		display: block !important;
	}
	
	.stage-dialog-3 .el-dialog__header {
		padding: 0;
	}
	
	.stage-dialog-3 .el-dialog__body {
		padding: 0;
	}
	
	.stage-dialog-3 .title {
		width: 100%;
		height: 27px;
		background: -webkit-linear-gradient(left, rgba(252, 81, 31, 0.7) 0%, rgba(252, 81, 31, 0.1) 100%);
		line-height: 27px;
		color: #ffffff;
	}
	
	.stage-dialog-3 .icon {
		margin-left: 20px;
		padding-left: 20px;
		background: url("../../theme/default/images/jpy-white.png") 0 1px no-repeat;
	}
	
	.content-fk .edit-main {
		width: 100%;
		height: 100px;
		position: relative;
		z-index: 1001;
		background: #fff;
		box-sizing: border-box;
		padding: 0 14px 28px 14px;
	}
	
	.content-fk .close-btn {
		width: 24px;
		height: 24px;
		position: absolute;
		left: 0;
		background: #ccc url(../../theme/default/images/nav/close.png) no-repeat center;
		background-size: 12px 12px;
		cursor: pointer;
	}
	
	.content-fk .check-status-ul {
		width: 100%;
		height: 98px;
		float: left;
		box-sizing: border-box;
		padding: 20px 0 0 10px;
		display: flex;
		justify-content: center;
	}
	
	.content-fk .check-status {
		width: 64px;
		height: 98px;
		float: left;
		position: relative;
	}
	
	.content-fk .check-status:not(:last-child):before {
		content: "------------";
		display: inline-block;
		position: absolute;
		top: 13px;
		right: -80px;
	}
	
	.content-fk .check-status:not(:first-child) {
		margin-left: 78px;
	}
	
	.content-fk .check-status span {
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
	
	.content-fk .check-status.through span {
		background: #fc511f url(../../theme/default/images/nav/duigou.png) no-repeat center;
	}
	
	.content-fk .check-status p {
		width: 100%;
		height: auto;
		margin-top: 10px;
		text-align: center;
		font-size: 14px;
		color: #333;
		font-family: "微软雅黑";
	}
	
	.stage-dialog-3 .bg {
		margin: 0 auto;
		width: 1051px;
		min-height: 511px !important;
		background: #ffffff;
	}
	
	.stage-dialog-3 .table {
		margin: 0 auto;
		text-align: center;
	}
	
	.stage-dialog-3 .table tr {
		height: 34px;
	}
	
	.stage-dialog-3 .table tr td:nth-child(1) {
		background: #e5e5e5;
	}
	
	.stage-dialog-3 .table .insert-info {
		width: 100%;
		height: 32px;
		border: none;
		margin: 0px;
		text-indent: 4px;
		background: #ffffff;
		outline: none;
		font-size: 14px;
	}
	
	.stage-dialog-3 {
		top: 0;
		right: 0;
	}
	
	.stage-dialog-3 .table .special {
		background: #e5e5e5;
		color: #333333;
		font-weight: 800;
	}
	
	.stage-dialog-3 .table tr td {
		border: solid 0.5px #d6d6d6;
	}
	
	.stage-dialog-3 .photo {
		margin: 0 auto;
		width: 896px;
		height: 185px;
		background: #d6d6d6;
		position: relative;
	}
	
	.stage-dialog-3 .small-tip {
		width: 129px;
		height: 40px;
		position: absolute;
		right: 0px;
		cursor: pointer;
		line-height: 40px;
		color: #ffffff;
		padding-left: 10px;
		background: rgba(0, 0, 0, 0.2)
	}
	
	.stage-dialog-3 .previes {
		margin: 27px auto;
		margin-top: 27px;
		width: 901px;
		height: 654px;
		background: #ffffff;
		position: relative;
		padding: 20px 75px;
		display: none;
	}
	
	.stage-dialog-3 .arrow-up {
		position: absolute;
		top: -20px;
		left: 334px;
		width: 0;
		height: 0;
		border-left: 20px solid transparent;
		border-right: 20px solid transparent;
		border-bottom: 20px solid #ffffff;
	}
	
	.stage-dialog-3 .previes-table {
		padding-left: 20px;
		background: url("../../theme/default/images/jpy.png") 0 3px no-repeat;
	}
	/*.stage-dialog-3 .el-table .cell{*/
	/*padding:0;*/
	/*}*/
	
	.stage-dialog-3 .footer {
		width: 606px;
		height: 58px;
		background: #ffffff;
		border: 1px solid rgb(223, 230, 236);
		border-top: none;
		padding: 8px;
		font-size: 14px;
	}
	
	.fk-line .readonly {
		border: 0;
	}
</style>