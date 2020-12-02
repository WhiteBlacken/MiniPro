var util = require("../../utils/util.js");

Page({
  data: {
    loginBtnTxt: "登录",
    loginBtnBgBgColor: "#ff9900",
    btnLoading: false,
    disabled: false,
    inputUserName: '',
    inputPassword: '',
  },
  
  formSubmit: function(e) {
    var param = e.detail.value;
    var flag = util.checkUserName(param) && 
                util.checkPassword(param)
    if (flag) {
      this.setLoginData1();
      // 利用本地存储，实现模拟登录
      this.simulateLogin(param);
    }
  },

  simulateLogin: function(param) {
    var that = this;
    console.log("param",param)
    // 在此补齐获取本地存储的登录信息的代码
    // 成功则调用succGetUserName函数，失败则调用failGetUserName函数
    wx.getStorage({
      key: param.username.trim(),
      success (res) {
        that.succGetUserName(param,res.data)
      },fail(res){
        that.failGetUserName(param)
      }
    })
      
      
    // 通过用户名，从本地缓存数据中成功获取到注册时设置的密码
    // 回调函数succCallback中，将输入密码和缓存密码比对，处理跳转
        
      
      
    // 如果没有获取到缓存密码，在此处理
        
      
    
  },
  succGetUserName: function(param, storagedPwd) {
    // 获取到登录框中的密码
    var password = param.password;
    var that = this;
    // 如果登录框中的密码，和缓存中该用户名对应的密码一样
    if (password == storagedPwd) {
      setTimeout(function() {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1500
        });
        that.setLoginData2();
        that.redirectTo(param);
      }, 2000);
    } else {
      // 如果登录框中的密码，和缓存中该用户名对应的密码不一样
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '用户名或者密码输入错误，请重新输入！'
      });
      this.setLoginData2();
    }
  },
  failGetUserName: function(param) {
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '用户名或密码有误，请重新输入'
    });
    this.setLoginData2();
  },
  setLoginData1: function() {
    this.setData({
      loginBtnTxt: "登录中",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  setLoginData2: function() {
    this.setData({
      loginBtnTxt: "登录",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#ff9900",
      btnLoading: !this.data.btnLoading
    });
  },
  
  redirectTo: function(param) {
    //需要将param转换为字符串
    param = JSON.stringify(param);
    wx.redirectTo({
      // 参数只能是字符串形式，不能为json对象
      url: '../main/main?param=' + param
    })
  }

})