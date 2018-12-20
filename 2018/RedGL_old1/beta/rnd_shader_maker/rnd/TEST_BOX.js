'use strict';
Recard.static('TEST_BOX', (function () {
    var result;
    var rootBox;
    var contentBox;
    var makeItem;
    Recard.Css('.nodeItemButton').S(    
        'padding',5,  
        'background','rgba(0, 0, 0, 0.5)',
        'color','#fff',
        'font-size',11,
        'cursor', 'pointer',
        'border', 0,
        'outline', 'none'
    )
    Recard.Css('div .nodeItemButton_f').S(
        'width',20,
        'margin-right',0,
        'background','rgb(144, 74, 135)',
        'border-left', '1px solid #000'
    )
    Recard.Css('div .nodeItemButton_v').S(
        'width',20,
        'background','rgb(50, 100, 135)',
        'border-left', '1px solid #000'
    )
    makeItem = function (title, Structure, fragmentYn, vertexYn) {
        Recard.Dom('div').S(
            'border-bottom', '1px solid rgba(0, 0, 0, 0.2)',
            'margin-top',10,
            'margin-bottom',10,
            '>', Recard.Dom('button').S(
                '@className', 'nodeItemButton',
                'html', title
            ),
            '>', (function () {
                var t0;
                t0 = Recard.Dom('div').S(
                    'float', 'right',
                    'margin-right',10
                )
                if (fragmentYn) {
                    Recard.Dom('button').S(
                        '@className', 'nodeItemButton_f',
                        'html', 'f',
                        'on', ['down', function () {
                            Recard.RED_SHADER_GRID.addNode(new Structure('fragment'))
                        }],
                        '<', t0
                    )
                }
                if (vertexYn) {
                    Recard.Dom('button').S(
                        '@className', 'nodeItemButton_v',
                        'html', 'v',
                        'on', ['down', function () {
                            Recard.RED_SHADER_GRID.addNode(new Structure('vertex'))
                        }],
                        '<', t0
                    )
                }
                return t0
            })(),
            '>', Recard.Dom('div').S('clear', 'both'),
            '<', rootBox
        )
    }
    result = {
        init: function () {
            rootBox = Recard.Dom('div').S(
                '@className', 'style-1',
                'position', 'fixed',
                'right', 0,
                'bottom', 5,
                'width', 200,
                'overflow', 'auto',
                'background', '#222',
                'padding','0px 10px 0px 10px',
                'border-top-left-radius', 10,
                'box-shadow','rgba(0, 0, 0, 0.2) 0px 0px 10px 5px',
                '<', 'body'
            )
            makeItem('텍스쳐', Structure_Texture, true, true)
            makeItem('타입테스트', Structure_Test, true, true)
            makeItem('Add', Structure_Add, true, true)
            makeItem('Mul', Structure_Mul, true, true)
            makeItem('ShaderTest', Structure_Shader, true, true)
            makeItem('ShaderTest2', Structure_Shader2, true, false)
            makeItem('ShaderTest3', Structure_Shader3, false, true)
            Recard.RED_SHADER_GRID.addNode(new Structure_Final())

        }
    }

    return result
})())