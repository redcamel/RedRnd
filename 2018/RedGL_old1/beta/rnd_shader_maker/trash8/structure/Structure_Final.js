'use strict';
var Structure_Final;
(function () {
    var index;
    var tVarKey;
    index = 0
    Structure_Final = function () {
        this['nodeType'] = 'Final'
        this['index'] = index
        this['structureBase'] = {
            input: {
                DIFFUSE: { dataType: 'vec4', from: null, shaderType : 'fragment' },
                NORMAL: { dataType: 'vec4', from: null, shaderType : 'fragment' },
                SPECULAR: { dataType: 'vec4', from: null, shaderType : 'fragment' },
                DISPLACEMENT: { dataType: 'vec4', from: null, shaderType : 'vertex' },
            }
        }
        Structure_util.structureBaseFill(this['structureBase'])
        this['parse'] = function (finalDefineInfo) {
            var resultStr;
            var k, tData;
            var self;
            self = this;
            resultStr = ''
            finalDefineInfo = finalDefineInfo
            console.log(finalDefineInfo)
            resultStr += Structure_Final_FS_Info['define_fragment'];
            //
            ['uniforms', 'varyings', 'vars', 'functions'].forEach(function (key) {
                tData = finalDefineInfo[key]
                // resultStr += '//define ' + key + ';\n'
                var tN;
                tN = ';\n'
                if(key == 'functions') tN = '\n'
                for (k in tData) {  
                    if(resultStr.indexOf(tData[k])==-1) resultStr += tData[k] + tN
                 }
            })
            resultStr += 'void main(void) {\n';
            resultStr += '    //define headers;\n';
            //////////////////////////////////////////////////////////////////////
            ['DIFFUSE', 'NORMAL', 'SPECULAR'].forEach(function (v) {
                var tInput;
                tInput = self['structureBase']['input']
                if (tInput[v] && tInput[v]['from']) {
                    var tStr = '    vec4 texelColor_' + v + ' = ' + tInput[v]['from']['info']['sourceKey']
                    if (finalDefineInfo['headers'].indexOf(tStr) == -1) {
                        finalDefineInfo['headers'].push(tStr)
                    }
                }
            });
            finalDefineInfo['headers'].forEach(function (v) { resultStr += v + ';\n' })
            //////////////////////////////////////////////////////////////////////
            if (resultStr.indexOf('texelColor_DIFFUSE') == -1) resultStr += '    vec4 texelColor_DIFFUSE;\n'
            if (resultStr.indexOf('texelColor_NORMAL') == -1) resultStr += '    vec4 texelColor_NORMAL;\n'
            if (resultStr.indexOf('texelColor_SPECULAR') == -1) resultStr += '    vec4 texelColor_SPECULAR;\n'
            resultStr += Structure_Final_FS_Info['lightBase'];
            resultStr += '    //define bodys;\n'
            finalDefineInfo['bodys'].forEach(function (v) { resultStr += v + ';\n' })
            resultStr += '    //define footers;\n'
            finalDefineInfo['footers'].forEach(function (v) { resultStr += v + ';\n' })
            resultStr += Structure_Final_FS_Info['lightCalc'];
            resultStr += `
            
    finalColor = la + ld + ls;
    finalColor.a = texelColor_DIFFUSE.a;  
    gl_FragColor = finalColor;   
`
            resultStr += '}\n'
            return resultStr
        }
        index++
        console.log(this)
    }
    Object.freeze(Structure_Final)
})();