'use strict';
var Structure_Final;
(function () {
    var index;
    var tVarKey;
    index = 0
    Structure_Final = function () {
        this['nodeType'] = 'Final'
        this['index'] = index
        this['structure'] = {
            input: {
                DIFFUSE: {
                    dataType: 'vec4',
                    from: null
                },
                NORMAL: {
                    dataType: 'vec4',
                    from: null
                },
                DISPLACEMENT: {
                    dataType: 'vec4',
                    from: null
                },
                SPECULAR: {
                    dataType: 'vec4',
                    from: null
                }
            },
            output: {}
        }
        this['parse'] = function (finalData) {
            var defineInfo;
            var resultStr;
            var k, tData;
            resultStr = ''
            defineInfo = finalData
            defineInfo['uniforms']['uSystemTime'] = 'uniform float uSystemTime'
            defineInfo['uniforms']['uSystemResolution'] = 'uniform vec2 uSystemResolution'
            resultStr += `
uniform int uUseNormalTexture; // 노말텍스쳐 사용여부
uniform int uUseSpecularTexture; // 노말텍스쳐 사용여부
varying vec3 vEyeVec;
varying vec3 vNormal;


// 암비안트
uniform vec4 uAmbientLightColor;

//디렉셔널 리스트
const int DIRETIONAL_MAX = 16;
uniform vec3 uDirectionnalLightDirection[DIRETIONAL_MAX];
uniform vec4 uDirectionnalLightColor[DIRETIONAL_MAX];
uniform int uDirectionalNum;

//포인트라이트
const int POINT_MAX = 16;
uniform vec4 uPointLightColor[POINT_MAX];      
uniform vec3 uPointLightPosition[POINT_MAX];
uniform float uPointLightRadius[POINT_MAX];
uniform int uPointNum;

uniform float uShininess;
// 변수정의
vec4 la; // 암비언트
vec4 ld; // 디퓨즈
vec4 ls; // 스페큘러
vec3 N; // 노말벡터의 노말라이징
vec3 L; // 라이트 디렉션의 노말라이징
vec3 R; // 입사각에대한 반사값
vec3 E; // 아이벡터

float lambertTerm; // 램버트값
float specular; // 스페큘러값
float specularTextureValue; // 스페큘러 텍스쳐의 컬러값(r)

vec3 pointDirection; // 방향            
float distanceLength; // 거리
float attenuation;  // 감쇄

vec4 finalColor; // 최종컬러값
`
            //
            tData = defineInfo['uniforms']
            resultStr += '//define uniforms;\n'
            for (k in tData) {
                resultStr += tData[k] + ';\n'
            }
            //
            tData = defineInfo['varyings']
            resultStr += '//define varyings;\n'
            for (k in tData) {
                resultStr += tData[k] + ';\n'
            }
            //
            tData = defineInfo['vars']
            resultStr += '//define vars;\n'
            for (k in tData) {
                resultStr += tData[k] + ';\n'
            }
            console.log(defineInfo)
            resultStr += 'void main(void) {\n';
            resultStr += '//define headers;\n'
            ///////////////////////////////////
            var self;
            self = this;

            ['DIFFUSE', 'NORMAL', 'SPECULAR'].forEach(function (v) {
                console.log(v)
                if (self['structure']['input'][v] && self['structure']['input'][v]['from']) {
                    console.log(defineInfo['headers'])
                    console.log(self['structure']['input'][v]['from'])
                    var tStr = '    vec4 texelColor_' + v + ' = ' + self['structure']['input'][v]['from']['info']['sourceKey']
                    if (defineInfo['headers'].indexOf(tStr) == -1) {
                        defineInfo['headers'].push(tStr)
                    }
                } else {

                }
            });
            ///////////////////////////////////
            resultStr += '//define headers;\n'
            defineInfo['headers'].forEach(function (v) { resultStr += v + ';\n' })
            if (resultStr.indexOf('texelColor_DIFFUSE') == -1) resultStr += 'vec4 texelColor_DIFFUSE;\n'
            if (resultStr.indexOf('texelColor_NORMAL') == -1) resultStr += 'vec4 texelColor_NORMAL;\n'
            if (resultStr.indexOf('texelColor_SPECULAR') == -1) resultStr += 'vec4 texelColor_SPECULAR;\n'
            resultStr += `

///////////////////////////////////
// 쉐이더 추가테스트
vec2 v_texCoord = gl_FragCoord.xy/uSystemResolution +vTexcoord;
vec2 p =  (v_texCoord) * 8.0 ;
vec2 i = p;
float c = 1.0;
float inten = .05;
const int MAX_ITER = 4;
for (int n = 0; n < MAX_ITER; n++)
{
    float t = uSystemTime * (2.0 - (3.0 / float(n+1)));

    i = p + vec2(cos(t - i.x) + sin(t + i.y),
    sin(t - i.y) + cos(t + i.x));

    c += 1.0/length(
        vec2(p.x / (sin(i.x+t)/inten),
    p.y / (cos(i.y+t)/inten)));
}
c /= float(MAX_ITER);
c = 1.5 - sqrt(c);
vec4 texColor = vec4(0.10, 0.55, 0.02, 1.);
texColor.rgb *= (1.0/ (1.0 - (c + 0.05)));

texColor.rgb *= 0.2;
texelColor_DIFFUSE.rgb +=  texColor.rgb;
///////////////////////////////////
///////////////////////////////////
// 쉐이더 추가테스트


///////////////////////////////////



la = uAmbientLightColor;
ld = vec4(0.0, 0.0, 0.0, 1.0);
ls = vec4(0.0, 0.0, 0.0, 1.0);

if(texelColor_DIFFUSE.a==0.0) discard;
E = normalize(vEyeVec);

if(uUseNormalTexture == 1) N = normalize(2.0 * (normalize(vNormal)+texelColor_NORMAL.rgb - 0.5));
else N = normalize(vNormal);

specularTextureValue = 1.0;
if(uUseSpecularTexture == 1) specularTextureValue = texelColor_SPECULAR.r ;

vec4 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
`
            resultStr += '//define bodys;\n'
            defineInfo['bodys'].forEach(function (v) { resultStr += v + ';\n' })
            resultStr += '//define footers;\n'
            defineInfo['footers'].forEach(function (v) { resultStr += v + ';\n' })
            resultStr += `
if(uDirectionalNum>0){
    for(int i=0;i<DIRETIONAL_MAX;i++){
        if(i== uDirectionalNum) break;
        L = normalize(uDirectionnalLightDirection[i]);
        lambertTerm =dot(N,-L);
        if(lambertTerm > 0.0){
            ld += uDirectionnalLightColor[i] * texelColor_DIFFUSE * lambertTerm;
            R = reflect(L, N);
            specular = pow( max(dot(R, -L), 0.0), uShininess);
            ls +=  specularLightColor * specular * specularTextureValue;
        }
    }
}

for(int i=0;i<POINT_MAX;i++){
    if(i== uPointNum) break;
    pointDirection = -uPointLightPosition[i] -vEyeVec;
    distanceLength = length(pointDirection);
    if(uPointLightRadius[i]> abs(distanceLength)){
        attenuation = 1.0 / (0.01 + 0.01 * distanceLength + 0.02 * distanceLength * distanceLength); 
        L = normalize(pointDirection);
        lambertTerm = dot(N,-L);
        if(lambertTerm > 0.0){
            ld += uPointLightColor[i] * texelColor_DIFFUSE * lambertTerm*attenuation;
            R = reflect(L, N);
            specular = pow( max(dot(R, -L), 0.0), uShininess);
            ls +=  specularLightColor * specular * attenuation * specularTextureValue  ;
        }
    }
}           

finalColor = la + ld + ls;
finalColor.a = texelColor_DIFFUSE.a;  
gl_FragColor = finalColor;   
`
            resultStr += '}\n'
            return resultStr
        }
        
        index++
        console.log(this)
    }
    Object.freeze(Structure_Final)
})();