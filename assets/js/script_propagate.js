function propagateRepList(array) {
    array.forEach(function(val) {
        $(".dropdown-menu").append($("<a>").addClass("dropdown-option").attr("value", val).attr("href", "").attr("style", "display:block;").text(val))
    })
}

function propagateRecentSearch (localSave) {
    localSave.forEach(function(val) {
        $("#recent searched")
        .append($("<div>").addClass(recent-search-card)
            .append($("<image>").attr("src", val.img)
            )
            .append($("<h3>").text(val.name)
            )
        )
    })
}

function propagateResultList (location, rep, repWorth, avConstWorth, itemPrice) {
    $("#resultList")
    .append($("<p>").text(`${rep} from ${location}, could buy ${Math.trunc(repWorth/itemPrice*100)/100} using thier net worth.`)
    )
    .append($("<p>").text(`The average constituent in ${location} could buy ${Math.trunc(avConstWorth/itemPrice*100)/100} `)
    )
}



