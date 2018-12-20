"use strict";
var RedTextureInfo;
(function () {
	var tGL;
	/**DOC:
		{
			constructorYn : true,
			title :`RedTextureInfo`,
			description : `
				- 기본 텍스쳐 생성기
			`,
			params : {
				redGL : [
					{type:'RedGL Instance'}
				],
				targetIndex : [
					{type:'Integer'},
					'타겟 인덱스를 지정한다.',
					'기본인덱스는 1번을 사용함'
				]
			},
			example : `
				TODO:
			`,
			return : 'RedTextureInfo Instance'
		}
	:DOC*/
	RedTextureInfo = function (redGL, src, targetIndex, internalFormat, format, type) {
		if (!(this instanceof RedTextureInfo)) return new RedTextureInfo(redGL, src, targetIndex, internalFormat, format, type)
		if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
		var texture;
		var img;
		var level = 0;
		var width = 2;
		var height = 2;
		var border = 0;
		var self;
		self = this
		tGL = redGL.gl
		internalFormat = internalFormat ? internalFormat : tGL.RGBA;
		format = format ? format : tGL.RGBA;
		type = type ? type : tGL.UNSIGNED_BYTE;
		targetIndex = targetIndex ? targetIndex : 1
		texture = tGL.createTexture()
		tGL.activeTexture(tGL.TEXTURE0)
		tGL.bindTexture(tGL.TEXTURE_2D, texture)
		// 초기이미지 설정
		tGL.texImage2D(
			tGL.TEXTURE_2D,
			level,
			internalFormat,
			width,
			height,
			border,
			format,
			type,
			new Uint8Array(
				222, 222, 222, 255,
				66, 66, 66, 255,
				66, 66, 66, 255,
				222, 222, 222, 255
			)
		)
		img = new Image();
		// 캔버스 일경우 캔버스이미지데이터를 활용함
		img.src = src instanceof Element ? src.toDataURL() : src
		img.addEventListener('load', function () {
			// 로딩상태 플래그를 완료로 설정
			self['loaded'] = 1
			// 타겟인덱스를 설정함
		
			self['__targetIndex'] = targetIndex
			// tGL.activeTexture(tGL.TEXTURE_2D, tGL.TEXTURE0)
			tGL.activeTexture(tGL.TEXTURE0)
			tGL.bindTexture(tGL.TEXTURE_2D, self['texture'])
			tGL.texImage2D(tGL.TEXTURE_2D, 0, tGL.RGBA, tGL.RGBA, tGL.UNSIGNED_BYTE, self['__img'])
			// tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_MIN_FILTER, tGL.LINEAR)
			// tGL.texParameterf(tGL.TEXTURE_2D, tGL.TEXTURE_MAG_FILTER, tGL.LINEAR_MIPMAP_NEAREST)
			
			// tGL.pixelStorei(tGL.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
			tGL.generateMipmap(tGL.TEXTURE_2D)
			img.onload = null
		});
		// tGL.bindTexture(tGL.TEXTURE_2D, null)
		this['__img'] = img
		// 인덱스 번호 지정 - 초기생성전담은 0번 인덱스를 사용함
		this['__targetIndex'] = tGL.TEXTURE0
		// 로딩이 다되었는지
		this['loaded'] = 0
		// 액티브된적이있는지
		this['actived'] = 0
		// 웹지엘 텍스쳐인지
		this['__webglTexture'] = 1
		this['__UUID'] = REDGL_UUID++
		this['texture'] = texture
	}
})();