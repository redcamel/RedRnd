"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedShaderInfo`,
        description : `
            - RedShaderInfo 인스턴스 생성자
            - <b>유일키</b>만 지원하며 키 중복일경우 기존 캐싱된 쉐이더정보를 반환함.
            - <b>단 프레그먼트/버텍스의 키는 따로 관리함.</b>
            - 쉐이더정보는 <b>Object.freeze</b> 상태로 반환됨.
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
            type : [
                {type:'String'},
                '- 버텍스 쉐이더(RedShaderInfo.VERTEX_SHADER)',
                '- 프레그먼트 쉐이더(RedShaderInfo.FRAGMENT_SHADER)'
            ],
            source : [
                {type:'String'},
                '- 생성할 쉐이더 소스문자열'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // basic이라는 이름으로 버텍스 쉐이더를 만든다. 
            test.createShaderInfo(test,'basic', RedShaderInfo.VERTEX_SHADER, 쉐이더소스)
        `,
        return : 'RedShaderInfo Instance'
    }
:DOC*/
var RedShaderInfo;
(function () {
    var parseData;
    var tGL;
    var tShader;
    var tDatas;
    RedShaderInfo = function (redGL, key, type, source) {
        if (!(this instanceof RedShaderInfo)) return new RedShaderInfo(redGL, key, type, source)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof key != 'string') throw 'key - 문자열만 허용됩니다.'
        if (typeof type != 'string') throw 'type - 문자열만 허용됩니다.'
        // 저장할 공간확보하고
        if (!redGL['__datas']['shaderInfo']) {
            redGL['__datas']['shaderInfo'] = {}
            redGL['__datas']['shaderInfo'][RedShaderInfo.FRAGMENT_SHADER] = {}
            redGL['__datas']['shaderInfo'][RedShaderInfo.VERTEX_SHADER] = {}
        }
        tDatas = redGL['__datas']['shaderInfo']
        // 기존에 등록된 녀석이면 기존 데이터 리턴
        if (tDatas[type][key]) return console.log('캐싱쉐이더 리턴!', key), tDatas[type][key]
        if (typeof source != 'string') throw 'source - 문자열만 허용됩니다.'
        tGL = redGL.gl
        // 쉐이더생성
        switch (type) {
            case RedShaderInfo.VERTEX_SHADER:
                tShader = tGL.createShader(tGL.VERTEX_SHADER);
                break
            case RedShaderInfo.FRAGMENT_SHADER:
                tShader = tGL.createShader(tGL.FRAGMENT_SHADER);
                break
            default:
                throw '쉐이더 타입을 확인하세요!'
                break
        }
        tGL.shaderSource(tShader, source)
        tGL.compileShader(tShader)
        if (!tGL.getShaderParameter(tShader, tGL.COMPILE_STATUS)) {
            console.log(tGL.getShaderInfoLog(tShader))
            throw '쉐이더 컴파일에 실패하였습니다.';
        }
        parseData = source.match(/.attribute[\s\S]+?\;|.uniform[\s\S]+?\;/g)
        parseData.forEach(function (v, index) {
            parseData[index] = v.trim().replace(';', '')
        })
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
            title :`type`,
			description : `RedShaderInfo.VERTEX_SHADER or RedShaderInfo.FRAGMENT_SHADER`,
			example : `인스턴스.type`,
			return : 'String'
		}
	    :DOC*/
        this['type'] = type
        /**DOC:
		{
            title :`shader`,
			description : `실제 쉐이더`,
			example : `인스턴스.shader`,
			return : 'String'
		}
	    :DOC*/
        this['shader'] = tShader
        /**DOC:
		{
            title :`parseData`,
			description : `쉐이더소스 내부의 attribute와 uniform정보를 추출하여 가짐.(인스턴스.parseData)`,
			example : `인스턴스.parseData`,
			return : 'String'
		}
	    :DOC*/
        this['parseData'] = parseData
        this['__UUID'] = REDGL_UUID++
        // 캐싱
        tDatas[type][key] = this
        Object.freeze(this)
        // console.log(this)
    }
    /**DOC:
		{
            title :`FRAGMENT_SHADER`,
            code: 'CONST',
			description : `
				프레그먼트 쉐이더 상수.
			`,
			example : `
				RedShaderInfo.FRAGMENT_SHADER
			`,
			return : 'String'
		}
	:DOC*/
    RedShaderInfo.FRAGMENT_SHADER = 'fragmentShader'
    /**DOC:
		{
            title :`VERTEX_SHADER`,
            code: 'CONST',
			description : `
				버텍스 쉐이더 상수.
			`,
			example : `
				RedShaderInfo.FRAGMENT_SHADER
			`,
			return : 'String'
		}
	:DOC*/
    RedShaderInfo.VERTEX_SHADER = 'vertexShader'
    Object.freeze(RedShaderInfo)
})();