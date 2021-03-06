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

var i, max = 50
i = max
while (i--) {
	var tMesh = testGL.createMeshInfo('testMeshAdd1' + i, RedPrimitive.sphere(testGL, 0.5, 32, 32, 32), testMatBitmap)
	// var tMesh = testGL.createMeshInfo('testMeshAdd1'+i, RedPrimitive.cube(testGL,1,1,1,32,32,32), testMatBitmap)
	tMesh.position[0] = Math.sin(Math.PI * 2 / max * i) * 10
	tMesh.position[1] = 0
	tMesh.position[2] = Math.cos(Math.PI * 2 / max * i) * 10
	testMatBitmap.uniforms.uShininess[0] = Math.random() * 64
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
// testScene.setGrid(grid)


var testSkyBox
testSkyBox = RedSkyBoxInfo(testGL, [
	'asset/cubemap/posx.jpg',
	'asset/cubemap/negx.jpg',
	'asset/cubemap/posy.jpg',
	'asset/cubemap/negy.jpg',
	'asset/cubemap/posz.jpg',
	'asset/cubemap/negz.jpg'
])
testScene.setSkyBox(testSkyBox)
var i = 0
while (i--) {

	var testLight = RedDirectionalLightInfo(testGL)
	testLight.direction[0] = 1
	testLight.direction[1] = -1
	testLight.direction[2] = 1
	testLight.color[0] = 255
	testLight.color[1] = 255
	testLight.color[2] = 255

	console.log(testLight.color)
	testScene.addLight(testLight)
}
i = 0
while (i--) {

	var testLight = RedPointLightInfo(testGL)
	testLight.color[0] = 255 * Math.random()
	testLight.color[1] = 255 * Math.random()
	testLight.color[2] = 255 * Math.random()
	testLight.radius = 20
	console.log(testLight.color)
	testScene.addLight(testLight)

}
i = 0
while (i--) {

	var testLight = RedSpotLightInfo(testGL)
	testLight.color[0] = 255 * Math.random()
	testLight.color[1] = 255 * Math.random()
	testLight.color[2] = 255 * Math.random()
	testLight.position[0] = Math.random() * 150 - 75
	testLight.position[1] = Math.random()*150
	testLight.position[2] = Math.random() * 150 - 75
	testLight.direction[0] = Math.random() -0.5
	testLight.direction[1] =  Math.random() -0.5
	testLight.direction[2] = Math.random()-0.5
	testLight.spotCosCuttoff = 0.1
	console.log(testLight.color)
	testScene.addLight(testLight)

}
var testLight = RedSpotLightInfo(testGL)
testLight.color[0] = 255 
testLight.color[1] =0
testLight.color[2] = 0
testLight.position[0] = 0
testLight.position[1] = 30
testLight.position[2] = 0
testLight.direction[0] =0
testLight.direction[1] = -1
testLight.direction[2] =0.5
testLight.spotCosCuttoff = 0.4
testLight.spotExponent = 2
console.log(testLight)
testScene.addLight(testLight)


// 재질생성
var testTexture = RedTextureInfo(testGL, 'asset/crate.png')
var testMatBitmap = RedMaterialInfo(testGL, 'bitmapLite', testTexture)

var tMesh = testGL.createMeshInfo('testMeshAdd2', RedPrimitive.sphere(testGL, 1, 32, 32, 32), testMatBitmap)
tMesh.scale[0] = 3
tMesh.scale[1] = 3
tMesh.scale[2] = 3
testScene.children.push(tMesh)
var i = 30, inverse_j
while (i--) {
	inverse_j = 20
	while (inverse_j--) {
		var tMesh = testGL.createMeshInfo('testMeshAdd2' + '_' + i + '_' + inverse_j, RedPrimitive.sphere(testGL,2.5, 16, 16, 16), testMatBitmap)
		// var tMesh = testGL.createMeshInfo('testMeshAdd1'+i, RedPrimitive.cube(testGL,1,1,1,32,32,32), testMatBitmap)
		tMesh.position[0] = Math.sin(Math.PI * 2 * Math.random()) * 80
		tMesh.position[1] = Math.sin(Math.PI * 2 * Math.random()) * 80
		tMesh.position[2] = Math.cos(Math.PI * 2 * Math.random()) * 80
		tMesh.rotation[0] = Math.random() * Math.PI * 2
		tMesh.rotation[1] = Math.random() * Math.PI * 2
		tMesh.rotation[2] = Math.random() * Math.PI * 2
		testMatBitmap.uniforms.uShininess[0] = Math.random() * 64
		testScene.children.push(tMesh)
	}
}


var tMesh = testGL.createMeshInfo('wall', RedPrimitive.cube(testGL, 20, 20, 20, 32, 32, 32), testMatBitmap)
tMesh.position[0] = -20
tMesh.position[1] = 0
tMesh.position[2] = 0
testScene.children.push(tMesh)

var testMatBitmap2 = RedMaterialInfo(testGL, 'bitmapLite', testTexture)
testMatBitmap2.uniforms.uShininess[0] = 128

var tMesh = testGL.createMeshInfo('floor', RedPrimitive.cube(testGL, 200, 1, 200, 1, 1, 1), testMatBitmap2)
tMesh.position[0] = 0
tMesh.position[1] = -10
tMesh.position[2] = 0
testScene.children.push(tMesh)

var renderer = RedRender(testGL, testScene, function (time) {

	testCamera.setPosition(Math.sin(time / 3000) * 80, 80, Math.cos(time / 3000) * 80)
	// testCamera.setPosition(0,0,500)

	testCamera.lookAt([0, 0, 0])
	i = testScene['lights']['point'].length
	while (i--) {
		// testScene['lights']['point'][i].position[0] = Math.sin(time / 20000 + Math.PI * 2 / testScene['lights']['point'].length * i) * 70
		// testScene['lights']['point'][i].position[1] = 80
		// testScene['lights']['point'][i].position[2] = Math.sin(time / 20000 + Math.PI * 2 / testScene['lights']['point'].length * i) * 70
	}
	i = testScene['lights']['directional'].length
	// while(i--){
	// 	testScene['lights']['directional'][i].direction[0] = Math.sin(time / 2700+i) * 20
	// 	testScene['lights']['directional'][i].direction[1] = Math.cos(time / 1400+i) * 20+Math.sin(time / 2700+i) * 20
	// 	testScene['lights']['directional'][i].direction[2] = Math.sin(time / 2200+i) * 20
	// }
	i = testScene['lights']['spot'].length
	// while(i--){
	// 	testScene['lights']['spot'][i].direction[0] = Math.sin(time / 1200) 
	// 	// testScene['lights']['spot'][i].direction[1] = Math.cos(time / 1400) 
	// 	testScene['lights']['spot'][i].direction[2] = Math.cos(time / 1200) 
	// }
	checkCall.innerHTML = 'numDrawCall : ' + renderer.numDrawCall
})
renderer.start()

