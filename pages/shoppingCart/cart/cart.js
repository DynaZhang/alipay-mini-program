Page({
  data: {
    cartItemList: [],
    emptyHidden: false,
    totalPrice: 0
  },
  onShow() {
    const cartItemIdArray = my.getStorageSync({
      key: 'cartItemIdArray'
    }).data;
    let emptyHidden
    if (cartItemIdArray === null || cartItemIdArray === undefined) {
      emptyHidden = false
    } else {
      emptyHidden = cartItemIdArray.length > 0
    }
    this.setData({
      emptyHidden
    })
    if (emptyHidden) {
      this.getCartItemDetail(cartItemIdArray)
    }
  },
  getCartItemDetail(cartItemIdArray) {
    let itemIdList = []
    cartItemIdArray.forEach(item => {
      itemIdList.push(item.id)
    })
    const itemIds = itemIdList.join(',')
    const params = {itemIds}
    my.showLoading();
    my.request({
      method: 'post',
      url: 'http://www.imoocdsp.com/item/queryItems',
      data: params,
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      success: (result) => {
        const itemList = result.data.data
        let totalPrice = 0
        for (let i = 0; i < itemList.length; i++) {
          const cartItem = getApp().findCartItemById(cartItemIdArray, itemList[i].id) 
          if (cartItem === null) {
            itemList[i].counts = 0
          } else {
            itemList[i].counts = cartItem.counts
            itemList[i].isSelected = cartItem.isSelected
            totalPrice += itemList[i].priceDiscountYuan * cartItem.counts
          }
        }

        this.setData({
          cartItemList: itemList.filter((item,index) => {return item.counts > 0}),
          totalPrice
        })
        my.hideLoading()
      },
      error: (error) => {
        console.log(error)
        my.hideLoading()
      }
    });
  },
  helpYourself() {
    my.switchTab({
      url: 'pages/index/index'
    });
  }
});
