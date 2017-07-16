<template>
    <div class="home">
        <div class="header">
            <div class="welcome">您好，欢迎来到亚投金服！<span @click="dialogFormVisible = true;dialog()" class="login">[登录]</span></div>
        </div>
        <!-- <header class="block">
             <el-carousel trigger="click"  arrow="never">
                 <el-carousel-item >
                 </el-carousel-item>
             </el-carousel>
         </header>-->
        <div>
            <img style="width: 100%" src="../theme/default/images/login/banner1.jpg" alt="">
        </div>
        <div class="container">
            <div class="item1">
                <el-row>
                    <el-col :span="8">
                        <div class="big-circle1">
                            <div class="inside-circle">
                                <div class="title">总收单</div>
                                <div class="number" v-html="data1"></div>
                                <div class="unit">元</div>
                                <div class="sale"></div>
                                <div class="shadow"></div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="big-circle2">
                            <div class="inside-circle">
                                <div class="title">总批贷</div>
                                <div class="number" v-html="data2"></div>
                                <div class="unit">元</div>
                                <div class="sale"></div>
                                <div class="shadow"></div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="big-circle3">
                            <div class="inside-circle">
                                <div class="title">总放款</div>
                                <div class="number" v-html="data3"></div>
                                <div class="unit">元</div>
                                <div class="sale"></div>
                                <div class="shadow"></div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="item2">
                <el-row>
                    <el-col :span="12">
                        <div style="padding: 43px 23px 40px 70px;float: left; width: 110px; height: 87px;">
                            <img src="../theme/default/images/login/credit.png" alt="">
                        </div>
                        <div style="float: left;margin: 45px 0 0 50px;height: 100px">
                            <div class="sub_title">信贷员</div>
                            <div class="button" v-html="data0"></div>
                            <div class="unit">人</div>
                            <div class="line"></div>

                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div style="padding: 43px 23px 40px 70px;float: left; width: 110px; height: 87px;">
                            <img src="../theme/default/images/login/rebate.png" alt="">
                        </div>
                        <div style="float: left;margin: 45px 0 0 50px">
                            <div class="sub_title">总返利</div>
                            <div class="button" v-html="data4"></div>
                            <div class="unit">元</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="item3">
                <div class="product">
                    <div class="title">热门产品</div>
                    <div style="width: 150px;  height: 150px; margin: 0 auto;margin-top: 34px;">
                        <img src="../theme/default/images/login/hot-product.png" alt="">
                    </div>
                </div>
                <div class="introductions">
                    <div style="float: right;margin: 15px 15px 0 0 ">
                        <img src="../theme/default/images/login/hot.png" alt="">
                    </div>
                    <div class="title">亚投金服房抵贷</div>
                    <div class="detail">借款金额<br><span class="sub_title">单笔金额50-5000万，总额无上限</span></div>
                    <div class="detail">借款金额<br><span class="sub_title">单笔金额50-5000万，总额无上限</span></div>
                    <div class="detail">借款金额<br><span class="sub_title">单笔金额50-5000万，总额无上限</span></div>
                    <div class="detail">借款金额<br><span class="sub_title">单笔金额50-5000万，总额无上限</span></div>
                    <div class="view">查看详情>></div>
                </div>
                <div class="car">
                    <!--<div class="more">查看全部>></div>-->
                    <div class="title">亚投金服车贷</div>
                    <div style="margin-left: 29px">
                        <div class="detail">借款金额<br><span class="sub_title">单笔金额50-5000万，总额无上限</span></div>
                        <div class="detail">借款金额<br><span class="sub_title">单笔金额50-5000万，总额无上限</span></div>
                        <div class="detail">借款金额<br><span class="sub_title">单笔金额50-5000万，总额无上限</span></div>
                        <div class="detail">借款金额<br><span class="sub_title">单笔金额50-5000万，总额无上限</span></div>
                        <div class="view">查看详情>></div>
                    </div>
                    <div class="line"></div>
                </div>


            </div>
            <div class="item4">
                <div class="product">
                    <div class="title">最新活动</div>
                    <div style="width: 150px; height: 150px; margin: 0 auto;margin-top: 34px;">
                        <img src="../theme/default/images/login/gift.png" alt="">
                    </div>
                </div>
                <div class="card1">
                    <div style=" margin-left: 27px;">
                        <span style="margin-left: -5px"> <img style="margin-left: -27px"
                                                              src="../theme/default/images/login/01.png" alt=""></span>

                        <div class="time">
                            <span>活动开始时间：2017-05-01</span>
                            <br>
                            <span>活动截止时间：2017-05-31</span>
                        </div>

                        <div class="amount">
                            <div>单笔贷款金额<span style="font-size: 21px;font-weight: bold">100</span>万起</div>
                            <div>额外返点金额<span style="font-size: 21px;font-weight: bold">5000</span>万</div>
                        </div>
                        <div style="margin: 20px 0 0 97px">
                            <img src="../theme/default/images/login/green-hand.png" alt="">
                        </div>
                        <div class="view">查看详情>></div>
                    </div>

                </div>
                <div class="card2">
                    <div style=" margin-left: 27px;">
                        <span style="margin-left: -5px"> <img style="margin-left: -27px"
                                                              src="../theme/default/images/login/02.png" alt=""></span>
                        <div class="new-person">
                            <img src="../theme/default/images/login/new-person.png" alt="">
                        </div>
                        <div class="time">
                            <span>活动开始时间：2017-05-01</span>
                            <br>
                            <span>活动截止时间：2017-05-31</span>
                        </div>

                        <div class="amount">
                            <div>单笔贷款金额<span style="font-size: 21px;font-weight: bold">100</span>万起</div>
                            <div>额外返点金额<span style="font-size: 21px;font-weight: bold">5000</span>万</div>
                        </div>
                        <div style="margin: 20px 0 0 97px">
                            <img src="../theme/default/images/login/blue-hand.png" alt="">
                        </div>
                        <div class="view">查看详情>></div>
                    </div>

                </div>

            </div>
        </div>

        <footer class="footer">
            <div class="contain">
                <div class="item">
                    <div style="margin: 25px 0 18px 75px">
                        <img src="../theme/default/images/login/safe.png" alt="">
                    </div>
                    <div class="tool">安全保障<br><span style="font-size: 12px;color:#7d7d7d">平台安全，放心贷，按时还</span></div>
                </div>
                <div class="item">
                    <div style="margin: 25px 0 18px 75px">
                        <img src="../theme/default/images/login/price.png" alt="">
                    </div>
                    <div class="tool">价格公正<br><span style="font-size: 12px;color:#7d7d7d">年利率低，贷款年限可选择</span></div>
                </div>
                <div class="item">
                    <div style="margin: 25px 0 18px 75px">
                        <img src="../theme/default/images/login/service.png" alt="">
                    </div>
                    <div class="tool">专人服务<br><span style="font-size: 12px;color:#7d7d7d">专门信贷人员为您服务，提供专业的知识解答</span>
                    </div>
                </div>
                <div class="item">
                    <div style="margin: 25px 0 18px 75px">
                        <img style="width: 76px;height: 76px" src="../theme/default/images/login/QR.png" alt="">
                    </div>
                    <div class="cord">关注公众号</div>
                </div>
                <div class="item">
                    <div style="margin: 25px 0 18px 75px">
                        <img src="../theme/default/images/login/customer.png" alt="">
                    </div>
                    <div class="telphone">客服热线<br><span style="font-size: 17px;color:#616161">400-960-5356</span></div>
                </div>
            </div>
        </footer>
        <!--登陆弹窗-->
        <el-dialog style="margin-top: 0px" :show-close="false" top="30%" custom-class="custom-login" :modal-append-to-body="true"
                   :visible.sync="dialogFormVisible">
            <div class="circle">
                <img src="../theme/default/images/login/logo.png" alt="">
                <img class="login-title" src="../theme/default/images/login/logo-title.png" alt="">
            </div>

            <div style="margin-top: 90px" class="login-input">
                <img style="position: absolute;top: 8px;left: 7px" src="../theme/default/images/login/account.png"
                     alt="">
                <img src="../theme/default/images/login/line.png" alt="">
                <input type="text" class="user" v-model="loginCode" placeholder="请输入用户名" @keyup.enter="login()">
            </div>

            <div style="margin-top: 140px" class="login-input">
                <img style="position: absolute;top: 9px;left: 7px" src="../theme/default/images/login/password.png"
                     alt="">
                <img src="../theme/default/images/login/line.png" alt="">
                <input type="password" class="user" v-model="passWord" placeholder="请输入密码" @keyup.enter="login()">
            </div>


            <div style="margin-top: 188px" slot="footer" class="dialog-footer">
                <span class="forget-password"></span>
                <el-button size="small" class="login-button" @click="login($event)">登 录</el-button>
            </div>


        </el-dialog>
    </div>
</template>
<script>
    export default{
        name: 'home',
        data(){
            return {
                dialogFormVisible: false,
                loginCode: '',
                passWord: '',
                data0: '',
                data1: '',
                data2: '',
                data3: '',
                data4: '',
                kpiIntVal: ''
            }
        },
        methods: {
            dialog(){
                setTimeout(function () {
                    $('body> .v-modal').css('marginTop','0px');
                })
            },

            getKpiData(){
                var that = this;
                this.$http.get('common/queryKpi').then(function (res) {
                    that.data0 = res.data.resultData[0].kpiIntVal + res.data.resultData[0].kpiVal
                    that.data1 = res.data.resultData[1].kpiIntVal + res.data.resultData[1].kpiVal
                    that.data2 = res.data.resultData[2].kpiIntVal + res.data.resultData[2].kpiVal
                    that.data3 = res.data.resultData[3].kpiIntVal + res.data.resultData[3].kpiVal
                    that.data4 = res.data.resultData[4].kpiIntVal + res.data.resultData[4].kpiVal
                })
            },


            login(e) {
                var that = this;
                var params = {
                    loginCode: this.loginCode,
                    passWord: this.passWord,
                    url: 'yatouLogin'
                }
                that.$http.post(params.url, {
                    'loginCode': params.loginCode,
                    'passWord': params.passWord
                }).then(function (res) {
                    console.log(res);
                    if (res.data.success) {
                        that.$router.push({path: 'nav'})
                        localStorage.clear('powerList');
                        localStorage.setItem('powerList', JSON.stringify(res.data.data))
                    } else {
                        that.$message.error(res.data.errMsg);
                    }
                })
            }
        },
        mounted: function () {
            var that = this;
            that.getKpiData()
            setInterval(() => {
                that.getKpiData()
            }, 300000)
        }
    }
</script>
<style>
    @import "../theme/default/css/login/home.css";
</style>