"use strict";
var helper;
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
		ProgramInfo = function () {
			this.attributes = {}
			this.uniforms = {}
		}
		return function (gl, vs, fs) {
			var result;
			var vertexShader, fragmentShader;
			var program;
			result = new ProgramInfo()
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
		return function (gl, verticesBuffer, indicesBuffer, texcoordBuffer) {
			var result;
			result = new BufferInfo()

			result['attributes']['position'] = verticesBuffer
			if (texcoordBuffer) result['attributes']['texcoord'] = texcoordBuffer
			if (indicesBuffer) result['indices'] = indicesBuffer
			// result['indices'] = buffer
			// result['type'] = gl.UINT16
			console.log(result)
			return result
		}
	})(),
	drawObjectList: function (gl, renderList, time) {
		time = time / 500000
		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		// renderList.forEach(function (drawInfo) {
		var i = renderList.length
		var drawInfo
		var tBufferInfo, programInfo;
		var prevTexture
		while (i--) {
			drawInfo = renderList[i]
			programInfo = drawInfo['programInfo']
			drawInfo['rotation'][0] += 0.01
			drawInfo['rotation'][1] += 0.01
			drawInfo['rotation'][2] += 0.001
			mat4.identity(mvMatrix);
		
			// mat4.translate(mvMatrix, mvMatrix, drawInfo['position']);
			// mat4.rotateX(mvMatrix, mvMatrix, drawInfo['rotation'][0]);
			// mat4.rotateY(mvMatrix, mvMatrix, drawInfo['rotation'][1]);
			// mat4.rotateZ(mvMatrix, mvMatrix, drawInfo['rotation'][2]);
			translate_rotate_scale(mvMatrix, drawInfo['position'], drawInfo['rotation'][0], drawInfo['rotation'][1], drawInfo['rotation'][2], drawInfo['scale'])
			// mat4.scale(mvMatrix, mvMatrix, drawInfo['scale']);
			gl.useProgram(programInfo['program'])
			
			for (var k in drawInfo['bufferInfos']['attributes']) {
				tBufferInfo = drawInfo['bufferInfos']['attributes'][k]
				gl.bindBuffer(gl.ARRAY_BUFFER, tBufferInfo);
				// console.log(k,programInfo['attributes'][tBufferInfo['pointer']])
				tBufferInfo['enabled'] ? 0 : gl.enableVertexAttribArray(programInfo['attributes'][tBufferInfo['pointer']]['location'])
				gl.vertexAttribPointer(programInfo['attributes'][tBufferInfo['pointer']]['location'], tBufferInfo.pointSize, tBufferInfo.type, tBufferInfo.normalize, tBufferInfo.stride, tBufferInfo.offset);
			}
			for (var k in programInfo['uniforms']) {
				//TODO: 여길 어떻게든 간소화
				var tKey;
				var typeMAP;
				typeMAP = {
					f: {
						16: 'uniformMatrix4fv',
						12: 'uniformMatrix3fv',
						8: 'uniformMatrix2fv',
						4: 'uniform4fv',
						3: 'uniform3fv',
						2: 'uniform2fv',
						1: 'uniform1f'
					},
					i: {
						16: 'uniformMatrix4iv',
						12: 'uniformMatrix3iv',
						8: 'uniformMatrix2iv',
						4: 'uniform4iv',
						3: 'uniform3iv',
						2: 'uniform2iv',
						1: 'uniform1iv'
					}
				}
				// console.log(drawInfo['uniforms'])
				tKey = drawInfo['uniforms'][k]
				if (tKey instanceof Float32Array || tKey instanceof Float64Array || tKey instanceof Array) {
					if (tKey && tKey.length) tKey = typeMAP['f'][tKey.length]
					if(tKey.indexOf('uniformMatrix')>-1) gl[tKey](programInfo['uniforms'][k]['location'], false, drawInfo['uniforms'][k]);
					else gl[tKey](programInfo['uniforms'][k]['location'], drawInfo['uniforms'][k]);
				} else if (
					tKey instanceof Uint8Array ||
					tKey instanceof Uint16Array ||
					tKey instanceof Uint32Array ||
					tKey instanceof Int8Array ||
					tKey instanceof Int16Array ||
					tKey instanceof Int32Array 
				) {
					if (tKey && tKey.length) {
						tKey = typeMAP['i'][tKey.length]
						if(tKey.indexOf('uniformMatrix')>-1) gl[tKey](programInfo['uniforms'][k]['location'], false, drawInfo['uniforms'][k]);
						else gl[tKey](programInfo['uniforms'][k]['location'], drawInfo['uniforms'][k]);
					}					
				} else if(tKey instanceof WebGLTexture){
					if(prevTexture==undefined && prevTexture !=tKey){
						gl.activeTexture(gl.TEXTURE0);
						gl.bindTexture(gl.TEXTURE_2D, tKey);
						gl.uniform1i(programInfo['uniforms'][k].location, 0);
					}
					prevTexture = tKey
				}else throw '안되는 나쁜 타입인거야!!'
						
			}
			if (drawInfo['bufferInfos']['indices']) {
				
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, drawInfo['bufferInfos']['indices']);
				gl.drawElements(drawInfo['drawMode'], drawInfo['bufferInfos']['indices'].pointNum, gl.UNSIGNED_SHORT, 0);
			} else {
			
				gl.drawArrays(drawInfo['drawMode'], 0, drawInfo['bufferInfos']['attributes']['position'].pointNum)
			}
		}
		// })
	}
}