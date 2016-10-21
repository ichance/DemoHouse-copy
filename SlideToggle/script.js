$(document).ready(function() {

    $("#messagesBody").slideToggle("fast"); // The Body of "Messages" is already opened in the design sample.

    $("#dashboard").click(function() {
        $(".tab").removeClass("tabSelected");
        $(".tab").addClass("tabNoSelected");
        $(this).removeClass("tabNoSelected");
        $(this).addClass("tabSelected");
        $(".tabBody").slideUp("fast");
        $("#dashboardBody").slideToggle("fast");
    });
    $("#profile").click(function() {
        $(".tab").removeClass("tabSelected");
        $(".tab").addClass("tabNoSelected");
        $(this).removeClass("tabNoSelected");
        $(this).addClass("tabSelected");
        $(".tabBody").slideUp("fast");
        $("#profileBody").slideToggle("fast");
    });
    $("#messages").click(function() {
        $(".tab").removeClass("tabSelected");
        $(".tab").addClass("tabNoSelected");
        $(this).removeClass("tabNoSelected");
        $(this).addClass("tabSelected");
        $(".tabBody").slideUp("fast");
        $("#messagesBody").slideToggle("fast");
    });
    $("#settings").click(function() {
        $(".tab").removeClass("tabSelected");
        $(".tab").addClass("tabNoSelected");
        $(this).removeClass("tabNoSelected");
        $(this).addClass("tabSelected");
        $(".tabBody").slideUp("fast");
        $("#settingsBody").slideToggle("fast");
    });
});
