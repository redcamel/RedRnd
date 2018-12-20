"use strict";
var RedTextureIndex;
(function () {
	var tGL;
	/**DOC:
		{
			constructorYn : true,
			title :`RedTextureIndex`,
			description : `
				- 텍스쳐 고유인덱스
			`,
			example : `
				RedTextureIndex.DIFFUSE
				RedTextureIndex.NORMAL
				RedTextureIndex.CUBE
			`,
			return : 'Integer'
		}
	:DOC*/
	RedTextureIndex = {
		PASS: 128,
		/**DOC:
		{
			title :`CREATE`,
			code : 'CONST',
			description : `
				- 텍스쳐 생성시 자동부여되는 기본인덱스
				- 텍스쳐 생성완료이후 지정된 인덱스로 변환됨
			`,
			return : 'Integer'
		}
		:DOC*/
		CREATE: 1,
		/**DOC:
		{
			title :`DIFFUSE`,
			code : 'CONST',
			description : `
				- 디퓨즈 텍스쳐 인덱스
				- 텍스쳐 생성지 지정하지않을경우 기본 디퓨즈로 인식함
			`,
			return : 'Integer'
		}
		:DOC*/
		DIFFUSE: 2,
		/**DOC:
		{
			title :`NORMAL`,
			code : 'CONST',
			description : `
				- 노멀 텍스쳐 인덱스
			`,
			return : 'Integer'
		}
		:DOC*/
		NORMAL: 3,
		/**DOC:
		{
			title :`DISPLACEMENT`,
			code : 'CONST',
			description : `
				- DISPLACEMENT 텍스쳐 인덱스
			`,
			return : 'Integer'
		}
		:DOC*/
		DISPLACEMENT: 4,
		/**DOC:
		{
			title :`SPECULAR`,
			code : 'CONST',
			description : `
				- SPECULAR 텍스쳐 인덱스
			`,
			return : 'Integer'
		}
		:DOC*/
		SPECULAR: 5,
		//아틀라스는 자동
		// ETC_VERTEX_1: 6,
		// ETC_VERTEX_2: 7,
		// ETC_FRAGMENT_1: 8,
		// ETC_FRAGMENT_2: 9,
		
		/////////////////////
		CUBE_CREATE: 0,
		/**DOC:
			{
			title :`CUBE_DIFFUSE`,
			code : 'CONST',
			description : `
				- 큐브 텍스쳐 인덱스
			`,
			return : 'Integer'
		}
		:DOC*/
		CUBE_DIFFUSE: 6,
		/**DOC:
			{
			title :`CUBE_REFLECTION`,
			code : 'CONST',
			description : `
				- 큐브 텍스쳐 인덱스
			`,
			return : 'Integer'
		}
		:DOC*/
		CUBE_REFLECTION: 6,
		/**DOC:
			{
			title :`CUBE_REFRACTION`,
			code : 'CONST',
			description : `
				- 큐브 텍스쳐 인덱스
			`,
			return : 'Integer'
		}
		:DOC*/
		CUBE_REFRACTION: 7
		
	}
	Object.freeze(RedTextureIndex)
})();