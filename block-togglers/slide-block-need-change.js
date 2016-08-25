/*Slide block*/
(function(){
    function SlideToggler(options) {
        this._listenedBlock = options.listenedBlock || 'body'
    }
    SlideToggler.prototype.init = function () {
        var self = this;

        $(self._listenedBlock).click(this.toggler);
    };
    SlideToggler.prototype.toggler = function (e) {
        var elem = e.target;
        var toggleBtn = elem.closest('[data-action="slide-toggler"]');

        if (!toggleBtn) return;
        e.preventDefault();

        $(toggleBtn).toggleClass('active');
        $(toggleBtn.getAttribute('data-target')).slideToggle();
    };

    var slidingPanels = new SlideToggler({});
    slidingPanels.init();
})();