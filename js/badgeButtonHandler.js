
var lastOption;

$(document).ready(function () {
    $(".badgeButton").click(function () {
        let selectedBadge = $(this).children().text();
        if (lastOption === undefined || lastOption !== selectedBadge) {
            lastOption = selectedBadge;
            $("#filter-toolbar").slideDown(200);
            $("#selectedBadgeDisplay").text(selectedBadge);
            $(".postView").each( function(idx) {
                // return all badges as it's text label in an array
                let badgeTitles = $(this).find(".badge").map(function () {
                    return $(this).text();
                });
    
                if ($.inArray(selectedBadge, badgeTitles) !== -1) { // is in array
                    $(this).show(500);
                }
                else { // not in array
                    $(this).hide(500);
                }
            });
        }
        else {
            showAllArticles();
        }
    });
    $("#clearFilterButton").click(function () {
        showAllArticles();
    });
    function showAllArticles() {
        $(".postView").show(500);
        $("#filter-toolbar").slideUp(200);
        $("#selectedBadgeDisplay").text("ALL");
        lastOption = undefined;
    }
});
