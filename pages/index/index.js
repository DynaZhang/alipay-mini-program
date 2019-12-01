const app = getApp();

Page({
  onLoad(query) {
    // 页面加载
  },
  onReady() {
    // 页面加载完成
    console.log(app.name)
    console.log(app.course)
    app.sayHello()
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
  },
});
