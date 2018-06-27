/*Fancybox*/
(function(){
    var fancyOpen = 'fancy-open';
    var fancyFrameOpen = 'fancy-frame-open';
    var fancyRender = 'fancy-render';
    var fancyClose = 'fancy-close';
    var fancyCloseBtn = '<p class="close"><a href="javascript:void(0)" data-action="close">×</a></p>';
    var $fancyHonorsGal = $('[data-fancybox-group="honors"]');
    var $fancyPortfolio = $('[data-fancybox-group="honors_portfolio"]');

    $fancyHonorsGal.fancybox({
        padding: [0, 0, 0, 0],
        margin: [0, 0, 0, 0],
        nextEffect: 'fade',
        prevEffect: 'fade',
        maxHeight: '80%',
        minHeight: '80%',
        tpl: {
            closeBtn: fancyCloseBtn
        },
        helpers : {
            overlay : {
                locked : false
            }
        }
    });

    $fancyPortfolio.fancybox({
        padding: [0, 0, 0, 0],
        margin: [0, 0, 0, 0],
        type: 'image',
        maxHeight: '80%',
        maxWidth: '80%',
        nextEffect: 'fade',
        prevEffect: 'fade',
        tpl: {
            closeBtn: fancyCloseBtn
        },
        helpers : {
            overlay : {
                locked : false
            }
        }
    });

    $('body').click(function (e) {
        var target = e.target;
        var actionBtn = target.closest('[data-action]');

        if (!actionBtn) return;
        e.preventDefault();

        var href = actionBtn.getAttribute('data-target') || actionBtn.getAttribute('href');
        var subjectInput = $(href).find('input[name="subject"]')[0];

        switch (actionBtn.getAttribute('data-action')) {
            case fancyOpen :
                if (actionBtn.getAttribute('data-subject')) {
                    subjectInput.value = actionBtn.getAttribute('data-subject');
                }
                $.fancybox.open({
                    href: href,
                    padding: [0, 0, 0, 0],
                    margin: [0, 0, 0, 0],
                    maxWidth: '80%',
                    tpl: {
                        closeBtn: fancyCloseBtn
                    },
                    helpers : {
                        overlay : {
                            locked : false
                        }
                    }
                });
                break;
            case fancyFrameOpen :
                $.fancybox.open({
                    href: href,
                    type: 'iframe',
                    maxWidth: '80%',
                    maxHeight: '90%',
                    //maxHeight: '90%',
                    padding: [0, 0, 0, 0],
                    margin: [0, 0, 0, 0],
                    tpl: {
                        closeBtn: fancyCloseBtn
                    },
                    helpers : {
                        overlay : {
                            locked : false
                        }
                    }
                });
                break;
            case fancyRender :
                var prodName = target.parentNode.querySelector('.title').textContent;
                $(href).find('.prod-name').text(prodName);
                subjectInput.value += ' ' + prodName;

                $.fancybox.open({
                    href: href,
                    padding: [0, 0, 0, 0],
                    margin: [0, 0, 0, 0],
                    maxWidth: '80%',
                    tpl: {
                        closeBtn: fancyCloseBtn
                    },
                    helpers : {
                        overlay : {
                            locked : false
                        }
                    }
                });
                break;
            case fancyClose :
                $.fancybox.close();
                break;
        }
    });
})();