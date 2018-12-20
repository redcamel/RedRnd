"use strict";
var helper;
var SIN, COS;
var UUID = 1
SIN = Math.sin
COS = Math.cos
var prevDiffuseUUID //TODO: 이건 다시 내부로옮겨야함
helper = {
	getShaderFromScript: function (gl, id) {
		var shaderScript = document.getElementById(id);
		var str, k;
		var parseData;
		if (!shaderScript) throw "쉐이더소스가 없음!"
		str = "";
		k = shaderScript.firstChild;
		while (k) {
			if (k.nodeType == 3) str += k.textContent;
			k = k.nextSibling;
		}
		var shader;
		if (shaderScript.type == "x-shader/x-fragment") shader = gl.createShader(gl.FRAGMENT_SHADER);
		else if (shaderScript.type == "x-shader/x-vertex") shader = gl.createShader(gl.VERTEX_SHADER);
		else throw '형식이 맞지 않습니다.';

		gl.shaderSource(shader, str);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.log(gl.getShaderInfoLog(shader))
			throw '형식이 맞지 않습니다.';;
		}

		parseData = str.match(/.attribute[\s\S]+?\;|.uniform[\s\S]+?\;/g)
		console.log(parseData)
		shader['parseData'] = parseData
		return shader;
	},
	createProgramInfo: (function () {
		var ProgramInfo;
		ProgramInfo = function (name) {
			this.name = name
			this.attributes = {}
			this.uniforms = {}
		}
		return function (gl, name, vs, fs) {
			var result;
			var vertexShader, fragmentShader;
			var program;
			result = new ProgramInfo(name)
			vertexShader = helper.getShaderFromScript(gl, vs);
			fragmentShader = helper.getShaderFromScript(gl, fs);
			program = gl.createProgram();
			gl.attachShader(program, vertexShader);
			gl.attachShader(program, fragmentShader);
			gl.linkProgram(program);

			if (!gl.getProgramParameter(program, gl.LINK_STATUS)) alert("Could not initialise shaders");

			gl.useProgram(program);
			var info;

			info = {};
			[vertexShader, fragmentShader].forEach(function (data) {
				// console.log(data)
				if (data['parseData']) {
					data['parseData'].forEach(function (v) {
						var tInfo;
						tInfo = {}
						v = v.trim().replace(';', '').split(' ')
						if (v[0] == 'attribute') {
							tInfo['location'] = gl.getAttribLocation(program, v[2]);
							console.log(tInfo['location'])
							// gl.enableVertexAttribArray(tInfo['location']);
							result['attributes'][v[2]] = tInfo
						} else {
							tInfo['location'] = gl.getUniformLocation(program, v[2]);
							result['uniforms'][v[2]] = tInfo
						}
					})
				}

			})
			console.log(result)
			result['program'] = program
			return result
		}
	})(),
	createIndexBuffer: function (gl, list, pointSize, pointNum, type, normalize, stride, offset) {
		var buffer;
		buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, list, gl.STATIC_DRAW);
		buffer['pointSize'] = pointSize
		buffer['pointNum'] = pointNum
		buffer['type'] = type
		buffer['normalize'] = normalize ? normalize : false
		buffer['stride'] = stride ? stride : 0
		buffer['offset'] = offset ? offset : 0
		buffer['enabled'] = 0
		buffer.UUID = UUID++
		return buffer
	},
	createArrayBuffer: function (gl, pointer, list, pointSize, pointNum, type, normalize, stride, offset) {
		var buffer;
		buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, list, gl.STATIC_DRAW);
		buffer['pointer'] = pointer
		buffer['pointSize'] = pointSize
		buffer['pointNum'] = pointNum
		buffer['type'] = type // the data is 32bit floats
		buffer['normalize'] = normalize ? normalize : false // don't normalize the data
		buffer['stride'] = stride ? stride : 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
		buffer['offset'] = offset ? offset : 0 // start at the beginning of the buffer
		buffer['enabled'] = 0
		buffer.UUID = UUID++
		return buffer
	},
	createBufferInfo: (function () {
		var BufferInfo = function () {
			this.attributes = {
				// position: null,
				// texcoord: null
			}
			this.indices = null
		}
		return function (gl, verticesBuffer, indicesBuffer, texcoordBuffer, normalBuffer) {
			var result;
			result = new BufferInfo()

			result['attributes']['vertexPosition'] = verticesBuffer
			if (texcoordBuffer) result['attributes']['texcoord'] = texcoordBuffer
			if (indicesBuffer) result['indices'] = indicesBuffer
			if (normalBuffer) result['normal'] = normal
			// result['indices'] = buffer
			// result['type'] = gl.UINT16
			console.log(result)
			return result
		}
	})(),
	createTexture: function (gl, src) {
		var texture = gl.createTexture()
		gl.bindTexture(gl.TEXTURE_2D, texture)
		// Fill the texture with a 1x1 blue pixel.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]))
		var image = new Image();
		image.src = src instanceof Element ? src.toDataURL() : src
		image.addEventListener('load', function () {
			// Now that the image has loaded make copy it to the texture.
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
			// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			////// 기본레벨설정
			// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);



			gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
			// gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
			gl.generateMipmap(gl.TEXTURE_2D);
			prevDiffuseUUID = null
			gl.bindTexture(gl.TEXTURE_2D, null)
			texture.loaded = 1
			image.onload = null
		});
		prevDiffuseUUID = null
		gl.bindTexture(gl.TEXTURE_2D, null)
		// 액티브된적이있는지
		texture.loaded = 0
		texture.actived = 0
		// 웹지엘 텍스쳐인지
		texture._webglTexture = 1
		texture.UUID = UUID++
		return texture
	},
	drawObjectList: (function () {
		var testMap = 0
		var sortedMap = {}
		var cacheAttrUUID = {}
		var prevUniform = {}

		//
		var i, i2
		var drawInfo
		var tBufferInfo;
		//
		var cacheDrawBufferUUID
		var prevProgram
		var tMaterial
		var tProgramInfo
		var tProgram
		var tBufferInfo
		var tAttrValueGroup
		var tAttrLocationGroup
		var tPointer
		var tLocation
		var tUniformLocationGroup
		var tUniformValueGroup
		var tAttrValue
		var tIndicesBuffer
		var tVertexBuffer
		var tNormalBuffer
		var tTexcoordBuffer
		var tUniformsList
		var tMvMatrix
		var a, aSx, aSy, aSz, aCx, aCy, aCz, tRx, tRy, tRz, a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, b00, b01, b02, b10, b11, b12, b20, b21, b22;
		var aX, aY, aZ
		var updated_uPMatrix
		//
		var k, kk
		var tProgramName
		//
		var tUniformValue, tUniformKey;
		//
		var bitmapRenderable
		return function (gl, renderList, time) {
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			if (testMap == 0) {
				i = renderList.length
				while (i--) {
					tProgramName = renderList[i]['material']['programInfo']['name'];
					sortedMap[tProgramName] ? 0 : (sortedMap[tProgramName] = [], sortedMap[tProgramName].len = 0);
					sortedMap[tProgramName][sortedMap[tProgramName].len] = renderList[i], sortedMap[tProgramName].len++
				}
				for (k in sortedMap) {
					sortedMap[k].sort()
				}
				console.log('정렬!', sortedMap)
			}

			for (kk in sortedMap) {
				i = sortedMap[kk].length
				while (i--) {
					drawInfo = sortedMap[kk][i]
					tMaterial = drawInfo['material']
					tProgramInfo = tMaterial['programInfo']
					tProgram = tProgramInfo['program']
					tBufferInfo = drawInfo['bufferInfos']
					tAttrValueGroup = tBufferInfo['attributes']
					tAttrLocationGroup = tProgramInfo['attributes']
					tUniformLocationGroup = tProgramInfo['uniforms']
					tUniformValueGroup = drawInfo['uniforms']
					tIndicesBuffer = tBufferInfo['indices']
					tVertexBuffer = tAttrValueGroup['vertexPosition']
					tNormalBuffer = tAttrValueGroup['normal']
					tTexcoordBuffer = tAttrValueGroup['texcoord']
					tMvMatrix = drawInfo['mvMatrix']
					tUniformsList = drawInfo['uniformsList']
					// 매트릭스 초기화
					tMvMatrix[0] = 1, tMvMatrix[1] = 0, tMvMatrix[2] = 0, tMvMatrix[3] = 0,
						tMvMatrix[4] = 0, tMvMatrix[5] = 1, tMvMatrix[6] = 0, tMvMatrix[7] = 0,
						tMvMatrix[8] = 0, tMvMatrix[9] = 0, tMvMatrix[10] = 1, tMvMatrix[11] = 0,
						tMvMatrix[12] = 0, tMvMatrix[13] = 0, tMvMatrix[14] = 0, tMvMatrix[15] = 1
					//////////////////////////////////////////
					//////////////////////////////////////////

					a = tMvMatrix
					// 이동
					aX = drawInfo['position'][0], aY = drawInfo['position'][1], aZ = drawInfo['position'][2];
					a[12] = a[0] * aX + a[4] * aY + a[8] * aZ + a[12];
					a[13] = a[1] * aX + a[5] * aY + a[9] * aZ + a[13];
					a[14] = a[2] * aX + a[6] * aY + a[10] * aZ + a[14];
					a[15] = a[3] * aX + a[7] * aY + a[11] * aZ + a[15];
					// xyz축 회전 
					tRx = drawInfo['rotation'][0], tRy = drawInfo['rotation'][1], tRz = drawInfo['rotation'][2]
					aSx = SIN(tRx), aCx = COS(tRx), aSy = SIN(tRy), aCy = COS(tRy), aSz = SIN(tRz), aCz = COS(tRz),
					a00 = a[0], a01 = a[1], a02 = a[2],
					a10 = a[4], a11 = a[5], a12 = a[6],
					a20 = a[8], a21 = a[9], a22 = a[10],
					b00 = aCy * aCz, b01 = aSx * aSy * aCz - aCx * aSz, b02 = aCx * aSy * aCz + aSx * aSz,
					b10 = aCy * aSz, b11 = aSx * aSy * aSz + aCx * aCz, b12 = aCx * aSy * aSz - aSx * aCz,
					b20 = -aSy, b21 = aSx * aCy, b22 = aCx * aCy,
					a[0] = a00 * b00 + a10 * b01 + a20 * b02, a[1] = a01 * b00 + a11 * b01 + a21 * b02, a[2] = a02 * b00 + a12 * b01 + a22 * b02,
					a[4] = a00 * b10 + a10 * b11 + a20 * b12, a[5] = a01 * b10 + a11 * b11 + a21 * b12, a[6] = a02 * b10 + a12 * b11 + a22 * b12,
					a[8] = a00 * b20 + a10 * b21 + a20 * b22, a[9] = a01 * b20 + a11 * b21 + a21 * b22, a[10] = a02 * b20 + a12 * b21 + a22 * b22;
					// 스케일
					aX = drawInfo['scale'][0], aY = drawInfo['scale'][1], aZ = drawInfo['scale'][2]
					a[0] = a[0] * aX, a[1] = a[1] * aX, a[2] = a[2] * aX, a[3] = a[3] * aX;
					a[4] = a[4] * aY, a[5] = a[5] * aY, a[6] = a[6] * aY, a[7] = a[7] * aY,
					a[8] = a[8] * aZ, a[9] = a[9] * aZ, a[10] = a[10] * aZ, a[11] = a[11] * aZ,
					a[12] = a[12], a[13] = a[13], a[14] = a[14], a[15] = a[15]
					// translate_rotate_scale(mvMatrix, drawInfo['position'], drawInfo['rotation'][0], drawInfo['rotation'][1], drawInfo['rotation'][2], drawInfo['scale'])
					/////////////////////
					prevProgram != tProgram ? (gl.useProgram(tProgram), updated_uPMatrix = false) : 0
					prevProgram = tProgram

					for (k in tAttrValueGroup) {
						tAttrValue = tAttrValueGroup[k],
							tPointer = tAttrValue['pointer'],
							tLocation = tAttrLocationGroup[tPointer]['location']
						//
						cacheAttrUUID[tLocation] == tAttrValue.UUID
							? 0
							: (
								gl.bindBuffer(gl.ARRAY_BUFFER, tAttrValue),
								tAttrValue.enabled ? 0 : (gl.enableVertexAttribArray(tLocation), tAttrValue.enabled = 1),
								gl.vertexAttribPointer(tLocation, tAttrValue.pointSize, tAttrValue.type, tAttrValue.normalize, tAttrValue.stride, tAttrValue.offset),
								cacheAttrUUID[tLocation] = tAttrValue.UUID
							)
					}
					i2 = tUniformsList.length
					bitmapRenderable = true
					while (i2--) {
						tUniformKey = tUniformsList[i2][0], tUniformValue = tUniformsList[i2][1]
						tLocation = tUniformLocationGroup[tUniformKey]['location']
						if (tUniformValue._uniformMethod) {

							tUniformKey == 'uPMatrix' && updated_uPMatrix
								? 0
								: tUniformsList[i2][2] // 매트릭스형태인지 아닌지 파악
									? gl[tUniformValue._uniformMethod](tLocation, false, tUniformValueGroup[tUniformKey])
									: gl[tUniformValue._uniformMethod](tLocation, tUniformValueGroup[tUniformKey])

							tUniformKey == 'uPMatrix' ? updated_uPMatrix = true : 0
						} else if (tUniformValue._webglTexture) {
							if (!prevDiffuseUUID) bitmapRenderable = false //TODO: 여기도 텍스쳐를 만들때 상태관리를 하면될듯
							if (tUniformValue.loaded && prevDiffuseUUID != tUniformValue.UUID) {
								// console.log('오남', prevDiffuseUUID, tUniformValue)
								tUniformValue.actived ? 0 : gl.activeTexture(gl.TEXTURE1) // 0번을 아틀라스가 먹고있으니 1번부터 쓰자
								tUniformValue.actived = 1
								gl.bindTexture(gl.TEXTURE_2D, tUniformValue)
								gl.uniform1i(tLocation, 1)
								prevDiffuseUUID = tUniformValue.UUID
								// console.log(prevDiffuse)
							}

						} else throw '안되는 나쁜 타입인거야!!'
					}
					if (tIndicesBuffer) {
						if (bitmapRenderable) {
							cacheDrawBufferUUID == tIndicesBuffer.UUID ? 0 : gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tIndicesBuffer)
							gl.drawElements(drawInfo['drawMode'], tIndicesBuffer['pointNum'], gl.UNSIGNED_SHORT, 0)
							cacheDrawBufferUUID = tIndicesBuffer.UUID
						}
					} else {
						cacheDrawBufferUUID == tVertexBuffer.UUID ? 0 : gl.drawArrays(drawInfo['drawMode'], 0, tVertexBuffer['pointNum'])
						cacheDrawBufferUUID = tVertexBuffer.UUID
					}
				}
			}
			testMap++
			// if(testMap>60*60)  testMap = 0,sortedMap = {}
		}
	})()
}


