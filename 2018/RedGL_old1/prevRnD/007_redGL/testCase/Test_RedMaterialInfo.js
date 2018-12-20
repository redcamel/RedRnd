"use strict";
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
    fShaderInfo,
    function(target){
        target.uniforms.uColor = new Float32Array([Math.random(), Math.random(), Math.random()])
    }
)
RedMaterialDefine(testGL, testGL.getProgramInfo('basic'))
redSuite(
    "RedMaterialInfo Test",
    redGroup(
        "RedMaterialInfo Test",
        redTest("RedMaterialInfo - 인스턴스 생성 테스트", function (unit) {
            var t0;
            t0 = testGL.createMaterialInfo('basic')
            unit.run(t0 instanceof RedMaterialInfo)
        }, true)
    ),
    redGroup(
        '벨리데이션 확인',
        redTest("RedMaterialInfo - RedGL 인스턴스만허용 : redGL", function (unit) {
            var t0;
            t0 = true
            try {
                RedMaterialInfo(1, testGL.getProgramInfo('test1'))
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("RedMaterialInfo - 타입명은 문자열만 혀용 : typeName", function (unit) {
            var t0;
            t0 = true
            try {
                testGL.createMaterialInfo(1)
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false)
    ),
    redGroup(
        '인스턴스확인',
        redTest("RedMaterialInfo - programInfo 타입확인", function (unit) {
            var t0;
            t0 = testGL.createMaterialInfo('basic')
            unit.run(t0['programInfo'] instanceof RedProgramInfo)
        }, true),
        redTest("RedMaterialInfo - needUniformList 초기값확인", function (unit) {
            var t0;
            t0 = testGL.createMaterialInfo('basic')

            unit.run(t0['needUniformList'])
        }, true),
        redTest("RedMaterialInfo - 유니폼정보가 잘들어오는지확인", function (unit) {
            var t0;
            t0 = testGL.createMaterialInfo('basic')
            console.log(t0)
            unit.run(t0['uniforms'].hasOwnProperty('uColor'))
        }, true)
    )
)
