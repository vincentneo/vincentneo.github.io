
// https://stackoverflow.com/a/1527820/13292870
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function () {

    $("#iconic").attr("src", "images/IconicFolders/iconic-" + getRandomInt(0,9) + ".png")
});