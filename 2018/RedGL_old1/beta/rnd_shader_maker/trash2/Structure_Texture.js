
'use strict';
var Structure_Texture;
// 텍스쳐 기본정보
(function () {
    var W;
    var dragTargetContainer;
    var dragStartX, dragStartY
    var currentZIndex = 2
    var instanceID = 0
    var tempRootItem, tempItemKey, tempItemType;
    var tempCurveItem
    var tempDragStartX, tempDragStartY
    var drawTempCurve;
    var prevNextInfo;
    W = 150
    drawTempCurve = function () {
        var startItem;
        var starKeytItem, endKeyItem;
        var sL, sT;
        var eL, eT;
        if (tempRootItem) {
            sL = tempDragStartX
            sT = tempDragStartY
            eL = Recard.WIN.mouseX
            eT = Recard.WIN.mouseY
            if (tempCurveItem) tempCurveItem.remove(), tempCurveItem = null
            tempCurveItem = Recard.Dom(document.createElementNS('http://www.w3.org/2000/svg', 'svg')).S(
                'position', 'absolute',
                'top', 0,
                'left', 0,
                'z-index', 0,
                '@viewBox', [
                    0, 0,
                    Recard.WIN.w,
                    Recard.WIN.h
                ].join(','),
                '>', Recard.Dom(document.createElementNS('http://www.w3.org/2000/svg', 'path')).S(
                    '@fill', 'none',
                    '@stroke', 'red',
                    '@stroke-linecap', 'round',
                    '@stroke-width', 4,
                    '@d', [
                        'M' + sL + ',' + sT,
                        'C' + sL + ',' + (sT),
                        sL + ',' + (eT),
                        ///
                        eL + ',' + eT
                    ].join(' ')
                ),
                '<', 'body'
            )

        }
    }
    prevNextInfo = function (targetRootItem, key, type) {
        var startInfo, endInfo
        if (tempItemType == 'inputItem') {
            console.log('시작이 인풋인놈')
            if (type != 'outputItem') return
            else {
                startInfo = targetRootItem
                endInfo = tempItemType
            }
        }
        if (tempItemType == 'outputItem') {
            console.log('시작이 아웃풋인놈')
            if (type != 'inputItem') return
            else {
                startInfo = tempRootItem
                endInfo = targetRootItem
            }
        }

        if (startInfo) {
            startInfo['next'][key] = {
                target: targetRootItem,
                targetKey: tempItemKey
            }
            endInfo['prev'][tempItemKey] = {
                target: tempRootItem,
                targetKey: key
            }
            console.log(startInfo, endInfo)
        }
    }
    Structure_Texture = function (tInfo) {
        var rootBox;
        var inputBox;
        var outputBox;
        var info;
        ////////////////////////////////////////////////////////
        info = tInfo

        ////////////////////////////////////////////////////////
        instanceID++
        rootBox = Recard.Dom('div').S(
            '@nodeItem', '',
            'position', 'absolute',
            'z-index', 1,
            'left', Recard.WIN.w / 2 - W / 2,
            'top', Recard.WIN.h / 2,
            'width', W,
            'min-height', 100,
            'background', 'rgba(29,28,36,0.8)',
            'box-shadow', '0px 0px 10px 10px rgba(0,0,0,0.1)',
            'border-radius', 10,
            '>', Recard.Dom('div').S(
                'border-top-left-radius', 8,
                'background', '#272530',
                'height', 30,
                'line-height', 30,
                'padding-left', 10,
                'html', info['title'] ? info['title'] : 'Texture Instance' + instanceID,
                'cursor', 'pointer',
                'on', ['down', function (e) {
                    dragTargetContainer = rootBox
                    dragStartX = e.nativeEvent.offsetX
                    dragStartY = e.nativeEvent.offsetY
                    rootBox.S('z-index', currentZIndex++)
                }]
            ),
            '>', inputBox = Recard.Dom('div').S(
                'float', 'left',
                'display', 'inline-block',
                'width', '50%',
            ),
            '>', outputBox = Recard.Dom('div').S(
                'float', 'right',
                'display', 'inline-block',
                'width', '50%'
            )
        )
        for (var k in info['structure']['input']) {
            Recard.Dom('div').S(
                '@className', 'inputItem',
                '@key', k,
                'html', k,
                '>', Recard.Dom('div').S(
                    '@point', '',
                    'position', 'absolute',
                    'top', '50%',
                    'left', 0,
                    'width', 10,
                    'height', 10,
                    'transform', 'translate(-50%,-50%)',
                    'background', '#666',
                    'border-radius', '50%',
                    'cursor', 'pointer',
                    'on', ['over', function () {
                        this.S('background', 'red')
                    }],
                    'on', ['out', function () {
                        this.S('background', '#666')
                    }],
                    'on', ['up', function () {
                        console.log('오냐?')
                        prevNextInfo(rootBox, this.parent().S('@key'), this.parent().S('@className'))
                    }]
                ),
                '<', inputBox
            )
        }
        for (var k in info['structure']['output']) {
            Recard.Dom('div').S(
                '@className', 'outputItem',
                '@key', k,
                'html', k,
                '>', Recard.Dom('div').S(
                    '@point', '',
                    'position', 'absolute',
                    'top', '50%',
                    'right', 0,
                    'width', 10,
                    'height', 10,
                    'transform', 'translate(50%,-50%)',
                    'background', '#fff',
                    'border-radius', '50%',
                    'cursor', 'pointer',
                    'on', ['over', function () {
                        this.S('background', 'red')
                    }],
                    'on', ['out', function () {
                        this.S('background', '#fff')
                    }],
                    'on', ['down', function () {
                        console.log({
                            target: rootBox,
                            key: this.parent().S('@key')
                        })
                        tempRootItem = rootBox
                        tempItemKey = this.parent().S('@key')
                        tempItemType = this.parent().S('@className')
                        tempDragStartX = Recard.WIN.mouseX
                        tempDragStartY = Recard.WIN.mouseY
                    }],
                    'on', ['up', function () {
                        console.log('오냐?')
                        prevNextInfo(rootBox, this.parent().S('@key'), this.parent().S('@className'))
                    }]
                ),
                '<', outputBox
            )
        }
        ////////////////////////////////////////////////////////
        rootBox['info'] = info
        rootBox['next'] = {}
        rootBox['prev'] = {}
        ////////////////////////////////////////////////////////

        return rootBox
    }
    Object.freeze(Structure_Texture)
    Recard.EVENT_EMITTER.on(window, 'mousemove', function (e) {
        if (dragTargetContainer) {
            dragTargetContainer.S(
                'top', Recard.WIN.mouseY - dragStartY,
                'left', Recard.WIN.mouseX - dragStartX
            )
        }
        if (tempRootItem) drawTempCurve()
    })
    Recard.EVENT_EMITTER.on(window, 'mouseup', function (e) {
        dragTargetContainer = null

        if (tempCurveItem) {
            setTimeout(function () {
                tempRootItem = null
            }, 1)
            tempCurveItem.remove(), tempCurveItem = null
        }
    })
})();
