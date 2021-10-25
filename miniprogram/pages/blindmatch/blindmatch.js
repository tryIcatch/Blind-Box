// pages/blindmatch/blindmatch.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    openboy: function(){
      wx.navigateTo({
        url: '../getinfor/infor?sex=1',
      })
    },
   
  opengirl: function(){
    wx.navigateTo({
      url: '../getinfor/infor?sex=2',
    })
  },
  }
})
