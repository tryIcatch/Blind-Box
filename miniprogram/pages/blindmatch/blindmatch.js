const { config } = require("../config")

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
      wx.request({
        url: config.url+'randomselect/',
        method:"POST",
        data:{
          sex:"男"
        },
        header:{
          'content-type' : 'application/x-www-form-urlencoded',
        },
        success : function(e){
         
          if(e["data"]["status"]=="null"){
            wx.showToast({
              title: '还没有人投入纸条噢',
              icon:"none"
            })
          }else{
            wx.navigateTo({
              url: '../getinfor/infor?sex=1',
            })
          }
          
          
        }
      })
   
    },
   
  opengirl: function(){
    wx.request({
      url: config.url+'randomselect/',
      method:"POST",
      data:{
        sex:"女"
      },
      header:{
        'content-type' : 'application/x-www-form-urlencoded',
      },
      success : function(e){
       
        if(e["data"]["status"]=="null"){
          wx.showToast({
            title: '还没有人投入纸条噢',
            icon:"none"
          })
        }else{
          wx.navigateTo({
            url: '../getinfor/infor?sex=2',
          })
        }
        
        
      }
    })
  },
  }
})
