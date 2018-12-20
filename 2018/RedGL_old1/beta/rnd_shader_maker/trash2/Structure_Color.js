'use strict';
var Structure_Color;
// 텍스쳐 기본정보
(function () {
    Structure_Color = function () {
        this['structure'] = {
            output: {
                COLOR: null,
                R: null,
                G: null,
                B: null,
                A: null
            },
            input: {}
        }
        Object.seal(this)
    }
    Object.freeze(Structure_Color)
})()