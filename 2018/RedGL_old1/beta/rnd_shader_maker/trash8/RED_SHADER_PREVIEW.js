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
        return function (v, f, textureInfo) {
            var tName = 'testShader' + index
            index++
            v = Structure_Final_VS_Info['draft']
            console.log(v), console.log(f);
            (function () {
                var tTextureDiffuse
                var tTextureNormal
                var tTextureSpecular
                var tTextureDisplacement
                var tEtc1, tEtc2, tEtc3, tEtc4
                try {
                    testGL.createShaderInfo(tName, RedShaderInfo.VERTEX_SHADER, v)
                    testGL.createShaderInfo(tName, RedShaderInfo.FRAGMENT_SHADER, f)
                    testGL.createProgramInfo(
                        tName,
                        testGL.getShaderInfo(tName, RedShaderInfo.VERTEX_SHADER),
                        testGL.getShaderInfo(tName, RedShaderInfo.FRAGMENT_SHADER),
                        function (target) {
                          
                            target.uniforms.uShininess = 8
                            target.uniforms.uAtlascoord = RedAtlasUVInfo([0, 0, 1, 1])

                            console.log('결과가', target)
                        }
                    );
                    for (var k in textureInfo) {
                        console.log('뭐가오냐', textureInfo[k])
                        console.log(textureInfo[k]['src'])
                        var tStc = textureInfo[k]['src']
                        switch (textureInfo[k]['textureIndex']) {
                            case RedTextureIndex.DIFFUSE:
                                tTextureDiffuse = testGL.createTextureInfo(tStc)
                                break
                            case RedTextureIndex.NORMAL:
                                tTextureNormal = testGL.createTextureInfo(tStc, RedTextureIndex.NORMAL)
                                break
                            case RedTextureIndex.SPECULAR:
                                tTextureSpecular = testGL.createTextureInfo(tStc, RedTextureIndex.SPECULAR)
                                break
                            case RedTextureIndex.DISPLACEMENT:
                                tTextureDisplacement = testGL.createTextureInfo(tStc, RedTextureIndex.DISPLACEMENT)
                                break
                            case RedTextureIndex.ETC1:
                                tEtc1 = testGL.createTextureInfo(tStc, RedTextureIndex.ETC1)
                                break
                            case RedTextureIndex.ETC2:
                                tEtc2 = testGL.createTextureInfo(tStc, RedTextureIndex.ETC2)
                                break
                            case RedTextureIndex.ETC3:
                                tEtc3 = testGL.createTextureInfo(tStc, RedTextureIndex.ETC3)
                                break
                            case RedTextureIndex.ETC4:
                                tEtc4 = testGL.createTextureInfo(tStc, RedTextureIndex.ETC4)
                                break
                        }
                    }
                    console.log(tTextureDiffuse, tTextureNormal, tTextureDisplacement, tTextureSpecular)
                    testGL.createMaterialDefine(testGL.getProgramInfo(tName))
                    var t2 = testGL.createMaterialInfo(tName)
                    for (var k in textureInfo) {
                        var tTextureUniformKey;
                        tTextureUniformKey = textureInfo[k]['textureUniformKey']
                        switch (textureInfo[k]['textureIndex']) {
                            case RedTextureIndex.DIFFUSE:
                                t2['diffuseInfo'] = tTextureDiffuse
                                t2.uniforms[tTextureUniformKey] = t2['diffuseInfo']
                                break
                            case RedTextureIndex.NORMAL:
                                t2['normalInfo'] = tTextureNormal
                                t2.uniforms[tTextureUniformKey] = t2['normalInfo']
                                break
                            case RedTextureIndex.SPECULAR:
                                t2['specularInfo'] = tTextureSpecular
                                t2.uniforms[tTextureUniformKey] = t2['specularInfo']
                                break
                            case RedTextureIndex.DISPLACEMENT:
                                t2['displacementInfo'] = tTextureDisplacement
                                t2.uniforms[tTextureUniformKey] = t2['displacementInfo']
                                break
                            case RedTextureIndex.ETC1:
                                t2[tTextureUniformKey] = tEtc1
                                t2.uniforms[tTextureUniformKey] = t2[tTextureUniformKey]
                                break
                            case RedTextureIndex.ETC2:
                                t2[tTextureUniformKey] = tEtc2
                                t2.uniforms[tTextureUniformKey] = t2[tTextureUniformKey]
                                break
                            case RedTextureIndex.ETC3:
                                t2[tTextureUniformKey] = tEtc3
                                t2.uniforms[tTextureUniformKey] = t2[tTextureUniformKey]
                                break
                            case RedTextureIndex.ETC4:
                                t2[tTextureUniformKey] = tEtc4
                                t2.uniforms[tTextureUniformKey] = t2[tTextureUniformKey]
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
                testGL.createShaderInfo('color', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('colorVS'))
                testGL.createShaderInfo('color', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('colorFS'))
                testGL.createShaderInfo('skyBox', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('skyBoxVS'))
                testGL.createShaderInfo('skyBox', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('skyBoxFS'))
                testGL.createProgramInfo(
                    'color',
                    testGL.getShaderInfo('color', RedShaderInfo.VERTEX_SHADER),
                    testGL.getShaderInfo('color', RedShaderInfo.FRAGMENT_SHADER),
                    function (target) {
                        target.uniforms.uColor = new Float32Array([Math.random(), Math.random(), Math.random(), 255])
                    }
                )
                testGL.createProgramInfo(
                    'skyBox',
                    testGL.getShaderInfo('skyBox', RedShaderInfo.VERTEX_SHADER),
                    testGL.getShaderInfo('skyBox', RedShaderInfo.FRAGMENT_SHADER),
                    function (target) {
                        target.uniforms.uSkybox = target['diffuseInfo']

                    }
                )
                testGL.createMaterialDefine(testGL.getProgramInfo('color'))
                testGL.createMaterialDefine(testGL.getProgramInfo('skyBox'))
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
                var i = 2
                while (i--) {
                    var testLight = testGL.createDirectionalLight(testGL)
                    testLight.direction[0] = -1
                    testLight.direction[1] = -1
                    testLight.direction[2] = 0
                    testScene.addLight(testLight)

                }
                renderer.start()
            }, false, [
                    { id: 'colorVS', src: '../../glsl/colorVS.glsl' },
                    { id: 'colorFS', src: '../../glsl/colorFS.glsl' },
                    { id: 'skyBoxVS', src: '../../glsl/skyBoxVS.glsl' },
                    { id: 'skyBoxFS', src: '../../glsl/skyBoxFS.glsl' }
                ])
        }
    }
    return result
})())