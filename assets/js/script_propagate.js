function propagateRepList(array) {
    $(".dropdown-menu").empty()
    array.forEach(function(val) {
        $(".dropdown-toggle").text(chosenStateInitials + " Representatives:")
        $(".dropdown-menu").append($("<a>").addClass("dropdown-option").attr("value", val.cid).attr("href", "#repStatus").attr("style", "display:block;").text(val.name))
    })
}

function propagateRecentSearch () {
    $("#recentSearches").empty()
    if (localSave.length === 0) {
        $("#recentSearches")
        .append($("<div>").addClass("empty-search")
            .append($("<h3>").text("No Recent Searches")
            )
        )
    }
    else {
        localSave.forEach(function(val, index) {
            $("#recentSearches")
            .append($("<div>").addClass("recent-search-card col-2 p-2 btn").attr("value", index)
                .append($("<img>").attr("src", val.image)
                )
                .append($("<h3>").text(val.name)
                )
            )
        })
    }
}

function propagateResultList () {
    $("#resultList").empty()
    $("#resultList")
<<<<<<< HEAD


    .append($("<p>").text(`${repName} from ${chosenStateName}, could buy ${(Math.trunc(repWorth/itemPrice*100)/100)} using thier net worth.`)
    )
    .append($("<p>").text(`The average constituent in ${chosenStateName} could buy ${Math.trunc(chosenStateNetWorth/itemPrice*100)/100}`)

=======
    .append($("<p>").text(`${repName} from ${chosenStateName}, could buy ${(Math.trunc(repWorth/itemPrice*100)/100).toLocaleString()} using thier net worth.`)
    )
    .append($("<p>").text(`The average constituent in ${chosenStateName} could buy ${(Math.trunc(chosenStateNetWorth/itemPrice*100)/100).toLocaleString()}`)
>>>>>>> efb05238d26f1d047e94b5af18538cc50be0910e
    )
}




