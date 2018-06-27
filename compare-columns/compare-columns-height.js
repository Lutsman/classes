/*Compare_table same column height*/
(function(){
    setSameRowHeight();
    $(window).resize(setSameRowHeight);

    function setSameRowHeight() {
        var $table = $('.compare__table');

        if (!$table.length) return;

        var $columns = $table.find('.table-column');

        for (var i = 1; i < $columns[0].children.length; i++) {
            var maxHeight = 0;

            for (var j = 0; j < $columns.length; j++) {
                $columns[j].children[i].style.height = '';
                var currRowHeight = $columns[j].children[i].offsetHeight;
                maxHeight = maxHeight > currRowHeight ? maxHeight : currRowHeight;
            }

            for (var k = 0; k < $columns.length; k++) {
                //если это колонка с именами, то к первому и последнему блоку добавляем 1px из-за разницы в границе
                if (k === 0 && (i === 1 || i === $columns[0].children.length - 1)) {
                    $columns[k].children[i].style.height = maxHeight + 1 + 'px';
                } else {
                    $columns[k].children[i].style.height = maxHeight + 'px';
                }
            }
        }
    }
})();