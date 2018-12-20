attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTexcoord;
// 기본유니폼
uniform mat4 uMVMatrix;
uniform mat4 uNMatrix;
uniform mat4 uCameraMatrix;   
uniform vec3 uCameraPosition;            
uniform mat4 uPMatrix;
uniform vec4 uAtlascoord;
uniform sampler2D uDisplacementTexture; // DisplacementTexture
uniform int uUseDisplacementTexture; // DisplacementTexture 사용여부
uniform float uDisplacementPower; // Displacement 강도
uniform float uRefractionRatio; // 굴절강도
uniform vec2 uSystemResolution; 
// 베어링들
varying vec2 vTexcoord;  
varying vec3 vReflectionCubeCoord;  
varying vec3 vRefractionCubeCoord;  
varying vec2 vSystemResolution;  



varying vec3 vEyeVec;
varying vec3 vNormal;
vec3 N;
vec4 vertexPositionEye4;
vec4 cubeNormal;

void main(void) {
    vertexPositionEye4 = uMVMatrix * vec4(aVertexPosition, 1.0);
    vTexcoord = uAtlascoord.xy + aTexcoord*uAtlascoord.zw;
    vNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0)); 
    vSystemResolution = uSystemResolution;
 
    if(uUseDisplacementTexture == 1) {
        N = normalize(vNormal);
        vertexPositionEye4.xyz += N * texture2D(uDisplacementTexture,vTexcoord).x * uDisplacementPower;
        vNormal += N;
    }
    vEyeVec = -vertexPositionEye4.xyz;
    cubeNormal =  uMVMatrix *vec4(aVertexPosition, 0.0);
    vReflectionCubeCoord = -cubeNormal.xyz;
    vRefractionCubeCoord = refract( ((vec4( uCameraPosition-  vertexPositionEye4.xyz, 1.0) * uMVMatrix ).xyz)  , -vNormal, uRefractionRatio);
    // 포지션 결정
    gl_Position = uPMatrix * uCameraMatrix *  vertexPositionEye4;

    
}