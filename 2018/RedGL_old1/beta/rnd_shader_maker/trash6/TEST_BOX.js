'use strict';
Recard.static('TEST_BOX', (function () {
    var result;
    var rootBox;
    var contentBox;
    Recard.Css('.nodeItemButton').S(
        'width','100%',
        'display','block',
        'margin-bottom',1,
        'cursor','pointer',
        'border-bottom','1px solid #333',
        'padding', 10
    )
    result = {
        init: function () {
            rootBox = Recard.Dom('div').S(
                'position', 'fixed',
                'top', 400,
                'left', 0,
                'bottom', 0,
                'width',400,
                '@className', 'style-1',
                'overflow', 'auto',
                '<', 'body'
            )
            Recard.Dom('div').S(
                '@className','nodeItemButton',
                'html', '텍스쳐추가',
                'on',['down',function(){
                    Recard.RED_SHADER_GRID.addNode(new Structure_Texture())
                }],
                '<', rootBox
            ),
            Recard.Dom('div').S(
                '@className','nodeItemButton',
                'html', '타입테스트추가',
                'on',['down',function(){
                    Recard.RED_SHADER_GRID.addNode(new Structure_Test())
                }],
                '<', rootBox
            ),
            // Recard.Dom('div').S(
            //     '@className','nodeItemButton',
            //     'html', 'Add',
            //     'on',['down',function(){
            //         Recard.RED_SHADER_GRID.addNode(new Structure_Add())
            //     }],
            //     '<', rootBox
            // )
            // Recard.Dom('div').S(
            //     '@className','nodeItemButton',
            //     'html', 'Multiply',
            //     'on',['down',function(){
            //         Recard.RED_SHADER_GRID.addNode(new Structure_Multiply())
            //     }],
            //     '<', rootBox
            // )
            Recard.RED_SHADER_GRID.addNode(new Structure_Final())
            
        }
    }

    return result
})())