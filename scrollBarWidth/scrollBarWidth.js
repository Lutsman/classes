function getScrollBarWidth() {
  var div = document.createElement('div');
  var scrollBarWidth = 0;

  $(div).css({
    'width': '100px',
    'height': '100px',
    'overflowY': 'scroll',
    'visibility': 'hidden'
  });
  document.body.appendChild(div);

  scrollBarWidth = div.offsetWidth - div.clientWidth;

  document.body.removeChild(div);

  return scrollBarWidth;
}