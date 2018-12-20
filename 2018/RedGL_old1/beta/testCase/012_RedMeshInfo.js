"use strict";
var testGL = RedGL(Recard.Dom('canvas').S('width', 1000, 'height', 1000).__dom__)
var vShaderInfo, fShaderInfo
testGL.createShaderInfo('basic', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs'))
testGL.createShaderInfo('basic', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs'))
vShaderInfo = testGL.getShaderInfo('basic', RedShaderInfo.VERTEX_SHADER)
fShaderInfo = testGL.getShaderInfo('basic', RedShaderInfo.FRAGMENT_SHADER)
// 프로그램생성
testGL.createProgramInfo(
    'basic',
    vShaderInfo,
    fShaderInfo,
    function (target) {
        target.materialUniforms.uColor = new Float32Array([Math.random(), Math.random(), Math.random()])
    }
)
// 재질정의
RedMaterialDefine(testGL, testGL.getProgramInfo('basic'))
testGL.createMaterialInfo('basic')
redSuite(
    "RedMeshInfo Test",
    redGroup(
        "RedMeshInfo Test",
        redTest("인스턴스 생성 테스트", function (unit) {
            var t0;
            t0 = RedMeshInfo(testGL, 'test', RedPrimitive.sphere(testGL), testGL.createMaterialInfo('basic'))
            console.log(t0)
            unit.run(t0 instanceof RedMeshInfo)
        }, true)
    ),
    redGroup(
        '벨리데이션 확인',
        redTest("RedGL", function (unit) {
            var t0;
            t0 = true
            try {
                RedMeshInfo('test', 'test', RedPrimitive.sphere(testGL), testGL.createMaterialInfo('basic'))
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("키값은 문자만 : key", function (unit) {
            var t0;
            t0 = true
            try {
                RedMeshInfo(testGL, 1, RedPrimitive.sphere(testGL), testGL.createMaterialInfo('basic'))
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedGeometryInfo만 허용 : geometryInfo", function (unit) {
            var t0;
            t0 = true
            try {
                RedMeshInfo(testGL, 'test2', {}, 9999999)
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedMaterialInfo만 허용 : materialInfo", function (unit) {
            var t0;
            t0 = true
            try {
                RedMeshInfo(testGL, 'test3', RedPrimitive.sphere(testGL), {})
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false)
    ),
    redGroup(
        '인스턴스확인',
        redTest("uMVMatrix type 확인", function (unit) {
            var t0;
            t0 = testGL.getMeshInfo('test')
            unit.run(t0['uMVMatrix'] instanceof Float32Array)
        }, true),
        redTest("position type 확인", function (unit) {
            var t0;
            t0 = testGL.getMeshInfo('test')
            unit.run(t0['position'] instanceof Float32Array)
        }, true),
        redTest("rotation type 확인", function (unit) {
            var t0;
            t0 = testGL.getMeshInfo('test')
            unit.run(t0['rotation'] instanceof Float32Array)
        }, true),
        redTest("scale type 확인", function (unit) {
            var t0;
            t0 = testGL.getMeshInfo('test')
            unit.run(t0['scale'] instanceof Float32Array)
        }, true),
        redTest("geometryInfo 확인", function (unit) {
            var t0;
            t0 = testGL.getMeshInfo('test')
            unit.run(t0['geometryInfo'] instanceof RedGeometryInfo)
        }, true),
        redTest("materialInfo 확인", function (unit) {
            var t0;
            t0 = testGL.getMeshInfo('test')
            unit.run(t0['materialInfo'] instanceof RedMaterialInfo)
        }, true)
    )
)
