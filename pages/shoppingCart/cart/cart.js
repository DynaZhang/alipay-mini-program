Page({
  data: {
    cartItemList: [],
    emptyHidden: false,
    totalPrice: 0,
    checkAll: true,
    selectedItems: []
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
        const selectedItems = []
        for (let i = 0; i < itemList.length; i++) {
          const cartItem = getApp().findCartItemById(cartItemIdArray, itemList[i].id) 
          if (cartItem === null) {
            itemList[i].counts = 0
          } else {
            itemList[i].counts = cartItem.counts
            itemList[i].isSelected = cartItem.isSelected
            const symbol = `${itemList[i].id};${itemList[i].priceDiscountYuan};${itemList[i].counts}`
            itemList[i].symbol = symbol
            selectedItems.push(symbol)
          }
        }
        console.log(selectedItems)
        this.setData({
          cartItemList: itemList.filter((item,index) => {return item.counts > 0}),
          selectedItems
        })
        this.calPrice()
        console.log(this.data.selectedItems)
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
  },
  handleSelectItem(event) {
    const selectedValue = event.target.dataset.itemSymbol
    console.log(selectedValue)
    const pos = this.data.selectedItems.indexOf(selectedValue)
    if (pos === -1) {
      this.setData({
        selectedItems: [...this.data.selectedItems,selectedValue]
      })
    } else {
      const selectedItems = this.data.selectedItems
      selectedItems.splice(pos,1)
      this.setData({
        selectedItems
      })
    }
    this.calPrice()
    this.setData({
      checkAll: this.data.selectedItems.length === this.data.cartItemList.length
    })
  },
  handleSelectAll() {
    const selectedItems = []
    if (!this.data.checkAll) {
      this.data.cartItemList.forEach(item => {
        selectedItems.push(item.id)
      })
    }
    this.setData({
      selectedItems
    })
    this.calPrice()
  },
  calPrice() {
    let totalPrice = 0
    this.data.selectedItems.forEach(value => {
      const itemDetail = value.split(';')
      const priceDiscountYuan = parseFloat(itemDetail[1])
      const counts = parseInt(itemDetail[2])
      totalPrice += priceDiscountYuan * counts
    })
    this.setData({
      totalPrice
    })
  }
});
