const socket = io()

let currentWeaponId = ''
let currentPaintId = ''

const getJsonRequest = function (url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
          resolve(xhr.response);
        } else {
          reject(status);
        }
      };
      xhr.onerror = function() {
        reject("Network error");
      };
      xhr.send();
    });
  }
  
  const getRequestFilename = function(url){
    return url.split('/').pop().split('.').shift()
  }
  
  const pendingRequests = {};
  
  const getJSON = function(url, callback) {
    const propName = getRequestFilename(url);
    const savedData = localStorage.getItem(propName);
  
    if (savedData !== null) {
      callback(null, JSON.parse(savedData));
    } else {
      if (!pendingRequests[url]) {
        pendingRequests[url] = getJsonRequest(url).then(
          data => {
            localStorage.setItem(propName, JSON.stringify(data));
            return data;
          },
          error => {
            throw error;
          }
        ).finally(() => {
          delete pendingRequests[url];
        });
      }
      
      pendingRequests[url].then(
        data => callback(null, data),
        error => callback(error, null)
      );
    }
  }

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

const weaponIds = {
    "weapon_deagle": 1,
    "weapon_elite": 2,
    "weapon_fiveseven": 3,
    "weapon_glock": 4,
    "weapon_ak47": 7,
    "weapon_aug": 8,
    "weapon_awp": 9,
    "weapon_famas": 10,
    "weapon_g3sg1": 11,
    "weapon_galilar": 13,
    "weapon_m249": 14,
    "weapon_m4a1": 16,
    "weapon_mac10": 17,
    "weapon_p90": 19,
    "weapon_mp5sd": 23,
    "weapon_ump45": 24,
    "weapon_xm1014": 25,
    "weapon_bizon": 26,
    "weapon_mag7": 27,
    "weapon_negev": 28,
    "weapon_sawedoff": 29,
    "weapon_tec9": 30,
    "weapon_taser": 31,
    "weapon_hkp2000": 32,
    "weapon_mp7": 33,
    "weapon_mp9": 34,
    "weapon_nova": 35,
    "weapon_p250": 36,
    "weapon_shield": 37,
    "weapon_scar20": 38,
    "weapon_sg556": 39,
    "weapon_ssg08": 40,
    "weapon_knifegg": 41,
    "weapon_knife": 42,
    "weapon_flashbang": 43,
    "weapon_hegrenade": 44,
    "weapon_smokegrenade": 45,
    "weapon_molotov": 46,
    "weapon_decoy": 47,
    "weapon_incgrenade": 48,
    "weapon_c4": 49,
    "weapon_healthshot": 57,
    "weapon_knife_t": 59,
    "weapon_m4a1_silencer": 60,
    "weapon_usp_silencer": 61,
    "weapon_cz75a": 63,
    "weapon_revolver": 64,
    "weapon_tagrenade": 68,
    "weapon_fists": 69,
    "weapon_breachcharge": 70,
    "weapon_tablet": 72,
    "weapon_melee": 74,
    "weapon_axe": 75,
    "weapon_hammer": 76,
    "weapon_spanner": 78,
    "weapon_knife_ghost": 80,
    "weapon_firebomb": 81,
    "weapon_diversion": 82,
    "weapon_frag_grenade": 83,
    "weapon_snowball": 84,
    "weapon_bumpmine": 85,
    "weapon_bayonet": 500,
    "weapon_knife_css": 503,
    "weapon_knife_flip": 505,
    "weapon_knife_gut": 506,
    "weapon_knife_karambit": 507,
    "weapon_knife_m9_bayonet": 508,
    "weapon_knife_tactical": 509,
    "weapon_knife_falchion": 512,
    "weapon_knife_survival_bowie": 514,
    "weapon_knife_butterfly": 515,
    "weapon_knife_push": 516,
    "weapon_knife_cord": 517,
    "weapon_knife_canis": 518,
    "weapon_knife_ursus": 519,
    "weapon_knife_gypsy_jackknife": 520,
    "weapon_knife_outdoor": 521,
    "weapon_knife_stiletto": 522,
    "weapon_knife_widowmaker": 523,
    "weapon_knife_skeleton": 525,
    "weapon_knife_kukri": 526,
    "studded_brokenfang_gloves": 4725,
    "studded_bloodhound_gloves": 5027,
    "t_gloves": 5028,
    "ct_gloves": 5029,
    "sporty_gloves": 5030,
    "slick_gloves": 5031,
    "leather_handwraps": 5032,
    "motorcycle_gloves": 5033,
    "specialist_gloves": 5034,
    "studded_hydra_gloves": 5035,
}

const editModal = (img, weaponName, paintName, weaponId, paintId) => {
    document.getElementById('modalImg').src = img
    document.getElementById('modalWeapon').innerText = weaponName
    document.getElementById('modalPaint').innerText = paintName
    currentWeaponId = weaponIds[weaponId]
    currentPaintId = paintId
    console.log(img, weaponName, paintName, currentWeaponId, currentPaintId)
}

const changeParams = () => {
    let steamid = user.id
    let weaponid = currentWeaponId
    let paintid = currentPaintId
    let float = document.getElementById("float").value
    let pattern = document.getElementById("pattern").value

    document.getElementById('modalButton').innerHTML = 
        `
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `

    socket.emit('change-params', {steamid: steamid, weaponid: weaponid, paintid: paintid, float: float, pattern: pattern})
}

const putOnWorkshop = (setId, selected_knife_id, selected_knife, selected_gloves) => {
    socket.emit('put-on-workshop', {setId: setId, steamid: user.id, selected_knife_id: selected_knife_id, selected_knife: selected_knife, selected_gloves: selected_gloves})
}

const publishWorkshop = (steamid, set_name) => {
    socket.emit('publish', {steamid: steamid, set_name: set_name})
    location.reload()
}

const updateWorkshop = (steamid, set_id) => {
    socket.emit('updateWorkshop', {steamid: steamid, set_id: set_id})
    location.reload()
}

const removeMyCollection = (set_id, steamid) => {
    socket.emit('removeWorkshop', {steamid: steamid, set_id: set_id})
}

let Timer;

const workshopSearch = () => {
    if (document.getElementById('workshopSearchInput').value == '') {
        workShopTemplate()
        socket.emit('get-workshop', {i: 0, steamid: user.id})
        workshopAmount = 10
        found = true
    } else {
        clearTimeout(Timer);
        Timer = setTimeout(function () {
            socket.emit('searchWorkshop', {search: document.getElementById('workshopSearchInput').value})
        }, 500);
    }
}

socket.on('params-changed', () => {
    document.getElementById('modalButton').innerHTML = langObject.change
})

socket.on('workshopRemoved', () => {
    location.reload()
})

/* 
<button class="pushable" onclick="">
    <span class="shadow"></span>
    <span class="edge"></span>
    <div class="front d-flex align-items-center" id="">
            <p class="m-0 mx-auto">Workshop name</p>    
            <a href="" class="text-danger"><i class="fa-regular fa-trash-can me-2"></i></i></a>                 
    </div>
</button> 
*/

// set_name, personaname, selected_knife, selected_gloves, skins, set_id

socket.on('my-workshop-data', data => {
    const myWorkshops = data.results
    let i = 0
    console.log(data)
    myWorkshops.forEach(element => {
        let agent_t = (element.agent_t != "") ? element.agent_t : undefined
        let agent_ct = (element.agent_ct != "") ? element.agent_ct : undefined
        let button = document.createElement('button')
        button.classList.add('pushable')
        button.setAttribute("onclick", `myWorkshop("${element.set_name}", "${element.personaname}", "${element.selected_knife}", ${element.selected_gloves}, {agent_t: '${agent_t}', agent_ct: '${agent_ct}'}, ${JSON.stringify(element.skins)}, ${element.id}, ${element.wore})`);
        button.innerHTML = `
            <span class="shadow"></span>
            <span class="edge"></span>
            <div class="front d-flex align-items-center" id="">
                    <p class="m-0 mx-auto text-break">${element.set_name}</p>    
                    <button onclick="removeMyCollection('${element.id}', '${element.steamid}')" class="btn m-0 p-0 text-danger"><i class="fa-regular fa-trash-can mx-2"></i></button>                 
            </div>
        `

        document.getElementById('myWorkshopSideGroup').append(button)
        i++
    })

    const textColor = (i == 5) ? 'text-danger' : 'text-accent'

    document.getElementById('myWorkshopCount').innerHTML = `Your collections <span class="${textColor}">(${i}/5)</span>:`
    
    let addButton = document.createElement('button')
    addButton.classList.add('pushable')
    addButton.setAttribute("onclick", "createWorkshop()")

    if (i == 5) {
        addButton.onclick = function () {}
        addButton.innerHTML = `
            <span class="shadow"></span>
            <span class="edge"></span>
            <div class="front d-flex align-items-center limit-btn" id="">
                <p class="m-0 mx-auto text-danger">${langObject.limit}</p>                   
            </div>
        `
        document.getElementById('myWorkshopCount').after(addButton)
    } else {
        addButton.innerHTML = `
            <span class="shadow"></span>
            <span class="edge"></span>
            <div class="front d-flex align-items-center workshop-add-btn" id="">
                <i class="fa-solid fa-plus fa-lg ms-3 me-2 my-auto text-accent"></i>
                <p class="m-0 mx-auto text-accent">${langObject.addNew}</p>                   
            </div>
        `
        document.getElementById('myWorkshopCount').after(addButton)
    }
})

socket.on('workshop-data', data => {

    document.getElementById('myWorkshopSideGroup').style.display = 'block'

    data.results.forEach(element => {
        let skins;
        if (typeof element.skins == 'object') {
            skins = element.skins
        } else {
            skins = JSON.parse(element.skins)
        }

        if (element.steamid == user.id) {
            //
        } else {
            if (element.steamid != user.id) {
                workshopElement(element.set_name, element.personaname, element.selected_knife, element.selected_gloves, {agent_t: element.agent_t, agent_ct: element.agent_ct}, skins, element.id, false, element.wore) 
            }
        }
    });

    if (data.results.length == 0) {
        stopSending = true
    }
})

socket.on('workshop-search-data', data => {
    document.getElementById('skinsContainer').innerHTML = ""
    data.results.forEach(element => {
        let skins;
        if (typeof element.skins == 'object') {
            skins = element.skins
        } else {
            skins = JSON.parse(element.skins)
        }

        if (element.steamid == user.id) {
            //
        } else {
            if (element.steamid != user.id) {
                workshopElement(element.set_name, element.personaname, element.selected_knife, element.selected_gloves, {agent_t: element.agent_t, agent_ct: element.agent_ct}, skins, element.id, true, element.wore)
                console.log(element)
            }
        }
    });
})

socket.on('putted-on-workshop', () => {
    location.reload()
})