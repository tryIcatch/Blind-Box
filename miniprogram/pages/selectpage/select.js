"use strict";
import {config} from '../config'
Page({
    data: {
          url: [
            '../img/sch.jpeg' ,
            '../img/sch1.jpeg' ,
           '../img/sch2.jpeg' ,
            '../img/sch3.jpeg' ,
            '../img/sch4.jpeg' 
          ],
 
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    height:'',
    status:'',
    frequency:0,

    
    },
    lovermatch: function(){
      wx.navigateTo({
        url: '../lovermatch/lovermatch',
      })
    },
  
    blindmatch: function(){
      var that =this;
      wx.getStorage({
        key: 'phone',
        success:function(){
          wx.navigateTo({
            url: '../blindmatch/blindmatch',
          })
           
        },
        fail: function(){
         
         wx.showToast({
           title: '必须投递纸条后才可解锁',
           icon:"none"
         })
         that.setData({
           status:"pointer-events: none;"
         })
        },
      })
  
    },
  
    onLoad: function () {
      var that =this;
      var date=new Date(new Date()).toLocaleDateString()

      wx.getStorage({
        key: 'phone',
        success:function(e){
          wx.request({
            url: config.url+'frequency/',
            method:"POST",
            data:{
             phone:e.data,
             date:date
            },
            header:{
              'content-type' : 'application/x-www-form-urlencoded',
            }
          }) 
        },
        fail:function(){
           that.setData({frequency:0})
        }
    
    })

    },
 
    goheight:function (e) {
      var width = wx.getSystemInfoSync().windowWidth
      //获取可使用窗口宽度
      var imgheight = e.detail.height
      //获取图片实际高度
      var imgwidth = e.detail.width
      //获取图片实际宽度
      var height = width * imgheight / imgwidth +"px"
     
      //计算等比swiper高度
      this.setData({
        height: height
      })
    }
});
