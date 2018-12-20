'use strict';
var Structure_Add;
(function () {
    var index;
    var tVarKey;
    index = 0
    Structure_Add = function () {
        this['nodeType'] = 'Add'
        this['index'] = index
        this['structureBase'] = {
            input: {
                INPUT1: {
                    dataType: null,
                    from: null
                },
                INPUT2: {
                    dataType: null,
                    from: null
                }
            },
            output: {
                OUTPUT: { dataType: null, to: {}, sourceKey: 'OUTPUT_' + this['index'] }
            }
        }
        Structure_util.structureBaseFill(this['structureBase'])
        this['parse'] = function () {
            this['define_fragment'] = new Structure_define()
            var k, tData;
            var tInput1, tInput2, tOutput
            tInput1 = this['structureBase']['input']['INPUT1']
            tInput2 = this['structureBase']['input']['INPUT2']
            tOutput = this['structureBase']['output']['OUTPUT']
            console.log(this['define_fragment']['vars'])
            if (tInput1['from'] && tInput2['from']) {
                tOutput['dataType'] = tInput1['dataType']
            } else tOutput['dataType'] = null
            if (tOutput['dataType']) {
                this['define_fragment']['vars'][tVarKey = 'OUTPUT_' + this['index']] = tOutput['dataType'] + ' ' + tVarKey
                this['define_fragment']['headers'].push('    ' + tVarKey + ' = ' + tInput1['from']['info']['sourceKey'] + ' + ' + tInput2['from']['info']['sourceKey'])
            }
            return Structure_util.makeViewStr(this['define_fragment'])
        }
        index++
        console.log(this)
    }
    Object.freeze(Structure_Add)
})();