
'use strict';
var Structure_Node;
var shaderIndex = 0;
(function () {
    var W;
    var dragRootBox, dragStartX, dragStartY;
    var currentZIndex = 2
    var startPointRootBox, startItem, startItemKey, startItemType;
    var startDragX, startDragY
    var curveItem
    var drawTempCurve;
    var setPrevNext;
    var deletePrevData;
    drawTempCurve = function () {
        var sL, sT;
        var eL, eT;
        if (startItem) {
            sL = startDragX + Recard.WIN.scroll('x')
            sT = startDragY + Recard.WIN.scroll('y')
            eL = Recard.WIN.mouseX + Recard.WIN.scroll('x')
            eT = Recard.WIN.mouseY + Recard.WIN.scroll('y')
            if (curveItem) curveItem.remove(), curveItem = null
            curveItem = Recard.Dom(document.createElementNS('http://www.w3.org/2000/svg', 'svg')).S(
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
                '<', Recard.Dom('#nodeBox')
            )


        }
    }
    deletePrevData = function (tEnd) {
        if (tEnd['prev'] && tEnd['prev']['target']) {
            delete tEnd['prev']['target']['next'][tEnd['__uuid__']]
        }
        if (tEnd['prev'] && tEnd['prev']['rootBox']) tEnd['prev']['rootBox'].makeCode()
        tEnd['prev'] = null
    }
    setPrevNext = (function () {
        var tStart, tEnd
        var tEndUUID, tStartUUID;
        return function (targetItem, targetRootBox, key, endItemtype) {
            if (startItemType == 'outputItem') {
                console.log('시작이 아웃풋인놈')
                if (endItemtype != 'inputItem') return
                else tStart = startItem, tEnd = targetItem
            }
            /////////////////////////////////////////////////////////////
            // 타입체크를 해야함
            var tSDataType, tEDataType
            if (!tStart) return
            tSDataType = tStart.S('@dataType')
            tEDataType = tEnd.S('@dataType')
            console.log(tSDataType, tEDataType)
            // 단순 상호간 체크
            if (tEDataType == null) { }
            else if (tSDataType != tEDataType) {
                return console.log('타입이 다릅니다.')
            }

            /////////////////////////////////////////////////////////////
            tStartUUID = tStart['__uuid__']
            tEndUUID = tEnd['__uuid__']
            //
            if (!tStart['next']) tStart['next'] = {}
            if (!tStart['next'][tEndUUID]) tStart['next'][tEndUUID] = {}
            if (!tEnd['prev']) tEnd['prev'] = {}
            if (!tEnd['prev'][tStartUUID]) tEnd['prev'][tStartUUID] = {}

            tEnd.parent().query('[dataTypeBox]').S('html', ' ' + tSDataType)
            //
            switch (targetRootBox.S('@nodeType')) {
                case 'add':
                    console.log('NodeType Add')
                    var tList;
                    tList = targetRootBox.queryAll('.inputItem [dataTypeBox]')
                    if (tList[0].S('text') == '' || tList[1].S('text') == '') { }
                    else if (tList[0].S('text') != tList[1].S('text')) {
                        tEnd.parent().query('[dataTypeBox]').S('html', '')
                        return console.log('타입이 일치하지않습니다.')
                    }
                    if (tList[0].S('text') == tList[1].S('text')) {
                        targetRootBox.query('.outputItem [dataTypeBox]').S('text', tList[0].S('text') + ' ')
                    }
                    break
                case 'Mul':
                    console.log('NodeType Mul')
                    break
                case 'Texture':
                    console.log('NodeType Texture')
                    break
                case 'Result':
                    console.log('NodeType Texture')
                    break
                default:
                    return
            }
            // 기존에 있는놈삭제
            deletePrevData(tEnd)
            tStart['next'][tEndUUID] = {
                target: tEnd,
                rootBox: targetRootBox,
                targetKey: key
            }
            tEnd['prev'] = {
                target: tStart,
                rootBox: startPointRootBox,
                targetKey: startItemKey
            }
            startPointRootBox.makeCode()
            if (targetRootBox.S('@nodeType') == 'Result') {
                lastCompiler()
            } else targetRootBox.makeCode()
            tEnd.parent().query('[deleteBox]').S('display', 'block')
            console.log(tStart, tEnd)
        }
    })()
    Structure_Node = function (info) {
        var rootBox;
        var inputBox;
        var outputBox;
        rootBox = Recard.Dom('div').S(
            '@nodeItem', '',
            '@nodeType', info['nodeType'],
            'position', 'absolute',
            'z-index', currentZIndex++,
            'top', Recard.WIN.h / 2, 'left', Recard.WIN.w / 2,
            'transform', 'translate(-50%,-50%)',
            'min-width', info['structure']['title'] =='Result' ? 400 : 250, 'min-height', 100,
            'background', 'rgba(29,28,36,0.8)',
            'box-shadow', '0px 0px 10px 5px rgba(0,0,0,0.2)',
            'border-radius', 10,
            '>', Recard.Dom('div').S(
                'position', 'relative',
                'height', 30,
                'border-top-left-radius', 8,
                'border-top-right-radius', 8,
                'background', '#272530',
                'line-height', 30,
                'padding-left', 10,
                'html', info['structure']['title'] ? info['structure']['title'] : (info['nodeType'] + ' Instance'),
                'cursor', 'pointer',
                'on', ['down', function (e) {
                    dragRootBox = rootBox
                    dragStartX = e.nativeEvent.offsetX
                    dragStartY = e.nativeEvent.offsetY
                    rootBox.S('z-index', currentZIndex++)
                }],
                '>', Recard.Dom('button').S(
                    'display', info['nodeType'] == 'Result' ? 'none' : 'block',
                    'float', 'right',
                    'margin-right', 5,
                    'height', 30,
                    'background', 'transparent',
                    'border', 0,
                    'color', '#fff',
                    'font-size', 11,
                    'cursor', 'pointer',
                    'html', 'X',
                    'on', ['down', function () {
                        rootBox.queryAll('[outputItem]').forEach(function (item, index) {
                            if (item['next']) {
                                for (var k in item['next']) {
                                    delete item['next'][k]
                                }
                            }
                        })
                        rootBox.queryAll('[inputItem]').forEach(function (item, index) {
                            if (item['prev']) {
                                var tTarget = item['prev']['target']
                                console.log(tTarget)
                                for (var k in tTarget['next']) {
                                    if (tTarget['next'][k]['rootBox'] == rootBox || !rootBox.parent()) delete tTarget['next'][k]
                                }
                            }
                        })
                        rootBox.remove()
                    }]
                )
            ),
            '>', inputBox = Recard.Dom('div').S('@className', 'inOutputBox', 'float', 'left'),
            '>', outputBox = Recard.Dom('div').S('@className', 'inOutputBox', 'float', 'right'),
            '>', Recard.Dom('div').S('clear', 'both'),
            '>', Recard.Dom('pre').S(
                '@id', 'style-1',
                'max-width', 400,
                'max-height', 200,
                'overflow', 'auto',
                'margin',0,
                'background','transparent',
                '>', Recard.Dom('code').S(
                    '@codeBox', '',
                    '@className','language-javascript',
                    'background', 'rgba(0,0,0,0.1)',
                    'padding', 10
                )
            )
        )
        for (var k in info['structure']['input']) {
            Recard.Dom('div').S(
                '@className', 'inputItem',
                'white-space', 'noWrap',
                '>', Recard.Dom('span').S('html', k, ),
                '>', Recard.Dom('span').S('color', '#888', 'html', ' ' + info['structure']['input'][k]),
                '>', Recard.Dom('span').S('@dataTypeBox', '', 'color', '#1ed5e9'),
                '>', Recard.Dom('div').S(
                    '@deleteBox', '',
                    'display', 'none',
                    'position', 'absolute',
                    'top', '50%', 'left', -10,
                    'background', '#5b52aa',
                    'font-size', 11,
                    'line-height', 11,
                    'color', '#fff',
                    'padding', '2px 5px 3px 5px',
                    'transform', 'translate(-100%,-50%)',
                    'html', 'delete',
                    'cursor', 'pointer',
                    'on', ['over', function () { this.S('background', 'red') }],
                    'on', ['out', function () { this.S('background', '#5b52aa') }],
                    'on', ['down', function () {
                        var tEnd = this.parent().query('[inputItem]')
                        deletePrevData(tEnd)
                        this.S('display', 'none')
                        tEnd.parent().query('[dataTypeBox]').S('html', '')
                        lastCompiler()
                    }]
                ),
                '>', Recard.Dom('div').S(
                    '@inputItem', '',
                    '@dataType', info['structure']['input'][k],
                    '@key', k,
                    'position', 'absolute',
                    'top', '50%', 'left', 0,
                    'width', 10, 'height', 10,
                    'transform', 'translate(-50%,-50%)',
                    'background', '#666',
                    'border-radius', '50%',
                    'cursor', 'pointer',
                    'on', ['over', function () { this.S('background', 'red') }],
                    'on', ['out', function () { this.S('background', '#666') }],
                    'on', ['up', function () {
                        setPrevNext(
                            this, //targetItem
                            rootBox, //targetRootBox
                            this.S('@key'), //key
                            this.parent().S('@className') //endItemtype
                        )
                    }]
                ),
                '<', inputBox
            )
        }
        for (var k in info['structure']['output']) {
            Recard.Dom('div').S(
                '@className', 'outputItem',
                'white-space', 'noWrap',
                '>', Recard.Dom('span').S('@dataTypeBox', '', 'color', '#888', 'html', info['structure']['output'][k] + ' '),
                '>', Recard.Dom('span').S('html', k, ),
                '>', Recard.Dom('div').S(
                    '@outputItem', '',
                    '@key', k,
                    '@dataType', info['structure']['output'][k],
                    'position', 'absolute',
                    'top', '50%', 'right', 0,
                    'width', 10, 'height', 10,
                    'transform', 'translate(50%,-50%)',
                    'background', '#fff',
                    'border-radius', '50%',
                    'cursor', 'pointer',
                    'on', ['over', function () { this.S('background', 'red') }],
                    'on', ['out', function () { this.S('background', '#fff') }],
                    'on', ['down', function () {
                        startPointRootBox = rootBox
                        startItem = this
                        startItemKey = this.S('@key')
                        startItemType = this.parent().S('@className')
                        startDragX = Recard.WIN.mouseX
                        startDragY = Recard.WIN.mouseY
                    }]
                ),
                '<', outputBox
            )
        }
        ////////////////////////////////////////////////////////
        rootBox['info'] = info
        rootBox['compileInfo'] = null
        rootBox['lastCompileInfo'] = null
        rootBox['makeCode'] = function () {
            dataMaker.call(this)
            shaderParser.call(this)
        }
        ////////////////////////////////////////////////////////
        info['structure']['title'] =='Result' ? '' : rootBox.makeCode()
        setTimeout(function(){
            Prism.highlightAll()
        },1)
        return rootBox
    }
    Object.freeze(Structure_Node)


    // 드래그/라인처리 관련 이벤트 처리
    Recard.EVENT_EMITTER.on(window, 'mousemove', function (e) {
        if (dragRootBox) {
            dragRootBox.S(
                'top', Recard.WIN.mouseY - dragStartY + dragRootBox.__dom__.clientHeight / 2 + Recard.WIN.scroll('y'),
                'left', Recard.WIN.mouseX - dragStartX + dragRootBox.__dom__.clientWidth / 2 + Recard.WIN.scroll('x')
            )
        }
        if (startItem) drawTempCurve()
    })
    Recard.EVENT_EMITTER.on(window, 'mouseup', function (e) {
        dragRootBox = null
        console.log('dhsi')

        if (curveItem) {
            setTimeout(function () {
                startItem = null
            }, 1)
            curveItem.remove(), curveItem = null
        }
    })
})();
