/**
 *Animate
 */
(function(){
    $(".scroll").each(function () {
        var block = this;

        animateOnLoad(block);

        $(window).on({
            scroll : animateOnScroll.bind(this, block)
        });
    });

    function animateOnScroll(block) {
        var coords = block.getBoundingClientRect();
        var clienHeight = document.documentElement.clientHeight;

        if ((coords.bottom > 0 && coords.bottom <= clienHeight) || (coords.top > 0 && coords.top <= clienHeight)) {
            if (!block.classList.contains("animated")) {
                block.classList.add("animated");
            }
        }
    }

    function animateOnLoad(block) {
        var coords = block.getBoundingClientRect();
        var clienHeight = document.documentElement.clientHeight;

        if (coords.bottom < 0 || coords.bottom > clienHeight || coords.top < 0 || coords.bottom > clienHeight) {
            if (block.classList.contains("animated")) {
                block.classList.remove("animated");
            }
        }
    }
})();