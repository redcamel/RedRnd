
var gl;
function initGL(canvas) {
	try {
		gl = canvas.getContext("webgl", {
			premultipliedAlpha: false,
			alpha: false

		});
		gl.cvs = canvas
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry :-(");
	}
}

var colorProgram, bitmapProgram;
var pMatrix

var cubeBufferInfo;
var squareBufferInfo;
var renderList
function initBuffers() {
	var cubeVertex = helper.createArrayBuffer(
		gl,
		'aVertexPosition',
		new Float32Array(
			model['vertexs']
		),
		// pointSize, pointNum, type, normalize, stride, offset
		3, model['vertexs'].length / 3, gl.FLOAT, false, 0, 0
	)
	var cubeIndex = helper.createIndexBuffer(
		gl,
		new Uint16Array(
			model['indices']
		),
		// pointSize, pointNum, type, normalize, stride, offset
		1, model['indices'].length, gl.UNSIGNED_SHORT, false, 0, 0
	)
	cubeBufferInfo = helper.createBufferInfo(
		gl,
		helper.createArrayBuffer(
			gl,
			'aVertexPosition',
			new Float32Array(
				model2['vertexs']
			),
			// pointSize, pointNum, type, normalize, stride, offset
			3, model2['vertexs'].length / 3, gl.FLOAT, false, 0, 0
		),
		helper.createIndexBuffer(
			gl,
			new Uint16Array(
				model2['indices']
			),
			// pointSize, pointNum, type, normalize, stride, offset
			1, model2['indices'].length, gl.UNSIGNED_SHORT, false, 0, 0
		)

	)



	squareBufferInfo = helper.createBufferInfo(
		gl,
		cubeVertex,
		cubeIndex,
		helper.createArrayBuffer(
			gl,
			'aTexcoord',
			new Float32Array(
				model['texcoord']
			),
			// pointSize, pointNum, type, normalize, stride, offset
			2, model['texcoord'].length / 2, gl.FLOAT, false, 0, 0
		)
	)
	console.log(model)
}

var prevTime = performance.now()
var drawScene
drawScene = (function () {
	var aspect, i
	return function (time) {

		// gl.cvs.width = 1024 + Math.sin(time/1000)*100
		aspect = gl.cvs.clientWidth / gl.cvs.clientHeight;
		mat4.perspective(pMatrix, 45, aspect, 0.1, 1000.0);

		i = renderList.length
		while (i--) {
			renderList[i].position[0] = SIN(i + time / 5000 + renderList[i].rotation[0]) * 30 + COS(i + time / 2000) * 10
			renderList[i].position[1] = COS(i + time / 3000 + renderList[i].rotation[1]) * 30 + COS(i + time / 3000) * 5
			renderList[i].position[2] = SIN(i + time / 1000 + renderList[i].rotation[2]) * 10 - 55
			renderList[i].rotation[0] += 0.005
			renderList[i].rotation[1] += 0.005
			renderList[i].rotation[2] += 0.005
		}
		// if (time - prevTime < 16) return console.log('걸려따')
		prevTime = time
		helper.drawObjectList(gl, renderList, time)

	}
})()


function webGLStart() {
	initGL(document.getElementById("lesson01-canvas"));
	colorProgram = helper.createProgramInfo(gl, 'color', 'shader-vs', 'shader-fs')
	bitmapProgram = helper.createProgramInfo(gl, 'bitmap', 'shader-vs-bitmap', 'shader-fs-bitmap')

	pMatrix = mat4.create();
	initBuffers();
	var texture = helper.createTexture(gl, atlasList[0].canvas)
	// var texture1 = helper.createTexture(gl, 'asset/draft1.png')
	var texture2 = helper.createTexture(gl, 'test.png')
	var texture3 = helper.createTexture(gl, 'crate.png')
	var Mesh;
	var typeMAP;
	typeMAP = {
		f: {
			16: 'uniformMatrix4fv',
			12: 'uniformMatrix3fv',
			8: 'uniformMatrix2fv',
			4: 'uniform4fv',
			3: 'uniform3fv',
			2: 'uniform2fv',
			1: 'uniform1f'
		},
		i: {
			16: 'uniformMatrix4iv',
			12: 'uniformMatrix3iv',
			8: 'uniformMatrix2iv',
			4: 'uniform4iv',
			3: 'uniform3iv',
			2: 'uniform2iv',
			1: 'uniform1iv'
		}
	}
	Mesh = function (programInfo, bufferInfos, uniformsInfos) {
		this.mvMatrix = mat4.create();
		this.material = {
			programInfo: programInfo
		}
		this.bufferInfos = bufferInfos
		////

		////		
		this.uniforms = {
			uPMatrix: pMatrix,
			uMVMatrix: this.mvMatrix
		}
		this.uniformsList = []
		if (programInfo == bitmapProgram) {
			this.uniforms.uTexture = texture//Math.random() > 0.5 ? texture : (Math.random() > 0.5 ? texture2 : texture3)
			// this.uniforms.uTexture = Math.random() > 0.5 ? texture1 : (Math.random() > 0.5 ? texture2 : texture3)
			// (2) [0.125, 0]
			// (2) [0.25, 0]
			// (2) [0.25, 0.125]
			// (2) [0.125, 0.125]
			var t0 = Math.random() > 0.9 ? atlasList[0].uv()['crate']
				: Math.random() > 0.8 ? atlasList[0].uv()['draft1']
					: Math.random() > 0.7 ? atlasList[0].uv()['draft2']
						: Math.random() > 0.5 ? atlasList[0].uv()['draft4']
							: atlasList[0].uv()['test']
			this.uniforms.uAtlascoord = new Float32Array([
				t0[0][0],
				t0[0][1],
				(t0[1][0] - t0[0][0]) / 2,
				(t0[2][1] - t0[0][1]) / 2
			])
			// console.log(new Float32Array([
			// 	t0[0][0],
			// 	t0[0][1],
			// 	(t0[1][0]-t0[0][0])/2,
			// 	(t0[2][1]-t0[0][1])/2
			// ]))
		}
		else this.uniforms.uColor = new Float32Array([Math.random(), Math.random(), Math.random()])

		// 유니폼값의 gl매서드를 미리 구하고
		for (var k in this.uniforms) {
			var tKey = this.uniforms[k]
			if (tKey instanceof Float32Array || tKey instanceof Float64Array || tKey instanceof Array) {
				tKey['_uniformMethod'] = typeMAP['f'][tKey.length]
			} else if (
				tKey instanceof Uint8Array ||
				tKey instanceof Uint16Array ||
				tKey instanceof Uint32Array ||
				tKey instanceof Int8Array ||
				tKey instanceof Int16Array ||
				tKey instanceof Int32Array
			) {
				tKey['_uniformMethod'] = typeMAP['i'][tKey.length]
			} else if (tKey instanceof WebGLTexture) {
			} else throw '안되는 나쁜 타입인거야!!'
			// 키,갑, 매서드타입이 매트릭스인지 아닌지파악
			this.uniformsList.push([k, tKey, (tKey['_uniformMethod'] && tKey['_uniformMethod'].length > 11) ? 1 : 0])
		}


		//TODO: uniformsInfo가 있으면 또 밀어넣어야함
		this.position = new Float32Array([Math.random(), Math.random(), Math.random()])
		this.rotation = new Float32Array([Math.random(), Math.random(), Math.random()])
		this.scale = new Float32Array(programInfo == bitmapProgram ? [0.1, 0.1, 0.1] : [0.5, 0.5, 0.5])
		this.drawMode = gl.TRIANGLES
	}
	renderList = [

	]
	var i = 4000
	while (i--) {
		renderList.push(new Mesh(i % 2 ? bitmapProgram : colorProgram, i % 2 ? squareBufferInfo : cubeBufferInfo))
	}
	// renderList.sort(function(a,b){
	// 	if(a['programInfo']['name'] > b['programInfo']['name']) return -1
	// 	if(a['programInfo']['name'] < b['programInfo']['name']) return 1
	// 	return 0
	// })

	console.log(renderList)


	///
	gl.clearColor(1, 1, 1, 1);
	gl.clear(gl.COLOR_BUFFER_BIT);
	// Turn off rendering to alpha
	// gl.colorMask(true, true, true, false);
	// gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LESS)
	//	
	gl.enable(gl.CULL_FACE);
	gl.cullFace(gl.BACK)
	//
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	gl.enable(gl.BLEND);

	Recard.WIN_RESIZER.add('test', function (e) {
		Recard.Dom('#lesson01-canvas').S(
			'@width', Recard.WIN.w * window.devicePixelRatio,
			'@height', Recard.WIN.h * window.devicePixelRatio,
			'width', '100%',
			'height', '100%'
		)
		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
		gl.enable(gl.SCISSOR_TEST);
		// set the scissor rectangle
		gl.scissor(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

	})
	Recard.EVENT_EMITTER.fire(window, 'resize', {})
	Recard.LOOPER.add('RENDER', drawScene)
}

Recard.AjaxLoader(function (v) {
	model = JSON.parse(v[0]['content'])
	model2 = JSON.parse(v[1]['content'])
	setTimeout(function () {
		webGLStart()
	}, 2000)
}, {
		url: 'test.js',
		method: 'GET'
	}, {
		url: 'test2.js',
		method: 'GET'
	}).start()
Recard.Css('body').S(
	'margin', 0,
	'padding', 0,
	'overflow', 'hidden'
)

var atlas
var atlasList
var createAtlas = function (img) {
	var t0;
	if (img && (img.width > 2048 || img.height > 2048)) throw '이미지가 너무커!'
	t0 = Recard.Dom('canvas').S('@width', 2048, '@height', 2048, 'background', 'red', 'margin', 5).__dom__
	// document.body.appendChild(t0)
	atlas = new Atlas(t0);
	atlasList.push(atlas)
	console.log('생성!')
	// atlas.tilepad = true;
}
atlasList = []
createAtlas()
function atlasPack(img) {
	atlas = atlasList[atlasList.length - 1]
	var node = atlas.pack(img);
	if (node === false) {
		// 아틀라스를 전체를 돌면서 찾아야하고..
		// TODO: 공간없는놈은 어떻게 찾지?
		i = atlasList.length
		while (i--) {
			// 기존있는놈중에 들어가면 종료시키고
			var node = atlas.pack(img);
			if (node) return
		}
		// 여기까지 흘러들어오면 아틀라스캔버스 자체를 추가한다.
		if (node === false) {
			createAtlas(img)
			atlas.pack(img)
		}
	}

}
var texturePath = 'asset/';
[
	'crate', 'test',
	'draft1', 'draft2', 'draft3', 'draft4', 'draft5'
].forEach(function (name) {
	var img = new Image();
	img.id = name;
	img.src = texturePath + name + '.png';
	img.onload = function () {
		atlasPack(img);
	};
});