---
layout: post
title: "Shell获取某个网页所有的http或https根域名"
date: 2017-11-20 23:10:00 +0800 
categories: 学习研究
tag: shell curl http https regexp
---
* content
{:toc}

本文主要通过shell脚本使用正则表达式匹配某个网页所有的http或https根域名

<!-- more -->

## 1. 问题
快速获取某个页面下所有的根域名地址

## 2. 方案
1，linux下执行如下shell命令（网络方案待验证）：

```shell
curl http://blog.csdn.net/ |  grep -oP "(http|https)://[a-zA-Z0-9.]{1,26}+[\.a-zA-Z0-9]{0,26}"  | sort | uniq
```
2, mac os下执行如下shell命令（有瑕疵）
实例1：
```shell
curl http://blog.csdn.net/ |  egrep "(http://|https://)" | awk -F'http' '{print "http"$2}' | awk -F'/' '{print $1"//"$3}' | sort | uniq
```
实例2:
```shell
curl https://mims.icbc.com.cn/IMServiceServer/servlet/ICBCBaseReqNSServlet\?dse_operationName\=ApplyCreditCardOp\&paraPromoCode\=QD0004600000000GF1 |  egrep "(http://|https://)" | awk -F'http' '{print "http"$2}' | awk -F'/' '{print $1"//"$3}' | sort | uniq
```

## 3. mac os输出结果 
```shell
http://avatar.csdn.net
http://aws.csdn.net
http://blog.csdn.net
http://blog.csdn.net"><
http://bss.csdn.net
http://e.weibo.com
http://g.csdn.net
http://hc.csdn.net
http://huawei.csdn.net
http://ibm.csdn.net
http://ibmuniversity.csdn.net
http://img.blog.csdn.net
http://intel.csdn.net
http://powerlinux.csdn.net
http://static.blog.csdn.net
http://vuforia.csdn.net
http://wpa.qq.com
http://www.csdn.net
http://www.miibeian.gov.cn
https://sdk.appadhoc.com
```

解决