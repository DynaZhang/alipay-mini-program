const app = getApp()

Page({
  data: {
    userInfo: {},
    userLogin: false
  },
  onLoad() {
    const userInfo = app.globalUserInfo()
    if (userInfo != null && userInfo != undefined) {
      this.setData({
        userInfo,
        userLogin: true
      })
      return
    }
    my.getAuthCode({
      scopes: 'auth_user',
      success: (res) => {
        const qq = '1015894542'
        my.request({
          url: `http://www.imoocdsp.com/team/login/${res.authCode}/${qq}`,
          method: 'post',
          success: (result) => {
            const userInfo = result.data.data
            this.setData({
              userInfo,
              userLogin: true
            })
            app.setGlobalUserInfo(userInfo)
          }
        });
      },
      fail: (res) => {

      },
      complete: (res) => {

      }
    });
  },
  login() {
    this.onLoad()
  },
  loginOut() {
    my.showActionSheet({
      items: ['退出','支付','人脸识别', '实名认证'],
      destructiveBtnIndex: 0,
      // badges: [
      //   {index: 0, type: 'none'},
      //   {index: 1, type: 'point'},
      //   {index: 2, type: 'num', text: '8'},
      //   {index: 3, type: 'text', text: '推荐'},
      //   {index: 4, type: 'more'}
      // ],
      success: (result) => {
        if (result.index === 0) {
          my.clearStorageSync();
          app.clearGlobalUserInfo()
          this.setData({
            userInfo: null,
            userLogin: false
          })
        }
      }
    });
  }
});
