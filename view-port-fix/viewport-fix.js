/*Viewport fix safary*/
(function(){
    'use strict';
    var element = document.querySelector('.page-wrap');
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {

        window.addEventListener('resize', fixViewport.bind(null, element), true);
        fixViewport(element);
    }

    function fixViewport (element) {
        element.style.height = document.documentElement.clientHeight + 'px';
    }
})();