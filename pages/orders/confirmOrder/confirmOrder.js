const app = getApp()

Page({
  data: {
    preOrderList: [],
    checkedOrderAmount: 0,
    checkedOrderPriceAmount: 0,
    remark: '',
    addressHidden: false,
    defaultAddress: null
  },
  onShow() {
    let preOrderList = my.getStorageSync({
      key: 'preOrderList',
    }).data
    this.setData({
      preOrderList
    })
    let checkedOrderPriceAmount = 0
    this.data.preOrderList.forEach(item => {
      checkedOrderPriceAmount += Number(item.priceDiscountYuan) * item.counts
    })
    this.setData({
      checkedOrderPriceAmount,
      checkedOrderAmount: preOrderList.length
    })
    this.initAddress()
  },
  initAddress() {
    const userInfo = app.globalUserInfo()
    if (userInfo != null && userInfo != undefined) {
      userId = userInfo.id
    } else {
      my.confirm({
        title: '温馨提示',
        content: '收藏商品请前往登录',
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
    }
    my.showLoading();
    my.request({
      url: `http://www.imoocdsp.com/address/default/${userId}`,
      method: 'post',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      dataType: 'json',
      success: (result) => {
        my.hideLoading();
        this.setData({
          addressHidden: true,
          defaultAddress: result.data.data
        })
      },
      error: (error) => {
        my.hideLoading();
      }
    })
  },
  setRemark(event) {
    const remark = event.detail.value
    this.setData({
      remark
    })
  },
  submitOrder() {
    let orderArr = []
    this.data.preOrderList.forEach(item => {
      let str = `${item.id}|${item.counts}`
      orderArr.push(str)
    })
    let itemStr = orderArr.join(',')
    const params = {
      itemStr,
      buyerId: 'zzl',
      remark: this.data.remark,
      addressId: '010'
    }
    my.showLoading();
    my.request({
      url: 'http://www.imoocdsp.com/order/createOrder',
      method: 'post',
      data: params,
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      success: (result) => {
        const orderSn = result.data.data
        this.clearCartItem()
        my.hideLoading()
        my.alert({
          title: '温馨提示',
          content: '提交订单成功',
          buttonText: '知道啦!'
        })
      },
      error: (error) => {
        my.hideLoading()
        my.alert({
          title: '温馨提示',
          content: '提交订单失败了，请稍后再试',
          buttonText: '知道啦!'
        })
      }
    })
  },
  clearCartItem() {
    my.removeStorageSync({
      key: 'cartItemIdArray'
    });
  }
});
