// pages/getinfor/infor.js
import {config} from '../config'
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
    name:"",
    avatar:"",
    age:"",
    height:"",
    nick:"", 
    phone:"",
    sex:"",
    wxnumb:"",
    introduce:""
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    get : function(){
  
      wx.navigateTo({
        url: '../index/index',
      })
    },
    onLoad :function(e){
      var that=this
      /* 男*/   
      if(e["sex"]==1){
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
                that.setData({
                  avatar:e.data.data[0]["UserAvatar"],
                  height:e.data.data[0]["UserHeight"],
                  age:e.data.data[0]["UserAge"],
                  introduce:e.data.data[0]["UserIntroduce"],
                  name:e.data.data[0]["UserName"],
                  nick:e.data.data[0]["UserNick"],
                  phone:e.data.data[0]["UserPhone"],
                  sex:e.data.data[0]["UserSex"],
                  wxnumb:e.data.data[0]["UserWxnumb"],
                })
              }
              
              
            }
          })
        }
          /*女*/   
      else if(e["sex"]==2){
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
              that.setData({
                avatar:e.data.data[0]["UserAvatar"],
                height:e.data.data[0]["UserHeight"],
                age:e.data.data[0]["UserAge"],
                introduce:e.data.data[0]["UserIntroduce"],
                name:e.data.data[0]["UserName"],
                nick:e.data.data[0]["UserNick"],
                phone:e.data.data[0]["UserPhone"],
                sex:e.data.data[0]["UserSex"],
                wxnumb:e.data.data[0]["UserWxnumb"],
              })
            }
             console.log(e)
          }
        })
      }
     },
  }
})
