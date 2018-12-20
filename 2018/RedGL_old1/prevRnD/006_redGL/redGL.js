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
			depth : true,
			failIfMajorPerformanceCaveat :false,
			premultipliedAlpha: false,
			preserveDrawingBuffer : false,
			stencil:false
		}
		checkList = 'experimental-webgl,webgl,webkit-3d,moz-webgl,3d'.split(',')
		return function (cvs) {
			i = checkList.length
			while (i--) {
				if (t0 = cvs.getContext(checkList[i], option)) return t0
			}
			throw "웹지엘을 사용할수없습니다."
		}
	})();
	/**DOC:
		{
			constructorYn : true,
			title :`RedGL`,
			description : `
				- RedGL 인스턴스 생성자
			`,
			params : {
				canvas : [
					{type:'Canvas Element'}
				],
				fullMode : [
					{type:'Boolean'},
					'- 기본값 false',
					'- true일경우 윈도우사이즈가 변할때마다 추적함'
				]
			},
			example : `
				RedGL(document.getElementById('test'))
			`,
			return : 'RedGL Instance'
		}
	:DOC*/
	RedGL = function (canvas, fullMode) {
		if (!(this instanceof RedGL)) return new RedGL(canvas, fullMode)
		var tGL;
		this['__canvas'] = canvas
		this['gl'] = tGL = getGL(canvas)
		fullMode ? this.setSize() : 0 // 풀모드일경우....처음 확장
		this['fullMode'] = fullMode
		this['__UUID'] = REDGL_UUID++
		this['__datas'] = {}
		this['detect'] = redGLDetect(this)
		console.log('RedGL 생성완료')
		// 초기상태정의
		tGL.clearColor(0, 0, 0, 1);
		tGL.clear(tGL.COLOR_BUFFER_BIT);
		// Turn off rendering to alpha
		// tGL.colorMask(true, true, true, false);
		// tGL.clearColor(0.0, 0.0, 0.0, 1.0);

		// set the depthTest
		tGL.enable(tGL.DEPTH_TEST);
		tGL.depthFunc(tGL.LEQUAL)
		// set the cullFace
		tGL.enable(tGL.CULL_FACE);
		tGL.cullFace(tGL.BACK)
		// set the blendMode
		tGL.enable(tGL.BLEND);
		tGL.blendFunc(tGL.SRC_ALPHA, tGL.ONE_MINUS_SRC_ALPHA);
		// set the scissor rectangle
		tGL.enable(tGL.SCISSOR_TEST);
		tGL.scissor(0, 0, tGL.drawingBufferWidth, tGL.drawingBufferHeight);
		// set the viewport rectangle
		tGL.viewport(0, 0, tGL.drawingBufferWidth, tGL.drawingBufferHeight);
		instanceList.push(this)
	}
	window.addEventListener('resize', function () {
		instanceList.forEach(function (v) {
			if (v['fullMode']) v.setSize()
		})
	})
	RedGL.prototype = {
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
		setSize: function (width, height) {
			console.log('실행을했냐!')
			var gl;
			var W, H;
			W = width ? width : (document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth)
			H = height ? height : (document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight)
			gl = this.gl
			W = W 
			H = H 
			this.__canvas.width = W* window.devicePixelRatio
			this.__canvas.height = H* window.devicePixelRatio
			this.__canvas.style.width = W
			this.__canvas.style.height = H
			gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
			// set the scissor rectangle
			gl.enable(gl.SCISSOR_TEST);
			gl.scissor(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
		},
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
				RedShaderInfo.getSourceFromScript(id)
			`,
			return : 'String'
		}
		:DOC*/
		getSourceFromScript: (function () {
			var shaderScript
			var str, k;
			return function (id) {
				shaderScript = document.getElementById(id)
				if (!shaderScript) throw "쉐이더소스가 없음!"
				str = "";
				k = shaderScript.firstChild;
				while (k) {
					if (k.nodeType == 3) str += k.textContent;
					k = k.nextSibling;
				}
				return str
			}
		})(),
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
			description : `- TODO`
		}
		:DOC*/
		createProgramInfo: function (key, vShaderInfo, fShaderInfo, makeUniformValue) {
			return new RedProgramInfo(this, key, vShaderInfo, fShaderInfo, makeUniformValue)
		},
		/**DOC:
		{
			title :`getProgramInfo`,
			code : 'FUNCTION',
			description : `- TODO`
		}
		:DOC*/
		getProgramInfo: function (key) {
			return this['__datas']['RedProgramInfo'][key]
		},
		/**DOC:
		{
			title :`createArrayBufferInfo`,
			code : 'FUNCTION',
			description : `- TODO`
		}
		:DOC*/
		createArrayBufferInfo: function (key, pointer, dataList, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode) {
			return new RedBufferInfo(this, RedBufferInfo.ARRAY_BUFFER, key, pointer, dataList, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode)
		},
		/**DOC:
		{
			title :`createIndexBufferInfo`,
			code : 'FUNCTION',
			description : `- TODO`
		}
		:DOC*/
		createIndexBufferInfo: function (key, dataList, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode) {
			return new RedBufferInfo(this, RedBufferInfo.ELEMENT_ARRAY_BUFFER, key, null, dataList, pointSize, pointNum, arrayType, normalize, stride, offset, drawMode)
		},
		/**DOC:
		{
			title :`getArrayBufferInfo`,
			code : 'FUNCTION',
			description : `- TODO`
		}
		:DOC*/
		getArrayBufferInfo: function (key) {
			return this['__datas']['RedBufferInfo'][key]
		},
		/**DOC:
		{
			title :`getIndexBufferInfo`,
			code : 'FUNCTION',
			description : `- TODO`
		}
		:DOC*/
		getIndexBufferInfo: function (key) {
			return this['__datas']['RedBufferInfo'][key]
		},
		/**DOC:
		{
			title :`createGeometryInfo`,
			code : 'FUNCTION',
			description : `- TODO`
		}
		:DOC*/
		createGeometryInfo: function (key, verticesBuffer, indicesBuffer, texcoordBuffer, normalBuffer) {
			return new RedGeometryInfo(this, key, verticesBuffer, indicesBuffer, texcoordBuffer, normalBuffer)
		},
		/**DOC:
		{
			title :`getGeometryInfo`,
			code : 'FUNCTION',
			description : `- TODO`
		}
		:DOC*/
		getGeometryInfo: function (key) {
			return this['__datas']['RedGeometryInfo'][key]
		},
		/**DOC:
		{
			title :`createMeshInfo`,
			code : 'FUNCTION',
			description : `- TODO`
		}
		:DOC*/
		createMeshInfo: function (key, geometry, material) {
			return new RedMeshInfo(this, key, geometry, material)
		},
		/**DOC:
		{
			title :`getMeshInfo`,
			code : 'FUNCTION',
			description : `- TODO`
		}
		:DOC*/
		getMeshInfo: function (key) {
			return this['__datas']['RedMeshInfo'][key]
		},
		/**DOC:
		{
			title :`createMaterialInfo`,
			code : 'FUNCTION',
			description : `
				- 재질정보생성
			`
		}
		:DOC*/
		createMaterialInfo: function (typeName, diffuseInfo) {
			return new RedMaterialInfo(this, typeName, diffuseInfo)
		}
	}
})();