var choosenStateName
var choosenStateInitials

var localSave = JSON.parse(localStorage.getItem("localSave"))
if (localSave === null) {
    localSave = []
}

//sets choosenStateInitials
$("#map").on("click", function() {
    chooseStateName = $(".tt_name_sm").text()
    Object.values(simplemaps_usmap_mapdata.state_specific).forEach(function(object, index) {
        if (object.name == $(".tt_name_sm").text()) {
            choosenStateInitials = (Object.keys(simplemaps_usmap_mapdata.state_specific)[index])
            //call Adam's first Function
            NEWFUNTION()
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