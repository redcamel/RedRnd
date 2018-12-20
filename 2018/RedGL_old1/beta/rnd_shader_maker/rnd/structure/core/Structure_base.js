'use strict';
var Structure_base;
(function () {
    Structure_base = function (name, shaderType) {
        var structureBase = this['structureBase'];
        this['shaderType'] = shaderType
        this['nodeType'] = name + '_' + shaderType
        if (!this['nodeColor']) this['nodeColor'] = '#272530';
        // 없는거 생성
        ['functions', 'textureInfo', 'input', 'output'].forEach(function (k) {
            if (!structureBase[k]) structureBase[k] = {}
        });
        // 타입설정
        ['input', 'output'].forEach(function (key) {
            for (var k in structureBase[key]) {
                structureBase[key][k]['shaderType'] = shaderType
            }
        })
        this['parse'] = function () {
            throw '파서를 정의해야합니다.'
        }
    }
    Object.freeze(Structure_base)
})();