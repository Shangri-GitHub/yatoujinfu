<template>
	<div class="content-js">

		<search flag='lock' :curPage='curPage' tableData='contentTableData'></search>
		<div class="js-bottom bottom">
			<div class="js-data-box">
				<el-table :data="contentTableData" :empty-text='emptyText' border style="width:100%;" fit>
					<el-table-column prop="orderHouseCode" label="报单编号" width='180' show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="houAddr" label="房产地址" width='240' show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="saleNameC" label="信贷员">
					</el-table-column>
					<el-table-column prop="regTime" label="提交时间" width='160'>
					</el-table-column>
					<el-table-column prop="businessState" label="报单状态" width='100'>
					</el-table-column>
					<el-table-column prop="lockName" label="锁定人" width='140'>
					</el-table-column>
					<el-table-column prop="operate" label="操作" width='150'>
						<template scope="scope">
							<span class="info-icon"></span>
							<el-button type="text" size="small" @click='unLockConfirm=true;getId(scope.row.orderHouseId)'>解锁</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination small @current-change="handlePageChange" :current-page="curPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
				</el-pagination>
				<el-dialog title="提示" :visible.sync="unLockConfirm" size="tiny">
					<span>是否确定解锁？</span>
					<span slot="footer" class="dialog-footer">
				      <el-button @click="unLockConfirm = false">取 消</el-button>
				      <el-button type="primary" @click="unlockHandle(orderHouseId)">确 定</el-button>
				    </span>
				</el-dialog>

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
				dataTotal: [],
				contentTableData: [],
				tableData: [],
				curPage: 1,
				tableData1: [],
				checked: false,
				dialogFormVisible: false,
				dialogFormVisibleEdit: false,
				orderHouseId:'',
				unLockConfirm:false
			};
		},
		methods: {
			previesList() {
				$('.previes').toggleClass('showself')
			},
			getId(id){
				this.orderHouseId=id
			},
			unlockHandle(id) {
				var that = this;
				that.unLockConfirm=false;
				this.$http.post('order/unlockOrder', {
					'orderHouseId': id
				}).then(function(res) {
					if(res.data.respCode == "000000") {
						that.$message({
							message: '操作成功',
							type: 'success',
							duration: "1500",
							onClose: function() {
								var initParams = {
									td: 'contentTableData',
									tt: 'total',
									val: 1,
									ps: 10,
									url: 'order/queryLockedOrderList'
								}
								that.getData(initParams)
							}
						});
					} else {
						that.$message.error("提交失败");
					}
				})
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
						url: 'order/queryLockedOrderList'
					}
					this.getData(params)
				}
			},
			jsShowMore() {
				if($('.js-top-more').css('display') == 'none') {
					$(".js-bottom").animate({
						marginTop: '78px'
					})
					setTimeout(function() {
						$('.js-top-more').slideDown()
					}, 200)
				} else {
					$('.js-top-more').slideUp()
					setTimeout(function() {
						$(".js-bottom").animate({
							marginTop: '0'
						})
					}, 200)
				}

			},
			dialogOpen() {
				$('.content-js .el-dialog__wrapper').show().css({
					'left': 'auto',
					'right': '-1079px'
				}).animate({
					right: '0'
				});
			},
		},
		mounted: function() {
			var initParams = {
				td: 'contentTableData',
				tt: 'total',
				val: 1,
				ps: 10,
				url: 'order/queryLockedOrderList'
			}
			this.getData(initParams)
		}
	};
</script>
<style scope>
	.content-js .el-table tbody tr td:last-child {
		text-align: center;
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
	
	.js-data-box {
		width: 98%;
		height: auto;
		margin: 0 auto;
		overflow-x: auto;
	}
	
	.js-top-more {
		width: 100%;
		height: 48px;
		display: none;
		position: absolute;
		top: 76px;
		left: 0;
		background: #fff;
	}
	
	.js-top-more ul {
		width: 960px;
		height: 48px;
		margin-left: 190px;
	}
	
	.js-top-more ul li {
		float: left;
		width: auto;
		height: 48px;
	}
	
	.js-top-more ul li span {
		float: left;
		line-height: 48px;
	}
	
	.js-top-more ul li input {
		margin-top: 10px;
	}
	
	.content-js div li {
		font-family: "微软雅黑";
	}
	
	.content-js {
		width: 100%;
		height: auto;
		box-sizing: border-box;
		padding-top: 0;
		font-size: 12px;
	}
	
	.js-top {
		width: 100%;
		height: 76px;
		z-index: 997;
		box-sizing: border-box;
		background: #fff;
	}
	
	.js-bottom {
		width: 100%;
		height: auto;
		margin-top: 0;
	}
	
	.js-top .js-top-ul {
		width: 850px;
		height: 100%;
		float: left;
	}
	
	.js-top .js-top-ul li {
		width: auto;
		float: left;
		height: 76px;
		font-size: 14px;
		line-height: 76px;
	}
	
	.js-top li span {
		float: left;
		width: auto;
		margin-left: 20px;
	}
	
	.js-top li input {
		width: 150px;
		height: 28px;
		float: left;
		margin-top: 24px;
		margin-left: 16px;
		border: 1px solid #ccc;
		text-indent: 4px;
	}
	
	.js-top-more-btn {
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
	
	.content-js .el-pagination {
		margin-bottom: 28px;
		/*box-sizing: border-box;
        padding-left: 50%;*/
		display: flex;
		justify-content: flex-end;
	}
	/*弹框*/
	
	.custom-table {
		width: 1079px;
		height: 890px;
		position: absolute;
	}
	
	.content-js .el-dialog__wrapper {
		width: 1079px;
		/*height: 100%;*/
		position: absolute;
		left: auto;
		overflow: auto;
	}
	
	.custom-table .showself {
		display: block !important;
	}
	
	.custom-table .el-dialog__header {
		padding: 0;
	}
	
	.custom-table .el-dialog__body {
		padding: 0;
	}
	
	.custom-table .title {
		width: 100%;
		height: 27px;
		background: -webkit-linear-gradient(left, rgba(252, 81, 31, 0.7) 0%, rgba(252, 81, 31, 0.1) 100%);
		line-height: 27px;
		color: #ffffff;
	}
	
	.custom-table .icon {
		margin-left: 20px;
		padding-left: 20px;
		background: url("../../theme/default/images/jpy-white.png") 0 1px no-repeat;
	}
	
	.content-js .edit-main {
		width: 100%;
		height: 100px;
		position: relative;
		z-index: 1001;
		background: #fff;
		box-sizing: border-box;
		padding: 0 14px 28px 14px;
	}
	
	.content-js .close-btn {
		width: 24px;
		height: 24px;
		position: absolute;
		left: 0;
		background: #ccc url(../../theme/default/images/nav/close.png) no-repeat;
		background-size: 100% 100%;
		cursor: pointer;
	}
	
	.content-js .check-status-ul {
		width: 100%;
		height: 98px;
		float: left;
		box-sizing: border-box;
		padding: 20px 0 0 10px;
		display: flex;
		justify-content: center;
	}
	
	.content-js .check-status {
		width: 64px;
		height: 98px;
		float: left;
		position: relative;
	}
	
	.content-js .check-status:not(:last-child):before {
		content: "------------";
		display: inline-block;
		position: absolute;
		top: 13px;
		right: -80px;
	}
	
	.content-js .check-status:not(:first-child) {
		margin-left: 78px;
	}
	
	.content-js .check-status span {
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
	
	.content-js .check-status.through span {
		background: #fc511f url(../../theme/default/images/nav/duigou.png) no-repeat center;
	}
	
	.content-js .check-status p {
		width: 100%;
		height: auto;
		margin-top: 10px;
		text-align: center;
		font-size: 14px;
		color: #333;
		font-family: "微软雅黑";
	}
	/*.custom-table .el-table .cell{*/
	/*padding:0;*/
	/*}*/
	
	.custom-table .footer {
		width: 606px;
		height: 58px;
		background: #ffffff;
		border: 1px solid rgb(223, 230, 236);
		border-top: none;
		padding: 8px;
		font-size: 14px;
	}
</style>