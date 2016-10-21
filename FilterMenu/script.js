$(function() {

    $('.toggle-btn').click(function() {
        $('.filter-btn').toggleClass('open');

    });

    $('.filter-btn a').click(function() {
        $('.filter-btn').removeClass('open');

    });

});

$('#all').click(function() {

    $('ul.tasks li').slideDown(300);

});

$('#one').click(function() {
    $('.tasks li:not(.one)').slideUp(300, function() {
        $('.one').slideDown(300);

    });
});

$('#two').click(function() {
    $('.tasks li:not(.two)').slideUp(300, function() {
        $('.two').slideDown(300);

    });
});
$('#three').click(function() {
    $('.tasks li:not(.three)').slideUp(300, function() {
        $('.three').slideDown(300);

    });
});
