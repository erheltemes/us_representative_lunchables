function propagateRepList(array) {
    $(".dropdown-menu").empty()
    array.forEach(function(val) {
        $(".dropdown-menu").append($("<a>").addClass("dropdown-option").attr("value", val.cid).attr("href", "#repStatus").attr("style", "display:block;").text(val.name))
    })
}

function propagateRecentSearch () {
    $("#recentSearches").empty()
    localSave.forEach(function(val) {
        $("#recentSearches")
        .append($("<div>").addClass("recent-search-card")
            // .append($("<img>").attr("src", val.img)
            // )
            .append($("<h3>").text(val.name)
            )
        )
    })
}

function propagateResultList (location, rep, repWorth, avConstWorth, itemPrice) {
    $("#resultList").empty()
    $("#resultList")
    .append($("<p>").text(`${rep} from ${location}, could buy ${(Math.trunc(repWorth/itemPrice*100)/100).toLocaleString("en")} using thier net worth.`)
    )
    .append($("<p>").text(`The average constituent in ${location} could buy ${(Math.trunc(avConstWorth/itemPrice*100)/100).toLocaleString("en")} `)
    )
}




