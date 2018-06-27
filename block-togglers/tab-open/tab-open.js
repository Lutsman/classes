/*Menu continent*/
/*menu plugin*/
(function ($) {
    $(document).ready(function () {
        var collaborate = {
            activeTab: null
        };

        function TabMenu() {
            this.defaults = {
                openMenuClass: '.tab-open',
                openMenuActiveClass: '.tab-active',
                closeMenuClass: '.tab-close',
                panelMenuClass: '.tab-panel',
                contentBlockBtnClass: '.tab-content-block-btn',
                contentBlockBtnActiveClass: '.tab-active',
                contentBlockClass: '.tab-content-block',
                choosenBlockClass: '.tab-choosen',
                activeClass: '.tab-active', //не используется, оставил на всякий случай
                contentListClass: '.tab-content-list'
            };
            this.initialized = {
                $menu: null,
                $openBtn: null,
                $closeBtn: null,
                $menuPanel: null,
                $contentBlockBtn: null,
                $contentList: null,
                isChanging: false
            };
            this.options = {};
            this.init = function ($menu, userOptions) {
                $.extend(this.options, this.defaults, userOptions);

                var self = this;
                var sIn = self.initialized;
                var sOp = self.options;


                sIn.$openBtn = $(sOp.openMenuClass, $menu);
                sIn.$closeBtn = $(sOp.closeMenuClass, $menu);
                sIn.$menuPanel = $(sOp.panelMenuClass, $menu);
                sIn.$contentBlockBtn = $(sOp.contentBlockBtnClass, $menu);
                sIn.$contentList = $(sOp.contentListClass + '> li', sIn.$contentBlockBtn);
                sIn.$menu = $menu;


                sIn.$openBtn.click(function () {
                    if($(this).hasClass(sOp.openMenuActiveClass.slice(1))){
                        self.menuClose();
                        collaborate.activeTab = null;
                    } else {
                        if(collaborate.activeTab && collaborate.activeTab != self) {
                            collaborate.activeTab.menuClose();
                        }
                        self.menuOpen();
                        collaborate.activeTab = self;
                    }
                });
                sIn.$closeBtn.click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    self.menuClose();
                    collaborate.activeTab = null;
                });
                sIn.$contentBlockBtn.bind({
                    'mouseenter': function (e) {
                        e.stopPropagation();

                        self.showBlock($(this));
                    },
                    'click': function (e) {
                        e.stopPropagation();

                        self.chooseBlock($(this));
                    }
                });
                sIn.$contentList.click(function (e) {
                    e.stopPropagation();

                    self.menuClose();
                    self.chooseBlock($(this).closest(sIn.$contentBlockBtn));
                    activeTab = null;
                });


            };
            this.menuOpen = function () {
                var self = this;

                self.initialized.$menuPanel.slideDown('fast', 'linear', function () { //easeOutQuad
                    self.initialized.$openBtn.addClass(self.options.openMenuActiveClass.slice(1));
                });
            };
            this.menuClose = function () {
                var self = this;

                self.initialized.$menuPanel.slideUp('fast', 'linear', function () {
                    self.initialized.$openBtn.removeClass(self.options.openMenuActiveClass.slice(1));
                });
            };
            this.showBlock = function ($blockBtn) {
                var self = this;
                var active = self.options.contentBlockBtnActiveClass.slice(1);

                if( !$blockBtn.hasClass(active) && !self.initialized.isChanging ){
                    self.initialized.isChanging = true;

                    $blockBtn.addClass(active);
                    $blockBtn.children(self.options.contentBlockClass).fadeIn('normal', 'swing', function () {
                        self.initialized.$contentBlockBtn.not($blockBtn).each(function () {
                            $(this).removeClass(active);
                            $(this).children(self.options.contentBlockClass).fadeOut('normal', 'swing', function () {
                                self.initialized.isChanging = false;
                            });
                        });
                    });
                }
            };
            this.chooseBlock = function ($block) {
                var self = this;
                var sIn = self.initialized;
                var sOp = self.options;
                var choosen = sOp.choosenBlockClass.slice(1);

                $block.toggleClass(choosen);

                if($block.hasClass(choosen)) {
                    sIn.$contentBlockBtn.unbind('mouseenter');
                    sIn.$contentBlockBtn.not($block).each(function () {
                        $(this).removeClass(choosen);
                    });
                    self.showBlock($block);
                } else {
                    sIn.$contentBlockBtn.bind({
                        'mouseenter': function (e) {
                            e.stopPropagation();

                            self.showBlock($(this));
                        }
                    });
                }
            };
        }

        $.fn.tabMenu = function (userOptions) {
            return $(this).each(function () {
                var tMenuCopy = new TabMenu();

                tMenuCopy.init($(this), userOptions);
                $(this).data('collaborate', collaborate);
            });
        };
    });
})(jQuery);
jQuery(document).ready(function ($) {
    var collaborate = $('#tab-menu').tabMenu({
        openMenuActiveClass: '.active-tab',
        contentBlockBtnActiveClass: '.active-continent'
    }).data('collaborate');

    $('#tab-menu-city').tabMenu({
        openMenuActiveClass: '.active-tab',
        contentBlockBtnActiveClass: '.active-continent'
    });

    $('#tab-menu-theme').tabMenu({
        openMenuActiveClass: '.active-tab',
        contentBlockBtnActiveClass: '.active-continent'
    });

    function SimpleTab(options) {
        this._$openSearch = options.$openSearch;
        this._$searchBtn = options.$searchBtn;
        this._collaborate = options.collaborate;
    }
    SimpleTab.prototype.run = function (e) {
        var $target = $(e.target);

        if($target.is(this._$searchBtn)){
            if(this._collaborate.activeTab && this._collaborate.activeTab != this) {
                this._collaborate.activeTab.menuClose();
            }
            this.menuOpen();
            this._collaborate.activeTab = this;
        } else if(!$target.parents('.open-search').length && this._$openSearch.hasClass('active')) {
            this.menuClose();
            this._collaborate.activeTab = null;
        }
    };
    SimpleTab.prototype.menuOpen = function () {
        this._$openSearch.toggleClass('active');
    };
    SimpleTab.prototype.menuClose = function () {
        this._$openSearch.removeClass('active');
    };

    var searchMenu = new SimpleTab({
        collaborate: collaborate,
        $openSearch: $('.open-search'),
        $searchBtn: $('.fa.fa-search')
    });

    $('body').click(function (e) {
        searchMenu.run(e);
    });


    /* $('.top').click(function (e) {
     var $target = $(e.target);
     data-menu="tab-menu"
     })*/
});