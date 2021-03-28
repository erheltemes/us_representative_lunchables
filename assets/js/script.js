//global variables that define page state
var chosenStateName
var chosenStateInitials
var chosenStateNetWorth
var repWorth
var repName

var itemPrice

//parse local storage or create new array
var localSave = JSON.parse(localStorage.getItem("localSave"))
if (localSave === null) {
    localSave = []
}

//create recent search on load
propagateRecentSearch()

//sets choosenStateInitials etc
$("#map").on("click", function() {

    //sets current display state
    $("#repList").addClass("hiddenItem").removeClass("shownItem")
    $("#resultContainer").addClass("hiddenItem").removeClass("shownItem")
    $("#itemChoice").addClass("hiddenItem").removeClass("shownItem")

    //this html element is constantly updated within the map based on posistion of click on the entire div of the map
    chosenStateName = $(".tt_name_sm").text()

    //navigating through object in html5usmapv4.0_branded/mapdata to match state name to a value and then use its key 
    Object.values(simplemaps_usmap_mapdata.state_specific).forEach(function(object, index) {
        if (object.name == $(".tt_name_sm").text()) {
            chosenStateInitials = (Object.keys(simplemaps_usmap_mapdata.state_specific)[index])
        }
    })

    //setting state net worth by matching intials to object located in statenetworth.js
    stateNetWorthVar.forEach( function(object) {
        if (object.stateAb.includes(chosenStateInitials)) {
            chosenStateNetWorth = object.netWorth
        }
    })

    //empty list prior to call
    $("#repStatus").empty()

    //located in api.js
    apiStateCall(chosenStateInitials)
})


$(".dropdown-menu").on("click", ".dropdown-option", function() {
    apiCidCall($(this).attr("value"), $(this).text())   
})

//on click pass income variable through and divide by whichever cost
//populate the chosen item div

$('#buttonHome').on("click", ".btn", function() {
    $('#chosenImage').empty()
    $('#chosenImage').append($("<img>").attr("src", $(this).children("img").attr("src"))
    )

    if ($(this).attr("id") === "itemHouse") {
        itemHouse.forEach(function(object) {
            if (object.stateAb.includes(chosenStateInitials)) {
                itemPrice = object.cost
                console.log(itemPrice)
            }
        })
    }

    else { 
        itemPrice = eval($(this).attr("id")) 
    }

    propagateResultList ()
})

$("#recentSearches").on("click", ".recent-search-card", function(){
    $("#resultList").empty()
    $("#chosenImage").empty()
    $("#repList").removeClass("hiddenItem").addClass("shownItem")
    $("#itemChoice").removeClass("hiddenItem").addClass("shownItem")
    $("#resultContainer").addClass("hiddenItem").removeClass("shownItem")
    chosenStateName = localSave[$(this).attr("value")].stateName
    chosenStateInitials = localSave[$(this).attr("value")].stateInitials
    chosenStateNetWorth = localSave[$(this).attr("value")].stateNetWorth
    repName = localSave[$(this).attr("value")].name
    repWorth = localSave[$(this).attr("value")].netHigh

    console.log($(".recent-search-card").attr("value"))
    $("#repStatus").empty()
    apiStateCall(chosenStateInitials)
    $("#repStatus").append($("<p>").text(`${repName} is available for comparison.`)).addClass("available").removeClass("unavailable")
})

//push object to localSave and calls propagateResult
function pushToStorage(objectPush) {
    if (!checkSave(objectPush)) {
        localSave.unshift(objectPush)
        if (localSave.length > 4) {
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
    

