"use strict";
var RedAtlasTextureInfo
RedAtlasTextureInfo = function(atlasUV,targetAtlasInfo){
	console.log(atlasUV)
	atlasUV = new Float32Array([
		atlasUV[0][0],
		atlasUV[0][1],
		(atlasUV[1][0] - atlasUV[0][0]) ,
		(atlasUV[2][1] - atlasUV[0][1]) 
	])
	this['atlasUV'] = atlasUV
	this['targetAtlasInfo'] = targetAtlasInfo
	this['__webglAtlasTexture'] = 1
}
var RedAtlasTextureManager;
(function () {
	var tRedGL;
	var MAX_TEXTURE_SIZE;
	var tAtlas; // 대상 아틀라스
	var atlasInfoList; // 아틀라스 객체 리스트
	var atlasKeyMap; // 아틀라스에 등록된 이미지 맵정보
	var createAtlas; // 아틀라스 캔버스 생성기
	var atlasPack; // 아틀라스에 이미지를 실제로 업로드하는 녀석
	
	createAtlas = function (targetImage) {
		var canvas;
		var t0;
		if (targetImage && (targetImage['width'] > MAX_TEXTURE_SIZE || targetImage['height'] > MAX_TEXTURE_SIZE)) throw '이미지가 너무커!'
		canvas = document.createElement('canvas');
		canvas.width = MAX_TEXTURE_SIZE, canvas.height = MAX_TEXTURE_SIZE;
		canvas.style.background = 'red', canvas.style.margin = '3px', canvas.style.display = 'inline-block'
		// document.body.appendChild(canvas)
		// 아틀라스 생성
		tAtlas = new Atlas(canvas);
		tAtlas['atalasInfo'] = RedAtlasInfo(tRedGL, tAtlas)
		console.log(tAtlas)
		atlasInfoList.push(tAtlas['atalasInfo'])

	}
	atlasPack = function (targetImage) {
		tAtlas = atlasInfoList[0]['atlas']
		var node = tAtlas.pack(targetImage);
		var i, len;
		if (node === false) {
			// 아틀라스를 전체를 돌면서 찾아야하고..
			i = 0, len = atlasInfoList.length
			for (i; i < len; i++) {
				// 기존있는놈중에 들어가면 종료시키고
				tAtlas = atlasInfoList[i]['atlas']
				node = tAtlas.pack(targetImage);
				if (node) return
			}
			// 여기까지 흘러들어오면 아틀라스캔버스 자체를 추가한다.
			if (node === false) {
				createAtlas(targetImage)
				node = tAtlas.pack(targetImage)
			}
		}
		atlasKeyMap[targetImage.id] = new RedAtlasTextureInfo(
			tAtlas.uv()[targetImage.id],
			tAtlas['atalasInfo']
		)
		return node
	}
	atlasKeyMap = {}
	atlasInfoList = []
	var RedAtlasInfo;
	RedAtlasInfo = function (redGL, targetAtlas) {
		if (!(this instanceof RedAtlasInfo)) return new RedAtlasInfo(redGL, targetAtlas)
		if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
		this['atlas'] = targetAtlas
		this['textureInfo'] = null
	}
	/**DOC:
		{
			constructorYn : true,
			title :`RedAtlasTextureManager`,
			description : `
				- Atlas 텍스쳐 매니저
			`,
			params : {
				redGL : [
					{type:'RedGL Instance'}
				]
			},
			example : `
				TODO:
			`,
			return : 'RedAtlasTextureManager Instance'
		}
	:DOC*/
	RedAtlasTextureManager = function (redGL, srcList,callback) {
		if (!(this instanceof RedAtlasTextureManager)) return new RedAtlasTextureManager(redGL, srcList,callback)
		if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
		if (!(srcList instanceof Array)) srcList = [srcList]
		tRedGL = redGL
		// 이놈이 아틀라스 사이즈가 된다.
		MAX_TEXTURE_SIZE = redGL['detect']['MAX_TEXTURE_SIZE']
		if (MAX_TEXTURE_SIZE > 4096) MAX_TEXTURE_SIZE = 4096
		console.log('MAX_TEXTURE_SIZE', MAX_TEXTURE_SIZE)
		if (!tAtlas) createAtlas()
		var loaded, targetNum;
		loaded = 0
		targetNum = srcList.length
		srcList.forEach(function (src) {
			var img = new Image();
			var id = 'atlasImage_' + src
			if (atlasKeyMap[id]) return // 이미존재하면 나가리..
			img.id = id
			img.src = src
			img.onload = function () {
				var node = atlasPack(this)
				//  존재하는지 여부만 입력함
				// console.log(node)
				// console.log(tAtlas.uv()[node.rect['name']])
				// console.log(atlasKeyMap)
				// console.log(this.id)
		
				loaded++
				if (targetNum == loaded) {
					atlasInfoList.forEach(function (v) {
						v['textureInfo'] = RedTextureInfo(redGL, v['atlas']['canvas'],2)
					})
					console.log('~~~~~~~~~~~',callback)
					if(callback ) callback()
				}
			};
		})
		this['atlasKeyMap'] = atlasKeyMap
		this['atlasInfoList'] = atlasInfoList

	}
})();