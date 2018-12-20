"use strict";
var testGL = RedGL(Recard.Dom('canvas').S('width', 1000, 'height', 1000).__dom__)
var testData_arrayBuffer;
var testData_indexBuffer
var testArrayBufferInfo, testIndexBufferInfo, testUVBufferInfo, testNormalBufferInfo
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
testData_indexBuffer = new Uint16Array([
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11,
    12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19,
    20, 21, 22, 20, 22, 23
])
testArrayBufferInfo = RedBufferInfo(
    testGL, // redGL
    RedBufferInfo.ARRAY_BUFFER, // bufferType
    'testVerticeBufferInfo', // key
    RedFixedAttributeKey['aVertexPosition'], // shaderPointerKey
    testData_arrayBuffer, // arrayData
    3, // pointSize
    24, // pointNum
    testGL.gl.FLOAT, //arrayType
)
testUVBufferInfo = RedBufferInfo(
    testGL, // redGL
    RedBufferInfo.ARRAY_BUFFER, // bufferType
    'tesUVBufferInfo', // key
    RedFixedAttributeKey['aTexcoord'], // shaderPointerKey
    testData_arrayBuffer, // arrayData
    3, // pointSize
    24, // pointNum
    testGL.gl.FLOAT, //arrayType
)

testNormalBufferInfo = RedBufferInfo(
    testGL, // redGL
    RedBufferInfo.ARRAY_BUFFER, // bufferType
    'testNormalBufferInfo', // key
    RedFixedAttributeKey['aVertexNormal'], // shaderPointerKey
    testData_arrayBuffer, // arrayData
    3, // pointSize
    24, // pointNum
    testGL.gl.FLOAT, //arrayType
)
testIndexBufferInfo = RedBufferInfo(
    testGL, // redGL
    RedBufferInfo.ELEMENT_ARRAY_BUFFER, // bufferType
    'testIndexBufferInfo', // key
    null, // shaderPointerKey
    testData_indexBuffer, // arrayData
    1, // pointSize
    36, // pointNum
    testGL.gl.UNSIGNED_SHORT, //arrayType
)
redSuite(
    "RedGeometryInfo Test",
    redGroup(
        "RedGeometryInfo Test",
        redTest("RedGeometryInfo - 생성 테스트 : 버텍스", function (unit) {
            var t0;
            t0 = RedGeometryInfo(testGL, 'test1', testArrayBufferInfo)
            unit.run(t0.attributes.vertexPosition == testArrayBufferInfo)
        }, true),
        redTest("RedGeometryInfo - 생성 테스트 : 인덱스", function (unit) {
            var t0;
            t0 = RedGeometryInfo(testGL, 'test2', testArrayBufferInfo, testIndexBufferInfo)
            unit.run(t0.indices == testIndexBufferInfo)
        }, true),
        redTest("RedGeometryInfo - 생성 테스트 : UV", function (unit) {
            var t0;
            t0 = RedGeometryInfo(testGL, 'test3', testArrayBufferInfo, testIndexBufferInfo, testUVBufferInfo)
            unit.run(t0.attributes.texcoord == testUVBufferInfo)
        }, true),
        redTest("RedGeometryInfo - 생성 테스트 : NORMAL", function (unit) {
            var t0;
            t0 = RedGeometryInfo(testGL, 'test4', testArrayBufferInfo, testIndexBufferInfo, testUVBufferInfo, testNormalBufferInfo)
            unit.run(t0.attributes.normal == testNormalBufferInfo)
        }, true),
        redTest("RedGeometryInfo - 생성 테스트 : 중복방지", function (unit) {
            var t0;
            t0 = true
            try {
                RedGeometryInfo(testGL, 'test4', testArrayBufferInfo, testIndexBufferInfo, testUVBufferInfo, testNormalBufferInfo)
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false)
    ),
    redGroup(
        "RedGeometryInfo 버퍼 밸리데이션",
        redTest("RedGeometryInfo - 생성 테스트 : 버텍스 ArrayBuffer만 허용", function (unit) {
            var t0;
            t0 = true
            try {
                RedGeometryInfo(testGL, 'vali1', testIndexBufferInfo)
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedGeometryInfo - 생성 테스트 : 인덱스 ElementArrayBuffer만 허용", function (unit) {
            var t0;
            t0 = true
            try {
                RedGeometryInfo(testGL, 'vali2', testArrayBufferInfo, testArrayBufferInfo)
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedGeometryInfo - 생성 테스트 : UV ArrayBuffer만 허용", function (unit) {
            var t0;
            t0 = true
            try {
                RedGeometryInfo(testGL, 'vali3', testArrayBufferInfo, testIndexBufferInfo, testIndexBufferInfo)
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedGeometryInfo - 생성 테스트 : 노말 ArrayBuffer만 허용", function (unit) {
            var t0;
            t0 = true
            try {
                RedGeometryInfo(testGL, 'vali4', testArrayBufferInfo, testIndexBufferInfo, testArrayBufferInfo, testIndexBufferInfo)
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false)
    ),
    redGroup(
        '인스턴스확인', redTest("RedGeometryInfo - 인스턴스 정보확인 : key", function (unit) {
            var t0;
            t0 = RedGeometryInfo(testGL, 'instance1', testArrayBufferInfo, testIndexBufferInfo, testUVBufferInfo, testNormalBufferInfo)
            unit.run(t0['key'])
        }, 'instance1'),
        redTest("RedGeometryInfo - 인스턴스 정보확인 : key", function (unit) {
            var t0;
            t0 = RedGeometryInfo(testGL, 'instance2', testArrayBufferInfo, testIndexBufferInfo, testUVBufferInfo, testNormalBufferInfo)
            unit.run(t0['attributes']['vertexPosition'])
        }, testArrayBufferInfo),
        redTest("RedGeometryInfo - 인스턴스 정보확인 : key", function (unit) {
            var t0;
            t0 = RedGeometryInfo(testGL, 'instance3', testArrayBufferInfo, testIndexBufferInfo, testUVBufferInfo, testNormalBufferInfo)
            unit.run(t0['attributes']['texcoord'])
        }, testUVBufferInfo),
        redTest("RedGeometryInfo - 인스턴스 정보확인 : type", function (unit) {
            var t0;
            t0 = RedGeometryInfo(testGL, 'instance4', testArrayBufferInfo, testIndexBufferInfo, testUVBufferInfo, testNormalBufferInfo)
            unit.run(t0['attributes']['normal'])
        }, testNormalBufferInfo),
        redTest("RedGeometryInfo - 인스턴스 정보확인 : parseData", function (unit) {
            var t0;
            t0 = RedGeometryInfo(testGL, 'instance5', testArrayBufferInfo, testIndexBufferInfo, testUVBufferInfo, testNormalBufferInfo)
            unit.run(t0['indices'])
        }, testIndexBufferInfo)
    )
)
