"use strict";
var redGLDetect;

(function () {
	var checkList, reg, makeCamelCase, i, k;
	var tGL;
	/**DOC:
		{
			constructorYn : true,
			title :`redGLDetect`,
			description : `
				- webgl 기본정보를 디텍팅한다.
			`,
			params : {
				redGL : [
					{type:'RedGL Instance'}
				]
			},
			example : `
				testGL.detect
			`,
			return : 'redGLDetect Instance'
		}
	:DOC*/
	redGLDetect = function (redGL) {
		if (!(this instanceof redGLDetect)) return new redGLDetect(redGL)
		if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
		tGL = redGL.gl
		checkList = ('VENDOR,VERSION,SHADING_LANGUAGE_VERSION,RENDERER,MAX_VERTEX_ATTRIBS,MAX_VARYING_VECTORS,MAX_VERTEX_UNIFORM_VECTORS,' +
			'MAX_VERTEX_TEXTURE_IMAGE_UNITS,MAX_FRAGMENT_UNIFORM_VECTORS,MAX_TEXTURE_SIZE,MAX_CUBE_MAP_TEXTURE_SIZE,' +
			'MAX_COMBINED_TEXTURE_IMAGE_UNITS,MAX_TEXTURE_IMAGE_UNITS,MAX_RENDERBUFFER_SIZE,MAX_VIEWPORT_DIMS,' +
			'RED_BITS,GREEN_BITS,BLUE_BITS,ALPHA_BITS,DEPTH_BITS,STENCIL_BITS').split(',');

		reg = /[_]\S/g
		makeCamelCase = function (v) {
			return v.charAt(1).toUpperCase()
		};
		i = checkList.length
		while (i--) this[k = checkList[i]] = tGL.getParameter(tGL[k])
	}
})();