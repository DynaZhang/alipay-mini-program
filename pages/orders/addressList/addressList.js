const app = getApp()

Page({
  data: {
    addressList: []
  },
  onLoad() {},
  onShow() {
    this.getAddressList()
  },
  getAddressList() {
    const userInfo = app.globalUserInfo()
    if (userInfo != null && userInfo != undefined) {
      userId = userInfo.id
    } else {
      my.confirm({
        title: '温馨提示',
        content: '添加收货地址请前往登录',
        confirmButtonText: '登录',
        cancelButtonText: '取消',
        success: (res) => {
          if (res.confirm) {
            my.switchTab({
              url: '/pages/mine/info/info'
            });
          }
        }
      });
      return
    }
    my.showLoading();
    my.request({
      url: `http://www.imoocdsp.com/address/addressList/${userId}`,
      method: 'post',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      dataType: 'json',
      success: (result) => {
        my.hideLoading();
        this.setData({
          addressList: result.data.data
        })
      },
      error: (error) => {
        my.hideLoading();
      }
    })
  },
  setDefault(event) {
    const addressId = event.detail.value
    const userInfo = app.globalUserInfo()
    if (userInfo != null && userInfo != undefined) {
      userId = userInfo.id
    } else {
      my.confirm({
        title: '温馨提示',
        content: '设置收货地址前请先登录',
        confirmButtonText: '登录',
        cancelButtonText: '取消',
        success: (res) => {
          if (res.confirm) {
            my.switchTab({
              url: '/pages/mine/info/info'
            });
          }
        }
      });
      return
    }
    const params = {
      userId,
      addressId
    }
    my.request({
      url: `http://www.imoocdsp.com/address/setDefault`,
      method: 'post',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      data: params,
      dataType: 'json',
      success: (result) => {
      },
      error: (error) => {
      }
    })
  },
  addNewAddress() {
    my.redirectTo({
      url: '/pages/orders/addressInfo/addressInfo'
    });
  },
  modifyAddress(event) {
    const addressId = event.target.dataset.addressId
    my.navigateTo({
      url: `/pages/orders/addressInfo/addressInfo?addressId=${addressId}`
    });
  },
  delAddress(event) {
    const addressId = event.target.dataset.addressId
    const userInfo = app.globalUserInfo()
    if (userInfo != null && userInfo != undefined) {
      userId = userInfo.id
    } else {
      my.confirm({
        title: '温馨提示',
        content: '删除收货地址前请先登录',
        confirmButtonText: '登录',
        cancelButtonText: '取消',
        success: (res) => {
          if (res.confirm) {
            my.switchTab({
              url: '/pages/mine/info/info'
            });
          }
        }
      });
      return
    }
    my.confirm({
      title: '提示',
      content: '确认删除此收货地址?',
      success: () => {
        const params = {
          userId,
          addressId
        }
        my.showLoading()
        my.request({
          url: `http://www.imoocdsp.com/address/delete/${addressId}`,
          method: 'post',
          headers: {'content-type': 'application/x-www-form-urlencoded'},
          dataType: 'json',
          success: (result) => {
            my.hideLoading()
            this.getAddressList()
          },
          error: (error) => {
            my.hideLoading()
          }
        })
      },
      error: () => {

      }
    });
  },
  confirmAddress() {
    my.navigateBack();
  }
});
