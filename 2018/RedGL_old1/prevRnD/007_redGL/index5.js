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
normalData = new Float32Array([
	0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
	1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
	0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
	1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
	1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
	0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0
])
uvData = new Float32Array([
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
console.log(testGL.createArrayBufferInfo('testBuffer', RedFixedAttributeKey['aVertexPosition'], vertexData, 3, vertexData.length / 3, testGL.gl.FLOAT))
console.log(testGL.createArrayBufferInfo('testNormalBuffer', RedFixedAttributeKey['aVertexNormal'], uvData, 3, uvData.length / 3, testGL.gl.FLOAT))
console.log(testGL.createArrayBufferInfo('testUv', RedFixedAttributeKey['aTexcoord'], normalData, 2, normalData.length / 2, testGL.gl.FLOAT))
console.log(testGL.createIndexBufferInfo('testIndexBuffer', indexData, 1, indexData.length, testGL.gl.UNSIGNED_SHORT))
// 쉐이더생성
console.log(testGL.createShaderInfo('bitmapLite', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs-bitmap-light')))
console.log(testGL.createShaderInfo('bitmapLite', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs-bitmap-light')))
console.log(testGL.createShaderInfo('skybox', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs-skybox')))
console.log(testGL.createShaderInfo('skybox', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs-skybox')))
// 프로그램생성
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
// 지오메트리 생성
testGL.createGeometryInfo(
	'testGeo',
	testGL.getArrayBufferInfo('testBuffer'),
	testGL.getIndexBufferInfo('testIndexBuffer'),
	testGL.getArrayBufferInfo('testUv'),
	testGL.getArrayBufferInfo('testNormalBuffer')
)
// 재질 정의
testGL.createMaterialDefine(testGL.getProgramInfo('bitmapLite'))
testGL.createMaterialDefine(testGL.getProgramInfo('skybox'))
// 텍스쳐생성
var testTexture = testGL.createTextureInfo('asset/grid.png')
// 재질 생성
var testMatBitmap = testGL.createMaterialInfo('bitmapLite', testTexture)
// 카메라생성
var testCamera = RedBaseCamera(testGL, 'testCamera')
// Scene 생성
var testScene = testGL.createSceneInfo('testScene', testCamera)
console.log(testScene)
// 아틀라스테스트

///////////////////////////////////////////////////////////////////////////////////////////
// 데모
var tMesh
var i = 10
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
console.log(testSkyBox)
while (i--) {
	// tMesh= testGL.createMeshInfo('testMesh'+i, testGL.getGeometryInfo('testGeo'), testGL.createMaterialInfo('bitmapLite', testTexture))
	tMesh = testGL.createMeshInfo(
		'testMesh' + i,
		i % 3 ? RedPrimitive.plane(testGL, 5, 5, 3, 3) : i % 2 ? RedPrimitive.cube(testGL, 3, 3, 3) : RedPrimitive.sphere(testGL, 3, 16, 16),
		testGL.createMaterialInfo('bitmapLite', testTexture)
	)
	tMesh.position[0] = Math.random() * 60 - 30
	tMesh.position[1] = Math.random() * 60 - 30
	tMesh.position[2] = Math.random() * 60 - 30
	tMesh.rotation[0] = Math.PI * 2 * Math.random()
	tMesh.rotation[1] = Math.PI * 2 * Math.random()
	tMesh.rotation[2] = Math.PI * 2 * Math.random()
	tMesh.drawMode = Math.random() > 0.5 ? testGL.gl.LINE_STRIP : testGL.gl.TRIANGLES
	testScene.children.push(tMesh)
	
}
tMesh = testGL.createMeshInfo('testMesh', testGL.getGeometryInfo('testGeo'), testGL.createMaterialInfo('bitmapLite', testTexture))
tMesh.position[2] = 0
testScene.children.push(tMesh)

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
testCamera.lookAt(tMesh.position)
var renderer = RedRender(testGL, testScene, function (time) {
	testCamera.setPosition(Math.sin(time / 1000) * 60, Math.cos(time / 1000) * 60, Math.sin(time / 1000) * 60 + Math.cos(time / 1000) * 60)
	testCamera.lookAt(tMesh.position)

	checkCall.innerHTML = 'numDrawCall : ' + renderer.numDrawCall
})
renderer.start()