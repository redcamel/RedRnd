'use strict';
var Structure_Texture;
(function () {
    var index;
    var tUniformKey,tVaryingKey,tVarKey;
    index = 0
    Structure_Texture = function () {
        this['nodeType'] = 'Texture'
        this['index'] = index
        this['structure'] = {
            input: {
                UV: {
                    dataType: 'vec2',
                    from: null
                }
            },
            output: {
                COLOR: { dataType: 'vec4', to: {}, sourceKey : 'textureColor_'+this['index'] },
                R: { dataType: 'float', to: {}, sourceKey : 'textureColor_'+this['index']+'.r' },
                G: { dataType: 'float', to: {}, sourceKey : 'textureColor_'+this['index']+'.g' },
                B: { dataType: 'float', to: {}, sourceKey : 'textureColor_'+this['index']+'.b' },
                A: { dataType: 'float', to: {}, sourceKey : 'textureColor_'+this['index']+'.a' }
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
            var tUVKey;
            this['define']['uniforms'][tUniformKey = 'uTexture_' + this['index']] = 'uniform sampler2D ' + tUniformKey
            this['define']['varyings'][tVaryingKey = 'vTexcoord'] = 'varying vec2 ' + tVaryingKey
            tUVKey = tVaryingKey
            this['define']['vars'][tVarKey = 'textureColor_' + this['index']] = 'vec4 ' + tVarKey
            // 인풋 UV가있으면 바라보는 UV값을 변경해야함
            if(this['structure']['input']['UV']['from']){
               this['define']['vars'][tVarKey = 'inputUV_' + this['index']] = 'vec2 ' + tVarKey
               tUVKey = tVarKey
               this['define']['headers'].push(tUVKey + ' = ' + tVaryingKey)     
            }
            this['define']['headers'].push('    '+tVarKey + ' = texture2D(' + tUniformKey + ','+tUVKey+')')
            var defineInfo;
            var resutlStr;
            var k,tData;
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
            console.log(defineInfo)
            resutlStr += '//define headers;\n'
            defineInfo['headers'].forEach(function(v){ resutlStr += v+';\n' })
            resutlStr += '//define bodys;\n'
            defineInfo['bodys'].forEach(function(v){ resutlStr += v+';\n' })
            resutlStr += '//define footers;\n'
            defineInfo['footers'].forEach(function(v){ resutlStr += v+';\n' })
            return resutlStr
        }

        console.log('텍스쳐 기본정보',this['define'])
        
        index++
        console.log(this)
    }
    Object.freeze(Structure_Texture)
})();