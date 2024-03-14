<p align="center">
    <img src="https://github.com/SwaggyMacro/TgStoGifBot/raw/master/images/img_3.gif" width="256px">

</p>
<p align="center">
    <a href="README_cn.md"><img src="https://img.shields.io/badge/语言-简体中文-red"></a>
    <a href="README.md"><img src="https://img.shields.io/badge/LANG-ENGLISH-blue"></a>
</p>

## 🗣️前言
此项目仅为[cs2-WeaponPaints-website](https://github.com/L1teD/cs2-WeaponPaints-website)的`修改版本`，进行了皮肤图片本地化以及完整的汉化，并添加`修改手套`支持，以及优化原有的请求部分 [Prevent an abundance of redundant requests about JSON files.](https://github.com/L1teD/cs2-WeaponPaints-website/pull/12)，原项目会疯狂的请求皮肤武器的JSON文件。

另外，原项目有一个`private`版本，你可以捐赠原作者以获得`private`版本。该版本可能有更多功能，如`手套更换`，`Workshop`（我不懂这是什么，似乎是一个后端，可以用来管理用户的皮肤，不确定。）
**本仓库仅为修改版本，原作者仓库请移步。**

#### 修改清单:
- 本地化皮肤、探员等图片（如果你不在国内，你不需要这个，因为github的图片资源在国内加载慢）
- 支持 **`手套更换`**
- 支持 **`音乐盒更换`**
- 优化原项目HTTP请求部分

## 📝前提需要
你需要下载该仓库 [counter-strike-image-tracker](https://github.com/ByMykel/counter-strike-image-tracker/), 并且 解压 `static/panorama/images` 至 `src/public/images` 文件夹。
大小约在`1.16GB`左右。
至于图片本地化的原因，别无他，因为Github加载缓慢，所以选择了本地化。

## 📸截图
全皮肤、刀、手套插件 使用 **[cs2-WeaponPaints](https://github.com/Nereziel/cs2-WeaponPaints/)**

<div>
    <img src="/previews/2_1.png?raw=true" width="400">
    <img src="/previews/2_2.png?raw=true" width="400">
    <img src="/previews/2_3.png?raw=true" width="400">
    <img src="/previews/2_4.png?raw=true" width="400">
</div>


### 在线Demo
- Demo: [https:/cs.ncii.cn/](https:/cs.ncii.cn/)

## 🖥️安装
#### 依赖: Node.js *17* or 更高版本 （但实测Node.js 16正常）

- **首先下载本仓库最新代码**
- 将 **`src/config.example.json`** 重命名为 **`config.json`** 并且填入相关信息.
- 在 **`lang`** 中填入 **`zh-CN`** 表示使用中文，其他的语言请参考 **`src/lang`** 文件夹。
```json
{
    "name": "Title of your website",
    "lang": "en", 
    "DB": {
        "DB_HOST": "host",
        "DB_USER": "username",
        "DB_PASS": "password",
        "DB_DB": "database name"
    },
    "HOST": "example.com or localhost/127.0.0.1",
    "SUBDIR": "/skinsExample/ or just /",
    "PORT": 27075,
    "STEAMAPIKEY": "Your Steam Web API Key",
    "connect": {
        "show": true,
        "url": "steam://connect/[IP:PORT]?appid=730/[Server password if needed]"
    }
}
```

- 然后运行以下命令:

**Windows**:
```bash
  npm i
  npm run start
```

**Linux**:
```bash
  npm i
  npm run startLinux
```
