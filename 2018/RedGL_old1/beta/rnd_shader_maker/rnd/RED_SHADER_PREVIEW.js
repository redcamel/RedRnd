'use strict';
var testGL
Recard.static('RED_SHADER_PREVIEW', (function () {
    var result;
    var rootBox
    var testCvs
    var testScene, testCamera
    var testMat, tMesh
    var setTest
    setTest = (function () {
        var index;
        index = 1
        return function (vSource, fSource, vertex_textureInfo, fragment_textureInfo) {
            var tName = 'testShader' + index
            index++
            console.log(vSource), console.log(fSource);
            (function () {
                var tTextureDiffuse
                var tTextureNormal
                var tTextureSpecular
                var tTextureDisplacement
                var tEtc_VERTEX_1, tEtc_VERTEX_2, tEtc_FRAGMENT_1, tEtc_FRAGMENT_2
                try {
                    testGL.createShaderInfo(tName, RedShaderInfo.VERTEX_SHADER, vSource)
                    testGL.createShaderInfo(tName, RedShaderInfo.FRAGMENT_SHADER, fSource)
                    testGL.createProgramInfo(
                        tName,
                        testGL.getShaderInfo(tName, RedShaderInfo.VERTEX_SHADER),
                        testGL.getShaderInfo(tName, RedShaderInfo.FRAGMENT_SHADER),
                        function (target) {
                            target.materialUniforms.uShininess = 8
                            target.materialUniforms.uAtlascoord = RedAtlasUVInfo([0, 0, 1, 1])
                            console.log('결과가', target)
                        },
                    );
                    for (var k in fragment_textureInfo) {
                        console.log('뭐가오냐', fragment_textureInfo[k])
                        console.log(fragment_textureInfo[k]['src'])
                        var tStc = fragment_textureInfo[k]['src']
                        switch (fragment_textureInfo[k]['textureIndex']) {
                            case RedTextureIndex.DIFFUSE:
                                tTextureDiffuse = testGL.createTextureInfo(tStc)
                                break
                            case RedTextureIndex.NORMAL:
                                tTextureNormal = testGL.createTextureInfo(tStc, RedTextureIndex.NORMAL)
                                break
                            case RedTextureIndex.SPECULAR:
                                tTextureSpecular = testGL.createTextureInfo(tStc, RedTextureIndex.SPECULAR)
                                break
                            case RedTextureIndex.ETC_FRAGMENT_1:
                                tEtc_FRAGMENT_1 = testGL.createTextureInfo(tStc, RedTextureIndex.ETC_FRAGMENT_1)
                                break
                            case RedTextureIndex.ETC_FRAGMENT_2:
                                tEtc_FRAGMENT_2 = testGL.createTextureInfo(tStc, RedTextureIndex.ETC_FRAGMENT_2)
                                break
                        }
                    }
                    for (var k in vertex_textureInfo) {
                        console.log('뭐가오냐', vertex_textureInfo[k])
                        console.log(vertex_textureInfo[k]['src'])
                        var tStc = vertex_textureInfo[k]['src']
                        switch (vertex_textureInfo[k]['textureIndex']) {
                            case RedTextureIndex.DISPLACEMENT:
                                tTextureDisplacement = testGL.createTextureInfo(tStc, RedTextureIndex.DISPLACEMENT)
                                break
                            case RedTextureIndex.ETC_VERTEX_1:
                                tEtc_VERTEX_1 = testGL.createTextureInfo(tStc, RedTextureIndex.ETC_VERTEX_1)
                                break
                            case RedTextureIndex.ETC_VERTEX_2:
                                tEtc_VERTEX_2 = testGL.createTextureInfo(tStc, RedTextureIndex.ETC_VERTEX_2)
                                break
                        }
                    }
                    console.log(tTextureDiffuse, tTextureNormal, tTextureDisplacement, tTextureSpecular)
                    testGL.createMaterialDefine(testGL.getProgramInfo(tName))
                    var t2 = testGL.createMaterialInfo(tName)
                    for (var k in fragment_textureInfo) {
                        var tTextureUniformKey;
                        tTextureUniformKey = fragment_textureInfo[k]['textureUniformKey']
                        switch (fragment_textureInfo[k]['textureIndex']) {
                            case RedTextureIndex.DIFFUSE:
                                t2.materialUniforms[tTextureUniformKey] = tTextureDiffuse
                                break
                            case RedTextureIndex.NORMAL:
                                t2.materialUniforms[tTextureUniformKey] = tTextureNormal
                                break
                            case RedTextureIndex.SPECULAR:
                                t2.materialUniforms[tTextureUniformKey] = tTextureSpecular
                                break
                            case RedTextureIndex.ETC_FRAGMENT_1:
                                t2.materialUniforms[tTextureUniformKey] = tEtc_FRAGMENT_1
                                break
                            case RedTextureIndex.ETC_FRAGMENT_2:
                                t2.materialUniforms[tTextureUniformKey] = tEtc_FRAGMENT_2
                                break
                        }
                    }
                    for (var k in vertex_textureInfo) {
                        var tTextureUniformKey;
                        tTextureUniformKey = vertex_textureInfo[k]['textureUniformKey']
                        switch (vertex_textureInfo[k]['textureIndex']) {
                            case RedTextureIndex.DISPLACEMENT:
                                t2.materialUniforms[tTextureUniformKey] = tTextureDisplacement
                                break
                            case RedTextureIndex.ETC_VERTEX_1:
                                t2.materialUniforms[tTextureUniformKey] = tEtc_VERTEX_1
                                break
                            case RedTextureIndex.ETC_VERTEX_2:
                                t2.materialUniforms[tTextureUniformKey] = tEtc_VERTEX_2
                                break
                        }
                    }
                    console.log('결과가2', t2)
                    t2['needUniformList'] = true
                    tMesh.materialInfo = t2
                } catch (error) {
                    console.log('재질생성실패!', error)
                }

            })()
        }
    })()
    result = {
        setTest: setTest,
        init: function () {
            rootBox = Recard.Dom('div').S(
                'position', 'fixed',
                'top', 0, 'left', 0,
                'width', 400, 'height', 400,
                'overflow', 'hidden',
                'background', '#222',
                '>', testCvs = Recard.Dom('canvas').S(
                    '@width', 400, '@height', 400
                ),
                '<', 'body'
            )
            testGL = RedGL(testCvs.__dom__, function () {
                // 카메라생성
                testCamera = testGL.createBaseCameraInfo('testCamera')
                // Scene 생성
                testScene = testGL.createSceneInfo('testScene', testCamera)
                // 스카이박스 생성
                testScene.setSkyBox(
                    testGL.createSkyBoxInfo([
                        '../../asset/cubemap/posx.jpg',
                        '../../asset/cubemap/negx.jpg',
                        '../../asset/cubemap/posy.jpg',
                        '../../asset/cubemap/negy.jpg',
                        '../../asset/cubemap/posz.jpg',
                        '../../asset/cubemap/negz.jpg'
                    ])
                )
                testMat = testGL.createMaterialInfo('color')
                tMesh = testGL.createMeshInfo('testMesh', RedPrimitive.sphere(testGL, 3, 32, 32, 32), testMat)

                // tMesh.drawMode = testGL.gl.LINES
                // tMesh = testGL.createMeshInfo('testMesh', RedPrimitive.cube(testGL, 20, 20,20,32, 32, 32), testMat)
                testScene.children.push(tMesh)
                var renderer = testGL.createBaseRenderInfo(testScene, function (time) {
                    testCamera.setPosition(Math.sin(time / 3000) * 10, 10, Math.cos(time / 5000) * 10)
                    testCamera.lookAt([0, 0, 0])
                    var i = testScene['lights']['directional'].length
                    while (i--) {
                        testScene['lights']['directional'][i].direction[0] = -Math.sin(time / 1700 + Math.PI * 2 / 2 * i) * 30
                        testScene['lights']['directional'][i].direction[1] = Math.cos(time / 4400 + Math.PI * 2 / 2 * i) * 20 + Math.sin(time / 2700 + Math.PI * 2 / 2 * i) * 50
                        testScene['lights']['directional'][i].direction[2] = -Math.sin(time / 2200 + Math.PI * 2 / 2 * i) * 30
                    }
                    tMesh.rotation[0] += 0.01
                    tMesh.rotation[1] += 0.01
                    tMesh.rotation[2] += 0.01
                })
                // 엠비언트 라이트 테스트
                var testLight = testGL.createAmbientLight(testGL)
                testScene.addLight(testLight)
                // 디렉셔널 라이트 테스트
                var i = 3
                while (i--) {
                    var testLight = testGL.createDirectionalLight(testGL)
                    testLight.direction[0] = -1
                    testLight.direction[1] = -1
                    testLight.direction[2] = 0
                    testScene.addLight(testLight)

                }
                renderer.start()
            }, false, [
                    {
                        name: 'color',
                        shaderInfo: {
                            vs: { id: 'colorVS', src: '../../glsl/colorVS.glsl' },
                            fs: { id: 'colorFS', src: '../../glsl/colorFS.glsl' }
                        },
                        onInitUniformValue: function (target) {
                            target.materialUniforms.uColor = new Float32Array([Math.random(), Math.random(), Math.random(), 255])
                        }
                    },
                    {
                        name: 'skyBox',
                        shaderInfo: {
                            vs: { id: 'skyBoxVS', src: '../../glsl/skyBoxVS.glsl' },
                            fs: { id: 'skyBoxFS', src: '../../glsl/skyBoxFS.glsl' }
                        },
                        onInitUniformValue: function (target) {
                            target.materialUniforms.uSkybox = target['uDiffuseTexture']
                        }
                    }
                ])
        }
    }
    return result
})())