'use strict';
var Structure_Final_VS_Info;
(function () {
    Structure_Final_VS_Info = {
        draft:
        `attribute vec3 aVertexPosition;
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
        
        uniform float uSystemTime;
        uniform vec2 uSystemResolution;

        // 베어링들
        varying vec2 vTexcoord;  
        
        varying vec3 vEyeVec;
        varying vec3 vNormal;
        vec4 vertexPositionEye4;

        varying float vSystemTime;
        varying vec2 vSystemResolution;
       
        void main(void) {
            vertexPositionEye4 = uMVMatrix * vec4(aVertexPosition, 1.0);
            vTexcoord = uAtlascoord.xy + aTexcoord*uAtlascoord.zw;
            vNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0)); 
            vEyeVec = -vertexPositionEye4.xyz;
            if(uUseDisplacementTexture == 1) {
                vertexPositionEye4.xyz += normalize(vNormal) * texture2D(uDisplacementTexture,vTexcoord).x;
            }
           
            vSystemTime = uSystemTime;
            vSystemResolution = uSystemResolution;
            // 포지션 결정
            gl_Position = uPMatrix * uCameraMatrix *  vertexPositionEye4;

           
        }
        `
    }
    Object.freeze(Structure_Final_VS_Info)
})();