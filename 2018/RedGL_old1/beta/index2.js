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
	// 재질생성 
	var testColorMat = testGL.createMaterialInfo('color')
	// 텍스쳐생성! //TODO: testGL.createTextureInfo/getTextureInfo를 만들어야겠군...
	var testTexture = testGL.createTextureInfo('asset/crate.png')
	var testTexture2 = testGL.createTextureInfo('asset/test.png')
	console.log(testTexture)
	var testMatBitmap = testGL.createMaterialInfo('bitmapPhong', testTexture)
	var testMatBitmap2 = testGL.createMaterialInfo('bitmapPhong', testTexture2)
	// 그리드 생성
	// var grid = testGL.createMeshInfo('grid1', RedPrimitive.grid(testGL), testGL.createMaterialInfo('color'))
	// grid.drawMode = testGL.gl.LINES
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

	// 아틀라스테스트
	RedAtlasTextureManager(testGL, [
		'asset/draft1.png',
		'asset/draft2.png',
		'asset/draft3.png',
		'asset/draft4.png',
		'asset/draft5.png',
		'asset/test.png',
	], function () {
		var testMatBitmap3 = testGL.createMaterialInfo('bitmapPhong', RedAtlasTextureManager.getByKey('asset/test.png'))
		var testMatBitmap4 = testGL.createMaterialInfo('bitmapPhong', RedAtlasTextureManager.getByKey('asset/draft1.png'))
		var testMatBitmap5 = testGL.createMaterialInfo('bitmapPhong', RedAtlasTextureManager.getByKey('asset/draft2.png'))
		var testMatBitmap6 = testGL.createMaterialInfo('bitmapPhong', RedAtlasTextureManager.getByKey('asset/draft3.png'))
		var testMatBitmap7 = testGL.createMaterialInfo('bitmapPhong', RedAtlasTextureManager.getByKey('asset/draft4.png'))
		var testMatBitmap8 = testGL.createMaterialInfo('bitmapPhong', RedAtlasTextureManager.getByKey('asset/draft5.png'))
		setTimeout(function () {

			// grid.drawMode = testGL.gl.LINES
			var testAtlas2 = RedAtlasTextureManager(testGL, 'asset/addTest.png', function () {
				console.log('아틀라스 추가!되었음!')
				var i = 90, i2, i3;
				// testScene.children.reverse()
				var testMatBitmap9 = testGL.createMaterialInfo('bitmapPhong', RedAtlasTextureManager.getByKey('asset/addTest.png'))

				while (i--) {
					var tMesh = testGL.createMeshInfo('testMeshAdd' + i, RedPrimitive.cube(testGL, 2, 2, 2, 32, 32, 32), testMatBitmap9)
					tMesh.position[0] = Math.random() * 80 - 40
					tMesh.position[1] = Math.random() * 80 - 40
					tMesh.position[2] = Math.random() * 80 - 40
					tMesh.rotation[0] = Math.random() * Math.PI * 2
					tMesh.rotation[1] = Math.random() * Math.PI * 2
					tMesh.rotation[2] = Math.random() * Math.PI * 2
					// tMesh.scale[0] = 5
					// tMesh.scale[1] = 5
					// tMesh.scale[2] = 5
					testScene.children.push(tMesh)
				}
				// testScene.children.reverse()
			})
		}, 3000)
		///////////////////////////////////////////////////////////////////////////////////////////
		// 데모
		var i = 100, i2, i3;
		while (i--) {
			var tMesh = testGL.createMeshInfo('testMesh' + i, RedPrimitive.cube(testGL, 2, 2, 2, 1, 1, 1), Math.random() > 0.5 ? testMatBitmap3 : testMatBitmap4)
			tMesh.position[0] = Math.random() * 80 - 40
			tMesh.position[1] = Math.random() * 80 - 40
			tMesh.position[2] = Math.random() * 80 - 40
			tMesh.rotation[0] = Math.random() * Math.PI * 2
			tMesh.rotation[1] = Math.random() * Math.PI * 2
			tMesh.rotation[2] = Math.random() * Math.PI * 2
			// tMesh.drawMode = testGL.gl.LINE_STRIP
			i2 = 6
			var tt = Math.random() > 0.5 ? testMatBitmap5 : testMatBitmap6
			while (i2--) {
				var tSub = testGL.createMeshInfo('testMesh_' + i + '_' + i2, RedPrimitive.cube(testGL, 2, 2, 2, 1, 1, 1), tt)
				tSub.position[0] = Math.random() * 80 - 40
				tSub.position[1] = Math.random() * 80 - 40
				tSub.position[2] = Math.random() * 80 - 40
				tSub.rotation[0] = Math.random() * Math.PI * 2
				tSub.rotation[1] = Math.random() * Math.PI * 2
				tSub.rotation[2] = Math.random() * Math.PI * 2
				// var tScale = Math.random() + 0.1
				// tSub.scale[0] = tScale
				// tSub.scale[1] = tScale
				// tSub.scale[2] = tScale
				// tSub.blendFactor2 = Math.random() > 0.5 ? testGL.gl.ONE_MINUS_SRC_ALPHA : testGL.gl.ONE
				testScene.children.push(tSub)
				i3 = 5
				var tt = Math.random() > 0.5 ? testMatBitmap7 : testMatBitmap8
				while (i3--) {
					var tSub2 = testGL.createMeshInfo('testMesh_' + i + '_' + i2 + '_' + i3, RedPrimitive.cube(testGL, 2, 2, 2, 1, 1, 1), tt)
					tSub2.position[0] = Math.random() * 80 - 40
					tSub2.position[1] = Math.random() * 80 - 40
					tSub2.position[2] = Math.random() * 80 - 40
					tSub2.rotation[0] = Math.random() * Math.PI * 2
					tSub2.rotation[1] = Math.random() * Math.PI * 2
					tSub2.rotation[2] = Math.random() * Math.PI * 2
					// var tScale = Math.random() + 0.1
					// tSub2.scale[0] = tScale
					// tSub2.scale[1] = tScale
					// tSub2.scale[2] = tScale
					testScene.children.push(tSub2)
				}
			}
			testScene.children.push(tMesh)
		}

	})

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
		// testLight.color[3] = Math.random()

		testScene.addLight(testLight)
	}
	// 포인트 라이트 테스트
	i = 0
	while (i--) {
		var testLight = testGL.createPointLight(testGL)
		testLight.color[0] = Math.random()
		testLight.color[1] = Math.random()
		testLight.color[2] = Math.random()
		testLight.position[1] = Math.random() * 20 - 10
		testLight.radius = Math.random() * 10 + 5
		testLight.useDebugMode = true
		testScene.addLight(testLight)

	}

	var renderer = testGL.createBaseRenderInfo(testScene, function (time) {
		testCamera.setPosition(Math.sin(time / 12000) * 60, 50, Math.cos(time /15000) * 70)
		testCamera.lookAt([0, 0, 0])
		var i = testScene['lights']['directional'].length
		while (i--) {
			testScene['lights']['directional'][i].direction[0] = -Math.sin(time / 1700 + Math.PI * 2 / 2 * i) * 30
			testScene['lights']['directional'][i].direction[1] = Math.cos(time / 1400 + Math.PI * 2 / 2 * i) * 20 + Math.sin(time / 2700 + Math.PI * 2 / 2 * i) * 50
			testScene['lights']['directional'][i].direction[2] = -Math.sin(time / 1200 + Math.PI * 2 / 2 * i) * 30
		}

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
