/*BlockToggler*/
(function(){
    function BlockToggler(options) {
        this._block = options.block;
        //this._listenedBlock = options.listenedBlock || document.body;
        this._target = $(this._block).attr('data-target');
        this._getTarget = options.getTarget || null; //func arg block return target
        this._groupName = $(this._block).attr('data-group-name');
        this._isActive = false;
        this._onOpen = options.onOpen || null;
        this._onClose = options.onClose || null;
        this._onAfterOpen = options.onAfterOpen || null;
        this._onAfterClose = options.onAfterClose || null;
    }
    BlockToggler.prototype.init = function () {
        if (!this._target && typeof this._getTarget === 'function') {
            this._target = this._getTarget(this._block);
        }

        $(this._block).on('click', this.toggler.bind(this));

        $('body').on('blockOpen',this.blockOpenListener.bind(this));
    };
    BlockToggler.prototype.toggler = function (e) {
        e.preventDefault();

        if (this._isActive) {
            this.hideBlock(function () {
                $(this._block).removeClass('active');

                if (this._onAfterClose) {
                    this._onAfterClose(this);
                }
            }.bind(this));

            $(this._block).trigger('blockClose', [this._block, this._groupName]);

            if (this._onClose) {
                this._onClose(this);
            }
        } else {
            $(this._block).addClass('active');
            this.showBlock(function () {
                if (this._onAfterOpen) {
                    this._onAfterOpen(this);
                }
            }.bind(this));

            $(this._block).trigger('blockOpen', [this._block, this._groupName]);

            if (this._onOpen) {
                this._onOpen(this);
            }
        }
    };
    BlockToggler.prototype.blockOpenListener = function (e, block, groupName) {
        if (block === this._block || groupName !== this._groupName || !this._isActive) return;

        $(this._block).removeClass('active');
        this.hideBlock();
    };
    BlockToggler.prototype.showBlock = function (callback) {
        $(this._target).slideDown('normal', 'linear', callback);
        this._isActive = true;

    };
    BlockToggler.prototype.hideBlock = function (callback) {
        $(this._target).slideUp('normal', 'linear', callback);
        this._isActive = false;
    };

    $.fn.blockToggler = function () {
        var options = typeof arguments[0] === 'object' ? arguments[0] : {};

        $(this).each(function () {
            options.block = this;

            var currBlockToggler = new BlockToggler(options);
            currBlockToggler.init();
        });
    }

})();