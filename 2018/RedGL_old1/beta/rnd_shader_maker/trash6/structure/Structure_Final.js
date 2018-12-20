'use strict';
var Structure_Final;
(function () {
    var index;
    var tVarKey;
    index = 0
    Structure_Final = function () {
        this['nodeType'] = 'Final'
        this['index'] = index
        this['structure'] = {
            input: {
                DIFFUSE: {
                    dataType: 'vec4',
                    from: null
                },
                NORMAL: {
                    dataType: 'vec4',
                    from: null
                }
            },
            output: {}
        }
        this['parse'] = function (finalData) {
            var defineInfo;
            var resutlStr;
            var k, tData;
            resutlStr = ''
            defineInfo = finalData
            //
            tData = defineInfo['uniforms']
            // resutlStr += '//define uniforms;\n'
            for (k in tData) {
                resutlStr += tData[k] + ';\n'
            }
            //
            tData = defineInfo['varyings']
            // resutlStr += '//define varyings;\n'
            for (k in tData) {
                resutlStr += tData[k] + ';\n'
            }
            //
            tData = defineInfo['vars']
            // resutlStr += '//define vars;\n'
            for (k in tData) {
                resutlStr += tData[k] + ';\n'
            }
            console.log(defineInfo)
            resutlStr += 'void main(void) {\n';
            // resutlStr += '//define headers;\n'
            ///////////////////////////////////
            var self;
            self = this;
            ['DIFFUSE', 'NORMAL'].forEach(function (v) {
                console.log(v)
                if (self['structure']['input'][v] && self['structure']['input'][v]['from']) {
                    console.log(defineInfo['headers'])
                    console.log(self['structure']['input'][v]['from'])
                    var tStr = '    vec4 texelColor_' + v + ' = ' + self['structure']['input'][v]['from']['info']['sourceKey']
                    if (defineInfo['headers'].indexOf(tStr) == -1) {
                        defineInfo['headers'].push(tStr)
                    }
                    if (defineInfo['footers'].indexOf('    gl_FragColor = texelColor_' + v) == -1) {
                        defineInfo['footers'].push(
                            '    gl_FragColor = texelColor_' + v
                        )
                    }
                }
            });

            ///////////////////////////////////
            defineInfo['headers'].forEach(function (v) { resutlStr += v + ';\n' })
            // resutlStr += '//define bodys;\n'
            defineInfo['bodys'].forEach(function (v) { resutlStr += v + ';\n' })
            // resutlStr += '//define footers;\n'
            defineInfo['footers'].forEach(function (v) { resutlStr += v + ';\n' })
            resutlStr += '}\n'
            return resutlStr
        }
        this['compileInfo'] = new CompileInfo()
        index++
        console.log(this)
    }
    Object.freeze(Structure_Final)
})();