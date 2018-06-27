/**
 * Animate touch event mobile
 **/
(function(){
    var scroller=false,
        button = $('a.submit, a.btn');

    $(button).bind({
        touchstart: function(event){
            var elem=$(this);
            clickable=setTimeout(function () { elem.addClass('active');}, 100);
        },

        touchmove: function(event){
            clearTimeout(clickable);
            scroller=true;
        },

        touchend: function(event){
            var elem=$(this);
            clearTimeout(clickable);

            if(!scroller)
            {
                elem.addClass('active');
                setTimeout(function () { elem.removeClass('active');}, 50);
            }
            else
            {
                elem.removeClass('active');
            }
        }
    });
})();