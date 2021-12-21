$("#nav-home").click(function() {
    window.location.href = "/list.html?id=" + urlParams.get("id");
});
$("#nav-profile").click(function() {
    window.location.href = "/personalDetails.html?id=" + urlParams.get("id");
});
$("#nav-myMatches").click(function() {
    window.location.href = "/myMatches.html?id=" + urlParams.get("id");
});