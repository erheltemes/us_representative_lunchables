var chosenStateName
var chosenStateInitials
var chosenStateNetWorth

var localSave = JSON.parse(localStorage.getItem("localSave"))
if (localSave === null) {
    localSave = []
}

//sets choosenStateInitials etc
$("#map").on("click", function() {
    chosenStateName = $(".tt_name_sm").text()
    Object.values(simplemaps_usmap_mapdata.state_specific).forEach(function(object, index) {
        if (object.name == $(".tt_name_sm").text()) {
            chosenStateInitials = (Object.keys(simplemaps_usmap_mapdata.state_specific)[index])
            stateNetWorthVar.forEach( function(object, index) {
                if (object.stateAb.includes(chosenStateInitials)) {
                    chosenStateNetWorth = object.netWorth
                }
            })
            apiStateCall(chosenStateInitials)
        }
    })
})

$(".dropdown-menu").on("click", ".dropdown-option", function() {
    apiCidCall($(this).attr("value"), $(this).text())
})

//push object to localSave and calls propagateResult
function pushToStorage(objectPush) {
    localSave.unshift(objectPush)
    if (localSave.length > 5) {
        localSave.pop()
    }
    localStorage.setItem("localSave", JSON.stringify(localSave))
    localSave = JSON.parse(localStorage.getItem("localSave"))
    console.log(localSave)
    propagateRecentSearch()   
}

function checkSave(objectPush) {
    if (localSave.forEach(function(object) {
            if (object.name === objectPush.name) {
                return true
            }
        }) 
    )
    pushToStorage(objectPush)
}