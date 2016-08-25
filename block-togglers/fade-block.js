/*Fade block*/
(function(){
    function FadeBlock(options) {
        this._listenedBlock = options.listenedBlock || 'body'
    }
    FadeBlock.prototype.init = function () {
        var self = this;

        $(self._listenedBlock).click(function (e) {
            self.showBlock(e);
            self.hideBlock(e);
        });
    };
    FadeBlock.prototype.showBlock = function (e) {
        var elem = e.target;
        var openBtn = elem.closest('[data-action="open"]');

        if (!openBtn) return;
        e.preventDefault();

        var targetSelector = openBtn.getAttribute('data-target');
        var $openBtnAll = $('[data-action="open"][data-target="' + targetSelector + '"]')

        $openBtnAll.addClass('active');
        $(targetSelector).fadeIn();
    };
    FadeBlock.prototype.hideBlock = function (e) {
        var elem = e.target;
        var closeBtn = elem.closest('[data-action="close"]');

        if (!closeBtn) return;
        e.preventDefault();

        var targetSelector = closeBtn.getAttribute('data-target');
        var $openBtnAll = $('[data-action="open"][data-target="' + targetSelector + '"]');

        $openBtnAll.removeClass('active');
        $(targetSelector).fadeOut();
    };

    var searchBlockToggler = new FadeBlock({});
    searchBlockToggler.init();
})();