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
    var emptyCubeMap; // 큐브맵이 쉐이더에 존재할경우 사용할 초기화 큐브맵
    var emptyCube = {}; // emptyCubeMap을 중복 바인딩 하지않기 위한 정보
    var nullImage;
    var errorFunc;
    errorFunc = function (msg) {
        throw msg
    }
    nullImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzMxRDhBQzRFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzMxRDhBQzVFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MzFEOEFDMkU1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MzFEOEFDM0U1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuojYFUAAAAQSURBVHjaYvj//z8DQIABAAj8Av7bok0WAAAAAElFTkSuQmCC'
    RedBaseRenderInfo = function (redGL, redScene, callback) {
        if (!(this instanceof RedBaseRenderInfo)) return new RedBaseRenderInfo(redGL, redScene, callback)
        if (!(redGL instanceof RedGL)) throw 'RedBaseRenderInfo : RedGL 인스턴스만 허용됩니다.'
        var self;
        self = this
        // 씬생성!!
        this['callback'] = callback
        this['targetScene'] = redScene
        this['__UUID'] = REDGL_UUID++

        var k; //루프변수
        var tScene; // 대상 RedScene
        ///////////////////////////////////////////////////////////////////
        var tGL; // 대상 RedGL의 gl context
        ///////////////////////////////////////////////////////////////////
        var cacheProgram; // 이전 대상 프로그램               
        var cacheAttr; // 어트리뷰트 캐싱정보
        var cacheTexture; // 일반 텍스쳐 캐싱정보
        var cacheUseTexture; //텍스쳐사용여부 캐싱정보
        var cacheIntFloat; // int형이나 float형 캐싱정보
        var cacheUVAtlascoord; // 아틀라스 UV텍스쳐 정보
        var cacheDrawBufferUUID; // draw버퍼 캐싱정보
        ///////////////////////////////////////////////////////////////////
        var cacheUseCullFace; // 컬페이스 사용여부 캐싱정보
        var cacheCullFace; // 컬페이스 캐싱정보
        var cacheUseBlendMode; // 블렌드모드 사용여부 캐싱정보
        var cacheBlendModeFactor; // 블렌드팩터 캐싱정보
        var cacheUseDepthTest; // 뎁스테스트 사용여부 캐싱정보
        var cacheDepthTestFunc; // 뎁스테스트 팩터 캐싱정보
        ///////////////////////////////////////////////////////////////////
        var debugPointRenderList = []; // 포인트 라이트 디버깅 리스트
        var USE_MAP;
        USE_MAP = {
            uDiffuseTexture: ['uUseDiffuseTexture', 'uDiffuseTexture', 'PASS'],
            uNormalTexture: ['uUseNormalTexture', 'uNormalTexture', 'NORMAL'],
            uDisplacementTexture: ['uUseDisplacementTexture', 'uDisplacementTexture', 'DISPLACEMENT'],
            uSpecularTexture: ['uUseSpecularTexture', 'uSpecularTexture', 'SPECULAR'],
            uEtcVertextTexture1: ['uUseEtcVertexTexture1', 'uEtcVertextTexture1', 'ETC_VERTEX_1'],
            uEtcVertextTexture2: ['uUseEtcVertexTexture2', 'uEtcVertextTexture2', 'ETC_VERTEX_2'],
            uEtcFragmentTexture1: ['uUseEtcFragmentTexture1', 'uEtcFragmentTexture1', 'ETC_FRAGMENT_1'],
            uEtcFragmentTexture2: ['uUseEtcFragmentTexture2', 'uEtcFragmentTexture2', 'ETC_FRAGMENT_2'],
            uReflectionTexture: ['uUseReflectionTexture', 'uReflectionTexture', 'CUBE_REFLECTION'],
            uRefractionTexture: ['uUseRefractionTexture', 'uRefractionTexture', 'CUBE_REFRACTION']
        }
        cacheAttr = new Uint32Array(1000000)
        cacheTexture = new Uint32Array(1000000)
        cacheUseTexture = new Uint32Array(1000000)
        cacheIntFloat = new Float64Array(1000000)
        cacheUVAtlascoord = new Uint32Array(1000000)
        this.render = (function () {
            var tProgramInfo;
            var tProgramUniformLocationGroup
            var tTime, tResolution;
            var tLightColor
            var tLightData;
            /////////////////////////
            var tAmbientColorList
            /////////////////////////////
            var i, max, tList;
            var tDirectionList, tDirectionColorList;
            var tDirection
            /////////////////////////////
            var tPointpositionList, tpointColorList, tPointRadiusList
            var tPosition
            tAmbientColorList = new Float32Array(4),
                tDirectionList = new Float32Array(16 * 3),
                tDirectionColorList = new Float32Array(16 * 4),
                tPointpositionList = new Float32Array(16 * 3),
                tpointColorList = new Float32Array(16 * 4),
                tPointRadiusList = new Float32Array(16)
            return function (time) {
                //TODO: 라이트도 캐시 잡으면 유니폼비용이 쪼금 줄어들듯..
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
                //////////////////////////////////////////////////////////////////
                tScene['camera'].update(),
                    tTime = time / 1000,
                    tResolution = new Float32Array([tGL['drawingBufferWidth'], tGL['drawingBufferHeight']])
                for (k in redGL['__datas']['RedProgramInfo']) {
                    tProgramInfo = redGL['__datas']['RedProgramInfo'][k],
                        tProgramUniformLocationGroup = tProgramInfo['uniforms'],
                        tGL.useProgram(tProgramInfo['program']),
                        // 퍼스팩티브 갱신
                        tGL.uniformMatrix4fv(tProgramUniformLocationGroup['uPMatrix']['location'], false, tScene['camera']['uPMatrix']),
                        // 카메라 매트릭스 갱신
                        tGL.uniformMatrix4fv(tProgramUniformLocationGroup['uCameraMatrix']['location'], false, tScene['camera']['uCameraMatrix']),
                        // 카메라 포지션 갱신
                        tProgramUniformLocationGroup['uCameraPosition'] ? tGL.uniform3fv(tProgramUniformLocationGroup['uCameraPosition']['location'], tScene['camera']['__desiredCoords']) : 0
                    // 라이트갱신
                    // 암비언트
                    // tScene['lights'][RedAmbientLightInfo.TYPE].length ? self.setAmbientLight(tempProgramInfo) : 0,
                    tLightData = tScene['lights'][RedAmbientLightInfo.TYPE][0]
                    if (tProgramUniformLocationGroup['uAmbientLightColor'] && tLightData) {
                        tLightColor = tLightData['color'],
                            tAmbientColorList[0] = tLightColor[0],
                            tAmbientColorList[1] = tLightColor[1],
                            tAmbientColorList[2] = tLightColor[2],
                            tAmbientColorList[3] = tLightColor[3],
                            tGL.uniform4fv(tProgramUniformLocationGroup['uAmbientLightColor']['location'], tAmbientColorList)
                    }
                    // 디렉셔널
                    // tScene['lights'][RedDirectionalLightInfo.TYPE].length ? self.setDirectionalLight(tProgramInfo) : 0,
                    tList = tScene['lights'][RedDirectionalLightInfo.TYPE], max = i = tList.length
                    tProgramUniformLocationGroup = tProgramInfo['uniforms']
                    if (max && tProgramUniformLocationGroup['uDirectionnalLightDirection']) {
                        while (i--) {
                            tLightData = tList[i],
                                tDirection = tLightData['direction'],
                                tLightColor = tLightData['color'],
                                tDirectionList[i * 3 + 0] = tDirection[0],
                                tDirectionList[i * 3 + 1] = tDirection[1],
                                tDirectionList[i * 3 + 2] = tDirection[2],
                                tDirectionColorList[i * 4 + 0] = tLightColor[0],
                                tDirectionColorList[i * 4 + 1] = tLightColor[1],
                                tDirectionColorList[i * 4 + 2] = tLightColor[2],
                                tDirectionColorList[i * 4 + 3] = tLightColor[3]
                        }
                        tGL.uniform3fv(tProgramUniformLocationGroup['uDirectionnalLightDirection']['location'], tDirectionList),
                            tGL.uniform4fv(tProgramUniformLocationGroup['uDirectionnalLightColor']['location'], tDirectionColorList),
                            tGL.uniform1i(tProgramUniformLocationGroup['uDirectionalNum']['location'], max)
                    }
                    // 점광
                    // tScene['lights'][RedPointLightInfo.TYPE].length ? self.setPointLight(tProgramInfo) : 0,
                    tList = tScene['lights'][RedPointLightInfo.TYPE], max = i = tList.length
                    tProgramUniformLocationGroup = tProgramInfo['uniforms']
                    if (max && tProgramUniformLocationGroup['uPointNum']) {
                        debugPointRenderList.length = 0
                        while (i--) {
                            tLightData = tList[i],
                                tPosition = tLightData['position'],
                                tLightColor = tLightData['color'],
                                tPointpositionList[i * 3 + 0] = tPosition[0],
                                tPointpositionList[i * 3 + 1] = tPosition[1],
                                tPointpositionList[i * 3 + 2] = tPosition[2],
                                tpointColorList[i * 4 + 0] = tLightColor[0],
                                tpointColorList[i * 4 + 1] = tLightColor[1],
                                tpointColorList[i * 4 + 2] = tLightColor[2],
                                tpointColorList[i * 4 + 3] = tLightColor[3],
                                tPointRadiusList[i] = tLightData['radius'],
                                tLightData['useDebugMode'] ? (
                                    debugPointRenderList.push(tLightData['__debugMesh']),
                                    tLightData['__debugMesh'].position[0] = tPosition[0],
                                    tLightData['__debugMesh'].position[1] = tPosition[1],
                                    tLightData['__debugMesh'].position[2] = tPosition[2],
                                    tLightData['__debugMesh'].scale[0] = tLightData['__debugMesh'].scale[1] = tLightData['__debugMesh'].scale[2] = tLightData.radius * 2,
                                    tLightData['__debugMesh'].materialInfo.uColor[0] = tLightColor[0],
                                    tLightData['__debugMesh'].materialInfo.uColor[1] = tLightColor[1],
                                    tLightData['__debugMesh'].materialInfo.uColor[2] = tLightColor[2],
                                    tLightData['__debugMesh'].materialInfo.uColor[3] = 0.5
                                ) : 0
                        }
                        tGL.uniform3fv(tProgramUniformLocationGroup['uPointLightPosition']['location'], tPointpositionList),
                            tGL.uniform4fv(tProgramUniformLocationGroup['uPointLightColor']['location'], tpointColorList),
                            tGL.uniform1i(tProgramUniformLocationGroup['uPointNum']['location'], max),
                            tGL.uniform1fv(tProgramUniformLocationGroup['uPointLightRadius']['location'], tPointRadiusList)
                    }
                    // 시스템 타임, 레졸루션 갱신
                    tProgramUniformLocationGroup['uSystemTime'] ? tGL.uniform1f(tProgramUniformLocationGroup['uSystemTime']['location'], tTime) : 0,
                        tProgramUniformLocationGroup['uSystemResolution'] ? tGL.uniform2fv(tProgramUniformLocationGroup['uSystemResolution']['location'], tResolution) : 0
                }
                // cacheProgram = null // 캐쉬된 프로그램을 삭제
                //////////////////////////////////////////////////////////////////
                tGL.clear(tGL.COLOR_BUFFER_BIT),
                    self.drawSkyBox(tScene['skyBox'], time),
                    tGL.clear(tGL.DEPTH_BUFFER_BIT),
                    self.draw(tScene['children'], time),
                    self.draw(debugPointRenderList),
                    self.drawGrid(tScene['grid'], time),
                    //////////////////////////////////////////////////////////////////
                    requestAnimationFrame(self.render)
            };
        })()
        // 암비언트 유니폼 세팅
        // this.setAmbientLight = (function () {
        //     var tAmbientColorList
        //     var tLightData;
        //     tAmbientColorList = new Float32Array(4)
        //     return function (programInfo) {
        //         if (programInfo['uniforms']['uAmbientLightColor']) {
        //             tLightData = tScene['lights'][RedAmbientLightInfo.TYPE][0],
        //                 tAmbientColorList[0] = tLightData['color'][0],
        //                 tAmbientColorList[1] = tLightData['color'][1],
        //                 tAmbientColorList[2] = tLightData['color'][2],
        //                 tAmbientColorList[3] = tLightData['color'][3]
        //             tGL.uniform4fv(programInfo['uniforms']['uAmbientLightColor']['location'], tAmbientColorList)
        //         }
        //     }
        // })()
        // 디렉셔널 라이트 유니폼세팅
        // this.setDirectionalLight = (function () {
        //     var tDirectionList, tDirectionColorList;
        //     var i,max, tList, tData;
        //     var tProgramUniformLocationGroup
        //     var tDirection,tColor
        //     tDirectionList = new Float32Array(16 * 3)
        //     tDirectionColorList = new Float32Array(16 * 4)
        //     return function (programInfo) {
        //         tList = tScene['lights'][RedDirectionalLightInfo.TYPE], max = i = tList.length
        //         tProgramUniformLocationGroup = programInfo['uniforms']
        //         if (max && tProgramUniformLocationGroup['uDirectionnalLightDirection']) {
        //             while (i--) {
        //                 tData = tList[i],
        //                     tDirection = tData['direction'],
        //                     tColor = tData['color'],
        //                     tDirectionList[i * 3 + 0] = tDirection[0],
        //                     tDirectionList[i * 3 + 1] = tDirection[1],
        //                     tDirectionList[i * 3 + 2] = tDirection[2],
        //                     tDirectionColorList[i * 4 + 0] = tColor[0],
        //                     tDirectionColorList[i * 4 + 1] = tColor[1],
        //                     tDirectionColorList[i * 4 + 2] = tColor[2],
        //                     tDirectionColorList[i * 4 + 3] = tColor[3]
        //             }
        //             tGL.uniform3fv(tProgramUniformLocationGroup['uDirectionnalLightDirection']['location'], tDirectionList),
        //             tGL.uniform4fv(tProgramUniformLocationGroup['uDirectionnalLightColor']['location'], tDirectionColorList),
        //             tGL.uniform1i(tProgramUniformLocationGroup['uDirectionalNum']['location'], max)
        //         }
        //     }
        // })()
        // 포인트 라이트 유니폼 세팅
        // this.setPointLight = (function () {
        //     var tPointpositionList, tpointColorList, tPointRadiusList
        //     var tProgramUniformLocationGroup
        //     var i, max, tList, tData;
        //     var tPosition, tColor
        //     tPointpositionList = new Float32Array(16 * 3),
        //         tpointColorList = new Float32Array(16 * 4),
        //         tPointRadiusList = new Float32Array(16)
        //     return function (programInfo) {
        //         tList = tScene['lights'][RedPointLightInfo.TYPE], max = i = tList.length
        //         tProgramUniformLocationGroup = programInfo['uniforms']
        //         if (max && tProgramUniformLocationGroup['uPointNum']) {
        //             debugPointRenderList.length = 0
        //             while (i--) {
        //                 tData = tList[i],
        //                     tPosition = tData['position'],
        //                     tColor = tData['color'],
        //                     tPointpositionList[i * 3 + 0] = tPosition[0],
        //                     tPointpositionList[i * 3 + 1] = tPosition[1],
        //                     tPointpositionList[i * 3 + 2] = tPosition[2],
        //                     tpointColorList[i * 4 + 0] = tColor[0],
        //                     tpointColorList[i * 4 + 1] = tColor[1],
        //                     tpointColorList[i * 4 + 2] = tColor[2],
        //                     tpointColorList[i * 4 + 3] = tColor[3],
        //                     tPointRadiusList[i] = tData['radius']
        //                 if (tData['useDebugMode']) {
        //                     debugPointRenderList.push(tData['__debugMesh'])
        //                     tData['__debugMesh'].position[0] = tData.position[0],
        //                         tData['__debugMesh'].position[1] = tData.position[1],
        //                         tData['__debugMesh'].position[2] = tData.position[2],
        //                         tData['__debugMesh'].scale[0] = tData['__debugMesh'].scale[1] = tData['__debugMesh'].scale[2] = tData.radius * 2,
        //                         tData['__debugMesh'].materialInfo.uColor[0] = tColor[0],
        //                         tData['__debugMesh'].materialInfo.uColor[1] = tColor[1],
        //                         tData['__debugMesh'].materialInfo.uColor[2] = tColor[2],
        //                         tData['__debugMesh'].materialInfo.uColor[3] = 0.5
        //                 }
        //             }
        //             tGL.uniform3fv(tProgramUniformLocationGroup['uPointLightPosition']['location'], tPointpositionList),
        //                 tGL.uniform4fv(tProgramUniformLocationGroup['uPointLightColor']['location'], tpointColorList),
        //                 tGL.uniform1i(tProgramUniformLocationGroup['uPointNum']['location'], max),
        //                 tGL.uniform1fv(tProgramUniformLocationGroup['uPointLightRadius']['location'], tPointRadiusList)
        //         }
        //     }
        // })()
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
                    skyBox['scale'][0] = skyBox['scale'][1] = skyBox['scale'][2] = tScene['camera']['far']
                    list.length = 0
                    list.push(skyBox)
                    self.draw(list)
                }
            }
        })();
        // 기본 draw함수
        this.draw = function (renderList, time, parentMTX) {
            var i, i2; // 루프변수
            var tAtlasTextureInfo;
            var parentClone;
            var tData
            /////////////////////////////////////////////////////
            var SIN, COS;
            var tMaterial; // 대상 재질
            var tProgramInfo; // 대상 프로그램 정보
            var tProgram; // 대상 프로그램
            var tGeometry; // 대상 지오메트리
            var tAttrGroup; // 대상 버퍼정보그룹
            var tAttrGroupList; // 대상 버퍼정보그룹을 리스트화함
            var tAttrLocationGroup; // 대상 Attribute의 location 정보들
            var tAttrBufferInfo; // 대상 RedBufferInfo 
            var tAttrPointerKey; // 대상 Attrobute가 반영될 쉐이더내의 변수이름
            var tUniformGroupList; // 대상 유니폼 그룹을 리스트화함
            var tProgramUniformLocationGroup; // 대상 프로그램의 uniform location 정보들
            var tUniformKey, tUniformValue; // 대상 유니폼 키와 값
            var tLocation, tLocationUUID; // 대상 location 정보
            var tIndicesBuffer; // 인덱스 버퍼
            var tVertexPositionBuffer; // 포지션 버퍼
            var tRenderType; //
            var tMesh; // 대상 메쉬
            var tMVMatrix; // 대상 메쉬의 매트릭스 
            var tNMatrix; // 대상 메쉬의 노멀매트릭스
            var tPosition, tRotation, tScale; // 대상 메쉬의 position, rotation, scale
            var tRenderable; // 대상 메쉬를 최종적으로 그릴지 말지 결정
            var tCacheAttr;
            var tCacheTexture;
            var tCacheIntFloat;
            var tCacheUseTexture;
            var tCacheUVAtlascoord
            ///////////////////////////////////////////////////////////////////
            // 매트릭스 관련 변수
            var a, aSx, aSy, aSz, aCx, aCy, aCz, tRx, tRy, tRz;
            var a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33;
            var b0, b1, b2, b3;
            var b00, b01, b02, b10, b11, b12, b20, b21, b22;
            var aX, aY, aZ;
            var inverse_c, inverse_d, inverse_e, inverse_g, inverse_f, inverse_h, inverse_i, inverse_j, inverse_k, inverse_l, inverse_n, inverse_o, inverse_A, inverse_m, inverse_p, inverse_r, inverse_s, inverse_B, inverse_t, inverse_u, inverse_v, inverse_w, inverse_x, inverse_y, inverse_z, inverse_C, inverse_D, inverse_E, inverse_q;
            ///////////////////////////////////////////////////////////////////
            var tUSE_MAP;
            var tUseMapKey
            var tTexture;
            var tTargetIndex;
            var tWantTargetIndex
            var PASS_TARGET_INDEX
            /////////////////////////////////////////////////////
            var targetGL;
            var GL_ARRAY_BUFFER;
            var GL_ELEMENT_ARRAY_BUFFER;
            var GL_UNSIGNED_SHORT;
            var GL_TEXTURE0;
            var GL_TEXTURE_2D;
            var GL_TEXTURE_CUBE_MAP;
            /////////////////////////////////////////////////////
            var INT, FLOAT, VEC, MAT, SAMPLER, ATLASCOORD
            /////////////////////////////////////////////////////
            var tSelf
            PASS_TARGET_INDEX = RedTextureIndex['PASS']
            INT = RedConst.INT,
                FLOAT = RedConst.FLOAT,
                VEC = RedConst.VEC,
                MAT = RedConst.MAT,
                SAMPLER = RedConst.SAMPLER,
                ATLASCOORD = RedConst.ATLASCOORD,
                tSelf = self
            tUSE_MAP = USE_MAP,
                targetGL = tGL,
                GL_ARRAY_BUFFER = targetGL.ARRAY_BUFFER,
                GL_ELEMENT_ARRAY_BUFFER = targetGL.ELEMENT_ARRAY_BUFFER,
                GL_UNSIGNED_SHORT = targetGL.UNSIGNED_SHORT,
                GL_TEXTURE0 = targetGL.TEXTURE0,
                GL_TEXTURE_2D = targetGL.TEXTURE_2D,
                GL_TEXTURE_CUBE_MAP = targetGL.TEXTURE_CUBE_MAP,
                SIN = Math.sin, COS = Math.cos,
                i = renderList.length
            while (i--) {
                tSelf['numDrawCall']++ ,
                    tMesh = renderList[i],
                    tMVMatrix = tMesh['uMVMatrix'],
                    tNMatrix = tMesh['uNMatrix'],
                    tPosition = tMesh['position'],
                    tRotation = tMesh['rotation'],
                    tScale = tMesh['scale'],

                    // 매트릭스 초기화
                    tMVMatrix[0] = 1, tMVMatrix[1] = 0, tMVMatrix[2] = 0, tMVMatrix[3] = 0,
                    tMVMatrix[4] = 0, tMVMatrix[5] = 1, tMVMatrix[6] = 0, tMVMatrix[7] = 0,
                    tMVMatrix[8] = 0, tMVMatrix[9] = 0, tMVMatrix[10] = 1, tMVMatrix[11] = 0,
                    tMVMatrix[12] = 0, tMVMatrix[13] = 0, tMVMatrix[14] = 0, tMVMatrix[15] = 1,
                    // 기본 변환
                    a = tMVMatrix,

                    // 이동
                    aX = tPosition[0], aY = tPosition[1], aZ = tPosition[2],
                    a[12] = a[0] * aX + a[4] * aY + a[8] * aZ + a[12],
                    a[13] = a[1] * aX + a[5] * aY + a[9] * aZ + a[13],
                    a[14] = a[2] * aX + a[6] * aY + a[10] * aZ + a[14],
                    a[15] = a[3] * aX + a[7] * aY + a[11] * aZ + a[15],

                    // xyz축 회전 
                    tRx = tRotation[0], tRy = tRotation[1], tRz = tRotation[2],
                    aSx = SIN(tRx), aCx = COS(tRx), aSy = SIN(tRy), aCy = COS(tRy), aSz = SIN(tRz), aCz = COS(tRz),
                    a00 = a[0], a01 = a[1], a02 = a[2],
                    a10 = a[4], a11 = a[5], a12 = a[6],
                    a20 = a[8], a21 = a[9], a22 = a[10],
                    b00 = aCy * aCz, b01 = aSx * aSy * aCz - aCx * aSz, b02 = aCx * aSy * aCz + aSx * aSz,
                    b10 = aCy * aSz, b11 = aSx * aSy * aSz + aCx * aCz, b12 = aCx * aSy * aSz - aSx * aCz,
                    b20 = -aSy, b21 = aSx * aCy, b22 = aCx * aCy,
                    a[0] = a00 * b00 + a10 * b01 + a20 * b02, a[1] = a01 * b00 + a11 * b01 + a21 * b02, a[2] = a02 * b00 + a12 * b01 + a22 * b02,
                    a[4] = a00 * b10 + a10 * b11 + a20 * b12, a[5] = a01 * b10 + a11 * b11 + a21 * b12, a[6] = a02 * b10 + a12 * b11 + a22 * b12,
                    a[8] = a00 * b20 + a10 * b21 + a20 * b22, a[9] = a01 * b20 + a11 * b21 + a21 * b22, a[10] = a02 * b20 + a12 * b21 + a22 * b22,

                    // 스케일
                    aX = tScale[0], aY = tScale[1], aZ = tScale[2],
                    a[0] = a[0] * aX, a[1] = a[1] * aX, a[2] = a[2] * aX, a[3] = a[3] * aX,
                    a[4] = a[4] * aY, a[5] = a[5] * aY, a[6] = a[6] * aY, a[7] = a[7] * aY,
                    a[8] = a[8] * aZ, a[9] = a[9] * aZ, a[10] = a[10] * aZ, a[11] = a[11] * aZ,
                    a[12] = a[12], a[13] = a[13], a[14] = a[14], a[15] = a[15],

                    // 부모가있으면 곱함
                    parentMTX ? (
                        // 부모매트릭스 복사
                        parentClone = tMesh['__parentMVMatrixClone'],
                        parentClone[0] = parentMTX[0], parentClone[1] = parentMTX[1], parentClone[2] = parentMTX[2], parentClone[3] = parentMTX[3],
                        parentClone[4] = parentMTX[4], parentClone[5] = parentMTX[5], parentClone[6] = parentMTX[6], parentClone[7] = parentMTX[7],
                        parentClone[8] = parentMTX[8], parentClone[9] = parentMTX[9], parentClone[10] = parentMTX[10], parentClone[11] = parentMTX[11],
                        parentClone[12] = parentMTX[12], parentClone[13] = parentMTX[13], parentClone[14] = parentMTX[14], parentClone[15] = parentMTX[15],
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
                    ) : 0,

                    // 정보세팅
                    tMaterial = tMesh['materialInfo'],
                    tProgramInfo = tMaterial['programInfo'],
                    tProgram = tProgramInfo['program'],
                    tGeometry = tMesh['geometryInfo'],
                    tAttrGroup = tGeometry['attributes'],
                    tAttrGroupList = tGeometry['__attributeList'],
                    tAttrLocationGroup = tProgramInfo['attributes'],
                    tProgramUniformLocationGroup = tProgramInfo['uniforms'],
                    tIndicesBuffer = tGeometry['indices'],
                    tVertexPositionBuffer = tAttrGroup['vertexPosition']

                // 프로그램 세팅 & 캐싱
                if (cacheProgram != tProgram) {
                    targetGL.useProgram(tProgram)
                    // cacheTexture.length = 0,
                    // cacheUseTexture.length = 0,
                    // cacheIntFloat.length = 0,
                    // cacheUVAtlascoord.length = 0
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    // 큐브 샘플러가 쉐이더상에 존재할경우 워닝이 뜨지않도록 빈 큐브맵을 미리 딱 한번만 올려둔다.
                    /*
                     TODO: 음 이건 ProgramInfo가 먹어도 될듯한데?
                     복원할때 귀찮아 지려나....
                     일단 둠 -0-;
                    */
                    if (!emptyCubeMap) {
                        if (tProgramUniformLocationGroup['uUseReflectionTexture'] || tProgramUniformLocationGroup['uUseRefractionTexture']) {
                            emptyCubeMap = redGL.createCubeTextureInfo([nullImage, nullImage, nullImage, nullImage, nullImage, nullImage])
                            if (tProgramUniformLocationGroup['uUseReflectionTexture']) {
                                targetGL.activeTexture(GL_TEXTURE0 + RedTextureIndex.CUBE_REFLECTION)
                                targetGL.bindTexture(GL_TEXTURE_CUBE_MAP, emptyCubeMap['texture'])
                                targetGL.uniform1i(tProgramUniformLocationGroup['uReflectionTexture']['location'], RedTextureIndex.CUBE_REFLECTION)
                            }
                            if (tProgramUniformLocationGroup['uReflectionTexture']) {
                                targetGL.activeTexture(GL_TEXTURE0 + RedTextureIndex.CUBE_REFRACTION)
                                targetGL.bindTexture(GL_TEXTURE_CUBE_MAP, emptyCubeMap['texture'])
                                targetGL.uniform1i(tProgramUniformLocationGroup['uRefractionTexture']['location'], RedTextureIndex.CUBE_REFRACTION)
                            }
                            console.log('큐브맵 초기바인딩 실행')
                        }
                    }
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                }
                // 캐시를 또 단계를 줄여줌
                tCacheAttr = cacheAttr,
                    tCacheTexture = cacheTexture,
                    tCacheUseTexture = cacheUseTexture,
                    tCacheIntFloat = cacheIntFloat,
                    tCacheUVAtlascoord = cacheUVAtlascoord,
                    cacheProgram = tProgram,
                    // 어트리뷰트 입력
                    i2 = tAttrGroupList.length
                while (i2--) {
                    tAttrBufferInfo = tAttrGroupList[i2], // 대상버퍼구하고
                        tAttrPointerKey = tAttrBufferInfo['shaderPointerKey'], // 바인딩할 쉐이더 변수키를 알아낸다.
                        // 어트리뷰트 정보매칭이 안되는 녀석은 무시한다 
                        tAttrLocationGroup[tAttrPointerKey]
                            ? (
                                tLocation = tAttrLocationGroup[tAttrPointerKey]['location'], // 어트리뷰트 로케이션도 알아낸다.
                                // 캐싱된 attribute정보과 현재 대상정보가 같다면 무시
                                tCacheAttr[tLocation] == tAttrBufferInfo['__UUID'] ?
                                    0 :
                                    (
                                        // 실제 버퍼 바인딩하고
                                        targetGL.bindBuffer(GL_ARRAY_BUFFER, tAttrBufferInfo['buffer']),
                                        // 해당로케이션을 활성화된적이없으면 활성화 시킨다
                                        tAttrBufferInfo['enabled'] ? 0 : (targetGL.enableVertexAttribArray(tLocation), tAttrBufferInfo['enabled'] = 1),
                                        targetGL.vertexAttribPointer(
                                            tLocation,
                                            tAttrBufferInfo['pointSize'],
                                            tAttrBufferInfo['glArrayType'],
                                            tAttrBufferInfo['normalize'],
                                            tAttrBufferInfo['stride'],
                                            tAttrBufferInfo['offset']
                                        ),
                                        // 상태 캐싱
                                        tCacheAttr[tLocation] = tAttrBufferInfo['__UUID']
                                    )
                            )
                            : 0
                }
                tMaterial['needUniformList'] ? tMaterial.updateUniformList() : 0,
                    tUniformGroupList = tMaterial['__uniformList'],
                    i2 = tUniformGroupList.length,
                    tRenderable = 1
                while (i2--) {
                    tData = tUniformGroupList[i2],
                        tUniformKey = tData['key'],
                        tUniformValue = tMaterial[tUniformKey],
                        tLocation = tData['location'],
                        tLocationUUID = tLocation['__UUID'],
                        tRenderType = tUniformGroupList[i2]['renderType']

                    //////////////////////////////////////////////////////////////
                    // if (tRenderType == SAMPLER) {
                    //     //이젠 여기가 핵심이다..
                    //     tUseMapKey = tUSE_MAP[tUniformKey]
                    //     tUniformValue && tUniformValue['__webglTextureYn']
                    //         ? (
                    //             tUniformValue['__webglAtlasTexture'] ? tUniformValue = tUniformValue['parentAtlasInfo']['textureInfo'] : 0,
                    //             tUniformValue['loaded']
                    //                 ? (
                    //                     tCacheTexture[tTargetIndex = tUniformValue['__targetIndex']] != tUniformValue['__UUID']
                    //                         ? (
                    //                             targetGL.activeTexture(GL_TEXTURE0 + tTargetIndex),
                    //                             targetGL.bindTexture(tUniformValue['__webglTexture'] ? GL_TEXTURE_2D : GL_TEXTURE_CUBE_MAP, tUniformValue['texture']),
                    //                             targetGL.uniform1i(tLocation, tTargetIndex),
                    //                             tCacheTexture[tTargetIndex] = tUniformValue['__UUID']
                    //                         )
                    //                         : 0,
                    //                     // 사용여부를 결정
                    //                     tUseMapKey
                    //                         ? (
                    //                             tWantTargetIndex = RedTextureIndex[tUSE_MAP[tUniformKey][2]],
                    //                             tWantTargetIndex != PASS_TARGET_INDEX && tTargetIndex != tWantTargetIndex
                    //                                 ? (
                    //                                     console.log(tTexture),
                    //                                     console.log(tUseMapKey, tUniformKey, tTargetIndex, tWantTargetIndex),
                    //                                     errorFunc(tUSE_MAP[tUniformKey][2] + " 인덱스타입이 아닙니다.")
                    //                                 )
                    //                                 : 0,
                    //                             tCacheUseTexture[tLocationUUID] == 1
                    //                                 ? 0
                    //                                 : targetGL.uniform1i(
                    //                                     tProgramUniformLocationGroup[tUseMapKey[0]]['location'],
                    //                                     tCacheUseTexture[tLocationUUID] = 1
                    //                                 )
                    //                         )
                    //                         : 0
                    //                 )
                    //                 : tRenderable = 0
                    //         )
                    //         : tUseMapKey
                    //             ? (

                    //                 tCacheUseTexture[tLocationUUID] == 0 ? 0 : targetGL.uniform1i(
                    //                     tProgramUniformLocationGroup[tUseMapKey[0]]['location'],
                    //                     tCacheUseTexture[tLocationUUID] = 0
                    //                 )
                    //             )
                    //             : 0,
                    //     tUniformValue && !tUniformValue['__webglTextureYn'] ? errorFunc('RedBaseRenderInfo : ' + tUniformKey + ' - sampler에 sampler형식이 아닌 값이 들어옵니다.') : 0
                    // }
                    // else {
                    //     tRenderType == INT ? tCacheIntFloat[tLocationUUID] == tUniformValue ? 0 : targetGL.uniform1i(tLocation, tCacheIntFloat[tLocationUUID] = tUniformValue) :
                    //         tRenderType == FLOAT ? tCacheIntFloat[tLocationUUID] == tUniformValue ? 0 : targetGL.uniform1f(tLocation, tCacheIntFloat[tLocationUUID] = tUniformValue) :
                    //             tRenderType == VEC ? targetGL[tUniformValue['__uniformMethod']](tLocation, tUniformValue) :
                    //                 tRenderType == MAT ? targetGL[tUniformValue['__uniformMethod']](tLocation, false, tUniformValue) :
                    //                     // 아틀라스코디네이트값인경우
                    //                     tRenderType == ATLASCOORD ? (tCacheUVAtlascoord[tLocationUUID] == tUniformValue['__UUID'] ? 0 : targetGL.uniform4fv(tLocation, tUniformValue['value']), tCacheUVAtlascoord[tLocationUUID] = tUniformValue['__UUID']) :
                    //                         // 이도저도아닌경우는 뭔가 잘못된거임
                    //                         errorFunc(tUniformKey + ' 안되는 나쁜 타입인거야!!')

                    // }
                    if (tRenderType == SAMPLER) {
                        //이젠 여기가 핵심이다..
                        if (tUniformValue && tUniformValue['__webglTextureYn']) {
                            tUniformValue['__webglAtlasTexture'] ? tUniformValue = tUniformValue['parentAtlasInfo']['textureInfo'] : 0
                            if (tUniformValue['loaded']) {
                                if (tCacheTexture[tTargetIndex = tUniformValue['__targetIndex']] != tUniformValue['__UUID']) {
                                    targetGL.activeTexture(GL_TEXTURE0 + tTargetIndex),
                                        targetGL.bindTexture(tUniformValue['__webglTexture'] ? GL_TEXTURE_2D : GL_TEXTURE_CUBE_MAP, tUniformValue['texture']),
                                        targetGL.uniform1i(tLocation, tTargetIndex),
                                        tCacheTexture[tTargetIndex] = tUniformValue['__UUID']
                                }
                                // 사용여부를 결정
                                if (tUseMapKey = tUSE_MAP[tUniformKey]) {
                                    var t2, t0
                                    t0 = tUseMapKey[0]
                                    t2 = RedTextureIndex[tUSE_MAP[tUniformKey][2]]
                                    if (t2 != RedTextureIndex['PASS'] && tTargetIndex != t2) {
                                        console.log(tTexture)
                                        console.log(tUseMapKey, tUniformKey, tTargetIndex, t2)
                                        throw tUSE_MAP[tUniformKey][2] + " 인덱스타입이 아닙니다."
                                    }
                                    tCacheUseTexture[tLocationUUID] == 1 ? 0 : targetGL.uniform1i(
                                        tProgramUniformLocationGroup[t0]['location'],
                                        tCacheUseTexture[tLocationUUID] = 1
                                    )
                                }
                            } else tRenderable = false
                        } else if (tUseMapKey = tUSE_MAP[tUniformKey]) {
                            tCacheUseTexture[tLocationUUID] == 0 ? 0 : targetGL.uniform1i(
                                tProgramUniformLocationGroup[tUseMapKey[0]]['location'],
                                tCacheUseTexture[tLocationUUID] = 0
                            )
                        }
                        if (tUniformValue && !tUniformValue['__webglTextureYn']) throw 'RedBaseRenderInfo : ' + tUniformKey + ' - sampler에 sampler형식이 아닌 값이 들어옵니다.'
                    }
                    else {
                        tRenderType == INT ? tCacheIntFloat[tLocationUUID] == tUniformValue ? 0 : targetGL.uniform1i(tLocation, tCacheIntFloat[tLocationUUID] = tUniformValue) :
                            tRenderType == FLOAT ? tCacheIntFloat[tLocationUUID] == tUniformValue ? 0 : targetGL.uniform1f(tLocation, tCacheIntFloat[tLocationUUID] = tUniformValue) :
                                tRenderType == VEC ? targetGL[tUniformValue['__uniformMethod']](tLocation, tUniformValue) :
                                    tRenderType == MAT ? targetGL[tUniformValue['__uniformMethod']](tLocation, false, tUniformValue) :
                                        // 아틀라스코디네이트값인경우
                                        tRenderType == ATLASCOORD ? (tCacheUVAtlascoord[tLocationUUID] == tUniformValue['__UUID'] ? 0 : targetGL.uniform4fv(tLocation, tUniformValue['value']), tCacheUVAtlascoord[tLocationUUID] = tUniformValue['__UUID']) :
                                            // 이도저도아닌경우는 뭔가 잘못된거임
                                            errorFunc(tUniformKey + ' 안되는 나쁜 타입인거야!!')
                    }
                };


                // 노말매트릭스를 사용할경우
                tProgramUniformLocationGroup['uNMatrix'] ? (
                    //클론
                    tNMatrix[0] = tMVMatrix[0], tNMatrix[1] = tMVMatrix[1], tNMatrix[2] = tMVMatrix[2], tNMatrix[3] = tMVMatrix[3],
                    tNMatrix[4] = tMVMatrix[4], tNMatrix[5] = tMVMatrix[5], tNMatrix[6] = tMVMatrix[6], tNMatrix[7] = tMVMatrix[7],
                    tNMatrix[8] = tMVMatrix[8], tNMatrix[9] = tMVMatrix[9], tNMatrix[10] = tMVMatrix[10], tNMatrix[11] = tMVMatrix[11],
                    tNMatrix[12] = tMVMatrix[12], tNMatrix[13] = tMVMatrix[13], tNMatrix[14] = tMVMatrix[14], tNMatrix[15] = tMVMatrix[15],
                    // mat4Inverse
                    inverse_c = tNMatrix[0], inverse_d = tNMatrix[1], inverse_e = tNMatrix[2], inverse_g = tNMatrix[3],
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
                    inverse_q = inverse_A * inverse_E - inverse_B * inverse_D + inverse_t * inverse_C + inverse_u * inverse_z - inverse_v * inverse_y + inverse_w * inverse_x,
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
                    tNMatrix[12] = a03, tNMatrix[13] = a13, tNMatrix[14] = a23,
                    // uNMatrix 입력 
                    targetGL.uniformMatrix4fv(tProgramUniformLocationGroup['uNMatrix']['location'], false, tNMatrix)
                ) : 0,
                    // uMVMatrix 입력 
                    targetGL.uniformMatrix4fv(tProgramUniformLocationGroup['uMVMatrix']['location'], false, tMVMatrix),
                    ////////////////////////////////////////////////////////////////////////////////////////////////////
                    // GL 드로잉상태관련 캐싱들 처리
                    // TODO: CCW도먹어야하나?
                    // 컬페이스 사용여부 캐싱처리
                    cacheUseCullFace != tMesh['useCullFace'] ? (cacheUseCullFace = tMesh['useCullFace']) ? targetGL.enable(targetGL.CULL_FACE) : targetGL.disable(targetGL.CULL_FACE) : 0,
                    // 컬페이스 캐싱처리
                    cacheCullFace != tMesh['cullFace'] ? targetGL.cullFace(cacheCullFace = tMesh['cullFace']) : 0,
                    // 뎁스테스트 사용여부 캐싱처리
                    cacheUseDepthTest != tMesh['useDepthTest'] ? (cacheUseDepthTest = tMesh['useDepthTest']) ? targetGL.enable(targetGL.DEPTH_TEST) : targetGL.disable(targetGL.DEPTH_TEST) : 0,
                    // 뎁스테스팅 캐싱처리
                    cacheDepthTestFunc != tMesh['depthTestFunc'] ? targetGL.depthFunc(cacheDepthTestFunc = tMesh['depthTestFunc']) : 0,
                    // 블렌딩 사용여부 캐싱처리
                    cacheUseBlendMode != tMesh['useBlendMode'] ? (cacheUseBlendMode = tMesh['useBlendMode']) ? targetGL.enable(targetGL.BLEND) : targetGL.disable(targetGL.BLEND) : 0,
                    // 블렌딩팩터 캐싱처리
                    cacheBlendModeFactor != (tMesh['blendFactor1'] + tMesh['blendFactor2']) ? (
                        targetGL.blendFunc(tMesh['blendFactor1'], tMesh['blendFactor2']),
                        cacheBlendModeFactor = tMesh['blendFactor1'] + tMesh['blendFactor2']
                    ) : 0,
                    ////////////////////////////////////////////////////////////////////////////////////////////////////
                    // 최종 드로잉결절
                    tIndicesBuffer ? (
                        tRenderable ?
                            (
                                cacheDrawBufferUUID == tIndicesBuffer['__UUID'] ? 0 : targetGL.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, tIndicesBuffer['buffer']),
                                targetGL.drawElements(tMesh['drawMode'], tIndicesBuffer['pointNum'], GL_UNSIGNED_SHORT, 0),
                                cacheDrawBufferUUID = tIndicesBuffer['__UUID']
                            ) : 0
                    ) : (
                            targetGL.drawArrays(tMesh['drawMode'], 0, tVertexPositionBuffer['pointNum']),
                            cacheDrawBufferUUID = tVertexPositionBuffer['__UUID']
                        ),
                    // 자식을 콜
                    tMesh['children'].length ? tSelf.draw(tMesh['children'], time, tMVMatrix) : 0
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