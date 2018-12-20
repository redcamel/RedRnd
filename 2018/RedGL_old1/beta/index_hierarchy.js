"use strict";
var testGL, start;
start = function () {
	console.log('안온다는거냐?')
	var makeCheckRenderInfo;
	var checkCallBox;
	makeCheckRenderInfo = function () {
		checkCallBox = document.createElement('div')
		document.body.appendChild(checkCallBox)
		checkCallBox.style.position = 'absolute'
		checkCallBox.style.left = '10px'
		checkCallBox.style.top = '10px'
		checkCallBox.style.color = '#fff'
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
	}
	console.log('이힝!')
	makeCheckRenderInfo()
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////
	/// 데모시작

	// 카메라생성
	var testCamera = testGL.createBaseCameraInfo('testCamera')
	// Scene 생성
	var testScene = testGL.createSceneInfo('testScene', testCamera)
	// 재질정의
	var testTexture = testGL.createTextureInfo('asset/fieldstone.jpg')
	var testNormalTexture = testGL.createTextureInfo('asset/fieldstone-normal.jpg', RedTextureIndex.NORMAL)
	var testDisplacementTexture = testGL.createTextureInfo('asset/displacement.jpg', RedTextureIndex.DISPLACEMENT)

	// 재질생성	
	var testMatBitmap = testGL.createMaterialInfo('bitmapPhong',
		testTexture, testNormalTexture, testDisplacementTexture
	)
	var testMatBitmap2 = testGL.createMaterialInfo(
		'bitmapPhong',
		testTexture,
		testNormalTexture
	)

	console.log(testMatBitmap, testMatBitmap2)
	// 그리드 생성
	var grid = testGL.createMeshInfo('grid1', RedPrimitive.grid(testGL), testGL.createMaterialInfo('color'))
	grid.drawMode = testGL.gl.LINES
	// testScene.setGrid(grid)
	// 스카이박스 생성
	testScene.setSkyBox(
		testGL.createSkyBoxInfo([
			'asset/cubemap/posx.jpg',
			'asset/cubemap/negx.jpg',
			'asset/cubemap/posy.jpg',
			'asset/cubemap/negy.jpg',
			'asset/cubemap/posz.jpg',
			'asset/cubemap/negz.jpg'
		])
	)

	

	// 엠비언트 라이트 테스트
	var testLight = testGL.createAmbientLight(testGL)
	console.log(testLight)
	testScene.addLight(testLight)

	// 디렉셔널 라이트 테스트
	var i = 3
	while (i--) {
		var testLight = testGL.createDirectionalLight(testGL)
		testLight.direction[0] = Math.random() * 2 - 1
		testLight.direction[1] = Math.random() * 2 - 1
		testLight.direction[2] = Math.random() * 2 - 1
		testLight.color[0] = Math.random()
		testLight.color[1] = Math.random()
		testLight.color[2] = Math.random()

		testScene.addLight(testLight)
	}
	
	// 무작위로 가보자
	var i = 200, j, k
	j=0
	while (i--) {
		// var tMesh = testGL.createMeshInfo('testMeshAdd2' + '_' + i + '_' + j, RedPrimitive.sphere(testGL, 0.5, 16, 16, 16), testMatBitmap)
		var tMesh = testGL.createMeshInfo('testMeshAdd2' + '_' + i + '_' + j, RedPrimitive.cube(testGL, 1, 1, 1, 32, 32, 32), testMatBitmap)
		tMesh.position[0] = Math.sin(Math.PI * 2 * Math.random()) * 40
		tMesh.position[1] = Math.sin(Math.PI * 2 * Math.random()) * 40
		tMesh.position[2] = Math.cos(Math.PI * 2 * Math.random()) * 40
		tMesh.rotation[0] = Math.random() * Math.PI * 2
		tMesh.rotation[1] = Math.random() * Math.PI * 2
		tMesh.rotation[2] = Math.random() * Math.PI * 2
		var tScale = 3
		tMesh.scale[0] = tMesh.scale[1] = tMesh.scale[2] = tScale
		testScene.children.push(tMesh)
		k = 5
		while (k--) {
			var tSub = testGL.createMeshInfo('testSubAdd3' + '_' + i + '_' + j + '_' + k, RedPrimitive.sphere(testGL, 0.5, 16, 16, 16), testMatBitmap2)
			// var tSub = testGL.createMeshInfo('testSubAdd1'+i, RedPrimitive.cube(testGL,1,1,1,32,32,32), testMatBitmap)
			tSub.position[0] = Math.sin(Math.PI * 2 * Math.random()) * 3
			tSub.position[1] = Math.sin(Math.PI * 2 * Math.random()) * 3
			tSub.position[2] = Math.cos(Math.PI * 2 * Math.random()) * 3
			tSub.rotation[0] = Math.random() * Math.PI * 2
			tSub.rotation[1] = Math.random() * Math.PI * 2
			tSub.rotation[2] = Math.random() * Math.PI * 2
			var tScale = 1
			tSub.scale[0] = tSub.scale[1] = tSub.scale[2] = tScale
			tMesh.children.push(tSub)

			var tSub2 = testGL.createMeshInfo('testSub2Add3' + '_' + i + '_' + j + '_' + k, RedPrimitive.cube(testGL, 1,1,1, 6, 6, 6), testMatBitmap2)
			tSub2.position[0] = Math.sin(Math.PI * 2 * Math.random()) * 2
			tSub2.position[1] = Math.sin(Math.PI * 2 * Math.random()) * 2
			tSub2.position[2] = Math.cos(Math.PI * 2 * Math.random()) * 2
			tSub2.rotation[0] = Math.random() * Math.PI * 2
			tSub2.rotation[1] = Math.random() * Math.PI * 2
			tSub2.rotation[2] = Math.random() * Math.PI * 2
			var tScale = 0.5
			tSub2.scale[0] = tSub2.scale[1] = tSub2.scale[2] = tScale
			tMesh.children.push(tSub2)
		}
		
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	// 렌더러 생성!!!!
	var renderer = testGL.createBaseRenderInfo(testScene, function (time) {
		testCamera.setPosition(Math.sin(time / 3000) * 60, Math.sin(time / 3000) * 30 + Math.cos(time / 6000) * 50, Math.cos(time / 5000) * 40)
		testCamera.lookAt([0, 0, 0])
		i = testScene['lights']['point'].length
		while (i--) {
			testScene['lights']['point'][i].position[0] = Math.sin(time / 6000 + Math.PI * 2 / testScene['lights']['point'].length * i) * 20
			testScene['lights']['point'][i].position[1] = Math.tan(time / 3000 + Math.PI * 2 / testScene['lights']['point'].length * i) * 10 +
				Math.atan(time / 2000 + Math.PI * 2 / testScene['lights']['point'].length * i) * 10
			testScene['lights']['point'][i].position[2] = Math.cos(time / 2500 + Math.PI * 2 / testScene['lights']['point'].length * i) * 40
		}
		i = testScene['lights']['directional'].length
		while (i--) {
			testScene['lights']['directional'][i].direction[0] = Math.sin(time / 1700 + Math.PI * 2 / testScene['lights']['directional'].length * i) * 20
			testScene['lights']['directional'][i].direction[1] = Math.cos(time / 1400 + Math.PI * 2 / testScene['lights']['directional'].length * i) * 20 + Math.sin(time / 2700 + Math.PI * 2 / testScene['lights']['directional'].length * i) * 50
			testScene['lights']['directional'][i].direction[2] = Math.sin(time / 2200 + Math.PI * 2 / testScene['lights']['directional'].length * i) * 20
		}
		// testMatBitmap['uDisplacementPower'] = Math.sin(time/250)*3
		i = parseInt(testScene.children.length)
		var tRotation
		while (i--) {
			tRotation = testScene.children[i]['rotation']
			tRotation[0] +=0.01
			tRotation[1] +=0.01
			tRotation[2] +=0.01
		}
		checkCallBox.innerHTML = 'numDrawCall : ' + renderer.numDrawCall+'<br>context : ' + testGL.gl.mode+'(최신우선순위로 걸림 2.0은 완벽하게 호환되나 테스트)<br>drawingBuffer : ' + testGL.__canvas.width+'/'+ testGL.gl.drawingBufferHeight+'<br>clientXX : ' + testGL.gl.drawingBufferWidth+'/'+ testGL.__canvas.height
	})
	renderer.start()

	
}
testGL = RedGL(document.getElementById('test'), start, true, [
	{
		name: 'color',
		shaderInfo: {
			vs: { id: 'colorVS', src: 'glsl/colorVS.glsl' },
			fs: { id: 'colorFS', src: 'glsl/colorFS.glsl' }
		},
		onInitUniformValue: function (target) {
			target.materialUniforms.uColor = new Float32Array([Math.random(), Math.random(), Math.random(), 1])
		}
	},
	{
		name: 'bitmap',
		shaderInfo: {
			vs: { id: 'bitmapVS', src: 'glsl/bitmapVS.glsl' },
			fs: { id: 'bitmapFS', src: 'glsl/bitmapFS.glsl' }
		},
		onInitUniformValue: function (target) {
			target.materialUniforms.uAtlascoord = RedAtlasUVInfo([0, 0, 1, 1])
		},
		onDefineTexture: function (target) {
			target.materialUniforms[RedMaterialInfo.DIFFUSE_TEXTURE] = target['uDiffuseTexture']
		}
	},
	{
		name: 'bitmapPhong',
		shaderInfo: {
			vs: { id: 'bitmapPhongVS', src: 'glsl/bitmapPhongVS.glsl' },
			fs: { id: 'bitmapPhongFS', src: 'glsl/bitmapPhongFS.glsl' }
		},
		onInitUniformValue: function (target) {
			target.materialUniforms.uAtlascoord = RedAtlasUVInfo([0, 0, 1, 1])
			target.materialUniforms.uShininess = 16
			target.materialUniforms.uSpecularPower = 1
			target.materialUniforms.uReflectionPower = 0.5
			target.materialUniforms.uRefractionPower = 1.0
			target.materialUniforms.uRefractionRatio = 0.98
			
			target.materialUniforms.uNormalPower = 1
			target.materialUniforms.uDisplacementPower = 1


		},
		onDefineTexture: function (target) {
			target.materialUniforms[RedMaterialInfo.DIFFUSE_TEXTURE] = target['uDiffuseTexture']
			target.materialUniforms[RedMaterialInfo.NORMAL_TEXTURE] = target['uNormalTexture']
			target.materialUniforms[RedMaterialInfo.DISPLACEMENT_TEXTURE] = target['uDisplacementTexture']
			target.materialUniforms[RedMaterialInfo.SPECULAR_TEXTURE] = target['uSpecularTexture']
			target.materialUniforms[RedMaterialInfo.REFLECTION_TEXTURE] = target['uReflectionTexture']
			target.materialUniforms[RedMaterialInfo.REFRACTION_TEXTURE] = target['uRefractionTexture']
			
		}
	},
	{
		name: 'skyBox',
		shaderInfo: {
			vs: { id: 'skyBoxVS', src: 'glsl/skyBoxVS.glsl' },
			fs: { id: 'skyBoxFS', src: 'glsl/skyBoxFS.glsl' }
		},
		onInitUniformValue: function (target) {

		},
		onDefineTexture: function (target) {
			target.materialUniforms.uSkybox = target['uDiffuseTexture']
		}
	}
])
