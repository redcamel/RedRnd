'use strict';
var Structure_Final_VS_Info;
(function () {
    Structure_Final_VS_Info = {
        define_vertex :
            `
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTexcoord;
// 기본유니폼
uniform mat4 uMVMatrix;
uniform mat4 uNMatrix;
uniform mat4 uCameraMatrix;            
uniform mat4 uPMatrix;
uniform vec4 uAtlascoord;
uniform sampler2D uDisplacementTexture; // DisplacementTexture
uniform int uUseDisplacementTexture; // DisplacementTexture 사용여부
uniform int uUseEtcVertexTexture1; 
uniform int uUseEtcVertexTexture2; 

uniform float uSystemTime;
uniform vec2 uSystemResolution;

// 베어링들
varying vec2 vTexcoord;  

varying vec3 vEyeVec;
varying vec3 vNormal;
vec4 vertexPositionEye4;

varying float vSystemTime;
varying vec2 vSystemResolution;
varying vec2 vScreenXY ;
const vec4 nullVec4 = vec4(0.0);
        `
    }
    Object.freeze(Structure_Final_VS_Info)
})();