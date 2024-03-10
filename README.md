# 前言
此项目仅为[cs2-WeaponPaints-website](https://github.com/L1teD/cs2-WeaponPaints-website)的`修改版本`，进行了皮肤图片本地化以及完整的汉化，并优化原有的请求部分 [Prevent an abundance of redundant requests about JSON files.](https://github.com/L1teD/cs2-WeaponPaints-website/pull/12)，原项目会疯狂的进行几十次乃至上百次的请求皮肤武器的JSON文件。

# 前提需要

你需要下载该仓库 [counter-strike-image-tracker](https://github.com/ByMykel/counter-strike-image-tracker/), 并且 解压 `static/panorama/images` 至 `src/public/images` 文件夹。
大小约在`1.16GB`左右。
至于图片本地化的原因，别无他，因为Github加载缓慢，所以选择了本地化。

# 截图

全皮肤、刀、手套插件 使用 **[cs2-WeaponPaints](https://github.com/Nereziel/cs2-WeaponPaints/)**

<div>
    <img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/1.png?raw=true" width="400">
    <img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/2.png?raw=true" width="400">
    <img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/3.png?raw=true" width="400">
    <img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/4.png?raw=true" width="400">
    <img src="https://github.com/L1teD/cs2-WeaponPaints-website/blob/main/previews/5.png?raw=true" width="400">
</div>


## 在线Demo
- Demo: [https:/cs.ncii.cn/](https:/cs.ncii.cn/)

## 安装

### 依赖: Node.js *17* or 更高版本 （但实测Node.js 16正常）

- **[下载最新Release](https://github.com/SwaggyMacro/cs2-WeaponPaints-Web/releases)**
- 将 **`src/config.example.json`** 重命名为 **`config.json`** 并且填入相关信息:
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

Windows:
```bash
  npm i
  npm run start
```

Linux:
```bash
  npm i
  npm run startLinux
```
