export default {
	install(Vue) {
		Vue.prototype.switchState = function(code) {
			var businessState;
			switch(code) {
				case '11':
					businessState = '初评'
					break;
				case '21':
					businessState = '询值完毕'
					break;
				case '22':
					businessState = '待指派'
					break;
				case '23':
					businessState = '下户申请时间确认'
					break;
				case '24':
					businessState = '待下户面审'
					break;
				case '25':
					businessState = '材料确认'
					break;
				case '31':
					businessState = '待批贷'
					break;
				case '41':
					businessState = '公证申请'
					break;
				case '42':
					businessState = '公证申请时间确认'
					break;
				case '43':
					businessState = '前期费用'
					break;
				case '44':
					businessState = '公证'
					break;
				case '51':
					businessState = '抵押申请'
					break;
				case '52':
					businessState = '抵押申请时间确认'
					break;
				case '53':
					businessState = '抵押'
					break;
				case '61':
					businessState = '待放款'
					break;
				case '71':
					businessState = '待返点'
					break;
				case '81':
					businessState = '已完成'
					break;
				case '91':
					businessState = '拒单'
					break;
			}
			return businessState;
		}
		Vue.prototype.getSearchData = function(params) {
			var that = this;
			if(params.stageCode=='lock'){
				this.$http.get('order/queryLockedOrderList', {
				params: {
					orderHouseCode:params.orderHouseCode,
					saleName:params.saleName,
					houAddr:params.houAddr,
					startRegTime:params.startRegTime,
					endRegTime:params.endRegTime,
					currentPage:params.currentPage,
					pageSize:params.pageSize
				}
				}).then(function(res) {
					console.log(res)
					var newData = res.data.resultData;
					var len = res.data.resultData.length;
					if(len<=0||!len){
						that.$parent.emptyText='暂无数据'
					}
					for(var i = 0; i < len; i++) {
						newData[i].regTime = that.getForMatDate2(res.data.resultData[i].regTime);
						var stateCode = res.data.resultData[i].businessState;
						newData[i].businessState = that.switchState(stateCode);
						newData[i].businessStateCode = stateCode;
					}
					that.checkPagination(res.data.resultInfo.totalCount);
					that.$parent._data.contentTableData = newData
					that.$parent._data.total = res.data.resultInfo.totalCount
				})
				return
			}
			this.$http.get('order/queryOrderListByStage', {
				params: params
			}).then(function(res) {
				var newData = res.data.resultData;
				var len = res.data.resultData.length;
				if(len<=0||!len){
					that.$parent.emptyText='暂无数据'
				}
				for(var i = 0; i < len; i++) {
					newData[i].regTime = that.getForMatDate2(res.data.resultData[i].regTime);
					var stateCode = res.data.resultData[i].businessState;
					newData[i].businessState = that.switchState(stateCode);
					newData[i].businessStateCode = stateCode;
				}
				that.checkPagination(res.data.resultInfo.totalCount);
				that.$parent._data.contentTableData = newData
				that.$parent._data.total = res.data.resultInfo.totalCount
			})
		}

		Vue.prototype.refreshSearchData = function() {
			var that = this;
			if(that.$parent.searching) {
				var queryParams = {
					orderHouseCode: that.$parent.orderCode,
					saleName: that.$parent.saleName,
					stageCode: that.$parent.stageCode,
					startRegTime: that.getForMatDate(that.$parent.startTime),
					endRegTime: that.getForMatDate(that.$parent.endTime),
					currentPage: that.$parent.curPage,
					pageSize: 10
				}
				that.getSearchData(queryParams);
			} else {
				var initParams = {
					sc: that.$parent.stageCode,
					td: 'contentTableData',
					tt: 'total',
					val: 1,
					ps: 10,
					url: 'order/queryOrderListByStage'
				}
				that.getData(initParams)
			}
			that.dialogFormVisibleEdit = false;
			that.$parent.dialogDestroy = false;
		}

		Vue.prototype.searchPageChange = function(params) {
			var that = this;
			this.$http.get('order/queryOrderListByStage', {
				params: params
			}).then(function(res) {
				var newData = res.data.resultData;
				var len = res.data.resultData.length;
				for(var i = 0; i < len; i++) {
					newData[i].regTime = that.getForMatDate2(res.data.resultData[i].regTime);;
					var stateCode = res.data.resultData[i].businessState;
					newData[i].businessState = that.switchState(stateCode);
					newData[i].businessStateCode = stateCode;
				}
				that.checkPagination(res.data.resultInfo.totalCount);
				that.contentTableData = newData
				that.total = res.data.resultInfo.totalCount
			})
		}

		Vue.prototype.getData = function(params) {
			var that = this;
			this.$http.get(params.url, {
				params: {
					'stageCode': params.sc,
					'currentPage': params.val,
					'pageSize': params.ps,
				}
			}).then(function(res) {
				var newData = res.data.resultData;
				if(!res.data.resultData){
					return
				}
				var len = res.data.resultData.length;
				if(len<=0||!len){
					that.emptyText='暂无数据'
				}
				for(var i = 0; i < len; i++) {
					newData[i].regTime = that.getForMatDate2(res.data.resultData[i].regTime);
					newData[i].balance = that.formatMoney(res.data.resultData[i].balance,2,"",",");
					newData[i].cash = that.formatMoney(res.data.resultData[i].cash,2,"",",");
					newData[i].score=res.data.resultData[i].score?res.data.resultData[i].score:0;
					var stateCode = res.data.resultData[i].businessState;
					newData[i].businessState = that.switchState(stateCode);
					newData[i].businessStateCode = stateCode;
				}
				that[params.td] = newData;
				that[params.tt] = res.data.resultInfo.totalCount;
				that.checkPagination(res.data.resultInfo.totalCount)
			});
		}
		//信贷员详情列表
		Vue.prototype.getDetailData = function(params) {
			var that = this;
			this.$http.get(params.url, {
				params: params.data
			}).then(function(res) {
				var newData = res.data.resultData;
				var len = res.data.resultData.length;
				console.log(len)
				if(len<=0||!len){
					that.emptyText='暂无数据'
				}
				for(var i = 0; i < len; i++) {
					newData[i].regTime = that.getForMatDate2(res.data.resultData[i].regTime);
					newData[i].balance = that.formatMoney(res.data.resultData[i].balance,2,"",",");
					newData[i].cash = that.formatMoney(res.data.resultData[i].cash,2,"",",");
					newData[i].score=res.data.resultData[i].score?res.data.resultData[i].score:0;
					var stateCode = res.data.resultData[i].businessState;
					newData[i].businessState = that.switchState(stateCode);
					newData[i].businessStateCode = stateCode;
				}
				that[params.td] = newData;
				that[params.tt] = res.data.resultInfo.totalCount;
				that.checkPagination(res.data.resultInfo.totalCount)
			});
		}

		Vue.prototype.checkPagination = function(l) {
			if(l <1) {
				$(".el-pagination").hide()
			} else {
				$(".el-pagination").show()
			}
		}
		//转化标准时间
		Vue.prototype.getForMatDate = function(result) {
			if(!result) {
				return ""
			}
			var format = function(time, format) {
				var t = new Date(time);
				var tf = function(i) {
					return(i < 10 ? '0' : '') + i
				};
				return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {

					switch(a) {
						case 'yyyy':
							return tf(t.getFullYear());
							break;
						case 'MM':
							return tf(t.getMonth() + 1);
							break;
						case 'mm':
							return tf(t.getMinutes());
							break;
						case 'dd':
							return tf(t.getDate());
							break;
						case 'HH':
							return tf(t.getHours());
							break;
						case 'ss':
							return tf(t.getSeconds());
							break;
					}
				});
			};
			return format(result, 'yyyy-MM-dd HH:mm:ss');
		}
		//转化时间戳
		Vue.prototype.getForMatDate2 = function(data) {
			var currentdate;
			var time = '00:00:00'
			var date = new Date(data);
			var seperator1 = "-";
			var seperator2 = ":";
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if(month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if(strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var getHours = date.getHours(),
				getMinutes = date.getMinutes(),
				getSeconds = date.getSeconds();
			(getHours + "").length == 1 ? getHours = "0" + getHours : getHours;
			(getMinutes + "").length == 1 ? getMinutes = "0" + getMinutes : getMinutes;
			(getSeconds + "").length == 1 ? getSeconds = "0" + getSeconds : getSeconds;
			currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
				" " + getHours + seperator2 + getMinutes +
				seperator2 + getSeconds;
			return currentdate;
		}
		Vue.prototype.strToObj = function(str) {
			str = decodeURIComponent(str);
			str = str.replace(/\s/g, '');
			str = str.replace(/\&/g, '||');
			str = str.replace(/\=/g, '||');
			str = str.replace(/\+/g, ' ');
			var arr = str.split('||');
			console.log(str);
			console.log(arr);
			var obj = {};
			var key = [];
			var val = [];
			for(var i = 0, len = arr.length; i < len; i++) {
				if(i % 2) {
					val.push(arr[i]);
				} else {
					key.push(arr[i]);
				}
			}

			for(var j = 0, len = key.length; j < len; j++) {
				obj[key[j]] = val[j];
			}
			console.log(obj);
			return obj;
		}
		//轮播图数据处理
		Vue.prototype.queryAttachImg = function (ids,ele) {
			if (!ids) {
				ele.css("display","none")
				return;
			}
			var imgIds = [];
			var houIdArr = ids.split(",");
			var index = 0;
			var str = "";
			if(houIdArr.length<5){
				ele.css("display","none")
			}
			for (var i = 0; i < houIdArr.length; i++) {
				index++;
				if (index < 6) {
					if (index == 5 || i == houIdArr.length - 1) {
						str += this.$http.defaults.baseURL + "common/showImg?attachId=" + houIdArr[i];
					} else {
						str += this.$http.defaults.baseURL + "common/showImg?attachId=" + houIdArr[i] + ",";
					}
				}
				if (index == 5 || i == houIdArr.length - 1) {
					index = 0;
					imgIds.push(str.split(","));
					str = "";
				}
			}
			return imgIds;
		}
		//放大缩小图片
		var current=0;
		Vue.prototype.changeImg = function (i, z) {
			/*
			 * @param i 图片选择器
			 * @param z 正数：放大，负数：缩小
			 */
			var zoom = parseInt(i[0].style.zoom, 10) || 100;
			zoom += z;
			if (zoom > 0) {
				i.css({"zoom":zoom + '%',"transform":"translate(-50%,-50%) rotate("+current+"deg) scale("+zoom/100+")"});
			}
			return false;
		}
		Vue.prototype.rotateImg = function (i, z) {
			/*
			 * @param i 图片选择器
			 * @param z 旋转角度，正数：向左转，负数：向右转
			 */
			var zoom = parseInt(i[0].style.zoom, 10)
			current = (current+z)%360;
			i.css({'transform':'translate(-50%,-50%) scale('+zoom/100+') rotate('+current+'deg)','zoom':zoom + '%'});
			return false;
		}
		//拖拽
		Vue.prototype.dragmove = function (ele) {
			return ele.each(function () {
				var $document = $(".big-img-content"),
					$this = $(this),
					active,
					startX,
					startY,
					click;
				$document.on('mousedown', function (e) {
					var e = e || window.event;
					if(e.preventDefault)e.preventDefault();
					else e.returnvalue=false;
					active = true;
					startX = e.originalEvent.pageX - $this.offset().left;
					startY = e.originalEvent.pageY - $this.offset().top;
					if ('mousedown' == e.type)
						click = $this;
					if (window.mozInnerScreenX == null)
						return false;
				});
				$document.on('mousemove', function (e) {
					var e = e || window.event;
					if(e.preventDefault)e.preventDefault();
					else e.returnvalue=false;
					if ('mousemove' == e.type && active)
						click.offset({
							left: e.originalEvent.pageX - startX,
							top: e.originalEvent.pageY - startY
						});
				});
				$("body").on('mouseup', function (e) {
					var e = e || window.event;
					if(e.preventDefault)e.preventDefault();
					else e.returnvalue=false;
					active = false;
				});
			});
		};
		Vue.prototype.closeThisImg=function () {
			$(".big-img-content").css("display", "none");
			current=0;
		}
		//金额格式化
		Vue.prototype.formatMoney = function (number, places, symbol, thousand, decimal) {

			/*
			 * @param number 被格式化数字
			 * @param places 保留小数
			 * @param symbol 钱符号
			 * @param thousand 分隔符
			 * @param decimal
			 * @returns {string}
			 */
			var j;
			number = number || 0;
			places = !isNaN(places = Math.abs(places)) ? places : 2;
			symbol = symbol !== undefined ? symbol : "￥";
			thousand = thousand || ",";
			decimal = decimal || ".";
			var negative = number < 0 ? "-" : "";
			var i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "";
			j = (j = i.length) > 3 ? j % 3 : 0;
			return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
		}
	}
}