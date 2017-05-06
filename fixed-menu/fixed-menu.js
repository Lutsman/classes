/*Fixed menu class*/
(function(){
    function FixedMenu(options) {
        this._menu = options.menu;
        this._fixedClass = options.fixedClass || 'js-top-fixed';
        this._menuIsFixed = false;
        this._staticMenuPosition = -1;
        this._isPageSearch = options.pageSearch || true;
        this._pageSearchClass = options.pageSearchClass || 'active';
    }
    FixedMenu.prototype.init = function () {
        var setActiveLi = this.pageScrollListener();
        
        $(window).on({
            'load': function () {
                this.getStaticMenuPos();
                setActiveLi();
            }.bind(this),
            'scroll': function () {
                this.toggleMenuPosition();
                setActiveLi();
            }.bind(this),
            'resize': this.getStaticMenuPos.bind(this)
        });
    };
    FixedMenu.prototype.getCoords = function (elem) {
        var box = elem.getBoundingClientRect();
        
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    };
    FixedMenu.prototype.toggleMenuPosition = function (off) {
        var $menu = $(this._menu);
        
        if ($menu.is(':hidden')) return;
        
        if (window.pageYOffset <= this._staticMenuPosition && this._menuIsFixed || off) {
            $menu.removeClass(this._fixedClass);
            this._menuIsFixed = false;
            return;
        } else if (window.pageYOffset > this._staticMenuPosition && !this._menuIsFixed){
            $menu.addClass(this._fixedClass);
            this._menuIsFixed = true;
        }
    };
    FixedMenu.prototype.pageScrollListener = function () {
        var activeLink = null;
        var activeSection = null;
        var links = this._menu.querySelectorAll('a[href^="#"]');
        var self = this;
        
        return function () {
            if (!self._isPageSearch) return;
            if ($(self._menu).is(':hidden')) return;
            
            var coordsMenu = self._menu.getBoundingClientRect();
            var elem = document.elementFromPoint(self._menu.offsetWidth/2, coordsMenu.bottom + 50);
            
            if (!elem && activeLink) {
                activeLink.closest('li').classList.remove(self._pageSearchClass);
                activeLink = null;
                activeSection = null;
                return;
            } else if (!elem) {
                return;
            }
            
            if (activeLink && activeSection && activeSection.contains(elem)) {
                return;
            }
            
            for (var i = 0; i < links.length; i++) {
                var href = links[i].getAttribute('href');
                
                if(href.length < 2) continue;
                
                var targetSection = elem.closest(href);
                
                if (targetSection) {
                    if (activeLink) {
                        activeLink.closest('li').classList.remove(self._pageSearchClass);
                    }
                    activeSection = targetSection;
                    activeLink = links[i];
                    activeLink.closest('li').classList.add(self._pageSearchClass);
                    return;
                }
            }
            
            if(activeLink) {
                activeLink.closest('li').classList.remove(self._pageSearchClass);
                activeLink = null;
                activeSection = null;
            }
            
        };
    };
    FixedMenu.prototype.getStaticMenuPos = function () {
        if ($(this._menu).is(':hidden')) return;
        
        this.toggleMenuPosition(true);
        this._staticMenuPosition = this.getCoords(this._menu).top;
        this.toggleMenuPosition();
    };
    
    $.fn.fixedMenu = function () {
        var options = typeof arguments[0] === 'object' ? arguments[0] : {};
        
        $(this).each(function () {
            options.menu = this;
            
            var controller = new FixedMenu(options);
            controller.init();
        });
    };
})();


$(menuElem).fixedMenu({
    fixedClass: 'js-top-fixed', //string, default = 'js-top-fixed', class for menu block
    pageSearch: true, //boolean, dafault = true, search blocks by anchors in menu, under menu
    pageSearchClass: 'active' // default = 'active', class for active link
});
