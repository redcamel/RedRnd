'use strict';
var Structure_Shader2;
(function () {
    var index;
    var tVarKey;
    index = 0
    Structure_Shader2 = function () {
        this['nodeType'] = 'ShaderTest2'
        this['index'] = index
        this['structureBase'] = {
            functions: {
                func_shaderTest2:
                    `
#define PI 3.14159265359
#define T (vSystemTime/2.)
vec3 ${this['nodeType']}_hsv2rgb_${this['index']} (vec3 c){
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);

}

vec4 ${this['nodeType']}_func_shaderTest2_${this['index']} (){
    vec2 position = (( gl_FragCoord.xy / vSystemResolution.xy ) - 1.0) +vTexcoord;
	position.x *= vSystemResolution.x / vSystemResolution.y;
    vec3 color = vec3(0.);
    for (float i = 0.; i < PI*2.; i += PI/17.5) {
		vec2 p = position - vec2(cos(i+T), sin(i+T)) * 0.25;
		vec3 col = ${this['nodeType']}_hsv2rgb_${this['index']}(vec3((i)/(PI*2.), 1., mod(i-T*3.,PI*2.)/PI));
		color += col * (1./1024.) / length(p);
    }
    return vec4(color,0.5);
}
`
            },
            output: {
                SHADER_TEST_OUTPUT: { dataType: 'vec4', to: {}, sourceKey: 'SHADER_TEST_OUTPUT_' + this['index'] }
            }
        }
        Structure_util.structureBaseFill(this['structureBase'])
        this['parse'] = function () {
            this['define_fragment'] = new Structure_define()
            var k, tData;
            var tOutput
            tOutput = this['structureBase']['output']['SHADER_TEST_OUTPUT']
            console.log(this['define_fragment']['vars'])
            this['define_fragment']['vars'][tVarKey = 'SHADER_TEST_OUTPUT_' + this['index']] = tOutput['dataType'] + ' ' + tVarKey
            for (var k in this['structureBase']['functions']) {
                this['define_fragment']['functions'][k] = this['structureBase']['functions'][k]
            }
            this['define_fragment']['headers'].push('    ' + tVarKey + ' = ' + `${this['nodeType']}_func_shaderTest2_${this['index']}()`)
            return Structure_util.makeViewStr(this['define_fragment'])
        }
        index++
        console.log(this)
    }
    Object.freeze(Structure_Shader2)
})();