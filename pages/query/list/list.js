Page({
  data: {
    catName: '',
    itemList: []
  },
  onLoad(params) {
    let searchType = params.searchType
    if (searchType === 'words') {
      let itemName = params.itemName
      this.handleSearchByName(itemName)
      this.setData({
        catName: '搜索结果'
      })
    } else if (searchType === 'cat') {
      let catId = params.catId
      let catName = params.catName
      this.setData({
        catName
      })
      this.handleSerarhByCat(catId, catName)
    }
  },
  handleSearchByName(itemName) {
    const params = { itemName }
    my.showLoading({
      content: '疯狂加载中...'
    })
    my.request({
      url: 'http://www.imoocdsp.com/items/search',
      method: 'post',
      data: params,
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      success: (result) => {
        console.log(result.data.data)
        this.setData({
          itemList: result.data.data
        })
        my.hideLoading();
      },
      error: (err) => {
        console.log(err)
        my.hideLoading();
      }
    });

  },
  handleSerarhByCat(catId, catName) {
    const params = { catId }
    my.showLoading({
      content: '疯狂加载中...'
    });
    my.request({
      url: 'http://www.imoocdsp.com/items/searchByCat',
      method: 'post',
      data: params,
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      success: (result) => {
        console.log(result.data.data)
        this.setData({
          itemList: result.data.data
        })
        my.hideLoading();
      },
      error: (err) => {
        my.hideLoading();
      }
    }) 
  }
});
