"use strict";
var testGL = RedGL(Recard.Dom('canvas').S('width', 1000, 'height', 1000).__dom__)
var testData_arrayBuffer;
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
redSuite(
    "RedBufferInfo Test",
    redGroup(
        "RedBufferInfo Test",
        redTest("RedBufferInfo - ArrayBuffer 생성 테스트", function (unit) {
            var t0;
            // redGL, bufferType, key, shaderPointerKey, arrayData, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode
            t0 = RedBufferInfo(
                testGL, // redGL
                RedBufferInfo.ARRAY_BUFFER, // bufferType
                'testBuffer', // key
                'aPointer', // shaderPointerKey
                testData_arrayBuffer, // arrayData
                3, // pointSize
                24, // pointNum
                testGL.gl.FLOAT, //arrayType
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
        redTest("RedBufferInfo - RedGL 인스턴스만허용 : redGL", function (unit) {
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
                    testGL.gl.FLOAT, //arrayType
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
        redTest("RedBufferInfo - 지정된 버퍼타입만 허용 : bufferType", function (unit) {
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
                    testGL.gl.FLOAT, //arrayType
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
        redTest("RedBufferInfo - raw데이터를 Array계열만만 허용하는지 : arrayData", function (unit) {
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
                    testGL.gl.FLOAT, //arrayType
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
        redTest("RedBufferInfo - raw데이터를 Array계열만만 허용하는지 : arrayData", function (unit) {
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
                    testGL.gl.FLOAT, //arrayType
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
        redTest("RedBufferInfo - Integer만 허용하는지 : pointSize", function (unit) {
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
                    testGL.gl.FLOAT, //arrayType
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
        redTest("RedBufferInfo - Integer만 허용하는지 : pointSize", function (unit) {
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
                    testGL.gl.FLOAT, //arrayType
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
        redTest("RedBufferInfo - Integer만 허용하는지 : pointNum", function (unit) {
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
                    testGL.gl.FLOAT, //arrayType
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
        redTest("RedBufferInfo - 필수값 입력테스트 : arrayType", function (unit) {
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
                    null, //arrayType
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
        redTest("RedBufferInfo - 기본값 입력테스트 : normalize", function (unit) {
            var t0;
            t0 = RedBufferInfo(
                testGL, // redGL
                RedBufferInfo.ARRAY_BUFFER, // bufferType
                'valiTest7', // key
                'aPointer', // shaderPointerKey
                testData_arrayBuffer, // arrayData
                3, // pointSize
                24, // pointNum
                testGL.gl.FLOAT, //arrayType
                null, //normalize
                0, // stride
                0, // offset
                testGL.gl.STATIC_DRAW //drawMode 
            )
            unit.run(t0.normalize)
        }, false),
        redTest("RedBufferInfo - 기본값 입력테스트 : stride", function (unit) {
            var t0;
            t0 = RedBufferInfo(
                testGL, // redGL
                RedBufferInfo.ARRAY_BUFFER, // bufferType
                'valiTest8', // key
                'aPointer', // shaderPointerKey
                testData_arrayBuffer, // arrayData
                3, // pointSize
                24, // pointNum
                testGL.gl.FLOAT, //arrayType
                null, //normalize
                // stride
                // offset
                //drawMode 
            )
            unit.run(t0.stride)
        }, 0),
        redTest("RedBufferInfo - 기본값 입력테스트 : offset", function (unit) {
            var t0;
            t0 = RedBufferInfo(
                testGL, // redGL
                RedBufferInfo.ARRAY_BUFFER, // bufferType
                'valiTest9', // key
                'aPointer', // shaderPointerKey
                testData_arrayBuffer, // arrayData
                3, // pointSize
                24, // pointNum
                testGL.gl.FLOAT, //arrayType
                null, //normalize
                0,// stride
                // offset
                //drawMode 
            )
            unit.run(t0.offset)
        }, 0),
        redTest("RedBufferInfo - 기본값 입력테스트 : drawMode", function (unit) {
            var t0;
            t0 = RedBufferInfo(
                testGL, // redGL
                RedBufferInfo.ARRAY_BUFFER, // bufferType
                'valiTest10', // key
                'aPointer', // shaderPointerKey
                testData_arrayBuffer, // arrayData
                3, // pointSize
                24, // pointNum
                testGL.gl.FLOAT, //arrayType
                null, //normalize
                0,// stride
                0// offset
                //drawMode 
            )
            unit.run(t0.drawMode)
        }, testGL.gl.STATIC_DRAW)
    ),
    // redGroup(
    //     '인스턴스확인', redTest("RedBufferInfo - 인스턴스 정보확인 : key", function (unit) {
    //         var t0;
    //         t0 = RedBufferInfo(testGL, 'basic')
    //         unit.run(t0['key'])
    //     }, 'basic'),
    //     redTest("RedBufferInfo - 인스턴스 정보확인 : attributes", function (unit) {
    //         var t0;
    //         t0 = RedBufferInfo(testGL, 'basic')
    //         unit.run(t0['attributes'].hasOwnProperty('aVertexPosition'))
    //     }, true),
    //     redTest("RedBufferInfo - 인스턴스 정보확인 : uniforms", function (unit) {
    //         var t0;
    //         t0 = RedBufferInfo(testGL, 'basic')
    //         unit.run(t0['uniforms'].hasOwnProperty('uColor'))
    //     }, true),
    //     redTest("RedBufferInfo - 인스턴스 정보확인 : uniforms", function (unit) {
    //         var t0;
    //         t0 = RedBufferInfo(testGL, 'basic')
    //         unit.run(t0['uniforms'].hasOwnProperty('uMVMatrix'))
    //     }, true),
    //     redTest("RedBufferInfo - 인스턴스 정보확인 : uniforms", function (unit) {
    //         var t0;
    //         t0 = RedBufferInfo(testGL, 'basic')
    //         unit.run(t0['uniforms'].hasOwnProperty('uPMatrix'))
    //     }, true),
    //     redTest("RedBufferInfo - 인스턴스 정보확인 : shaderInfos.vShaderInfo", function (unit) {
    //         var t0;
    //         t0 = RedBufferInfo(testGL, 'basic')
    //         unit.run(t0['shaderInfos']['vShaderInfo'] == RedShaderInfo(testGL, 'basic', RedShaderInfo.VERTEX_SHADER))
    //     }, true),
    //     redTest("RedBufferInfo - 인스턴스 정보확인 : shaderInfos.fShaderInfo", function (unit) {
    //         var t0;
    //         t0 = RedBufferInfo(testGL, 'basic')
    //         unit.run(t0['shaderInfos']['fShaderInfo'] == RedShaderInfo(testGL, 'basic', RedShaderInfo.FRAGMENT_SHADER))
    //     }, true),
    //     redTest("RedBufferInfo - 인스턴스 정보확인 : program", function (unit) {
    //         var t0;
    //         t0 = RedBufferInfo(testGL, 'basic')
    //         unit.run(t0['program'] instanceof WebGLProgram)
    //     }, true),
    // )
)
