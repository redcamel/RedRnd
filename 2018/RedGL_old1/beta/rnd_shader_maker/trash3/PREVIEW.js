
'use strict';
var testGL
Recard.static('PREVIEW', (function () {
    var result;
    var rootBox
    var testCvs
    var testScene, testCamera
    var testMat, tMesh
    var setTest
    setTest = (function () {
        var index;
        index = 1
        return function (v, f, unifromInfo) {
            console.log('실행')
            var tName = 'testShader' + index
            index++

            v = `attribute vec3 aVertexPosition;
attribute vec2 aTexcoord;
uniform mat4 uMVMatrix;
uniform mat4 uCameraMatrix;   
uniform mat4 uPMatrix;
uniform vec4 uAtlascoord;
varying vec2 vTexcoord;  
void main(void) {
gl_Position = uPMatrix * uCameraMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
vTexcoord = uAtlascoord.xy + aTexcoord*uAtlascoord.zw;
}`
            console.log('~~~~~~~~~~~')
            f = 'precision lowp float;\n' + f
            console.log(v)
            console.log(f)
         
            var tTextrue
            var tTextrue2
            var tTextrue3
            unifromInfo = unifromInfo['define']['uniforms']
            console.log(unifromInfo)
            testGL.createShaderInfo(tName, RedShaderInfo.VERTEX_SHADER, v)
            testGL.createShaderInfo(tName, RedShaderInfo.FRAGMENT_SHADER, f)
            testGL.createProgramInfo(
                tName,
                testGL.getShaderInfo(tName, RedShaderInfo.VERTEX_SHADER),
                testGL.getShaderInfo(tName, RedShaderInfo.FRAGMENT_SHADER),
                function (target) {
                    unifromInfo = JSON.parse(JSON.stringify(unifromInfo))
                    unifromInfo.forEach(function (data) {
                        var resultDst = data.origin[1]
                        console.log(data,resultDst)
                        if (data['dataType'] == 'sampler2D') {
                            if (resultDst == 'DIFFUSE') target.uniforms[data['name']] = target['diffuseInfo']
                            if (resultDst == 'NORMAL') {
                                console.log('걸리냐!!!!!!!!!!!!')
                                target.uniforms[data['name']] = target['normalInfo']
                            }
                            if (resultDst == 'SPECULAR') {
                                console.log('걸리냐!222!!!!!!!!!!!')
                                target.uniforms[data['name']] = target['specularInfo']
                            }
                        }
                    })

                    target.uniforms.uAtlascoord = RedAtlasUVInfo([0, 0, 1, 1])
                }
            )
            tTextrue = testGL.createTextureInfo('../asset/fieldstone.jpg')
            tTextrue2 = testGL.createTextureInfo('../asset/fieldstone-normal.jpg', RedTextureIndex.NORMAL)
            tTextrue3 = testGL.createTextureInfo('../asset/draft1.png', RedTextureIndex.SEPCULAR)
            testGL.createMaterialDefine(testGL.getProgramInfo(tName))
            setTimeout(function () {
                var t2 = testGL.createMaterialInfo(tName, tTextrue, tTextrue2,null,tTextrue3)

                tMesh.materialInfo = t2
            }, 500)
        }
    })()
    result = {
        setTest: setTest,
        init: function () {
            rootBox = Recard.Dom('div').S(
                'position', 'fixed',
                'z-index', 10,
                'top', 0,
                'left', 0,
                'width', 400,
                'height', 400,
                'background', '#000',
                '>', testCvs = Recard.Dom('canvas').S(
                    '@width', 400,
                    '@height', 400,
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
                        '../asset/cubemap/posx.jpg',
                        '../asset/cubemap/negx.jpg',
                        '../asset/cubemap/posy.jpg',
                        '../asset/cubemap/negy.jpg',
                        '../asset/cubemap/posz.jpg',
                        '../asset/cubemap/negz.jpg'
                    ])
                )
                testMat = testGL.createMaterialInfo('color')
                tMesh = testGL.createMeshInfo('testMesh', RedPrimitive.sphere(testGL, 10, 32, 32, 32), testMat)

                testScene.children.push(tMesh)
                var renderer = testGL.createBaseRenderInfo(testScene, function (time) {
                    testCamera.setPosition(Math.sin(time / 3000) * 60, 60, Math.cos(time / 5000) * 40)
                    testCamera.lookAt([0, 0, 0])
                })
                // 엠비언트 라이트 테스트
                var testLight = testGL.createAmbientLight(testGL)
                console.log(testLight)
                testScene.addLight(testLight)

                // 디렉셔널 라이트 테스트
                var i = 3
                while (i--) {
                    var testLight = testGL.createDirectionalLight(testGL)
                    testLight.color[0] = Math.random()
                    testLight.color[1] = Math.random()
                    testLight.color[2] = Math.random()
                    testScene.addLight(testLight)
                }
                renderer.start()
            }, false, [
                    { id: 'colorVS', src: '../glsl/colorVS.glsl' },
                    { id: 'colorFS', src: '../glsl/colorFS.glsl' },
                    { id: 'skyBoxVS', src: '../glsl/skyBoxVS.glsl' },
                    { id: 'skyBoxFS', src: '../glsl/skyBoxFS.glsl' }
                ])

        }
    }
    return result
})())