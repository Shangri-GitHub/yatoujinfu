<template>
    <div class="content-loanpre">
        <div class="title">
            <img src="../theme/default/images/logo.png" alt="">
        </div>
        <div class="name">批贷函</div>
        <div class="kong"></div>
        <div class="number">批函编号：{{data.letterCode}}</div>
        <div class="text">
            <div class="first-four">借款人:{{data.custName}}</div>
            <div class="first-four">身份证件号码:{{data.custId}}</div>
            <div class="first-four">共借人:{{data.jointBorrowerName}}</div>
            <div class="first-four">身份证件号码:{{data.jointBorrowerId}}</div>
            <div class="div-list">审批金额:{{data.amtMoney}}元</div>
            <div class="div-list">期限:{{data.term}}个月</div>
            <div class="div-list">担保方式:{{data.guarantMode}}</div>
            <div class="div-list">贷款产品:{{data.product}}</div>
            <div class="address">抵押物地址:</div>
            <div class="address-data">{{data.mortAddr}}</div>
            <div class="div-list">产权证编号:{{data.propNum}}</div>
            <div class="div-list">还款方式:{{data.repayMode}}</div>
            <div class="div-list">提前还款:{{data.isPrepayMent}}</div>
            <div class="div-list">到期续贷:{{data.continueLoan}}</div>
            <div class="div-list weight-style">放款条件：</div>
            <div class="div-list-content" v-html="data.lendCondition"></div>
            <div class="div-list weight-style">放款前落实手续：</div>
            <div class="div-list-content" v-html="data.lendProcedure">
            </div>
        </div>
        <div class="footer">
            <li class="div-list weight-style">其他审批意见：</li>
            <li class="div-list-content" v-html="data.otherOpinion"></li>
            <li class="div-list">批函有效期&nbsp;&nbsp;&nbsp;{{data.letterTerm}}&nbsp;&nbsp;&nbsp;个自然日</li>
        </div>
        <div class="signature">
            <ul>
                <li>亚投金服</li>
                <li>{{dateData.year}}&nbsp;&nbsp;年&nbsp;&nbsp;{{dateData.month}}&nbsp;&nbsp;月&nbsp;&nbsp;{{dateData.day}}&nbsp;&nbsp;日</li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                data: '',
                dateData: ''
            }
        },
        mounted: function () {
            if (localStorage.getItem('preData')) {
                this.data = JSON.parse(localStorage.getItem('preData'));
                this.data.lendCondition=this.data.lendCondition.replace(/\n/ig,'<br>');
                this.data.lendProcedure=this.data.lendProcedure.replace(/\n/ig,'<br>');
                this.data.otherOpinion=this.data.otherOpinion.replace(/\n/ig,'<br>');
            }
            var d = new Date;
            this.dateData = {
                'year': d.getFullYear(),
                'month': d.getMonth() + 1,
                'day': d.getDate()
            }
            this.data.amtMoney=this.formatMoney(this.data.amtMoney,2,"",",");
        }
    }

</script>
<style>
    .content-loanpre .weight-style {
        font-weight: 600;
    }

    .content-loanpre div, li {
        font-family: SimSun-ExtB;
        color: #222;
        font-size: 14px;
    }

    .content-loanpre {
        width: 940px;
        margin: 0 auto;
        height: 100%;
        padding: 60px 0px;
        margin-left: 70px;
    }

    .content-loanpre .address, .address-data {
        display: inline-block;
    }

    .content-loanpre .address {
        width: 84px;
        vertical-align: top;
        margin-top: 4px;
        margin-bottom: 5px;
    }

    .content-loanpre .address-data {
        width: 80%;
        margin-top: 4px;
        margin-bottom: 5px;
        margin-left: -10px;
        line-height: 22px;
    }

    .content-loanpre .title {
        height: 60px;
        border-bottom: 2px solid #464646;
        padding-bottom: 20px;
    }

    .content-loanpre .title img {
        height: 100%;
        display: block;
    }

    .content-loanpre div.name {
        height: 70px;
        text-align: center;
        line-height: 70px;
        font-size: 30px;
        font-weight: 600;
        color: #101010;
        margin-top: 15px;
    }

    .content-loanpre .kong {
        width: 55%;
        display: inline-block;
    }

    .content-loanpre .number {
        height: 60px;
        line-height: 60px;
        font-size: 14px;
        width: 42%;
        display: inline-block;
        margin-bottom: 20px;
    }

    .content-loanpre .div-list, .first-four {
        height: 30px;
        line-height: 30px;
    }

    .content-loanpre .div-list-content {
        line-height: 22px;
    }

    .content-loanpre .text div.first-four {
        display: inline-block;
        width: 56%;
    }

    .content-loanpre .text div.first-four:nth-child(2n) {
        width: 42%;
    }

    .content-loanpre .signature {
        height: 100px;
        margin-top: 40px;
    }

    .content-loanpre .signature ul {
        width: 330px;
        float: right;
    }

    .content-loanpre .signature ul li {
        width: 100%;
        text-align: center;
        height: 30px;
        line-height: 30px;
    }

    .content-loanpre .focus-style {
        font-weight: 600;
    }

</style>
