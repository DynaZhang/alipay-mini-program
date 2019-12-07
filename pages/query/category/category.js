Page({
  data: {
    categoryList: []
  },
  onLoad() {
    my.request({
      url: 'http://www.imoocdsp.com/cats',
      method: 'post',
      dataType: 'json',
      success: (result) => {
        this.setData({
          categoryList: result.data.data
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  handleSearch (event) {
    const itemName = event.detail.value
    if (!itemName && itemName !== 0) {
      return
    }
    my.request({
      url: 'http://www.imoocdsp.com/items/search',
      method: 'post',
      dataType: 'json',
      data: {
        itemName: event.detail.value
      },
      success: function(result) {
        console.log(result.data.data)
      },
      fail: function(err) {

      }
    })
  }
});
