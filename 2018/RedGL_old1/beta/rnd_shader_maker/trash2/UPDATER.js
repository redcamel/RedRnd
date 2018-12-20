'use strict';
Recard.static('UPDATER', (function () {
    var result;
    result = {
        init: function () {
            Recard.LOOPER.del('UPDATER')
            Recard.LOOPER.add('UPDATER', function () {
                var svgList = Recard.INDEX.getLineList()
                var nodeList = Recard.queryAll('[nodeItem]')
                svgList.forEach(function (item) {
                    item.remove()
                })
                svgList.length = 0
                nodeList.forEach(function (item) {
                    for(var k in item['prev']){
                        var startItem, endItem
                        var starKeytItem, endKeyItem
                        var sL, sT
                        var eL, eT
                        var tPrevData
                        tPrevData = item['prev'][k]
                        // console.log('시작아이템정보',tPrevData)
                        if (tPrevData && (startItem = tPrevData['target'])) {
                            var startTargetKey
                            var endTargetKey
                            // 목표아이템을 찾고
                            endItem = startItem['next'][tPrevData['targetKey']]['target']
                            // 소스아이템의 목표키를 찾는다.
                            startTargetKey = startItem['next'][tPrevData['targetKey']]['targetKey']
                            endTargetKey = tPrevData['targetKey']
                  
                            // console.log(startTargetKey,endTargetKey)
                            // console.log(startItem,endItem)
                            starKeytItem = startItem.query('[key="' + startTargetKey + '"]')
                            endKeyItem = endItem.query('[key="' + endTargetKey + '"]')
                            // console.log(starKeytItem,endKeyItem)
                     
                            sL = startItem.S('left') + starKeytItem.__dom__.offsetLeft + starKeytItem.__dom__.clientWidth + 3
                            sT = startItem.S('top') + starKeytItem.__dom__.offsetTop + starKeytItem.__dom__.clientHeight / 2
                            eL = endItem.S('left') + endKeyItem.__dom__.offsetLeft - 3
                            eT = endItem.S('top') + endKeyItem.__dom__.offsetTop + endKeyItem.__dom__.clientHeight / 2
                            // console.log(
                            //     [
                            //         'M' + sL + ',' + sT,
                            //         'C' + (sL - eL) / 4 + ',' + (sT - eT) / 4,
                            //         (sL - eL) / 4 * 3 + ',' + (sT - eT) / 4 * 3,
                            //         eL + ',' + eT
                            //     ].join(' ')
                            // );
                            svgList.push(
                                Recard.Dom(document.createElementNS('http://www.w3.org/2000/svg', 'svg')).S(
                                    'position', 'absolute',
                                    'top', 0,
                                    'left', 0,
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
                                    'z-index', 0,
                                    '<', 'body'
                                )
                            )
                        }
                    }
                })

            })

        }
    }
    return result
})())