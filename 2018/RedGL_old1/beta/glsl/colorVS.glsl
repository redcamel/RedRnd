attribute vec3 aVertexPosition;     
uniform mat4 uMVMatrix;
uniform mat4 uCameraMatrix;
uniform mat4 uPMatrix;         
void main(void) {
    gl_Position = uPMatrix * uCameraMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}