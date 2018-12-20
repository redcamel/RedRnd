'use strict';
Recard.static('RED_SHADER_MIXER', (function () {
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
            return function(){
                console.log('라스트 파서!')
                var root
                var tList;
                var lastResult = {
                    uniforms : [],
                    varyings : [],
                    vars : []
                }
                var resultStr = ''
                root = Recard.query('[nodeType="Result"]')
                tList = root.queryAll('[key]')
                tList = tList.filter(function(v){
                    if(v['prev']) return true
                })
                console.log(tList)
                tList.forEach(function(item){
                    item['prev']['rootBox']['lastCompileInfo']['uniforms'].forEach(function(v){
                        if(lastResult['uniforms'].indexOf(v)==-1) lastResult['uniforms'].push(v)
                    })
                    item['prev']['rootBox']['lastCompileInfo']['varyings'].forEach(function(v){
                        if(lastResult['varyings'].indexOf(v)==-1) lastResult['varyings'].push(v)
                    })
                    item['prev']['rootBox']['lastCompileInfo']['vars'].forEach(function(v){
                        if(lastResult['vars'].indexOf(v)==-1) lastResult['vars'].push(v)
                    })
                })
                console.log(lastResult)
                resultStr +='// define unifroms\n'
                resultStr += lastResult['uniforms'].join('')
                resultStr +='\n'
                resultStr +='// define varyings\n'
                resultStr += lastResult['varyings'].join('')
                resultStr +='\n'
                resultStr +='// define vars\n'
                resultStr += lastResult['vars'].join('')
                resultStr +='\n'
                resultStr +='void main(void) {\n'
                resultStr +='// 먼가 디파인코드가 생성되어야하고\n'
                resultStr +='}'
                root.query('[codeBox]').S(
                    'html',resultStr.replace(/\n/g,'<br>')
                )
                console.log(resultStr)
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
                                UV: 'vec2',
                                TEST_VEC4 : 'vec4'
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
            )

        }
    }
    return result
})())