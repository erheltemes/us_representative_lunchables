var chosenStateName
var chosenStateInitials
var chosenStateNetWorth
var repWorth
var repName
var repImg

var localSave = JSON.parse(localStorage.getItem("localSave"))
if (localSave === null) {
    localSave = []
}
//create recent search on load
propagateRecentSearch()

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
            $("#repStatus").empty()
            apiStateCall(chosenStateInitials)
        }
    })
})

$(".dropdown-menu").on("click", ".dropdown-option", function() {
    apiCidCall($(this).attr("value"), $(this).text())   
})

$("#recentSearches").on("click", ".recent-search-card", function(){
    $("#resultList").empty()
    $("#chosenImage").empty()
    chosenStateName = localSave[$(this).attr("value")].stateName
    chosenStateIntials = localSave[$(this).attr("value")].stateIntitals
    chosenStateNetWorth = localSave[$(this).attr("value")].stateNetWorth
    repName = localSave[$(this).attr("value")].name
    repWorth = localSave[$(this).attr("value")].netHigh

    console.log($(".recent-search-card").attr("value"))
    $("#repStatus").empty()
    apiStateCall(chosenStateInitials)
    $("#repStatus").append($("<p>").text(`${repName} is available for comparison.`))
})




//push object to localSave and calls propagateResult
function pushToStorage(objectPush) {
    if (!checkSave(objectPush)) {
        localSave.unshift(objectPush)
        if (localSave.length > 5) {
            localSave.pop()
        }
        localStorage.setItem("localSave", JSON.stringify(localSave))
        localSave = JSON.parse(localStorage.getItem("localSave"))
        chosenStateName = localSave[0].stateName
        chosenStateIntials = localSave[0].stateIntitals
        chosenStateNetWorth = localSave[0].stateNetWorth
        repName = localSave[0].name
        repWorth = localSave[0].netHigh
        propagateRecentSearch() 
    }  
}
//checks if save already exsists
function checkSave(objectPush) {
    for (i = 0; i < localSave.length; i++) {
        if (localSave[i].name === objectPush.name) {
            return true
        }
    }
    return false
} 
    

