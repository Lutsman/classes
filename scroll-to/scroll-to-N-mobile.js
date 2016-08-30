/*ScrollToAnchor && mobile menu*/
(function(){
    /*ScrollToAnchor class*/
    function ScrollToAnchor(options) {
        this._listenedBlock = options.listenedBlock || document.body;
        this._translationElementSelector = options.translation;
    }
    ScrollToAnchor.prototype.init = function () {
        this._listenedBlock.addEventListener('click', this.anchorClickListener.bind(this));
    };
    ScrollToAnchor.prototype.anchorClickListener = function (e) {
        var elem = e.target;
        var anchorWithHash = elem.closest('a[href^="#"]:not([data-scroll="disable"])');

        if (!anchorWithHash || !anchorWithHash.hash.length) return;

        e.preventDefault();

        var target = anchorWithHash.hash;
        var translation = 0;

        if (anchorWithHash.hasAttribute('data-translation')) {
            translation = anchorWithHash.getAttribute('data-translation');
        } else if (this._translationElementSelector) {
            translation = document.querySelector(this._translationElementSelector).offsetHeight;
        }

        if(! document.querySelector(target)) return;

        this.smoothScroll(target, translation);
    };
    ScrollToAnchor.prototype.smoothScroll = function (selector, translation) {
        $("html, body").animate({
                scrollTop: $(selector).offset().top - (translation||0)},
            500
        );
    };

    /*page scroll*/
    (function(){
        var pageScroll = new ScrollToAnchor({
            listenedBlock: document.getElementById('#top-menu'),
            translation: '#top-menu'
        });
        pageScroll.init();
    })();

    /*mmenu*/
    (function(){
        /*mmenu scroll*/
        var mmenuScroll = new ScrollToAnchor({
            listenedBlock: document.getElementById('#m-menu'),
            translation:  '#top-menu'
        });


        setUpMmenu();

        function setUpMmenu() {
            var $menu = $('nav#m-menu');
            var $openMenuBtn = $('#hamburger');

            $menu.mmenu({
                "extensions": ["theme-dark"]
            });

            var selector = false;
            $menu.find( 'li > a' ).on(
                'click',
                function( e )
                {
                    selector = this.hash;
                }
            );

            var api = $menu.data( 'mmenu' );
            api.bind( 'closed',
                function() {
                    if (selector) {
                        mmenuScroll.smoothScroll(selector,  document.querySelector(mmenuScroll._translationElementSelector).offsetHeight);
                        selector = false;
                    }
                }

            );
            $openMenuBtn.click(function () {
                api.open();
            });

        }
    })();
})();