
'use strict';
Recard.static('PROPERTY_BOX', (function () {
    var result;
    var rootBox;
    var makeRange;
    makeRange = function (nodeBox, key, userDefineInfo) {
        console.log('슬라이더 탕입이당~', userDefineInfo)
        var t0;
        t0 = Recard.Dom('div').S('padding', 10)
        for (var k in userDefineInfo['data']) {
            (function () {
                var tKey;
                var valueBox;
                tKey = k
                userDefineInfo['data'][tKey] = userDefineInfo['dataType'] == 'int'
                    ? parseInt(userDefineInfo['data'][tKey])
                    : parseFloat(userDefineInfo['data'][tKey]).toFixed(5)
                Recard.Dom('label').S(
                    'position', 'relative',
                    'display', 'block',
                    '>', Recard.Dom('div').S(
                        'display', 'inline-block',
                        'width', '20%',
                        'text-align', 'center',
                        'html', tKey,
                    ),
                    '>', Recard.Dom('input').S(
                        'vertical-align', 'middle',
                        'width', '60%',
                        '@type', 'range',
                        '@step', userDefineInfo['step'],
                        '@min', userDefineInfo['min'],
                        '@max', userDefineInfo['max'],
                        '@value', userDefineInfo['data'][tKey],
                        'on', ['change', function () {
                            userDefineInfo['data'][tKey] = +this.S('@value')
                            userDefineInfo['data'][tKey] = userDefineInfo['dataType'] == 'int'
                            ? parseInt(userDefineInfo['data'][tKey])
                            : parseFloat(userDefineInfo['data'][tKey]).toFixed(5)
                            valueBox.S(
                                'html', userDefineInfo['data'][tKey]
                            )
                            console.log(userDefineInfo)
                            userDefineInfo['parser']()
                            nodeBox.parseDefine()
                        }]
                    ),
                    '>', valueBox = Recard.Dom('div').S(
                        'display', 'inline-block',
                        'width', '10%',
                        'text-align', 'center',
                        'html', userDefineInfo['data'][k],
                    ),
                    '<', t0
                )
            })()
        }
        rootBox.S('>', t0)
    }
    result = {
        init: function () {
            rootBox = Recard.Dom('div').S(
                '@className', 'style-1',
                'position', 'fixed',
                'left', 0,
                'top', 400,
                'width', 400,
                'overflow', 'auto',
                'background', '#222',
                'border-top-left-radius', 10,
                '<', 'body'
            )
        },
        makePanel: function (nodeBox) {
            console.log('nodeBox', nodeBox)
            rootBox.S(
                'html', '',
                '>', Recard.Dom('div').S(
                    'padding', 10,
                    'html', nodeBox.query('[titleBox]').S('text')
                )
            )
            var tUserDefineInfo;
            tUserDefineInfo = nodeBox['structureInfo']['userDefineInfo']
            console.log('tUserDefineInfo', tUserDefineInfo)
            for (var k in tUserDefineInfo) {
                var tData;
                tData = tUserDefineInfo[k]
                switch (tData['type']) {
                    case 'range':
                        makeRange(nodeBox, k, tData)
                        break
                }
            }
        }
    }

    return result
})())