'use strict';
var OutputItem;
(function () {
    OutputItem = function (key, info) {
        if (!(this instanceof OutputItem)) return new OutputItem(key, info)
        var rootBox,toBox;
        var pointBox;
        var toInfo;
        var update;
        update = function () {
            toBox.S('html', '')
            pointBox.S('background', '#666')
            if (toInfo) {
                var tStrs
                var tStr;
                var k
                var tNode
                tStrs = []
                console.log(toInfo)
                for (k in toInfo) {
                    tNode = toInfo[k]
                    for (var k2 in tNode) {
                        tStr = []
                        tNode[k2].queryAll('span').forEach(function (v) {
                            tStr.push(v.S('text'))
                        })
                        if(tStr.length){
                            tStr.reverse()
                            tStr.push(tNode[k2].parent().parent().query('[titleBox]').S('text'))
                            tStr.reverse()
                            tStrs.push('<span>to - ' + tStr.join(' ')+'</span>')
                        }
                        
                    }
                }
                console.log(toInfo)
                console.log(tStrs)
                if (tStrs.length) {
                    pointBox.S('background', 'rgb(242, 169, 113)')
                    toBox.S('html', tStrs.join('<br>'))
                }
            }
            rootBox.parent().parent()['parseDefine']()
        }
        toInfo = info['to']
        console.log('toInfo', toInfo)
        rootBox = Recard.Dom('div').S(
            '@outputItem', '',
            '@key', key,
            '@dataType', info['dataType'],
            'position', 'relative',
            'text-align', 'right',
            'line-height', 20,
            '>', pointBox = Recard.Dom('button').S(
                'position', 'absolute',
                'top', 5,
                'right', 0,
                'width', 15,
                'height', 15,
                'transform', 'translate(50%, 0%)',
                'border-radius', '50%',
                'background', '#666',
                'on', ['down', function () {
                    Recard.LINE_MANAGER.setTempCurve(rootBox)
                    Recard.EVENT_EMITTER.on(window, 'mouseup', function () {
                        Recard.EVENT_EMITTER.off(window, 'mouseup')
                        setTimeout(function () {
                            Recard.LINE_MANAGER.removeTempCurve()
                        }, 1)
                    })
                }]
            ),
            '>', Recard.Dom('span').S(
                'margin-right', 5,
                'color', 'rgb(242, 169, 113)',
                'html', info['dataType'] ? info['dataType'] : 'null'
            ),
            '>', Recard.Dom('span').S(
                'margin-right', 15,
                'html', key
            ),
            '>', toBox = Recard.Dom('div').S(
                '@toBox','',
                'margin-right', 15,
                'font-size', 11,
                'white-space', 'noWrap',
                'color', '#666'
            )
        )
        rootBox['info'] = info
        rootBox['update'] = update
        requestAnimationFrame(rootBox['update'])
        rootBox['delTo'] = function (inputItem) {
            console.log('기존꺼있으면삭제',inputItem)
            var tKey;
            tKey = inputItem.parent().parent().query('[titleBox]').S('text')
            if (!toInfo[tKey]) toInfo[tKey] = {}
            inputItem.query('[fromBox]').S('html','')
            delete toInfo[tKey][inputItem.S('@key')]
            update()
        }
        rootBox['addTo'] = function (inputItem) {
            console.log('새로추가삭제')
            var tKey;
            tKey = inputItem.parent().parent().query('[titleBox]').S('text')
            if (!toInfo[tKey]) toInfo[tKey] = {}
            
            toInfo[tKey][inputItem.S('@key')] = inputItem
            update()
            console.log(toInfo)
        }
        return rootBox
    }
})()