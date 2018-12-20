'use strict';
var Structure_Test;
(function () {
    var index;
    var tVarKey;
    index = 0
    Structure_Test = function () {
        this['nodeType'] = 'TypeTest'
        this['index'] = index
        this['structureBase'] = {
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
                INT_TEST: { dataType: 'int', to: {}, sourceKey: 'INT_TEST_' + this['index'] },
                VEC2_TEST: { dataType: 'vec2', to: {}, sourceKey: 'VEC2_TEST_' + this['index'] },
                VEC3_TEST: { dataType: 'vec3', to: {}, sourceKey: 'VEC3_TEST_' + this['index'] },
                VEC4_TEST: { dataType: 'vec4', to: {}, sourceKey: 'VEC4_TEST_' + this['index'] }
            }
        }
        Structure_util.structureBaseFill(this['structureBase'])
        this['parse'] = function () {
            this['define_fragment'] = new Structure_define()
            var k, tData;
            var tInput, tOutput
            for (var k in this['structureBase']['output']) {
                tInput = this['structureBase']['input'][k]
                tOutput = this['structureBase']['output'][k]
                console.log(this['define_fragment']['vars'])
                this['define_fragment']['vars'][tVarKey = k + '_' + this['index']] = tOutput['dataType'] + ' ' + tVarKey
                if (tInput['from']) {
                    this['define_fragment']['headers'].push('    ' + tVarKey + ' = ' + tInput['from']['info']['sourceKey'])
                }
            }

            return Structure_util.makeViewStr(this['define_fragment'])
        }

        index++
        console.log(this)
    }
    Object.freeze(Structure_Test)
})();