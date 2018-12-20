"use strict";
var testGL
testGL = RedGL(document.getElementById('test'), true)
var vertexData, indexData, normalData, uvData
vertexData = new Float32Array([
	-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
	-1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
	-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
	-1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
	1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
	-1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0
])
indexData = new Uint16Array([
	0, 1, 2, 0, 2, 3,
	4, 5, 6, 4, 6, 7,
	8, 9, 10, 8, 10, 11,
	12, 13, 14, 12, 14, 15,
	16, 17, 18, 16, 18, 19,
	20, 21, 22, 20, 22, 23
])
uvData = new Float32Array([
	0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
	1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
	0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
	1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
	1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
	0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0
])
normalData = new Float32Array([
	// Front face
	0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
	// Back face
	0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
	// Top face
	0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
	// Bottom face
	0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
	// Right face
	1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	// Left face
	-1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0
])
// 버텍스버퍼생성
console.log(testGL.createArrayBufferInfo('testBuffer', RedFixedAttributeKey['aVertexPosition'], vertexData, 3, vertexData.length / 3, testGL.gl.FLOAT))
// 노말버퍼생성
console.log(testGL.createArrayBufferInfo('testNormalBuffer', RedFixedAttributeKey['aVertexNormal'], normalData, 3, normalData.length / 3, testGL.gl.FLOAT))
// UV버퍼생성
console.log(testGL.createArrayBufferInfo('testUv', RedFixedAttributeKey['aTexcoord'], uvData, 2, uvData.length / 2, testGL.gl.FLOAT))
// 인덱스 버퍼생성
console.log(testGL.createIndexBufferInfo('testIndexBuffer', indexData, 1, indexData.length, testGL.gl.UNSIGNED_SHORT))
// 쉐이더생성
console.log(testGL.createShaderInfo('color', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs')))
console.log(testGL.createShaderInfo('color', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs')))
console.log(testGL.createShaderInfo('bitmap', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs-bitmap')))
console.log(testGL.createShaderInfo('bitmap', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs-bitmap')))
console.log(testGL.createShaderInfo('bitmapLite', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs-bitmap-light')))
console.log(testGL.createShaderInfo('bitmapLite', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs-bitmap-light')))

console.log(testGL.createShaderInfo('skybox', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs-skybox')))
console.log(testGL.createShaderInfo('skybox', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs-skybox')))
// 프로그램생성
testGL.createProgramInfo(
	'color',
	testGL.getShaderInfo('color', RedShaderInfo.VERTEX_SHADER),
	testGL.getShaderInfo('color', RedShaderInfo.FRAGMENT_SHADER),
	function (target) {
		target.uniforms.uColor = new Float32Array([Math.random(), Math.random(), Math.random()])
	}
)
testGL.createProgramInfo(
	'bitmap',
	testGL.getShaderInfo('bitmap', RedShaderInfo.VERTEX_SHADER),
	testGL.getShaderInfo('bitmap', RedShaderInfo.FRAGMENT_SHADER),
	function (target) {
		target.uniforms.uTexture = target['diffuseInfo']
		target.uniforms.uAtlascoord = RedAtlasUVInfo([0, 0, 1, 1])
	}
)
testGL.createProgramInfo(
	'bitmapLite',
	testGL.getShaderInfo('bitmapLite', RedShaderInfo.VERTEX_SHADER),
	testGL.getShaderInfo('bitmapLite', RedShaderInfo.FRAGMENT_SHADER),
	function (target) {
		target.uniforms.uTexture = target['diffuseInfo']
		target.uniforms.uAtlascoord = RedAtlasUVInfo([0, 0, 1, 1])
	}
)

testGL.createProgramInfo(
	'skybox',
	testGL.getShaderInfo('skybox', RedShaderInfo.VERTEX_SHADER),
	testGL.getShaderInfo('skybox', RedShaderInfo.FRAGMENT_SHADER),
	function (target) {
		target.uniforms.uSkybox = target['diffuseInfo']
		
	}
)
// 프로그램조회
console.log(testGL.getProgramInfo('color'))
console.log(testGL.getProgramInfo('bitmap'))
// 지오메트리생성
console.log(testGL.createGeometryInfo(
	'testGeo',
	testGL.getArrayBufferInfo('testBuffer'),
	testGL.getIndexBufferInfo('testIndexBuffer'),
	testGL.getArrayBufferInfo('testUv'),
	testGL.getArrayBufferInfo('testNormalBuffer')
))
// 재질정의
var testMatDefine = testGL.createMaterialDefine(testGL.getProgramInfo('color'))
testGL.createMaterialDefine(testGL.getProgramInfo('bitmap'))
testGL.createMaterialDefine(testGL.getProgramInfo('bitmapLite'))
testGL.createMaterialDefine(testGL.getProgramInfo('skybox'))
console.log(testMatDefine)
// 재질생성 
var testColorMat = testGL.createMaterialInfo('color')
// 텍스쳐생성! //TODO: testGL.createTextureInfo/getTextureInfo를 만들어야겠군...
var testTexture = testGL.createTextureInfo('asset/crate.png')
var testTexture2 = testGL.createTextureInfo('asset/test.png')
console.log(testTexture)
var testMatBitmap = testGL.createMaterialInfo('bitmapLite', testTexture)
var testMatBitmap2 = testGL.createMaterialInfo('bitmapLite', testTexture2)
console.log(testColorMat)
console.log(testMatBitmap)
// 메쉬 생성 테스트
console.log(testGL.createMeshInfo('testMesh', testGL.getGeometryInfo('testGeo'), testColorMat))
// 카메라생성
var testCamera = RedBaseCamera(testGL,'testCamera')
// Scene 생성
var testScene = testGL.createSceneInfo('testScene',testCamera)
console.log(testScene)

var testSkyBox
testSkyBox = RedSkyBoxInfo(testGL,[
	'asset/cubemap/posx.jpg',
	'asset/cubemap/negx.jpg',
	'asset/cubemap/posy.jpg',
	'asset/cubemap/negy.jpg',
	'asset/cubemap/posz.jpg',
	'asset/cubemap/negz.jpg'
])
testScene.setSkyBox(testSkyBox)
var grid = testGL.createMeshInfo('grid1', RedPrimitive.grid(testGL), testColorMat)
grid.drawMode = testGL.gl.LINES
console.log(grid)
testScene.setGrid(grid)

/////
// 아틀라스테스트
RedAtlasTextureManager(testGL, [
	'asset/draft1.png',
	'asset/draft2.png',
	'asset/draft3.png',
	'asset/draft4.png',
	'asset/draft5.png',
	'asset/test.png',
], function () {
	var testMatBitmap3 = testGL.createMaterialInfo('bitmapLite', RedAtlasTextureManager.getByKey('asset/test.png'))
	var testMatBitmap4 = testGL.createMaterialInfo('bitmapLite', RedAtlasTextureManager.getByKey('asset/draft1.png'))
	var testMatBitmap5 = testGL.createMaterialInfo('bitmapLite', RedAtlasTextureManager.getByKey('asset/draft2.png'))
	var testMatBitmap6 = testGL.createMaterialInfo('bitmapLite', RedAtlasTextureManager.getByKey('asset/draft3.png'))
	var testMatBitmap7 = testGL.createMaterialInfo('bitmapLite', RedAtlasTextureManager.getByKey('asset/draft4.png'))
	var testMatBitmap8 = testGL.createMaterialInfo('bitmapLite', RedAtlasTextureManager.getByKey('asset/draft5.png'))
	setTimeout(function () {
		var testAtlas2 = RedAtlasTextureManager(testGL, 'asset/addTest.png', function () {
			console.log('아틀라스 추가!되었음!')
			var i = 90, i2, i3;
			testScene.children.reverse()
			while (i--) {
				var testMatBitmap9 = testGL.createMaterialInfo('bitmapLite', RedAtlasTextureManager.getByKey('asset/addTest.png'))
				var tMesh = testGL.createMeshInfo('testMeshAdd' + i, testGL.getGeometryInfo('testGeo'), testMatBitmap9)
				tMesh.position[0] = Math.random() * 80 - 40
				tMesh.position[1] = Math.random() * 80 - 40
				tMesh.position[2] = Math.random() * 80 - 40
				tMesh.rotation[0] = Math.random() * Math.PI * 2
				tMesh.rotation[1] = Math.random() * Math.PI * 2
				tMesh.rotation[2] = Math.random() * Math.PI * 2
				tMesh.scale[0] = 3
				tMesh.scale[1] = 3
				tMesh.scale[2] = 3
				testScene.children.push(tMesh)
			}
			testScene.children.reverse()
		})
	}, 3000)
	///////////////////////////////////////////////////////////////////////////////////////////
	// 데모
	var i = 80, i2, i3;
	while (i--) {
		var tMesh = testGL.createMeshInfo('testMesh' + i, testGL.getGeometryInfo('testGeo'), Math.random() > 0.5 ? testMatBitmap : testMatBitmap5)
		tMesh.position[0] = Math.random() * 80 - 40
		tMesh.position[1] = Math.random() * 80 - 40
		tMesh.position[2] = Math.random() * 80 - 40
		tMesh.rotation[0] = Math.random() * Math.PI * 2
		tMesh.rotation[1] = Math.random() * Math.PI * 2
		tMesh.rotation[2] = Math.random() * Math.PI * 2
		tMesh.drawMode = testGL.gl.LINE_STRIP
		i2 = 6
		var tt = Math.random() > 0.5 ? testMatBitmap5 : testMatBitmap6
		while (i2--) {
			var tSub = testGL.createMeshInfo('testMesh_' + i + '_' + i2, testGL.getGeometryInfo('testGeo'), tt)
			tSub.position[0] = Math.random() * 80 - 40
			tSub.position[1] = Math.random() * 80 - 40
			tSub.position[2] = Math.random() * 80 - 40
			var tScale = Math.random() + 0.1
			tSub.scale[0] = tScale
			tSub.scale[1] = tScale
			tSub.scale[2] = tScale
			tSub.blendFactor2= Math.random()>0.5 ? testGL.gl.ONE_MINUS_SRC_ALPHA : testGL.gl.ONE
			tMesh.children.push(tSub)
			i3 = 5
			var tt = Math.random() > 0.5 ? testMatBitmap7 : testMatBitmap8
			while (i3--) {
				var tSub2 = testGL.createMeshInfo('testMesh_' + i + '_' + i2 + '_' + i3, testGL.getGeometryInfo('testGeo'), tt)
				tSub2.position[0] = Math.random() * 20 - 10
				tSub2.position[1] = Math.random() * 20 - 10
				tSub2.position[2] = Math.random() * 20 - 10
				var tScale = Math.random() + 0.1
				tSub2.scale[0] = tScale
				tSub2.scale[1] = tScale
				tSub2.scale[2] = tScale
				tSub.children.push(tSub2)
			}
		}
		testScene.children.push(tMesh)
	}
	var checkCall = document.createElement('div')
	document.body.appendChild(checkCall)
	checkCall.style.position = 'absolute'
	checkCall.style.left = '10px'
	checkCall.style.top = '10px'
	checkCall.style.color = '#fff'
	var testCaseDoc = document.createElement('a')
	document.body.appendChild(testCaseDoc)
	testCaseDoc.style.position = 'absolute'
	testCaseDoc.style.left = '10px'
	testCaseDoc.style.bottom = '25px'
	testCaseDoc.style.color = '#fff'
	testCaseDoc.style.fontSize = '11px'
	testCaseDoc.href = 'testCase/index.html'
	testCaseDoc.innerHTML = 'RedGL TestCase'
	var doc = document.createElement('a')
	document.body.appendChild(doc)
	doc.style.position = 'absolute'
	doc.style.left = '10px'
	doc.style.bottom = '10px'
	doc.style.color = '#fff'
	doc.style.fontSize = '11px'
	doc.href = 'redDoc/redDoc.html'
	doc.innerHTML = 'RedGL Document'
	var renderer = RedRender(testGL, testScene, function (time) {
		i = testScene.children.length
		var tMesh, tMesh2, tMesh3
		var SIN, COS
		SIN = Math.sin
		COS = Math.cos
		while (i--) {
			tMesh = testScene.children[i]
			tMesh.rotation[0] += 0.01
			tMesh.rotation[1] += 0.01
			tMesh.rotation[2] += 0.01
			i2 = tMesh.children.length
			while (i2--) {
				tMesh2 = tMesh.children[i2]
				tMesh2.rotation[0] += 0.005
				tMesh2.rotation[1] += 0.005
				tMesh2.rotation[2] += 0.005
				i3 = tMesh2.children.length
				while (i3--) {
					tMesh3 = tMesh2.children[i3]

					tMesh3.rotation[0] += 0.01
					tMesh3.rotation[1] += 0.01
					tMesh3.rotation[2] += 0.01
				}
			}
		}
		testCamera.setPosition(Math.sin(time/2500)*120,Math.sin(time/2500)*120,Math.sin(time/2500)*60 + Math.cos(time/2500)*60)
		testCamera.lookAt([0,0,0])
		checkCall.innerHTML = 'numDrawCall : ' + renderer.numDrawCall
	})
	renderer.start()
})

