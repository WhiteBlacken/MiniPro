// 电子邮箱和手机号的正则表达式
function regexConfig() {
  var reg = {
    email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    phone: /^1(3|4|5|7|8)\d{9}$/
  }
  return reg;
}

// 检查用户名是否符合正则表达式的规范
function checkUserName(param) {
  var phone = regexConfig().phone;
  var inputUserName = param.username.trim();
  if (phone.test(inputUserName)) {
    return true;
  } else {
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '请输入正确的手机号码'
    });
    return false;
  }
}

// 检查密码是否符合要求
function checkPassword(param) {
  var userName = param.username.trim();
  var password = param.password;
  if (password.length <= 0) {
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '请设置密码'
    });
    return false;
  } else if (password.length < 6 || password.length > 20) {
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '密码长度为6-20位字符'
    });
    return false;
  } else {
    return true;
  }
}

// 检查用户名是否符合规范后，短信验证码60秒倒计时
function smsCodeCountDown(that) {
  var phone = regexConfig().phone;
  var inputUserName = that.data.inputUserName.trim();
  if (phone.test(inputUserName)) {
    var count = 60;
    var si = setInterval(function() {
      if (count > 0) {
        count--;
        that.setData({
          getSmsCodeBtnTxt: count + ' s',
          getSmsCodeBtnColor: "#999",
          smsCodeDisabled: true
        });
      } else {
        that.setData({
          getSmsCodeBtnTxt: "获取验证码",
          getSmsCodeBtnColor: "#ff9900",
          smsCodeDisabled: false
        });
        count = 60;
        clearInterval(si);
      }
    }, 1000);
  } else {
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '请输入正确的手机号码'
    });
  }
}

// 验证短信验证码是否正确
function checkSmsCode(param) {
  var smsCode = param.smsCode.trim();
  //演示验证码为6个0，正式开发需要通过wx.request获取
  var tempSmsCode = '000000';
  if (smsCode != tempSmsCode) {
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '请输入正确的短信验证码'
    });
    return false;
  } else {
    return true;
  }
}

// 模块化导出函数
module.exports = {
  regexConfig: regexConfig,

  smsCodeCountDown: smsCodeCountDown,
  checkSmsCode: checkSmsCode,

  checkUserName: checkUserName,
  checkPassword: checkPassword
}