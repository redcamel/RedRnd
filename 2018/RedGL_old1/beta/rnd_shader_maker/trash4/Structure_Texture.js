"use strict";
var Structure_Texture;
var shaderIndex = 0;
(function () {
    Structure_Texture = function () {
        var info,  t0
        info = {
            type: 'fragment',
            define: {
                uniforms: {},
                varyings: {},
                vars: {}
            },
            header: [],
            body: [],
            footer: []
        }
        for (var k in info) this[k] = info[k]
     
    }
})()