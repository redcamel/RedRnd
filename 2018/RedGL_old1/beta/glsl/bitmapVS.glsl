attribute vec3 aVertexPosition;
attribute vec2 aTexcoord;
uniform mat4 uMVMatrix;
uniform mat4 uCameraMatrix;   
uniform mat4 uPMatrix;
uniform vec4 uAtlascoord;
varying vec2 vTexcoord;  
void main(void) {
    gl_Position = uPMatrix * uCameraMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vTexcoord = uAtlascoord.xy + aTexcoord*uAtlascoord.zw;
}