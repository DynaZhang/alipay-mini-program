Page({
  data: {
    swiperList: [],
    recList: [],
    newList: []
  },
  onLoad () {
    my.request({
      url: 'http://www.imoocdsp.com/index/carousels',
      method: 'post',
      dataType: 'json',
      success: (result) => {
        console.log(result.data.data)
        this.setData({
          swiperList: result.data.data
        })
      },
      error: (err) => {
        console.log(err)
      }
    });
    my.request({
      url: 'http://www.imoocdsp.com/index/items/rec',
      method: 'post',
      data: {
        listType: 'rec'
      },
      dataType: 'json',
      success: (result) => {
        console.log(result.data.data)
        this.setData({
          recList: result.data.data
        })
      },
      error: (err) => {
        console.log(err)
      }
    });
    my.request({
      url: 'http://www.imoocdsp.com/index/items/new',
      method: 'post',
      dataType: 'json',
      success: (result) => {
        console.log(result.data.data)
        this.setData({
          newList: result.data.data
        })
      },
      error: (err) => {
        console.log(err)
      }
    });
  },
  async onPullDownRefresh() {
    await my.request({
      url: 'http://www.imoocdsp.com/index/carousels',
      method: 'post',
      dataType: 'json',
      success: (result) => {
        console.log(result.data.data)
        this.setData({
          swiperList: result.data.data
        })
      },
      error: (err) => {
        console.log(err)
      }
    });
    await my.request({
      url: 'http://www.imoocdsp.com/index/items/rec',
      method: 'post',
      data: {
        listType: 'rec'
      },
      dataType: 'json',
      success: (result) => {
        console.log(result.data.data)
        this.setData({
          recList: result.data.data
        })
      },
      error: (err) => {
        console.log(err)
      }
    });
    await my.request({
      url: 'http://www.imoocdsp.com/index/items/new',
      method: 'post',
      dataType: 'json',
      success: (result) => {
        console.log(result.data.data)
        this.setData({
          newList: result.data.data
        })
      },
      error: (err) => {
        console.log(err)
      }
    });
    my.stopPullDownRefresh();
  },
  toItemDetail(event) {
    const {itemId} = event.target.dataset
    my.navigateTo({
      url: `/pages/query/item/item?id=${itemId}`
    });
  }
});
