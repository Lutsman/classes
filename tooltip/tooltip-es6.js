document.body.addEventListener('mouseover', showTooltip);
document.body.addEventListener('mouseout', removeTooltip);
function showTooltip(e) {
    let target = e.target;
    let tooltipText = target.getAttribute('data-tooltip');

    if(!tooltipText) return;

    let tooltip = document.createElement('span');
    tooltip.id = 'tooltip';
    tooltip.innerHTML = tooltipText;
    document.body.appendChild(tooltip);

    let coordsBtn = target.getBoundingClientRect();
    let coordsTooltip = tooltip.getBoundingClientRect();
    let extraMargin = 5;

    let tooltipWidth = coordsTooltip.right - coordsTooltip.left;
    let tooltipHeight = (coordsTooltip.bottom - coordsTooltip.top) + extraMargin;
    let btnWidth = coordsBtn.right - coordsBtn.left ;
    let toolPosX = coordsBtn.left + (btnWidth - tooltipWidth) / 2;

    tooltip.style.left = (toolPosX >= 0 ? toolPosX : 0) + 'px';
    tooltip.style.top = (coordsBtn.top > tooltipHeight ? coordsBtn.top - tooltipHeight : coordsBtn.bottom + extraMargin) + 'px';
}
function removeTooltip(e) {
    let tooltip = document.getElementById('tooltip');

    if(!tooltip) return;

    document.body.removeChild(tooltip);
}