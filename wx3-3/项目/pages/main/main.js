var util = require("../../utils/util.js");

Page({
  data: {
    username: '',
    param: '',
    delBtnTxt: "删除注册信息",
    delBtnBgBgColor: "#ff9900",
    btnLoading: false,
    disabled: false,
  },
  onLoad: function(option) {
    // 页面初始化 options为页面跳转所带来的参数
    this.data.param = JSON.parse(option.param);
    this.setData({
      username: this.data.param.username
    });
  },

  goExpress: function(event) {
    wx.navigateTo({
      url: '../express/express'
    })
  },

  // 删除注册信息
  delRegInfo: function() {
    var that = this;
    // 此处不是拼url，不要使用如下语句
    // param = JSON.stringify(param);
    var curUserName = this.data.param.username.trim();
    this.setLoginData1();

    wx.removeStorage({
      key: curUserName,
      success(res) {
        // 提示已成功删除
        setTimeout(function() {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1500
          });
          that.setLoginData2();
          that.redirectTo();
        }, 2000);
      },
      fail(res) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '删除失败，请重试！'
        });
        that.setLoginData2();
      }
    });
  },
  setLoginData1: function() {
    this.setData({
      loginBtnTxt: "删除中",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  setLoginData2: function() {
    this.setData({
      loginBtnTxt: "删除",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#ff9900",
      btnLoading: !this.data.btnLoading
    });
  },
  redirectTo: function () {
    wx.redirectTo({
      url: '../login/login'
    })
  }
})