'use strict';
Recard.static('LINE_MANAGER', (function () {
    var result;
    var drawTempCurve;
    var tempCurve_StartItem, tempCurve_Line;
    var tempCurve_StartDragX, tempCurve_StartDragY
    var svgList;
    svgList = []
    drawTempCurve = function () {
        var sL, sT;
        var eL, eT;
        var gridRootBox;
        if (tempCurve_Line) tempCurve_Line.remove(), tempCurve_Line = null
        if (tempCurve_StartItem) {
            gridRootBox = Recard.RED_SHADER_GRID.getRootBox()
            sL = tempCurve_StartDragX + gridRootBox.__dom__.scrollLeft
            sT = tempCurve_StartDragY + gridRootBox.__dom__.scrollTop
            eL = Recard.WIN.mouseX + gridRootBox.__dom__.scrollLeft - gridRootBox.S('left')
            eT = Recard.WIN.mouseY + gridRootBox.__dom__.scrollTop
            // console.log(
            //     'M' + sL + ',' + sT,
            //     'C' + sL + ',' + (sT),
            //     sL + ',' + (eT),
            //     eL + ',' + eT
            // )
            tempCurve_Line = Recard.Dom(document.createElementNS('http://www.w3.org/2000/svg', 'svg')).S(
                'position', 'absolute',
                'top', 0, 'left', 0,
                'z-index', 0,
                '@viewBox', [0, 0, 20000, 20000].join(','),
                '>', Recard.Dom(document.createElementNS('http://www.w3.org/2000/svg', 'path')).S(
                    '@fill', 'none',
                    '@stroke', 'red',
                    '@stroke-linecap', 'round',
                    '@stroke-width', 2,
                    '@d', [
                        'M' + sL + ',' + sT,
                        'C' + sL + ',' + (sT),
                        sL + ',' + (eT),
                        eL + ',' + eT
                    ].join(' ')
                ),
                '<', Recard.RED_SHADER_GRID.getContentBox()
            )
        }
    }
    result = {
        setTempCurve: function (startItem) {
            tempCurve_StartItem = startItem
            tempCurve_StartDragX = Recard.WIN.mouseX - Recard.RED_SHADER_GRID.getRootBox().S('left')
            tempCurve_StartDragY = Recard.WIN.mouseY
        },
        removeTempCurve: function () {
            tempCurve_StartItem = null
        },
        getTempOutputItem: function () {
            return tempCurve_StartItem
        },
        init: function () {
            svgList = []
            Recard.LOOPER.add('LINE_MANAGER', function () {
                svgList.forEach(function (v) {
                    v.remove()
                })
                svgList.length = 0
                Recard.queryAll('[inputItem]').forEach(function (v) {
                    if (v['info']['from']) {
                        var sL, sT
                        var eL, eT
                        var gridRootBox
                        var startItem, endItem
                        var startRoot, endRoot
                        var tCurve
                        startItem = v['info']['from']
                        endItem = v
                        startRoot = startItem.parent().parent()
                        endRoot = endItem.parent().parent()
                        gridRootBox = Recard.RED_SHADER_GRID.getRootBox()
                        sL = startRoot.S('left')  + startRoot.__dom__.clientWidth / 2
                        sT = startRoot.S('top') - startRoot.__dom__.clientHeight / 2 + startItem.__dom__.offsetTop + 12
                        eL = endRoot.S('left') - endRoot.__dom__.clientWidth / 2
                        eT = endRoot.S('top') - endRoot.__dom__.clientHeight / 2 + endItem.__dom__.offsetTop + 12
                        // console.log(
                        //     'M' + sL + ',' + sT,
                        //     'C' + sL + ',' + (sT),
                        //     sL + ',' + (eT),
                        //     eL + ',' + eT
                        // )
                        tCurve = Recard.Dom(document.createElementNS('http://www.w3.org/2000/svg', 'svg')).S(
                            'position', 'absolute',
                            'top', 0, 'left', 0,
                            'z-index', 0,
                            '@viewBox', [0, 0, 20000, 20000].join(','),
                            '>', Recard.Dom(document.createElementNS('http://www.w3.org/2000/svg', 'path')).S(
                                '@fill', 'none',
                                '@stroke', 'rgb(174, 226, 57)',
                                '@stroke-linecap', 'round',
                                '@stroke-width', 2,
                                '@d', [
                                    'M' + sL + ',' + sT,
                                    'C' + sL + ',' + (sT),
                                    sL + ',' + (eT),
                                    eL + ',' + eT
                                ].join(' ')
                            ),
                            '<', Recard.RED_SHADER_GRID.getContentBox()
                        )
                        svgList.push(tCurve)
                    }
                })
                drawTempCurve()
            })
        }
    }

    return result
})())