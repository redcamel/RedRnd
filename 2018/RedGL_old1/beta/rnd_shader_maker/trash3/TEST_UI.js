'use strict';
Recard.static('TEST_UI', (function () {
    var result;
    var setResult
    var nodeBox;
    setResult = function () {
        var info;
        info = {}
        info['nodeType'] = 'Result'
        info['structure'] = {
            title: 'Result',
            output: {},
            input: {
                DIFFUSE: 'vec4',
                NORMAL: 'vec4',
                SPECULAR: 'vec4',
                DISPLACEMENT: 'vec4'
            }
        }
        info.src = '';
        var result;
        result = new Structure_Node(info)
        result.S(
            'top',10000,
            'left', 10000,
            '<', 'body'
        )
    }
    result = {
        lastCompile: (function(){
            var parse;
            var data;
            parse = function(parentData,tData){
                var root;
                var tInputItemList
                console.log(tData)
                parentData.push(tData)
                root = tData['rootBox']                
                tInputItemList = root.queryAll('[inputItem]')
                tInputItemList.forEach(function (item, index) {
                    if(item['prev']) {
                        parse(parentData,item['prev'])
                    }
                })
            }
            return function () {
                var root;
                var tInputItemList
                data = {}
                root = Recard.query('[nodeType="Result"]')
                tInputItemList = root.queryAll('[inputItem]')
                console.log(root)            
                tInputItemList.forEach(function (item, index) {
                    if(item['prev']) {
                        data[item.S('@key')]={
                            children : []
                        }
                        parse(data[item.S('@key')]['children'],item['prev'])
                    }
                    
                })
                console.log(data)
                root['compileInfo'] = {
                    define: {
                        uniforms: {},
                        varyings: {},
                        vars: {}
                    },
                    header: [],
                    body: [],
                    footer: []
                }
                var mergeCompileSource = {
                    define: {
                        uniforms: [],
                        varyings: [],
                        vars: []
                    },
                    header: [],
                    body: [],
                    footer: []
                }
                for (var k in data) {
                    var tFlow;
                    tFlow = data[k]['children'].concat()
                    tFlow.reverse()
                    console.log(k, '에 대한 플로우', tFlow)
                    tFlow.forEach(function (item) {
                        var tData = item['rootBox']['compileSourceInfo']
                        console.log(tData)
                       
                        mergeCompileSource['header'] = mergeCompileSource['header'].concat(tData['header'])
                        mergeCompileSource['body'] = mergeCompileSource['body'].concat(tData['body'])
                        mergeCompileSource['footer'] = mergeCompileSource['footer'].concat(tData['footer'])
                      
                        item['rootBox']['compileSourceInfo']['define']['uniforms'].forEach(function(v,i){
                            item['rootBox']['compileSourceInfo']['define']['uniforms'][i].push(k)
                        })
                        mergeCompileSource['define']['uniforms'] = mergeCompileSource['define']['uniforms'].concat(
                            item['rootBox']['compileSourceInfo']['define']['uniforms']
                        )
                        mergeCompileSource['define']['varyings'] = mergeCompileSource['define']['varyings'].concat(
                            item['rootBox']['compileSourceInfo']['define']['varyings']
                        )
                        mergeCompileSource['define']['vars'] = mergeCompileSource['define']['vars'].concat(
                            item['rootBox']['compileSourceInfo']['define']['vars']
                        )
                        if(k=='NORMAL' ){
                            sourceIndex++
                            mergeCompileSource['define']['uniforms'].push(
                                ['uniform int uUseNormalTexture'] // 노말텍스쳐 사용여부
                            )
                            mergeCompileSource['define']['varyings'].push(
                                ['varying vec2 vTexcoord'],
                                ['varying vec3 vEyeVec'],
                                ['varying vec3 vNormal']
                            )
                            mergeCompileSource['footer'].push(
                                'gl_FragColor = textureColor1*0.5 + textureColor2*0.5'
                            )
                        }
                        // if(k=='SPECULAR' ){
                        //     sourceIndex++
                        //     mergeCompileSource['define']['uniforms'].push(
                        //         ['uniform int uSpecularTexture'] // 노말텍스쳐 사용여부
                        //     )
                        //     mergeCompileSource['define']['varyings'].push(
                        //         ['varying vec2 vTexcoord'],
                        //         ['varying vec3 vEyeVec'],
                        //         ['varying vec3 vNormal']
                        //     )
                        //     mergeCompileSource['footer'].push(
                        //         'gl_FragColor = textureColor1*0.1 + textureColor2*0.1+ textureColor4*0.8'
                        //     )
                        // }
                    })
                }
                console.log(mergeCompileSource)
                var ttt = root.makeCode(mergeCompileSource)
                try {
                    Recard.PREVIEW.setTest(null,ttt,mergeCompileSource)
                } catch (error) {
                    
                }
                


            }
        })(),
        init: function () {
            (function(){
                var startX,startY
                nodeBox= Recard.Dom('div').S(
                    '@id','nodeBox',
                    'position','relative',
                    'width',20000,
                    'height',20000,
                    '<','body',
                    'on',['down',function(){
                        startX = Recard.WIN.scroll('x')
                        startY = Recard.WIN.scroll('y')
                        this.S(
                            'on',['move',function(e){
                                console.log('오니2',e)
                                startX-=e.nativeEvent.movementX
                                startY-=e.nativeEvent.movementY
                                Recard.WIN.scroll(startX,startY)
                            }]
                        )
                    }],
                    'on',['up',function(){
                        this.S(
                            'off','move'
                        )
                    }]
                )
            })();
            Recard.WIN.scroll(nodeBox.__dom__.clientWidth/2-Recard.WIN.w/2,nodeBox.__dom__.clientHeight/2-Recard.WIN.h/2)
            setResult()
            /////////////////////////////////////
            Recard.Dom('div').S(
                'position', 'fixed',
                'bottom', 10,
                'left', 10,
                'right', 10,
                'z-index', 20000000,
                '<', 'body',
                '>', Recard.Dom('button').S(
                    'margin-right', 1,
                    'padding', 10,
                    'background', '#5b52aa',
                    'color', '#fff',
                    'outline', 'none',
                    'border', 0,
                    'cursor', 'pointer',
                    'html', '텍스쳐추가',
                    'on', ['down', function () {
                        var info;
                        info = {}
                        info['nodeType'] = 'Texture'
                        info['structure'] = {
                            title: null,
                            output: {
                                // TEXTURE: 'sampler2D',
                                COLOR: 'vec4',
                                R: 'float',
                                G: 'float',
                                B: 'float',
                                A: 'float'
                            },
                            input: {
                                UV: 'vec2'
                            }
                        }
                        info.src = '';
                        (new Structure_Node(info)).S(
                            'top',Recard.WIN.scroll('y')+Recard.WIN.h/2,
                            'left',Recard.WIN.scroll('x')+Recard.WIN.w/2,
                            '<', 'body'
                        )
                    }]
                )
                // ,
                // '>', Recard.Dom('button').S(
                //     'margin-right', 1,
                //     'padding', 10,
                //     'background', '#5b52aa',
                //     'color', '#fff',
                //     'outline', 'none',
                //     'border', 0,
                //     'cursor', 'pointer',
                //     'html', 'Add',

                //     'on', ['down', function () {
                //         var info;
                //         info = {}
                //         info['nodeType'] = 'Add'
                //         info['structure'] = {
                //             title: null,
                //             output: {
                //                 OUTPUT: null
                //             },
                //             input: {
                //                 INPUT1: null,
                //                 INPUT2: null
                //             }
                //         }
                //         info.src = '';
                //         (new Structure_Node(info)).S(
                //             '<', 'body'
                //         )
                //     }]
                // ),
                // '>', Recard.Dom('button').S(
                //     'margin-right', 1,
                //     'padding', 10,
                //     'background', '#5b52aa',
                //     'color', '#fff',
                //     'outline', 'none',
                //     'border', 0,
                //     'cursor', 'pointer',
                //     'html', 'Mul',
                //     'on', ['down', function () {
                //         var info;
                //         info = {}
                //         info['nodeType'] = 'Mul'
                //         info['structure'] = {
                //             title: null,
                //             output: {
                //                 OUTPUT: null
                //             },
                //             input: {
                //                 INPUT1: null,
                //                 INPUT2: null
                //             }
                //         }
                //         info.src = '';
                //         (new Structure_Node(info)).S(
                //             '<', 'body'
                //         )
                //     }]
                // )
            )

        }
    }
    return result
})())