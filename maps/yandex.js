/*Yandex map*/
(function(){
    if (!document.getElementById('map')) return;

    var firstScript = document.querySelectorAll('script')[0];
    var script = document.createElement('script');
    var placemarks = {
        0: {
            coords: [55.7385,37.4821],
            hintContent: 'Мультифото!'
        },
        1: {
            coords: [55.7129,37.4855],
            hintContent: 'Мультифото!'
        },
        2: {
            coords: [55.7323,37.5447],
            hintContent: 'Мультифото!'
        },
        3: {
            coords: [55.7012,37.5568],
            hintContent: 'Мультифото!'
        },
        4: {
            coords: [55.7181,37.5732],
            hintContent: 'Мультифото!'
        },
        5: {
            coords: [55.7225,37.6090],
            hintContent: 'Мультифото!'
        },
        6: {
            coords: [55.7193,37.6467],
            hintContent: 'Мультифото!'
        },
        7: {
            coords: [55.7025,37.6695],
            hintContent: 'Мультифото!'
        },
        8: {
            coords: [55.7378,37.6953],
            hintContent: 'Мультифото!'
        },
        9: {
            coords: [55.7253,37.7431],
            hintContent: 'Мультифото!'
        }
    };

    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.async = true;
    firstScript.parentNode.insertBefore(script, firstScript);

    script.addEventListener('load', function () {
        ymaps.ready(init);
    });

    function init(){
        var myMap = new ymaps.Map('map', {
            center: [55.7207,37.6110], //[55.7207,37.6234],
            zoom: 12
        }, {
            searchControlProvider: 'yandex#search'
        });

        myMap.behaviors.disable('scrollZoom');

        for (var currPlacemark in placemarks) {
            myMap.geoObjects.add(new ymaps.Placemark(placemarks[currPlacemark].coords, {
                hintContent: placemarks[currPlacemark].hintContent
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'images/baloon.png',
                iconImageSize: [28, 40],
                iconImageOffset: [-30, -50]
            }));
        }
    }
})();