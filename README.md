<p align="center">
    <img src="https://github.com/SwaggyMacro/TgStoGifBot/raw/master/images/img_3.gif" width="256px">

</p>
<p align="center">
    <a href="README_cn.md"><img src="https://img.shields.io/badge/语言-简体中文-red"></a>
    <a href="README.md"><img src="https://img.shields.io/badge/LANG-ENGLISH-blue"></a>
</p>

## 🗣️Preface
This repo is a **`modified version`** of [cs2-WeaponPaints-website](https://github.com/L1teD/cs2-WeaponPaints-website), which has localized skin images(Chinese Language Only) and complete Chinese translation, as well as added support for **`glove change`**, and optimized the original request part [Prevent an abundance of redundant requests about JSON files.](https://github.com/L1teD/cs2-WeaponPaints-website/pull/12), the original project will make dozens of requests for JSON files of skin weapons.


#### modified list:
- Localized skin, agent images (Chinese Language Only, You shouldn't need this if you are not in China.)
- Support **`glove change`**
- Support **`music kit change`**
- optimized the original request part

Btw, the original project got a private plan, You guys can donate to the original author to get the private plan. The private plan has more features like `gloves change`, `workshop`(Idk what's this, It seems like a backend that can be used to manage the user's skins, but I'm not sure about this.).

**This repo is a modified version. If you need the private plan, Please go to the original author's repository.**

## 📝Before Start
**You can step out of this section if you are not in China or you don't wanna localize the images.**
- You need download this repo [counter-strike-image-tracker](https://github.com/ByMykel/counter-strike-image-tracker/)
- extract `static/panorama/images` to `src/public/images` folder.
- Replace all url `https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images` to `/images` in `src/public/js/json/skins/{lang}-skins.json` and `src/public/js/json/skins/{lang}-agents.json`.  

The images folder size will be around `1.16GB`.
The reason for localizing the images is nothing else, because Github loads slowly in China, so I chose to localize them, you don't need this step if you are not in China.

## 📸Screenshots
Weapon, agent, knife, glove Skin Plugin from **[cs2-WeaponPaints](https://github.com/Nereziel/cs2-WeaponPaints/)**

<div>
    <img src="/previews/2_1.png?raw=true" width="400">
    <img src="/previews/2_2.png?raw=true" width="400">
    <img src="/previews/2_3.png?raw=true" width="400">
    <img src="/previews/2_4.png?raw=true" width="400">
</div>


## 🖥️Installation
#### Dependencies: Node.js *17* or higher version (But I tried Node.js 16, also working fine.)

- **Clone the latest code of this repo.**
- Copy **`src/config.example.json`** to **`config.json`** and fill in the information.
- Fill in **`lang`** with **`en`** to use english, other languages please refer to **`src/lang`** folder.
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

- Then run the following commands:

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
