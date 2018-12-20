'use strict';
var Structure_Add;
(function () {
    var index;
    var tVarKey;
    index = 0
    Structure_Add = function (shaderType) {
        this['calcItemYn'] = true
        this['index'] = index
        this['structureBase'] = {
            input: {
                INPUT1: { dataType: null, from: null },
                INPUT2: { dataType: null, from: null }
            },
            output: {
                OUTPUT: { dataType: null, to: {}, sourceKey: 'OUTPUT_' + this['index'] }
            }
        }
        Structure_base.apply(this, ['Add', shaderType])
        this['parse'] = function () {
            delete this['define_vertex']
            delete this['define_fragment']
            var tUVKey, tStructureBase;
            var tDefineData;
            var tInput1, tInput2, tOutput
            tStructureBase = this['structureBase']
            tDefineData = this['define_' + shaderType] = new Structure_define()

            tInput1 = tStructureBase['input']['INPUT1']
            tInput2 = tStructureBase['input']['INPUT2']
            tOutput = tStructureBase['output']['OUTPUT']
            console.log(tDefineData['vars'])
            if (tInput1['from'] && tInput2['from']) {
                tOutput['dataType'] = tInput1['dataType']
            } else tOutput['dataType'] = null
            if (tOutput['dataType']) {
                tDefineData['vars'][tVarKey = 'OUTPUT_' + this['index']] = tOutput['dataType'] + ' ' + tVarKey
                tDefineData['headers'].push('    ' + tVarKey + ' = ' + tInput1['from']['info']['sourceKey'] + ' + ' + tInput2['from']['info']['sourceKey'])
            }
            return Structure_util.makeViewStr(tDefineData)
        }
        index++
        console.log(this)
    }
    Object.freeze(Structure_Add)
})();