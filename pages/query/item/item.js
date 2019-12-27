Page({
  data: {
    itemDetail: null,
    animationOpacity: 0,
    animationInfo: {},
    cartIcon: '/resources/icon/smallIco/cart-empty.png'
  },
  onShow() {
    let animation = my.createAnimation();
    this.setData({
      animationInfo: animation.export()
    })
  },
  addToCart() {
    this.setData({
      animationOpacity: 1
    })
    this.showAddToCartAnimation()
    
    let itemId = this.data.itemDetail.id
    this.cartItemIncrease(itemId)
  },
  cartItemIncrease(itemId) {
    let cartItemIdArray =  my.getStorageSync({
      key: 'cartItemIdArray'
    }).data;
    console.log(cartItemIdArray)
    if (cartItemIdArray === null || cartItemIdArray === undefined) {
      cartItemIdArray = []
    }
    let pos = -1
    cartItemIdArray.forEach((value,index) => {
      if (value.id === itemId) {
        pos = index
      }
    })
    if (pos === -1) {
      let cartItem = getApp().cartItem(itemId,1,false)
      cartItemIdArray.push(cartItem)
    } else {
      cartItemIdArray[pos].counts += 1
    }
    my.setStorageSync({
      key: 'cartItemIdArray',
      data: cartItemIdArray
    });

  },
  showAddToCartAnimation() {
    let animation = my.createAnimation({
      duration: 500
    }); 
    this.animation = animation
    this.animation.rotate(-180).translateX("296rpx").step()
    this.setData({
      animationInfo: this.animation.export(),
      cartIcon: '/resources/icon/smallIco/cart-full.png'
    })

    setTimeout(() => {
      this.setData({
        animationOpacity: 0
      })
      let animation = my.createAnimation({
          duration: 500
        }); 
        this.animation = animation
        this.animation.rotate(0).translateX(0).step()
        this.setData({
          animationInfo: this.animation.export()
        })
    }, 500)
  },
  onLoad(params) {
    const itemId = params.id
    this.getItemDetail(itemId)
  },
  getItemDetail(itemId) {
    const params = {itemId}
    my.showLoading({
      content: '疯狂加载中...'
    });
    my.request({
      method: 'post',
      url: 'http://www.imoocdsp.com/items/searchById',
      data: params,
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      success: (result) => {
        const itemDetail = result.data.data
        itemDetail.headerImages = itemDetail.headerImages ? JSON.parse(itemDetail.headerImages) : []
        itemDetail.serviceDesc = itemDetail.serviceDesc ? JSON.parse(itemDetail.serviceDesc) : {}
        itemDetail.content = itemDetail.content ? JSON.parse(itemDetail.content) : []
        console.log(JSON.stringify(itemDetail.content))
        this.setData({
          itemDetail
        })
        my.hideLoading()
      },
      error: (error) => {
        console.log(error)
        my.hideLoading()
      }
    });
  },
  goToCart() {
    my.switchTab({
      url: 'pages/shoppingCart/cart/cart'
    });
  },
  buyMe() {
    my.setStorageSync({
      key: 'preOrderList',
      data: [Object.assign({counts: 1}, this.data.itemDetail)]
    })
    my.navigateTo({
      url: '/pages/orders/confirmOrder/confirmOrder'
    });
  }
});
