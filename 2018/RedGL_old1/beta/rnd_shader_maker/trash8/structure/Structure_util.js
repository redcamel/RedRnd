'use strict';
var Structure_util;
(function () {
    Structure_util = {
        // 패널내 확인용 소스 생성
        makeViewStr: function (defineInfo) {
            var resultStr;
            var k, tData;
            resultStr = ''
            ///////////////////////////////////////////
            tData = defineInfo['uniforms']
            resultStr += '//define uniforms;\n'
            for (k in tData) {
                resultStr += tData[k] + ';\n'
            }
            ///////////////////////////////////////////
            tData = defineInfo['varyings']
            resultStr += '//define varyings;\n'
            for (k in tData) {
                resultStr += tData[k] + ';\n'
            }
            ///////////////////////////////////////////
            tData = defineInfo['vars']
            resultStr += '//define vars;\n'
            for (k in tData) {
                resultStr += tData[k] + ';\n'
            }
            ///////////////////////////////////////////
            tData = defineInfo['functions']
            resultStr += '//define funcs;\n'
            for (k in tData) {
                resultStr += tData[k] + ';\n'
            }
            ///////////////////////////////////////////
            resultStr += '//define headers;\n'
            defineInfo['headers'].forEach(function (v) { resultStr += v + ';\n' })
            resultStr += '//define bodys;\n'
            defineInfo['bodys'].forEach(function (v) { resultStr += v + ';\n' })
            resultStr += '//define footers;\n'
            defineInfo['footers'].forEach(function (v) { resultStr += v + ';\n' })
            return resultStr
        },
        structureBaseFill: function (data) {
            // 정보구조중 없는 놈 채워줌
            ['functions', 'textureInfo', 'input', 'output'].forEach(function (k) {
                if (!data[k]) data[k] = {}
            })
        }
    }
    Object.freeze(Structure_util)
})();