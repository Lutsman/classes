/*Scale*/
(function(){
    'use strict';

    var element = document.querySelector('.page-wrap');
    var fixViewport = function () {
        element.style.minHeight = document.documentElement.clientHeight + 'px';
    };

    // listen window height
    window.addEventListener('resize', fixViewport, true);
    fixViewport();
})();