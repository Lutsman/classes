/*Fixed menu */
(function(){
    /*Menu controller fixed*/
    function FixedMenu(options) {
        this._menu = options.menu;
        this._fixedClass = options.fixedClass || 'js-top-fixed';
        this._menuIsFixed = false;
        this._staticMenuPosition = -1;

    }
    FixedMenu.prototype.init = function () {
        var self = this;
        var setActiveLi = self.pageScrollListener.call(self);


        $(window).load(function () {
            self._staticMenuPosition = self.getCoords(self._menu).top;
            self.toggleMenuPosition();
            setActiveLi();

            $(window)
                .scroll(self.toggleMenuPosition.bind(self))
                .scroll(setActiveLi);
        });


    };
    FixedMenu.prototype.getCoords = function (elem) {
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    };
    FixedMenu.prototype.toggleMenuPosition = function () {
        if (window.pageYOffset <= this._staticMenuPosition && this._menuIsFixed) {
            $(this._menu).removeClass(this._fixedClass);
            this._menuIsFixed = false;
        } else if (window.pageYOffset > this._staticMenuPosition && !this._menuIsFixed){
            $(this._menu).addClass(this._fixedClass);
            this._menuIsFixed = true;
        }
    };
    FixedMenu.prototype.pageScrollListener = function () {
        var activeLink = null;
        var activeSection = null;
        var links = this._menu.querySelectorAll('a[href^="#"]');
        var self = this;

        var checkMenuPos = function () {
            var coordsMenu = self._menu.getBoundingClientRect();
            var elem = document.elementFromPoint(self._menu.offsetWidth/2, coordsMenu.bottom + 50);

            if (!elem && activeLink) {
                activeLink.closest('li').classList.remove('active');
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
                        activeLink.closest('li').classList.remove('active');
                    }
                    activeSection = targetSection;
                    activeLink = links[i];
                    activeLink.closest('li').classList.add('active');
                    return;
                }
            }

            if(activeLink) {
                activeLink.closest('li').classList.remove('active');
                activeLink = null;
                activeSection = null;
            }

        };

        return checkMenuPos;
    };


    var topMenu = new FixedMenu({
        menu: document.getElementById('top-menu')
    });

    topMenu.init();
})();