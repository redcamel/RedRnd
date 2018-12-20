"use strict";
var testGL = RedGL(Recard.Dom('canvas').S('width', 1000, 'height', 1000).__dom__)
redSuite(
    "RedShaderInfo Test",
    redGroup(
        "RedShaderInfo Test",
        redTest("RedShaderInfo - VERTEX_SHADER 생성 테스트", function (unit) {
            var t0;
            t0 = RedShaderInfo(testGL, 'basic', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs'))
            unit.run(t0 == RedShaderInfo(testGL, 'basic', RedShaderInfo.VERTEX_SHADER))
        }, true),
        redTest("RedShaderInfo - FRAGMENT_SHADER 생성 테스트", function (unit) {
            var t0;
            t0 = RedShaderInfo(testGL, 'basic', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs'))
            unit.run(t0 == RedShaderInfo(testGL, 'basic', RedShaderInfo.FRAGMENT_SHADER))
        }, true)
    ),
    redGroup(
        '벨리데이션 확인',
        redTest("RedShaderInfo - RedGL 인스턴스만허용 : redGL", function (unit) {
            var t0;
            t0 = true
            try {
                RedShaderInfo(1, 'redGLTest', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs'))
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedShaderInfo - 문자열만 허용 : key", function (unit) {
            var t0;
            t0 = true
            try {
                RedShaderInfo(testGL, 9999999, RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs'))
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedShaderInfo - 문자열만 허용 : source", function (unit) {
            var t0;
            t0 = true
            try {
                RedShaderInfo(testGL, 'testSource', RedShaderInfo.VERTEX_SHADER, 9999999)
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedShaderInfo - 지정된 상수만 허용 : RedShaderInfo.VERTEX_SHADER or RedShaderInfo.FRAGMENT_SHADER", function (unit) {
            var t0;
            t0 = true
            try {
                RedShaderInfo(testGL, 'testSource2', 1, testGL.getSourceFromScript('shader-vs'))
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false)
    ),
    redGroup(
        '인스턴스확인', redTest("RedShaderInfo - 인스턴스 정보확인 : key", function (unit) {
            var t0;
            t0 = RedShaderInfo(testGL, 'basic', RedShaderInfo.VERTEX_SHADER)
            unit.run(t0['key'])
        }, 'basic'),
        redTest("RedShaderInfo - 인스턴스 정보확인 : key", function (unit) {
            var t0;
            t0 = RedShaderInfo(testGL, 'basic', RedShaderInfo.FRAGMENT_SHADER)
            unit.run(t0['key'])
        }, 'basic'),
        redTest("RedShaderInfo - 인스턴스 정보확인 : type", function (unit) {
            var t0;
            t0 = RedShaderInfo(testGL, 'basic', RedShaderInfo.FRAGMENT_SHADER)
            unit.run(t0['type'])
        }, RedShaderInfo.FRAGMENT_SHADER),
        redTest("RedShaderInfo - 인스턴스 정보확인 : parseData", function (unit) {
            var t0;
            t0 = RedShaderInfo(testGL, 'basic', RedShaderInfo.VERTEX_SHADER)
            unit.run(t0['parseData'][0])
        }, "attribute vec3 aVertexPosition"),
        redTest("RedShaderInfo - 인스턴스 정보확인 : parseData", function (unit) {
            var t0;
            t0 = RedShaderInfo(testGL, 'basic', RedShaderInfo.VERTEX_SHADER)
            unit.run(t0['parseData'][1])
        }, "uniform mat4 uMVMatrix"),
        redTest("RedShaderInfo - 인스턴스 정보확인 : shader", function (unit) {
            var t0;
            t0 = RedShaderInfo(testGL, 'basic', RedShaderInfo.VERTEX_SHADER)
            unit.run(t0['shader'] instanceof WebGLShader)
        }, true)
    )
)
