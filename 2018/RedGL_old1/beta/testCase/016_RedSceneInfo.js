"use strict";
var testGL = RedGL(
    Recard.Dom('canvas').S('width', 1000, 'height', 1000).__dom__,
    function () {
        redSuite(
            "RedSceneInfo Test",
            redGroup(
                "RedSceneInfo Test",
                redTest("생성 테스트", function (unit) {
                    var t0;
                    t0 = RedSceneInfo(testGL, 'testScene')
                    unit.run(t0 instanceof RedSceneInfo)
                }, true),
                redTest("생성 테스트 : RedGL만 허용", function (unit) {
                    var t0;
                    t0 = true
                    try {
                        RedSceneInfo(1, 'testScene')
                    } catch (error) {
                        t0 = false
                    }
                    unit.run(t0)
                }, false),
                redTest("생성 테스트 : key는 문자열만 허용", function (unit) {
                    var t0;
                    t0 = true
                    try {
                        RedSceneInfo(testGL, 1)
                    } catch (error) {
                        t0 = false
                    }
                    unit.run(t0)
                }, false),
                redTest("생성 테스트 : key는 문자열만 허용2", function (unit) {
                    var t0;
                    t0 = true
                    try {
                        RedSceneInfo(testGL)
                    } catch (error) {
                        t0 = false
                    }
                    unit.run(t0)
                }, false),
                redTest("생성 테스트 : 카메라 미지정시 자동생성", function (unit) {
                    var t0;
                    t0 = RedSceneInfo(testGL, 'testScene2')
                    unit.run(t0['camera'] instanceof RedBaseCameraInfo)
                }, true),
                redTest("setSkyBox : RedSkyBoxInfo만 허용", function (unit) {
                    var t0, t1;
                    t0 = RedSceneInfo(testGL, 'testScene3')
                    t1 = true

                    try {
                        t0.setSkyBox(
                            testGL.createSkyBoxInfo([
                                '../asset/cubemap/posx.jpg',
                                '../asset/cubemap/negx.jpg',
                                '../asset/cubemap/posy.jpg',
                                '../asset/cubemap/negy.jpg',
                                '../asset/cubemap/posz.jpg',
                                '../asset/cubemap/negz.jpg'
                            ])
                        )
                    } catch (error) {
                        t1 = false
                    }

                    unit.run(t1)
                }, true),
                redTest("setSkyBox : RedSkyBoxInfo만 허용2", function (unit) {
                    var t0, t1;
                    t0 = RedSceneInfo(testGL, 'testScene4')
                    t1 = true

                    try {
                        t0.setSkyBox(
                            testGL.createTextureInfo('../asset/cubemap/posx.jpg')
                        )
                    } catch (error) {
                        t1 = false
                    }

                    unit.run(t1)
                }, false)

            )
        )

    },
    true,
    [
        {
            name: 'skyBox',
            shaderInfo: {
                vs: { id: 'skyBoxVS', src: '../glsl/skyBoxVS.glsl' },
                fs: { id: 'skyBoxFS', src: '../glsl/skyBoxFS.glsl' }
            },
            onInitUniformValue: function (target) {

            },
            onDefineTexture: function (target) {
                target.materialUniforms.uSkybox = target['uDiffuseTexture']
            }
        }
    ]
)
