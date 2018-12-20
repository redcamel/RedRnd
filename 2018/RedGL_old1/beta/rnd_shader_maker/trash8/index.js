'use strict';

Recard.static('INDEX', (function () {
    var result;

    result = {
        init: function () {
            Recard.Css('button').S(
                'border', 0,
                'outline', 'none',
                'cursor', 'pointer'
            )
            Recard.RED_SHADER_PREVIEW.init()
            Recard.RED_SHADER_GRID.init()
            Recard.TEST_BOX.init()
            Recard.LINE_MANAGER.init()

        }
    }
    return result
})())