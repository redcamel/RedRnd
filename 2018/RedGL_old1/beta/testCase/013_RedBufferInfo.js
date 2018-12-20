"use strict";
var testGL = RedGL(Recard.Dom('canvas').S('width', 1000, 'height', 1000).__dom__)
var testData_arrayBuffer,testData_ElementArrayBuffer;
testData_arrayBuffer = new Float32Array([
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,

    -1.0, -1.0, -1.0,
    -1.0, 1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,

    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,

    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, 1.0,

    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,

    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, 1.0, -1.0
])
testData_ElementArrayBuffer = new Uint16Array([
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,

    -1.0, -1.0, -1.0,
    -1.0, 1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,

    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,

    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, 1.0,

    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,

    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, 1.0, -1.0
])
redSuite(
    "RedBufferInfo Test",
    redGroup(
        "RedBufferInfo Test",
        redTest("ArrayBuffer 생성 테스트", function (unit) {
            var t0;
            // redGL, bufferType, key, shaderPointerKey, arrayData, pointSize, pointNum, glArrayType, normalize, stride, offset, drawMode
            t0 = RedBufferInfo(
                testGL, // redGL
                RedBufferInfo.ARRAY_BUFFER, // bufferType
                'testBuffer', // key
                'aPointer', // shaderPointerKey
                testData_arrayBuffer, // arrayData
                3, // pointSize
                24, // pointNum
                testGL.gl.FLOAT, //glArrayType
                false, //normalize
                0, // stride
                0, // offset
                testGL.gl.STATIC_DRAW //drawMode 
            )
            console.log(t0)
            unit.run(t0 instanceof RedBufferInfo)
        }, true),
        redTest("ElementArrayBuffer 생성 테스트", function (unit) {
            var t0;
            // redGL, bufferType, key, shaderPointerKey, arrayData, pointSize, pointNum, glArrayType, normalize, stride, offset, drawMode
            t0 = RedBufferInfo(
                testGL, // redGL
                RedBufferInfo.ELEMENT_ARRAY_BUFFER, // bufferType
                'testBuffer_element', // key
                'aPointer', // shaderPointerKey
                testData_ElementArrayBuffer, // arrayData
                3, // pointSize
                24, // pointNum
                testGL.gl.UNSIGNED_SHORT, //glArrayType
                false, //normalize
                0, // stride
                0, // offset
                testGL.gl.STATIC_DRAW //drawMode 
            )
            console.log(t0)
            unit.run(t0 instanceof RedBufferInfo)
        }, true)
    ),
    redGroup(
        '벨리데이션 확인',
        redTest("RedGL 인스턴스만허용 : redGL", function (unit) {
            var t0;
            t0 = true
            try {
                RedBufferInfo(
                    99999999, // redGL
                    RedBufferInfo.ARRAY_BUFFER, // bufferType
                    'redGLTest', // key
                    'aPointer', // shaderPointerKey
                    testData_arrayBuffer, // arrayData
                    3, // pointSize
                    24, // pointNum
                    testGL.gl.FLOAT, //glArrayType
                    false, //normalize
                    0, // stride
                    0, // offset
                    testGL.gl.STATIC_DRAW //drawMode 
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("지정된 버퍼타입만 허용 : bufferType", function (unit) {
            var t0;
            t0 = true
            try {
                RedBufferInfo(
                    testGL, // redGL
                    9999999, // bufferType
                    'bufferTypeTest', // key
                    'aPointer', // shaderPointerKey
                    testData_arrayBuffer, // arrayData
                    3, // pointSize
                    24, // pointNum
                    testGL.gl.FLOAT, //glArrayType
                    false, //normalize
                    0, // stride
                    0, // offset
                    testGL.gl.STATIC_DRAW //drawMode 
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("raw데이터를 TypedArray계열만 허용하는지 : arrayData", function (unit) {
            var t0;
            t0 = true
            try {
                RedBufferInfo(
                    testGL, // redGL
                    RedBufferInfo.ARRAY_BUFFER, // bufferType
                    'valiTest1', // key
                    'aPointer', // shaderPointerKey
                    '1,2,3', // arrayData
                    3, // pointSize
                    24, // pointNum
                    testGL.gl.FLOAT, //glArrayType
                    false, //normalize
                    0, // stride
                    0, // offset
                    testGL.gl.STATIC_DRAW //drawMode 
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("raw데이터를 TypedArray계열만 허용하는지 : arrayData", function (unit) {
            var t0;
            t0 = true
            try {
                RedBufferInfo(
                    testGL, // redGL
                    RedBufferInfo.ARRAY_BUFFER, // bufferType
                    'valiTest2', // key
                    'aPointer', // shaderPointerKey
                    1, // arrayData
                    3, // pointSize
                    24, // pointNum
                    testGL.gl.FLOAT, //glArrayType
                    false, //normalize
                    0, // stride
                    0, // offset
                    testGL.gl.STATIC_DRAW //drawMode 
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("raw데이터를 TypedArray계열만 허용하는지 : arrayData", function (unit) {
            var t0;
            t0 = true
            try {
                RedBufferInfo(
                    testGL, // redGL
                    RedBufferInfo.ARRAY_BUFFER, // bufferType
                    'valiTest2', // key
                    'aPointer', // shaderPointerKey
                    [1, 2, 3], // arrayData
                    3, // pointSize
                    1, // pointNum
                    testGL.gl.FLOAT, //glArrayType
                    false, //normalize
                    0, // stride
                    0, // offset
                    testGL.gl.STATIC_DRAW //drawMode 
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("Integer만 허용하는지 : pointSize", function (unit) {
            var t0;
            t0 = true
            try {
                RedBufferInfo(
                    testGL, // redGL
                    RedBufferInfo.ARRAY_BUFFER, // bufferType
                    'valiTest3', // key
                    'aPointer', // shaderPointerKey
                    testData_arrayBuffer, // arrayData
                    3.1, // pointSize
                    24, // pointNum
                    testGL.gl.FLOAT, //glArrayType
                    false, //normalize
                    0, // stride
                    0, // offset
                    testGL.gl.STATIC_DRAW //drawMode 
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("Integer만 허용하는지 : pointSize", function (unit) {
            var t0;
            t0 = true
            try {
                RedBufferInfo(
                    testGL, // redGL
                    RedBufferInfo.ARRAY_BUFFER, // bufferType
                    'valiTest4', // key
                    'aPointer', // shaderPointerKey
                    testData_arrayBuffer, // arrayData
                    '3', // pointSize
                    24, // pointNum
                    testGL.gl.FLOAT, //glArrayType
                    false, //normalize
                    0, // stride
                    0, // offset
                    testGL.gl.STATIC_DRAW //drawMode 
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("Integer만 허용하는지 : pointNum", function (unit) {
            var t0;
            t0 = true
            try {
                RedBufferInfo(
                    testGL, // redGL
                    RedBufferInfo.ARRAY_BUFFER, // bufferType
                    'valiTest5', // key
                    'aPointer', // shaderPointerKey
                    testData_arrayBuffer, // arrayData
                    3, // pointSize
                    24.1, // pointNum
                    testGL.gl.FLOAT, //glArrayType
                    false, //normalize
                    0, // stride
                    0, // offset
                    testGL.gl.STATIC_DRAW //drawMode 
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("필수값 입력테스트 : glArrayType", function (unit) {
            var t0;
            t0 = true
            try {
                RedBufferInfo(
                    testGL, // redGL
                    RedBufferInfo.ARRAY_BUFFER, // bufferType
                    'valiTest6', // key
                    'aPointer', // shaderPointerKey
                    testData_arrayBuffer, // arrayData
                    3, // pointSize
                    24, // pointNum
                    null, //glArrayType
                    false, //normalize
                    0, // stride
                    0, // offset
                    testGL.gl.STATIC_DRAW //drawMode 
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("기본값 입력테스트 : normalize", function (unit) {
            var t0;
            t0 = RedBufferInfo(
                testGL, // redGL
                RedBufferInfo.ARRAY_BUFFER, // bufferType
                'valiTest7', // key
                'aPointer', // shaderPointerKey
                testData_arrayBuffer, // arrayData
                3, // pointSize
                24, // pointNum
                testGL.gl.FLOAT, //glArrayType
                null, //normalize
                0, // stride
                0, // offset
                testGL.gl.STATIC_DRAW //drawMode 
            )
            unit.run(t0.normalize)
        }, false),
        redTest("기본값 입력테스트 : stride", function (unit) {
            var t0;
            t0 = RedBufferInfo(
                testGL, // redGL
                RedBufferInfo.ARRAY_BUFFER, // bufferType
                'valiTest8', // key
                'aPointer', // shaderPointerKey
                testData_arrayBuffer, // arrayData
                3, // pointSize
                24, // pointNum
                testGL.gl.FLOAT, //glArrayType
                false, //normalize
                // stride
                // offset
                //drawMode 
            )
            unit.run(t0.stride)
        }, 0),
        redTest("기본값 입력테스트 : offset", function (unit) {
            var t0;
            t0 = RedBufferInfo(
                testGL, // redGL
                RedBufferInfo.ARRAY_BUFFER, // bufferType
                'valiTest9', // key
                'aPointer', // shaderPointerKey
                testData_arrayBuffer, // arrayData
                3, // pointSize
                24, // pointNum
                testGL.gl.FLOAT, //glArrayType
                false, //normalize
                0,// stride
                // offset
                //drawMode 
            )
            unit.run(t0.offset)
        }, 0),
        redTest("기본값 입력테스트 : drawMode", function (unit) {
            var t0;
            t0 = RedBufferInfo(
                testGL, // redGL
                RedBufferInfo.ARRAY_BUFFER, // bufferType
                'valiTest10', // key
                'aPointer', // shaderPointerKey
                testData_arrayBuffer, // arrayData
                3, // pointSize
                24, // pointNum
                testGL.gl.FLOAT, //glArrayType
                false, //normalize
                0,// stride
                0// offset
                //drawMode 
            )
            unit.run(t0.drawMode)
        }, testGL.gl.STATIC_DRAW)
    )
)
