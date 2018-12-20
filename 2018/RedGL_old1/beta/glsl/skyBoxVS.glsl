attribute vec3 aVertexPosition;
uniform mat4 uMVMatrix;
uniform mat4 uCameraMatrix;   
uniform mat4 uPMatrix;
varying vec3 vCubeCoord;  
void main(void) {
    gl_Position = uPMatrix * uCameraMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vec4 cubeNormal =  uMVMatrix *vec4(-aVertexPosition, 0.0);
    vCubeCoord = cubeNormal.xyz;
}