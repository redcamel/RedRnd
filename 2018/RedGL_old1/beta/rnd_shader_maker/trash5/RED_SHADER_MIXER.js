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
                DISPLACEMENT: 'vec4',
                TEST_FLOAT: 'float',
                TEST_VEC3: 'vec3'
            }
        }
        info.src = '';
        var result;
        result = new Structure_Node(info)
        result.S(
            'top', 10000,
            'left', 10000,
            '<', 'body'
        )
    }
    result = {
        init: function () {
            (function () {
                var startX, startY
                nodeBox = Recard.Dom('div').S(
                    '@id', 'nodeBox',
                    'position', 'relative',
                    'width', 20000,
                    'height', 20000,
                    '<', 'body',
                    'on', ['down', function () {
                        startX = Recard.WIN.scroll('x')
                        startY = Recard.WIN.scroll('y')
                        this.S(
                            'on', ['move', function (e) {
                                console.log('오니2', e)
                                startX -= e.nativeEvent.movementX
                                startY -= e.nativeEvent.movementY
                                Recard.WIN.scroll(startX, startY)
                            }]
                        )
                    }],
                    'on', ['up', function () {
                        this.S(
                            'off', 'move'
                        )
                    }]
                )
            })();
            Recard.WIN.scroll(nodeBox.__dom__.clientWidth / 2 - Recard.WIN.w / 2, nodeBox.__dom__.clientHeight / 2 - Recard.WIN.h / 2)
            setResult()
            /////////////////////////////////////
            Recard.Dom('div').S(
                'position', 'fixed',
                'bottom', 10,
                'left', 10,
                'right', 10,
                'z-index', 1,
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
                                COLOR: 'vec4',
                                RGB: 'vec3',
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
                            'top', Recard.WIN.scroll('y') + Recard.WIN.h / 2,
                            'left', Recard.WIN.scroll('x') + Recard.WIN.w / 2,
                            '<', 'body'
                        )
                    }]
                )
            )
            Recard.Dom('div').S(
                'position', 'fixed',
                'bottom', 10,
                'left', 100,
                'right', 10,
                'z-index', 1,
                '<', 'body',
                '>', Recard.Dom('button').S(
                    'margin-right', 1,
                    'padding', 10,
                    'background', '#5b52aa',
                    'color', '#fff',
                    'outline', 'none',
                    'border', 0,
                    'cursor', 'pointer',
                    'html', 'ShaderTest',
                    'on', ['down', function () {
                        var info;
                        info = {}
                        info['nodeType'] = 'ShaderTest'
                        info['structure'] = {
                            title: null,
                            output: {
                                output: null
                            },
                            input: {
                                A: null,
                                B: null
                            }
                        }
                        info.src = '';
                        (new Structure_Node(info)).S(
                            'top', Recard.WIN.scroll('y') + Recard.WIN.h / 2,
                            'left', Recard.WIN.scroll('x') + Recard.WIN.w / 2,
                            '<', 'body'
                        )
                    }]
                )
            )
            // Recard.Dom('div').S(
            //     'position', 'fixed',
            //     'bottom', 10,
            //     'left', 100,
            //     'right', 10,
            //     'z-index', 1,
            //     '<', 'body',
            //     '>', Recard.Dom('button').S(
            //         'margin-right', 1,
            //         'padding', 10,
            //         'background', '#5b52aa',
            //         'color', '#fff',
            //         'outline', 'none',
            //         'border', 0,
            //         'cursor', 'pointer',
            //         'html', 'add',
            //         'on', ['down', function () {
            //             var info;
            //             info = {}
            //             info['nodeType'] = 'add'
            //             info['structure'] = {
            //                 title: null,
            //                 output: {
            //                     output: null
            //                 },
            //                 input: {
            //                     A: null,
            //                     B: null
            //                 }
            //             }
            //             info.src = '';
            //             (new Structure_Node(info)).S(
            //                 'top', Recard.WIN.scroll('y') + Recard.WIN.h / 2,
            //                 'left', Recard.WIN.scroll('x') + Recard.WIN.w / 2,
            //                 '<', 'body'
            //             )
            //         }]
            //     )
            // )

        }
    }
    return result
})())