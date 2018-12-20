"use strict";
var testGL, start;
start = function () {
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
	/// 기반준비

	makeCheckRenderInfo()
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////
	/// 데모시작

	// 카메라생성
	var testCamera = testGL.createBaseCameraInfo('testCamera')
	// Scene 생성
	var testScene = testGL.createSceneInfo('testScene', testCamera)
	// 재질정의
	var testDiffuseTexture = testGL.createTextureInfo('asset/fieldstone.jpg')
	var testNormalTexture = testGL.createTextureInfo('asset/fieldstone-normal.jpg', RedTextureIndex.NORMAL)
	var testDisplacementTexture = testGL.createTextureInfo('asset/displacement.jpg', RedTextureIndex.DISPLACEMENT)

	var earthDiffuse = testGL.createTextureInfo('asset/tile/diffuse.png')
	var earthDisplacement = testGL.createTextureInfo('asset/tile/displacement.png', RedTextureIndex.DISPLACEMENT)
	var earthSpecular = testGL.createTextureInfo('asset/tile/specular.png', RedTextureIndex.SPECULAR)

	// 재질생성	
	var testMatBitmap = testGL.createMaterialInfo('bitmap', testDiffuseTexture)
	var testMatBitmapPhong = testGL.createMaterialInfo('bitmapPhong', testDiffuseTexture)
	testMatBitmapPhong.uShininess = 8
	var testMatBitmapNormal = testGL.createMaterialInfo('bitmapPhong', testDiffuseTexture, testNormalTexture)
	testMatBitmapNormal.uShininess = 8
	var testMatBitmapDisplacement = testGL.createMaterialInfo('bitmapPhong', testDiffuseTexture, testNormalTexture, testDisplacementTexture)
	testMatBitmapDisplacement.uShininess = 8
	var testMatBitmapSpecular = testGL.createMaterialInfo('bitmapPhong', earthDiffuse, null, earthDisplacement, earthSpecular)
	testMatBitmapSpecular.uShininess = 4
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

	// 중앙 테스트용 큰 구체...작성
	// var tMesh = testGL.createMeshInfo('testMeshAdd2', RedPrimitive.cube(testGL, 1,1,1, 32, 32, 32), testMatBitmap)
	var tMesh = testGL.createMeshInfo('testMeshAdd2', RedPrimitive.sphere(testGL, 3, 32, 32, 32), testMatBitmapDisplacement)
	testScene.children.push(tMesh)
	console.log(tMesh)
	var tMesh = testGL.createMeshInfo('testMeshAdd3', RedPrimitive.sphere(testGL, 3, 32, 32, 32), testMatBitmapNormal)
	tMesh.position[0] = -7
	testScene.children.push(tMesh)
	var tMesh = testGL.createMeshInfo('testMeshAdd4', RedPrimitive.sphere(testGL, 3, 32, 32, 32), testMatBitmapPhong)
	tMesh.position[0] = 7
	testScene.children.push(tMesh)
	var tMesh = testGL.createMeshInfo('testMeshAdd7', RedPrimitive.sphere(testGL, 3, 32, 32, 32), testMatBitmap)
	tMesh.position[0] = -7
	tMesh.position[2] = -7
	testScene.children.push(tMesh)
	var earth = testGL.createMeshInfo('testMeshAdd5', RedPrimitive.sphere(testGL, 5, 32, 32, 32), testMatBitmapSpecular)
	earth.position[2] = 14
	earth.position[0] = 14
	testScene.children.push(earth)

	var testEnvironmentMap = testGL.createMaterialInfo(
		'bitmapPhong',
		null,
		testNormalTexture,
		testDisplacementTexture,
		null,
		RedCubeTextureInfo(testGL, [
			'asset/cubemap/posx.jpg',
			'asset/cubemap/negx.jpg',
			'asset/cubemap/posy.jpg',
			'asset/cubemap/negy.jpg',
			'asset/cubemap/posz.jpg',
			'asset/cubemap/negz.jpg'
		], RedTextureIndex.CUBE_REFLECTION)
	)
	// 삭제테스트
	// setTimeout(function(){
	// 	testEnvironmentMap.setTexture('uReflectionTexture',null)
	// },2000)
	console.log(testEnvironmentMap)

	var cubeTest = testGL.createMeshInfo('testMeshAdd6', RedPrimitive.sphere(testGL, 5, 64, 64, 64), testEnvironmentMap)
	cubeTest.scale[0] = 0.5
	cubeTest.position[2] = -14
	cubeTest.position[0] = -14
	testScene.children.push(cubeTest)

	// 중앙 테스트용 구체...정렬
	var i, max = 50
	i = max
	while (i--) {
		var tMesh = testGL.createMeshInfo('testMeshAdd1' + i, RedPrimitive.sphere(testGL, 1, 32, 32, 32), testMatBitmapNormal)
		tMesh.position[0] = Math.sin(Math.PI * 2 / max * i) * 30
		tMesh.position[1] = 0
		tMesh.position[2] = Math.cos(Math.PI * 2 / max * i) * 30

		testScene.children.push(tMesh)
	}

	// 엠비언트 라이트 테스트
	var testLight = testGL.createAmbientLight(testGL)
	console.log(testLight)
	testScene.addLight(testLight)

	// 디렉셔널 라이트 테스트
	var i = 1
	while (i--) {
		var testLight = testGL.createDirectionalLight(testGL)
		// testLight.color[0] = Math.random()
		// testLight.color[1] = Math.random()
		// testLight.color[2] = Math.random()
		testScene.addLight(testLight)
	}
	// 포인트 라이트 테스트
	i = 1
	while (i--) {
		var testLight = testGL.createPointLight(testGL)
		testLight.color[0] = Math.random()
		testLight.color[1] = Math.random()
		testLight.color[2] = Math.random()
		testLight.radius = 20
		testLight.useDebugMode = true
		testScene.addLight(testLight)

	}


	/////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	// 렌더러 생성!!!!
	var renderer = testGL.createBaseRenderInfo(testScene, function (time) {
		testCamera.setPosition(Math.sin(time / 2000) * 60, 50, Math.cos(time / 5000) * 40)
		testCamera.lookAt([0, 0, 0])
		var max = testScene['lights']['directional'].length
		i = testScene['lights']['directional'].length
		while (i--) {
			testScene['lights']['directional'][i].direction[0] = -Math.sin(time / 1700 + Math.PI * 2 / max * i) * 30
			testScene['lights']['directional'][i].direction[1] = Math.cos(time / 1400 + Math.PI * 2 / max * i) * 20 + Math.sin(time / 2700 + Math.PI * 2 / max * i) * 50
			testScene['lights']['directional'][i].direction[2] = -Math.sin(time / 1200 + Math.PI * 2 / max * i) * 30
		}
		earth.rotation[0] += 0.01
		earth.rotation[1] += 0.01
		earth.rotation[2] += 0.01

		cubeTest.rotation[0] += 0.01
		cubeTest.rotation[1] += 0.01
		cubeTest.rotation[2] += 0.01

		checkCallBox.innerHTML = 'numDrawCall : ' + renderer.numDrawCall
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
