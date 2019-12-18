Page({
  data: {
    itemDetail: null
  },
  onLoad(params) {
    const itemId = 'item-new-3001'
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
  }
});
