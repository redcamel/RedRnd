'use strict';
var Structure_Shader2;
(function () {
    var index;
    index = 0
    Structure_Shader2 = function (shaderType) {
        var self;
        self = this
        this['index'] = index
        this['userDefineInfo'] = {
            TILE: {
                type: 'range',
                min: 0,
                max: 30,
                step: 0.01,
                dataType:'float',
                data: {
                    TILE_UV: 5.0
                },
                parser : function(){
                    self.makeFunc()
                }
            }, 
            SPEED: {
                type: 'range',
                min: 0,
                max: 10,
                step: 0.01,
                dataType:'float',
                data: {
                    SPEED: 1.0
                },
                parser : function(){
                    self.makeFunc()
                }
            }, 
            TILE_MUL: {
                type: 'range',
                min: 0,
                max: 2,
                step: 0.01,
                dataType:'float',
                data: {
                    TILE_X_MUL: 0.15,
                    TILE_Y_MUL: 0.15
                },
                parser : function(){
                    self.makeFunc()
                }
            }, 
            COLOR: {
                type: 'range',
                min: 0,
                max: 1,
                step: 0.01,
                dataType:'float',
                data: {
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
        Structure_base.apply(this, ['ShaderTest2', shaderType])
        this['parse'] = function () {
            delete this['define_vertex']
            delete this['define_fragment']
            var tVarKey;
            var tUVKey, tStructureBase;
            var tDefineData;
            var k;
            var tOutput
            tStructureBase = this['structureBase']
            tDefineData = this['define_' + shaderType] = new Structure_define()
            tOutput = tStructureBase['output']['SHADER_TEST_OUTPUT']
            console.log(tDefineData['vars'])
            tDefineData['vars'][tVarKey = 'SHADER_TEST_OUTPUT_' + this['index']] = tOutput['dataType'] + ' ' + tVarKey

            this.makeFunc()
            for (var k in tStructureBase['functions']) {
                tDefineData['functions'][k] = tStructureBase['functions'][k]
            }
            tDefineData['headers'].push('    ' + tVarKey + ' = ' + `shaderTest2_${this['index']}()`)
            return Structure_util.makeViewStr(tDefineData)
        }
        index++
        console.log(this)
    }
    Structure_Shader2.prototype.makeFunc = function(){
        this['structureBase']['functions']['shaderTest2_'+this['index']] =
            `
#define PI 3.14159265359
const int shaderTest2_${this['index']}_MAX_ITER = ${this['userDefineInfo']['MAX_ITER']['data']['MAX_ITER']};
vec4 shaderTest2_${this['index']} (){
    vec2 p=( ${this['userDefineInfo']['TILE']['data']['TILE_UV']} * vScreenXY.xy/vSystemResolution );
    float tSpeed;
    tSpeed = vSystemTime * ${this['userDefineInfo']['SPEED']['data']['SPEED']};
    for(int i=1;i<shaderTest2_${this['index']}_MAX_ITER ;i++)
    {
        vec2 newp=p;
        float ii = float(i);  
        newp.x+= ${this['userDefineInfo']['TILE_MUL']['data']['TILE_X_MUL']} /ii*sin(ii*PI*p.y+ tSpeed *.01+cos(( tSpeed /(10.*ii))*ii));
        newp.y+= ${this['userDefineInfo']['TILE_MUL']['data']['TILE_Y_MUL']} /ii*cos(ii*PI*p.x+ tSpeed *.01+sin(( tSpeed /(10.*ii))*ii));
        p=newp;
    }
    vec4 texColor = vec4(
        cos(p.x+p.y+2.+ tSpeed )+.4, 
        sin(p.x+p.y+3.+ tSpeed )*.5+.2, 
        (sin(p.x+p.y+4.+ tSpeed )+cos(p.x+p.y+12.+ tSpeed ))*.02+.05, 
        ${this['userDefineInfo']['COLOR']['data']['a']}
    );
    texColor.rgb *=  texColor.a;
    return texColor;
    
}
`
    }
    Object.freeze(Structure_Shader2)
})();