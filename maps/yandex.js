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


    /*поведение карты*/
    var $mapWrapper = $('.map-wrap');
    var isActiveMap = false;

    $mapWrapper.on('mouseleave', function () {
        $mapWrapper.removeClass('active');
        isActiveMap = false;
    });
    $('body').on('click', function (e) {
        var target = e.target;

        if ($(target).closest($mapWrapper).length) {
            if (isActiveMap) return;

            $mapWrapper.addClass('active');
            isActiveMap = true;
        } else {
            if (!isActiveMap) return;

            $mapWrapper.removeClass('active');
            isActiveMap = false;
        }
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
            var placemark = new ymaps.Placemark(placemarks[currPlacemark].coords, {
                hintContent: placemarks[currPlacemark].hintContent,
                balloonContent: 'hello'
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'images/baloon.png',
                iconImageSize: [28, 40],
                iconImageOffset: [-30, -50]
            });

            myMap.geoObjects.add(placemark);

            //placemark event hadler
            placemark.events.add('click', function (e) {
                e.preventDefault();
                //some func
            });
        }

         var polygon = new ymaps.Polygon([
         [
         [55.76114043308835,37.679592923278754],
         [55.76156388852916,37.67957146560667],
         [55.76156993785905,37.68011863624572],
         [55.76114648248421,37.680129365081726],
         [55.76114043308835,37.679592923278754]
         ]
         ], {
         hintContent: "Многоугольник"
         }, {
         fillColor: '#6699ff',
         // Делаем полигон прозрачным для событий карты.
         interactivityModel: 'default#transparent',
         strokeWidth: 8,
         opacity: 0.5
         });

        myMap.geoObjects.add(polygon);
        myMap.setBounds(polygon.geometry.getBounds());
    }
})();


/*посмотреть на досуге*/
/*"use strict";
 spaced_cli.block.register(10, {
 require: ["//api-maps.yandex.ru/2.1/?lang=ru_RU"], on_init: function () {
 this.$map = this.$block.find("[data-map]").eq(0), this.map_data = this.$map.data("map"), ymaps.ready($.proxy(function () {
 this.show_map()
 }, this)), spaced_cli.is_admin ? this.$block.find(".overlay").remove() : this.$block.find(".overlay").one("mousedown", function (a) {
 $(a.currentTarget).remove()
 })
 }, show_map: function () {
 "undefined" != typeof this.map && this.map.destroy(), this.map = new ymaps.Map(this.$map.get(0), {
 center: this.map_data.center,
 zoom: this.map_data.zoom,
 controls: ["zoomControl", "fullscreenControl"],
 behaviors: ["default", "scrollZoom"],
 type: "yandex#map"
 });
 var a;
 this.map.behaviors.disable("scrollZoom"), $(this.$map).off("mouseenter.map_scroll").on("mouseenter.map_scroll", $.proxy(function (o) {
 a = window.setTimeout($.proxy(function () {
 this.map.behaviors.enable("scrollZoom")
 }, this), 700)
 }, this)), $(this.$map).off("mouseleave.map_scroll").on("mouseleave.map_scroll", $.proxy(function (o) {
 a && (window.clearTimeout(a), this.map.behaviors.disable("scrollZoom"))
 }, this)), this.update_places(), spaced_cli.run.is_mobile && this.map.behaviors.disable("drag")
 }, update_places: function () {
 this.map.geoObjects.removeAll(), "undefined" == typeof this.map_data.marker && (this.map_data.marker = "/_app/block/10/mark_blue.png"), $.each(this.map_data.places, $.proxy(function (a, o) {
 "undefined" == typeof o.color && (o.color = "blue");
 var e = new ymaps.Placemark(o.coords, {balloonContent: o.address}, {
 iconLayout: "default#image",
 iconImageHref: "/_app/block/10/mark_" + o.color + ".png",
 iconImageSize: [50, 50],
 iconImageOffset: [-25, -50]
 });
 this.map.geoObjects.add(e)
 }, this))
 }
 });*/
