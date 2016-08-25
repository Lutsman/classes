/*Yandex metrika and targets*/
(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter38158930 = new Ya.Metrika({
                id:38158930,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            });
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://mc.yandex.ru/metrika/watch.js";

    s.addEventListener('load', function () {
        'use strict';

        var yandexTargets = function (e) {
            var target = e.target;
            var attr = target.getAttribute('data-yaTarget');

            if(!attr) return;

            yaCounter38158930.reachGoal(attr);
        };

        document.body.addEventListener('click', yandexTargets);
    });

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
})(document, window, "yandex_metrika_callbacks");