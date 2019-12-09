Page({
  data: {},
  onLoad(params) {
    let searchType = params.searchType
    if (searchType === 'words') {
      let itemName = params.itemName
      this.handleSearchByName(itemName)
    } else if (searchType === 'cat') {
      let catId = params.catId
      let catName = params.catName
      this.handleSerarhByCat(catId, catName)
    }
  },
  handleSearchByName(itemName) {
    const params = { itemName }
    my.showNavigationBarLoading();
    my.request({
      url: 'http://www.imoocdsp.com/items/search',
      method: 'post',
      data: params,
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      success: (result) => {
        console.log(result.data.data)
        my.hideNavigationBarLoading();
      },
      error: (err) => {
        console.log(err)
        my.hideNavigationBarLoading();
      }
    });

  },
  handleSerarhByCat(catId, catName) {
    const params = { catId }
    my.showNavigationBarLoading();
    my.request({
      url: 'http://www.imoocdsp.com/items/searchByCat',
      method: 'post',
      data: params,
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      success: (result) => {
        console.log(result.data.data)
        my.hideNavigationBarLoading();
      },
      error: (err) => {
        my.hideNavigationBarLoading();
      }
    }) 
  }
});
