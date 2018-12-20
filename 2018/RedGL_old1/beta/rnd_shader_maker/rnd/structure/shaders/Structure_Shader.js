'use strict';
var Structure_Shader;
(function () {
    var index;
    index = 0
    Structure_Shader = function (shaderType) {
        var self;
        self = this
        this['index'] = index
        this['userDefineInfo'] = {
            COLOR: {
                type: 'range',
                min: 0,
                max: 1,
                step: 0.01,
                dataType:'float',
                data: {
                    r: 0.9,
                    g: 0.55,
                    b: 0.02,
                    a: 1.0
                },
                parser : function(){
                    self.makeFunc()
                }
            },
            MAX_ITER: {
                type: 'range',
                min: 1,
                max: 16,
                step: 1,
                dataType:'int',
                data: {
                    MAX_ITER: 4
                },
                parser : function(){
                    self.makeFunc()
                }
            }
        }
        this['structureBase'] = {
            output: {
                SHADER_TEST_OUTPUT: { dataType: 'vec4', to: {}, sourceKey: 'SHADER_TEST_OUTPUT_' + this['index'] }
            }
        }
        Structure_base.apply(this, ['ShaderTest1', shaderType])
        this['parse'] = function () {
            delete this['define_vertex']
            delete this['define_fragment']
            var tUVKey, tStructureBase;
            var tDefineData;
            var k;
            var tOutput
            var tVarKey;
            tStructureBase = this['structureBase']
            tDefineData = this['define_' + shaderType] = new Structure_define()
            tOutput = tStructureBase['output']['SHADER_TEST_OUTPUT']
            ///
            tDefineData['vars'][tVarKey = 'SHADER_TEST_OUTPUT_' + this['index']] = tOutput['dataType'] + ' ' + tVarKey
            this.makeFunc()
            for (var k in tStructureBase['functions']) {
                tDefineData['functions'][k] = tStructureBase['functions'][k]
            }
            ///
            tDefineData['headers'].push('    ' + tVarKey + ' = ' + `shaderTest_${this['index']}()`)
            return Structure_util.makeViewStr(tDefineData)
        }
        index++
        console.log(this)
    }
    Structure_Shader.prototype.makeFunc = function(){
        console.log('this',this)
        this['structureBase']['functions']['shaderTest_' + this['index']]  = `
        const int shaderTest_${this['index']}_MAX_ITER = ${this['userDefineInfo']['MAX_ITER']['data']['MAX_ITER']};
        vec4 shaderTest_${this['index']} (){
            vec2 v_texCoord = vScreenXY.xy/vSystemResolution  ;
            vec2 p =  (v_texCoord) * 8.0 ;
            vec2 i = p;
            float c = 1.0;
            float inten = .05;
            for (int n = 0; n < shaderTest_${this['index']}_MAX_ITER ; n++)
            {
            float t = vSystemTime * (2.0 - (3.0 / float(n+1)));
        
            i = p + vec2(cos(t - i.x) + sin(t + i.y),
            sin(t - i.y) + cos(t + i.x));
        
            c += 1.0/length(
            vec2(p.x / (sin(i.x+t)/inten),
            p.y / (cos(i.y+t)/inten)));
            }
            c /= float( shaderTest_${this['index']}_MAX_ITER );
            c = 1.5 - sqrt(c);
            vec4 texColor = vec4(
                ${this['userDefineInfo']['COLOR']['data']['r']},
                ${this['userDefineInfo']['COLOR']['data']['g']},
                ${this['userDefineInfo']['COLOR']['data']['b']},
                ${this['userDefineInfo']['COLOR']['data']['a']}
            );
            texColor.rgb *= (1.0/ (1.0 - (c + 0.05)));
            texColor.rgb *=  texColor.a;
            return texColor;
        }
                `
    }
    Object.freeze(Structure_Shader)
})();