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
    let itemName = event.detail.value
    if (!itemName && itemName !== 0) {
      itemName = ''
    }
    my.navigateTo({
      url:  `/pages/query/list/list?searchType=words&itemName=${itemName}`
    });
  }
});
