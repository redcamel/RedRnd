'use strict';
var OutputItem;
(function () {
    OutputItem = function (key, info) {
        if (!(this instanceof OutputItem)) return new OutputItem(key, info)
        var rootBox, toBox, pointBox;
        var toInfo, update;
        var getPanel, getPanelTitle;
        getPanel = function () { return rootBox.parent().parent() }
        getPanelTitle = function () { return rootBox.parent().parent().query('[titleBox]').S('text') }
        update = function () {
            toBox.S('html', '')
            pointBox.S('background', '#666')
            var toList
            var tToStrList;
            var k, k2
            var tInput
            toList = []
            for (k in toInfo) {
                tInput = toInfo[k]
                for (k2 in tInput) {
                    tToStrList = []
                    tInput[k2].queryAll('span').forEach(function (v) {
                        tToStrList.push(v.S('text'))
                    })
                    if (tToStrList.length) {
                        tToStrList.reverse()
                        tToStrList.push(tInput[k2].getPanelTitle())
                        tToStrList.reverse()
                        toList.push('<span>to - ' + tToStrList.join(' ') + '</span>')
                    }

                }
            }
            if (toList.length) {
                pointBox.S('background', 'rgb(242, 169, 113)')
                toBox.S('html', toList.join('<br>'))
            }
            getPanel()['parseDefine']()
            Recard.LINE_MANAGER.render()
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
                'top', 5, 'right', 0,
                'width', 15, 'height', 15,
                'transform', 'translate(50%, 0%)',
                'border-radius', '50%',
                'background', '#666',
                'on', ['down', function () {
                    Recard.LINE_MANAGER.setTempCurve(rootBox)
                    Recard.LINE_MANAGER.setNeedRender(true)
                    Recard.EVENT_EMITTER.on(window, 'mouseup', function () {
                        Recard.EVENT_EMITTER.off(window, 'mouseup')
                        requestAnimationFrame(function(){
                            Recard.LINE_MANAGER.setNeedRender(false)
                            Recard.LINE_MANAGER.removeTempCurve()
                        })
                        
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
                '@toBox', '',
                'margin-right', 15,
                'font-size', 11,
                'white-space', 'noWrap',
                'color', '#666'
            )
        )
        rootBox['info'] = info
        rootBox['update'] = update
        rootBox['getPanel'] = getPanel
        rootBox['getPanelTitle'] = getPanelTitle
        rootBox['delTo'] = function (inputItem) {
            // console.log('delTo', inputItem)
            var tKey;
            tKey = inputItem.getPanelTitle()
            if (!toInfo[tKey]) toInfo[tKey] = {}
            inputItem.query('[fromBox]').S('html', '')
            delete toInfo[tKey][inputItem.S('@key')]
            update()
        }
        rootBox['addTo'] = function (inputItem) {
            // console.log('addTo',inputItem)
            var tKey;
            tKey = inputItem.getPanelTitle()
            if (!toInfo[tKey]) toInfo[tKey] = {}
            toInfo[tKey][inputItem.S('@key')] = inputItem
            update()
        }
        requestAnimationFrame(rootBox['update'])
        return rootBox
    }
})()