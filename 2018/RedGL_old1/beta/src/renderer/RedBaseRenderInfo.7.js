"use strict";
var RedBaseRenderInfo;
/**DOC:
    {
        constructorYn : true,
        title :`RedBaseRenderInfo`,
        description : `
           - 렌더러
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            redScene : [
                {type:'RedSceneInfo'},
                '- RedSceneInfo을 일단 최초 렌더 그룹으로 본다.',
                `- <span style="color:red"><b>
                   - 월드는 과연필요한가 -_-?
                   - 씬이 카메라는 먹으면 어짜피 같은효과가 아닌가?
                 </b></span>
                `
            ],
            callback : [
                {type:'Function'},
                '- 루프시 사전에 돌릴 콜백등록'
            ]
        },
        example : `
            var renderer = testGL.createBaseRenderInfo(RedGL Instance, RedSceneInfo Instance, function (time) {
                // 렌더링시 사전호출될 콜백
            })
            renderer.start()
        `,
        return : 'RedBaseRenderInfo Instance'
    }
:DOC*/
(function () {
    var tDatas;
    var SIN, COS;
    var emptyCubeMap;
    var emptyCube = {}
    var checkCallBox;
    /////
    var INT
    var FLOAT
    var VEC
    var MAT
    var SAMPLER
    var ATLASCOORD
    var RENDER_TYPE
    var WEBGL_TEXTURE_YN
    var WEBGL_TEXTURE
    var WEBGL_ATLAS_TEXTURE
    var LOADED
    var DRAW_MODE
    var POINT_NUM
    var CHILDREN
    var USE_CULL_FACE,CULL_FACE
    var UNIFORM_METHOD
    var POSITION,ROTATION,SCALE
    var TARGET_INDEX
    var UUID
    var LOCATION
    var KEY
    var GL_TEXTURE_2D
    var GL_TEXTURE_CUBE_MAP
    var GL_ARRAY_BUFFER
    var GL_ELEMENT_ARRAY_BUFFER
    var GL_UNSIGNED_SHORT
    var GL_DEPTH_TEST
    var GL_TEXTURE0
    var GL_CULL_FACE
    ///
    SIN = Math.sin, COS = Math.cos
    emptyCube = {}
    RedBaseRenderInfo = function (redGL, redScene, callback) {
        if (!(this instanceof RedBaseRenderInfo)) return new RedBaseRenderInfo(redGL, redScene, callback)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        ////
        INT = RedConst.INT
        FLOAT = RedConst.FLOAT
        VEC = RedConst.VEC
        MAT = RedConst.MAT
        SAMPLER = RedConst.SAMPLER
        ATLASCOORD = RedConst.ATLASCOORD
        RENDER_TYPE = RedConst.RENDER_TYPE
        WEBGL_TEXTURE_YN = '__webglTextureYn'
        WEBGL_TEXTURE = '__webglTexture'
        WEBGL_ATLAS_TEXTURE = '__webglAtlasTexture'
        LOADED = 'loaded'
        DRAW_MODE = 'drawMode'
        POINT_NUM = 'pointNum'
        CHILDREN = 'children'
        UNIFORM_METHOD = '__uniformMethod'
        POSITION = 'position'
        ROTATION = 'rotation'
        SCALE = 'scale'
        USE_CULL_FACE = 'useCullFace'
        CULL_FACE = 'cullFace'
        TARGET_INDEX = '__targetIndex'
        UUID = '__UUID'
        LOCATION = 'location'
        KEY = 'key'
        GL_TEXTURE_2D = redGL.gl.TEXTURE_2D
        GL_TEXTURE_CUBE_MAP = redGL.gl.TEXTURE_CUBE_MAP
        GL_ARRAY_BUFFER = redGL.gl.ARRAY_BUFFER
        GL_ELEMENT_ARRAY_BUFFER = redGL.gl.ELEMENT_ARRAY_BUFFER
        GL_UNSIGNED_SHORT = redGL.gl.UNSIGNED_SHORT 
        GL_DEPTH_TEST =  redGL.gl.DEPTH_TEST 
        GL_TEXTURE0 = redGL.gl.TEXTURE0 
        GL_CULL_FACE = redGL.gl.CULL_FACE 
        
        ////
        var self;
        self = this
        // 씬생성!!
        this['callback'] = callback
        this['targetScene'] = redScene
        this[UUID] = REDGL_UUID++
        //
        var uniform1fiMAP = {
            float: 'uniform1f',
            int: 'uniform1i'
        }
        var floatData_1 = new Float32Array(1)
        var intData_1 = new Uint16Array(1)
        var k; //루프변수
        var tScene; // 대상 RedScene
        var tMesh; // 대상 메쉬
        var tMVMatrix; // 대상 메쉬의 매트릭스 
        var tNMatrix; // 대상 메쉬의 노멀매트릭스
        ///////////////////////////////////////////////////////////////////
        var a, aSx, aSy, aSz, aCx, aCy, aCz, tRx, tRy, tRz;
        var a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33;
        var b0, b1, b2, b3;
        var b00, b01, b02, b10, b11, b12, b20, b21, b22
        var aX, aY, aZ;
        ///////////////////////////////////////////////////////////////////
        var tGL; // 대상 RedGL의 gl context
        var tMaterial; // 대상 재질
        var tProgramInfo; // 대상 프로그램 정보
        var tProgram; // 대상 프로그램
        var tGeometry; // 대상 지오메트리
        var tAttrGroup; // 대상 버퍼정보그룹
        var tAttrGroupList; // 대상 버퍼정보그룹을 리스트화함
        var tAttrLocationGroup; // 대상 Attribute의 location 정보들
        var tAttrLocation; // 대상 Attribute의 location 정보들
        var tAttrBufferInfo; // 대상 RedBufferInfo 
        var tAttrPointerKey; // 대상 Attrobute가 반영될 쉐이더내의 변수이름
        var tMaterialUniformGroup; // 대상 유니폼 그룹
        var tUniformGroupList; // 대상 유니폼 그룹을 리스트화함
        var tProgramUniformLocationGroup; // 대상 프로그램의 uniform location 정보들
        var tUniformKey, tUniformValue,tProgramUseUniformValue, tUniformType; // 대상 유니폼 키와 값
        var tLocation; // 대상 location 정보
        var tIndicesBuffer; // 인덱스 버퍼
        var tVertexPositionBuffer; // 포지션 버퍼
        var tRenderType; // 
        ///////////////////////////////////////////////////////////////////
        var cacheProgram; // 이전 대상 프로그램        
        var cacheProgramInfo; // 이전 대상 프로그램객체정보
        var cacheAttrUUID; // 어트리뷰트 캐싱정보
        var cacheDrawBufferUUID; // draw버퍼 캐싱정보
        var cacheTexture_UUID; // 일반 텍스쳐 캐싱정보
        var cacheUVAtlascoord_UUID; // 아틀라스 UV텍스쳐 정보
        var cacheFloat; // int형이나 float형 캐싱정보
        var cacheInt; // int형이나 float형 캐싱정보
        var cacheUseTexture; //텍스쳐사용여부 캐싱정보
        ///////////////////////////////////////////////////////////////////
        var cacheUseCullFace; // 컬페이스 사용여부 캐싱정보
        var cacheCullFace; // 컬페이스 캐싱정보
        var cacheUseBlendMode; // 블렌드모드 사용여부 캐싱정보
        var cacheBlendModeFactor; // 블렌드팩터 캐싱정보
        var cacheUseDepthTest; // 뎁스테스트 사용여부 캐싱정보
        var cacheDepthTestFunc; // 뎁스테스트 팩터 캐싱정보
        ///////////////////////////////////////////////////////////////////
        var aspect;
        var debugPointRenderList = [];

        var useMap,useMap2, tUseMapKey, tUseMapTextureKey
        var bitmapRenderable
        useMap = [        
            ['uUseNormalTexture', 'uNormalTexture', 'NORMAL'],
            ['uUseDisplacementTexture', 'uDisplacementTexture', 'DISPLACEMENT'],
            ['uUseSpecularTexture', 'uSpecularTexture', 'SPECULAR'],
            ['uUseEtcVertexTexture1', 'uEtcVertextTexture1', 'ETC_VERTEX_1'],
            ['uUseEtcVertexTexture2', 'uEtcVertextTexture2', 'ETC_VERTEX_2'],
            ['uUseEtcFragmentTexture1', 'uEtcFragmentTexture1', 'ETC_FRAGMENT_1'],
            ['uUseEtcFragmentTexture2', 'uEtcFragmentTexture2', 'ETC_FRAGMENT_2'],
            ['uUseReflectionTexture', 'uReflectionTexture', 'CUBE_REFLECTION'],
            ['uUseRefractionTexture', 'uRefractionTexture', 'CUBE_REFRACTION']

        ]
        useMap2 = {          
            uNormalTexture : ['uUseNormalTexture', 'uNormalTexture', 'NORMAL'],
            uDisplacementTexture : ['uUseDisplacementTexture', 'uDisplacementTexture', 'DISPLACEMENT'],
            uSpecularTexture : ['uUseSpecularTexture', 'uSpecularTexture', 'SPECULAR'],
            uEtcVertextTexture1 : ['uUseEtcVertexTexture1', 'uEtcVertextTexture1', 'ETC_VERTEX_1'],
            uEtcVertextTexture2 : ['uUseEtcVertexTexture2', 'uEtcVertextTexture2', 'ETC_VERTEX_2'],
            uEtcFragmentTexture1 : ['uUseEtcFragmentTexture1', 'uEtcFragmentTexture1', 'ETC_FRAGMENT_1'],
            uEtcFragmentTexture2 : ['uUseEtcFragmentTexture2', 'uEtcFragmentTexture2', 'ETC_FRAGMENT_2'],
            uReflectionTexture : ['uUseReflectionTexture', 'uReflectionTexture', 'CUBE_REFLECTION'],
            uRefractionTexture :['uUseRefractionTexture', 'uRefractionTexture', 'CUBE_REFRACTION']
        }
        
        
        cacheAttrUUID = []
        cacheTexture_UUID = []
        cacheUseTexture = []

        cacheInt = null
        cacheFloat = null
        this.render = function (time) {

            //TODO: 재질 소팅을 도입해야곘음 -_-;;
            //////////////////////////////////////////////////////////
            // cacheDrawBufferUUID 캐시를 한번제거함
            // 왜냐? 버퍼가 중간에 등록만되고..사용이 안될떄..대비
            cacheDrawBufferUUID = undefined
            //////////////////////////////////////////////////////////
            self['callback'] ? self['callback'](time) : 0
            self['numDrawCall'] = 0
            tGL = redGL.gl
            //////////////////////////////////////////////////////////////////
            tScene = self['targetScene']
            tGL.clear(tGL.COLOR_BUFFER_BIT);
            //////////////////////////////////////////////////////////////////
            tScene['camera'].update()
            for (k in redGL['__datas']['RedProgramInfo']) {
                var tempProgramInfo;
                tempProgramInfo = redGL['__datas']['RedProgramInfo'][k]
                tGL.useProgram(tempProgramInfo['program'])
                // 퍼스팩티브 갱신
                tLocation = tempProgramInfo['uniforms']['uPMatrix'][LOCATION]
                tGL.uniformMatrix4fv(tLocation, false, tScene['camera']['uPMatrix'])
                // 카메라갱신
                tLocation = tempProgramInfo['uniforms']['uCameraMatrix'][LOCATION]
                tGL.uniformMatrix4fv(tLocation, false, tScene['camera']['uCameraMatrix'])
                if (tempProgramInfo['uniforms']['uCameraPosition']) {
                    tLocation = tempProgramInfo['uniforms']['uCameraPosition'][LOCATION]
                    tGL.uniform3fv(tLocation, tScene['camera']['__desiredCoords'])
                }

                // 라이트갱신
                // console.log(tScene['lights'])
                self.setAmbientLight(tempProgramInfo)
                self.setDirectionalLight(tempProgramInfo)
                self.setPointLight(tempProgramInfo)

                if (tempProgramInfo['uniforms']['uSystemTime']) {
                    tLocation = tempProgramInfo['uniforms']['uSystemTime'][LOCATION]
                    tGL.uniform1f(tLocation, time / 1000)
                }
                if (tempProgramInfo['uniforms']['uSystemResolution']) {
                    tLocation = tempProgramInfo['uniforms']['uSystemResolution'][LOCATION]
                    tGL.uniform2fv(tLocation, new Float32Array([tGL['drawingBufferWidth'], tGL['drawingBufferHeight']]))
                }


            }
            cacheProgram = null // 캐쉬된 프로그램을 삭제
            //////////////////////////////////////////////////////////////////
            self.drawSkyBox(tScene['skyBox'], time)
            tGL.clear(tGL.DEPTH_BUFFER_BIT);
            self.draw(tScene['children'], time)
            self.draw(debugPointRenderList)
            self.drawGrid(tScene['grid'], time)
            //////////////////////////////////////////////////////////////////
            requestAnimationFrame(self.render)
        };
        // 암비언트 유니폼 세팅
        this.setAmbientLight = (function () {
            var tColorList = new Float32Array(4)
            return function (programInfo) {
                if (
                    tScene['lights'][RedAmbientLightInfo.TYPE].length
                    && programInfo['uniforms']['uAmbientLightColor']
                ) {
                    tScene['lights'][RedAmbientLightInfo.TYPE].forEach(function (v, index) {
                        tColorList[index * 4 + 0] = v['color'][0]
                        tColorList[index * 4 + 1] = v['color'][1]
                        tColorList[index * 4 + 2] = v['color'][2]
                        tColorList[index * 4 + 3] = v['color'][3]
                    })
                    tLocation = programInfo['uniforms']['uAmbientLightColor'][LOCATION]
                    tGL.uniform4fv(tLocation, tColorList)
                }
            }
        })()
        // 디렉셔널 라이트 유니폼세팅
        this.setDirectionalLight = (function () {
            var tDirectionList = [], tColorList = []
            return function (programInfo) {
                if (
                    tScene['lights'][RedDirectionalLightInfo.TYPE].length
                    && programInfo['uniforms']['uDirectionnalLightDirection']
                ) {
                    tDirectionList.length = 0
                    tColorList.length = 0
                    tScene['lights'][RedDirectionalLightInfo.TYPE].forEach(function (v, index) {
                        tDirectionList[index * 3 + 0] = v['direction'][0]
                        tDirectionList[index * 3 + 1] = v['direction'][1]
                        tDirectionList[index * 3 + 2] = v['direction'][2]
                        tColorList[index * 4 + 0] = v['color'][0]
                        tColorList[index * 4 + 1] = v['color'][1]
                        tColorList[index * 4 + 2] = v['color'][2]
                        tColorList[index * 4 + 3] = v['color'][3]
                    })
                    tLocation = programInfo['uniforms']['uDirectionnalLightDirection'][LOCATION]
                    tGL.uniform3fv(tLocation, new Float32Array(tDirectionList))
                    tLocation = programInfo['uniforms']['uDirectionnalLightColor'][LOCATION]
                    tGL.uniform4fv(tLocation, new Float32Array(tColorList))
                    tLocation = programInfo['uniforms']['uDirectionalNum'][LOCATION]
                    tGL.uniform1i(tLocation, tScene['lights'][RedDirectionalLightInfo.TYPE].length)
                }
            }
        })()
        // 포인트 라이트 유니폼 세팅
        this.setPointLight = (function () {
            var tPointList = [], tColorList = [], tPointRadius = new Float32Array(16)
            return function (programInfo) {
                if (
                    tScene['lights']['point'].length
                    && programInfo['uniforms']['uPointNum']
                ) {
                    tPointList.length = 0
                    tColorList.length = 0
                    debugPointRenderList.length = 0
                    tScene['lights'][RedPointLightInfo.TYPE].forEach(function (v, index) {
                        tPointList[index * 3 + 0] = v[POSITION][0]
                        tPointList[index * 3 + 1] = v[POSITION][1]
                        tPointList[index * 3 + 2] = v[POSITION][2]
                        tColorList[index * 4 + 0] = v['color'][0]
                        tColorList[index * 4 + 1] = v['color'][1]
                        tColorList[index * 4 + 2] = v['color'][2]
                        tColorList[index * 4 + 3] = v['color'][3]
                        tPointRadius[index] = v['radius']
                        if (v['useDebugMode']) {
                            debugPointRenderList.push(v['__debugMesh'])
                            v['__debugMesh'].position[0] = v.position[0]
                            v['__debugMesh'].position[1] = v.position[1]
                            v['__debugMesh'].position[2] = v.position[2]
                            v['__debugMesh'].scale[0] = v.radius * 2
                            v['__debugMesh'].scale[1] = v.radius * 2
                            v['__debugMesh'].scale[2] = v.radius * 2
                            v['__debugMesh'].materialInfo.uColor[0] = v['color'][0]
                            v['__debugMesh'].materialInfo.uColor[1] = v['color'][1]
                            v['__debugMesh'].materialInfo.uColor[2] = v['color'][2]
                            v['__debugMesh'].materialInfo.uColor[3] = 0.5
                        }
                    })
                    tLocation = programInfo['uniforms']['uPointLightPosition'][LOCATION]
                    tGL.uniform3fv(tLocation, new Float32Array(tPointList))
                    tLocation = programInfo['uniforms']['uPointLightColor'][LOCATION]
                    tGL.uniform4fv(tLocation, new Float32Array(tColorList))
                    tLocation = programInfo['uniforms']['uPointNum'][LOCATION]
                    tGL.uniform1i(tLocation, tScene['lights'][RedPointLightInfo.TYPE].length)
                    tLocation = programInfo['uniforms']['uPointLightRadius'][LOCATION]
                    tGL.uniform1fv(tLocation, tPointRadius)
                }
            }
        })()
        // 바닥그리드 draw
        this.drawGrid = (function () {
            var list = [];
            return function (grid) {
                if (grid) {
                    list.length = 0
                    list.push(grid)
                    self.draw(list)
                }
            }
        })();
        // 스카이박스 draw
        this.drawSkyBox = (function () {
            var list = [];
            return function (skyBox) {
                if (skyBox) {
                    // 스카이박스 스케일은 카메라 far와 연동됨
                    skyBox[SCALE][0] = skyBox[SCALE][1] = skyBox[SCALE][2] = tScene['camera']['far']
                    list.length = 0
                    list.push(skyBox)
                    self.draw(list)
                }
            }
        })();
        // 기본 draw함수
        this.draw = function (renderList, time, parentMTX) {
            var i, i2, i3; // 루프변수
            var tAtlasTextureInfo;
            var parentClone;
            var tempData
            i = renderList.length
            while (i--) {
                self['numDrawCall']++
                tMesh = renderList[i]
                tMVMatrix = tMesh['uMVMatrix']
                tNMatrix = tMesh['uNMatrix']
                // 매트릭스 초기화
                tMVMatrix[0] = 1, tMVMatrix[1] = 0, tMVMatrix[2] = 0, tMVMatrix[3] = 0,
                    tMVMatrix[4] = 0, tMVMatrix[5] = 1, tMVMatrix[6] = 0, tMVMatrix[7] = 0,
                    tMVMatrix[8] = 0, tMVMatrix[9] = 0, tMVMatrix[10] = 1, tMVMatrix[11] = 0,
                    tMVMatrix[12] = 0, tMVMatrix[13] = 0, tMVMatrix[14] = 0, tMVMatrix[15] = 1
                // 기본 변환
                a = tMVMatrix
                // 이동
                aX = tMesh[POSITION][0], aY = tMesh[POSITION][1], aZ = tMesh[POSITION][2];
                a[12] = a[0] * aX + a[4] * aY + a[8] * aZ + a[12];
                a[13] = a[1] * aX + a[5] * aY + a[9] * aZ + a[13];
                a[14] = a[2] * aX + a[6] * aY + a[10] * aZ + a[14];
                a[15] = a[3] * aX + a[7] * aY + a[11] * aZ + a[15];
                // xyz축 회전 
                tRx = tMesh[ROTATION][0], tRy = tMesh[ROTATION][1], tRz = tMesh[ROTATION][2]
                aSx = SIN(tRx), aCx = COS(tRx), aSy = SIN(tRy), aCy = COS(tRy), aSz = SIN(tRz), aCz = COS(tRz),
                    a00 = a[0], a01 = a[1], a02 = a[2],
                    a10 = a[4], a11 = a[5], a12 = a[6],
                    a20 = a[8], a21 = a[9], a22 = a[10],
                    b00 = aCy * aCz, b01 = aSx * aSy * aCz - aCx * aSz, b02 = aCx * aSy * aCz + aSx * aSz,
                    b10 = aCy * aSz, b11 = aSx * aSy * aSz + aCx * aCz, b12 = aCx * aSy * aSz - aSx * aCz,
                    b20 = -aSy, b21 = aSx * aCy, b22 = aCx * aCy,
                    a[0] = a00 * b00 + a10 * b01 + a20 * b02, a[1] = a01 * b00 + a11 * b01 + a21 * b02, a[2] = a02 * b00 + a12 * b01 + a22 * b02,
                    a[4] = a00 * b10 + a10 * b11 + a20 * b12, a[5] = a01 * b10 + a11 * b11 + a21 * b12, a[6] = a02 * b10 + a12 * b11 + a22 * b12,
                    a[8] = a00 * b20 + a10 * b21 + a20 * b22, a[9] = a01 * b20 + a11 * b21 + a21 * b22, a[10] = a02 * b20 + a12 * b21 + a22 * b22;
                // 스케일
                aX = tMesh[SCALE][0], aY = tMesh[SCALE][1], aZ = tMesh[SCALE][2]
                a[0] = a[0] * aX, a[1] = a[1] * aX, a[2] = a[2] * aX, a[3] = a[3] * aX;
                a[4] = a[4] * aY, a[5] = a[5] * aY, a[6] = a[6] * aY, a[7] = a[7] * aY,
                    a[8] = a[8] * aZ, a[9] = a[9] * aZ, a[10] = a[10] * aZ, a[11] = a[11] * aZ,
                    a[12] = a[12], a[13] = a[13], a[14] = a[14], a[15] = a[15]
                // 부모가있으면 곱함
                if (parentMTX) {
                    // 부모매트릭스 복사
                    parentClone = tMesh['__parentMVMatrixClone'];
                    parentClone[0] = parentMTX[0], parentClone[1] = parentMTX[1], parentClone[2] = parentMTX[2], parentClone[3] = parentMTX[3],
                        parentClone[4] = parentMTX[4], parentClone[5] = parentMTX[5], parentClone[6] = parentMTX[6], parentClone[7] = parentMTX[7],
                        parentClone[8] = parentMTX[8], parentClone[9] = parentMTX[9], parentClone[10] = parentMTX[10], parentClone[11] = parentMTX[11],
                        parentClone[12] = parentMTX[12], parentClone[13] = parentMTX[13], parentClone[14] = parentMTX[14], parentClone[15] = parentMTX[15]
                    /////////////////////////////////////////////////////////////////////////////////////////////
                    // 매트립스 곱
                    a00 = parentClone[0], a01 = parentClone[1], a02 = parentClone[2], a03 = parentClone[3],
                        a10 = parentClone[4], a11 = parentClone[5], a12 = parentClone[6], a13 = parentClone[7],
                        a20 = parentClone[8], a21 = parentClone[9], a22 = parentClone[10], a23 = parentClone[11],
                        a30 = parentClone[12], a31 = parentClone[13], a32 = parentClone[14], a33 = parentClone[15],
                        // Cache only the current line of the second matrix
                        b0 = tMVMatrix[0], b1 = tMVMatrix[1], b2 = tMVMatrix[2], b3 = tMVMatrix[3],
                        tMVMatrix[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
                        tMVMatrix[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
                        tMVMatrix[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
                        tMVMatrix[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
                        b0 = tMVMatrix[4], b1 = tMVMatrix[5], b2 = tMVMatrix[6], b3 = tMVMatrix[7],
                        tMVMatrix[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
                        tMVMatrix[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
                        tMVMatrix[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
                        tMVMatrix[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
                        b0 = tMVMatrix[8], b1 = tMVMatrix[9], b2 = tMVMatrix[10], b3 = tMVMatrix[11],
                        tMVMatrix[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
                        tMVMatrix[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
                        tMVMatrix[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
                        tMVMatrix[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33,
                        b0 = tMVMatrix[12], b1 = tMVMatrix[13], b2 = tMVMatrix[14], b3 = tMVMatrix[15],
                        tMVMatrix[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30,
                        tMVMatrix[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31,
                        tMVMatrix[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32,
                        tMVMatrix[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33
                    /////////////////////////////////////////////////////////////////////////////////////////////
                }
                // 정보세팅
                tMaterial = tMesh['materialInfo']
                tProgramInfo = tMaterial['programInfo']
                tProgram = tProgramInfo['program']
                tGeometry = tMesh['geometryInfo']
                tAttrGroup = tGeometry['attributes']
                tAttrGroupList = tGeometry['__attributeList']
                tAttrLocationGroup = tProgramInfo['attributes']
                tMaterialUniformGroup = tMaterial['uniforms']
                tProgramUniformLocationGroup = tProgramInfo['uniforms']
                tIndicesBuffer = tGeometry['indices']
                tVertexPositionBuffer = tAttrGroup['vertexPosition']

                // 프로그램 세팅 & 캐싱
                if (cacheProgram != tProgram) {
                    // 기존에 옵션맵을 쓰고있었으면 날린다. TODO: 이놈도정리대상이다.
                    tGL.useProgram(tProgram)
                    cacheTexture_UUID.length = 0
                    cacheUVAtlascoord_UUID = undefined
                    cacheUseTexture.length = 0
                    cacheInt = null
                    cacheFloat = null
                    if (!emptyCubeMap) {
                        if (tProgramUniformLocationGroup['uUseReflectionTexture'] || tProgramUniformLocationGroup['uUseRefractionTexture']) {
                            var t;
                            t = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzMxRDhBQzRFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzMxRDhBQzVFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MzFEOEFDMkU1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MzFEOEFDM0U1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuojYFUAAAAQSURBVHjaYvj//z8DQIABAAj8Av7bok0WAAAAAElFTkSuQmCC'
                            emptyCubeMap = redGL.createCubeTextureInfo([t, t, t, t, t, t])
                            if (tProgramUniformLocationGroup['uUseReflectionTexture']) {
                                tGL.activeTexture(GL_TEXTURE0 + RedTextureIndex.CUBE_REFLECTION)
                                tGL.bindTexture(GL_TEXTURE_CUBE_MAP, emptyCubeMap['texture'])
                                tGL.uniform1i(tProgramUniformLocationGroup['uReflectionTexture'][LOCATION], RedTextureIndex.CUBE_REFLECTION)
                            }
                            if (tProgramUniformLocationGroup['uReflectionTexture']) {
                                tGL.activeTexture(GL_TEXTURE0 + RedTextureIndex.CUBE_REFRACTION)
                                tGL.bindTexture(GL_TEXTURE_CUBE_MAP, emptyCubeMap['texture'])
                                tGL.uniform1i(tProgramUniformLocationGroup['uRefractionTexture'][LOCATION], RedTextureIndex.CUBE_REFRACTION)
                            }
                            // emptyCube ['uUseReflectionTexture', 'uReflectionTexture', 'CUBE_REFLECTION']
                            console.log('언제오니')
                        }
                    }   
                }
                cacheProgramInfo = tProgramInfo
                cacheProgram = tProgram
                // 어트리뷰트 입력
                i2 = tAttrGroupList.length
                
                while (i2--) {
                    tAttrBufferInfo = tAttrGroupList[i2] // 대상버퍼구하고
                    tAttrPointerKey = tAttrBufferInfo['shaderPointerKey'] // 바인딩할 쉐이더 변수키를 알아낸다.
                    tAttrLocation =tAttrLocationGroup[tAttrPointerKey]
                    // 어트리뷰트 정보매칭이 안되는 녀석은 무시한다 
                    if (tAttrLocation) {
                        tLocation = tAttrLocation[LOCATION] // 어트리뷰트 로케이션도 알아낸다.
                        // 캐싱된 attribute정보과 현재 대상정보가 같다면 무시
                        cacheAttrUUID[tLocation] == tAttrBufferInfo[UUID] ?
                            0 :
                            (
                                // 실제 버퍼 바인딩하고
                                tGL.bindBuffer(GL_ARRAY_BUFFER, tAttrBufferInfo['buffer']),
                                // 해당로케이션을 활성화된적이없으면 활성화 시킨다
                                tAttrBufferInfo['enabled'] ? 0 : (tGL.enableVertexAttribArray(tLocation), tAttrBufferInfo['enabled'] = 1),
                                tGL.vertexAttribPointer(
                                    tLocation,
                                    tAttrBufferInfo['pointSize'],
                                    tAttrBufferInfo['glArrayType'],
                                    tAttrBufferInfo['normalize'],
                                    tAttrBufferInfo['stride'],
                                    tAttrBufferInfo['offset']
                                ),
                                // 상태 캐싱
                                cacheAttrUUID[tLocation] = tAttrBufferInfo[UUID]
                            )
                    }
                }
                tMaterial['needUniformList'] ? tMaterial.updateUniformList() : 0
                // 유니폼 입력
                tUniformGroupList = tMaterial['__uniformList']
                i2 = tUniformGroupList.length
                bitmapRenderable = true
                // console.log('sfdssdfsdfsdf')
                
                while (i2--) {
                    tempData = tUniformGroupList[i2],
                    tUniformKey = tempData[KEY],
                    // tUniformType = tempData['type'],
                    tUniformValue = tMaterial[tUniformKey],
                    tLocation = tempData[LOCATION]
                    ///////////////////////////////////////////////////////////////////////////////
                    ///////////////////////////////////////////////////////////////////////////////
                    tRenderType = tempData['renderType']
                    if (tRenderType == INT) cacheInt == tUniformValue ? 0 : tGL.uniform1i(tLocation, tUniformValue), cacheInt = tUniformValue
                    else if (tRenderType == FLOAT) cacheFloat == tUniformValue ? 0 : tGL.uniform1f(tLocation, tUniformValue), cacheFloat = tUniformValue
                    else if (tRenderType == SAMPLER) {
                        if (tUniformValue && !tUniformValue[WEBGL_TEXTURE_YN]) throw tUniformKey + ' : sampler에 sampler형식이 아닌 값이 들어옵니다.'
                        if (tUniformValue && tUniformValue[WEBGL_TEXTURE_YN]) {
                            tUniformValue[WEBGL_ATLAS_TEXTURE] ? tUniformValue = tUniformValue['parentAtlasInfo']['textureInfo'] : 0
                            if (tUniformValue[LOADED]) {
                                var targetIndex = tUniformValue[TARGET_INDEX]
                                if (cacheTexture_UUID[targetIndex] != tUniformValue[UUID]) {
                                    // console.log(targetIndex)
                                    tGL.activeTexture(GL_TEXTURE0 + targetIndex)
                                    tGL.bindTexture(tUniformValue[WEBGL_TEXTURE] ? GL_TEXTURE_2D : GL_TEXTURE_CUBE_MAP, tUniformValue['texture'])
                                    cacheTexture_UUID[targetIndex] == tUniformValue[UUID] ? 0 : tGL.uniform1i(tLocation, targetIndex)
                                    cacheTexture_UUID[targetIndex] = tUniformValue[UUID]
                                }
                                tUseMapKey = useMap2[tUniformKey]
                                if (tUseMapKey) {
                                    tUseMapKey = tUseMapKey[0]
                                    tUseMapTextureKey = tUniformKey
                                    tProgramUseUniformValue = tProgramUniformLocationGroup[tUseMapKey]
                                    if (targetIndex != RedTextureIndex[useMap2[tUniformKey][2]]) {
                                        console.log(tTexture)
                                        console.log(tUseMapKey, tUseMapTextureKey, targetIndex, RedTextureIndex[useMap2[tUniformKey][2]])
                                        throw useMap2[tUniformKey][2] + " 인덱스타입이 아닙니다."
                                    }
                                    cacheUseTexture[tLocation[UUID]] == 1 ? 0 : tGL.uniform1i(tProgramUseUniformValue[LOCATION], 1)
                                    cacheUseTexture[tLocation[UUID]] = 1

                                }
                            } else bitmapRenderable = false
                        } else {
                            tUseMapKey = useMap2[tUniformKey]
                            if (tUseMapKey) {
                                tUseMapKey = tUseMapKey[0]
                                tUseMapTextureKey = tUniformKey
                                tProgramUseUniformValue = tProgramUniformLocationGroup[tUseMapKey]
                                cacheUseTexture[tLocation[UUID]] == 0 ? 0 : tGL.uniform1i(tProgramUseUniformValue[LOCATION], 0)
                                cacheUseTexture[tLocation[UUID]] = 0
                            }
                        }
                        
                    }                  
                    else if (tRenderType == MAT) tGL[tUniformValue[UNIFORM_METHOD]](tLocation, false, tUniformValue)
                    else if (tRenderType == VEC) tGL[tUniformValue[UNIFORM_METHOD]](tLocation, tUniformValue)
                    // 아틀라스코디네이트값인경우
                    else if (tRenderType == ATLASCOORD) cacheUVAtlascoord_UUID == tUniformValue[UUID] ? 0 : tGL.uniform4fv(tLocation, tUniformValue['value']), cacheUVAtlascoord_UUID = tUniformValue[UUID]
                    // 이도저도아닌경우는 뭔가 잘못된거임
                    else throw '안되는 나쁜 타입인거야!!'
                    ///////////////////////////////////////////////////////////////////////////////
                    ///////////////////////////////////////////////////////////////////////////////
                };
                // i3 = useMap.length
                // while (i3--) {
                //     var tTexture
                //     tempData = useMap[i3]
                //     tUseMapKey = tempData[0]
                //     tUseMapTextureKey = tempData[1]
                //     tProgramUseUniformValue = tProgramUniformLocationGroup[tUseMapKey]
                //     if (tProgramUseUniformValue) {
                //         tTexture = tMaterial[tUseMapTextureKey]
                //         if (tTexture && tTexture[LOADED]) {
                //             if (tTexture['__targetIndex'] != RedTextureIndex[tempData[2]]) {
                //                 console.log(tTexture)
                //                 console.log(tUseMapKey, tUseMapTextureKey, tTexture['__targetIndex'], RedTextureIndex[tempData[2]])
                //                 throw tempData[2] + " 인덱스타입이 아닙니다."
                //             }
                //             cacheUseTexture[tUseMapKey] == 1 ? 0 : tGL.uniform1i(tProgramUseUniformValue[LOCATION], 1)
                //             cacheUseTexture[tUseMapKey] = 1
                //         } else {
                //             cacheUseTexture[tUseMapKey] == 0 ? 0 : tGL.uniform1i(tProgramUseUniformValue[LOCATION], 0)
                //             cacheUseTexture[tUseMapKey] = 0
                //         }
                //     }
                // }
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////

                // 노말매트릭스를 사용할경우
                if (tProgramUniformLocationGroup['uNMatrix']) {
                    //클론
                    tNMatrix[0] = tMVMatrix[0], tNMatrix[1] = tMVMatrix[1], tNMatrix[2] = tMVMatrix[2], tNMatrix[3] = tMVMatrix[3],
                        tNMatrix[4] = tMVMatrix[4], tNMatrix[5] = tMVMatrix[5], tNMatrix[6] = tMVMatrix[6], tNMatrix[7] = tMVMatrix[7],
                        tNMatrix[8] = tMVMatrix[8], tNMatrix[9] = tMVMatrix[9], tNMatrix[10] = tMVMatrix[10], tNMatrix[11] = tMVMatrix[11],
                        tNMatrix[12] = tMVMatrix[12], tNMatrix[13] = tMVMatrix[13], tNMatrix[14] = tMVMatrix[14], tNMatrix[15] = tMVMatrix[15]
                    // mat4Inverse
                    var inverse_c = tNMatrix[0], inverse_d = tNMatrix[1], inverse_e = tNMatrix[2], inverse_g = tNMatrix[3],
                        inverse_f = tNMatrix[4], inverse_h = tNMatrix[5], inverse_i = tNMatrix[6], inverse_j = tNMatrix[7],
                        inverse_k = tNMatrix[8], inverse_l = tNMatrix[9], inverse_n = tNMatrix[10], inverse_o = tNMatrix[11],
                        inverse_m = tNMatrix[12], inverse_p = tNMatrix[13], inverse_r = tNMatrix[14], inverse_s = tNMatrix[15],
                        inverse_A = inverse_c * inverse_h - inverse_d * inverse_f,
                        inverse_B = inverse_c * inverse_i - inverse_e * inverse_f,
                        inverse_t = inverse_c * inverse_j - inverse_g * inverse_f,
                        inverse_u = inverse_d * inverse_i - inverse_e * inverse_h,
                        inverse_v = inverse_d * inverse_j - inverse_g * inverse_h,
                        inverse_w = inverse_e * inverse_j - inverse_g * inverse_i,
                        inverse_x = inverse_k * inverse_p - inverse_l * inverse_m,
                        inverse_y = inverse_k * inverse_r - inverse_n * inverse_m,
                        inverse_z = inverse_k * inverse_s - inverse_o * inverse_m,
                        inverse_C = inverse_l * inverse_r - inverse_n * inverse_p,
                        inverse_D = inverse_l * inverse_s - inverse_o * inverse_p,
                        inverse_E = inverse_n * inverse_s - inverse_o * inverse_r,
                        inverse_q = inverse_A * inverse_E - inverse_B * inverse_D + inverse_t * inverse_C + inverse_u * inverse_z - inverse_v * inverse_y + inverse_w * inverse_x;
                    inverse_q = 1 / inverse_q,
                        tNMatrix[0] = (inverse_h * inverse_E - inverse_i * inverse_D + inverse_j * inverse_C) * inverse_q,
                        tNMatrix[1] = (-inverse_d * inverse_E + inverse_e * inverse_D - inverse_g * inverse_C) * inverse_q,
                        tNMatrix[2] = (inverse_p * inverse_w - inverse_r * inverse_v + inverse_s * inverse_u) * inverse_q,
                        tNMatrix[3] = (-inverse_l * inverse_w + inverse_n * inverse_v - inverse_o * inverse_u) * inverse_q,
                        tNMatrix[4] = (-inverse_f * inverse_E + inverse_i * inverse_z - inverse_j * inverse_y) * inverse_q,
                        tNMatrix[5] = (inverse_c * inverse_E - inverse_e * inverse_z + inverse_g * inverse_y) * inverse_q,
                        tNMatrix[6] = (-inverse_m * inverse_w + inverse_r * inverse_t - inverse_s * inverse_B) * inverse_q,
                        tNMatrix[7] = (inverse_k * inverse_w - inverse_n * inverse_t + inverse_o * inverse_B) * inverse_q,
                        tNMatrix[8] = (inverse_f * inverse_D - inverse_h * inverse_z + inverse_j * inverse_x) * inverse_q,
                        tNMatrix[9] = (-inverse_c * inverse_D + inverse_d * inverse_z - inverse_g * inverse_x) * inverse_q,
                        tNMatrix[10] = (inverse_m * inverse_v - inverse_p * inverse_t + inverse_s * inverse_A) * inverse_q,
                        tNMatrix[11] = (-inverse_k * inverse_v + inverse_l * inverse_t - inverse_o * inverse_A) * inverse_q,
                        tNMatrix[12] = (-inverse_f * inverse_C + inverse_h * inverse_y - inverse_i * inverse_x) * inverse_q,
                        tNMatrix[13] = (inverse_c * inverse_C - inverse_d * inverse_y + inverse_e * inverse_x) * inverse_q,
                        tNMatrix[14] = (-inverse_m * inverse_u + inverse_p * inverse_B - inverse_r * inverse_A) * inverse_q,
                        tNMatrix[15] = (inverse_k * inverse_u - inverse_l * inverse_B + inverse_n * inverse_A) * inverse_q,
                        // transpose
                        a01 = tNMatrix[1], a02 = tNMatrix[2], a03 = tNMatrix[3],
                        a12 = tNMatrix[6], a13 = tNMatrix[7], a23 = tNMatrix[11],
                        tNMatrix[1] = tNMatrix[4], tNMatrix[2] = tNMatrix[8], tNMatrix[3] = tNMatrix[12], tNMatrix[4] = a01, tNMatrix[6] = tNMatrix[9],
                        tNMatrix[7] = tNMatrix[13], tNMatrix[8] = a02, tNMatrix[9] = a12, tNMatrix[11] = tNMatrix[14],
                        tNMatrix[12] = a03, tNMatrix[13] = a13, tNMatrix[14] = a23;
                    // uNMatrix 입력 
                    tGL.uniformMatrix4fv(tProgramUniformLocationGroup['uNMatrix'][LOCATION], false, tNMatrix)
                }
                // uMVMatrix 입력 
                tGL.uniformMatrix4fv(tProgramUniformLocationGroup['uMVMatrix'][LOCATION], false, tMVMatrix)
                ////////////////////////////////////////////////////////////////////////////////////////////////////
                // GL 드로잉상태관련 캐싱들 처리
                // TODO: CCW도먹어야하나?

                // 컬페이스 사용여부 캐싱처리
                cacheUseCullFace != tMesh[USE_CULL_FACE] ? (cacheUseCullFace = tMesh[USE_CULL_FACE]) ? tGL.enable(GL_CULL_FACE) : tGL.disable(GL_CULL_FACE) : 0,
                cacheCullFace != tMesh[CULL_FACE] ? tGL.cullFace(tMesh[CULL_FACE]) : 0, cacheCullFace = tMesh[CULL_FACE]
                // 뎁스테스트 사용여부 캐싱처리
                cacheUseDepthTest != tMesh['useDepthTest'] ? (cacheUseDepthTest = tMesh['useDepthTest']) ? tGL.enable(GL_DEPTH_TEST) : tGL.disable(GL_DEPTH_TEST) : 0,
                // 뎁스테스팅 캐싱처리
                cacheDepthTestFunc != tMesh['depthTestFunc'] ? tGL.depthFunc(cacheDepthTestFunc = tMesh['depthTestFunc']) : 0,
                // 블렌딩 사용여부 캐싱처리
                cacheUseBlendMode != tMesh['useBlendMode'] ? (cacheUseBlendMode = tMesh['useBlendMode']) ? tGL.enable(tGL.BLEND) : tGL.disable(tGL.BLEND) : 0
                // 블렌딩팩터 캐싱처리
                if (cacheBlendModeFactor != (tMesh['blendFactor1'] + tMesh['blendFactor2'])) {
                    tGL.blendFunc(tMesh['blendFactor1'], tMesh['blendFactor2'])
                    cacheBlendModeFactor = tMesh['blendFactor1'] + tMesh['blendFactor2']
                }
                ////////////////////////////////////////////////////////////////////////////////////////////////////
                // 최종 드로잉결절
                if (tIndicesBuffer) {
                    bitmapRenderable ?
                        (
                            cacheDrawBufferUUID == tIndicesBuffer[UUID] ? 0 : tGL.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, tIndicesBuffer['buffer']),
                            tGL.drawElements(tMesh[DRAW_MODE], tIndicesBuffer[POINT_NUM], GL_UNSIGNED_SHORT, 0),
                            cacheDrawBufferUUID = tIndicesBuffer[UUID]
                        )
                        : 0
                } else tGL.drawArrays(tMesh[DRAW_MODE], 0, tVertexPositionBuffer[POINT_NUM]), cacheDrawBufferUUID = tVertexPositionBuffer[UUID]
                // 자식을 콜
                tMesh[CHILDREN].length ? self.draw(tMesh[CHILDREN], time, tMVMatrix) : 0
            }
        }
    }
    RedBaseRenderInfo.prototype = {
        /**DOC:
            {
                title :`start`,
                code : `FUNCTION`,
                description : `
                    - 렌더러 시작 매서드
                `,
                example : `
                    var renderer = RedBaseRenderInfo(RedGL Instance, RedSceneInfo Instance, function (time) {
                        // 렌더링시 사전호출될 콜백
                    })
                    renderer.start()
                `,
                return : `RedBaseRenderInfo Instance`
            }
        :DOC*/
        start: function () {
            requestAnimationFrame(this.render)
            return this
        },
        /**DOC:
            {
                title :`pause`,
                code : `FUNCTION`,
                description : `
                    - 렌더러 pause 매서드
                    <h2>- TODO 구현해야함</h2>
                `,
                return : `RedBaseRenderInfo Instance`
            }
        :DOC*/
        pause: function () {
            //TODO:
            return this
        },
        /**DOC:
            {
                title :`resume`,
                code : `FUNCTION`,
                description : `
                    - 렌더러 resume 매서드
                    <h2>- TODO 구현해야함</h2>
                `,
                return : `RedBaseRenderInfo Instance`
            }
        :DOC*/
        resume: function () {
            //TODO:
            return this
        },
        /**DOC:
            {
                title :`numDrawCall`,
                code : `PROPERTY`,
                description : `
                    - 렌더러 당 콜횟수
                `,
                return : `Number`
            }
        :DOC*/
        numDrawCall: 0
    }
    Object.freeze(RedBaseRenderInfo)
})();