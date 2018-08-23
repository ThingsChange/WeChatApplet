/**
 *
 * @author  56477
 * @create 2018-08-23 9:20
 * @PROJECT_NAME WeChatApplet
 * @note 请阐述当前文件的作用
 **/
import util from '../../utils/util.js'
Page({
    data: {
        picture: [],
        userInfo: {},
    },
    onLoad: function () {
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map(log => {
                return util.formatTime(new Date(log))
            }),
            userInfo: {name:'你大爷'}
        })
    }
})