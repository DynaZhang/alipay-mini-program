const app = getApp()

Page({
  data: {
    itemDetail: null,
    animationOpacity: 0,
    animationInfo: {},
    cartIcon: '/resources/icon/smallIco/cart-empty.png',
    isLike: false
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
        this.isItemLike()
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
  },
  isItemLike() {
    const userInfo = app.globalUserInfo()
    if (userInfo != null && userInfo != undefined) {
      userId = userInfo.id
    } else {
      return
    }
    const params = {
      itemId: this.data.itemDetail.id,
      userId
    }
    my.request({
      method: 'post',
      url: 'http://www.imoocdsp.com/item/userIsLikeItem',
      data: params,
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      success: (result) => {
        this.setData({
          isLike: result.data.data === 0 ? false : true
        })
      },
      error: (error) => {
        console.log(error)
      }
    })
  },
  likeOperator() {
    const userInfo = app.globalUserInfo()
    if (userInfo != null && userInfo != undefined) {
      userId = userInfo.id
    } else {
      my.confirm({
        title: '温馨提示',
        content: '收藏商品前请先登录',
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
      itemId: this.data.itemDetail.id,
      userId
    }
    my.request({
      method: 'post',
      url: `http://www.imoocdsp.com/item/${this.data.isLike ? 'unlike' : 'like'}`,
      data: params,
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      success: (result) => {
        this.setData({
          isLike: !this.data.isLike
        })
      },
      error: (error) => {
        console.log(error)
      }
    }) 
  }
});
