'use strict';
Recard.static('UPDATER', (function () {
    var result;
    var svgList = []
    var svgRootBox;
    var locationBox;
    result = {
        init: function () {
            svgRootBox = Recard.Dom(document.createElementNS('http://www.w3.org/2000/svg', 'svg')).S(
                'position', 'absolute',
                'top', 0,
                'left', 0,
                '@viewBox', [
                    0, 0,
                    20000,
                    20000
                ].join(','),
                'z-index', 0,
                '<', Recard.Dom('#nodeBox')
            )
           
            Recard.LOOPER.del('UPDATER')
            Recard.LOOPER.add('UPDATER', function () {
                var nodeList = Recard.queryAll('[outputItem]')
                // console.log('//////////')
                svgList.forEach(function (item) {
                    // console.log(item)
                    item.remove()
                })
                svgList.length = 0
                nodeList.forEach(function (item) {
                    var endItem
                    var startItem
                    var sL, sT
                    var eL, eT
                    var tNextData
                 
                    for (var k in item['next']) {
                        tNextData = item['next'][k]
                        // console.log('시작아이템정보',tPrevData)
                        if (tNextData && (endItem = tNextData['target'])) {
                            //    console.log('오긴하냐')

                            var startTargetKey
                            var endTargetKey
                            // 목표아이템을 찾고
                            startItem = endItem['prev']['target']

                            // 소스아이템의 목표키를 찾는다.
                            startTargetKey = endItem['prev']['targetKey']
                            endTargetKey = tNextData['targetKey']

                            // console.log(startTargetKey,endTargetKey)
                            // console.log(startItem,endItem)
                            var startItem2 = startItem.parent()
                            var endItem2 = endItem.parent()
                            var tRootBox;
                            tRootBox = endItem['prev']['rootBox']
                            sL = tRootBox.S('left') - tRootBox.__dom__.clientWidth / 2 + startItem2.__dom__.offsetLeft + startItem2.__dom__.clientWidth 
                            sT = tRootBox.S('top') - tRootBox.__dom__.clientHeight / 2 + startItem2.__dom__.offsetTop + startItem2.__dom__.clientHeight / 2
                            tRootBox = tNextData['rootBox']
                            eL = tRootBox.S('left') - tRootBox.__dom__.clientWidth / 2 + endItem2.__dom__.offsetLeft 
                            eT = tRootBox.S('top') - tRootBox.__dom__.clientHeight / 2 + endItem2.__dom__.offsetTop + endItem2.__dom__.clientHeight / 2
                            // console.log(
                            //     [
                            //         'M' + sL + ',' + sT,
                            //         'C' + (sL - eL) / 4 + ',' + (sT - eT) / 4,
                            //         (sL - eL) / 4 * 3 + ',' + (sT - eT) / 4 * 3,
                            //         eL + ',' + eT
                            //     ].join(' ')
                            // );
                            svgList.push(
                                Recard.Dom(document.createElementNS('http://www.w3.org/2000/svg', 'path')).S(
                                    '@fill', 'none',
                                    '@stroke', 'rgb(174, 226, 57)',
                                    '@stroke-linecap', 'round',
                                    '@stroke-width', 2,
                                    '@d', [
                                        'M' + sL + ',' + sT,
                                        'C' + sL + ',' + (sT),
                                        sL + ',' + (eT),
                                        ///
                                        eL + ',' + eT
                                    ].join(' '),
                                    'on', ['mouseover', function () { this.S('@stroke', 'red') }],
                                    'on', ['mouseout', function () { this.S('@stroke', 'rgb(174, 226, 57)') }],
                                    '<', svgRootBox
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