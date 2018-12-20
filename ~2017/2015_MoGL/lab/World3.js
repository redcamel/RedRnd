var World = (function (makeUtil) {
    'use strict';
    var getGL, glSetting, glContext, rectMatrix = Matrix();
    var makeVBO, makeVNBO, makeIBO, makeUVBO, makeProgram, makeTexture, makeFrameBuffer;
    var baseUpdate, baseShaderUpdate, cameraRenderAreaUpdate;
    glSetting = {
        alpha: true,
        depth: true,
        stencil: false,
        antialias: false,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false
    },
    getGL = function (canvas) {
        var gl, keys, i;
        if (glContext) {
            gl = canvas.getContext(glContext, glSetting);
        } else {
            keys = 'experimental-webgl,webgl,webkit-3d,moz-webgl,3d'.split(','), i = keys.length;
            while (i--) {
                if (gl = canvas.getContext(keys[i], glSetting)) {
                    glContext = keys[i];
                    break;
                }
            }
        }
        if(gl) gl.getExtension("OES_element_index_uint");
         return gl;
    };
    var renderList = {}, sceneList = [], cvsList = {}, autoSizer = {}, mouse = {}, started = {}, gpu = {};
    // 씬에서 이사온놈들
    makeVBO = makeUtil.makeVBO,
    makeVNBO = makeUtil.makeVNBO,
    makeIBO = makeUtil.makeIBO,
    makeUVBO = makeUtil.makeUVBO,
    makeProgram = makeUtil.makeProgram,
    makeTexture = makeUtil.makeTexture,
    // TODO 일단은 카메라 프레임버퍼 전용
    makeFrameBuffer = makeUtil.makeFrameBuffer,
    baseUpdate = function (gpu) {
        // TODO 기초 버퍼들도 씬이 월드에서 등록될떄 해야겠음..
        makeVBO(gpu, 'null', [0.0, 0.0, 0.0], 3);
        if (!gpu.vbo['_FRAMERECT_']) {
            makeVBO(gpu, '_FRAMERECT_', [
                -1.0, 1.0, 0.0,
                1.0, 1.0, 0.0,
                -1.0, -1.0, 0.0,
                1.0, -1.0, 0.0
            ], 3),
            makeUVBO(gpu, '_FRAMERECT_', [
                0.0, 0.0,
                1.0, 0.0,
                0.0, 1.0,
                1.0, 1.0
            ], 2),
            makeIBO(gpu, '_FRAMERECT_', [0, 1, 2, 1, 2, 3], 1);
        }

    },
    baseShaderUpdate = function (gpu, scene) {
        var vS, fS
        vS = scene.vertexShaders
        fS = scene.fragmentShaders
        //console.log('~~~~~~~~~',vS)
        //console.log('~~~~~~~~~',fS)
        makeProgram(gpu, 'colorMerge', vS.colorMergeVShader, fS.colorMergeFShader);
        makeProgram(gpu, 'color', vS.colorVertexShader, fS.colorFragmentShader);
        makeProgram(gpu, 'wireFrame', vS.wireFrameVertexShader, fS.wireFrameFragmentShader);
        makeProgram(gpu, 'bitmap', vS.bitmapVertexShader, fS.bitmapFragmentShader);
        makeProgram(gpu, 'bitmapGouraud', vS.bitmapVertexShaderGouraud, fS.bitmapFragmentShaderGouraud);
        makeProgram(gpu, 'colorGouraud', vS.colorVertexShaderGouraud, fS.colorFragmentShaderGouraud);
        makeProgram(gpu, 'colorPhong', vS.colorVertexShaderPhong, fS.colorFragmentShaderPhong);
        makeProgram(gpu, 'toonPhong', vS.toonVertexShaderPhong, fS.toonFragmentShaderPhong);
        makeProgram(gpu, 'bitmapPhong', vS.bitmapVertexShaderPhong, fS.bitmapFragmentShaderPhong);
        makeProgram(gpu, 'bitmapBlinn', vS.bitmapVertexShaderBlinn, fS.bitmapFragmentShaderBlinn);
        makeProgram(gpu, 'postBase', vS.postBaseVertexShader, fS.postBaseFragmentShader);
    },
    cameraRenderAreaUpdate = function (self) {
        var p, p2, k, k2;
        p = sceneList[self]
        for (k in p) {
            p2 = p[k].cameras
            for (k2 in p2) {
                var camera, tRenderArea, cvs,pixelRatio;
                camera = p2[k2],
                cvs = cvsList[self]
                tRenderArea = camera.renderArea;
                pixelRatio = window.devicePixelRatio
                if (tRenderArea && !camera.renderArea.byAutoArea) {
                    var tw,th
                    tw = cvs.width,
                    th = cvs.height
                    var wRatio = tRenderArea[2] / tw;
                    var hRatio = tRenderArea[3] / th;
                    tRenderArea = [
                        typeof tRenderArea[0] == 'string' ? tw * tRenderArea[0].replace('%', '') * 0.01 : tRenderArea[0],
                        typeof tRenderArea[1] == 'string' ? th * tRenderArea[1].replace('%', '') * 0.01 : tRenderArea[1],
                        typeof tRenderArea[2] == 'string' ? tw * tRenderArea[2].replace('%', '') * 0.01 : tRenderArea[2],
                        typeof tRenderArea[3] == 'string' ? th * tRenderArea[3].replace('%', '') * 0.01 : tRenderArea[3]
                    ];
                    camera.renderArea = [tRenderArea[0], tRenderArea[1], tw * wRatio, th * hRatio]
                    camera.renderArea.byAutoArea=false
                }else{
                    camera.renderArea = [0,0,cvs.width,cvs.height]
                    camera.renderArea.byAutoArea = true
                }
                camera.resetProjectionMatrix()
                //TODO 렌더러 반영하겠금 고쳐야겠고..
                // 헉!! 프레임 버퍼가 카메라에 종속되있어!!!!!!
                makeFrameBuffer(gpu[self], camera, cvs);
            }

        }
    };

    return MoGL.extend('World', {
        description:"World는 MoGL의 기본 시작객체로 내부에 다수의 Scene을 소유할 수 있으며, 실제 렌더링되는 대상임.",
        param:[
            "id:string - canvasID"
        ],
        sample:[
            "var world = new World('canvasID1);",
            "",
            "// 애니메이션 루프에 인스턴스를 넣는다.",
            "requestAnimationFrame(world.getRenderer(true));",
            "",
            "// 팩토리함수로도 사용가능",
            "var world2 = World('canvasID2');"
        ],
        exception:[
            "* 'World.constructor:0' - 캔버스 아이디가 없을 때",
            "* 'World.constructor:1' - 존재하지 않는 DOM id일 때",
            "* 'World.constructor:2' - WebGLRenderingContext 생성 실패"
        ],
        value:function World(id) {
            var self;
            self = this;
            if (!id) this.error(0);
            cvsList[this] = document.getElementById(id);
            // for GPU
            gpu[this] = {
                gl: null,
                vbo: {},
                vnbo: {},
                uvbo: {},
                ibo: {},
                programs: {},
                textures: {},
                framebuffers: {}
            };
            if (!cvsList[this]) this.error(1);
            if (gpu[this].gl = getGL(cvsList[this])) {
                renderList[this] = {},
                sceneList[this] = [],
                autoSizer[this] = null;
            } else {
                this.error(2);
            }

            mouse[this] = {x:0,y:0}
            window.addEventListener('mousemove', function(e){
                mouse[self].x = e.x
                mouse[self].y = cvsList[self].height-e.offsetY
                mouse[self].move = true
            })
            window.addEventListener('mousedown', function(e){
                mouse[self].x = e.x
                mouse[self].y = cvsList[self].height-e.offsetY
                mouse[self].down = true
            })
            window.addEventListener('mouseup', function(e){
                mouse[self].x = e.x
                mouse[self].y = cvsList[self].height-e.offsetY
                mouse[self].up = true
            })
            window.addEventListener('touchmove', function(e){
                e.preventDefault();
                mouse[self].x = e.touches[0].clientX*window.devicePixelRatio
                mouse[self].y = cvsList[self].height-e.touches[0].pageY*window.devicePixelRatio
                mouse[self].move = true
            },false)
            window.addEventListener('touchstart', function(e){
                mouse[self].x = e.touches[0].clientX*window.devicePixelRatio
                mouse[self].y = cvsList[self].height-e.touches[0].pageY*window.devicePixelRatio
                mouse[self].down = true
            },false)
            window.addEventListener('touchend', function(e){
                mouse[self].x = e.changedTouches[0].clientX*window.devicePixelRatio
                mouse[self].y = cvsList[self].height-e.changedTouches[0].pageY*window.devicePixelRatio
                mouse[self].up = true
            },false)
        }
    })
    .method('setAutoSize', {
        description:[
            "world에 지정된 canvas요소에 대해 viewport에 대한 자동 크기 조정을 해주는지 여부.",
            "생성시 기본값은 false"
        ],
        param:[
            "isAutoSize:boolean - 자동으로 캔버스의 크기를 조정하는지에 대한 여부."
        ],
        ret:"this - 메서드체이닝을 위해 자신을 반환함.",
        sample:[
            "var world = new World('canvasID');",
            "world.isAutoSize(true);"
        ],
        value:function setAutoSize(isAutoSize) {
            var canvas, scenes, self;
            if (isAutoSize) {
                if (!this._autoSizer) {
                    self = this,
                    canvas = cvsList[this],
                    scenes = sceneList[this],
                    autoSizer[this] = function() {
                        //this._pixelRatio = parseFloat(width)/parseFloat(height) > 1 ? window.devicePixelRatio : 1
                        var width, height, pixelRatio, k;
                        width = window.innerWidth,
                        height = window.innerHeight,
                        pixelRatio = window.devicePixelRatio,
                        canvas.width = width * pixelRatio,
                        canvas.height = height * pixelRatio,
                        canvas.style.width = width + 'px',
                        canvas.style.height = height + 'px',
                        canvas._autoSize = isAutoSize,
                        cameraRenderAreaUpdate(self);
                        gpu[self].gl.viewport(0, 0, canvas.width, canvas.height);
                    };
                }
                window.addEventListener('resize', autoSizer[this]),
                window.addEventListener('orientationchange', autoSizer[this]);
                autoSizer[this]();
            } else if (autoSizer[this]) {
                window.removeEventListener('resize', autoSizer[this]),
                window.removeEventListener('orientationchange', autoSizer[this]);
            }
            return this;
        }
    })
    .method('addScene', {
        description:[
            "[Scene](Scene.md)객체를 world에 추가함."
        ],
        param:[
            "scene:[Scene](Scene.md) - [Scene](Scene.md)의 인스턴스"
        ],
        ret:"this - 메서드체이닝을 위해 자신을 반환함.",
        exception:[
            "* 'World.addScene:0' - 이미 등록된 Scene.",
            "* 'World.addScene:1' - [Scene](Scene.md)이 아닌 객체를 지정한 경우."
        ],
        sample:[
            "var world = new World('canvasID');",
            "world.addScene(Scene().setId('lobby'));",
            "world.addScene(Scene().setId('room'));"
        ],
        value:function addScene(scene) {
            var tSceneList, i;
            tSceneList = sceneList[this], i = tSceneList.length;
            if (!(scene instanceof Scene )) this.error(1);
            while (i--) {
                if (tSceneList[i] == scene) this.error(0);
            }
            tSceneList.push(scene);
            var p = gpu[this];
            baseUpdate(p),
            baseShaderUpdate(p, scene),
            cameraRenderAreaUpdate(this);
            //scene등록시 현재 갖고 있는 모든 카메라 중 visible이 카메라 전부 등록
            //이후부터는 scene에 카메라의 변화가 생기면 자신의 world에게 알려야함
            return this;
        }
    })
    .method('getScene', {
        description:[
            "sceneId에 해당되는 [Scene](Scene.md)을 얻음."
        ],
        param:[
            "sceneId:string - 등록시 scene의 id. 없으면 null을 반환함."
        ],
        ret:"[Scene](Scene.md) - sceneId에 해당되는 [Scene](Scene.md) 인스턴스.",
        sample:[
            "var world = new World('canvasID');",
            "world.addScene(new Scene().setId('lobby'));",
            "var lobby = world.getScene('lobby');"
        ],
        value:function getScene(sceneID) {
            var i, tSceneList;
            tSceneList = sceneList[this],
            i = tSceneList.length;
            if (typeof sceneID === 'undefined') return null;
            while (i--) {
                if (tSceneList[i].id == sceneID) {
                    return tSceneList[i];
                }
            }
            return null;
        }
    })
    .method('getRenderer', {
        description:[
            "setInterval이나 requestAnimationFrame에서 사용될 렌더링 함수를 얻음.",
            "실제로는 본인과 바인딩된 render함수를 반환하고 한 번 반환한 이후는 캐쉬로 잡아둠."
        ],
        param:[
            "isRequestAnimationFrame:boolean - 애니메이션프레임용으로 반환하는 경우는 내부에서 다시 requestAnimationFrame을 호출하는 기능이 추가됨."
        ],
        ret:"function - this.render.bind(this) 형태로 본인과 바인딩된 함수를 반환함.",
        sample:[
            "var world = new World('canvasID');",
            "world.addScene(Scene().setId('lobby'));",
            "//인터벌용",
            "setInterval(world.getRenderer());",
            "//raf용",
            "requestAnimationFrame(world.getRenderer(true));"
        ],
        value:function getRenderer(isRequestAnimationFrame) {
            var p, self;
            p = renderList[this];
            if (!p) {
                // 없으니까 생성
                p = {}
            }
            self = this;
            if (isRequestAnimationFrame) {
                if (p[1]) return p[1];
                else {
                    return p[1] = function requestAni(currentTime) {
                            self.render(currentTime);
                            started[self.uuid] = requestAnimationFrame(p[1]);
                    }
                }
            } else {
                if (p[0]) return p[0];
                else {
                    p[0] = function intervalAni(currentTime) {
                        self.render(currentTime);
                    }
                    return p[0];
                }
            }
        }
    })
    .method('start', {
        description:[
            "requestAnimationFrame을 이용해 자동으로 render를 호출함."
        ],
        ret:"this - 메서드체이닝을 위해 자신을 반환함.",
        sample:[
            "var world = new World('canvasID');",
            "world.start();"
        ],
        value:function start() {
            var renderFunc = this.getRenderer(1)
            started[this.uuid] = requestAnimationFrame(renderFunc);
            return this;
        }
    })
    .method('stop', {
        description:[
            "start시킨 자동 render를 정지함."
        ],
        ret:"this - 메서드체이닝을 위해 자신을 반환함.",
        sample:[
            "var world = new World('canvasID');",
            "world.start();",
            "world.stop();"
        ],
        value:function stop() {
            cancelAnimationFrame(started[this.uuid]);
            return this;
        }
    })
    .method('removeScene', {
        description:[
            "[Scene](Scene.md)객체를 world에서 제거함.",
            "[Scene](Scene.md)을 제거하면 관련된 카메라가 지정된 render도 자동으로 제거됨."
        ],
        param:[
            "sceneId:string - [Scene](Scene.md)객체에 정의된 id."
        ],
        ret:"this - 메서드체이닝을 위해 자신을 반환함.",
        exception:[
            "* 'World.removeScene:0' - id에 해당되는 [Scene](Scene.md)이 존재하지 않음."
        ],
        sample:[
            "// Scene과 Camara생성 및 등록",
            "var lobby = new Scene();",
            "lobby.addChild(Camera());",
            "",
            "// Scene 등록",
            "var world = new World('canvasID');",
            "world.addScene(lobby.setId('lobby'));",
            "",
            "// Scene 제거",
            "world.removeScene('lobby');"
        ],
        value:function removeScene(sceneID) {
            var i, tSceneList;
            tSceneList = sceneList[this],
            i = tSceneList.length;
            if (typeof sceneID === 'undefined') return null;
            while (i--) {
                if (tSceneList[i].id == sceneID) {
                    tSceneList.splice(i, 1),
                    console.log(sceneList);
                    return this;
                }
            }
            this.error('0');
        }
    })
    .method('render', {
        description:[
            "현재 화면을 그림."
        ],
        param:[
            "?currentTime:number - 현재시간 milliseconds."
        ],
        ret:"this - 메서드체이닝을 위해 자신을 반환함.",
        sample:[
            "// Scene과 Camara생성 및 등록",
            "var lobby = new Scene();",
            "lobby.addChild(Camera());",
            "",
            "// Scene 등록",
            "var world = new World('canvasID');",
            "world.addScene(lobby.setId('lobby'));",
            "",
            "// 실제 출력",
            "world.render();"
        ],
        value:(function render(){
            var i, i2, j, k, k2,k3,len = 0;
            var f3 = new Float32Array(3);
            var tScene, tSceneList, tCameraList, tCamera, tGPU, tGL, tChildren, tChildrenArray;
            var tCvs, tCvsW, tCvsH;
            var tMatUUID;
            var tProgram, tVBO, tUVBO, tIBO, tFrameBuffer;
            var pProgram, pCulling, pVBO, pVNBO, pUVBO, pIBO, pDiffuse;

            var privateChildren, privateChildrenArray;
            var priGeo,priMat;
            var priMatColor;
            var tDiffuseMaps, tNormalMaps;
            var tColor;
            var baseLightRotate;

            var mergedInfo = {
                uuids : {},
                lists : []
            }

            privateChildren = $getPrivate('Scene', 'children'),
            privateChildrenArray = $getPrivate('Scene', 'childrenArray'),
            priGeo = $getPrivate('Mesh', 'geometry'),
            priMat = $getPrivate('Mesh', 'material'),
            priMatColor = $getPrivate('Material', 'color')

            var tProjectionMtx
            var tCameraMtx
            var tempList;

            var update = function update(gpu, list , updateList, updateFlag){
                MergeManager.mergePropertyChange(gpu, list , updateList, updateFlag)
            }
            return function(currentTime) {
                len = 0,
                pProgram = null,
                pCulling = null,
                pVBO = null,
                pVNBO = null,
                pUVBO = null,
                pIBO = null,
                pDiffuse = null,
                tCvs = cvsList[this.uuid],
                tSceneList = sceneList[this.uuid],
                tGPU = gpu[this.uuid],
                tGL = tGPU.gl,
                tCvsW = tCvs.width,
                tCvsH = tCvs.height,
                i = tSceneList.length,
                tDiffuseMaps = null,
                tNormalMaps = null
                this.dispatch(World.renderBefore, currentTime);
                while (i--) {
                    tScene = tSceneList[i]
                    //////////////////////////////////////////////////////////////////////////////////////////////////////
                    //Scene 업데이트 사항 반영
                    j = tScene.updateList.mesh.length;
                    while (j--) {
                        // 버퍼 업데이트
                        var updateItem, geo;
                        updateItem = tScene.updateList.mesh[j],
                        geo = updateItem.geometry;
                        if (geo) {
                            if (!tGPU.vbo[geo]) {
                                makeVBO(tGPU, geo, geo.position, 3),
                                makeVNBO(tGPU, geo, geo.normal, 3),
                                makeUVBO(tGPU, geo, geo.uv, 2),
                                makeIBO(tGPU, geo, geo.index, 1);
                            }
                        }
                    }
                    j = tScene.updateList.material.length;
                    while (j--) {
                        makeTexture(tGPU, tScene.updateList.material[j]);
                    }

                    if (tScene.updateList.camera.length) cameraRenderAreaUpdate(this);
                    tScene.updateList.mesh.length = 0,
                    tScene.updateList.material.length = 0,
                    tScene.updateList.camera.length = 0

                    tChildren = privateChildren[tScene.uuid];
                    tChildrenArray = privateChildrenArray[tScene.uuid];
                    // 메쉬 머징
                    //////////////////////////////////////////////////////////////////////////////////////////////////////
                    tCameraList = tScene.cameras,
                    baseLightRotate = tScene.baseLightRotate
                    var tCameraArrayList = []
                    for (j in tCameraList){
                        tCameraArrayList.push(tCameraList[j])
                        len++
                    }
                    j = tCameraArrayList.length
                    while(j--){
                        tCamera = tCameraArrayList[j];
                        if (tCamera.visible) {
                            if (len > 1) {
                                tFrameBuffer = tGPU.framebuffers[tCamera.uuid].frameBuffer;
                                tGL.bindFramebuffer(tGL.FRAMEBUFFER, tFrameBuffer);
                                tGL.viewport(0, 0, tFrameBuffer.width, tFrameBuffer.height);
                            } else {

                            }

                            tGL.enable(tGL.DEPTH_TEST), tGL.depthFunc(tGL.LESS),
                            tGL.enable(tGL.BLEND),
                            tGL.blendFunc(tGL.SRC_ALPHA, tGL.ONE_MINUS_SRC_ALPHA),

                            tColor = tCamera.backgroundColor,
                            tGL.clearColor(tColor[0], tColor[1], tColor[2], tColor[3]),
                            tGL.clear(tGL.COLOR_BUFFER_BIT | tGL.DEPTH_BUFFER_BIT),
                            tProjectionMtx = tCamera.projectionMatrix.raw,
                            tCameraMtx = tCamera.matrix.raw;

                            for (k2 in tGPU.programs) {
                                tProgram = tGPU.programs[k2],
                                tGL.useProgram(tProgram),
                                tGL.uniformMatrix4fv(tProgram.uPixelMatrix, false, tProjectionMtx),
                                tGL.uniformMatrix4fv(tProgram.uCameraMatrix, false, tCameraMtx);
                                if(tProgram['uDLite']) {
                                tGL.uniform3fv(tProgram.uDLite, baseLightRotate);
                                }
                            }

                            // 대상 씬의 차일드 루프
                            tProgram = tGPU.programs['colorMerge'];
                            tGL.useProgram(tProgram);

                            mergedInfo = MergeManager.mergeData(tGPU,mergedInfo,tScene.updateList.merged)

                            k3=0
                            for (k2 in tGPU.textures) {
                                if (k3 == 9) break
                                tGL.activeTexture(tGL['TEXTURE' + k3]);
                                tGL.bindTexture(tGL.TEXTURE_2D, tGPU.textures[k2]);
                                tGL.uniform1i(tProgram['uSampler' + k3], k3);
                                k3++
                            }

                            update(tGPU, mergedInfo.lists,tScene.updateList.updatePropertys, {
                                rotate: true,
                                position: true,
                                scale : true
                            })

                            i2 = mergedInfo.lists.length
                            var prevLen = 0
                            while(i2--){
                                tempList= mergedInfo.lists[i2]
                                tVBO = tempList.vertexBuffer

                                if(tVBO.updated || mergedInfo.lists.length>1) {
                                    tGL.bindBuffer(tGL.ARRAY_BUFFER, tVBO),
                                    tGL.vertexAttribPointer(tProgram.aVertexPosition, 3, tGL.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0 * Float32Array.BYTES_PER_ELEMENT),
                                    tGL.vertexAttribPointer(tProgram.aVertexNormal, 3, tGL.FLOAT, true, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT)
                                    tVBO.updated = false
                                }

                                tVBO = tempList.materialBuffer
                                if(tVBO.updated || mergedInfo.lists.length>1) {
                                    tGL.bindBuffer(tGL.ARRAY_BUFFER, tVBO),
                                    tGL.vertexAttribPointer(tProgram.aUV, 3, tGL.FLOAT, false, 7 * Float32Array.BYTES_PER_ELEMENT, 0 * Float32Array.BYTES_PER_ELEMENT),
                                    tGL.vertexAttribPointer(tProgram.aColor, 4, tGL.FLOAT, false, 7 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT)
                                    tVBO.updated = false
                                }

                                tVBO = tempList.scaleBuffer
                                if(tVBO.updated || mergedInfo.lists.length>1) {
                                    tGL.bindBuffer(tGL.ARRAY_BUFFER, tVBO),
                                    tGL.bufferData(tGL.ARRAY_BUFFER, tempList.scaleData,tGL.DYNAMIC_DRAW)
                                    tGL.vertexAttribPointer(tProgram.aScale, 3, tGL.FLOAT, false, 0, 0)
                                    tVBO.updated = false
                                }

                                tVBO = tempList.positionBuffer
                                if(tVBO.updated || mergedInfo.lists.length>1){
                                    tGL.bindBuffer(tGL.ARRAY_BUFFER, tVBO),
                                    tGL.bufferData(tGL.ARRAY_BUFFER, tempList.positionData,tGL.DYNAMIC_DRAW)
                                    tGL.vertexAttribPointer(tProgram.aPosition, 3, tGL.FLOAT, false, 0, 0)
                                    tVBO.updated = false
                                }

                                tVBO = tempList.rotateBuffer
                                if(tVBO.updated || mergedInfo.lists.length>1){
                                    tGL.bindBuffer(tGL.ARRAY_BUFFER, tVBO),
                                    tGL.bufferData(tGL.ARRAY_BUFFER, tempList.rotateData,tGL.DYNAMIC_DRAW)
                                    tGL.vertexAttribPointer(tProgram.aRotate, 3, tGL.FLOAT, false, 0, 0)
                                    tVBO.updated = false
                                }

                                tIBO = tempList.indexBuffer
                                if(tIBO.updated || mergedInfo.lists.length>1) {
                                    tGL.bindBuffer(tGL.ELEMENT_ARRAY_BUFFER, tIBO)
                                    tIBO.updated = false
                                }
                                tGL.drawElements(tGL.TRIANGLES, tIBO.numItem, tGL.UNSIGNED_INT, 0)
                            }
                            if (len > 1) {
                                tGL.bindFramebuffer(tGL.FRAMEBUFFER, null);
                                pProgram = null , pVBO = null, pVNBO = null, pUVBO = null, pIBO = null;
                            }
                        }
                    }
                }
                // TODO 아래는 아직 다 못옮겨씀
                // 프레임버퍼를 모아서 찍어!!!
                if (len > 1) {
                    tGL.viewport(0, 0, tCvs.width, tCvs.height);
                    tGL.clearColor(0, 0, 0, 1);
                    tGL.enable(tGL.DEPTH_TEST), tGL.depthFunc(tGL.LEQUAL);
                    //tGL.disable(tGL.DEPTH_TEST);
                    tGL.enable(tGL.BLEND);
                    tGL.blendFunc(tGL.SRC_ALPHA, tGL.ONE_MINUS_SRC_ALPHA);
                    tGL.clear(tGL.COLOR_BUFFER_BIT | tGL.DEPTH_BUFFER_BIT);
                    tVBO = tGPU.vbo['_FRAMERECT_'],
                    tUVBO = tGPU.uvbo['_FRAMERECT_'],
                    tIBO = tGPU.ibo['_FRAMERECT_'],
                    tProgram = tGPU.programs['postBase'];
                    if (!tVBO) return;
                    tGL.useProgram(tProgram);
                    tGL.uniformMatrix4fv(tProgram.uPixelMatrix, false, [
                        2 / tCvs.clientWidth, 0, 0, 0,
                        0, -2 / tCvs.clientHeight, 0, 0,
                        0, 0, 0, 0,
                        -1, 1, 0, 1
                    ]);
                    tGL.bindBuffer(tGL.ARRAY_BUFFER, tVBO),
                    tGL.vertexAttribPointer(tProgram.aVertexPosition, tVBO.stride, tGL.FLOAT, false, 0, 0),
                    tGL.bindBuffer(tGL.ARRAY_BUFFER, tUVBO),
                    tGL.vertexAttribPointer(tProgram.aUV, tUVBO.stride, tGL.FLOAT, false, 0, 0),
                    tGL.uniformMatrix4fv(tProgram.uCameraMatrix, false, rectMatrix.raw);

                    for (k in tCameraList) {
                        tCamera = tCameraList[k];
                        if (tCamera.visible) {
                            tFrameBuffer = tGPU.framebuffers[tCamera.uuid].frameBuffer;
                            tGL.uniform1i(tProgram.uFXAA, tCamera.antialias);
                            if (tCamera.antialias) {
                                if (tCamera.renderArea) tGL.uniform2fv(tProgram.uTexelSize, [1 / tFrameBuffer.width, 1 / tFrameBuffer.height]);
                                else tGL.uniform2fv(tProgram.uTexelSize, [1 / tCvs.width, 1 / tCvs.height]);
                            }
                            f3[0] = tFrameBuffer.x + tFrameBuffer.width / 2 / window.devicePixelRatio, f3[1] = tFrameBuffer.y + tFrameBuffer.height / 2 / window.devicePixelRatio , f3[2] = 0;
                            tGL.uniform3fv(tProgram.uPosition, f3),
                            f3[0] = tFrameBuffer.width / 2 / window.devicePixelRatio, f3[1] = tFrameBuffer.height / 2 / window.devicePixelRatio, f3[2] = 1,
                            tGL.uniform3fv(tProgram.uScale, f3),
                            //tGL.activeTexture(tGL.TEXTURE0),
                            tGL.bindTexture(tGL.TEXTURE_2D, tGPU.framebuffers[tCamera.uuid].texture),
                            tGL.uniform1i(tProgram.uSampler, 0),
                            tGL.bindBuffer(tGL.ELEMENT_ARRAY_BUFFER, tIBO),
                            tGL.drawElements(tGL.TRIANGLES, tIBO.numItem, tGL.UNSIGNED_INT, 0);
                        }
                    }

                }
                this.dispatch(World.renderAfter, currentTime);
                //tGL.flush();
                //tGL.finish()
            }
        })()
    })
    .constant('renderBefore', {
        description:'renderBefore constant',
        sample:[
            "world.addEventListener(World.renderBefore, function() {",
            "   //job",
            "});"
        ],
        value:'WORLD_RENDER_BEFORE'
    })
    .constant('renderAfter', {
        description:'renderAfter constant',
        sample:[
            "world.addEventListener(World.renderAfter, function () {",
            "   //job",
            "});"
        ],
        value:'WORLD_RENDER_AFTER'
    })
    .build();
})(makeUtil);
