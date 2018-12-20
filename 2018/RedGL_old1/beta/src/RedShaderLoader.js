"use strict";
var RedShaderLoader;
/**DOC:
    {
        constructorYn : true,
        title :`RedShaderLoader`,
        description : `
			<h2>- 걍 소스로딩기</h2>
			<h2>- TODO: 중복로딩을 막아야함...</h2>
        `,
        params : {
            list : [
                {type:'Array'},
                '소스 로딩정보'
            ],
            callback : [
                {type:'Function'},
                '- 소스로딩완료후 실행될 콜백'
            ]
        },
		example : `
			RedShaderLoader(
				[
					{ id: 'colorVS', src: 'glsl/colorVS.glsl' },
					{ id: 'colorFS', src: 'glsl/colorFS.glsl' },
					{ id: 'bitmapPhongVS', src: 'glsl/bitmapPhongVS.glsl' },
					{ id: 'bitmapPhongFS', src: 'glsl/bitmapPhongFS.glsl' },
					{ id: 'skyBoxVS', src: 'glsl/skyBoxVS.glsl' },
					{ id: 'skyBoxFS', src: 'glsl/skyBoxFS.glsl' }
				],
				function(){
					console.log('콜백!')
				}
			)
        `,
        return : 'RedSceneInfo Instance'
    }
:DOC*/
(function () {
	var makeShaders;
	makeShaders = function (redGL, datas) {
		var k, tData;
		for (k in datas) {
			tData = datas[k]
			console.log('RedShaderLoader : makeShaders - ', tData)
			redGL.createShaderInfo(tData['name'], RedShaderInfo.VERTEX_SHADER, redGL.getSourceFromScript(tData['shaderInfo']['vs']['id']))
			redGL.createShaderInfo(tData['name'], RedShaderInfo.FRAGMENT_SHADER, redGL.getSourceFromScript(tData['shaderInfo']['fs']['id']))
			redGL.createProgramInfo(
				tData['name'],
				redGL.getShaderInfo(tData['name'], RedShaderInfo.VERTEX_SHADER),
				redGL.getShaderInfo(tData['name'], RedShaderInfo.FRAGMENT_SHADER),
				tData['onInitUniformValue'],
				tData['onDefineTexture']
			)
			redGL.createMaterialDefine(redGL.getProgramInfo(tData['name']))			
		}
	}
	RedShaderLoader = function (redGL, shaderInfos, callback) {
		if (!(this instanceof RedShaderLoader)) return new RedShaderLoader(redGL, shaderInfos, callback)
		var cnt = 0;
		var tList = [];
		for (var k in shaderInfos) {
			tList.push(shaderInfos[k]['shaderInfo']['vs'])
			tList.push(shaderInfos[k]['shaderInfo']['fs'])
		}
		console.log('RedShaderLoader : loadList -', tList)
		tList['callback'] = callback
		tList.forEach(function (v, idx) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', v['src'], true);
			xhr.onreadystatechange = function () {
				var tScript;
				if (xhr.readyState == 4 && xhr.status == 200) {
					tScript = document.createElement('script');
					tScript.setAttribute('id', v['id'])
					tScript.setAttribute('type', 'glsl')
					tScript.text = xhr.responseText;
					console.log('RedShaderLoader : loaded - ', v['id'], tScript);
					document.body.appendChild(tScript);
					if (++cnt == tList.length) {
						setTimeout(function () {
							makeShaders(redGL, shaderInfos)
							if (tList['callback']) tList['callback']();
						}, 1)
					}
				}
			};
			xhr.send(null);
		});
	};

})();