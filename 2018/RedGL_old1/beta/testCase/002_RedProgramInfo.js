"use strict";
var testGL = RedGL(Recard.Dom('canvas').S('width', 1000, 'height', 1000).__dom__)
var testMakeUniformValue = function () { }
RedShaderInfo(testGL, 'basic', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs'))
RedShaderInfo(testGL, 'basic', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs'))
redSuite(
    "RedProgramInfo Test",
    redGroup(
        "RedProgramInfo Test",
        redTest("VERTEX_SHADER 생성 테스트", function (unit) {
            var t0;
            t0 = RedProgramInfo(
                testGL,
                'basic',
                testGL.getShaderInfo('basic', RedShaderInfo.VERTEX_SHADER),
                testGL.getShaderInfo('basic', RedShaderInfo.FRAGMENT_SHADER),
                testMakeUniformValue
            )
            unit.run(t0 == testGL.getProgramInfo('basic'))
        }, true)
    ),
    redGroup(
        '벨리데이션 확인',
        redTest("RedGL 인스턴스만허용 : redGL", function (unit) {
            var t0;
            t0 = true
            try {
                RedProgramInfo(
                    1,
                    'redGLTest',
                    testGL.getShaderInfo('basic', RedShaderInfo.VERTEX_SHADER),
                    testGL.getShaderInfo('basic', RedShaderInfo.FRAGMENT_SHADER),
                    testMakeUniformValue
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("문자열만 허용 : key", function (unit) {
            var t0;
            t0 = true
            try {
                RedProgramInfo(
                    testGL,
                    999999,
                    testGL.getShaderInfo('basic', RedShaderInfo.VERTEX_SHADER),
                    testGL.getShaderInfo('basic', RedShaderInfo.FRAGMENT_SHADER),
                    testMakeUniformValue
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedShaderInfo만 허용 : vShaderInfo", function (unit) {
            var t0;
            t0 = true
            try {
                RedProgramInfo(
                    testGL,
                    'vShaderInfoTest1',
                    'RedShaderInfo만허용',
                    testGL.getShaderInfo('basic', RedShaderInfo.FRAGMENT_SHADER),
                    testMakeUniformValue
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedShaderInfo만 허용 : vShaderInfo2", function (unit) {
            var t0;
            t0 = true
            try {
                RedProgramInfo(
                    testGL,
                    'vShaderInfoTest2',
                    testGL.getShaderInfo('basic', RedShaderInfo.FRAGMENT_SHADER),
                    testGL.getShaderInfo('basic', RedShaderInfo.FRAGMENT_SHADER),
                    testMakeUniformValue
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedShaderInfo만 허용 : fShaderInfo", function (unit) {
            var t0;
            t0 = true
            try {
                RedProgramInfo(
                    testGL,
                    'fShaderInfoTest',
                    testGL.getShaderInfo('basic', RedShaderInfo.VERTEX_SHADER),
                    'RedShaderInfo만허용',
                    testMakeUniformValue
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedShaderInfo만 허용 : fShaderInfo2", function (unit) {
            var t0;
            t0 = true
            try {
                RedProgramInfo(
                    testGL,
                    'fShaderInfoTest2',
                    testGL.getShaderInfo('basic', RedShaderInfo.VERTEX_SHADER),
                    testGL.getShaderInfo('basic', RedShaderInfo.VERTEX_SHADER),
                    testMakeUniformValue
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false)
    ),
    redGroup(
        '인스턴스확인', redTest("인스턴스 정보확인 : key", function (unit) {
            var t0;
            t0 = testGL.getProgramInfo('basic')
            unit.run(t0['key'])
        }, 'basic'),
        redTest("인스턴스 정보확인 : attributes", function (unit) {
            var t0;
            t0 = testGL.getProgramInfo('basic')
            unit.run(t0['attributes'].hasOwnProperty('aVertexPosition'))
        }, true),
        redTest("인스턴스 정보확인 : uniforms", function (unit) {
            var t0;
            t0 = testGL.getProgramInfo('basic')
            unit.run(t0['uniforms'].hasOwnProperty('uColor'))
        }, true),
        redTest("인스턴스 정보확인 : uniforms", function (unit) {
            var t0;
            t0 = testGL.getProgramInfo('basic')
            unit.run(t0['uniforms'].hasOwnProperty('uMVMatrix'))
        }, true),
        redTest("인스턴스 정보확인 : uniforms", function (unit) {
            var t0;
            t0 = testGL.getProgramInfo('basic')
            unit.run(t0['uniforms'].hasOwnProperty('uPMatrix'))
        }, true),
        redTest("인스턴스 정보확인 : shaderInfos.vShaderInfo", function (unit) {
            var t0;
            t0 = testGL.getProgramInfo('basic')
            unit.run(t0['shaderInfos']['vShaderInfo'] == testGL.getShaderInfo('basic', RedShaderInfo.VERTEX_SHADER))
        }, true),
        redTest("인스턴스 정보확인 : shaderInfos.fShaderInfo", function (unit) {
            var t0;
            t0 = testGL.getProgramInfo('basic')
            unit.run(t0['shaderInfos']['fShaderInfo'] == testGL.getShaderInfo('basic', RedShaderInfo.FRAGMENT_SHADER))
        }, true),
        redTest("인스턴스 정보확인 : program", function (unit) {
            var t0;
            t0 = testGL.getProgramInfo('basic')
            unit.run(t0['program'] instanceof WebGLProgram)
        }, true),
    )
)
