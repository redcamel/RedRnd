"use strict";

var testData, testData2;
testData = new Float32Array([

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
testData2 = new Uint16Array([
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11,
    12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19,
    20, 21, 22, 20, 22, 23
])

var testGL = RedGL(Recard.Dom('canvas').S('width', 1000, 'height', 1000).__dom__)
testGL.createShaderInfo('basic', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs'))
testGL.createShaderInfo('basic', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs'))
var vShaderInfo, fShaderInfo
vShaderInfo = testGL.getShaderInfo('basic', RedShaderInfo.VERTEX_SHADER)
fShaderInfo = testGL.getShaderInfo('basic', RedShaderInfo.FRAGMENT_SHADER)
// 프로그램생성
testGL.createProgramInfo(
    'basic',
    vShaderInfo,
    fShaderInfo
)
// 재질정의
RedMaterialDefine(testGL, testGL.getProgramInfo('basic'))
testGL.createMaterialInfo('basic')
// 버텍스버퍼생성
testGL.createArrayBufferInfo('testBuffer', 'aVertexPosition', testData, 3, 24, testGL.gl.FLOAT)
// 인덱스 버퍼생성
testGL.createIndexBufferInfo('testIndexBuffer', testData2, 1, testData2.length, testGL.gl.UNSIGNED_SHORT)
// 지오메트리 생성
testGL.createGeometryInfo('testGeo',testGL.getArrayBufferInfo('testBuffer'),testGL.getIndexBufferInfo('testIndexBuffer'))

redSuite(
    "RedMeshInfo Test",
    redGroup(
        "RedMeshInfo Test",
        redTest("RedMeshInfo - 인스턴스 생성 테스트", function (unit) {
            var t0;
            t0 = testGL.createMeshInfo('test',testGL.getGeometryInfo('testGeo'), testGL.createMaterialInfo('basic'))
            console.log(t0)
            unit.run(t0 instanceof RedMeshInfo)
        }, true)
    ),
    redGroup(
        '벨리데이션 확인',
        redTest("RedMeshInfo - 키값은 숫자만허용 : key", function (unit) {
            var t0;
            t0 = true
            try {
                testGL.createMeshInfo(1,testGL.getGeometryInfo('testGeo'), testGL.createMaterialInfo('basic'))
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedMeshInfo - RedGeometryInfo만 허용 : geometryInfo", function (unit) {
            var t0;
            t0 = true
            try {
                testGL.createMeshInfo('test2',{}, testGL.createMaterialInfo('basic'))
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedMeshInfo - RedGeometryInfo만 허용 : materialInfo", function (unit) {
            var t0;
            t0 = true
            try {
                testGL.createMeshInfo('test3',testGL.getGeometryInfo('testGeo'), {})
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false)
    ),
    redGroup(
        '인스턴스확인',
        redTest("RedMeshInfo - uMVMatrix type 확인", function (unit) {
            var t0;
            t0 = testGL.getMeshInfo('test')
            unit.run(t0['uMVMatrix'] instanceof Float32Array)
        }, true),
        redTest("RedMeshInfo - position type 확인", function (unit) {
            var t0;
            t0 = testGL.getMeshInfo('test')
            unit.run(t0['position'] instanceof Float32Array)
        }, true),
        redTest("RedMeshInfo - rotation type 확인", function (unit) {
            var t0;
            t0 = testGL.getMeshInfo('test')
            unit.run(t0['rotation'] instanceof Float32Array)
        }, true),
        redTest("RedMeshInfo - scale type 확인", function (unit) {
            var t0;
            t0 = testGL.getMeshInfo('test')
            unit.run(t0['scale'] instanceof Float32Array)
        }, true),
        redTest("RedMeshInfo - geometryInfo 확인", function (unit) {
            var t0;
            t0 = testGL.getMeshInfo('test')
            unit.run(t0['geometryInfo'] instanceof RedGeometryInfo)
        }, true),
        redTest("RedMeshInfo - materialInfo 확인", function (unit) {
            var t0;
            t0 = testGL.getMeshInfo('test')
            unit.run(t0['materialInfo'] instanceof RedMaterialInfo)
        }, true)
    )
)
