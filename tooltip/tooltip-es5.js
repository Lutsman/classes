/*document.body.addEventListener('mouseover', showTooltip);
document.body.addEventListener('mouseout', removeTooltip);
function showTooltip(e) {
    var target = e.target;
    var tooltipText = target.getAttribute('data-tooltip');

    if(!tooltipText) return;

    var tooltip = document.createElement('span');
    tooltip.id = 'tooltip';
    tooltip.innerHTML = tooltipText;
    document.body.appendChild(tooltip);

    var coordsBtn = target.getBoundingClientRect();
    var coordsTooltip = tooltip.getBoundingClientRect();
    var extraMargin = 5;

    var tooltipWidth = coordsTooltip.right - coordsTooltip.left;
    var tooltipHeight = (coordsTooltip.bottom - coordsTooltip.top) + extraMargin;
    var btnWidth = coordsBtn.right - coordsBtn.left ;
    var toolPosX = coordsBtn.left + (btnWidth - tooltipWidth) / 2;

    tooltip.style.left = (toolPosX >= 0 ? toolPosX : 0) + 'px';
    tooltip.style.top = (coordsBtn.top > tooltipHeight ? coordsBtn.top - tooltipHeight : coordsBtn.bottom + extraMargin) + 'px';
}
function removeTooltip(e) {
    var tooltip = document.getElementById('tooltip');

    if(!tooltip) return;

    document.body.removeChild(tooltip);
}*/


function Tooltip() {
    this._listenedBlock = arguments[0] || document.body;
}
Tooltip.prototype.init = function () {
    if (!this._listenedBlock) return;

    this._listenedBlock.addEventListener('mouseover', this.showTooltip.bind(this));
    this._listenedBlock.addEventListener('mouseout', this.removeTooltip.bind(this));
};
Tooltip.prototype.showTooltip = function (e) {
    var target = e.target;
    var tooltipText = target.getAttribute('data-tooltip');

    if(!tooltipText) return;

    var tooltip = document.createElement('span');
    tooltip.id = 'tooltip';
    tooltip.innerHTML = tooltipText;
    document.body.appendChild(tooltip);

    var coordsBtn = target.getBoundingClientRect();
    var coordsTooltip = tooltip.getBoundingClientRect();
    var extraMargin = 5;

    var tooltipWidth = coordsTooltip.right - coordsTooltip.left;
    var tooltipHeight = (coordsTooltip.bottom - coordsTooltip.top) + extraMargin;
    var btnWidth = coordsBtn.right - coordsBtn.left ;
    var toolPosX = coordsBtn.left + (btnWidth - tooltipWidth) / 2;

    tooltip.style.left = (toolPosX >= 0 ? toolPosX : 0) + 'px';
    tooltip.style.top = (coordsBtn.top > tooltipHeight ? coordsBtn.top - tooltipHeight : coordsBtn.bottom + extraMargin) + 'px';

};
Tooltip.prototype.removeTooltip = function (e) {
    var tooltip = document.getElementById('tooltip');

    if(!tooltip) return;

    document.body.removeChild(tooltip);
};

var pageTooltip = new Tooltip();

pageTooltip.init();