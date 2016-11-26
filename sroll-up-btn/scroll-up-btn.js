/*ScrollUp button*/
(function(){
    function ScrollTop(tmpl) {
        this._tmpl = tmpl || '<div id="scrollUp"><i class="upButton"></i></div>';
        this._isActive = false;
        
        this.init();
    }
    ScrollTop.prototype.init = function () {
        this._$btn = $(this._tmpl);
        $('body').append(this._$btn);
        
        this.scrollBtnToggler();
        
        this._$btn.on('click', this.scrollTop.bind(this));
        $(window).on('scroll', this.scrollBtnToggler.bind(this));
    };
    ScrollTop.prototype.scrollBtnToggler = function () {
        if ( $(document).scrollTop() > $(window).height() && !this._isActive ) {
            this._$btn.fadeIn({queue : false, duration: 400})
                .animate({'bottom' : '40px'}, 400);
            this._isActive = true;
        } else if ( $(document).scrollTop() < $(window).height() && this._isActive ) {
            this._$btn.fadeOut({queue : false, duration: 400})
                .animate({'bottom' : '-20px'}, 400);
            this._isActive = false;
        }
    };
    ScrollTop.prototype.scrollTop = function(){
        $("html, body").animate({scrollTop: 0}, 500);
        return false;
    };
    
    var scrollTopBtn = new ScrollTop();
})();