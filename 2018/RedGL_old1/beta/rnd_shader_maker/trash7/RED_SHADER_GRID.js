'use strict';
Recard.static('RED_SHADER_GRID', (function () {
    var result;
    var rootBox;
    var contentBox;
    var startMouseX, startMouseY
    var startX, startY
    var W, H;
    result = {
        addNode: function (StructureInfo) {
            NodeBox(StructureInfo).S(
                'top', rootBox.__dom__.scrollTop + rootBox.__dom__.clientHeight / 2,
                'left', rootBox.__dom__.scrollLeft + rootBox.__dom__.clientWidth / 2,
                '<', rootBox
            )
        },
        
        getRootBox : function(){
            return rootBox
        },
        getContentBox : function(){
            return contentBox
        },
        init: function () {
            W = 20000
            H = 20000
            rootBox = Recard.Dom('div').S(
                'position', 'fixed',
                'top', 0,
                'left', 400,
                'bottom', 0,
                'right', 0,
                '@className', 'style-1',
                'overflow', 'scroll',
                '>', contentBox = Recard.Dom('div').S(
                    'position', 'relative',
                    'top', 0,
                    'left', 0,
                    'width', W,
                    'height', H,
                    'background', 'url(grid.png)',
                    'on', ['down', function (e) {
                        startMouseX = Recard.WIN.mouseX
                        startMouseY = Recard.WIN.mouseY
                        startX = rootBox.__dom__.scrollLeft
                        startY = rootBox.__dom__.scrollTop
                        Recard.LOOPER.add('RED_SHADER_GRID', function () {
                            var tX, tY
                            tX = startX + startMouseX - Recard.WIN.mouseX
                            tY = startY + startMouseY - Recard.WIN.mouseY
                            rootBox.__dom__.scroll(tX, tY)
                            console.log(Recard.WIN.scroll('x'), Recard.WIN.scroll('y'))
                        })
                        Recard.EVENT_EMITTER.on(window, 'mouseup', function () {
                            Recard.LOOPER.del('RED_SHADER_GRID')
                            Recard.EVENT_EMITTER.off(window, 'mouseup')
                        })

                    }]
                ),
                '<', 'body'
            )
            // rootBox.__dom__.scrollTop = H / 2 - rootBox.__dom__.clientHeight / 2
            // rootBox.__dom__.scrollLeft = W / 2 - rootBox.__dom__.clientWidth / 2
        }
    }

    return result
})())