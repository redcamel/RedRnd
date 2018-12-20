"use strict";
var testGL = RedGL(Recard.Dom('canvas').S('width', 1000, 'height', 1000).__dom__)
var testMakeUniformValue = function(){}
testGL.createShaderInfo('basic', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs'))
testGL.createShaderInfo('basic', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs'))
var vShaderInfo, fShaderInfo
vShaderInfo = testGL.getShaderInfo('basic', RedShaderInfo.VERTEX_SHADER)
fShaderInfo = testGL.getShaderInfo('basic', RedShaderInfo.FRAGMENT_SHADER)

// 프로그램생성
testGL.createProgramInfo(
    'basic',
    vShaderInfo,
    fShaderInfo,
    testMakeUniformValue
)
redSuite(
    "RedMaterialDefine Test",
    redGroup(
        "RedMaterialDefine Test",
        redTest("RedMaterialDefine - 정의 테스트", function (unit) {
            var t0;
            t0 = RedMaterialDefine(testGL, testGL.getProgramInfo('basic'))
            unit.run(t0.programInfo)
        }, testGL.getProgramInfo('basic')),
        redTest("RedMaterialDefine - 중복정의 방지 테스트", function (unit) {
            var t0;
            t0 = true
            try {
                RedMaterialDefine(testGL, testGL.getProgramInfo('basic'))
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false)
    ),
    redGroup(
        '벨리데이션 확인',
        redTest("RedMaterialDefine - RedGL 인스턴스만허용 : redGL", function (unit) {
            var t0;
            t0 = true
            testGL.createProgramInfo(
                'test1',
                vShaderInfo,
                fShaderInfo,
                testMakeUniformValue
            )
            try {
                RedMaterialDefine(1, testGL.getProgramInfo('test1'))
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedMaterialDefine - RedProgramInfo 인스턴스만허용 : type", function (unit) {
            var t0;
            t0 = true
            testGL.createProgramInfo(
                'test2',
                vShaderInfo,
                fShaderInfo,
                testMakeUniformValue
            )
            try {
                RedMaterialDefine(testGL, {})
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false)
    ),
    redGroup(
        'Object.freeze 확인',
        redTest("RedMaterialDefine - 인스턴스 freeze 확인", function (unit) {
            var t0, t1;
            testGL.createProgramInfo(
                'test3',
                vShaderInfo,
                fShaderInfo,
                testMakeUniformValue
            )
            t0 = RedMaterialDefine(testGL, testGL.getProgramInfo('test3'))
            t1 = true
            try {
                t0['aaa'] = 1
            } catch (error) {
                t1 = false
            }
            unit.run(t1)
        }, false)
    )
)
