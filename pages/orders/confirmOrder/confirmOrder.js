Page({
  data: {
    preOrderList: [],
    checkedOrderAmount: 0,
    checkedOrderPriceAmount: 0,
    remark: ''
  },
  onShow() {
    let preOrderList = my.getStorageSync({
      key: 'preOrderList',
    }).data
    this.setData({
      preOrderList
    })
    console.log(this.data.preOrderList)
    let checkedOrderPriceAmount = 0
    this.data.preOrderList.forEach(item => {
      checkedOrderPriceAmount += Number(item.priceDiscountYuan) * item.counts
    })
    this.setData({
      checkedOrderPriceAmount,
      checkedOrderAmount: preOrderList.length
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
