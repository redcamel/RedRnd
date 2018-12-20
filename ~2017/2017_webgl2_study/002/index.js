var GL;
var CVS, CTX;
//
var vertexShaderSource;
var fragmentShaderSource;
var createShaderSources;
var createShader;
var vertexShader, fragmentShader;
var createProgram, program;
// 
var positionBuffer;
var createBuffer;
var resizeCanvasToDisplaySize;
resizeCanvasToDisplaySize = function (canvas, multiplier) {
    multiplier = multiplier || 1;
    var width = canvas.clientWidth * multiplier | 0;
    var height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
    }
    return false;
}
createShaderSources = function () {
    vertexShaderSource = `#version 300 es
            // layout(location = 4) in vec4 a_position; // 쉐이더에서 지정할수도있군
            in vec4 a_position;
            in mat4 u_perspective;
            void main(){
                gl_Position  = a_position;
            }
            `
    fragmentShaderSource = `#version 300 es
            precision mediump float;
            out vec4 outColor;
            void main(){
                outColor = u_perspective*vec4(1, 0, 0.4, 1);
            }
            `
}
createShader = function (gl, type, source) {
    var shader;
    var success;
    shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader)
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log(shader)
        return shader;
    }
    else {
        console.log(gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
    }
}
createProgram = function (gl, vertexShader, fragmentShader) {
    var program;
    program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.bindAttribLocation(program, 3, "a_position"); // 만들때 지정해버릴수도있군..
    gl.linkProgram(program);
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log(program,'test2');

        return program;
    } else {
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram();
    }
}
createBuffer = function (gl, buffer, bufferData) {
    var buffer;
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData), gl.STATIC_DRAW);
    return buffer;
}
///////////////////////////////////
// 초기화
CVS = document.getElementById('cvs')
CVS.width = 200
CVS.height = 200
GL = CVS.getContext('webgl2')
if (GL) console.log('webgl2.0 success')
else console.log('webgl2.0 fail')
// 쉐이더 소스생성
createShaderSources()
// 쉐이더 생성하고
vertexShader = createShader(GL, GL.VERTEX_SHADER, vertexShaderSource);
fragmentShader = createShader(GL, GL.FRAGMENT_SHADER, fragmentShaderSource);
// 프로그램 생성
program = createProgram(GL, vertexShader, fragmentShader);
// 로케이션을 얻어와야함
// TODO: WEBGL2.0에서 이걸 고정화 할수 있다고 하는데 찾아봐야함
positionAttributeLocation = GL.getAttribLocation(program, 'a_position')
// 버퍼를 만들고
positionBuffer = createBuffer(GL, positionBuffer, [
    0, 0,
    0, 0.5,
    0.7, 0
])
//// 데이터 준비는 끝났고...렌더준비
// VAO 생성후 활성화
var vao;
vao = GL.createVertexArray();
GL.bindVertexArray(vao);
GL.enableVertexAttribArray(positionAttributeLocation);
console.log('positionAttributeLocation',positionAttributeLocation);
// 포인터지정
(function () {
    var size = 2;
    var type = GL.FLOAT;
    var nomalize = false;
    var stride = 0;
    var offset = 0;
    GL.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        nomalize,
        stride,
        offset
    )
})();
// 실제로 호출
var color = 0
setInterval(function () {
    if (!GL) return
    resizeCanvasToDisplaySize(CVS)
    color += 1 / 255
    if (color > 1) color = 0
    GL.viewport(0, 0, CVS.width, CVS.height);
    GL.clear(GL.COLOR_BUFFER_BIT);
    GL.clearColor(color, color / 2, color / 5, 1);
    GL.useProgram(program);
    GL.bindVertexArray(vao);
    (function () {
        var primitiveType = GL.TRIANGLES;
        var offset = 0
        var count = 3
        GL.drawArrays(primitiveType, offset, count)
    })();
}, 1)
