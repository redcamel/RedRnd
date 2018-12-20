'use strict';
//TODO: 최종적으로는 이놈들도 개별로 다빠질수있으면 좋겠다..
var Structure_Final_FS_Info;
(function () {
    Structure_Final_FS_Info = {
        define_fragment:
        `
precision lowp float;
uniform sampler2D uDiffuseTexture; // 디뷰프텍스쳐
uniform sampler2D uNormalTexture; // 노말텍스쳐
uniform sampler2D uSpecularTexture; // 노말텍스쳐
uniform int uUseNormalTexture; // 노말텍스쳐 사용여부
uniform int uUseSpecularTexture; // 스페큘러텍스쳐 사용여부
varying vec3 vEyeVec;
varying vec3 vNormal;
varying vec2 vTexcoord;
varying float vSystemTime;
varying vec2 vSystemResolution;

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
float lightDistanceLength; // 거리
float attenuation;  // 감쇄
vec4 nullVec4 = vec4(0.0);
vec4 finalColor; // 최종컬러값
`,
        lightBase:
            `
    // 라이트 기본컬러세팅
    la = uAmbientLightColor;
    ld = vec4(0.0, 0.0, 0.0, 1.0);
    ls = vec4(0.0, 0.0, 0.0, 1.0);

    // if(texelColor_DIFFUSE.a == 0.0) discard;
    E = normalize(vEyeVec);

    // 노멀텍스쳐가 있을경우 노말 변경
    if(uUseNormalTexture == 1 || texelColor_NORMAL != nullVec4) N = normalize(2.0 * (normalize(vNormal)+texelColor_NORMAL.rgb - 0.5));
    else N = normalize(vNormal);

    // 스페큘러값 설정
    specularTextureValue = 1.0;
    // 스페큘러텍스쳐가 있을경우 스페큘러값 변경
    if(uUseSpecularTexture == 1 || texelColor_SPECULAR != nullVec4) specularTextureValue = texelColor_SPECULAR.r ;
    // 재질의 스페큘러 컬러값 설정
    vec4 specularColor = vec4(1.0, 1.0, 1.0, 1.0);
`,
        lightCalc:
            `   
    // 방향광 계산
    if(uDirectionalNum > 0){
        for(int i=0; i<DIRETIONAL_MAX; i++){
            if(i == uDirectionalNum) break;
            L = normalize(uDirectionnalLightDirection[i]);
            lambertTerm = dot(N, -L);
            if(lambertTerm > 0.0){
                ld += uDirectionnalLightColor[i] * texelColor_DIFFUSE * lambertTerm;
                R = reflect(L, N);
                specular = pow( max(dot(R, -L), 0.0), uShininess);
                ls +=  specularColor * specular * specularTextureValue;
            }
        }
    }
    // 포인트광 계산
    for(int i=0; i<POINT_MAX; i++){
        if(i == uPointNum) break;
        pointDirection = -uPointLightPosition[i] -vEyeVec;
        lightDistanceLength = length(pointDirection);
        if(uPointLightRadius[i] > abs(lightDistanceLength)){
            attenuation = 1.0 / (0.01 + 0.01 * lightDistanceLength + 0.02 * lightDistanceLength * lightDistanceLength); 
            L = normalize(pointDirection);
            lambertTerm = dot(N, -L);
            if(lambertTerm > 0.0){
                ld += uPointLightColor[i] * texelColor_DIFFUSE * lambertTerm*attenuation;
                R = reflect(L, N);
                specular = pow( max(dot(R, -L), 0.0), uShininess);
                ls +=  specularColor * specular * attenuation * specularTextureValue;
            }
        }
    }
`
    }
    Object.freeze(Structure_Final_FS_Info)
})();