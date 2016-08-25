/*ScrollUp button*/
(function(){
    var buttonUp = '<div id="scrollUp"><i class="upButton"></i></div>';
    var flag = false;

    $('body').append($(buttonUp));


    $('#scrollUp').click( function(){
        $("html, body").animate({scrollTop: 0}, 500);
        return false;
    });

    $(window).scroll(scrollBtnToggler);
    scrollBtnToggler();

    function scrollBtnToggler() {
        if ( $(document).scrollTop() > $(window).height() && !flag ) {
            $('#scrollUp').fadeIn({queue : false, duration: 400});
            $('#scrollUp').animate({'bottom' : '40px'}, 400);
            flag = true;
        } else if ( $(document).scrollTop() < $(window).height() && flag ) {
            $('#scrollUp').fadeOut({queue : false, duration: 400});
            $('#scrollUp').animate({'bottom' : '-20px'}, 400);
            flag = false;
        }
    }
})();