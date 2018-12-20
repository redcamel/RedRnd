'use strict';
var Structure_Add;
(function () {
    var index;
    var tVarKey;
    index = 0
    Structure_Add = function () {
        this['nodeType'] = 'Add'
        this['index'] = index
        this['structure'] = {
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
        this['parse'] = function () {
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
            var k, tData;
            var tInput1, tInput2, tOutput
       

           
            tInput1 = this['structure']['input']['INPUT1']
            tInput2 = this['structure']['input']['INPUT2']
            tOutput = this['structure']['output']['OUTPUT']
            console.log(this['define']['vars'])
            resutlStr = ''
            if (tInput1['from'] && tInput2['from']) {
                tOutput['dataType'] = tInput1['dataType']
            }else tOutput['dataType'] = null
            if(tOutput['dataType']){
                
                this['define']['vars'][tVarKey = 'OUTPUT_' + this['index']] = tOutput['dataType'] + ' ' + tVarKey
                this['define']['headers'].push('    ' + tVarKey + ' = ' + tInput1['from']['info']['sourceKey'] + ' + ' +tInput2['from']['info']['sourceKey'])
            }
          

          
            defineInfo = this['define']
            //
            tData = defineInfo['uniforms']
            resutlStr += '//define uniforms;\n'
            for (k in tData) {
                resutlStr += tData[k] + ';\n'
            }
            //
            tData = defineInfo['varyings']
            resutlStr += '//define varyings;\n'
            for (k in tData) {
                resutlStr += tData[k] + ';\n'
            }
            //
            tData = defineInfo['vars']
            resutlStr += '//define vars;\n'
            for (k in tData) {
                resutlStr += tData[k] + ';\n'
            }
            resutlStr += '//define headers;\n'
            defineInfo['headers'].forEach(function (v) { resutlStr += v + ';\n' })
            resutlStr += '//define bodys;\n'
            defineInfo['bodys'].forEach(function (v) { resutlStr += v + ';\n' })
            resutlStr += '//define footers;\n'
            defineInfo['footers'].forEach(function (v) { resutlStr += v + ';\n' })


            return resutlStr
        }
        index++
        console.log(this)
    }
    Object.freeze(Structure_Add)
})();