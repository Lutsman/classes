'use strict';

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD (Register as an anonymous module)
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    class Tooltip {
        constructor(options) {
            this.block = options.block;
            this.tooltipPosition = options.position || 'vertical';
            this.extraMargin = options.extraMargin || 5;
            this.showAnimation = options.showAnimation || 'fade';
            this.hideAnimation = options.hideAnimation || 'fade';
            this.tmpl =
              `<div class="jtooltip">
          <div class="jtooltip-arrow"></div>
          <div class="jtooltip-inner"></div>
        </div>`;

            this.init();
        }

        init() {
            if (!this.block) return;

            this.bindedAddTooltip = this.debounce(this.addTooltip, 820).bind(this);
            this.bindedRemoveTooltip = this.removeTooltip.bind(this);

            $(this.block).on({
                'mouseenter': this.bindedAddTooltip,
                'mouseleave': this.bindedRemoveTooltip
            });
        };

        addTooltip() {
            this.renderTooltip();
            this.showTooltip();
        }

        renderTooltip() {
            let $tooltip = this.$tooltip = $(this.tmpl);
            let tooltip = $tooltip[0];
            let $inner = this.$inner = $tooltip.find('.jtooltip-inner');
            let $arrow = this.$arrow = $tooltip.find('.jtooltip-arrow');
            let arrow = $arrow[0];
            let arrowClass = '';
            let block = this.block;
            let content = this.block.getAttribute('data-jtooltip-title');
            let blockCoords = this.getCoords(block);
            let extraMargin = this.extraMargin;
            let wWidth = document.documentElement.clientWidth;
            let wHeight = document.documentElement.clientHeight;
            let wXOffset = window.pageXOffset;
            let wYOffset = window.pageYOffset;
            let top = null;
            let left = null;
            let customStyleClass = this.getPartialClass(this.block, 'js__jtooltip-s_') || '';

            $inner[0].textContent = content;
            $('body').append($tooltip);

            if (this.tooltipPosition === 'vertical') {
                let toolLeft = blockCoords.left + (block.offsetWidth - tooltip.offsetWidth) / 2;
                let toolTop = blockCoords.bottom + extraMargin;

                if (toolLeft >= wXOffset && toolLeft + tooltip.offsetWidth <= wXOffset + wWidth) {
                    left = toolLeft;
                    $arrow.css({
                        left: ((tooltip.offsetWidth - arrow.offsetWidth) / 2) + 'px'
                    });
                } else if (toolLeft < wXOffset) {
                    left = wYOffset;
                    $arrow.css({
                        left: (blockCoords.left + (block.offsetWidth - arrow.offsetWidth) / 2 - wYOffset) + 'px'
                    });
                } else if (toolLeft + tooltip.offsetWidth > wXOffset + wWidth) {
                    left = wXOffset + wWidth - tooltip.offsetWidth;
                    $arrow.css({
                        right: (wWidth - (blockCoords.right - (block.offsetWidth + arrow.offsetWidth) / 2 - wYOffset)) + 'px'
                    });
                }

                if (toolTop + tooltip.offsetHeight <= wYOffset + wHeight) {
                    top = toolTop;
                    arrowClass = 'jtooltip-b';
                } else {
                    top = blockCoords.top - tooltip.offsetHeight - extraMargin;
                    arrowClass = 'jtooltip-t';
                }
            } else {
                let toolLeft = blockCoords.right + extraMargin;
                let toolTop = blockCoords.top + (block.offsetHeight - tooltip.offsetHeight) / 2; //extraMargin;

                if (toolLeft + tooltip.offsetWidth <= wXOffset + wWidth) {
                    left = toolLeft;
                    arrowClass = 'jtooltip-r';
                } else {
                    left = blockCoords.left - tooltip.offsetWidth - extraMargin;
                    arrowClass = 'jtooltip-l';
                }

                if (toolTop >= wYOffset && toolTop + tooltip.offsetHeight <= wYOffset + wHeight) {
                    top = toolTop;
                    $arrow.css({
                        top: ((tooltip.offsetHeight - arrow.offsetHeight) / 2) + 'px'
                    });
                } else if (toolTop < wYOffset) {
                    top = wYOffset;
                    $arrow.css({
                        top: (blockCoords.top + (block.offsetHeight - arrow.offsetHeight) / 2 - wYOffset) + 'px'
                    });
                } else if (toolTop + tooltip.offsetHeight > wYOffset + wHeight) {
                    top = wYOffset + wHeight - tooltip.offsetHeight;
                    $arrow.css({
                        bottom: (wHeight - (blockCoords.bottom - (block.offsetHeight + arrow.offsetHeight) / 2 - wYOffset)) + 'px'
                    });
                }
            }

            $tooltip
              .addClass(arrowClass)
              .addClass(customStyleClass)
              .css({
                  left: left + 'px',
                  top: top + 'px',
                  display: 'none'
              });

            //tooltip.style.left = left + 'px';
            //tooltip.style.top = top + 'px';
        };

        removeTooltip() {
            this.hideTooltip(true);
        };

        showTooltip() {
            if (!this.$tooltip.length) return;

            switch (this.showAnimation) {
                case 'simple':
                    this.$tooltip.show();
                    break;
                case 'slide':
                    this.$tooltip.slideDown();
                    break;
                case 'fade':
                    this.$tooltip.fadeIn();
                    break;
            }
        }

        hideTooltip(destroyTooltip) {
            let callback = function () {
            };

            if (!this.$tooltip) return;

            if (destroyTooltip) {
                callback = this.destoyTooltip.bind(this);
            }

            if (!this.$tooltip.length) return;

            switch (this.showAnimation) {
                case 'simple':
                    this.$tooltip.hide();
                    callback();
                    break;
                case 'slide':
                    this.$tooltip.slideUp(callback);
                    break;
                case 'fade':
                    this.$tooltip.fadeOut(callback);
                    break;
            }
        }

        destoyTooltip() {
            this.$tooltip.remove();
            this.$tooltip = null;
            this.$inner = null;
            this.$arrow = null;
        }

        getCoords(elem) {
            let box = elem.getBoundingClientRect();

            return {
                top: box.top + window.pageYOffset,
                bottom: box.bottom + window.pageYOffset,
                left: box.left + window.pageXOffset,
                right: box.right + window.pageXOffset
            };
        }

        getPartialClass(el, classStart) {
            let classStr = el.className;
            let startPos = classStr.indexOf(classStart);

            if (!~startPos) return null;

            let endPos = ~classStr.indexOf(' ', startPos) ? classStr.indexOf(' ', startPos) : undefined;

            return classStr.slice(startPos, endPos);
        }

        debounce(func, ms) {
            var state = false;

            function wrapper() {
                if (state) return;

                func.apply(this, arguments);
                state = true;

                setTimeout(function () {
                    state = false;
                }, ms);
            }

            return wrapper;
        }

        getSelf() {
            return this;
        }
    }


    $.fn.jtooltip = function () {
        let _ = this;
        let options = arguments[0] || {};
        let args = Array.prototype.slice.call(arguments, 1);

        for (let i = 0; i < _.length; i++) {
            if (typeof options === 'object') {
                options.block = _[i];
                _[i].jtooltip = new Tooltip(options);
            } else {
                let result = _[i].jtooltip[options].call(_[i].jtooltip, args);

                if (typeof result !== 'undefined') return result;
            }
        }

        return _;
    };
}));


/*init*/

jQuery(document).ready(function ($) {
    /*vertical*/
    (function () {
        let $tooltip = $('.js__jtooltip');
        let options = {};

        $tooltip.jtooltip(options);
    })();

    /*horizontal*/
    (function () {
        let $tooltip = $('.js__jtooltip-horizontal');
        let options = {
            position: 'horizontal'
        };

        $tooltip.jtooltip(options);
    })();
});