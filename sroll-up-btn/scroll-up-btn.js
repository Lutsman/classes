/*ScrollUp button*/
(function($){
    function ScrollTop(options) {
      this._tpl = options.tpl || '<div id="scrollUp"><i class="upButton"></i></div>';
      this._animateSpeed = options.animateSpeed || 400;
      this._animateSpeedShow = options.animateSpeedShow || options.animateSpeed || 400;
      this._animateSpeedHide = options.animateSpeedHide || options.animateSpeed || 400;
      this._animateSpeedScroll = options.animateSpeedScroll || 500;
      this._offsetShow = options.offsetShow || '40px';
      this._offsetHide = options.offsetHide || '-20px';
      this._isActive = false;
  
      this.init();
    }
    ScrollTop.prototype.init = function () {
      this._$btn = $(this._tpl);
      $('body').append(this._$btn);
  
      this.scrollBtnToggler();
  
      this._$btn.on('click', this.scrollTop.bind(this));
      $(window).on('scroll', this.scrollBtnToggler.bind(this));
    };
    ScrollTop.prototype.scrollBtnToggler = function () {
      if ( $(document).scrollTop() > $(window).height() && !this._isActive ) {
        this._$btn.fadeIn({queue : false, duration: this._animateSpeedShow})
          .animate({'bottom' : this._offsetShow}, this._animateSpeedShow);
        this._isActive = true;
      } else if ( $(document).scrollTop() < $(window).height() && this._isActive ) {
        this._$btn.fadeOut({queue : false, duration: this._animateSpeedHide})
          .animate({'bottom' : this._offsetHide}, this._animateSpeedHide);
        this._isActive = false;
      }
    };
    ScrollTop.prototype.scrollTop = function(){
      $("html, body").animate({scrollTop: 0}, this._animateSpeedScroll);
      return false;
    };
  
  
    /*export*/
    $.scrollTopBtn = function (tpl) {
      return  new ScrollTop(tpl);
    };
  })(jQuery);