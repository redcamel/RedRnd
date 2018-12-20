'use strict';
var Structure_Test;
(function () {
    var index;
    var tVarKey;
    index = 0
    Structure_Test = function () {
        this['nodeType'] = 'TypeTest'
        this['index'] = index
        this['structure'] = {
            input: {
                FLOAT_TEST: {
                    dataType: 'float',
                    from: null
                },
                INT_TEST: {
                    dataType: 'int',
                    from: null
                },
                VEC2_TEST: {
                    dataType: 'vec2',
                    from: null
                },
                VEC3_TEST: {
                    dataType: 'vec3',
                    from: null
                },
                VEC4_TEST: {
                    dataType: 'vec4',
                    from: null
                }
            },
            output: {
                FLOAT_TEST: { dataType: 'float', to: {}, sourceKey: 'FLOAT_TEST_' + this['index'] },
                INT_TEST: { dataType: 'int', to: {} , sourceKey: 'INT_TEST_' + this['index']},
                VEC2_TEST: { dataType: 'vec2', to: {}, sourceKey: 'VEC2_TEST_' + this['index'] },
                VEC3_TEST: { dataType: 'vec3', to: {}, sourceKey: 'VEC3_TEST_' + this['index'] },
                VEC4_TEST: { dataType: 'vec4', to: {} , sourceKey: 'VEC4_TEST_' + this['index']}
            }
        }
        this['parse'] = function(){
            this['define'] = {
                uniforms: {},
                varyings: {},
                vars: {},
                headers: [],
                bodys: [],
                footers: []
            }
            var defineInfo;
            var resutlStr;
            var k,tData;
            var tInput,tOutput
            resutlStr = ''
            for(var k in this['structure']['output']){
                tInput = this['structure']['input'][k]
                tOutput = this['structure']['output'][k]
                console.log(this['define']['vars'])
                this['define']['vars'][tVarKey = k + '_' + this['index']] = tOutput['dataType'] + ' ' + tVarKey
                    if (tInput['from']) {
                    this['define']['headers'].push('    ' + tVarKey + ' = ' + tInput['from']['info']['sourceKey'])
                }
            }
            resutlStr = ''
            defineInfo = this['define']
            //
            tData = defineInfo['uniforms']
            resutlStr += '//define uniforms;\n'
            for(k in tData){
                resutlStr += tData[k] + ';\n'
            }
            //
            tData = defineInfo['varyings']
            resutlStr += '//define varyings;\n'
            for(k in tData){
                resutlStr += tData[k] + ';\n'
            }
            //
            tData = defineInfo['vars']
            resutlStr += '//define vars;\n'
            for(k in tData){
                resutlStr += tData[k] + ';\n'
            }
            resutlStr += '//define headers;\n'
            defineInfo['headers'].forEach(function(v){ resutlStr += v+';\n' })
            resutlStr += '//define bodys;\n'
            defineInfo['bodys'].forEach(function(v){ resutlStr += v+';\n' })
            resutlStr += '//define footers;\n'
            defineInfo['footers'].forEach(function(v){ resutlStr += v+';\n' })
            return resutlStr
        }
        
        index++
        console.log(this)
    }
    Object.freeze(Structure_Test)
})();