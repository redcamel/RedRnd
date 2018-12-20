precision mediump float;

uniform sampler2D uDiffuseTexture; // uDiffuseTexture
uniform sampler2D uNormalTexture; // uNormalTexture
uniform sampler2D uSpecularTexture; // uSpecularTexture
uniform samplerCube uReflectionTexture; // uReflectionTexture
uniform samplerCube uRefractionTexture; // uRefractionTexture
uniform int uUseDiffuseTexture; // uDiffuseTexture 사용여부
uniform int uUseNormalTexture; // uNormalTexture 사용여부
uniform int uUseSpecularTexture; // uSpecularTexture 사용여부
uniform int uUseReflectionTexture; // uReflectionTexture 사용여부
uniform int uUseRefractionTexture; // uRefractionTexture 사용여부
uniform float uRefractionPower; // 굴절강도
uniform float uReflectionPower; // 반사강도
uniform float uNormalPower; // 노멀강도
uniform float uSpecularPower; // 스페큘러강도

varying vec2 vTexcoord;
varying vec3 vEyeVec;
varying vec3 vNormal;
varying vec3 vReflectionCubeCoord;  
varying vec3 vRefractionCubeCoord;  
varying vec2 vSystemResolution;  

// 암비안트
uniform vec4 uAmbientLightColor;

//디렉셔널 리스트
const int DIRETIONAL_MAX = 5;
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
vec4 texelColor; // 디퓨즈텍스쳐컬러
vec4 reflectionColor;
vec4 refractionColor;
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
void main(void) {
    la = uAmbientLightColor;
    ld = vec4(0.0, 0.0, 0.0, 1.0);
    ls = vec4(0.0, 0.0, 0.0, 1.0);

    if(uUseDiffuseTexture == 1) texelColor = texture2D(uDiffuseTexture, vTexcoord);
    // if(texelColor.a ==0.0) discard;
    E = normalize(vEyeVec);
    N = normalize(vNormal);
    if(uUseNormalTexture == 1) {
        N = normalize(2.0 * (N + texture2D(uNormalTexture, vTexcoord).rgb  - 0.5));
        N.xy *= uNormalPower;
    }

    specularTextureValue = 1.0;
    if(uUseSpecularTexture == 1) specularTextureValue = texture2D(uSpecularTexture, vTexcoord).r * uSpecularPower ;

    if(uUseReflectionTexture == 1) {
        reflectionColor = textureCube(uReflectionTexture, vReflectionCubeCoord+N);
        reflectionColor *= uReflectionPower;
        texelColor = texelColor  + reflectionColor ;
    }

    if(uUseRefractionTexture == 1) {
        refractionColor = textureCube(uRefractionTexture, vRefractionCubeCoord+N);
        refractionColor *= uRefractionPower;
        texelColor = texelColor  + refractionColor ;
    }

    vec4 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
    if(uDirectionalNum>0){
        for(int i=0;i<DIRETIONAL_MAX;i++){
            if(i== uDirectionalNum) break;
            L = normalize(uDirectionnalLightDirection[i]);
            lambertTerm =dot(N,-L);
            if(lambertTerm > 0.0){
                ld += uDirectionnalLightColor[i] * texelColor * lambertTerm;
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
                ld += uPointLightColor[i] * texelColor * lambertTerm*attenuation;
                R = reflect(L, N);
                specular = pow( max(dot(R, -L), 0.0), uShininess);
                ls +=  specularLightColor * specular * attenuation * specularTextureValue;
            }
        }
    }           
    finalColor = la + ld + ls; 
    finalColor.a = texelColor.a;
    gl_FragColor = finalColor;   
}