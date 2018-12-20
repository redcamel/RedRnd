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
        return function (v, f) {
            console.log('실행')
            var tName = 'testShader' + index
            index++

            v = `attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTexcoord;
// 기본유니폼
uniform mat4 uMVMatrix;
uniform mat4 uNMatrix;
uniform mat4 uCameraMatrix;            
uniform mat4 uPMatrix;
uniform vec4 uAtlascoord;
uniform sampler2D uDisplacementTexture; // DisplacementTexture
uniform int uUseDisplacementTexture; // DisplacementTexture 사용여부


// 베어링들
varying vec2 vTexcoord;  

varying vec3 vEyeVec;
varying vec3 vNormal;
vec4 vertexPositionEye4;
void main(void) {
    vertexPositionEye4 = uMVMatrix * vec4(aVertexPosition, 1.0);
    vTexcoord = uAtlascoord.xy + aTexcoord*uAtlascoord.zw;
    vNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0)); 
    vEyeVec = -vertexPositionEye4.xyz;
    if(uUseDisplacementTexture == 1) {
        vertexPositionEye4.xyz += normalize(vNormal) * texture2D(uDisplacementTexture,vTexcoord).x;
    }
    // 포지션 결정
    gl_Position = uPMatrix * uCameraMatrix *  vertexPositionEye4;
}
`
            console.log('~~~~~~~~~~~')
            f = 'precision lowp float;\n' + f
            console.log(v)
            console.log(f);
            (function(){
                var tTextureDiffuse
                var tTextureNormal
                var tTextureSpecular
                var tTextureDisplacement
                testGL.createShaderInfo(tName, RedShaderInfo.VERTEX_SHADER, v)
                testGL.createShaderInfo(tName, RedShaderInfo.FRAGMENT_SHADER, f)
                testGL.createProgramInfo(
                    tName,
                    testGL.getShaderInfo(tName, RedShaderInfo.VERTEX_SHADER),
                    testGL.getShaderInfo(tName, RedShaderInfo.FRAGMENT_SHADER),
                    function (target) {
                        var root, tList;
                        root = Recard.query('[nodeType="Final"]')
                        tList = root.queryAll('[key]')
                        tList = tList.filter(function (item) {
                            if (item['info']['from']) return true
                        })
                        var i = tList.length
                        while(i--){
                            var item = tList[i]
                            console.log(item['info']['from'])
                            if (item.S('@key') == 'DIFFUSE' && item['info']['from']) {
                                console.log('디퓨즈를 먹는다.')
                                // target.uniforms['uTexture_' + item['info']['from'].parent().parent()['structureInfo']['index']] = target['diffuseInfo']
                                // target.uniforms['uTexture_' + 0] = target['diffuseInfo']
                            }
                            if (item.S('@key') == 'NORMAL' && item['info']['from']) {
                               
                            }
                            if (item.S('@key') == 'SPECULAR' && item['info']['from']) {
                               
                            }
                           
                        }
                        target.uniforms.uAtlascoord = RedAtlasUVInfo([0, 0, 1, 1])
                        console.log('결과가',target)       
                    }
                );
                (function(){
                    var root, tList;
                    root = Recard.query('[nodeType="Final"]')
                    tList = root.queryAll('[key]')
                    tList = tList.filter(function (item) {
                        if (item['info']['from']) return true
                    })
                    var i = tList.length
                    while(i--){
                        var item = tList[i]
                        console.log(item['info']['from'])
                        if (item.S('@key') == 'DIFFUSE' && item['info']['from']) {
                            console.log('디퓨즈를 먹는다.')
                            tTextureDiffuse = testGL.createTextureInfo('../../asset/fieldstone.jpg')
                        }
                        if (item.S('@key') == 'NORMAL' && item['info']['from']) {
                            console.log('노멀을 먹는다.')
                            tTextureNormal = testGL.createTextureInfo('../../asset/fieldstone-normal.jpg', RedTextureIndex.NORMAL)
                        }
                        if (item.S('@key') == 'SPECULAR' && item['info']['from']) {
                           
                        }
                       
                    }
                })();

                console.log(tTextureDiffuse, tTextureNormal, tTextureDisplacement, tTextureSpecular)
                testGL.createMaterialDefine(testGL.getProgramInfo(tName))
                var t2 = testGL.createMaterialInfo(tName, tTextureDiffuse, tTextureNormal, tTextureDisplacement, tTextureSpecular)
                console.log('결과가',t2)       
                tMesh.materialInfo = t2
            })()
        }
    })()
    result = {
        setTest : setTest,
        init: function () {
            rootBox = Recard.Dom('div').S(
                'position', 'fixed',
                'top', 0,
                'left', 0,
                'width', 400,
                'height', 400,
                'overflow', 'hidden',
                'background','#222',
                '>', testCvs = Recard.Dom('canvas').S(
                    '@width',400,
                    '@height',400
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
                tMesh = testGL.createMeshInfo('testMesh', RedPrimitive.sphere(testGL, 10, 32, 32, 32), testMat)

                testScene.children.push(tMesh)
                var renderer = testGL.createBaseRenderInfo(testScene, function (time) {
                    testCamera.setPosition(Math.sin(time / 3000) * 60, 60, Math.cos(time / 5000) * 40)
                    testCamera.lookAt([0, 0, 0])
                    var i = testScene['lights']['directional'].length
                    while (i--) {
                        testScene['lights']['directional'][i].direction[0] = Math.sin(time / 1700 + i) * 30
                        testScene['lights']['directional'][i].direction[1] = Math.cos(time / 4400 + i) * 20 + Math.sin(time / 2700 + i) * 50
                        testScene['lights']['directional'][i].direction[2] = Math.sin(time / 2200 + i) * 30
                    }
                })
                // 엠비언트 라이트 테스트
                var testLight = testGL.createAmbientLight(testGL)
                console.log(testLight)
                testScene.addLight(testLight)

                // 디렉셔널 라이트 테스트
                var i = 3
                while (i--) {
                    var testLight = testGL.createDirectionalLight(testGL)
                    testLight.direction[0] = 0
                    testLight.direction[1] = -1
                    testLight.direction[2] = 0
                    testLight.color[0] = Math.random()
                    testLight.color[1] = Math.random()
                    testLight.color[2] = Math.random()
                    testScene.addLight(testLight)

                }
                renderer.start()
                // Recard.WIN_RESIZER.add('testGL',function(){
                //     testGL.setSize(document.body.clientWidth,document.body.clientHeight)
                // })
                // testGL.setSize(document.body.clientWidth,document.body.clientHeight)
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