'use strict';
// TODO: 여기정리해야함
var NodeBox;
(function () {
    var startMouseX, startMouseY;
    var startX, startY;
    var currentZIndex;
    var makeInputItems, makeOutputItems;
    Recard.Css('.inOutputBox').S(
        'display', 'inline-block',
        'width', '50%',
        'padding-top', 5,
        'padding-bottom', 5
    )
    currentZIndex = 1
    makeInputItems = function (info) { for (var k in info) this.S('>', InputItem(k, info[k])) }
    makeOutputItems = function (info) { for (var k in info) this.S('>', OutputItem(k, info[k])) }
    NodeBox = function (structureInfo) {
        if (!(this instanceof NodeBox)) return new NodeBox(structureInfo)
        var rootBox;
        var inputBox, outputBox;
        var imageBox, fileBox, uniformNameBox;
        var code_vertex_Container, code_fragment_Container;
        var tabVertex,tabFragment
        rootBox = Recard.Dom('div').S(
            '@nodeType', structureInfo['nodeType'],
            '@calcItemYn',structureInfo['calcItemYn'],
            'position', 'absolute',
            'top', 0,
            'left', 0,
            'min-width', 250,
            'z-index', currentZIndex++,
            // 'max-height', 400,
            'background', 'rgba(19,18,26,0.8)',
            'box-shadow', '0px 0px 10px 5px rgba(0,0,0,0.2)',

            'transform', 'translate(-50%, -50%)',
            '>', Recard.Dom('div').S(
                'position', 'absolute',
                'bottom', 0,
                'left', 0,
                'right', 0,
                'transform', 'translate(0,100%)',
                'border-bottom-left-radius', 8,
                'border-bottom-right-radius', 8,

                'background', 'rgba(19,18,26,0.8)',
                'display', structureInfo['nodeType'].indexOf('Texture') > -1 ? 'block' : 'none',
                '>', imageBox = Recard.Dom('img').S(
                    '@imageBox', '',
                    'float', 'left',
                    'width', 80,
                    'height', 80,
                    'margin', 10,
                    'border-radius', 5,
                    '@src', structureInfo['structureBase']['textureInfo']['src']
                ),
                '>', Recard.Dom('div').S(
                    'margin-top', 10,
                    'width', 200,
                    'display', 'inline-block',
                    '>', uniformNameBox = Recard.Dom('input').S(
                        '@disabled', '',
                        '@type', 'text',
                        '@value', structureInfo['nodeType'].indexOf('Texture') > -1 ? structureInfo['structureBase']['textureInfo']['textureUniformKey'] : (structureInfo['nodeType'] + structureInfo['index']),
                        'border', 0, 'outline', 'none',
                        'padding', 5,
                        'width', 200,
                        'on', ['input', function (e) {
                            structureInfo['structureBase']['textureInfo']['textureUniformKey'] = this.S('@value')
                            Recard.query('[nodeType="Final"]')['parseDefine']()
                        }]
                    ),
                    '>', fileBox = Recard.Dom('input').S(
                        '@type', 'file',
                        '@accept', '.png, .jpg, .jpeg',
                        'margin-top', 5,
                        'width', 200,
                        'border', 0, 'outline', 'none',
                        'on', ['change', function (e) {
                            console.log(this.__dom__.files)
                            structureInfo['structureBase']['textureInfo']['src'] = window.URL.createObjectURL(this.__dom__.files[0])
                            imageBox.S('@src', window.URL.createObjectURL(this.__dom__.files[0]))
                            Recard.query('[nodeType="Final"]')['parseDefine']()
                        }]
                    ),
                    '>', (function () {
                        var t0;
                        t0 = Recard.Dom('select').S(
                            'margin-top', 5,
                            'width', 200,
                            'on', ['change', function (e) {
                                console.log(this.__dom__.files)
                                structureInfo['structureBase']['textureInfo']['textureIndex'] = +this.S('@value')
                                // uniformNameBox.S('@disabled', null)
                                switch (structureInfo['structureBase']['textureInfo']['textureIndex']) {
                                    case RedTextureIndex.DIFFUSE:
                                        uniformNameBox.S('@disabled', '')
                                        structureInfo['structureBase']['textureInfo']['textureUniformKey'] = 'uDiffuseTexture'
                                        break
                                    case RedTextureIndex.NORMAL:
                                        uniformNameBox.S('@disabled', '')
                                        structureInfo['structureBase']['textureInfo']['textureUniformKey'] = 'uNormalTexture'
                                        break
                                    case RedTextureIndex.SPECULAR:
                                        uniformNameBox.S('@disabled', '')
                                        structureInfo['structureBase']['textureInfo']['textureUniformKey'] = 'uSpecularTexture'
                                        break
                                    case RedTextureIndex.DISPLACEMENT:
                                        uniformNameBox.S('@disabled', '')
                                        structureInfo['structureBase']['textureInfo']['textureUniformKey'] = 'uDisplacementTexture'
                                        break
                                    case RedTextureIndex.ETC_VERTEX_1:
                                        uniformNameBox.S('@disabled', '')
                                        structureInfo['structureBase']['textureInfo']['textureUniformKey'] = 'uEtcVertexTexture1'
                                        break
                                    case RedTextureIndex.ETC_VERTEX_2:
                                        uniformNameBox.S('@disabled', '')
                                        structureInfo['structureBase']['textureInfo']['textureUniformKey'] = 'uEtcVertexTexture2'
                                        break
                                    case RedTextureIndex.ETC_FRAGMENT_1:
                                        uniformNameBox.S('@disabled', '')
                                        structureInfo['structureBase']['textureInfo']['textureUniformKey'] = 'uEtcFragmentTexture1'
                                        break
                                    case RedTextureIndex.ETC_FRAGMENT_2:
                                        uniformNameBox.S('@disabled', '')
                                        structureInfo['structureBase']['textureInfo']['textureUniformKey'] = 'uEtcFragmentTexture2'
                                        break
                                    default:
                                        structureInfo['structureBase']['textureInfo']['textureUniformKey'] = 'uTexture_' + structureInfo['index']
                                        break
                                }
                                uniformNameBox.S(
                                    '@value', structureInfo['structureBase']['textureInfo']['textureUniformKey']
                                )
                                rootBox.parseDefine()
                                Recard.query('[nodeType="Final"]')['parseDefine']()
                            }]
                        )
                        var tKeyMap;
                        if (structureInfo['shaderType'] == 'vertex') {
                            tKeyMap = {
                                DISPLACEMENT : 1,
                                ETC_VERTEX_1 : 1,
                                ETC_VERTEX_2 : 1
                            }    
                        }else {
                            tKeyMap = {
                                DIFFUSE : 1,
                                NORMAL : 1,
                                SPECULAR : 1,
                                ETC_FRAGMENT_1 : 1,
                                ETC_FRAGMENT_2 : 1
                            }   
                        }
                        for (var k in RedTextureIndex) {
                            if (k != 'CREATE' && tKeyMap[k]) {
                                Recard.Dom('option').S(
                                    '@value', RedTextureIndex[k],
                                    'html', k,
                                    '<', t0
                                )
                            }
                        }
                        return t0;
                    })()
                )
            ),
            '>', Recard.Dom('div').S(
                'position', 'relative',
                'height', 30,
                'border-top-left-radius', 8,
                'border-top-right-radius', 8,
                'background', structureInfo['nodeType'] == 'Final' ? '#272530' : structureInfo['shaderType'] == 'fragment' ? 'rgb(144, 74, 135)' : 'rgb(50, 100, 135)',
                'line-height', 30,
                'padding-left', 10,
                '>', Recard.Dom('span').S(
                    '@titleBox', '',
                    'html', structureInfo['nodeType'] + '_' + structureInfo['index'],
                ),
                'cursor', 'move',
                'on', ['down', function (e) {
                    rootBox.S('z-index', currentZIndex++)
                    startMouseX = Recard.WIN.mouseX
                    startMouseY = Recard.WIN.mouseY
                    startX = rootBox.S('left')
                    startY = rootBox.S('top')
                    Recard.LINE_MANAGER.setNeedRender(true)
                    Recard.LOOPER.add('RED_SHADER_NODE_BOX', function () {
                        var tX, tY
                        tX = startX - (startMouseX - Recard.WIN.mouseX)
                        tY = startY - (startMouseY - Recard.WIN.mouseY)
                        rootBox.S(
                            'left', tX,
                            'top', tY
                        )
                    })
                    Recard.EVENT_EMITTER.on(window, 'mouseup', function () {
                        Recard.LOOPER.del('RED_SHADER_NODE_BOX')
                        Recard.EVENT_EMITTER.off(window, 'mouseup')
                        Recard.LINE_MANAGER.setNeedRender(false)
                    })
                    Recard.PROPERTY_BOX.makePanel(rootBox)
                }],
                '>', Recard.Dom('button').S(
                    'display', 'block',
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
                        rootBox.queryAll('[inputItem]').forEach(function (item) {
                            item['deleteFromData']()
                        })
                        rootBox.queryAll('[outputItem]').forEach(function (item) {
                            for (var k in item['info']['to']) {
                                var tItemData = item['info']['to'][k]
                                console.log(tItemData)
                                for (var k2 in tItemData) {
                                    tItemData[k2]['deleteFromData']()
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
            '>', Recard.Dom('div').S(
                'display', structureInfo['nodeType'] == 'Final' ? 'block' : 'none',
                'margin-top', 10,
                '>', tabFragment = Recard.Dom('button').S(
                    'padding', 10,
                    'html', 'fragment',
                    'background', 'rgb(144, 74, 135)',
                    'color', '#fff',
                    'on', ['down', function () {
                        code_vertex_Container.S('display', 'none')
                        code_fragment_Container.S('display', 'block')
                        tabFragment.S('opacity', 1)
                        tabVertex.S('opacity', 0.3)
                        console.log('오긴하나')
                    }]
                ),
                '>', tabVertex = Recard.Dom('button').S(
                    'border-top-right-radius', 10,
                    'margin-left', 1,
                    'padding', 10,
                    'background', 'rgb(50, 100, 135)',
                    'color', '#fff',
                    'opacity', 0.3,
                    'html', 'vertex',
                    'on', ['down', function () {
                        code_vertex_Container.S('display', 'block')
                        code_fragment_Container.S('display', 'none')
                        tabFragment.S('opacity', 0.3)
                        tabVertex.S('opacity', 1)
                        console.log('오긴하나2')
                    }]
                )
            ),
            '>', code_fragment_Container = Recard.Dom('pre').S(
                '@className', 'style-1',
                'max-width', 500,
                'max-height', 400,
                'overflow', 'auto',
                'margin', 0,
                'background', 'transparent',
                '>', Recard.Dom('code').S(
                    '@code_fragment_Box', '',
                    '@className', 'language-glsl',
                    'background', 'rgba(0,0,0,0.1)',
                    'padding', 10
                )
            ),
            '>', code_vertex_Container = Recard.Dom('pre').S(
                '@className', 'style-1',
                'max-width', 500,
                'max-height', 400,
                'overflow', 'auto',
                'margin', 0,
                'display', 'none',
                'background', 'transparent',
                '>', Recard.Dom('code').S(
                    '@code_vertex_Box', '',
                    '@className', 'language-glsl',
                    'background', 'rgba(0,0,0,0.1)',
                    'padding', 10
                )
            )
        )
        rootBox['structureInfo'] = structureInfo
        rootBox['prism'] = function () {
            Prism.highlightElement(rootBox.query('[code_vertex_Box]').__dom__)
            Prism.highlightElement(rootBox.query('[code_fragment_Box]').__dom__)
        }
        rootBox['parseDefine'] = (function () {
            var makeNodeStack;
            makeNodeStack = function (tRoot, tList) {
                tRoot.queryAll('[inputItem]').forEach(function (item) {
                    if (item['info']['from']) {
                        item['info']['from'].getPanel()['structureInfo'].parse()
                        tList.push(item['info']['from'].getPanel())
                        makeNodeStack(item['info']['from'].getPanel(), tList)
                        // console.log(item.S('@key'),item['info']['from'])
                    }
                })

            }
            return function () {
                console.log(this)
                rootBox.query('[code_fragment_Box]').S(
                    'html', ''
                )
                var tNodeStack = []
                var resultInfo_fragment = []
                var resultInfo_vertex = []
                var finalDefine_fragment = new Structure_define()
                var finalDefine_vertex = new Structure_define()
                var makeFinalDefineData;
                makeFinalDefineData = function (targetResultInfo,targetFinalDefine, shaderKey) {
                    // 하위부터 정보를 합한다.
                    tNodeStack.forEach(function (item) {
                        console.log(item['structureInfo'][shaderKey])
                        if(item['structureInfo'][shaderKey]){
                            var t0 = {uuid: item['structureInfo']['nodeType'] + item['structureInfo']['index']}
                            t0[shaderKey] = item['structureInfo'][shaderKey]
                            targetResultInfo.push(t0)
                        }
                        
                    })
                    console.log('최종결과', targetResultInfo)
                    targetResultInfo.forEach(function (item) {
                        var tData = item[shaderKey]
                        console.log('key',shaderKey)
                        console.log('item',item)
                        console.log('tData',tData)
                        for (var groupKey in tData) {
                            var tGroupData = tData[groupKey]
                            if (tGroupData instanceof Array) {
                                tGroupData.forEach(function (v) {
                                    targetFinalDefine[groupKey].push(v)
                                })
    
                            } else {
                                for (var key in tGroupData) {
                                    targetFinalDefine[groupKey][key] = tGroupData[key]
                                }
                            }
    
                        }
                    })
                }
                // 하위노드 리스트를 만들고
                makeNodeStack(Recard.query('[nodeType="Final"]'), tNodeStack)
                tNodeStack.reverse()
                console.log('tNodeStack',tNodeStack)
                ////
               
                ////
                makeFinalDefineData(resultInfo_vertex, finalDefine_vertex, 'define_vertex')
                makeFinalDefineData(resultInfo_fragment, finalDefine_fragment, 'define_fragment')
                console.log('resultInfo_vertex', resultInfo_vertex)
                console.log('resultInfo_fragment', resultInfo_fragment)
                console.log('finalDefine_vertex', finalDefine_vertex)
                console.log('finalDefine_fragment', finalDefine_fragment)
                var finalNode;
                var parseFianlStrList;
                finalNode = Recard.query('[nodeType="Final"]')
                parseFianlStrList = finalNode['structureInfo'].parse(finalDefine_vertex, finalDefine_fragment)
                Recard.RED_SHADER_PREVIEW.setTest(parseFianlStrList[0], parseFianlStrList[1], finalDefine_vertex['textureInfo'], finalDefine_fragment['textureInfo'])
                   
                if (structureInfo instanceof Structure_Final) {
                     // 파이널 노드에 프레그먼트, 버텍스쉐이더 파싱된  소스를 보여준다. 
                } else {
                    var str = rootBox['structureInfo'].parse(rootBox['structureInfo']['shaderType']=='vertex' ? finalDefine_vertex : finalDefine_fragment)
                    rootBox.query('[code_fragment_Box]').S('html',str )
                }
                finalNode.query('[code_vertex_Box]').S('html', parseFianlStrList[0])
                finalNode.query('[code_fragment_Box]').S('html', parseFianlStrList[1])
                rootBox['prism']()
                finalNode['prism']()
            }
        })()
        makeInputItems.call(inputBox, structureInfo['structureBase']['input'])
        makeOutputItems.call(outputBox, structureInfo['structureBase']['output'])
        return rootBox
    }
})()