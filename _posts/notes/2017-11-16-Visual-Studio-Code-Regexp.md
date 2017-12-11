---
layout: post
title: "Visual Studio Code Regexp"
date: 2017-11-16 23:10:00 +0800 
categories: 学习研究
tag: vscode regexp
---
* content
{:toc}

本文主要通过在vscode使用正则表达式减少手工重复排版问题

<!-- more -->

## 1. 问题

拷贝XX接口文档，添加注释,希望通过正则替换自动分离注释和创建对应的接口函数
```js
// 接口模块	接口说明	具体接口
// 判断客户端是否支持js		checkJSApi
// 图像接口	拍照或上传	chooseImage
// 预览图片	previewImage
// 上传图片	uploadImage
// 下载图片	downloadImage
// 获取本地图片	getLocalImgData
// 音频接口	开始录音	startRecord
// 停止录音	stopRecord
// 监听录音自动停止	onVoiceRecordEnd
// 播放语音	playVoice
// 暂停播放	pauseVoice
// 停止播放	stopVoice
// 监听语音播放完毕	onVoicePlayEnd
// 上传接口	uploadVoice
// 下载接口	downloadVoice
// 智能接口	识别音频	translateVoice
// 设备信息	获取网络状态	getNetworkType
// 地理位置	使用内置地图	getLocation
// 获取地理位置	openLocation
// 摇一摇周边	开启ibeacon	startSearchBeacons
// 关闭ibeacon	stopSearchBeacons
// 监听ibeacon	onSearchBeacons
// 微信扫一扫	调起微信扫一扫	scanQRCode
// 微信卡券	拉取使用卡券列表	chooseCard
// 批量添加卡券接口	addCard
// 查看微信卡包的卡券	openCard
// 长按识别	小程序圆形码	无
```
## 2. 方案
正则匹配如下：

```js
//源匹配
//(.*)\s+([a-z]{7,20}?)\n
//结果匹配
//$1\n function $2(){\n}\n
```

通过visual studio code正则匹配，替换后输出

## 3. 结果 
```js

// 预览图片	
function previewImage() {
    wx.previewImage()
}
// 上传图片	
function uploadImage() {

}
// 下载图片	
function downloadImage() {

}
// 获取本地图片	
function getLocalImgData() {

}
// 音频接口	开始录音	
function startRecord() {

}
// 停止录音	
function stopRecord() {

}
// 监听录音自动停止	
function onVoiceRecordEnd() {

}
// 播放语音	
function playVoice(){
    
}

// 暂停播放
 function pauseVoice(){
}
// 停止播放
 function stopVoice(){
}
// 监听语音播放完毕
 function onVoicePlayEnd(){
}
// 上传接口
 function uploadVoice(){
}
// 下载接口
 function downloadVoice(){
}
// 智能接口	识别音频
 function translateVoice(){
}
// 设备信息	获取网络状态
 function getNetworkType(){
}
// 地理位置	使用内置地图
 function getLocation(){
}
// 获取地理位置
 function openLocation(){
}
// 摇一摇周边	开启ibeacon
 function startSearchBeacons(){
}
// 关闭ibeacon
 function stopSearchBeacons(){
}
// 监听ibeacon
 function onSearchBeacons(){
}
// 微信扫一扫	调起微信扫一扫
 function scanQRCode(){
}
// 微信卡券	拉取使用卡券列表
 function chooseCard(){
}
// 批量添加卡券接口
 function addCard(){
}
// 查看微信卡包的卡券
 function openCard(){
}
// 长按识别	小程序圆形码	无
```

完美解决