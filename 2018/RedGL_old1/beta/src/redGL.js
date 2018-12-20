"use strict";
var RedGL;
var REDGL_UUID; // 내부에서 사용할 고유아이디
(function () {
	var getGL;
	var instanceList = [];
	REDGL_UUID = 0
	getGL = (function () {
		var checkList; // 체크할 리스트
		var option; // 기본초기화 옵션
		var t0, i;
		option = {
			alpha: false,
			depth: true,
			stencil: false,
			antialias: true,
			premultipliedAlpha: false,
			preserveDrawingBuffer: false,
			powerPreference: 'default', // default, high-performance, low-power
			failIfMajorPerformanceCaveat: false
		}
		checkList = 'webkit-3d,moz-webgl,3d,experimental-webgl,webgl,webgl2'.split(',')
		return function (cvs) {
			i = checkList.length
			while (i--) {
				if (t0 = cvs.getContext(checkList[i], option)) return console.log(checkList[i]), t0['mode']=checkList[i], t0
			}
			throw "RedGL : 웹지엘을 사용할수없습니다."
		}
	})();
	/**DOC:
		{
			constructorYn : true,
			title :`RedGL`,
			description : `
				RedGL 인스턴스 생성자
				<b>초기화 옵션</b>
				alpha: false,
				depth: true,
				stencil: false,
				antialias: true,
				premultipliedAlpha: false,
				preserveDrawingBuffer: false,
				powerPreference: 'default', // default, high-performance, low-power
				failIfMajorPerformanceCaveat: false
			`,
			params : {
				canvas : [
					{type:'Canvas Element'}
				],
				callback :[
					{type:'function'},
					'컨텍스트 초기화이후 실행될 콜백'
				],
				fullMode : [
					{type:'Boolean'},
					'- 기본값 false',
					'- true일경우 윈도우사이즈가 변할때마다 추적함'
				],
				shaderSourceInfo : [
					{type:'Object'},
					'미리로드할 쉐이더 소스정보'
				]
			},
			example : `
				// 기초 초기화
				RedGL(document.getElementById('test'), function(){ 콜백내용 })
				// 풀스크린 초기화
				RedGL(document.getElementById('test'), function(){ 콜백내용 }, true)
				// 쉐이더 추가 초기화
				RedGL(document.getElementById('test'), function(){ 콜백내용 }, true, [
					// 추가할 쉐이더 소스를 아래의 형식으로 입력
					{ id: 'colorVS', src: 'glsl/colorVS.glsl' },
					{ id: 'colorFS', src: 'glsl/colorFS.glsl' },
					{ id: 'bitmapVS', src: 'glsl/bitmapVS.glsl' },
					{ id: 'bitmapFS', src: 'glsl/bitmapFS.glsl' },
					{ id: 'bitmapPhongVS', src: 'glsl/bitmapPhongVS.glsl' },
					{ id: 'bitmapPhongFS', src: 'glsl/bitmapPhongFS.glsl' },
					{ id: 'skyBoxVS', src: 'glsl/skyBoxVS.glsl' },
					{ id: 'skyBoxFS', src: 'glsl/skyBoxFS.glsl' }
				])
			`,
			return : 'RedGL Instance'
		}
	:DOC*/
	RedGL = function (canvas, callback, fullMode, shaderSourceInfo) {
		if (!(this instanceof RedGL)) return new RedGL(canvas, callback, fullMode, shaderSourceInfo)
		var tGL;
		this['__canvas'] = canvas
		canvas.style.boxSizing = 'border-box'
		this['gl'] = tGL = getGL(canvas)
		fullMode ? this.setSize() : 0 // 풀모드일경우....처음 확장
		this['fullMode'] = fullMode
		this['__UUID'] = REDGL_UUID++
		this['__datas'] = {}
		this['detect'] = redGLDetect(this)
		this['renderScale'] = 1
		console.log('RedGL 생성완료')

		// 초기상태정의
		tGL.enable(tGL.DEPTH_TEST);
		tGL.depthFunc(tGL.LESS)
		// 컬링 페이스 설정
		tGL.frontFace(tGL.CCW)
		tGL.enable(tGL.CULL_FACE);
		tGL.cullFace(tGL.BACK)
		// 블렌드모드설정
		tGL.enable(tGL.BLEND);
		tGL.blendFunc(tGL.ONE, tGL.ONE_MINUS_SRC_ALPHA);
		// 픽셀 블렌딩 결정
		tGL.pixelStorei(tGL.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
		// 픽셀 플립 기본설정
		tGL.pixelStorei(tGL.UNPACK_FLIP_Y_WEBGL, true);
		// 시저박스 설정
		tGL.enable(tGL.SCISSOR_TEST);
		tGL.scissor(0, 0, tGL.drawingBufferWidth, tGL.drawingBufferHeight);
		// set the viewport rectangle
		tGL.viewport(0, 0, tGL.drawingBufferWidth, tGL.drawingBufferHeight);

		instanceList.push(this) //TODO: 사실상 이놈은 조금더 지켜보고 제거대상임
		/*
			- 초기 activeTexture 인덱스는 0번이다. 
			- 쉐이더상에 텍스쳐가 존재하는데 사용하지 않을경우 경고가 뜸으로 무시하도록 0번을 빈 텍스쳐로 체워둠
			- 쉐이더상에 sampler2D와 samplerCube가 동시에 존재할경우 경고가 뜸으로 0번은 한번체워둔뒤 사용하지않음.
			- samplerCube의 경우 렌더러에서 자동으로 빈 텍스쳐를 채워줌.
		*/
		this.createTextureInfo('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzMxRDhBQzRFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzMxRDhBQzVFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MzFEOEFDMkU1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MzFEOEFDM0U1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuojYFUAAAAQSURBVHjaYvj//z8DQIABAAj8Av7bok0WAAAAAElFTkSuQmCC', 0)


		if (shaderSourceInfo) RedShaderLoader(this, shaderSourceInfo, callback), console.log('RedGL : shaderSourceInfo - ', shaderSourceInfo)
		else callback ? callback() : 0
	}
	window.addEventListener('resize', function () {
		instanceList.forEach(function (v) {
			if (v['fullMode']) v.setSize()
		})
	})
	RedGL.prototype = {
		setRenderScale : function(v){
			this.renderScale = v
			instanceList.forEach(function (v) {
				if (v['fullMode']) v.setSize(undefined, undefined, true)
			})
		},
		/**DOC:
		{
			title :`setSize`,
			code: 'FUNCTION',
			description : `
				wengl 캔버스의 크기를 지정함.
				인자를 입력하지 않으면 화면상의 풀사이즈로 적용됨
			`,
			params : {
				width : [
					{type:'Number'},
					'가로값'
				],
				height : [
					{type:'Number'},
					'세로값'
				]
			},
			example : `
				인스턴스.setSize(600,600)
			`
		}
		:DOC*/
		setSize: (function () {
			var tGL;
			var W, H;
			var prevW, prevH
			var ratio
			prevW = 0, prevH = 0
			return function (width, height,force) {
				W = width ? width : (document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth)
				H = height ? height : (document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight)
				// W = width ? width : window.innerWidth
				H = height ? height : window.innerHeight
				tGL = this.gl
				ratio = window.devicePixelRatio || 1
				this.renderScale = this.renderScale ? this.renderScale : 1
				if (prevW != W || prevH != H || force) {
					this.__canvas.width = W * ratio* this.renderScale
					this.__canvas.height = H * ratio * this.renderScale
					this.__canvas.style.width = W
					this.__canvas.style.height = H
					//TODO: height window.devicePixelRatio를 조작하면...렌더 퀄리티 옵션으로 사용할수있다.
					tGL.viewport(0, 0, tGL.drawingBufferWidth, tGL.drawingBufferHeight);
					// set the scissor rectangle
					tGL.scissor(0, 0, tGL.drawingBufferWidth, tGL.drawingBufferHeight);
					console.log(tGL.drawingBufferWidth, tGL.drawingBufferHeight)
					
				prevW = W
				prevH = H
				}
			}
		})(),
		//TODO: 렌더배율 (모바일에서 옵션으로 설정할수있게하겠다..)
		/**DOC:
		{
			title :`getSourceFromScript`,
			code: 'FUNCTION',
			description : `
				script 소스를 가져옴
			`,
			params : {
				id : [
					{type:'String'},
					'아이디'
				]
			},
			example : `
				인스턴스.getSourceFromScript(id)
			`,
			return : 'String'
		}
		:DOC*/
		getSourceFromScript: RedShaderInfo.getSourceFromScript,
		/**DOC:
		{
			title :`createShaderInfo`,
			code : 'FUNCTION',
			description : `
				- RedGL 쉐이더 생성기.
				- 유일키만 지원하며 키 중복일경우 기존 캐싱된 쉐이더정보를 반환함.
				- 단 프레그먼트/버텍스의 키는 따로 관리함.
			`,
			params : {
				key : [
					{type:'String'},
					'- 등록될 키명'
				],
				type : [
					{type:'String'},
					'- 버텍스 쉐이더(RedShaderInfo.VERTEX_SHADER)',
					'- 프레그먼트 쉐이더(RedShaderInfo.FRAGMENT_SHADER)'
				],
				source : [
					{type:'String'},
					'- 생성할 쉐이더 소스문자열'
				]
			},
			example : `
			 	var test;
				test = RedGL(Canvas Element)
				// basic이라는 이름으로 버텍스 쉐이더를 만든다. 
				test.createShaderInfo('basic', RedShaderInfo.VERTEX_SHADER, 쉐이더소스)
			`,
			return : 'RedShaderInfo Instance'
		}
		:DOC*/
		createShaderInfo: function (key, type, source) {
			return new RedShaderInfo(this, key, type, source)
		},
		/**DOC:
		{
			title :`getShaderInfo`,
			code : 'FUNCTION',
			description : `
				- 정의된 쉐이더를 조회
			`
		}
		:DOC*/
		getShaderInfo: function (key, type) {
			return this['__datas']['shaderInfo'][type][key]
		},
		/**DOC:
		{
			title :`createProgram`,
			code : 'FUNCTION',
			description : `프로그램 생성 단축 매서드`
		}
		:DOC*/
		createProgramInfo: function (key, vShaderInfo, fShaderInfo, onInitUniformValue, onDefineTexture) {
			return new RedProgramInfo(this, key, vShaderInfo, fShaderInfo, onInitUniformValue, onDefineTexture)
		},
		/**DOC:
		{
			title :`getProgramInfo`,
			code : 'FUNCTION',
			description : `프로그램 조회`,
			parmas : {
				key :[
					{type:'String'},
					'키로 등록된 프로그램을 조회함'
				]
			}
		}
		:DOC*/
		getProgramInfo: function (key) {
			return this['__datas']['RedProgramInfo'][key]
		},
		/**DOC:
		{
			title :`createArrayBufferInfo`,
			code : 'FUNCTION',
			description : `Array버퍼 생성 단축 매서드`
		}
		:DOC*/
		createArrayBufferInfo: function (key, shaderPointerKey, dataList, pointSize, pointNum, glArrayType, normalize, stride, offset, drawMode) {
			//TODO: pointNum, glArrayType도 그냥 단축시켜버릴까 -_-
			return new RedBufferInfo(this, RedBufferInfo.ARRAY_BUFFER, key, shaderPointerKey, dataList, pointSize, pointNum, glArrayType, normalize, stride, offset, drawMode)
		},
		/**DOC:
		{
			title :`createIndexBufferInfo`,
			code : 'FUNCTION',
			description : `ElementArray버퍼 생성 단축 매서드`
		}
		:DOC*/
		createIndexBufferInfo: function (key, dataList, pointSize, pointNum, glArrayType, normalize, stride, offset, drawMode) {
			//TODO: pointNum, glArrayType도 그냥 단축시켜버릴까 -_-
			return new RedBufferInfo(this, RedBufferInfo.ELEMENT_ARRAY_BUFFER, key, null, dataList, pointSize, pointNum, glArrayType, normalize, stride, offset, drawMode)
		},
		/**DOC:
		{
			title :`getArrayBufferInfo`,
			code : 'FUNCTION',
			description : `Array버퍼 조회 매서드`,
			parmas : {
				key :[
					{type:'String'},
					'키로 등록된 Array버퍼를 조회함'
				]
			}
		}
		:DOC*/
		getArrayBufferInfo: function (key) {
			return this['__datas']['RedBufferInfo'][key]
		},
		/**DOC:
		{
			title :`getIndexBufferInfo`,
			code : 'FUNCTION',
			description : `ElementArray버퍼 조회 매서드`,
			parmas : {
				key :[
					{type:'String'},
					'키로 등록된 ElementArray버퍼를 조회함'
				]
			}
		}
		:DOC*/
		getIndexBufferInfo: function (key) {
			return this['__datas']['RedBufferInfo'][key]
		},
		/**DOC:
		{
			title :`createGeometryInfo`,
			code : 'FUNCTION',
			description : `지오메트리정보 생성 단축 매서드`
		}
		:DOC*/
		createGeometryInfo: function (key, verticesBuffer, indicesBuffer, texcoordBuffer, normalBuffer) {
			//TODO: texcoordBuffer, normalBuffer 이없으면 자동생성할수있게!
			return new RedGeometryInfo(this, key, verticesBuffer, indicesBuffer, texcoordBuffer, normalBuffer)
		},
		/**DOC:
		{
			title :`getGeometryInfo`,
			code : 'FUNCTION',
			description : `지오메트리정보 조회 매서드.`,
			parmas : {
				key :[
					{type:'String'},
					'키로 등록된 지오메트리정보를 조회함'
				]
			}
		}
		:DOC*/
		getGeometryInfo: function (key) {
			return this['__datas']['RedGeometryInfo'][key]
		},
		/**DOC:
		{
			title :`createMaterialDefine`,
			code : 'FUNCTION',
			description : `재질정의정보 생성 단축 매서드`
		}
		:DOC*/
		createMaterialDefine: function (programInfo) {
			return new RedMaterialDefine(this, programInfo)
		},
		/**DOC:
		{
			title :`createMaterialInfo`,
			code : 'FUNCTION',
			description : `재질정보 생성 단축 매서드`
		}
		:DOC*/
		createMaterialInfo: function (typeName, diffuseInfo, normalInfo, displacementInfo, specularInfo, reflectionTexture, refractionTexture) {
			return new RedMaterialInfo(this, typeName, diffuseInfo, normalInfo, displacementInfo, specularInfo, reflectionTexture, refractionTexture)
		},
		/**DOC:
		{
			title :`createTextureInfo`,
			code : 'FUNCTION',
			description : `텍스쳐정보 생성 단축 매서드`
		}
		:DOC*/
		createTextureInfo: function (src, targetIndex, internalFormat, format, type, callback) {
			return new RedTextureInfo(this, src, targetIndex, internalFormat, format, type, callback)
		},
		/**DOC:
		{
			title :`createCubeTextureInfo`,
			code : 'FUNCTION',
			description : `큐브 텍스쳐정보 생성 단축 매서드`
		}
		:DOC*/
		createCubeTextureInfo: function (srcList) {
			return new RedCubeTextureInfo(this, srcList)
		},

		/**DOC:
		{
			title :`createMeshInfo`,
			code : 'FUNCTION',
			description : `매시정보 단축 생성 매서드`
		}
		:DOC*/
		createMeshInfo: function (key, geometry, material) {
			return new RedMeshInfo(this, key, geometry, material)
		},
		/**DOC:
		{
			title :`getMeshInfo`,
			code : 'FUNCTION',
			description : `매시정보 조회 단축 매서드`,
			parmas : {
				key :[
					{type:'String'},
					'키로 등록된 매쉬를 조회함'
				]
			}
		}
		:DOC*/
		getMeshInfo: function (key) {
			return this['__datas']['RedMeshInfo'][key]
		},
		/**DOC:
		{
			title :`createSceneInfo`,
			code : 'FUNCTION',
			description : `씬정보 단축 생성 매서드`
		}
		:DOC*/
		createSceneInfo: function (key, camera) {
			return new RedSceneInfo(this, key, camera)
		},
		/**DOC:
		{
			title :`createAmbientLight`,
			code : 'FUNCTION',
			description : `암비언트라이트 단축 생성 매서드`
		}
		:DOC*/
		createAmbientLight: function () {
			return new RedAmbientLightInfo(this)
		},
		/**DOC:
		{
			title :`createDirectionalLight`,
			code : 'FUNCTION',
			description : `방향광 단축 생성 매서드`
		}
		:DOC*/
		createDirectionalLight: function () {
			return new RedDirectionalLightInfo(this)
		},
		/**DOC:
		{
			title :`createPointLight`,
			code : 'FUNCTION',
			description : `점광 단축 생성 매서드`
		}
		:DOC*/
		createPointLight: function () {
			return new RedPointLightInfo(this)
		},
		/**DOC:
		{
			title :`createSkyBoxInfo`,
			code : 'FUNCTION',
			description : `스카이박스 단축 생성 매서드`
		}
		:DOC*/
		createSkyBoxInfo: function (srcList) {
			return new RedSkyBoxInfo(this, srcList)
		},
		/**DOC:
		{
			title :`createBaseCameraInfo`,
			code : 'FUNCTION',
			description : `베이스카메라 단축 생성 매서드`
		}
		:DOC*/
		createBaseCameraInfo: function (key) {
			return new RedBaseCameraInfo(this, key)
		},
		/**DOC:
		{
			title :`getBaseCameraInfo`,
			code : 'FUNCTION',
			description : `베이스 카메라정보 조회 단축 매서드`,
			parmas : {
				key :[
					{type:'String'},
					'키로 등록된 베이스 카메라를 조회함'
				]
			}
		}
		:DOC*/
		getBaseCameraInfo: function (key) {
			return this['__datas']['RedBaseCameraInfo'][key]
		},
		/**DOC:
		{
			title :`createBaseRenderInfo`,
			code : 'FUNCTION',
			description : `렌더러 단축 생성 매서드`
		}
		:DOC*/
		createBaseRenderInfo: function (redScene, callback) {
			return new RedBaseRenderInfo(this, redScene, callback)
		}
	}
})();