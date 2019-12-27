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
    const remark = event.target.value
    this.setData({
      remark
    })
  }
});
