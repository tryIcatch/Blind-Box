// pages/lovermatchoage/lovermatch.js
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
    age:"",
    wxnumb:"",
    height:"",
    sexvalue:"",
    editorvalue:"",
    phone:"",
    avatar:"",
    nick:"",
    verify:"",
    randomcode:"",
    status:"",
    gender:0,
    hide:true,
    show:"",
    second:60,
   
    sex: [{
      id: 1,
      value: '男'
    }, {
      id: 2,
      value: '女'
    }],
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onLoad:function(){
      var that=this
           wx.getStorage({
          key: 'avatar',
          success: function(e){
            console.log(e.data)
               that.setData({
                 avatar:e.data
               })
          }
        })
        wx.getStorage({
          key: 'nick',
          success: function(e){
            console.log(e.data)
            that.setData({
              nick:e.data
            })
       }
        })
    },
    getphone :function(e){
      wx.setStorage({
        data: e.detail.value,
        key: 'phone',
      })
       this.setData({
         phone:e.detail.value
       })
    },
    getage: function(e){
        this.setData({
          age:e.detail.value
        })
    },
    sendverify: function(e){
      var reg=/^(1[3|4|5|6|7|8|9])\d{9}$/;
      if(this.data.phone==""){
        wx.showToast({
          title: '手机号不能为空',
          icon:"none"
        })
     }
     
     else if(!reg.test(this.data.phone)){     
         wx.showToast({
           title: '手机号格式错误',
           icon:'none',
         })
         return;    
     }
     else {
      var that=this; 
      that.setData({
        second:60
      })
      wx.request({
        url: config.url+'verify/',
        method:"POST",
        data:{
          phone:that.data.phone
        },
        header:{
          'content-type' : 'application/x-www-form-urlencoded',
        },
        success: function(e){
          that.setData({
            randomcode:e.data["random_code"]
          })
          that.setData({
            status:"true"
          })
          that.setData({
            hide:false
          })
          that.setData({
            show:true
          })
          
        
         
          setInterval(function () {
            if (that.data.second <= 0) {
              that.setData({
                status:false
              })
              that.setData({
                hide:true
              })
              that.setData({
                show:false
              })
              return
            }

            that.setData({
              second:  that.data.second-1 
            })
          }, 1000)
          
     
        } 
      })
   
     }
  
    },
    getverify: function(e){
      this.setData({
        verify:e.detail.value
      })
   
    },
    getname: function (e) {
      this.setData({
        name: e.detail.value
      })
    },
    getwxnumb: function (e) {
      this.setData({
        wxnumb: e.detail.value
      })
    },
    getheight: function (e) {
      this.setData({
        height: e.detail.value
      })
    },
    radioChange(e) {

      var that=this
      if(e.detail.value==1){
        this.setData({
          sexvalue: "男"
        })
      }
      else if(e.detail.value==2){
          this.setData({
            sexvalue:"女"
          })
      }
      if(this.data.sexvalue!=this.data.gender)
      {
           if(this.data.gender!=0){
             wx.showToast({
               title: '性别与微信性别不符，请认真填写',
               icon:"none"
             })
           }

         }

       
    },
    introduce: function(e){
          this.setData({
              editorvalue:e.detail["text"]
          })
    },
  submit: function(){
    var reg=/^(1[3|4|5|6|7|8|9])\d{9}$/;
    var that=this

    wx.getStorage({
      key: 'gender',
      success (res) {
       that.setData({
         gender:res.data
       }) 
      }
    })

      if(this.data.name==""){
       wx.showToast({
         title: '姓名不能为空',
         icon:"none"
       })
      }
      else if(this.data.sexvalue==""){
        wx.showToast({
          title: '性别不能为空',
          icon:"none"
        })
      }
      else if(this.data.age==""){
        wx.showToast({
          title: '年龄不能为空',
          icon:"none"
        })
      }
      else if(this.data.wxnumb==""){
        wx.showToast({
          title: '微信号不能为空',
          icon:"none"
        })
      }
      else if(this.data.phone==""){
         wx.showToast({
           title: '手机号不能为空',
           icon:"none"
         })
      }
      
      else if(!reg.test(this.data.phone)){     
          wx.showToast({
            title: '手机号格式错误',
            icon:'none',
          })
          return;    
      }
      else if(this.data.verify==""){
        wx.showToast({
          title: '验证码不能为空',
          icon:"none"
        })
      }
      else if(this.data.height==""){
        wx.showToast({
          title: '身高不能为空',
          icon:"none"
        })
      }
      else if(this.data.editorvalue==""){
        wx.showToast({
          title: '自我介绍不能为空',
          icon:"none"
        })
      }
      else if(this.data.verify!=this.data.randomcode){
        wx.showToast({
          title: '验证码不正确',
          icon:"none"
        })
      }else {
        var that=this;
        var date=new Date(new Date()).toLocaleDateString()
        console.log(this.data.nick)
        console.log(this.data.avatar)
        wx.request({
          url: config.url+'lovermatch/',
          method:'POST',
          data:{
            name:this.data.name,
            age:this.data.age,
            sex:this.data.sexvalue,
            wxnumb:this.data.wxnumb,
            height:this.data.height,
            introduce:this.data.editorvalue,
            phone:this.data.phone,
            avatar:this.data.avatar,
            nick:this.data.nick,
            date:date,
            state:true,
            "csrfmiddlewaretoken":'csrftoken=Tnc4FuckRWAzmn8TbAzve1leNIYtyjX5JfmbdrX6RzLpr3DBinGdQTTer9bgehyo'
          },
          header:{
            'content-type' : 'application/x-www-form-urlencoded',
            'Cookie':'csrftoken=Tnc4FuckRWAzmn8TbAzve1leNIYtyjX5JfmbdrX6RzLpr3DBinGdQTTer9bgehyo',
          },
          success:function name(params) {
           if(params.data==200){

           }
           else{
             wx.showToast({
               title: '已经投递过了',
               icon:"none"
             })
           }
          },
          fail:function name(params) {
            console.log(params)
          }
        })
        wx.redirectTo({
          url: '../selectpage/select',
        })
       that.setData({
        name:"",
        wxnumb:"",
        height:"",
        sexvalue:"",
        editorvalue:"",
        phone:"",
        verify:"",
        randomcode:"",
        status:"",
        show:"",
        gender:"0",
        avatar:"",
        nick:"",
       })
      
      }
  

  },



   

  }
})
