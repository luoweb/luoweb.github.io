function navigateToWeb() {
    console.log('navigateToWeb');
    wx.miniProgram.navigateTo({ url: '/pages/webview2/index' });
}
function navigateToApp() {
    console.log('navigateToApp');
    wx.miniProgram.navigateTo({ url: '/pages/logs/logs' });
}
function navigateTo() {
    console.log('navigateTo');
    wx.miniProgram.navigateTo({ url: '/pages/webview2/index' });
}
function navigateBack() {
    console.log('navigateBack');
    wx.miniProgram.navigateTo({ delta: 1 });
}
function reLaunch() {
    console.log('reLaunch');
    wx.miniProgram.navigateTo({ url: '/pages/index/index' });
}
function redirectTo() {
    console.log('redirectTo');
    wx.miniProgram.navigateTo({ url: '/pages/index/index' });
}
wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wx00dcb6129b4192a3', // 必填，企业号的唯一标识，此处填写企业号corpid
    timestamp: 1414587457, // 必填，生成签名的时间戳
    nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
    signature: 'sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg',// 必填，签名，见附录1
    jsApiList: ['checkJSApi', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'translateVoice', 'getNetworkType', 'getLocation', 'openLocation', 'startSearchBeacons', 'stopSearchBeacons', 'onSearchBeacons', 'scanQRCode', 'chooseCard', 'addCard', 'openCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
wx.ready(function () {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

});
wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    console.log(res);
});
// 判断客户端是否支持js		
function checkJSApi() {
    console.log(window.__wxjs_environment === 'miniprogram')
    // if (window.__wxjs_environment === 'miniprogram') {

    // }
    wx.checkJsApi({
        jsApiList: ['checkJSApi', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'translateVoice', 'getNetworkType', 'getLocation', 'openLocation', 'startSearchBeacons', 'stopSearchBeacons', 'onSearchBeacons', 'scanQRCode', 'chooseCard', 'addCard', 'openCard'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            console.log(res);
        }
    })
}
// 图像接口	拍照或上传	
function chooseImage() {
    console.log(window.__wxjs_environment === 'miniprogram')
    // if (window.__wxjs_environment === 'miniprogram') {
    // }
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            console.log(res);
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
    });
}
// 预览图片	
function previewImage() {
    console.log(window.__wxjs_environment === 'miniprogram')
    wx.previewImage({
        current: 'me', // 当前显示图片的http链接
        urls: ['http://luweb.gitee.io/styles/images/me/me.png','http://luweb.gitee.io/styles/images/me/me.png'] // 需要预览的图片http链接列表
    })
}
// 上传图片	
function uploadImage() {
    console.log(window.__wxjs_environment === 'miniprogram')

    wx.uploadImage({
        localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
            console.log(res)
        }
    });
}
// 下载图片	
function downloadImage() {
    console.log(window.__wxjs_environment === 'miniprogram')
    wx.downloadImage({
        serverId: '', // 需要下载的图片的服务器端ID，由uploadImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            var localId = res.localId; // 返回图片下载后的本地ID
            console.log(res)
        }
    });
}
// 获取本地图片	
function getLocalImgData() {
    wx.getLocalImgData({
        localId: '', // 图片的localID
        success: function (res) {
            var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
            console.log(res)
        }
    });
}
// 音频接口	开始录音	
function startRecord() {
    wx.startRecord();
}
// 停止录音	
function stopRecord() {
    wx.stopRecord({
        success: function (res) {
            var localId = res.localId;
        }
    });
}
// 监听录音自动停止	
function onVoiceRecordEnd() {
    wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function (res) {
            var localId = res.localId;
        }
    });
}
// 播放语音	
function playVoice() {
    wx.playVoice({
        localId: '' // 需要播放的音频的本地ID，由stopRecord接口获得
    });
}
// 暂停播放
function pauseVoice() {
    wx.pauseVoice({
        localId: '' // 需要暂停的音频的本地ID，由stopRecord接口获得
    });
}
// 停止播放
function stopVoice() {
    wx.stopVoice({
        localId: '' // 需要停止的音频的本地ID，由stopRecord接口获得
    });
}
// 监听语音播放完毕
function onVoicePlayEnd() {
    wx.onVoicePlayEnd({
        success: function (res) {
            var localId = res.localId; // 返回音频的本地ID
        }
    });
}
// 上传接口
function uploadVoice() {
    wx.uploadVoice({
        localId: '', // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            var serverId = res.serverId; // 返回音频的服务器端ID
        }
    });
}
// 下载接口
function downloadVoice() {
    wx.downloadVoice({
        serverId: '', // 需要下载的音频的服务器端ID，由uploadVoice接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            var localId = res.localId; // 返回音频的本地ID
        }
    });
}
// 智能接口	识别音频
function translateVoice() {
    wx.translateVoice({
        localId: '', // 需要识别的音频的本地Id，由录音相关接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            alert(res.translateResult); // 语音识别的结果

        }
    });
}
// 设备信息	获取网络状态
function getNetworkType() {
    wx.getNetworkType({
        success: function (res) {
            var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
            console.log(res)
        }
    });
}
// 地理位置	使用内置地图
function getLocation() {
    wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
            console.log(res);
        }
    });
}
// 获取地理位置
function openLocation() {
    wx.openLocation({
        latitude: 23.122520566399682, // 纬度，浮点数，范围为90 ~ -90
        longitude: 113.37389991100103, // 经度，浮点数，范围为180 ~ -180。
        name: '广州天河工业园支行', // 位置名
        address: '广州市天河区中山大道工业园科韵路3-15栋首层', // 地址详情说明
        scale: 13, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: 'https://luweb.gitee.io' // 在查看位置界面底部显示的超链接,可点击跳转
    });
}
// 摇一摇周边	开启ibeacon
function startSearchBeacons() {
    wx.startSearchBeacons({
        ticket: "",  //摇周边的业务ticket, 系统自动添加在摇出来的页面链接后面
        complete: function (argv) {
            //开启查找完成后的回调函数
            console.log(argv)
        }
    });
}
// 关闭ibeacon
function stopSearchBeacons() {
    wx.stopSearchBeacons({
        complete: function (res) {
            //关闭查找完成后的回调函数
            console.log(res)
        }
    });
}
// 监听ibeacon
function onSearchBeacons() {
    wx.onSearchBeacons({
        complete: function (argv) {
            //回调函数，可以数组形式取得该商家注册的在周边的相关设备列表
            console.log(argv);
        }
    });
}
// 微信扫一扫	调起微信扫一扫
function scanQRCode() {
    wx.scanQRCode({
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            console.log(res);
        }
    });
}
// 微信卡券	拉取使用卡券列表
function chooseCard() {
    wx.chooseCard({
        shopId: '', // 门店Id
        cardType: '', // 卡券类型
        cardId: '', // 卡券Id
        timestamp: 0, // 卡券签名时间戳
        nonceStr: '', // 卡券签名随机串
        signType: '', // 签名方式，默认'SHA1'
        cardSign: '', // 卡券签名
        success: function (res) {
            var cardList = res.cardList; // 用户选中的卡券列表信息
        }
    });
}
// 批量添加卡券接口
function addCard() {
    wx.addCard({
        cardList: [{
            cardId: '',
            cardExt: ''
        }], // 需要添加的卡券列表
        success: function (res) {
            var cardList = res.cardList; // 添加的卡券列表信息
        }
    });
}
// 查看微信卡包的卡券
function openCard() {
    wx.openCard({
        cardList: [{
            cardId: '',
            code: ''
        }]// 需要打开的卡券列表
    });
}
// 长按识别	小程序圆形码	无