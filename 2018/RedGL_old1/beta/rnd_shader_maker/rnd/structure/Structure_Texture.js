'use strict';
var Structure_Texture;
(function () {
    var index;
  
    index = 0
    Structure_Texture = function (shaderType) {
        this['index'] = index
        this['structureBase'] = {
            textureInfo: {
                textureUniformKey: shaderType =='vertex' ? 'uDisplacementTexture': 'uDiffuseTexture',
                textureIndex: shaderType =='vertex' ? RedTextureIndex.DISPLACEMENT : RedTextureIndex.DIFFUSE,
                varStr: 'textureColor_' + this['index'],
                src: 'images/noImage.jpg'
            },
            input: {
                UV: {
                    dataType: 'vec2',
                    from: null,
                    shaderType: shaderType
                }
            },
            output: {
                COLOR: { dataType: 'vec4', to: {}, sourceKey: 'textureColor_' + this['index'] },
                R: { dataType: 'float', to: {}, sourceKey: 'textureColor_' + this['index'] + '.r' },
                G: { dataType: 'float', to: {}, sourceKey: 'textureColor_' + this['index'] + '.g' },
                B: { dataType: 'float', to: {}, sourceKey: 'textureColor_' + this['index'] + '.b' },
                A: { dataType: 'float', to: {}, sourceKey: 'textureColor_' + this['index'] + '.a' }
            }
        }
        Structure_base.apply(this, ['Texture', shaderType])
        this['parse'] = function () {
            delete this['define_vertex']
            delete this['define_fragment']
            var tUniformKey, tVaryingKey, tVarKey;
            var tUVKey, tStructureBase;
            var tDefineData;
            tStructureBase = this['structureBase']
            tDefineData = this['define_' + shaderType] = new Structure_define()
            tDefineData['uniforms'][tUniformKey = tStructureBase['textureInfo']['textureUniformKey']] = 'uniform sampler2D ' + tUniformKey
            tDefineData['textureInfo'][tUniformKey] = tStructureBase['textureInfo']
            tDefineData['varyings'][tVaryingKey = 'vTexcoord'] = 'varying vec2 ' + tVaryingKey
            tUVKey = tVaryingKey
            tDefineData['vars'][tVarKey = 'textureColor_' + this['index']] = 'vec4 ' + tVarKey
            // 인풋 UV가있으면 바라보는 UV값을 변경해야함
            if (tStructureBase['input']['UV']['from']) {
                tDefineData['vars'][tVarKey = 'inputUV_' + this['index']] = 'vec2 ' + tVarKey
                tUVKey = tVarKey
                tDefineData['headers'].push(tUVKey + ' = ' + tVaryingKey)
            }
            var tUseKeyMap;
            tUseKeyMap = {}
            if (this['shaderType'] == 'vertex') {
                tUseKeyMap[RedTextureIndex.DISPLACEMENT] = 'if(uUseDisplacementTexture == 1)'
                tUseKeyMap[RedTextureIndex.ETC_VERTEX_1] = 'if(uUseEtcVertexTexture1 == 1)'
                tUseKeyMap[RedTextureIndex.ETC_VERTEX_2] = 'if(uUseEtcVertexTexture2 == 1)'
            } else {
                tUseKeyMap[RedTextureIndex.NORMAL] = 'if(uUseNormalTexture == 1)'
                tUseKeyMap[RedTextureIndex.SPECULAR] = 'if(uUseSpecularTexture == 1)'
                tUseKeyMap[RedTextureIndex.DIFFUSE] = ''
                tUseKeyMap[RedTextureIndex.ETC_FRAGMENT_1] = 'if(uUseEtcFragmentTexture1 == 1)'
                tUseKeyMap[RedTextureIndex.ETC_FRAGMENT_2] = 'if(uUseEtcFragmentTexture2 == 1)'
            }
            tDefineData['headers'].push(`    ${tUseKeyMap[tStructureBase['textureInfo']['textureIndex']]} ` + tVarKey + ' = texture2D(' + tUniformKey + ',' + tUVKey + ')')
            return Structure_util.makeViewStr(tDefineData)
        }
        index++
        console.log(this)
    }
    Object.freeze(Structure_Texture)
})();