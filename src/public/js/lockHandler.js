let blackListWeaponsTEMP = await import(`/js/json/locked/weapons.json`, {assert: {type: 'json'}})
let blackListWeapons = blackListWeaponsTEMP.default

let blackListSkinsTEMP = await import(`/js/json/locked/skins.json`, {assert: {type: 'json'}})
let blackListSkins = blackListSkinsTEMP.default

let blackButtonsTEMP = await import(`/js/json/locked/buttons.json`, {assert: {type: 'json'}})
let blackButtons = blackButtonsTEMP.default


function lockedMain() {
    const sideBtns = document.querySelectorAll('[data-type="sideBtn"]')

    sideBtns.forEach(sideBtn => {
        if (blackButtons.includes(sideBtn.getAttribute('data-btn-type'))) {
            sideBtn.onclick = function () {}
            if (sideBtn.getElementsByClassName('front').length == 0) {
                sideBtn.classList.add('locked-side')
            } else {
                sideBtn.getElementsByClassName('front')[0].classList.add('locked-side')
            }
            sideBtn.querySelector('p').innerText = 'Premium'
        }
    })

    const weaponCards = document.querySelectorAll('[data-type="weaponCard"]')
    weaponCards.forEach(weaponCard => {
        if (blackListWeapons.includes(weaponCard.getAttribute('id'))) {
            if (weaponCard.querySelectorAll('button').length > 1) {
                weaponCard.querySelectorAll('button')[1].innerText = 'Buy Premium'
                weaponCard.querySelectorAll('button')[1].classList.add('btn-outline-premium-card')
                weaponCard.querySelectorAll('button')[1].onclick = function () {}
                weaponCard.querySelector('a').onclick = function () {}
            } else {
                weaponCard.querySelector('button').innerText = 'Buy Premium'
                weaponCard.querySelector('button').classList.add('btn-outline-premium-card')
                weaponCard.querySelector('button').onclick = function () {}
                weaponCard.querySelector('a').onclick = function () {}
            }
            
        }
    })

    const skinCards = document.querySelectorAll('[data-type="skinCard"]')

    skinCards.forEach(weaponCard => {
        blackListSkins.forEach(el => {
            if (weaponCard.getAttribute('data-btn-type') == `${el[0]}-${el[1]}`) {
                document.getElementById(`locked-${el[0]}-${el[1]}`).style.opacity = 1
                document.getElementById(`locked-${el[0]}-${el[1]}`).style.visibility = 'visible'
                weaponCard.onclick = function () {}
            }
        })
    })

    const putOnBtns = document.querySelectorAll('[data-type="putOnBtn"]')
    putOnBtns.forEach(element => {
        element.onclick = function () {}
        element.classList.add('locked-side')
        element.innerText = 'Premium'
    })


    // sideBtns.forEach(element => {
    //     if (element.getAttribute('data-type') == 'sideBtn') {
    //         element.onclick = function () {}
    //         element.getElementsByClassName('front')[0].classList.add('locked-side')
    //         element.querySelector('p').innerText = 'Premium'
    //     } else if (element.getAttribute('data-type') == 'knifeCard') {
    //         if (blackListWeapons.includes(element.getAttribute('id'))) {
    //             element.querySelector('button').innerText = 'Buy Premium'
    //             element.querySelector('button').classList.add('btn-outline-premium-card')
    //             element.querySelector('button').onclick = function () {}
    //             element.querySelector('a').onclick = function () {}
    //         }
    //     } else if (element.getAttribute('data-type') == 'bgUrlBtn') {
    //         element.classList.add('locked-bg-url')
    //         element.disabled = true
    //         element.value = langObject.buyPremium
    //     } else if (element.getAttribute('data-type') == 'knifeSkinCard') {
    //         blackListSkins.forEach(el => {
    //             if (element.getAttribute('id') == `weapon-${el[0]}-${el[1]}`) {
    //                 document.getElementById(`locked-${el[0]}-${el[1]}`).style.opacity = 1
    //                 document.getElementById(`locked-${el[0]}-${el[1]}`).style.visibility = 'visible'
    //                 element.onclick = function () {}
    //             }
    //         })
    //     } else if (element.getAttribute('data-type') == 'skinCard') {
    //         if (blackListWeapons.includes(element.getAttribute('id'))) {
    //             element.querySelector('button').innerText = 'Buy Premium'
    //             element.querySelector('button').classList.add('locked-side')
    //             element.querySelector('button').onclick = function () {}
    //             element.querySelector('a').onclick = function () {}
    //         }
    //     } else if (element.getAttribute('data-type') == 'putOnBtn') {
    //         element.onclick = function () {}
    //         element.classList.add('locked-side')
    //         element.innerText = 'Premium'
    //     }
    // })


}
 
const adminBtns = document.querySelectorAll('[data-type="adminBtn"]')
adminBtns.forEach(adminBtn => {
    if (blackButtons.includes(adminBtn.getAttribute('id'))) {
        adminBtn.checked = true
    }
})

setTimeout(() => {
    const adminWeaponBtns = document.querySelectorAll('[data-type="adminWeaponBtn"]')
    adminWeaponBtns.forEach(adminWeaponBtn => {
        if (blackListWeapons.includes(adminWeaponBtn.getAttribute('id').slice(7))) {
            adminWeaponBtn.checked = true
        }
    })

    const adminWeaponSkinBtns = document.querySelectorAll('[data-type="adminWeaponSkinBtn"]')
    adminWeaponSkinBtns.forEach(adminWeaponSkinBtn => {
        blackListSkins.forEach(el => {
            if (`${el[0]}-${el[1]}` == adminWeaponSkinBtn.getAttribute('id')) {
                adminWeaponSkinBtn.checked = true
            }
        })
    })
}, 1000);