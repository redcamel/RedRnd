"use strict";
var testGL
testGL = RedGL(document.getElementById('test'), true)
console.log(testGL.createShaderInfo('color', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs')))
console.log(testGL.createShaderInfo('color', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs')))

console.log(testGL.createShaderInfo('bitmapLite', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs-bitmap-light')))
console.log(testGL.createShaderInfo('bitmapLite', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs-bitmap-light')))

console.log(testGL.createShaderInfo('skybox', RedShaderInfo.VERTEX_SHADER, testGL.getSourceFromScript('shader-vs-skybox')))
console.log(testGL.createShaderInfo('skybox', RedShaderInfo.FRAGMENT_SHADER, testGL.getSourceFromScript('shader-fs-skybox')))

testGL.createProgramInfo(
	'color',
	testGL.getShaderInfo('color', RedShaderInfo.VERTEX_SHADER),
	testGL.getShaderInfo('color', RedShaderInfo.FRAGMENT_SHADER),
	function (target) {
		target.uniforms.uColor = new Float32Array([Math.random(), Math.random(), Math.random()])
	}
)
testGL.createProgramInfo(
	'bitmapLite',
	testGL.getShaderInfo('bitmapLite', RedShaderInfo.VERTEX_SHADER),
	testGL.getShaderInfo('bitmapLite', RedShaderInfo.FRAGMENT_SHADER),
	function (target) {
		target.uniforms.uTexture = target['diffuseInfo']
		target.uniforms.uAtlascoord = RedAtlasUVInfo([0, 0, 1, 1])
		target.uniforms.uShininess = new Float32Array([32])
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

testGL.createMaterialDefine(testGL.getProgramInfo('skybox'))
// 카메라생성
var testCamera = RedBaseCamera(testGL, 'testCamera')
// Scene 생성
var testScene = testGL.createSceneInfo('testScene', testCamera)
// 재질정의
testGL.createMaterialDefine(testGL.getProgramInfo('color'))
RedMaterialDefine(testGL, testGL.getProgramInfo('bitmapLite'))

// 재질생성
var testTexture = RedTextureInfo(testGL, 'asset/crate.png')
var testMatBitmap = RedMaterialInfo(testGL, 'bitmapLite', testTexture)

var i = 50
while(i-- ){
	var tMesh = testGL.createMeshInfo('testMeshAdd1'+i, RedPrimitive.sphere(testGL,1,32,32,32), testMatBitmap)
	// var tMesh = testGL.createMeshInfo('testMeshAdd1'+i, RedPrimitive.cube(testGL,1,1,1,32,32,32), testMatBitmap)
	tMesh.position[0] = Math.sin(Math.PI*2 *Math.random())*20
	tMesh.position[1] = Math.sin(Math.PI*2 *Math.random() )*20
	tMesh.position[2] = Math.cos(Math.PI*2 *Math.random() )*20
	testMatBitmap.uniforms.uShininess[0]=Math.random()*64
	testScene.children.push(tMesh)
}



var checkCall = document.createElement('div')
document.body.appendChild(checkCall)
checkCall.style.position = 'absolute'
checkCall.style.left = '10px'
checkCall.style.top = '10px'
checkCall.style.color = '#fff'
var grid = testGL.createMeshInfo('grid1', RedPrimitive.grid(testGL), RedMaterialInfo(testGL, 'color'))
grid.drawMode = testGL.gl.LINES
console.log(grid)
testScene.setGrid(grid)


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
var i = 5
while (i--) {

	var testLight = RedDirectionalLightInfo(testGL)
	testLight.direction[0] = Math.random() * 10 - 5
	testLight.direction[1] = Math.random() * 10 - 5
	testLight.direction[2] = Math.random() * 10 - 5
	testLight.color[0] = 255 * Math.random()
	testLight.color[1] = 255 * Math.random()
	testLight.color[2] = 255 * Math.random()
	console.log(testLight.color)
	testScene.addLight(testLight)
}

var renderer = RedRender(testGL, testScene, function (time) {
	testCamera.setPosition(Math.sin(time / 2000) * 40, 40, Math.cos(time / 2000) * 40)
	testCamera.lookAt([0,0,0])
	i = testScene['lights']['directional'].length
	while(i--){
		testScene['lights']['directional'][i].direction[0] = Math.sin(time / 700+i) * 20
		testScene['lights']['directional'][i].direction[1] = Math.cos(time / 400+i) * 20+Math.sin(time / 700+i) * 20
		testScene['lights']['directional'][i].direction[2] = Math.sin(time / 200+i) * 20 + Math.cos(time / 700+i) * 20
	}
	checkCall.innerHTML = 'numDrawCall : ' + renderer.numDrawCall
})
renderer.start()

