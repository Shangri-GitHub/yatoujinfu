<template>
	<div class="content-bdlb">
		<search flag='' :curPage='curPage' tableName='contentTableData'></search>
		<div class="bottom">
			<div class="bdlb-data-box">
				<el-table :empty-text='emptyText' :data="contentTableData" border style="width:100%;" @cell-click='getThisDetailDataFC' highlight-current-row ref='tableRef'>
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
							<span class="edit-icon" v-if='scope.row.businessStateCode!="51"&&scope.row.businessStateCode!="41"&&scope.row.businessStateCode!="81"&&scope.row.businessStateCode!="91"&&scope.row.businessStateCode!="21"&&scope.row.businessStateCode!="22"'></span>
							<el-button type="text" size="small" v-if='scope.row.businessStateCode!="51"&&scope.row.businessStateCode!="41"&&scope.row.businessStateCode!="81"&&scope.row.businessStateCode!="91"&&scope.row.businessStateCode!="21"&&scope.row.businessStateCode!="22"'>
								编辑
							</el-button>
							<span class="appoint-icon" v-if='scope.row.businessStateCode=="22"'></span>
							<el-button type="text" size="small" @click="dialogAppointVisible = true" v-if='scope.row.businessStateCode=="22"'>指派</el-button>
							<span class="info-icon"></span>
							<el-button type="text" size="small">
								查看
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination small @current-change="handlePageChange" :current-page="curPage" :page-size="10" layout="total,  prev, pager, next, jumper" :total="total">
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
				emptyText: '加载中',
				stageCode: '',
				curPage: 1,
				dialogDestroy: false,
				total: 0,
				contentTableData: [],
				dialogStageCode: '',
				orderHouseId: '',
				openFlag: '',
				businessStateCode: '',
				searching: false,
				orderHouseCode: '',
				saleName: '',
				startTime: '',
				endTime: ''
			}
		},

		methods: {
			getThisDetailDataFC(e, b, c, a) {
            	a = event? event: window.event;
				var str = a.target.innerText.replace( /^\s+|\s+$/g, "" );
				var that = this;
				that.businessStateCode = e.businessStateCode;
				that.orderHouseId = e.orderHouseId;
				if(b.property=='operate'){
					if(str == "编辑") {
						that.openFlag = 'u';
						that.dialogStageCode = 'stage' + e.stageCode;
						that.dialogDestroy = true;
					} else if(str == "查看") {
						if(e.stageCode == 8) {
							e.stageCode = 7;
						}
						that.openFlag = 'v';
						that.dialogStageCode = 'stage' + e.stageCode;
						that.dialogDestroy = true;
					} else if(str == "指派") {
						that.openFlag = 'z';
						that.dialogStageCode = 'stage' + e.stageCode;
						that.dialogDestroy = true;
					}
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
			handlePageChangeFC(val) {
				var that = this
				that.handlePageChange(val)
			},
			handlePageChange(val) {
				var that = this;
				that.curPage = val;
				if(that.searching) {
					var params = {
						orderHouseCode: that.orderHouseCode,
						saleName: that.saleName,
						stageCode: '',
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
				if($('.bdlb-top-more').css('display') == 'none') {
					$(".bottom").animate({
						marginTop: '78px'
					})
					setTimeout(function() {
						$('.bdlb-top-more').slideDown()
					}, 200)
				} else {
					$('.bdlb-top-more').slideUp()
					setTimeout(function() {
						$(".bottom").animate({
							marginTop: '0'
						})
					}, 200)
				}

			}
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
	}
</script>

<style>
	@import "../../theme/default/css/frame/mortgage.css";
	@import "../../theme/default/css/frame/first-comment.css";
	@import "../../theme/default/css/frame/face-trial.css";
	/*详情*/
	
	.content-bdlb .cell span:nth-of-type(1) {
		margin-left: 0 !important;
	}
	
	.content-bdlb input.readonly {
		outline-style: none;
		border: none;
		background-color: #ffffff;
	}
	
	.content-bdlb input {
		width: 80%;
		height: 65%;
		display: inline-block;
		color: #333333;
	}
	
	.content-bdlb .button {
		display: flex;
		justify-content: space-between;
		width: 466px;
		margin: 0 auto;
	}
	
	.content-bdlb .button .el-button {
		width: 94px;
		border-radius: 2px;
	}
	
	.content-bdlb .order-infor,
	.evaluation-one,
	.content-bdlb-t {
		margin: 0px 14px 20px 14px;
		background-color: #ffffff;
	}
	
	.content-bdlb .order-infor .content,
	.evaluation-one .content,
	.content-bdlb-t .content {
		padding-left: 50px;
		padding-top: 12px;
	}
	
	.content-bdlb .title {
		height: 26px;
		line-height: 26px;
		color: #fff;
		background: url("../../theme/default/images/nav/longbg.png") no-repeat 0 center;
		position: relative;
		padding-left: 45px;
	}
	
	.content-bdlb .title:after {
		content: "";
		position: absolute;
		display: inline-block;
		width: 20px;
		height: 20px;
		left: 20px;
		top: 2px;
	}
	
	.content-bdlb .modal-content .title:nth-child(1):after {
		background: url("../../theme/default/images/nav/order-info.png") no-repeat 0px center;
	}
	
	.content-bdlb .modal-content .title:nth-child(2):after {
		background: url("../../theme/default/images/nav/chuping.png") no-repeat 0px center;
	}
	
	.content-bdlb .modal-content .title:nth-child(3):after {
		background: url("../../theme/default/images/nav/xiahu.png") no-repeat 0px center;
	}
	
	/*.content-bdlb .order-infor {
		min-height: 254px;
	}*/
	
	.content-bdlb .content-bdlb-t {
		height: 690px;
	}
	
	.content-bdlb .line span {
		display: inline-block;
		height: 28px;
		line-height: 28px;
	}
	
	.content-bdlb .line span:nth-child(1) {
		width: 100px;
	}
	
	.content-bdlb .line span:nth-child(2) {
		width: 230px;
	}
	
	.content-bdlb .line span.bulid-org {
		width: 500px;
	}
	
	.content-bdlb .line span:nth-child(3) {
		width: 110px;
	}
	
	.content-bdlb .line span:nth-child(4) {
		width: 205px;
	}
	
	.content-bdlb .line span:nth-child(5) {
		width: 80px;
	}
	
	.content-bdlb .content-bdlb-t .line span:nth-child(5) {
		width: 130px;
	}
	
	.content-bdlb .line span:nth-child(6) {
		width: 180px;
	}
	
	.content-bdlb .line0 {
		margin-top: 4px;
		height: 90px;
	}
	
	.content-bdlb .line0 .my-slider,
	.line0 span {
		display: inline-block;
		float: left;
		height: 80px;
	}
	
	.content-bdlb .line0 span {
		vertical-align: top;
		width: 100px;
	}
	
	.content-bdlb .my-slider {
		width: 674px;
		height: 80px;
		position: relative;
		margin-top: 5px;
	}
	
	.content-bdlb .content-bdlb-t .my-slider {
		width: 540px;
	}
	
	.content-bdlb .my-slider .left,
	.my-slider .right {
		position: absolute;
		width: 30px;
		height: 30px;
		top: 50%;
		transform: translate(0, -50%);
	}
	
	.content-bdlb .my-slider .left {
		left: -30px;
		background: url("../../theme/default/images/nav/left.png") no-repeat;
	}
	
	.content-bdlb .my-slider .right {
		background: url("../../theme/default/images/nav/right.png") no-repeat;
		right: -30px;
	}
	
	.content-bdlb .my-slider .area {
		width: 120px;
		height: 80px;
		background-color: #E5E5E5;
		float: left;
	}
	/*——————————————————————*/
	
	.content-bdlb {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
	}
	
	.content-bdlb .modal-content {
		width: 100%;
	}
	
	.content-bdlb .loan-user-edit {
		width: 100%;
		top: 0 !important;
		bottom: 0;
		right: 0;
		padding: 0;
		margin: 0;
	}
	
	.content-bdlb .el-dialog__wrapper {
		width: 1079px;
		/*height: 100%;*/
		position: absolute;
		left: auto;
		overflow: hidden;
	}
	
	.content-bdlb .el-dialog__header {
		display: none;
	}
	
	.content-bdlb .el-dialog__body {
		padding: 0;
	}
	/*.content-bdlb .el-table__body-wrapper {
		overflow-x: hidden;
	}*/
	/*------------------------------------------*/
	
	.content-bdlb .bdlb-data-box {
		width: 98%;
		height: auto;
		margin: 0 auto;
		overflow-x: auto;
	}
	
	.content-bdlb .top {
		width: 100%;
		height: 76px;
		z-index: 997;
		box-sizing: border-box;
		background: #fff;
	}
	/*-------------------------*/
	
	.content-bdlb .bottom {
		width: 100%;
		height: 100%;
		margin-top: 0;
	}
	
	.content-bdlb .top .bdlb-top-ul {
		width: 850px;
		height: 100%;
		float: left;
	}
	
	.content-bdlb .top .bdlb-top-ul li {
		width: auto;
		float: left;
		height: 76px;
		font-size: 14px;
		line-height: 76px;
	}
	
	.content-bdlb .top li span {
		float: left;
		width: auto;
		margin-left: 20px;
	}
	
	.content-bdlb .top li input {
		width: 150px;
		height: 28px;
		float: left;
		margin-top: 24px;
		margin-left: 16px;
		border: 1px solid #ccc;
		text-indent: 4px;
	}
	
	.content-bdlb .bdlb-top-more-btn {
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
	
	.content-bdlb .el-pagination {
		margin-bottom: 28px;
		/*box-sizing: border-box;
        padding-left: 50%;*/
		display: flex;
		justify-content: flex-end;
	}
	
	.content-bdlb .el-pagination__jump input {
		height: 28px;
	}
	/*modal*/
	
	.content-bdlb .edit-main {
		width: 100%;
		height: 100px;
		position: relative;
		z-index: 1001;
		background: #fff;
		box-sizing: border-box;
		padding: 0 14px 28px 14px;
	}
	
	.content-bdlb .close-btn {
		width: 24px;
		height: 24px;
		position: absolute;
		left: 0;
		background: #ccc url(../../theme/default/images/nav/close.png) no-repeat center;
		background-size: 12px 12px;
	}
	
	.content-bdlb .check-status-ul {
		width: 100%;
		height: 98px;
		float: left;
		box-sizing: border-box;
		padding: 20px 0 10px 85px;
		display: flex;
		justify-content: center;
	}
	
	.content-bdlb .check-status {
		width: 64px;
		height: 98px;
		float: left;
		position: relative;
	}
	
	.content-bdlb .check-status:not(:last-child):before {
		content: "------------";
		display: inline-block;
		position: absolute;
		top: 13px;
		right: -80px;
	}
	
	.content-bdlb .check-status:not(:first-child) {
		margin-left: 78px;
	}
	
	.content-bdlb .check-status span {
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
	
	.content-bdlb .check-status.through span {
		background: #fc511f url(../../theme/default/images/nav/duigou.png) no-repeat center;
	}
	
	.content-bdlb .check-status p {
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
		height: 444px;
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
	
	.appoint-dialog .appoint-footer button,
	.zhipai-btn button {
		width: 94px;
	}
	
	.zhipai-btn button {
		height: 29px;
		line-height: 4px;
	}
	
	.appoint-dialog .content {
		padding: 0 14px;
	}
	
	.appoint-dialog .el-dialog__footer {
		text-align: center;
	}
	
	.appoint-dialog .el-button--small {
		width: 94px;
	}
	
	.appoint-dialog .el-button+.el-button {
		margin-left: 94px;
	}
	
	.appoint-dialog .el-button .el-button--danger {
		width: 94px;
		height: 28px;
	}
	
	.content-bdlb .my-slider img {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.content-bdlb .big-img-content img {
		width: auto;
		height: auto;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		cursor: move;
	}

	
	.content-bdlb .big-img-content .title-img {
		width: 24px;
		height: 24px;
		position: absolute;
		top: 0;
		right: 0;
		background: rgb(72, 87, 106) url(../../theme/default/images/nav/close.png) no-repeat center;
		background-size: 12px 12px;
		cursor: pointer;
		z-index: 99999999;
	}
	
	.content-bdlb .big-img-content {
		width: 500px;
		height: 400px;
		background-color: #aaa;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: none;
		z-index: 9999999;
		overflow: hidden;
	}
</style>