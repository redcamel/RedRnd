"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedProgramInfo`,
        description : `
            - RedProgramInfo 인스턴스 생성자
            - <b>유일키</b>만 지원.
            - 프로그램 정보는 <b>Object.freeze</b> 상태로 반환됨.
        `,
        params : {
            redGL : [
                {type:'Red Instance'},
                'redGL 인스턴스'
            ],
            key : [
                {type:'String'},
                '- 등록될 키명'
            ],
            vShaderInfo : [
                {type:'RedShaderInfo'}
            ],
            fShaderInfo : [
                {type:'RedShaderInfo'}
            ],
            onInitUniformValue : [
                {type:'Function'},
                '- 유니폼 초기화시 실행될  핸들러'
            ],
            onDefineTexture : [
                {type:'Function'},
                '- 텍스쳐 유니폼 초기화시 실행될 핸들러'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // basic이라는 이름으로 버텍스 쉐이더를 만든다. 
            test.createShaderInfo('basic', RedProgramInfo.VERTEX_SHADER, 쉐이더소스)
            test.createShaderInfo('basic', RedProgramInfo.FRAGMENT_SHADER, 쉐이더소스)
            test.createProgramInfo(
                'basic',
                test.getShaderInfo('basic', RedProgramInfo.VERTEX_SHADER),
                test.getShaderInfo('basic', RedProgramInfo.FRAGMENT_SHADER),
                function (target) {
                    target.materialUniforms.uAtlascoord = RedAtlasUVInfo([0, 0, 1, 1])
                },
                function (target) {
                    target.materialUniforms['RedMaterialInfo.DIFFUSE_TEXTURE'] = target['uDiffuseTexture']
                }

            )
        `,
        return : 'RedProgramInfo Instance'
    }
:DOC*/
var RedProgramInfo;
(function () {
    var tGL;
    var tDatas;
    var tProgram;
    var self;
    var tList;
    tList = []
    RedProgramInfo = function (redGL, key, vShaderInfo, fShaderInfo, onInitUniformValue, onDefineTexture) {
        if (!(this instanceof RedProgramInfo)) return new RedProgramInfo(redGL, key, vShaderInfo, fShaderInfo, onInitUniformValue, onDefineTexture)
        if (!(redGL instanceof RedGL)) throw 'RedProgramInfo : RedGL 인스턴스만 허용됩니다.'
        if (typeof key != 'string') throw 'RedProgramInfo : key - 문자열만 허용됩니다.'
        if (!onInitUniformValue) throw 'RedProgramInfo : onInitUniformValue - 반드시 정의해야합니다.'
        if (!vShaderInfo instanceof RedShaderInfo) throw 'RedProgramInfo : vShaderInfo - RedShaderInfo만 허용됩니다.'
        if (!fShaderInfo instanceof RedShaderInfo) throw 'RedProgramInfo : fShaderInfo - RedShaderInfo만 허용됩니다.'
        if (vShaderInfo['type'] != RedShaderInfo.VERTEX_SHADER) throw 'RedProgramInfo : vShaderInfo - VERTEX_SHADER 타입만 허용됩니다.'
        if (fShaderInfo['type'] != RedShaderInfo.FRAGMENT_SHADER) throw 'RedProgramInfo : fShaderInfo - FRAGMENT_SHADER 타입만 허용됩니다.'
        // 저장공간확보
        if (!redGL['__datas']['RedProgramInfo']) redGL['__datas']['RedProgramInfo'] = {}
        tDatas = redGL['__datas']['RedProgramInfo']
        // 기존에 등록된 녀석이면 퐈이어!
        if (tDatas[key]) throw key + '는 이미 존재하는 RedProgramInfo key 입니다.'
        self = this;
        tGL = redGL.gl
        /**DOC:
		{
            title :`key`,
			description : `고유키`,
			example : `인스턴스.key`,
			return : 'String'
		}
	    :DOC*/
        this['key'] = key
        /**DOC:
		{
            title :`attributes`,
			description : `쉐이더에 등록된 attribute 정보들`,
			example : `인스턴스.attributes`,
			return : 'Object'
		}
	    :DOC*/
        this['attributes'] = {}
        /**DOC:
		{
            title :`uniforms`,
			description : `쉐이더에 등록된 uniform 정보들`,
			example : `인스턴스.uniforms`,
			return : 'Object'
		}
	    :DOC*/
        this['uniforms'] = {}
        // 프로그램생성!
        tProgram = tGL.createProgram();
        tGL.attachShader(tProgram, vShaderInfo['shader'])
        tGL.attachShader(tProgram, fShaderInfo['shader'])
        tGL.linkProgram(tProgram)
        // 프로그램 링크 확인
        if (!tGL.getProgramParameter(tProgram, tGL.LINK_STATUS)) throw "프로그램을 초기화 할 수 없습니다."
        tGL.useProgram(tProgram);
        ///////////////////////////////////////////////////////////
        // 프로그램이 알아야할 attributes와 uniforms의 정보를 알아낸다.
        console.log('RedProgramInfo : key - ' + key)
        tList.length = 0
        tList.push(vShaderInfo, fShaderInfo)
        tList.forEach(function (data) {
            if (data['parseData']) {
                data['parseData'].forEach(function (v) {
                    var tInfo;
                    tInfo = {}
                    v = v.split(' ')
                    console.log(v)
                    if (v[0] == 'attribute') {
                        tInfo['location'] = tGL.getAttribLocation(tProgram, v[2]);
                        tInfo['type'] = v[1]
                        self['attributes'][v[2]] = tInfo
                    } else {
                        tInfo['location'] = tGL.getUniformLocation(tProgram, v[2]);
                        if (tInfo['location']) tInfo['location']['__UUID'] = REDGL_UUID++
                        tInfo['type'] = v[1]
                        self['uniforms'][v[2]] = tInfo
                    }
                })
            }
        });
        console.log('RedProgramInfo : ' + key + ' attributes - ', self['attributes'])
        console.log('RedProgramInfo : ' + key + ' uniforms - ', self['uniforms'])
        ///////////////////////////////////////////////////////////
        /**DOC:
		{
            title :`program`,
			description : `실제 프로그램`,
			example : `인스턴스.program`,
			return : 'WebGLProgram'
		}
	    :DOC*/
        this['program'] = tProgram
        /**DOC:
		{
            title :`shaderInfos`,
			description : `프로그램에 사용된 RedShaderInfo정보`,
			example : `인스턴스.shaderInfos`,
			return : 'Object'
		}
	    :DOC*/
        this['shaderInfos'] = {
            vShaderInfo: vShaderInfo,
            fShaderInfo: fShaderInfo
        }
        this['__UUID'] = REDGL_UUID++
        /**DOC:
		{
            title :`onInitUniformValue`,
            description : `
             - 재질 초기화시 필요한 초기 값들선언.
            `,
			example : `인스턴스.onInitUniformValue`,
			return : 'void'
		}
	    :DOC*/
        this['onInitUniformValue'] = onInitUniformValue
        /**DOC:
		{
            title :`onDefineTexture`,
            description : `
             - 재질의 텍스쳐 갱신시 실행할 매서드
            `,
			example : `인스턴스.onDefineTexture`,
			return : 'void'
		}
	    :DOC*/
        this['onDefineTexture'] = onDefineTexture
        // 캐싱
        tDatas[key] = this
        Object.freeze(this)
        // console.log(this)
       
    }

    Object.freeze(RedProgramInfo)
})();