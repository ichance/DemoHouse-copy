$('.email').on("change keyup paste",
    function() {
        if ($(this).val()) {
            $('.icon-paper-plane').addClass("next");
        } else {
            $('.icon-paper-plane').removeClass("next");
        }
    }
);

$('.next-button').hover(
    function() {
        $(this).css('cursor', 'pointer');
    }
);

$('.next-button.email').click(
    function() {
        console.log("Something");
        $('.email-section').addClass("fold-up");
        $('.password-section').removeClass("folded");
    }
);

$('.password').on("change keyup paste",
    function() {
        if ($(this).val()) {
            $('.icon-lock').addClass("next");
        } else {
            $('.icon-lock').removeClass("next");
        }
    }
);

$('.next-button').hover(
    function() {
        $(this).css('cursor', 'pointer');
    }
);

$('.next-button.password').click(
    function() {
        console.log("Something");
        $('.password-section').addClass("fold-up");
        $('.repeat-password-section').removeClass("folded");
    }
);

$('.repeat-password').on("change keyup paste",
    function() {
        if ($(this).val()) {
            $('.icon-repeat-lock').addClass("next");
        } else {
            $('.icon-repeat-lock').removeClass("next");
        }
    }
);

$('.next-button.repeat-password').click(
    function() {
        console.log("Something");
        $('.repeat-password-section').addClass("fold-up");
        $('.success').css("marginTop", 0);
    }
);
