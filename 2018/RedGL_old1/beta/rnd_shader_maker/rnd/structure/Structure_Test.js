'use strict';
var Structure_Test;
(function () {
    var index;
    index = 0
    Structure_Test = function (shaderType) {
        this['index'] = index
        this['structureBase'] = {
            input: {
                FLOAT_TEST: { dataType: 'float', from: null },
                INT_TEST: { dataType: 'int', from: null },
                VEC2_TEST: { dataType: 'vec2', from: null },
                VEC3_TEST: { dataType: 'vec3', from: null },
                VEC4_TEST: { dataType: 'vec4', from: null }
            },
            output: {
                FLOAT_TEST: { dataType: 'float', to: {}, sourceKey: 'FLOAT_TEST_' + this['index'] },
                INT_TEST: { dataType: 'int', to: {}, sourceKey: 'INT_TEST_' + this['index'] },
                VEC2_TEST: { dataType: 'vec2', to: {}, sourceKey: 'VEC2_TEST_' + this['index'] },
                VEC3_TEST: { dataType: 'vec3', to: {}, sourceKey: 'VEC3_TEST_' + this['index'] },
                VEC4_TEST: { dataType: 'vec4', to: {}, sourceKey: 'VEC4_TEST_' + this['index'] }
            }
        }
        Structure_base.apply(this, ['TypeTest', shaderType])

        this['parse'] = function () {
            delete this['define_vertex']
            delete this['define_fragment']
            var tUVKey, tStructureBase;
            var tDefineData;
            var tVarKey;
            tStructureBase = this['structureBase']
            tDefineData = this['define_' + shaderType] = new Structure_define()
            var k, tData;
            var tInput, tOutput
            for (var k in tStructureBase['output']) {
                tInput = tStructureBase['input'][k]
                tOutput = tStructureBase['output'][k]
                console.log(tDefineData['vars'])
                tDefineData['vars'][tVarKey = k + '_' + this['index']] = tOutput['dataType'] + ' ' + tVarKey
                if (tInput['from']) {
                    tDefineData['headers'].push('    ' + tVarKey + ' = ' + tInput['from']['info']['sourceKey'])
                }
            }

            return Structure_util.makeViewStr(tDefineData)
        }

        index++
        console.log(this)
    }
    Object.freeze(Structure_Test)
})();