"use strict";
var RedCubeTextureInfo;
(function () {
	var tGL;
	/**DOC:
		{
			constructorYn : true,
			title :`RedCubeTextureInfo`,
			description : `
				- Cube 텍스쳐 생성기
				- <h1>실험중...이거하면서 프레임버퍼도 생성해봐야곘군..</h1>
				- 큐브맵은 tGL.TEXTURE2 인덱스를 전용으로 쓴다.
			`,
			return : 'RedCubeTextureInfo Instance'
		}
	:DOC*/
	RedCubeTextureInfo = function (redGL, srcList) {
		if (!(this instanceof RedCubeTextureInfo)) return new RedCubeTextureInfo(redGL, srcList)
		if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
		if (!(srcList instanceof Array)) throw 'srcList는 Array만 허용됩니다.'
		var texture;
		var i;
		var loadedNum ;
		var self;
		self = this
		tGL = redGL.gl
		loadedNum = 0
		
		var i = srcList.length
		this['__imgList'] = []
		while (i--) {
			var img = new Image()
			img.src = srcList[i]
			img.onload = function(){
				loadedNum++
				this.onload = null
				if(loadedNum==6){
					self.__allLoaed(tGL)
				}
			}
			this['__imgList'][i] = img
		}
	
		// 인덱스 번호 지정 - 초기생성전담은 0번 인덱스를 사용함
		this['__targetIndex'] = 0
		// 로딩이 다되었는지
		this['loaded'] = 0
		// 액티브된적이있는지
		this['actived'] = 0
		// 웹지엘 텍스쳐인지
		this['__webglCubeTexture'] = 1
		this['__UUID'] = REDGL_UUID++
		tGL.activeTexture(tGL.TEXTURE0)
		this['texture'] = tGL.createTexture()

	}
	RedCubeTextureInfo.prototype['__allLoaed'] = function () {
		// 로딩상태 플래그를 완료로 설정
		this['loaded'] = 1
		// 타겟인덱스를 설정함		
		this['__targetIndex'] = 2
		console.log(this)
		tGL.activeTexture(tGL.TEXTURE0)
		tGL.bindTexture(tGL.TEXTURE_CUBE_MAP, this['texture'])
		this['__imgList'].forEach(function (img, index) {
			
			// console.log(
			// 	tGL.TEXTURE_CUBE_MAP_POSITIVE_X,
			// 	tGL.TEXTURE_CUBE_MAP_NEGATIVE_X,
			// 	 tGL.TEXTURE_CUBE_MAP_POSITIVE_Y, 
			// 	 tGL.TEXTURE_CUBE_MAP_NEGATIVE_Y,
			// 	  tGL.TEXTURE_CUBE_MAP_POSITIVE_Z,
			// 	   tGL.TEXTURE_CUBE_MAP_NEGATIVE_Z
			// )
			tGL.texImage2D(
				tGL.TEXTURE_CUBE_MAP_POSITIVE_X + index,
				0,
				tGL.RGBA,
				tGL.RGBA,
				tGL.UNSIGNED_BYTE,
				img
			);
		})
		
		tGL.texParameteri(tGL.TEXTURE_CUBE_MAP, tGL.TEXTURE_MAG_FILTER, tGL.LINEAR);
		tGL.texParameteri(tGL.TEXTURE_CUBE_MAP, tGL.TEXTURE_MIN_FILTER, tGL.LINEAR);
		tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_WRAP_S, tGL.CLAMP_TO_EDGE);
		tGL.texParameteri(tGL.TEXTURE_2D, tGL.TEXTURE_WRAP_T, tGL.CLAMP_TO_EDGE);
		tGL.generateMipmap(tGL.TEXTURE_CUBE_MAP);

	}
})();