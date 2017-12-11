---
layout: post
title: github pages创建和配置
categories: 经验总结
tags:
- jekyll
- mac
categories: github
description: 使用github.io和Jekyll创建个人博客。
---
* content
{:toc}

使用github.io和Jekyll创建个人博客，用于学习和交流

<!-- more -->
## 环境准备
1. github账号，并基于GitHub账号创建github.io网页
2. 准备ruby执行环境和Bundler，在mac环境下执行
```bash
brew install ruby
gem install bundler
```
3. 安装jekyll环境,并安装依赖
```bash
bundle install
```
4. 下载jekyll模版，并根据模版说明个性化修改配置，执行如下命令预览
```bash
bundle exec jekyll server
```
5. 预览完成后检入github库，并通过github.io查看个人网站
6. 编写博客文章，使用markdown工具编写博客文章，建议使用visual studio code工具

## 效果展示
个人github.io博客[luoweb](http://luoweb.github.io)