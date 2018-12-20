'use strict';
Recard.static('TEST_BOX', (function () {
    var result;
    var rootBox;
    var contentBox;
    Recard.Css('.nodeItemButton').S(
        'width', '100%',
        'display', 'block',
        'margin-bottom', 1,
        'cursor', 'pointer',
        'border-bottom', '1px solid rgba(255,255,255,0.05)',
        'padding', 10
    )
    result = {
        init: function () {
            rootBox = Recard.Dom('div').S(
                '@className', 'style-1',
                'position', 'fixed',
                'left', 0,
                'bottom', 0,
                'width', 400,
                'overflow', 'auto',
                'background', 'rgba(0,0,0,0.5)',
                '<', 'body'
            )
            Recard.Dom('div').S(
                '@className', 'nodeItemButton',
                'html', '텍스쳐추가',
                'on', ['down', function () {
                    Recard.RED_SHADER_GRID.addNode(new Structure_Texture())
                }],
                '<', rootBox
            ),
                Recard.Dom('div').S(
                    '@className', 'nodeItemButton',
                    'html', '타입테스트추가',
                    'on', ['down', function () {
                        Recard.RED_SHADER_GRID.addNode(new Structure_Test())
                    }],
                    '<', rootBox
                ),
                Recard.Dom('div').S(
                    '@className', 'nodeItemButton',
                    'html', 'Add',
                    'on', ['down', function () {
                        Recard.RED_SHADER_GRID.addNode(new Structure_Add())
                    }],
                    '<', rootBox
                )
            Recard.Dom('div').S(
                '@className', 'nodeItemButton',
                'html', 'ShaderTest',
                'on', ['down', function () {
                    Recard.RED_SHADER_GRID.addNode(new Structure_Shader())
                }],
                '<', rootBox
            )
            Recard.Dom('div').S(
                '@className', 'nodeItemButton',
                'html', 'ShaderTest2',
                'on', ['down', function () {
                    Recard.RED_SHADER_GRID.addNode(new Structure_Shader2())
                }],
                '<', rootBox
            )
            Recard.RED_SHADER_GRID.addNode(new Structure_Final())

        }
    }

    return result
})())