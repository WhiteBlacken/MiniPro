var util = require("../../utils/util.js");

Page({
  data: {
    registBtnTxt: "注册",
    registBtnBgBgColor: "#ff9900",
    getSmsCodeBtnTxt: "获取验证码",
    getSmsCodeBtnColor: "#ff9900",
    getSmsCodeBtnTime:60,
    btnLoading: false,
    registDisabled: false,
    smsCodeDisabled: false,
    inputUserName: '',
    inputPassword: '',
  },
  getInputUserName: function (e) {
    var value = e.detail.value;
    this.setData({
      inputUserName: value
    });
  },
  formSubmit: function (e) {
    var param = e.detail.value;
    this.mysubmit(param);
  },
  mysubmit: function (param) {
    var flag = util.checkUserName(param) && util.checkPassword(param) && util.checkSmsCode(param)
    var that = this;
    if (flag) {
      this.setRegistData1();
      setTimeout(function () {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1500
        });
        that.setRegistData2(param); 
        that.redirectTo(param);
      }, 2000);
    }
  },
  setRegistData1: function () {
    this.setData({
      registBtnTxt: "注册中",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  setRegistData2: function (param) {
    // 在此补齐将注册信息写入本地缓存的代码
    console.log("param",param)
    wx.setStorage({
      key:param.username.trim(),
      data:param.password
    })

    
    
    // 恢复注册按钮上的文字和样式
    this.setData({
      registBtnTxt: "注册",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#ff9900",
      btnLoading: !this.data.btnLoading
    });
  },

  smsCodeCountDown(){
    util.smsCodeCountDown(this);
  },
  
  redirectTo: function (param) {
    //需要将param转换为字符串
    param = JSON.stringify(param);
    wx.redirectTo({
      url: '../main/main?param=' + param//参数只能是字符串形式，不能为json对象
    })
  }
})