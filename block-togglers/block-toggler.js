/*BlockToggler*/
(function(){
    function BlockToggler(options) {
        this._listenedBlock = options.listenedBlock || 'body';
        this._animate = options.animate || 'display';
    }
    BlockToggler.prototype.init = function () {
        var self = this;

        $(self._listenedBlock).click(function (e) {
            self.showBlock(e);
            self.hideBlock(e);
        });
    };
    BlockToggler.prototype.showBlock = function (e) {
        var elem = e.target;
        var openBtn = elem.closest('[data-action="open"]');

        if (!openBtn) return;
        e.preventDefault();

        var targetSelector = openBtn.getAttribute('data-target');
        var $openBtnAll = $('[data-action="open"][data-target="' + targetSelector + '"]')

        $openBtnAll.addClass('active');
        if (this._animate === 'display') {
            $(targetSelector).show();
        } else if (this._animate === 'fade') {
            $(targetSelector).fadeIn();
        } else if (this._animate === 'slide') {
            $(targetSelector).slideDown();
        }
    };
    BlockToggler.prototype.hideBlock = function (e) {
        var elem = e.target;
        var closeBtn = elem.closest('[data-action="close"]');

        if (!closeBtn) return;
        e.preventDefault();

        var targetSelector = closeBtn.getAttribute('data-target');
        var $openBtnAll = $('[data-action="open"][data-target="' + targetSelector + '"]');

        $openBtnAll.removeClass('active');
        if (this._animate === 'display') {
            $(targetSelector).hide();
        } else if (this._animate === 'fade') {
            $(targetSelector).fadeOut();
        } else if (this._animate === 'slide') {
            $(targetSelector).slideUp();
        }

    };

    var searchBlockToggler = new BlockToggler({});
    searchBlockToggler.init();
})();

/*BlockToggler slide*/
(function(){
    var $toggleBtn = $('[data-action="block-toggle"]');

    $toggleBtn.click(function (e) {
        var targetSelector = $(this).attr('data-target');
        var $target = $(this).parent().find(targetSelector);
        e.preventDefault();

        $(this).toggleClass('active');
        //$target.slideToggle();

        if ($(this).hasClass('active')) {
            $target.slideDown();
        } else {
            $target.slideUp();
        }
    })
})();

/* (function(){
 function BlockToggler(options) {
 this._listenedBlock = options.listenedBlock || 'body';
 this._animate = options.animate || 'display';
 }
 BlockToggler.prototype.init = function () {
 var self = this;

 //console.log($(this._listenedBlock));
 $(self._listenedBlock).click(function (e) {
 self.showBlock.call(self, e);
 self.hideBlock.call(self, e);
 });
 };
 BlockToggler.prototype.showBlock = function (e) {
 var elem = e.target;
 var openBtn = elem.closest('[data-action="block-toggle"]');

 if (!openBtn) return;
 e.preventDefault();
 console.log(openBtn);

 var targetSelector = openBtn.getAttribute('data-target');
 var $target = $(openBtn).parents(this._listenedBlock).find(targetSelector);
 var $openBtnAll = $(openBtn).parents(this._listenedBlock).find('[data-action="block-toggle"][data-target="' + targetSelector + '"]');

 $openBtnAll.addClass('active');
 if (this._animate === 'display') {
 $target.show();
 } else if (this._animate === 'fade') {
 $target.fadeIn();
 } else if (this._animate === 'slide') {
 $target.slideDown();
 }
 };
 BlockToggler.prototype.hideBlock = function (e) {
 var elem = e.target;
 var closeBtn = elem.closest('[data-action="block-close"]');
 var toggleBtn = elem.closest('.active[data-action="block-toggle"]');

 if (!closeBtn && !toggleBtn) return;
 e.preventDefault();
 var actionBtn = closeBtn || toggleBtn;

 var targetSelector = actionBtn.getAttribute('data-target');
 var $target = $(actionBtn).parents(this._listenedBlock).find(targetSelector);
 var $openBtnAll = $(actionBtn).parents(this._listenedBlock).find('[data-action="block-toggle"][data-target="' + targetSelector + '"]');

 $openBtnAll.removeClass('active');
 if (this._animate === 'display') {
 $target.hide();
 } else if (this._animate === 'fade') {
 $target.fadeOut();
 } else if (this._animate === 'slide') {
 $target.slideUp();
 }

 };

 var faqBlocks = new BlockToggler({
 listenedBlock: '.questions__block > div',
 animate: 'slide'
 });
 faqBlocks.init();
 })();*/