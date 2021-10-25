"use strict";
var app = getApp();
Page({
    data: {
   
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName')
    },
  

    jumpin: function (){
        
        this.animate('.login', [
            { opacity: 1.0, width:'100%', backgroundColor: '#FF0000' },
            {opacity:0.5,width:'80%',backgroundColor:'green'}
            ], 1000, function () {
                
            wx.navigateTo({
              url: '../selectpage/select',
            })
            this.clearAnimation('.login', { opacity: true, width:true,backgroundColor:true}, function () {
            })
          }.bind(this))
        
     
          
 /**/
 var that = this;
 wx.showModal({//用户授权弹窗
   title: '温馨提示',
   content: '提示',
   success(res) {
     console.log(res)
     //如果用户点击了确定按钮
     if (res.confirm) {
       wx.getUserProfile({
         desc: '获取你的昵称、头像、地区及性别',
         success: res => {
           console.log(res.userInfo)//控制台输出结果
           wx.setStorage({
            key:"avatar",
            data:res.userInfo["avatarUrl"]
           })
           wx.setStorage({
             key:"nick",
             data:res.userInfo["nickName"]
            })
            if(res.userInfo["gender"]==1){
                wx.setStorage({
                    key:"gender",
                    data:"男"
                   })
            }
            else if(res.userInfo["gender"]==2){
                wx.setStorage({
                    key:"gender",
                    data:"女"
                   })
            }else{
              wx.setStorage({
                key:"gender",
                data:0,
               })
            }
          
         },
         fail: res => {
           console.log(res)
           //拒绝授权
           wx.showToast({
             title: '登录失败',
             icon: 'error',
             duration: 2000
           });
           return;
         }
       });
     } else if (res.cancel) {
       //如果用户点击了取消按钮
       console.log(3);
       wx.showToast({
         title: '登录失败',
         icon: 'error',
         duration: 2000
       });
       return;
     }
   }
 })


    },
    onLoad: function () {
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            });
        }
        


    },
    getUserProfile: function () {
        var _this = this;
        wx.getUserProfile({
            desc: '展示用户信息',
            success: function (res) {
                console.log(res);
                _this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                });
            }
        });
    },
    getUserInfo: function (e) {
        console.log(e);
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        });
    }
});
