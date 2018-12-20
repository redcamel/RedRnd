"use strict";
var testGL, start;
start = function () {
	console.log('안온다는거냐?')
	var makeCheckRenderInfo;
	var checkCallBox;
	var setTestUI
	var testMesh
	var testEnvironmentMap
	setTestUI = function () {
		var gui = new dat.GUI();
		gui.add(testEnvironmentMap, 'uShininess', 1, 255);
		gui.add(testEnvironmentMap, 'uSpecularPower', -1, 1);
				
		gui.add(testEnvironmentMap, 'uDisplacementPower', -2, 2);
		gui.add(testEnvironmentMap, 'uReflectionPower', 0, 1);
		gui.add(testEnvironmentMap, 'uNormalPower', -1, 1);
	}
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
	var testPhongDiffuseTexture = testGL.createTextureInfo('asset/fieldstone.jpg')
	var testNormalTexture = testGL.createTextureInfo('asset/fieldstone-normal.jpg', RedTextureIndex.NORMAL)
	var testSpecularTexture = testGL.createTextureInfo('asset/tile/specular.png', RedTextureIndex.SPECULAR)
	var testDisplacementTexture = testGL.createTextureInfo('asset/displacement.jpg', RedTextureIndex.DISPLACEMENT)
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
	testEnvironmentMap = testGL.createMaterialInfo(
		'bitmapPhong',
		testPhongDiffuseTexture,
		testNormalTexture,
		testDisplacementTexture,
		testSpecularTexture,
		RedCubeTextureInfo(testGL, [
			'asset/cubemap/posx.jpg',
			'asset/cubemap/negx.jpg',
			'asset/cubemap/posy.jpg',
			'asset/cubemap/negy.jpg',
			'asset/cubemap/posz.jpg',
			'asset/cubemap/negz.jpg'
		], RedTextureIndex.CUBE_REFLECTION)
	)
	console.log(testEnvironmentMap)

	testMesh = testGL.createMeshInfo('testMeshAdd6', RedPrimitive.sphere(testGL, 5, 64, 64, 64), testEnvironmentMap)
	testScene.children.push(testMesh)

	setTestUI()

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

	/////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////
	// 렌더러 생성!!!!
	var renderer = testGL.createBaseRenderInfo(testScene, function (time) {
		testCamera.setPosition(Math.sin(time / 2000) * 30, 30, Math.cos(time / 5000) * 30)
		testCamera.lookAt([0, 0, 0])
		var max = testScene['lights']['directional'].length
		i = testScene['lights']['directional'].length
		while (i--) {
			testScene['lights']['directional'][i].direction[0] = -Math.sin(time / 1700 + Math.PI * 2 / max * i) * 30
			testScene['lights']['directional'][i].direction[1] = Math.cos(time / 1400 + Math.PI * 2 / max * i) * 20 + Math.sin(time / 2700 + Math.PI * 2 / max * i) * 50
			testScene['lights']['directional'][i].direction[2] = -Math.sin(time / 1200 + Math.PI * 2 / max * i) * 30
		}
		testMesh.rotation[0]+=0.01
		testMesh.rotation[1]+=0.01
		testMesh.rotation[2]+=0.01


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
