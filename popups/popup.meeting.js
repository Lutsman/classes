/*PopUp Control class*/
function PopUpList(options) {
  this._$bg = $(options.popUpBg);
  this._$wrapper = $(options.popUpWrapper);
  this._panelList = this._$wrapper.children();
  this._currPanelIndex = 0;
  this._nameSpaceAtrr = {
    action: 'data-action',
    target: 'data-target'
  };
  this._openAttr = {
    value: 'open'
  };
  this._closeAttr = {
    value: 'close'
  };
  this._nextAttr = {
    value: 'next'
  };
  this._prevAttr = {
    value: 'prev'
  };
  this._goToAttr = {
    value: 'goto'
  };
}

PopUpList.prototype.init = function () {
  if (!this._$wrapper.length) return;

  $('body').click(this.togglePopUpListeners.bind(this));
  this._$wrapper.click(this.navigatePopUpListeners.bind(this));
};
PopUpList.prototype.openPopUp = function () {
  if (arguments.length) {
    this._currPanelIndex = arguments[0];
  }

  $(this._panelList[this._currPanelIndex]).fadeIn('normal');
  this._$wrapper.fadeIn('normal');
  this._$bg.fadeIn('normal');
};
PopUpList.prototype.closePopUp = function () {
  $(this._panelList[this._currPanelIndex]).fadeOut('normal');
  this._$wrapper.fadeOut('normal');
  this._$bg.fadeOut('normal');
  this._currPanelIndex = 0;
};
PopUpList.prototype.openPanel = function (panel) {
  $(panel).fadeIn('normal');
};
PopUpList.prototype.closePanel = function (panel) {
  $(panel).fadeOut('normal');
};
PopUpList.prototype.nextPanel = function () {
  if (this._currPanelIndex === this._panelList.length - 1) return;

  this.closePanel(this._panelList[this._currPanelIndex]);
  this.openPanel(this._panelList[this._currPanelIndex + 1]);
  this._currPanelIndex++;
};
PopUpList.prototype.prevPanel = function () {
  if (this._currPanelIndex === 0)  return;

  this.closePanel(this._panelList[this._currPanelIndex]);
  this.openPanel(this._panelList[this._currPanelIndex - 1]);
  this._currPanelIndex--;
};
PopUpList.prototype.goToIndex = function (index) {
  if (!this._panelList[index]) return;

  $(this._panelList[this._currPanelIndex]).fadeOut('normal');
  $(this._panelList[index]).fadeIn('normal');
  this._currPanelIndex = index;
};
PopUpList.prototype.goToSelector = function (selector) {
  var targetPanel = this._$wrapper.children(selector)[0];
  var targetIndex = $(targetPanel).index();

  if (!targetPanel) return;

  this.closePanel(this._panelList[this._currPanelIndex]);
  this.openPanel(targetPanel);
  this._currPanelIndex = targetIndex;
};
PopUpList.prototype.togglePopUpListeners = function (e) {
  var elem = e.target;
  var elemActionValue = $(elem).attr(this._nameSpaceAtrr.action);
  var elemTargetValue = $(elem).attr(this._nameSpaceAtrr.target);

  if (elemActionValue === this._openAttr.value && this._$wrapper[0].matches(elemTargetValue)) {
    this.openPopUp();
  }
  if (elemActionValue === this._closeAttr.value) {
    this.closePopUp();
  }
};
PopUpList.prototype.navigatePopUpListeners = function (e) {
  var elem = e.target;
  var nameSpace = this._nameSpaceAtrr;
  var elemActionValue = $(elem).attr(nameSpace.action);

  if (!elemActionValue) return;

  if (elemActionValue === this._nextAttr.value) {
    this.nextPanel();
    return false;
  }
  if (elemActionValue === this._prevAttr.value) {
    this.prevPanel();
    return false;
  }
  if (elemActionValue === this._goToAttr.value) {
    var goToTargetValue = $(elem).attr(nameSpace.target);

    if (this.isNumeric(goToTargetValue)) {
      this.goToIndex(+goToTargetValue);
    } else {
      this.goToSelector(goToTargetValue);
    }
    return false;
  }
};
PopUpList.prototype.isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
