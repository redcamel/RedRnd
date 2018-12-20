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
            (function () {
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
                        var tList;
                        var checkCode;
                        checkCode = function(v){
                            var t0;
                            var str1,str2
                            var result
                            t0 = v.split(' = ')
                            str1 = t0[0]
                            str1 = str1.split(' ')
                            str1 = str1[str1.length-1]
                            str2 = t0[1].replace(';','').trim()
                            console.log(str1,str2)
                            if(str2.indexOf('textureColor')==-1){
                                // 추적해서 찾아야함
                                var i,len
                                var v2
                                i =0,len = tList.length
                                for(i;i<len;i++){
                                    v2 = tList[i]
                                    console.log(str2, v2)
                                    console.log(v2.indexOf(str2 + ' = '))
                                    if (v2.indexOf(str2 + ' = ') > -1) {
                                        return checkCode(v2)
                                        break
                                    }
                                }
                            }else return str2.split('_')[1]
                            
                        }
                        tList = f.split('\n')
                        tList.forEach(function (v,index) {
                            if (v.indexOf('vec4 texelColor_DIFFUSE = ') > -1) {
                                var t0 = checkCode(v)
                                console.log('체크결과',t0)
                                target.uniforms['uTexture_' + t0] = target['diffuseInfo']
                            }
                            if (v.indexOf('vec4 texelColor_NORMAL = ') > -1) {
                                var t0 = checkCode(v)
                                console.log('체크결과',t0)
                                target.uniforms['uTexture_' + t0] = target['normalInfo']
                            }
                            if (v.indexOf('vec4 texelColor_SPECULAR = ') > -1) {
                                var t0 = checkCode(v)
                                console.log('체크결과',t0)
                                target.uniforms['uTexture_' + t0] = target['specularInfo']
                            }                           
                        })
                        target.uniforms.uDisplacementTexture = target['displacementInfo']
                        target.uniforms.uUseNormalTexture = 0
                        target.uniforms.uUseDisplacementTexture = 0
                        target.uniforms.uShininess = 32
                        target.uniforms.uAtlascoord = RedAtlasUVInfo([0, 0, 1, 1])

                        console.log('결과가', target)
                    }
                );
                (function () {
                    var tList;
                    tList = f.split('\n')

                    tList.forEach(function (v) {
                        if (v.indexOf('vec4 texelColor_DIFFUSE = ') > -1) {
                            tTextureDiffuse = testGL.createTextureInfo('../../asset/fieldstone.jpg')
                        }
                        if (v.indexOf('vec4 texelColor_NORMAL = ') > -1) {
                            tTextureNormal = testGL.createTextureInfo('../../asset/fieldstone-normal.jpg', RedTextureIndex.NORMAL)
                        }
                        if (v.indexOf('vec4 texelColor_SPECULAR = ') > -1) {
                            tTextureSpecular = testGL.createTextureInfo('../../asset/tile/specular.png', RedTextureIndex.SPECULAR)
                        }
                    })
                    if (Recard.query('[nodeType="Final"] [key="DISPLACEMENT"]')['info']['from']) {
                        tTextureDisplacement = testGL.createTextureInfo('../../asset/displacement.jpg', RedTextureIndex.DISPLACEMENT)
                    }
                })();

                console.log(tTextureDiffuse, tTextureNormal, tTextureDisplacement, tTextureSpecular)
                try {
                    testGL.createMaterialDefine(testGL.getProgramInfo(tName))
                    var t2 = testGL.createMaterialInfo(tName, tTextureDiffuse, tTextureNormal, tTextureDisplacement, tTextureSpecular)
                    console.log('결과가2', t2)
                    tMesh.materialInfo = t2    
                } catch (error) {
                    
                }
                
            })()
        }
    })()
    result = {
        setTest: setTest,
        init: function () {
            rootBox = Recard.Dom('div').S(
                'position', 'fixed',
                'top', 0,
                'left', 0,
                'width', 400,
                'height', 400,
                'overflow', 'hidden',
                'background', '#222',
                '>', testCvs = Recard.Dom('canvas').S(
                    '@width', 400,
                    '@height', 400
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
                tMesh = testGL.createMeshInfo('testMesh', RedPrimitive.sphere(testGL, 15, 32, 32, 32), testMat)
                // tMesh = testGL.createMeshInfo('testMesh', RedPrimitive.cube(testGL, 15,15,15, 32, 32, 32), testMat)

                testScene.children.push(tMesh)
                var renderer = testGL.createBaseRenderInfo(testScene, function (time) {
                    testCamera.setPosition(Math.sin(time / 3000) * 60, 60, Math.cos(time / 5000) * 40)
                    testCamera.lookAt([0, 0, 0])
                    var i = testScene['lights']['directional'].length
                    while (i--) {
                        testScene['lights']['directional'][i].direction[0] = Math.sin(time / 1700 + Math.PI*2/3*i) * 30
                        testScene['lights']['directional'][i].direction[1] = Math.cos(time / 4400 + Math.PI*2/3*i) * 20 + Math.sin(time / 2700 + Math.PI*2/3*i) * 50
                        testScene['lights']['directional'][i].direction[2] = Math.sin(time / 2200 + Math.PI*2/3*i) * 30
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
                    testLight.direction[0] = -1
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