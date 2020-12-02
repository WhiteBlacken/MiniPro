var util = require("../../utils/util.js");

Page({
  data: {
    registBtnTxt: "提交",
    registBtnBgBgColor: "#ff9900",
    getSmsCodeBtnTxt: "获取验证码",
    getSmsCodeBtnColor: "#ff9900",
    getSmsCodeBtnTime: 60,
    btnLoading: false,
    registDisabled: false,
    smsCodeDisabled: false,
    inputUserName: ''
  },
  getInputUserName: function(e) {
    var value = e.detail.value;
    this.setData({
      inputUserName: value
    });
  },
  formSubmit: function(e) {
    var param = e.detail.value;
    this.mysubmit(param);
  },
  mysubmit: function(param) {
    var flag = util.checkUserName(param) &&
      this.checkUsernameIsRegist(param) &&
      util.checkPassword(param) &&
      util.checkSmsCode(param);
    var that = this;
    if (flag) {
      var userName = param.username.trim();
      var newPwd = param.password;
      this.setregistData1();
      // 将新密码写入数据缓存(更新密码)
      wx.setStorage({
        key:userName,
        data:newPwd
      })


      
      setTimeout(function() {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1500
        });
        that.setregistData2();
        that.redirectTo(param);
      }, 2000);
    }
  },
  setregistData1: function() {
    this.setData({
      registBtnTxt: "提交中",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  setregistData2: function() {
    this.setData({
      registBtnTxt: "提交",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#ff9900",
      btnLoading: !this.data.btnLoading
    });
  },
  // 从本地存储中查看，输入的username是否已经注册过
  checkUsernameIsRegist: function(param) {
    var userName = param.username.trim();
    var newPwd = param.password;
    try {
      // 首先从缓存获取指定用户名的信息，
      // 若获取成功，则返回true，
      // 否则提示"该手机尚未注册！"，并返回false。
      // 在此补齐判定手机号码是否注册过的代码
      var flag = wx.getStorageSync(userName)
      if (flag) {
        // Do something with return value
        return true
      }else{
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '该手机尚未注册'
        });
      }










    } catch (e) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '获取注册信息出现异常！'
      });
      return false;
    }
  },

  smsCodeCountDown() {
    util.smsCodeCountDown(this);
  },

  redirectTo: function(param) {
    // 需要将param转换为字符串
    param = JSON.stringify(param);
    wx.redirectTo({
      url: '../main/main?param=' + param //参数只能是字符串形式，不能为json对象
    })
  }

})