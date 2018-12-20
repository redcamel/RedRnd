'use strict';
var InputItem;
(function () {
    InputItem = function (key, info) {
        if (!(this instanceof InputItem)) return new InputItem(key, info)
        var rootBox;
        var fromBox, dataTypeBox, pointBox, deleteBox, shaderTypeBox;
        var update;
        var deleteFromData;
        var getPanel, getPanelTitle;
        getPanel = function () { return rootBox.parent().parent() }
        getPanelTitle = function () { return rootBox.parent().parent().query('[titleBox]').S('text') }
        update = function () {
            var tFrom;
            fromBox.S('html', '')
            pointBox.S('background', '#666')
            deleteBox.S('display', 'none')
            tFrom = info['from']
            if (tFrom) {
                var tStr;
                tStr = [tFrom.getPanelTitle()]
                tStr.push(tFrom.S('@dataType') + ' ' + tFrom.S('@key'))
                fromBox.S('html', 'from - ' + tStr.join(' '))
                pointBox.S('background', 'rgb(242, 169, 113)')
                deleteBox.S('display', 'block')
            }
            dataTypeBox.S('html', info['dataType'] ? info['dataType'] : 'null')
            shaderTypeBox.S('html', info['shaderType'] ? info['shaderType'] : '')
            getPanel()['parseDefine']()
            Recard.LINE_MANAGER.render()
        }
        deleteFromData = function () {
            var tFrom, tFromToInfo;
            var tRoot;
            tFrom = info['from']
            if (tFrom) {
                tFromToInfo = tFrom['info']['to']
                tRoot = getPanelTitle()
                console.log('deleteFromData', tFromToInfo[tRoot][key])
                delete tFromToInfo[tRoot][key]
                tFrom.update()
                delete info['from']
                update()
            }
        }
        rootBox = Recard.Dom('div').S(
            '@inputItem', '',
            '@key', key,
            '@dataType', info['dataType'],
            'position', 'relative',
            'line-height', 20,
            'white-space', 'noWrap',
            '>', pointBox = Recard.Dom('button').S(
                'position', 'absolute',
                'top', 5, 'left', 0,
                'width', 15, 'height', 15,
                'transform', 'translate(-50%, 0%)',
                'border-radius', '50%',
                'background', '#666',
                'on', ['up', function () {
                    var tTempOutputItem;
                    tTempOutputItem = Recard.LINE_MANAGER.getTempOutputItem()
                    if (tTempOutputItem) {
                        if (tTempOutputItem.query('[shaderTypeBox]').S('text') == rootBox.query('[shaderTypeBox]').S('text')) {
                            // 계산아이템
                            if (key.indexOf('INPUT') > -1) {
                                // 계산아이템
                                if (info['from']) info['from'].delTo(rootBox)
                                info['from'] = tTempOutputItem
                                info['dataType'] = tTempOutputItem.S('@dataType')
                                if (getPanel().S('@calcItemYn') == 'true') {
                                    getPanel()['structureInfo']['structureBase']['output']['OUTPUT']['dataType'] = info['dataType']
                                    getPanel().query('[key="OUTPUT"]').S('@dataType', info['dataType'])
                                    getPanel().query('[key="OUTPUT"] span').S('html', info['dataType'])
                                }
                                update()
                                tTempOutputItem.addTo(rootBox)
                            }
                            // 일반아이템
                            else if (tTempOutputItem.S('@dataType') == info['dataType']) {
                                if (info['from']) info['from'].delTo(rootBox)
                                info['from'] = tTempOutputItem
                                tTempOutputItem.addTo(rootBox)
                                update()
                            }
                            else console.log('같은 데이터 형식만 지정할 수 있습니다. ')
                        }else {
                            console.log('같은 쉐이더 종류만 지정할 수 있습니다.')
                        }
                    }
                }]
            ),
            '>', deleteBox = Recard.Dom('div').S(
                '@deleteBox', '',
                'display', 'none',
                'position', 'absolute',
                'top', 5, 'left', -15,
                'background', '#5b52aa',
                'font-size', 11,
                'line-height', 11,
                'color', '#fff',
                'padding', '2px 5px 3px 5px',
                'transform', 'translate(-100%,0%)',
                'html', 'delete',
                'cursor', 'pointer',
                'on', ['over', function () { this.S('background', 'red') }],
                'on', ['out', function () { this.S('background', '#5b52aa') }],
                'on', ['down', function () {
                    deleteFromData()
                }]
            ),
            '>', Recard.Dom('span').S(
                'margin-left', 15,
                'html', key
            ),
            '>', dataTypeBox = Recard.Dom('span').S(
                'margin-left', 5,
                'color', 'rgb(242, 169, 113)'
            ),
            '>', shaderTypeBox = Recard.Dom('div').S(
                '@shaderTypeBox','',
                'display','inline-block',
                'margin-left', 5,
                'color', 'rgb(0, 200, 200)'
            ),
            '>', fromBox = Recard.Dom('div').S(
                '@fromBox', '',
                'margin-left', 15,
                'font-size', 11,
                'white-space', 'noWrap',
                'color', '#666'
            )
        )

        rootBox['info'] = info
        rootBox['update'] = update
        rootBox['getPanel'] = getPanel
        rootBox['getPanelTitle'] = getPanelTitle
        rootBox['deleteFromData'] = deleteFromData
        requestAnimationFrame(rootBox['update'])
        return rootBox
    }
})()