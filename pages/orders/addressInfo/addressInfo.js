const app = getApp()

Page({
  data: {
    recevier: '',
    mobile: '',
    city: '',
    descAddress: '',
    addressId: ''
  },
  onLoad(params) {
    const addressId = params.addressId
    if (addressId != null && addressId != undefined) {
      let userId = '1001'
      this.setData({
        addressId
      })
      const userInfo = app.globalUserInfo()
      if (userInfo != null && userInfo != undefined) {
        userId = userInfo.id
      }
      const params = {
        addressId,
        userId
      }
      my.showLoading();
      my.request({
        url: `http://www.imoocdsp.com/address/fetch`,
        method: 'post',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        dataType: 'json',
        data: params,
        success: (result) => {
          my.hideLoading()
          const addressInfo = result.data.data
          this.setData({
            receiver: addressInfo.receiver,
            mobile: addressInfo.mobile,
            city: addressInfo.city,
            descAddress: addressInfo.descAddress
          })
        },
        error: (error) => {
          my.hideLoading()
        }
      })
    }
  },
  submitAddress(event) {
    console.log(event)
    const addressBO = event.detail.value
    if (addressBO.receiver == null || addressBO.receiver == undefined || addressBO.receiver == '') {
      my.alert({
        title: '友情提示',
        content: '请填写收货人',
        bottonText: '知道了！'
      })
      return
    }
    if (addressBO.mobile === null || addressBO.mobile === undefined || addressBO.mobile === '') {
      my.alert({
        title: '友情提示',
        content: '请填写手机号',
        bottonText: '知道了！'
      })
      return
    }
    if (addressBO.txtCity === null || addressBO.txtCity === undefined || addressBO.txtCity === '') {
      my.alert({
        title: '友情提示',
        content: '请选择所在城市',
        bottonText: '知道了！'
      })
      return
    }
    if (addressBO.descAddress === null || addressBO.descAddress === undefined || addressBO.descAddress === '') {
      my.alert({
        title: '友情提示',
        content: '请选择详细地址',
        bottonText: '知道了！'
      })
      return
    }
    console.log(addressBO)
    let userInfo = app.globalUserInfo()
    let userId = 1001
    if (userInfo != null && userInfo != undefined) {
      userId = userInfo.id
    }
    const params = {
      userId,
      receiver: addressBO.receiver,
      mobile: addressBO.mobile,
      city: addressBO.txtCity,
      descAddress: addressBO.descAddress
    }
    my.showLoading();
    my.request({
      url: `http://www.imoocdsp.com/address/createOrUpdate?addressId=${this.data.addressId}`,
      method: 'post',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      dataType: 'json',
      data: params,
      success: (result) => {
        my.hideLoading();
        my.setStorageSync({
          key: 'addressChoosed',
          data: result.data.data
        })
        my.navigateBack();
      },
      error: (error) => {
        my.hideLoading()
        my.alert({
          title: '提示',
          content: '新增收货地址失败',
          bottonText: '知道了!'
        })
      }
    })
  },
});
