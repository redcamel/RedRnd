"use strict";
var testGL
testGL = RedGL(document.getElementById('test'), true)

var testData, testData2, testData3
testData = new Float32Array([

	-1.0, -1.0, 1.0,
	1.0, -1.0, 1.0,
	1.0, 1.0, 1.0,
	-1.0, 1.0, 1.0,


	-1.0, -1.0, -1.0,
	-1.0, 1.0, -1.0,
	1.0, 1.0, -1.0,
	1.0, -1.0, -1.0,


	-1.0, 1.0, -1.0,
	-1.0, 1.0, 1.0,
	1.0, 1.0, 1.0,
	1.0, 1.0, -1.0,


	-1.0, -1.0, -1.0,
	1.0, -1.0, -1.0,
	1.0, -1.0, 1.0,
	-1.0, -1.0, 1.0,


	1.0, -1.0, -1.0,
	1.0, 1.0, -1.0,
	1.0, 1.0, 1.0,
	1.0, -1.0, 1.0,


	-1.0, -1.0, -1.0,
	-1.0, -1.0, 1.0,
	-1.0, 1.0, 1.0,
	-1.0, 1.0, -1.0
])
testData2 = new Uint16Array([
	0, 1, 2, 0, 2, 3,
	4, 5, 6, 4, 6, 7,
	8, 9, 10, 8, 10, 11,
	12, 13, 14, 12, 14, 15,
	16, 17, 18, 16, 18, 19,
	20, 21, 22, 20, 22, 23
])
testData3 = new Float32Array([
	0.0, 0.0,
	1.0, 0.0,
	1.0, 1.0,
	0.0, 1.0,

	1.0, 0.0,
	1.0, 1.0,
	0.0, 1.0,
	0.0, 0.0,

	0.0, 1.0,
	0.0, 0.0,
	1.0, 0.0,
	1.0, 1.0,

	1.0, 1.0,
	0.0, 1.0,
	0.0, 0.0,
	1.0, 0.0,

	1.0, 0.0,
	1.0, 1.0,
	0.0, 1.0,
	0.0, 0.0,

	0.0, 0.0,
	1.0, 0.0,
	1.0, 1.0,
	0.0, 1.0
])

//  버텍스버퍼생성
console.log(testGL.createArrayBufferInfo(
	'testBuffer',
	'aVertexPosition',
	testData,
	3, 24, testGL.gl.FLOAT
))
console.log(testGL.createArrayBufferInfo(
	'testUv',
	'aTexcoord',
	testData3,
	2, testData3.length / 2, testGL.gl.FLOAT
))
// 인덱스 버퍼생성
console.log(testGL.createIndexBufferInfo(
	'testIndexBuffer',
	testData2,
	1, testData2.length, testGL.gl.UNSIGNED_SHORT
))
// 쉐이더생성
console.log(testGL.createShaderInfo('color', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs')))
console.log(testGL.createShaderInfo('color', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs')))
console.log(testGL.createShaderInfo('bitmap', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs-bitmap')))
console.log(testGL.createShaderInfo('bitmap', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs-bitmap')))
// 프로그램생성
testGL.createProgramInfo(
	'color',
	testGL.createShaderInfo('color', RedShaderInfo.VERTEX_SHADER),
	testGL.createShaderInfo('color', RedShaderInfo.FRAGMENT_SHADER),
	function (target) {
		target.uniforms.uColor = new Float32Array([Math.random(), Math.random(), Math.random()])
	}
)
testGL.createProgramInfo(
	'bitmap',
	testGL.createShaderInfo('bitmap', RedShaderInfo.VERTEX_SHADER),
	testGL.createShaderInfo('bitmap', RedShaderInfo.FRAGMENT_SHADER),
	function (target) {
		target.uniforms.uTexture = target['diffuseInfo']
		target.uniforms.uAtlascoord = new Float32Array([0,0,1,1])
	}
)
// 지오메트리생성
console.log(testGL.createGeometryInfo(
	'testGeo',
	testGL.getArrayBufferInfo('testBuffer'),
	testGL.getIndexBufferInfo('testIndexBuffer')
	,testGL.getArrayBufferInfo('testUv')
))
// 프로그램조회
console.log(testGL.getProgramInfo('color'))
console.log(testGL.getProgramInfo('bitmap'))
// 재질정의
var testMatDefine = RedMaterialDefine(testGL, testGL.getProgramInfo('color'))
RedMaterialDefine(testGL, testGL.getProgramInfo('bitmap'))
// 재질생성
var testColorMat = RedMaterialInfo(testGL, 'color')
var testTexture = RedTextureInfo(testGL, 'asset/crate.png')
var testTexture2 = RedTextureInfo(testGL, 'asset/test.png')
console.log(testTexture)
var testMatBitmap = RedMaterialInfo(testGL, 'bitmap', testTexture)
var testMatBitmap2 = RedMaterialInfo(testGL, 'bitmap', testTexture2)

console.log(testColorMat)
console.log(testMatBitmap)
console.log(testMatDefine)
// 메쉬 생성 테스트
console.log(testGL.createMeshInfo('testMesh', testGL.getGeometryInfo('testGeo'), testColorMat))
// Scene 생성
var testScene = RedSceneInfo(testGL, 'testScene')
console.log(testScene)
// 아틀라스테스트
var testAtlas;
testAtlas = RedAtlasTextureManager(testGL, [
	'asset/crate.png',
	'asset/draft1.png',
	'asset/draft2.png',
	'asset/draft3.png',
	'asset/draft4.png',
	'asset/draft5.png',
	'asset/test.png',
],function(){
	var testMatBitmap3 = RedMaterialInfo(testGL, 'bitmap', testAtlas['atlasKeyMap']['atlasImage_asset/test.png'])
	var testMatBitmap4 = RedMaterialInfo(testGL, 'bitmap', testAtlas['atlasKeyMap']['atlasImage_asset/draft1.png'])
	var testMatBitmap5 = RedMaterialInfo(testGL, 'bitmap', testAtlas['atlasKeyMap']['atlasImage_asset/draft2.png'])
	var testMatBitmap6 = RedMaterialInfo(testGL, 'bitmap', testAtlas['atlasKeyMap']['atlasImage_asset/draft3.png'])
	var testMatBitmap7 = RedMaterialInfo(testGL, 'bitmap', testAtlas['atlasKeyMap']['atlasImage_asset/draft4.png'])
	var testMatBitmap8 = RedMaterialInfo(testGL, 'bitmap', testAtlas['atlasKeyMap']['atlasImage_asset/draft5.png'])
	///////////////////////////////////////////////////////////////////////////////////////////
	// 데모
	var i = 90, i2, i3;
	while (i--) {
		var tMesh = testGL.createMeshInfo('testMesh' + i, testGL.getGeometryInfo('testGeo'), Math.random()>0.5 ? testMatBitmap : testMatBitmap5)
		tMesh.position[0] = Math.random() * 80 - 40
		tMesh.position[1] = Math.random() * 80 - 40
		tMesh.position[2] = -55 - Math.random() * 30
		tMesh.rotation[0] = Math.random() * Math.PI * 2
		tMesh.rotation[1] = Math.random() * Math.PI * 2
		tMesh.rotation[2] = Math.random() * Math.PI * 2
		i2 = 6
		var tt =Math.random()>0.5 ? testMatBitmap5 : testMatBitmap6
		while (i2--) {
			var tSub = testGL.createMeshInfo('testMesh_' + i + '_' + i2, testGL.getGeometryInfo('testGeo'), tt)
			tSub.position[0] = Math.random() * 20 - 10
			tSub.position[1] = Math.random() * 20 - 10
			tSub.position[2] = Math.random() * 20 - 10
			var tScale = Math.random() + 0.1
			tSub.scale[0] = tScale
			tSub.scale[1] = tScale
			tSub.scale[2] = tScale
			tMesh.children.push(tSub)
			i3 = 5
			var tt =Math.random()>0.5 ? testMatBitmap7 : testMatBitmap8
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
				tMesh2.rotation[0] += 0.01
				tMesh2.rotation[1] += 0.01
				tMesh2.rotation[2] += 0.01
				i3 = tMesh2.children.length
				while (i3--) {
					tMesh3 = tMesh2.children[i3]

					tMesh3.rotation[0] += 0.01
					tMesh3.rotation[1] += 0.01
					tMesh3.rotation[2] += 0.01
				}
			}
		}
		checkCall.innerHTML = 'numDrawCall : ' + renderer.numDrawCall
	})
	renderer.start()
})

