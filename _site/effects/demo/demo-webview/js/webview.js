var images = {
    localId: [],
    serverId: []
};

var voice = {
    localId: '',
    serverId: ''
};

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
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wx00dcb6129b4192a3', // 必填，企业号的唯一标识，此处填写企业号corpid
    timestamp: 1511104381, // 必填，生成签名的时间戳
    nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
    signature: 'c756b93f881baed37da054be0c38fb82b97dc285',// 必填，签名，见附录1
    // jsApiList: ['checkJSApi', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'translateVoice', 'getNetworkType', 'getLocation', 'openLocation', 'startSearchBeacons', 'stopSearchBeacons', 'onSearchBeacons', 'scanQRCode', 'chooseCard', 'addCard', 'openCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    
    jsApiList: ['checkJSApi','downloadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
wx.ready(function () {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    // 全局对象是window.wx，其实是微信提供的全局对象。 
    console.log("wx object:");
    console.log(wx);   
    console.log("windows object:");
    console.log(window)
    
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
            alert(JSON.stringify(res));
        }
    })
}
// 图像接口	拍照或上传	
function chooseImage() {
    console.log(window.__wxjs_environment === 'miniprogram')
    wx.chooseImage({
        success: function (res) {
            images.localId = res.localIds;
            alert('已选择 ' + res.localIds.length + ' 张图片');
        }
    });
}
// 预览图片	
function previewImage() {
    console.log(window.__wxjs_environment === 'miniprogram')
    wx.previewImage({
        current: 'me', // 当前显示图片的http链接
        urls: ['http://luweb.gitee.io/styles/images/me/me.png', 'http://luweb.gitee.io/styles/images/me/me.png'] // 需要预览的图片http链接列表
    })
}
// 上传图片	
function uploadImage() {
    console.log(window.__wxjs_environment === 'miniprogram')

    if (images.localId.length == 0) {
        alert('请先使用 chooseImage 接口选择图片');
        return;
    }
    var i = 0, length = images.localId.length;
    images.serverId = [];
    function upload() {
        wx.uploadImage({
            localId: images.localId[i],
            success: function (res) {
                i++;
                //alert('已上传：' + i + '/' + length);
                images.serverId.push(res.serverId);
                if (i < length) {
                    upload();
                }
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    }
    upload();
}
// 下载图片	
function downloadImage() {
    console.log(window.__wxjs_environment === 'miniprogram')
    if (images.serverId.length === 0) {
        alert('请先使用 uploadImage 上传图片');
        return;
    }
    var i = 0, length = images.serverId.length;
    images.localId = [];
    function download() {
        wx.downloadImage({
            serverId: images.serverId[i],
            success: function (res) {
                i++;
                alert('已下载：' + i + '/' + length);
                images.localId.push(res.localId);
                if (i < length) {
                    download();
                }
            }
        });
    }
    download();
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
    wx.startRecord({
        cancel: function () {
            alert('用户拒绝授权录音');
        }
    });
}
// 停止录音	
function stopRecord() {
    wx.stopRecord({
        success: function (res) {
            voice.localId = res.localId;
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
    });
}
// 监听录音自动停止	
wx.onVoiceRecordEnd({
    complete: function (res) {
        voice.localId = res.localId;
        alert('录音时间已超过一分钟');
    }
});

// 播放语音	
function playVoice() {
    if (voice.localId == '') {
        alert('请先使用 startRecord 接口录制一段声音');
        return;
    }
    wx.playVoice({
        localId: voice.localId
    });
}
// 暂停播放
function pauseVoice() {
    wx.pauseVoice({
        localId: voice.localId
    });
}
// 停止播放
function stopVoice() {
    wx.stopVoice({
        localId: voice.localId
    });
}
// 监听语音播放完毕
wx.onVoicePlayEnd({
    complete: function (res) {
        alert('录音（' + res.localId + '）播放结束');
    }
});

// 上传接口
function uploadVoice() {
    if (voice.localId == '') {
        alert('请先使用 startRecord 接口录制一段声音');
        return;
    }
    wx.uploadVoice({
        localId: voice.localId,
        success: function (res) {
            alert('上传语音成功，serverId 为' + res.serverId);
            voice.serverId = res.serverId;
        }
    });
}
// 下载接口
function downloadVoice() {
    if (voice.serverId == '') {
        alert('请先使用 uploadVoice 上传声音');
        return;
    }
    wx.downloadVoice({
        serverId: voice.serverId,
        success: function (res) {
            alert('下载语音成功，localId 为' + res.localId);
            voice.localId = res.localId;
        }
    });
}
// 智能接口	识别音频
function translateVoice() {

    if (voice.localId == '') {
        alert('请先使用 startRecord 接口录制一段声音');
        return;
    }
    wx.translateVoice({
        localId: voice.localId,
        complete: function (res) {
            if (res.hasOwnProperty('translateResult')) {
                alert('识别结果：' + res.translateResult);
            } else {
                alert('无法识别');
            }
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
    // wx.getLocation({
    //     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    //     success: function (res) {
    //         var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
    //         var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
    //         var speed = res.speed; // 速度，以米/每秒计
    //         var accuracy = res.accuracy; // 位置精度
    //         console.log(res);
    //     }
    // });
    wx.getLocation({
        success: function (res) {
            alert(JSON.stringify(res));
        },
        cancel: function (res) {
            alert('用户拒绝授权获取地理位置');
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
        scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
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
            // var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            // console.log(res);
            alert(JSON.stringify(res));
        }
    });
}
var codes = [];
// 微信卡券	拉取使用卡券列表
function chooseCard() {
    // wx.chooseCard({
    //     shopId: '', // 门店Id
    //     cardType: '', // 卡券类型
    //     cardId: '', // 卡券Id
    //     timestamp: 0, // 卡券签名时间戳
    //     nonceStr: '', // 卡券签名随机串
    //     signType: '', // 签名方式，默认'SHA1'
    //     cardSign: '', // 卡券签名
    //     success: function (res) {
    //         var cardList = res.cardList; // 用户选中的卡券列表信息
    //     }
    // });
    wx.chooseCard({
        cardSign: '1fdb2640c60e41f8823e9f762e70c531d161ae76',
        timestamp: 1437997723,
        nonceStr: 'k0hGdSXKZEj3Min5',
        success: function (res) {
            res.cardList = JSON.parse(res.cardList);
            encrypt_code = res.cardList[0]['encrypt_code'];
            alert('已选择卡券：' + JSON.stringify(res.cardList));
            decryptCode(encrypt_code, function (code) {
                codes.push(code);
            });
        },
        cancel: function (res) {
            alert(JSON.stringify(res))
        }
    });
}
// 批量添加卡券接口
function addCard() {
    // wx.addCard({
    //     cardList: [{
    //         cardId: '',
    //         cardExt: ''
    //     }], // 需要添加的卡券列表
    //     success: function (res) {
    //         var cardList = res.cardList; // 添加的卡券列表信息
    //     }
    // });
    wx.addCard({
        cardList: [
            {
                cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
                cardExt: '{"code": "", "openid": "", "timestamp": "1418301401", "signature":"f6628bf94d8e56d56bfa6598e798d5bad54892e5"}'
            },
            {
                cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
                cardExt: '{"code": "", "openid": "", "timestamp": "1418301401", "signature":"f6628bf94d8e56d56bfa6598e798d5bad54892e5"}'
            }
        ],
        success: function (res) {
            alert('已添加卡券：' + JSON.stringify(res.cardList));
        },
        cancel: function (res) {
            alert(JSON.stringify(res))
        }
    });
}
// 查看微信卡包的卡券
function openCard() {
    if (codes.length < 1) {
        alert('请先使用 chooseCard 接口选择卡券。');
        return false;
    }
    var cardList = [];
    for (var i = 0; i < codes.length; i++) {
        cardList.push({
            cardId: 'pDF3iY9tv9zCGCj4jTXFOo1DxHdo',
            code: codes[i]
        });
    }
    wx.openCard({
        cardList: cardList,
        cancel: function (res) {
            alert(JSON.stringify(res))
        }
    });
}
// 长按识别	小程序圆形码	无