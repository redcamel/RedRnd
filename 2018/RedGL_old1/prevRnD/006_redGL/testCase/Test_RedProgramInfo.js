"use strict";
var testGL = RedGL(Recard.Dom('canvas').S('width', 1000, 'height', 1000).__dom__)
RedShaderInfo(testGL, 'basic', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs'))
RedShaderInfo(testGL, 'basic', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs'))
redSuite(
    "RedProgramInfo Test",
    redGroup(
        "RedProgramInfo Test",
        redTest("RedProgramInfo - VERTEX_SHADER 생성 테스트", function (unit) {
            var t0;
            t0 = RedProgramInfo(
                testGL, 'basic',
                RedShaderInfo(testGL, 'basic', RedShaderInfo.VERTEX_SHADER),
                RedShaderInfo(testGL, 'basic', RedShaderInfo.FRAGMENT_SHADER)
            )
            unit.run(t0 == RedProgramInfo(testGL, 'basic'))
        }, true)
    ),
    redGroup(
        '벨리데이션 확인',
        redTest("RedProgramInfo - RedGL 인스턴스만허용 : redGL", function (unit) {
            var t0;
            t0 = true
            try {
                RedProgramInfo(
                    1,
                    'redGLTest',
                    RedShaderInfo(testGL, 'basic', RedShaderInfo.VERTEX_SHADER),
                    RedShaderInfo(testGL, 'basic', RedShaderInfo.FRAGMENT_SHADER)
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedProgramInfo - 문자열만 허용 : key", function (unit) {
            var t0;
            t0 = true
            try {
                RedProgramInfo(
                    testGL,
                    999999,
                    RedShaderInfo(testGL, 'basic', RedShaderInfo.VERTEX_SHADER),
                    RedShaderInfo(testGL, 'basic', RedShaderInfo.FRAGMENT_SHADER)
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedProgramInfo - RedShaderInfo만 허용 : vShaderInfo", function (unit) {
            var t0;
            t0 = true
            try {
                RedProgramInfo(
                    testGL,
                    999999,
                    'RedShaderInfo만허용',
                    RedShaderInfo(testGL, 'basic', RedShaderInfo.FRAGMENT_SHADER)
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedProgramInfo - RedShaderInfo만 허용 : fShaderInfo", function (unit) {
            var t0;
            t0 = true
            try {
                RedProgramInfo(
                    testGL,
                    999999,
                    RedShaderInfo(testGL, 'basic', RedShaderInfo.VERTEX_SHADER),
                    'RedShaderInfo만허용'
                )
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false)
    ),
    redGroup(
        '인스턴스확인', redTest("RedProgramInfo - 인스턴스 정보확인 : key", function (unit) {
            var t0;
            t0 = RedProgramInfo(testGL, 'basic')
            unit.run(t0['key'])
        }, 'basic'),
        redTest("RedProgramInfo - 인스턴스 정보확인 : attributes", function (unit) {
            var t0;
            t0 = RedProgramInfo(testGL, 'basic')
            unit.run(t0['attributes'].hasOwnProperty('aVertexPosition'))
        }, true),
        redTest("RedProgramInfo - 인스턴스 정보확인 : uniforms", function (unit) {
            var t0;
            t0 = RedProgramInfo(testGL, 'basic')
            unit.run(t0['uniforms'].hasOwnProperty('uColor'))
        }, true),
        redTest("RedProgramInfo - 인스턴스 정보확인 : uniforms", function (unit) {
            var t0;
            t0 = RedProgramInfo(testGL, 'basic')
            unit.run(t0['uniforms'].hasOwnProperty('uMVMatrix'))
        }, true),
        redTest("RedProgramInfo - 인스턴스 정보확인 : uniforms", function (unit) {
            var t0;
            t0 = RedProgramInfo(testGL, 'basic')
            unit.run(t0['uniforms'].hasOwnProperty('uPMatrix'))
        }, true),
        redTest("RedProgramInfo - 인스턴스 정보확인 : shaderInfos.vShaderInfo", function (unit) {
            var t0;
            t0 = RedProgramInfo(testGL, 'basic')
            unit.run(t0['shaderInfos']['vShaderInfo'] == RedShaderInfo(testGL, 'basic', RedShaderInfo.VERTEX_SHADER))
        }, true),
        redTest("RedProgramInfo - 인스턴스 정보확인 : shaderInfos.fShaderInfo", function (unit) {
            var t0;
            t0 = RedProgramInfo(testGL, 'basic')
            unit.run(t0['shaderInfos']['fShaderInfo'] == RedShaderInfo(testGL, 'basic', RedShaderInfo.FRAGMENT_SHADER))
        }, true),
        redTest("RedProgramInfo - 인스턴스 정보확인 : program", function (unit) {
            var t0;
            t0 = RedProgramInfo(testGL, 'basic')
            unit.run(t0['program'] instanceof WebGLProgram)
        }, true),
    )
)
