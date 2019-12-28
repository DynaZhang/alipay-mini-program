App({
  // 定义常量
  userInfo: null,
  // 定义自定义方法
  cartItem(itemId,counts,isSelected) {
    var cartItem = new Object();
    cartItem.id = itemId
    cartItem.counts = counts
    cartItem.isSelected = isSelected
    return cartItem;
  },

  findCartItemById(cartItemArray, itemId) {
    for (let i = 0; i < cartItemArray.length; i++) {
      if (cartItemArray[i].id === itemId) {
        return cartItemArray[i]
      }
    }
    return null
  },

  globalUserInfo() {
    return this.userInfo
  },

  setGlobalUserInfo(userInfo) {
    this.userInfo = userInfo
  },

  clearGlobalUserInfo() {
    this.userInfo = null
  },

  onLaunch(options) {
    // 小程序启动
    console.info('App onLaunch');
  },
  onShow(options) {
    // 小程序显示
    console.log('App Onshow')
  },
  onHide() {
    // 小程序隐藏
    console.log('App OnHide')
  },
  onError() {
    // 小程序发生错误
    console.log('App OnError')
  } 
});
