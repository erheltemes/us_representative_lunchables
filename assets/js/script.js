var chosenStateName
var chosenStateInitials
var stateNetWorth

var localSave = JSON.parse(localStorage.getItem("localSave"))
if (localSave === null) {
    localSave = []
}

//sets choosenStateInitials
$("#map").on("click", function() {
    chosenStateName = $(".tt_name_sm").text()
    Object.values(simplemaps_usmap_mapdata.state_specific).forEach(function(object, index) {
        if (object.name == $(".tt_name_sm").text()) {
            chosenStateInitials = (Object.keys(simplemaps_usmap_mapdata.state_specific)[index])
            stateNetWorthVar.forEach( function(object, index) {
                if (object.stateAb.includes(chosenStateInitials)) {
                    stateNetWorth = object.netWorth
                    console.log(stateNetWorth)
                }
            })
            //call Adam's first Function
            NEWFUNTION(choosenStateInitials)
        }
    })
})

$(".dropdown-menu").on("click", ".dropdown-option", function() {
    //reaplace function with Adam's 2nd call function
    NEWFUNCTION($(this).attr("value", val))
})

//push object to localSave and calls propagateResult
function pushToStroage(objectPush) {
    localSave.push(objectPush)
    if (localSave.length > 5) {
        localSave.pop()
    }
    localStorage.setItem("localSave", JSON.stringify(localSave))
    localSave = JSON.parse(localStorage.getItem("localSave"))
    propagateResultList()
}