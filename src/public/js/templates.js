import { skinsObject, defaultsObject, agentsObject, musicObject } from './sideBtns.js'

window.defaultsTemplate = (weapon, langObject, lang) => {
    let card = document.createElement('div')
    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

    card.innerHTML = `
    <div class="rounded-3 d-flex flex-column card-common weapon-card weapon_knife" id="${weapon.weapon_name}" data-type="weaponCard" data-btn-type="${weapon.weapon_name}">
        <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${weapon.weapon_name}">
            <div class="spinner-border spinner-border-xl" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <a class="text-decoration-none d-flex flex-column" style="z-index: 0;">
                <img src="${weapon.image}" class="weapon-img mx-auto my-2 img-show-hover" style="transform: translateY(16%) scale(0.95);" width="181px" height="136px" loading="lazy" alt="${weapon.paint_name}">
                
                <p class="m-0 text-secondary weapon-skin-title mx-auto text-center show-hover" style="transform: translateY(170%);"><small>${langObject.defaultSkin}</small></p>
                <p class="m-0 text-light weapon-skin-title mx-auto text-center show-hover" style="transform: translateY(170%);">${weapon.paint_name}</p>
        </a>
        <button onclick="knifeSkins(\'${weapon.weapon_name}\')" class="btn btn-outline-accent-card w-100 mt-3 show-hover" style="z-index: 1; transform: translateY(150%);"><small>${langObject.changeSkin}</small></button>
    </div>
    `

    document.getElementById('skinsContainer').appendChild(card)  
}

window.changeSkinTemplate = (weapon, langObject, selectedKnife) => {
    let card = document.createElement('div')
    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')
    
    card.innerHTML = `
    <div class="rounded-3 d-flex flex-column card-common weapon-card" id="${weapon.weapon_name}"data-type="weaponCard" data-btn-type="${weapon.weapon_name}">
        <button id="reset-${weapon.weapon_name}" onclick="resetSkin(${weapon.weapon_defindex}, '${selectedKnife.steamid}')" style="z-index: 3;" class="revert d-flex justify-content-center align-items-center text-danger rounded-circle">
            <i class="fa-solid fa-rotate-right"></i>
        </button>

        <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${weapon.weapon_name}">
            <div class="spinner-border spinner-border-xl" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <a class="text-decoration-none d-flex flex-column" style="z-index: 0;">
                <img src="${weapon.image}" class="weapon-img mx-auto my-2 img-show-hover" style="transform: translateY(16%) scale(0.95);" width="181px" height="136px" loading="lazy" alt="${weapon.image}" id="img-${weapon.weapon_name}">
                
                <p class="m-0 text-secondary weapon-skin-title mx-auto text-center show-hover" id="skinPaintName-${weapon.weapon_name}" style="transform: translateY(170%);"><small>${langObject.defaultSkin}</small></p>
                <p class="m-0 text-light weapon-skin-title mx-auto text-center show-hover" style="transform: translateY(170%);">${weapon.paint_name}</p>
        </a>
        <button onclick="knifeSkins(\'${weapon.weapon_name}\')" class="btn btn-outline-accent-card w-100 mt-3 show-hover" style="z-index: 1; transform: translateY(150%);"><small>${langObject.changeSkin}</small></button>
    </div>
    `

    document.getElementById('skinsContainer').appendChild(card)  
}

window.changeKnifeSkinTemplate = (knife, langObject, selectedKnife) => {
    let card = document.createElement('div')
    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

    let buttonInner = langObject.setWeapon
    let buttonFunc = `changeKnife(\'${knife.weapon_name}\', ${selectedKnife.steamid})`

    // check if knife is selected
    let active = ''
    if (knife.weapon_name == selectedKnife.knife) {
        active = 'active-card'
        buttonInner = langObject.changeSkin
        buttonFunc =  `knifeSkins(\'${knife.weapon_name}\')`
    }


    card.innerHTML = `
    <div class="rounded-3 d-flex flex-column card-common weapon-card ${active} weapon_knife" id="${knife.weapon_name}" data-type="weaponCard" data-btn-type="${knife.weapon_name}">
        <button id="reset-${knife.weapon_name}" onclick="resetSkin(${knife.weapon_defindex}, '${selectedKnife.steamid}')" style="z-index: 3;" class="revert d-flex justify-content-center align-items-center text-danger rounded-circle">
            <i class="fa-solid fa-rotate-right"></i>
        </button>

        <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${knife.weapon_name}">
            <div class="spinner-border spinner-border-xl" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <a onclick="${buttonFunc}" class="text-decoration-none d-flex flex-column" style="z-index: 0;">
            <img src="${knife.image}" class="weapon-img mx-auto my-2 img-show-hover" style="transform: translateY(16%) scale(0.95)" width="181px" height="136px" loading="lazy" alt="${knife.image}" id="img-${knife.weapon_name}">
            
            <p class="m-0 text-secondary weapon-skin-title mx-auto text-center show-hover" id="skinPaintName-${knife.weapon_name}" style="transform: translateY(170%);"><small>${langObject.defaultSkin}</small></p>
            <p class="m-0 text-light weapon-skin-title mx-auto text-center show-hover" style="transform: translateY(170%);">${knife.paint_name}</p>
        </a>
        <button onclick="${buttonFunc}" data-knife="${knife.weapon_name}" class="btn btn-outline-accent-card mt-3 w-100 show-hover" style="z-index: 1; transform: translateY(150%);"><small>${buttonInner}</small></button>
    </div>
    `

    document.getElementById('skinsContainer').appendChild(card)  
}

window.changeSkinCard = (weapon, selectedSkin) => {
    skinsObject.forEach(skinWeapon => {
        if (weaponIds[skinWeapon.weapon.id] == weapon.weapon_defindex && skinWeapon.paint_index == selectedSkin.weapon_paint_id) {
            if (skinWeapon.category.id == 'sfui_invpanel_filter_melee') {
                skinWeapon.rarity.color = "#caab05"
            }
            document.getElementById(`img-${weapon.weapon_name}`).src = skinWeapon.image
            document.getElementById(`img-${weapon.weapon_name}`).style.filter = `drop-shadow(0px 0px 10px ${skinWeapon.rarity.color}80)`

            if (typeof skinWeapon.phase != 'undefined') {
                document.getElementById(`skinPaintName-${weapon.weapon_name}`).innerHTML = `<small style="color: ${skinWeapon.rarity.color}; !important;">${skinWeapon.pattern.name} (${skinWeapon.phase})</small>`
            } else {
                document.getElementById(`skinPaintName-${weapon.weapon_name}`).innerHTML = `<small style="color: ${skinWeapon.rarity.color}; !important">${skinWeapon.pattern.name}</small>`
            }
        }
    })
}

window.knivesTemplate = (knife, langObject, selectedKnife) => {
    let card = document.createElement('div')
    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

    let buttonInner = langObject.setWeapon
    let buttonFunc = `changeKnife(\'${knife.weapon_name}\', ${selectedKnife.steamid})`

    // check if knife is selected
    let active = ''
    if (knife.weapon_name == selectedKnife.knife) {
        active = 'active-card'
        buttonInner = langObject.changeSkin
        buttonFunc =  `knifeSkins(\'${knife.weapon_name}\')`
    }

    card.innerHTML = `
    <div class="rounded-3 d-flex flex-column card-common weapon-card ${active} weapon_knife" id="${knife.weapon_name}" data-type="weaponCard" data-btn-type="${knife.weapon_name}">
        <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${knife.weapon_name}">
            <div class="spinner-border spinner-border-xl" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <a onclick="${buttonFunc}" class="text-decoration-none d-flex flex-column" style="z-index: 0;">
            <img src="${knife.image}" class="weapon-img mx-auto my-2 img-show-hover" style="transform: translateY(16%) scale(0.95)" width="181px" height="136px" loading="lazy" alt="${knife.paint_name}">

            <p class="m-0 text-secondary weapon-skin-title mx-auto text-center show-hover" id="skinPaintName-${knife.weapon_name}" style="transform: translateY(170%);"><small>${langObject.defaultSkin}</small></p>
            <p class="m-0 text-light weapon-skin-title mx-auto text-center show-hover" style="transform: translateY(170%);">${knife.paint_name}</p>
        </a>
        <button onclick="${buttonFunc}" data-knife="${knife.weapon_name}" class="btn btn-outline-accent-card mt-3 w-100 show-hover" style="z-index: 1; transform: translateY(150%);"><small>${buttonInner}</small></button>
    </div>
    `

    document.getElementById('skinsContainer').appendChild(card)    
}

window.glovesTemplate = (gloves, langObject, selectedGloves) => {
    let card = document.createElement('div')
    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

    let buttonInner = langObject.setWeapon
    let buttonFunc = `changeGlove(\'${gloves.weapon_name}\', ${selectedGloves.steamid})`

    // check if knife is selected
    let active = ''

    if (gloves.weapon_defindex == selectedGloves.weapon_defindex) {
        active = 'active-card'
        buttonInner = langObject.changeSkin
        buttonFunc =  `knifeSkins(\'${gloves.weapon_name}\')`
    }

    card.innerHTML = `
    <div class="rounded-3 d-flex flex-column card-common weapon-card ${active} weapon_knife" id="${gloves.weapon_name}" data-type="weaponCard" data-btn-type="${gloves.weapon_name}">
        <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${gloves.weapon_name}">
            <div class="spinner-border spinner-border-xl" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <a onclick="${buttonFunc}" class="text-decoration-none d-flex flex-column" style="z-index: 0;">
            <img src="${gloves.image}" class="weapon-img mx-auto my-2 img-show-hover" style="transform: translateY(16%) scale(0.95)" width="181px" height="136px" loading="lazy" alt="${gloves.paint_name}">

            <p class="m-0 text-secondary weapon-skin-title mx-auto text-center show-hover" id="skinPaintName-${gloves.weapon_name}" style="transform: translateY(170%);"><small>${langObject.defaultSkin}</small></p>
            <p class="m-0 text-light weapon-skin-title mx-auto text-center show-hover" style="transform: translateY(170%);">${gloves.paint_name}</p>
        </a>
        <button onclick="${buttonFunc}" data-knife="${gloves.weapon_name}" class="btn btn-outline-accent-card mt-3 w-100 show-hover" style="z-index: 1; transform: translateY(150%);"><small>${buttonInner}</small></button>
    </div>
    `

    document.getElementById('skinsContainer').appendChild(card)    
}

window.changeGlovesSkinTemplate = (gloves, langObject, selectedGloves) => {
    let card = document.createElement('div')
    card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

    let buttonInner = langObject.setWeapon
    let buttonFunc = `changeGlove(\'${gloves.weapon_name}\', ${selectedGloves.steamid})`

    // check if knife is selected
    let active = ''
    if (gloves.weapon_defindex == selectedGloves.weapon_defindex) {
        active = 'active-card'
        buttonInner = langObject.changeSkin
        buttonFunc =  `knifeSkins(\'${gloves.weapon_name}\')`
    }


    card.innerHTML = `
    <div class="rounded-3 d-flex flex-column card-common weapon-card ${active} weapon_knife" id="${gloves.weapon_name}" data-type="weaponCard" data-btn-type="${gloves.weapon_name}">
        <button id="reset-${gloves.weapon_name}" onclick="resetSkin(${gloves.weapon_defindex}, '${selectedGloves.steamid}')" style="z-index: 3;" class="revert d-flex justify-content-center align-items-center text-danger rounded-circle">
            <i class="fa-solid fa-rotate-right"></i>
        </button>

        <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${gloves.weapon_name}">
            <div class="spinner-border spinner-border-xl" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <a onclick="${buttonFunc}" class="text-decoration-none d-flex flex-column" style="z-index: 0;">
            <img src="${gloves.image}" class="weapon-img mx-auto my-2 img-show-hover" style="transform: translateY(16%) scale(0.95)" width="181px" height="136px" loading="lazy" alt="${gloves.image}" id="img-${gloves.weapon_name}">
            
            <p class="m-0 text-secondary weapon-skin-title mx-auto text-center show-hover" id="skinPaintName-${gloves.weapon_name}" style="transform: translateY(170%);"><small>${langObject.defaultSkin}</small></p>
            <p class="m-0 text-light weapon-skin-title mx-auto text-center show-hover" style="transform: translateY(170%);">${gloves.paint_name}</p>
        </a>
        <button onclick="${buttonFunc}" data-knife="${gloves.weapon_name}" class="btn btn-outline-accent-card mt-3 w-100 show-hover" style="z-index: 1; transform: translateY(150%);"><small>${buttonInner}</small></button>
    </div>
    `

    document.getElementById('skinsContainer').appendChild(card)  
}

window.workShopTemplate = () => {
    // clear main container
    document.getElementById('skinsContainer').innerHTML = ''
 
    document.getElementById('skinsContainer').innerHTML = `
        <div class="d-flex align-items-center justify-content-center w-100" id="scrollPosElement">
            <p class="m-0 me-2">${langObject.wait}</p>
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `

    let el = document.createElement('div')
    el.classList.add('row', 'b-4')
    el.id = 'myWorkshop'

    if (document.contains(document.getElementById('workshopSearchInputDiv'))) {
        document.getElementById('workshopSearchInputDiv').remove();
    }   

    let search = document.createElement('div')
    search.classList.add('input-group', 'mb-4')
    search.id = 'workshopSearchInputDiv'
    search.innerHTML = `<input type="text" class="form-control m-0 mt-2" oninput="workshopSearch()" id="workshopSearchInput" placeholder="Search..." data-bs-theme="dark">`

    document.getElementById('skinsContainer').before(el)
    document.getElementById('myWorkshop').after(search)
}

{/* <div class="input-group input-group-md">
    <input type="text" class="form-control m-0 mt-2" oninput="updateMyWorkshopPublish('${user.id}')" id="myWorkshopName" value="${user.displayName}'s collection" data-bs-theme="dark">
</div> */}


window.workshopElement = (set_name, personaname, selected_knife, selected_gloves, agents, skins, set_id, search = false, wore) => {
    let rarities = {
        "#b0c3d9": "common",
        "#5e98d9": "uncommon",
        "#4b69ff": "rare",
        "#8847ff": "mythical",
        "#d32ce6": "legendary",
        "#eb4b4b": "ancient",
        "#e4ae39": "contraband"
    }
    
    let skinsElement = "";
    skinsObject.forEach(weapon => {
        skins.forEach(el => {
            if (getKeyByValue(weaponIds, parseInt(el[0])) == weapon.weapon.id && el[1] == weapon.paint_index) {
                
                let bgColor

                if (weapon.category.id == 'sfui_invpanel_filter_melee') { 
                    // Gold if knife
                    bgColor = 'small-card-gold'
                } else {
                    // Anything else
                    bgColor = `small-card-${rarities[weapon.rarity.color]}`
                }

                if (el[0] >= 500 && el[0] < 4725) {
                    if (getKeyByValue(weaponIds, parseInt(el[0])) == selected_knife) {
                        skinsElement += `
                            <div class="rounded-3 d-flex card-common workshop-weapon-card ${bgColor} m-1" style="width: 100px; height: 100px;" data-type="skinCard" data-locked="true">
                                <img src="${weapon.image}" class="workshop-weapon-img m-auto" loading="lazy">
                            </div>
                        `
                    }
                } else if (el[0] >= 4725) {
                    if (el[0] == selected_gloves) {
                        skinsElement += `
                            <div class="rounded-3 d-flex card-common workshop-weapon-card ${bgColor} m-1" style="width: 100px; height: 100px;" data-type="skinCard" data-locked="true">
                                <img src="${weapon.image}" class="workshop-weapon-img m-auto" loading="lazy">
                            </div>
                        `
                    }
                } else {
                    skinsElement += `
                        <div class="rounded-3 d-flex card-common workshop-weapon-card ${bgColor} m-1" style="width: 100px; height: 100px;" data-type="skinCard" data-locked="true">
                            <img src="${weapon.image}" class="workshop-weapon-img m-auto" loading="lazy">
                        </div>
                    `
                }
            }
        }) 
    })

    agentsObject.forEach(agent => {
        if (agent.model ==  agents.agent_ct || agent.model ==  agents.agent_t) {
            skinsElement += `
                <div class="rounded-3 d-flex small-card-common workshop-weapon-card small-card-common m-1" style="width: 100px; height: 100px;" data-type="skinCard" data-locked="true">
                    <img src="${agent.image}" class="workshop-weapon-img m-auto" loading="lazy">
                </div>
            `
        }
    })


    const card = document.createElement('div')
    card.classList.add('row', 'p-0', 'px-2','mb-3', 'mx-auto')
    
    card.innerHTML = `
            <div class="col-3 bg-nav rounded-start d-flex flex-column justify-content-between">
                <div>
                    <h5 class="m-0 mt-2">${set_name}</h5>
                    <div class="d-flex justify-content-between">
                        <p class="m-0 text-secondary"><small>by ${personaname}</small></p>
                        <p class="m-0 text-secondary"><small>Wore: ${wore}</small></p>
                    </div>
                </div>
                <button class="btn btn-outline-accent mb-2" onclick="putOnWorkshop(${set_id}, ${weaponIds[selected_knife]}, '${selected_knife}', '${selected_gloves}')" data-type="putOnBtn" data-locked="true"><i class="fa-solid fa-check"></i> Put on</button>
            </div>
            <div class="col-9 border-nav rounded-end p-2 pe-0 d-flex flex-wrap align-items-center">
                ${skinsElement}
            </div>
    `

    if (search) {
        document.getElementById('skinsContainer').append(card)
    } else {
        document.getElementById('scrollPosElement').before(card)
    }
}


window.myWorkshop = (set_name, personaname, selected_knife, selected_gloves, agents, skins, set_id, wore) => {
    if (typeof skins != 'object') {
        skins = JSON.parse(skins)
    }
    

    let rarities = {
        "#b0c3d9": "common",
        "#5e98d9": "uncommon",
        "#4b69ff": "rare",
        "#8847ff": "mythical",
        "#d32ce6": "legendary",
        "#eb4b4b": "ancient",
        "#e4ae39": "contraband"
    }
    
    let skinsElement = "";
    skinsObject.forEach(weapon => {
        skins.forEach(el => {
            
            if (getKeyByValue(weaponIds, parseInt(el[0])) == weapon.weapon.id && el[1] == weapon.paint_index) {
                let bgColor

                if (weapon.category.id == 'sfui_invpanel_filter_melee') { 
                    // Gold if knife
                    bgColor = 'small-card-gold'
                } else {
                    // Anything else
                    bgColor = `small-card-${rarities[weapon.rarity.color]}`
                }
         
                if (el[0] >= 500 && el[0] < 4725) {
                    console.log(getKeyByValue(weaponIds, parseInt(el[0])), selected_knife)
                    if (getKeyByValue(weaponIds, parseInt(el[0])) == selected_knife) {
                        skinsElement += `
                            <div class="rounded-3 d-flex card-common workshop-weapon-card ${bgColor} m-1" style="width: 100px; height: 100px;" data-type="skinCard" data-locked="true">
                                <img src="${weapon.image}" class="workshop-weapon-img m-auto" loading="lazy">
                            </div>
                        `
                    }
                } else if (el[0] >= 4725) {
                    if (el[0] == selected_gloves) {
                        skinsElement += `
                            <div class="rounded-3 d-flex card-common workshop-weapon-card ${bgColor} m-1" style="width: 100px; height: 100px;" data-type="skinCard" data-locked="true">
                                <img src="${weapon.image}" class="workshop-weapon-img m-auto" loading="lazy">
                            </div>
                        `
                    }
                } else {
                    skinsElement += `
                        <div class="rounded-3 d-flex card-common workshop-weapon-card ${bgColor} m-1" style="width: 100px; height: 100px;" data-type="skinCard" data-locked="true">
                            <img src="${weapon.image}" class="workshop-weapon-img m-auto" loading="lazy">
                        </div>
                    `
                }
            }
        })
    })

    agentsObject.forEach(agent => {
        if (agent.model ==  agents.agent_ct || agent.model ==  agents.agent_t) {
            skinsElement += `
                <div class="rounded-3 d-flex small-card-common workshop-weapon-card small-card-common m-1" style="width: 100px; height: 100px;" data-type="skinCard" data-locked="true">
                    <img src="${agent.image}" class="workshop-weapon-img m-auto" loading="lazy">
                </div>
            `
        }
    })

    const card = document.createElement('div')
    card.classList.add('row', 'p-0', 'px-2', 'mb-3', 'mx-auto')
    
    card.innerHTML = `
            <div class="col-3 bg-nav rounded-start d-flex flex-column justify-content-between">
                <div>
                    <h5 class="m-0 mt-2">${set_name}</h5>
                    <div class="d-flex justify-content-between">
                        <p class="m-0 text-secondary"><small>by ${personaname}</small></p>
                        <p class="m-0 text-secondary"><small>Wore: ${wore}</small></p>
                    </div>
                </div>
                <div class="w-100">
                    <button class="btn btn-outline-accent mb-2 w-100" onclick="putOnWorkshop(${set_id}, ${weaponIds[selected_knife]}, '${selected_knife}', '${selected_gloves}')" data-type="putOnBtn" data-locked="true"><i class="fa-solid fa-check"></i> Put on</button>
                    <button class="btn btn-outline-accent mb-2 w-100" onclick="updateWorkshop('${user.id}', '${set_id}')"><i class="fa-solid fa-rotate"></i> ${langObject.sync}</button>
                </div>
            </div>
            <div class="col-9 bg-nav border-nav rounded-end p-2 pe-0 d-flex flex-wrap align-items-center">
                ${skinsElement}
            </div>
    `

    document.getElementById('myWorkshop').innerHTML = ""
    document.getElementById('myWorkshop').prepend(card)
}

window.createWorkshop = () => {
    let rarities = {
        "#b0c3d9": "common",
        "#5e98d9": "uncommon",
        "#4b69ff": "rare",
        "#8847ff": "mythical",
        "#d32ce6": "legendary",
        "#eb4b4b": "ancient",
        "#e4ae39": "contraband"
    }
    
    let skinsElement = "";

    const card = document.createElement('div')
    card.classList.add('row', 'p-0', 'px-2','mb-4', 'mx-auto')

    skinsObject.forEach(weapon => {
        selectedSkins.forEach(el => {
            if (getKeyByValue(weaponIds, parseInt(el.weapon_defindex)) == weapon.weapon.id && el.weapon_paint_id == weapon.paint_index) {
                
                let bgColor

                if (weapon.category.id == 'sfui_invpanel_filter_melee') { 
                    // Gold if knife
                    bgColor = 'small-card-gold'
                } else {
                    // Anything else
                    bgColor = `small-card-${rarities[weapon.rarity.color]}`
                }

                if (el.weapon_defindex >= 500 && el.weapon_defindex < 4725) {
                    if (getKeyByValue(weaponIds, parseInt(el.weapon_defindex)) == selectedKnife.knife) {
                        skinsElement += `
                            <div class="rounded-3 d-flex small-card-common workshop-weapon-card ${bgColor} m-1" style="width: 100px; height: 100px;" data-type="skinCard" data-locked="true">
                                <img src="${weapon.image}" class="workshop-weapon-img m-auto" loading="lazy">
                            </div>
                        `
                    }
                } else if (el.weapon_defindex >= 4725) {
                    if (el.weapon_defindex == selectedGloves.weapon_defindex) {
                        skinsElement += `
                            <div class="rounded-3 d-flex card-common workshop-weapon-card ${bgColor} m-1" style="width: 100px; height: 100px;" data-type="skinCard" data-locked="true">
                                <img src="${weapon.image}" class="workshop-weapon-img m-auto" loading="lazy">
                            </div>
                        `
                    }
                } else {
                    skinsElement += `
                        <div class="rounded-3 d-flex card-common workshop-weapon-card ${bgColor} m-1" style="width: 100px; height: 100px;" data-type="skinCard" data-locked="true">
                            <img src="${weapon.image}" class="workshop-weapon-img m-auto" loading="lazy">
                        </div>
                    `
                }
            }
        }) 
    })

    agentsObject.forEach(agent => {
        if (agent.model == selectedAgents.agent_ct || agent.model == selectedAgents.agent_t) {
            skinsElement += `
                <div class="rounded-3 d-flex small-card-common workshop-weapon-card small-card-common m-1" style="width: 100px; height: 100px;" data-type="skinCard" data-locked="true">
                    <img src="${agent.image}" class="workshop-weapon-img m-auto" loading="lazy">
                </div>
            `
        }
    })

    card.innerHTML = `
            <div class="col-3 bg-nav rounded-start d-flex flex-column justify-content-between">
                <div>
                    <div class="input-group input-group-md">
                        <input type="text" class="form-control m-0 mt-2" oninput="updateMyWorkshopPublish('${user.id}')" id="myWorkshopName" value="${user.displayName}'s collection" data-bs-theme="dark">
                    </div>
                    <div class="d-flex justify-content-between">
                        <p class="m-0 text-secondary"><small>by ${user.displayName}</small></p>
                        <p class="m-0 text-secondary" id="createWorkshopInputCount"><small>${user.displayName.length + 13}/30</small></p>
                    </div>
                    
                </div>
                <div class="w-100">
                    <button class="btn btn-outline-accent mb-2" id="myWorkshopPublish" onclick="publishWorkshop("${user.id}")"><i class="fa-solid fa-upload"></i> ${langObject.publish}</button>
                </div>
            </div>
            <div class="col-9 bg-nav border-nav rounded-end p-2 pe-0 d-flex flex-wrap align-items-center">
                ${skinsElement}
            </div>
    `
    document.getElementById('myWorkshop').innerHTML = ''
    document.getElementById('myWorkshop').prepend(card)

    updateMyWorkshopPublish(user.id)
}

window.showAgents = (type) => {
    let team = {
        'ct': 3,
        't': 2
    }

    // clear main container
    document.getElementById('skinsContainer').innerHTML = ''

    agentsObject.forEach(element => {
        if (element.team == team[type]) {
            let rarities = {
                "#b0c3d9": "common",
                "#5e98d9": "uncommon",
                "#4b69ff": "rare",
                "#8847ff": "mythical",
                "#d32ce6": "legendary",
                "#eb4b4b": "ancient",
                "#e4ae39": "contraband"
            }

            let bgColor = 'card-uncommon'
            let phase  = ''
            let active = ''
            let steamid = user.id

            // Make outline if this skin is selected
            
            if (selectedAgents.agent_t == element.model || selectedAgents.agent_ct == element.model) {
                active = 'active-card'
            }
            
            let card = document.createElement('div')
            card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

            card.innerHTML = `
                <div onclick="changeAgent(\'${steamid}\', \'${element.model}\', \'${type}\')" id="agent-${element.model}" class="weapon-card rounded-3 d-flex flex-column ${active} ${bgColor} contrast-reset pb-2" data-type="skinCard" data-btn-type="">
                    <div style="z-index: 3;" class="locked-card d-flex flex-column justify-content-center align-items-center w-100 h-100" id="">
                        <i class="fa-solid fa-lock"></i>
                        <p class="m-0">Buy Premium</p>
                    </div>
                
                    <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${element.model}">
                        <div class="spinner-border spinner-border-xl" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>

                    <img src="${element.image}" class="weapon-img mx-auto my-3" loading="lazy" width="181px" height="136px" alt=" ">
                    
                    <div class="d-flex align-items-center g-3">
                    
                    </div>
                    
                    <h5 class="weapon-skin-title text-roboto ms-3">
                        ${element.agent_name}
                    </h5>
                </div>
            `

            document.getElementById('skinsContainer').appendChild(card)
        }
    });

}

window.showMusics = () =>{
    // clear main container
    document.getElementById('skinsContainer').innerHTML = ''

    musicObject.forEach(element => {
        let rarities = {
            "#b0c3d9": "common",
            "#5e98d9": "uncommon",
            "#4b69ff": "rare",
            "#8847ff": "mythical",
            "#d32ce6": "legendary",
            "#eb4b4b": "ancient",
            "#e4ae39": "contraband"
        }

        let bgColor = 'card-uncommon'
        let phase  = ''
        let active = ''
        let steamid = user.id

        // Make outline if this skin is selected
        if (selectedMusic.music_id == element.id) {
            active = 'active-card'
        }
        
        let card = document.createElement('div')
        card.classList.add('col-6', 'col-sm-4', 'col-md-3', 'p-2')

        card.innerHTML = `
            <div onclick="changeMusic(\'${steamid}\', \'${element.id}\')" id="music-${element.id}" class="weapon-card rounded-3 d-flex flex-column ${active} ${bgColor} contrast-reset pb-2" data-type="skinCard" data-btn-type="">
                <div style="z-index: 3;" class="locked-card d-flex flex-column justify-content-center align-items-center w-100 h-100" id="">
                    <i class="fa-solid fa-lock"></i>
                    <p class="m-0">Buy Premium</p>
                </div>
            
                <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${element.id}">
                    <div class="spinner-border spinner-border-xl" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>

                <img src="${element.image}" class="weapon-img mx-auto my-3" loading="lazy" width="181px" height="136px" alt=" ">
                
                <div class="d-flex align-items-center g-3">
                
                </div>
                
                <h5 class="weapon-skin-title text-roboto ms-3">
                    ${element.name}
                </h5>
            </div>
        `

        document.getElementById('skinsContainer').appendChild(card)
    });

}