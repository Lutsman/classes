(function (window) {
    'use strict';

    var $ = window.jquery || window;

    /*функция обертка выполняет вызов func и ждет ms милисекунд
     * если во время ожидания происходят вызовы функции игнорирует*/
    $.debounce = function (func, ms) {
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
    };

    /*функция обертка выполняет вызов func и ждет ms милисекунд
    * если во время ожидания происходят вызовы функции запоминает последний
    * и выполняет в конце ожидания*/
    $.throttle = function (func, ms) {

        var isThrottled = false,
            savedArgs,
            savedThis;

        function wrapper() {

            if (isThrottled) { // (2)
                savedArgs = arguments;
                savedThis = this;
                return;
            }

            func.apply(this, arguments); // (1)

            isThrottled = true;

            setTimeout(function() {
                isThrottled = false; // (3)
                if (savedArgs) {
                    wrapper.apply(savedThis, savedArgs);
                    savedArgs = savedThis = null;
                }
            }, ms);
        }

        return wrapper;
    };

})(this);